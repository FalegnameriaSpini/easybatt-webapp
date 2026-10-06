import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import {
  romeDate,
  validContactDate,
  projectCanExpire,
  projectDeletion,
} from "../lib/easybatt-project-retention.mjs";

test("retention uses Rome dates and rejects future or impossible contacts", () => {
  assert.equal(romeDate(new Date("2026-07-01T22:30:00Z")), "2026-07-02");
  assert.equal(romeDate(new Date("2026-01-01T22:30:00Z")), "2026-01-01");
  const created = "2026-10-01T10:00:00Z";
  assert.equal(validContactDate("2026-10-05", created, "2026-10-06"), true);
  for (const value of [
    null,
    "",
    "2026-09-30",
    "2026-10-07",
    "2026-02-30",
    "wrong",
  ])
    assert.equal(validContactDate(value, created, "2026-10-06"), false);
});
test("only dated, expired non-customer requests are eligible", () => {
  const item = {
    status: "contacted",
    last_contact_on: "2025-10-06",
    retention_due_on: "2026-10-06",
  };
  assert.equal(projectCanExpire(item, "2026-10-06"), true);
  assert.equal(projectCanExpire(item, "2026-10-05"), false);
  assert.equal(
    projectCanExpire({ ...item, status: "customer" }, "2026-10-07"),
    false,
  );
  assert.equal(
    projectCanExpire({ ...item, last_contact_on: null }, "2026-10-07"),
    false,
  );
});
test("deletion requires one UUID, its revision and explicit confirmation", () => {
  const item = { id: randomUUID(), revision: randomUUID(), confirmed: true };
  assert.deepEqual(projectDeletion(item), {
    id: item.id,
    revision: item.revision,
  });
  for (const patch of [
    { confirmed: false },
    { confirmed: "true" },
    { id: [item.id] },
    { revision: "*" },
  ])
    assert.throws(() => projectDeletion({ ...item, ...patch }));
});

test(
  "retention migration and guarded deletions in isolated PostgreSQL",
  { timeout: 60000 },
  async (t) => {
    const db = new PGlite();
    const historical = randomUUID();
    const insert = async (
      created = "2024-02-29T12:00:00Z",
      contact = null,
      status = "new",
    ) => {
      const id = randomUUID();
      await db.query(
        `insert into public.easybatt_project_requests
      (id,payload_hash,full_name,email,phone,profession,town,province,intervention,metres,timing,privacy_version,privacy_url,marketing_text,created_at,last_contact_on,status)
      values ($1,'hash','Test','test@example.test','0301234567','private','Gussago','BS','other','unknown','unknown','test','https://example.test/privacy','',$2,$3,$4)`,
        [id, created, contact, status],
      );
      await db.query(
        "insert into public.easybatt_project_deliveries(project_id) values($1)",
        [id],
      );
      return id;
    };
    const row = async (id) =>
      (
        await db.query(
          "select *,last_contact_on::text as contact,retention_due_on::text as deadline from public.easybatt_project_requests where id=$1",
          [id],
        )
      ).rows[0];
    const remove = async (id, revision) =>
      (
        await db.query(
          "delete from public.easybatt_project_requests where id=$1 and revision=$2 and status <> 'customer' and retention_due_on <= (now() at time zone 'Europe/Rome')::date returning id",
          [id, revision],
        )
      ).rows;
    try {
      await db.exec(
        "create role anon; create role authenticated; create role service_role bypassrls;",
      );
      await db.exec(
        await readFile(
          new URL(
            "../supabase/migrations/202610060001_project_requests.sql",
            import.meta.url,
          ),
          "utf8",
        ),
      );
      await db.query(
        `insert into public.easybatt_project_requests (id,payload_hash,full_name,email,phone,profession,town,province,intervention,metres,timing,privacy_version,privacy_url,marketing_text,created_at)
      values($1,'hash','Historical','test@example.test','1234567','private','Gussago','BS','other','unknown','unknown','test','https://example.test/privacy','','2024-01-01')`,
        [historical],
      );
      const migration = await readFile(
        new URL(
          "../supabase/migrations/202610060002_project_retention.sql",
          import.meta.url,
        ),
        "utf8",
      );
      await db.exec(migration);
      await db.exec(migration);
      await t.test(
        "historical data is not deleted or assigned an invented contact date",
        async () => {
          const item = await row(historical);
          assert.equal(item.contact, null);
          assert.equal(item.deadline, null);
          assert.equal((await remove(historical, item.revision)).length, 0);
        },
      );
      await t.test(
        "permissions remain private including the trigger function",
        async () => {
          for (const role of ["anon", "authenticated"]) {
            await db.exec(`set role ${role}`);
            try {
              await assert.rejects(
                db.query(
                  "select last_contact_on from public.easybatt_project_requests",
                ),
                /permission denied/,
              );
              await assert.rejects(
                db.query("delete from public.easybatt_project_requests"),
                /permission denied/,
              );
              await assert.rejects(
                db.query("select public.easybatt_project_dates()"),
                /permission denied/,
              );
            } finally {
              await db.exec("reset role");
            }
          }
        },
      );
      await db.exec("set role service_role");
      await t.test(
        "new requests start at reception, calendar years clamp leap day",
        async () => {
          const id = await insert();
          const item = await row(id);
          assert.equal(item.contact, "2024-02-29");
          assert.equal(item.deadline, "2025-02-28");
          const liveId = await insert(new Date().toISOString());
          assert.equal((await row(liveId)).contact, romeDate());
          assert.equal(
            (await remove(liveId, (await row(liveId)).revision)).length,
            0,
          );
        },
      );
      await t.test(
        "notes and follow-up appointments do not restart retention",
        async () => {
          const id = await insert();
          const before = await row(id);
          await db.query(
            "update public.easybatt_project_requests set staff_notes='Updated',follow_up_on='2027-02-28' where id=$1",
            [id],
          );
          const after = await row(id);
          assert.equal(after.contact, before.contact);
          assert.equal(after.deadline, before.deadline);
          assert.notEqual(after.revision, before.revision);
          assert.equal((await remove(id, before.revision)).length, 0);
        },
      );
      await t.test(
        "real contact changes deadline; future and pre-request dates are refused",
        async () => {
          const id = await insert();
          await db.query(
            "update public.easybatt_project_requests set last_contact_on='2025-03-01' where id=$1",
            [id],
          );
          assert.equal((await row(id)).deadline, "2026-03-01");
          await assert.rejects(
            db.query(
              "update public.easybatt_project_requests set last_contact_on='2099-01-01' where id=$1",
              [id],
            ),
            /Invalid last contact date/,
          );
          await assert.rejects(
            db.query(
              "update public.easybatt_project_requests set last_contact_on='2024-01-01' where id=$1",
              [id],
            ),
            /Invalid last contact date/,
          );
        },
      );
      await t.test(
        "customers cannot be deleted through expired-request conditions",
        async () => {
          const id = await insert("2024-01-01", null, "customer");
          assert.equal((await remove(id, (await row(id)).revision)).length, 0);
          assert.ok(await row(id));
        },
      );
      await t.test(
        "guarded deletion removes only the selected expired project and its outbox",
        async () => {
          const id = await insert();
          const other = await insert();
          assert.equal((await remove(id, (await row(id)).revision)).length, 1);
          assert.equal(await row(id), undefined);
          assert.ok(await row(other));
          assert.equal(
            (
              await db.query(
                "select * from public.easybatt_project_deliveries where project_id=$1",
                [id],
              )
            ).rows.length,
            0,
          );
        },
      );
    } finally {
      await db.close();
    }
  },
);
