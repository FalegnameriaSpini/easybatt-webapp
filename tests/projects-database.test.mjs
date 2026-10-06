import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";

test(
  "project requests are private, persistent, idempotent and rate limited",
  { timeout: 60000 },
  async (t) => {
    const db = new PGlite();
    const id = randomUUID();
    const details = {
      full_name: "Test User",
      email: "test@example.test",
      phone: "0301234567",
      company: "",
      profession: "private",
      town: "Gussago",
      province: "BS",
      intervention: "renovation",
      metres: "unknown",
      timing: "unknown",
      notes: "",
      source: { page: "/prova-easybatt" },
      privacy_version: "test-v1",
      privacy_url: "https://example.test/privacy",
      marketing_consent: false,
      marketing_text: "Test only",
    };
    const submit = async (
      requestId = randomUUID(),
      hash = "payload",
      ip = "ip-hash",
      email = "email-hash",
    ) =>
      (
        await db.query(
          "select public.easybatt_submit_project($1,$2,$3,$4,$5) as result",
          [requestId, hash, details, ip, email],
        )
      ).rows[0].result;
    try {
      await db.exec(
        "create role anon; create role authenticated; create role service_role bypassrls; alter default privileges in schema public grant all on tables to anon, authenticated;",
      );
      const sql = await readFile(
        new URL(
          "../supabase/migrations/202610060001_project_requests.sql",
          import.meta.url,
        ),
        "utf8",
      );
      await db.exec(sql);
      await db.exec(sql);
      await t.test(
        "anonymous and authenticated clients cannot access tables or RPC",
        async () => {
          for (const role of ["anon", "authenticated"]) {
            await db.exec(`set role ${role}`);
            try {
              await assert.rejects(
                db.query("select * from public.easybatt_project_requests"),
                /permission denied/,
              );
              await assert.rejects(
                db.query("select * from public.easybatt_project_rate_limits"),
                /permission denied/,
              );
              await assert.rejects(
                db.query("select * from public.easybatt_project_deliveries"),
                /permission denied/,
              );
              await assert.rejects(submit(), /permission denied/);
            } finally {
              await db.exec("reset role");
            }
          }
          await db.exec(
            "grant select on public.easybatt_project_requests to authenticated; set role authenticated",
          );
          try {
            assert.deepEqual(
              (await db.query("select * from public.easybatt_project_requests"))
                .rows,
              [],
            );
          } finally {
            await db.exec(
              "reset role; revoke select on public.easybatt_project_requests from authenticated;",
            );
          }
        },
      );
      await db.exec("set role service_role");
      await t.test(
        "duplicate submission does not create another project; changed data conflicts",
        async () => {
          assert.equal(await submit(id), "created");
          assert.equal(await submit(id), "duplicate");
          assert.equal(await submit(id, "different"), "conflict");
          const rows = (
            await db.query("select * from public.easybatt_project_requests")
          ).rows;
          assert.equal(rows.length, 1);
          assert.equal(rows[0].status, "new");
          assert.equal(rows[0].marketing_consent, false);
          assert.ok(rows[0].privacy_acknowledged_at);
          assert.equal(rows[0].privacy_version, "test-v1");
          const deliveries = (
            await db.query("select * from public.easybatt_project_deliveries")
          ).rows;
          assert.equal(deliveries.length, 1);
          assert.equal(deliveries[0].project_id, id);
          assert.equal(deliveries[0].status, "pending");
        },
      );
      await t.test(
        "multiple projects from same person stay distinct within shared limits",
        async () => {
          assert.equal(await submit(), "created");
          assert.equal(await submit(), "created");
          assert.equal(await submit(), "rate_limited");
          assert.equal(
            (
              await db.query(
                "select count(*)::int as n from public.easybatt_project_requests",
              )
            ).rows[0].n,
            3,
          );
          assert.equal(
            (
              await db.query(
                "select count(*)::int as n from public.easybatt_project_deliveries",
              )
            ).rows[0].n,
            3,
          );
          assert.equal(await submit(id), "duplicate");
        },
      );
      await t.test(
        "IP limit also covers rotating email addresses",
        async () => {
          for (let i = 0; i < 5; i++)
            assert.equal(
              await submit(randomUUID(), "hash", "another-ip", `email-${i}`),
              "created",
            );
          assert.equal(
            await submit(randomUUID(), "hash", "another-ip", "email-sixth"),
            "rate_limited",
          );
        },
      );
      await t.test(
        "stale revision cannot overwrite a newer review",
        async () => {
          const row = (
            await db.query(
              "select revision from public.easybatt_project_requests where id=$1",
              [id],
            )
          ).rows[0];
          const update = () =>
            db.query(
              "update public.easybatt_project_requests set status='contacted', revision=gen_random_uuid() where id=$1 and revision=$2 returning id",
              [id, row.revision],
            );
          assert.equal((await update()).rows.length, 1);
          assert.equal((await update()).rows.length, 0);
        },
      );
      await t.test("stale rate buckets are removed", async () => {
        await db.query(
          "insert into public.easybatt_project_rate_limits values('old',now()-interval '3 days',1)",
        );
        assert.equal(
          await submit(randomUUID(), "hash", "fresh-ip", "fresh-email"),
          "created",
        );
        assert.equal(
          (
            await db.query(
              "select * from public.easybatt_project_rate_limits where key='old'",
            )
          ).rows.length,
          0,
        );
      });
    } finally {
      await db.close();
    }
  },
);
