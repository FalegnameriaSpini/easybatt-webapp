import test from "node:test";
import assert from "node:assert/strict";
import {
  projectData,
  projectSource,
  projectReview,
} from "../lib/easybatt-projects.mjs";
import { projectSettings } from "../lib/easybatt-project-settings.mjs";
import {
  limitedJson,
  privateDigest,
  projectReceipt,
  validProjectReceipt,
} from "../lib/easybatt-project-security.mjs";
import { submitProject } from "../lib/easybatt-project-submit.mjs";

const id = "10000000-0000-4000-8000-000000000001";
const env = {
  NODE_ENV: "production",
  EASYBATT_PROJECTS_ENABLED: "1",
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SECRET_KEY: "test-only",
  EASYBATT_PRIVACY_URL: "https://example.test/privacy",
  EASYBATT_PROJECTS_PRIVACY_VERSION: "test-v1",
  EASYBATT_PROJECTS_SECRET: "test-only-secret-not-for-production-123",
};
const valid = {
  full_name: " Mario Rossi ",
  company: "",
  email: "MARIO@example.test",
  phone: "+39 030 1234567",
  profession: "private",
  town: "Gussago",
  province: "bs",
  intervention: "renovation",
  metres: "unknown",
  timing: "unknown",
  notes: "",
  privacy_acknowledged: true,
  marketing_consent: false,
};
const request = (patch = {}, headers = {}) =>
  new Request("https://example.test/api/project-requests", {
    method: "POST",
    headers: {
      origin: "https://example.test",
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      ...valid,
      id,
      website: "",
      privacy_version: "test-v1",
      ...patch,
    }),
  });

test("project data validates contacts and choices without requiring marketing or an account", () => {
  const data = projectData({
    ...valid,
    status: "customer",
    price_list_id: "discount",
  });
  assert.equal(data.email, "mario@example.test");
  assert.equal(data.full_name, "Mario Rossi");
  assert.equal(data.province, "BS");
  assert.equal(data.marketing_consent, false);
  assert.equal(data.status, undefined);
  for (const patch of [
    { full_name: "" },
    { email: "invalid" },
    { phone: "javascript:alert(1)" },
    { province: "BSS" },
    { profession: "admin" },
    { privacy_acknowledged: false },
    { notes: "x".repeat(3001) },
  ])
    assert.throws(() => projectData({ ...valid, ...patch }));
});
test("project enquiries ignore marketing consent from stale or forged clients", () => {
  const withoutConsent = { ...valid };
  delete withoutConsent.marketing_consent;
  assert.equal(projectData(withoutConsent).marketing_consent, false);
  for (const marketing_consent of [true, false, "true", null]) {
    assert.equal(
      projectData({ ...valid, marketing_consent }).marketing_consent,
      false,
    );
  }
});
test("attribution drops raw URLs, unknown paths and unexpected values", () => {
  assert.deepEqual(
    projectSource({
      page: "/account?email=private",
      utm_source: "email",
      utm_campaign: "user@example.test",
      token: "secret",
    }),
    { page: "/prova-easybatt", utm_source: "email" },
  );
  assert.deepEqual(
    projectSource({ page: "/il-sistema", utm_medium: "organic" }),
    { page: "/il-sistema", utm_medium: "organic" },
  );
});
test("activation is fail-closed and sandbox cannot write to the real database", () => {
  assert.equal(projectSettings(env).enabled, true);
  for (const patch of [
    { EASYBATT_PROJECTS_ENABLED: "0" },
    { EASYBATT_PROJECTS_SECRET: "short" },
    { EASYBATT_PROJECTS_PRIVACY_VERSION: "" },
    { EASYBATT_PRIVACY_URL: "javascript:alert(1)" },
    { SUPABASE_SECRET_KEY: "" },
    { EASYBATT_SANDBOX: "1" },
  ])
    assert.equal(projectSettings({ ...env, ...patch }).enabled, false);
  assert.deepEqual(
    projectSettings({ ...env, NODE_ENV: "development", EASYBATT_SANDBOX: "1" }),
    { enabled: false, preview: true },
  );
  assert.equal(
    projectSettings({
      ...env,
      NODE_ENV: "development",
      EASYBATT_SANDBOX: "1",
      VERCEL: "1",
    }).preview,
    false,
  );
});
test("receipt is signed, expires and contains no contact data", () => {
  const now = 1791280000000;
  const receipt = projectReceipt(id, env.EASYBATT_PROJECTS_SECRET, now);
  assert.ok(validProjectReceipt(receipt, env.EASYBATT_PROJECTS_SECRET, now));
  assert.equal(validProjectReceipt(receipt, "wrong", now), false);
  assert.equal(
    validProjectReceipt(receipt, env.EASYBATT_PROJECTS_SECRET, now + 1800000),
    false,
  );
  assert.equal(
    validProjectReceipt(`${receipt}extra`, env.EASYBATT_PROJECTS_SECRET, now),
    false,
  );
  assert.equal(
    validProjectReceipt("", env.EASYBATT_PROJECTS_SECRET, now),
    false,
  );
});
test("body reader limits actual bytes even with no content-length", async () => {
  await assert.rejects(
    limitedJson(
      new Request("https://example.test", {
        method: "POST",
        body: "x".repeat(17000),
      }),
    ),
    (e) => e.status === 413,
  );
  await assert.rejects(
    limitedJson(
      new Request("https://example.test", { method: "POST", body: "not json" }),
    ),
    SyntaxError,
  );
});
test("submission persists only normalized fields and confirms only committed results", async () => {
  let args;
  const createClient = () => ({
    rpc: async (name, value) => {
      assert.equal(name, "easybatt_submit_project");
      args = value;
      return { data: "created", error: null };
    },
  });
  const result = await submitProject(
    request({
      status: "customer",
      marketing_consent: true,
      marketing_text: "forged",
    }),
    {
      env,
      createClient,
    },
  );
  assert.equal(result.status, 201);
  assert.ok(validProjectReceipt(result.receipt, env.EASYBATT_PROJECTS_SECRET));
  assert.equal(args.p_data.email, "mario@example.test");
  assert.equal(args.p_data.status, undefined);
  assert.equal(args.p_data.privacy_version, "test-v1");
  assert.equal(args.p_data.marketing_consent, false);
  assert.equal(args.p_data.marketing_text, "");
  assert.equal(
    args.p_email_key,
    privateDigest("email:mario@example.test", env.EASYBATT_PROJECTS_SECRET),
  );
  for (const [outcome, status] of [
    ["duplicate", 200],
    ["rate_limited", 429],
    ["conflict", 409],
    ["unknown", 503],
  ]) {
    const task = submitProject(request(), {
      env,
      createClient: () => ({
        rpc: async () => ({ data: outcome, error: null }),
      }),
    });
    if (status === 200) assert.equal((await task).status, status);
    else await assert.rejects(task, (err) => err.status === status);
  }
  await assert.rejects(
    submitProject(request(), {
      env,
      createClient: () => ({
        rpc: async () => ({ error: { message: "internal credentials" } }),
      }),
    }),
    (err) => err.status === 503 && !err.message.includes("credentials"),
  );
});
test("invalid, cross-origin, disabled and spam submissions never contact the database", async () => {
  const createClient = () => {
    assert.fail("database should not be called");
  };
  for (const req of [
    request({}, { origin: "https://other.test" }),
    request({}, { "content-type": "text/plain" }),
    request({ website: "spam" }),
    request({ privacy_version: "old" }),
    request({ email: "bad" }),
  ])
    await assert.rejects(submitProject(req, { env, createClient }));
  await assert.rejects(
    submitProject(request(), {
      env: { ...env, EASYBATT_PROJECTS_ENABLED: "0" },
      createClient,
    }),
  );
  await assert.rejects(
    submitProject(request({}, { "x-forwarded-for": "1.2.3.4" }), {
      env: { ...env, VERCEL: "1" },
      createClient,
    }),
  );
});
test("project review allows only operational fields and valid calendar dates", () => {
  const validReview = {
    id,
    revision: id,
    status: "contacted",
    staff_notes: "Called",
    follow_up_on: "2026-10-10",
    marketing_consent: true,
  };
  assert.deepEqual(projectReview(validReview), {
    status: "contacted",
    staff_notes: "Called",
    follow_up_on: "2026-10-10",
  });
  for (const patch of [
    { status: "admin" },
    { id: "invalid" },
    { follow_up_on: "2026-02-30" },
    { staff_notes: "x".repeat(4001) },
  ])
    assert.throws(() => projectReview({ ...validReview, ...patch }));
});
