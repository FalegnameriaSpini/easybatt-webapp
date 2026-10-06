import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { registrationData } from "../lib/easybatt-customers.mjs";

test("customer migration, triggers and permissions in isolated in-memory PostgreSQL", { timeout: 60000 }, async (t) => {
  const db = new PGlite();
  const id = "10000000-0000-4000-8000-000000000001";
  const privateId = "10000000-0000-4000-8000-000000000002";
  const details = registrationData({ full_name: "Mario Rossi", account_type: "professional", company_name: "Esempio SRL", vat_number: "12345678901", privacy_acknowledged: true, marketing_consent: false });
  const profile = async () => (await db.query("select * from public.easybatt_customers where id=$1", [id])).rows[0];
  const insert = (userId, metadata) => db.query("insert into auth.users(id,email,raw_user_meta_data) values($1,$2,$3)", [userId, `${userId}@example.test`, metadata]);
  try {
    await db.exec(`
      create role anon;
      create role authenticated;
      create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key, email text, email_confirmed_at timestamptz, raw_user_meta_data jsonb);
      alter default privileges in schema public grant all on tables to anon, authenticated;
    `);
    await db.exec(await readFile(new URL("../supabase/migrations/202610050002_customers.sql", import.meta.url), "utf8"));

    await t.test("signup ignores forged approval and list while recording optional consent", async () => {
      await insert(id, { ...details, status: "approved", price_list_id: "pro", role: "admin" });
      const p = await profile();
      assert.equal(p.status, "pending");
      assert.equal(p.price_list_id, null);
      assert.equal(p.email_confirmed_at, null);
      assert.equal(p.marketing_consent, false);
      assert.equal(p.privacy_version, "2026-10-05-v1");
      const events = await db.query("select * from public.easybatt_consent_events");
      assert.equal(events.rows.length, 1);
      assert.equal(events.rows[0].granted, false);
      assert.equal(events.rows[0].source, "registration");
      await insert(privateId, registrationData({ ...details, account_type: "private" }));
      const priv = (await db.query("select * from public.easybatt_customers where id=$1", [privateId])).rows[0];
      assert.equal(priv.status, "private");
      assert.equal(priv.company_name, "");
    });

    await t.test("invalid registration atomically rejects auth user, metadata edits cannot grant privileges", async () => {
      const invalidId = "10000000-0000-4000-8000-000000000003";
      for (const patch of [{ privacy_acknowledged: false }, { marketing_consent: "true" }, { vat_number: "123" }, { full_name: "" }, { consent_version: "forged" }]) {
        await assert.rejects(insert(invalidId, { ...details, ...patch }));
      }
      assert.equal((await db.query("select id from auth.users where id=$1", [invalidId])).rows.length, 0);
      await db.query("update auth.users set raw_user_meta_data=$1 where id=$2", [{ ...details, status: "approved", price_list_id: "pro", marketing_consent: true }, id]);
      assert.equal((await profile()).status, "pending");
      assert.equal((await profile()).marketing_consent, false);
    });

    await t.test("email confirmation and email changes are synchronized from auth", async () => {
      const old = await profile();
      await db.query("update auth.users set email_confirmed_at=now() where id=$1", [id]);
      assert.ok((await profile()).email_confirmed_at);
      assert.notEqual((await profile()).revision, old.revision);
      await db.query("update auth.users set email=$1 where id=$2", ["new@example.test", id]);
      assert.equal((await profile()).email, "new@example.test");
    });

    await t.test("anonymous and authenticated clients cannot read or change private tables or invoke triggers", async () => {
      for (const role of ["anon", "authenticated"]) {
        await db.exec(`set role ${role}`);
        try {
          for (const table of ["easybatt_customers", "easybatt_consent_events", "easybatt_customer_reviews"]) await assert.rejects(db.query(`select * from public.${table}`), /permission denied/);
          await assert.rejects(db.query("update public.easybatt_customers set status='approved' where id=$1", [id]), /permission denied/);
          await assert.rejects(db.query("select public.easybatt_auth_customer()"), /permission denied/);
        } finally { await db.exec("reset role"); }
      }
      await db.exec("grant select on public.easybatt_customers to authenticated; set role authenticated");
      try { assert.equal((await db.query("select * from public.easybatt_customers")).rows.length, 0); }
      finally { await db.exec("reset role; revoke select on public.easybatt_customers from authenticated"); }
    });

    await t.test("server changes are revision checked and audited transactionally", async () => {
      const old = await profile();
      await db.exec("set role service_role");
      try {
        const changed = await db.query("update public.easybatt_customers set status='approved',price_list_id='pro' where id=$1 and revision=$2 returning revision", [id, old.revision]);
        assert.equal(changed.rows.length, 1);
        assert.notEqual(changed.rows[0].revision, old.revision);
        const stale = await db.query("update public.easybatt_customers set status='rejected',price_list_id=null where id=$1 and revision=$2 returning revision", [id, old.revision]);
        assert.equal(stale.rows.length, 0);
        const reviews = await db.query("select * from public.easybatt_customer_reviews where customer_id=$1", [id]);
        assert.equal(reviews.rows.length, 1);
        assert.equal(reviews.rows[0].previous_status, "pending");
        await db.query("update public.easybatt_customers set marketing_consent=true where id=$1", [id]);
        await db.query("update public.easybatt_customers set marketing_consent=true where id=$1", [id]);
        await db.query("update public.easybatt_customers set marketing_consent=false where id=$1", [id]);
        const events = await db.query("select granted,source from public.easybatt_consent_events where customer_id=$1 order by id", [id]);
        assert.deepEqual(events.rows, [{ granted: false, source: "registration" }, { granted: true, source: "account" }, { granted: false, source: "account" }]);
      } finally { await db.exec("reset role"); }
    });

    await t.test("account deletion cascades to customer and audit history", async () => {
      await db.query("delete from auth.users where id=$1", [id]);
      assert.equal(await profile(), undefined);
      for (const table of ["easybatt_consent_events", "easybatt_customer_reviews"]) assert.equal((await db.query(`select * from public.${table} where customer_id=$1`, [id])).rows.length, 0);
    });
  } finally { await db.close(); }
});
