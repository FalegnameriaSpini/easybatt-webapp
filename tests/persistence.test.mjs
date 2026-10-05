import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  assertLocalWritesAllowed, checkAdminPassword, createPersistenceClient,
  MAX_IMAGE_BYTES, persistenceMode, readCloudConfig, validateImage,
  uploadCloudImage, writeCloudConfig,
} from "../lib/easybatt-persistence.mjs";
import { publicEasyBattConfig } from "../lib/easybatt-public-config.mjs";

const env = { SUPABASE_URL: "https://test-project.supabase.co", SUPABASE_SECRET_KEY: "test-secret-not-real" };
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type": "application/json" },
});

test("local and cloud modes are explicit; partial configuration fails closed", () => {
  assert.equal(persistenceMode({}), "local");
  assert.equal(createPersistenceClient({}), null);
  assert.equal(persistenceMode(env), "supabase");
  assert.throws(() => persistenceMode({ SUPABASE_URL: env.SUPABASE_URL }), /incompleta/);
  assert.throws(() => persistenceMode({ SUPABASE_SECRET_KEY: "secret" }), /incompleta/);
  assert.throws(() => assertLocalWritesAllowed({ VERCEL: "1" }), /non configurato/);
  assert.doesNotThrow(() => assertLocalWritesAllowed({}));
});

test("admin default works only in local development; explicit password is required online", () => {
  assert.equal(checkAdminPassword("easybatt-admin", { NODE_ENV: "development" }), true);
  assert.equal(checkAdminPassword("easybatt-admin", { NODE_ENV: "production" }), false);
  assert.equal(checkAdminPassword("easybatt-admin", { NODE_ENV: "development", VERCEL: "1" }), false);
  assert.equal(checkAdminPassword("", {}), false);
  assert.equal(checkAdminPassword("incorrect", { EASYBATT_ADMIN_PASSWORD: "correct" }), false);
  assert.equal(checkAdminPassword("correct", { EASYBATT_ADMIN_PASSWORD: "correct", VERCEL: "1" }), true);
});

test("public catalog preserves every sales price but removes costs, margins and inactive products", async () => {
  const config = JSON.parse(await readFile(new URL("../data/easybatt-config.json", import.meta.url), "utf8"));
  const publicConfig = publicEasyBattConfig(config);
  const privateByCode = new Map(config.models.map((item) => [item.code, item]));
  assert.equal(publicConfig.models.length, config.models.filter((item) => item.active !== false).length);
  for (const model of publicConfig.models) {
    const original = privateByCode.get(model.code);
    assert.equal(model.supplyPricePerMl, original.supplyBaseCostPerMl * (1 + config.supplyMargin));
    assert.equal(model.sectionImageUrl, original.sectionImageUrl);
    assert.equal(model.finishImageUrl, original.finishImageUrl);
  }
  const serialized = JSON.stringify(publicConfig);
  for (const secret of ["supplyBaseCostPerMl", "sourceVatPricePerMl", "supplyMargin"]) {
    assert.equal(serialized.includes(secret), false);
  }
  const inactive = structuredClone(config);
  inactive.models.forEach((model) => { model.active = false; });
  assert.deepEqual(publicEasyBattConfig(inactive).models, []);
});

test("cloud reads use the SDK and disable fetch caching", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.match(String(url), /rest\/v1\/easybatt_config/);
    assert.equal(new URL(url).searchParams.get("id"), "eq.main");
    assert.equal(options.cache, "no-store");
    return json([{ config: { models: [] }, revision: "revision-1" }]);
  });
  assert.deepEqual(await readCloudConfig(createPersistenceClient(env)), { config: { models: [] }, revision: "revision-1" });
});

test("missing cloud catalog never falls back to local prices", async (t) => {
  t.mock.method(globalThis, "fetch", async () => json([]));
  await assert.rejects(readCloudConfig(createPersistenceClient(env)), /non inizializzato/);
});

test("database errors do not expose provider details or silently fall back", async (t) => {
  t.mock.method(globalThis, "fetch", async () => json({ message: "private provider details" }, 401));
  await assert.rejects(readCloudConfig(createPersistenceClient(env)), /Database non disponibile/);
});

test("cloud writes are revision-checked and return a fresh revision", async (t) => {
  const config = { models: [{ code: "A" }] };
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(options.method, "PATCH");
    assert.equal(new URL(url).searchParams.get("revision"), "eq.old-revision");
    const body = JSON.parse(options.body);
    assert.deepEqual(body.config, config);
    assert.notEqual(body.revision, "old-revision");
    return json({ revision: body.revision });
  });
  const saved = await writeCloudConfig(createPersistenceClient(env), config, "old-revision");
  assert.deepEqual(saved.config, config);
  assert.match(saved.revision, /^[a-f0-9-]{36}$/);
});

test("a stale revision rejects the save instead of overwriting another session", async (t) => {
  t.mock.method(globalThis, "fetch", async () => json(null));
  await assert.rejects(writeCloudConfig(createPersistenceClient(env), {}, "stale"), (error) => error.status === 409);
});

test("image validation rejects unsupported, mismatched, empty and oversized content", () => {
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.doesNotThrow(() => validateImage(png, "image/png"));
  assert.throws(() => validateImage(png, "image/jpeg"), /non valido/);
  assert.throws(() => validateImage(Buffer.from("<svg></svg>"), "image/svg+xml"), /non valido/);
  assert.throws(() => validateImage(Buffer.alloc(0), "image/png"), /vuota/);
  assert.throws(() => validateImage(Buffer.alloc(MAX_IMAGE_BYTES + 1), "image/png"), /troppo grande/);
});

test("storage upload uses the product bucket without overwriting existing objects", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.match(String(url), /storage\/v1\/object\/easybatt-models\/test.png/);
    assert.equal(new Headers(options.headers).get("x-upsert"), "false");
    return json({ Key: "easybatt-models/test.png" });
  });
  const url = await uploadCloudImage(createPersistenceClient(env), "test.png", Buffer.from("test"), "image/png");
  assert.equal(url, `${env.SUPABASE_URL}/storage/v1/object/public/easybatt-models/test.png`);
});
