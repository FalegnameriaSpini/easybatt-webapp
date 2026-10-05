import test from "node:test";
import assert from "node:assert/strict";
import { normalizeEasyBattConfig } from "../lib/easybatt-config.js";
import { MAX_PRICE_LISTS, newPriceList, normalizePriceLists, previewPriceList, validatePriceLists } from "../lib/easybatt-price-lists.mjs";
import { publicEasyBattConfig } from "../lib/easybatt-public-config.mjs";
import { createPersistenceClient, persistenceMode } from "../lib/easybatt-persistence.mjs";

test("existing catalogs get a professional draft with no assumed discount or service prices", () => {
  const config = normalizeEasyBattConfig({});
  assert.deepEqual(config.priceLists, [newPriceList("professionisti", "Professionisti")]);
  assert.deepEqual(normalizeEasyBattConfig(config).priceLists, config.priceLists);
  assert.deepEqual(normalizePriceLists([]), []);
});

test("blank rates inherit public prices, while an explicit zero is free", () => {
  const config = normalizeEasyBattConfig({ serviceRate: 4, travelRate: 1, installationRate: 5 });
  const draft = { ...newPriceList("test"), serviceRate: "", travelRate: "0", installationRate: "2.5" };
  const preview = previewPriceList(config, draft, config.models[0]);
  assert.equal(preview.serviceRate, 4);
  assert.equal(preview.travelRate, 0);
  assert.equal(preview.installationRate, 2.5);
  assert.equal(normalizePriceLists([draft])[0].serviceRate, null);
  assert.equal(normalizePriceLists([draft])[0].travelRate, 0);
});

test("supply discount applies to public supply price, not purchase cost or service rates", () => {
  const config = normalizeEasyBattConfig({ supplyMargin: 0.3, serviceRate: 4, travelRate: 1, installationRate: 5 });
  const list = { ...newPriceList("test"), supplyDiscountPercent: "20" };
  const before = structuredClone(config);
  const preview = previewPriceList(config, list, { supplyBaseCostPerMl: 10 });
  assert.equal(preview.publicSupplyPrice, 13);
  assert.equal(preview.supplyPrice, 10.4);
  assert.equal(preview.serviceRate, 4);
  assert.equal(preview.travelRate, 1);
  assert.equal(preview.installationRate, 5);
  assert.deepEqual(config, before);
});

test("publishing requires a deliberate discount, including an explicit zero", () => {
  const list = { ...newPriceList("test"), status: "published" };
  assert.match(validatePriceLists([list])[0], /conferma lo sconto/);
  assert.deepEqual(validatePriceLists([{ ...list, supplyDiscountPercent: 0 }]), []);
  assert.deepEqual(validatePriceLists([{ ...list, supplyDiscountPercent: 100 }]), []);
  assert.equal(previewPriceList(normalizeEasyBattConfig({}), { ...list, supplyDiscountPercent: 100 }, { supplyBaseCostPerMl: 10 }).supplyPrice, 0);
});

test("invalid numbers, objects, excessive discounts and negative tariffs are rejected", () => {
  for (const supplyDiscountPercent of [-1, 101, "NaN", Infinity, true, [], {}]) {
    const lists = [{ ...newPriceList("test"), supplyDiscountPercent }];
    assert.ok(validatePriceLists(lists).length);
    assert.throws(() => normalizePriceLists(lists));
  }
  for (const [key, value] of [["serviceRate", -1], ["travelRate", 101], ["installationRate", 1001]]) {
    assert.ok(validatePriceLists([{ ...newPriceList("test"), [key]: value }]).length);
  }
});

test("identities and names are required and unique, with bounded size and state", () => {
  assert.ok(validatePriceLists(undefined).length);
  assert.ok(validatePriceLists({}).length);
  assert.ok(validatePriceLists([null]).length);
  assert.ok(validatePriceLists([newPriceList("bad/id")]).length);
  assert.ok(validatePriceLists([newPriceList("one", "")]).length);
  assert.ok(validatePriceLists([newPriceList("one", "x".repeat(101))]).length);
  assert.ok(validatePriceLists([newPriceList("one"), newPriceList("one", "Other")]).length);
  assert.ok(validatePriceLists([newPriceList("one", "Pro"), newPriceList("two", " PRO ")]).length);
  assert.ok(validatePriceLists([{ ...newPriceList("one"), status: "active" }]).length);
  assert.ok(validatePriceLists(Array.from({ length: MAX_PRICE_LISTS + 1 }, (_, i) => newPriceList(`id-${i}`, `List ${i}`))).length);
});

test("saved rules retain null versus zero, stable IDs and draft status through JSON round trips", () => {
  const config = normalizeEasyBattConfig({ priceLists: [{ ...newPriceList("stable-id", "  Professionisti  "), supplyDiscountPercent: "15", travelRate: 0 }] });
  const saved = normalizeEasyBattConfig(JSON.parse(JSON.stringify(config)));
  assert.deepEqual(saved.priceLists, config.priceLists);
  assert.equal(saved.priceLists[0].id, "stable-id");
  assert.equal(saved.priceLists[0].name, "Professionisti");
  assert.equal(saved.priceLists[0].status, "draft");
  assert.equal(saved.priceLists[0].serviceRate, null);
  assert.equal(saved.priceLists[0].travelRate, 0);
});

test("draft and published dedicated lists do not alter or leak into the public catalog", () => {
  const config = normalizeEasyBattConfig({});
  const before = publicEasyBattConfig(config);
  for (const status of ["draft", "published"]) {
    config.priceLists = [{ ...newPriceList("private-list", "Private customer terms"), status, supplyDiscountPercent: 99, serviceRate: 0 }];
    assert.deepEqual(publicEasyBattConfig(config), before);
    const serialized = JSON.stringify(publicEasyBattConfig(config));
    for (const field of ["priceLists", "Private customer terms", "supplyDiscountPercent"]) assert.equal(serialized.includes(field), false);
  }
});

test("catalog replacement preserves dedicated lists", () => {
  const config = normalizeEasyBattConfig({ priceLists: [{ ...newPriceList("stable"), supplyDiscountPercent: 10 }] });
  const imported = normalizeEasyBattConfig({ ...config, models: config.models.slice(0, 1) });
  assert.deepEqual(imported.priceLists, config.priceLists);
});

test("sandbox bypasses cloud configuration only in local development", () => {
  const env = { EASYBATT_SANDBOX: "1", NODE_ENV: "development", SUPABASE_URL: "https://unused.supabase.co", SUPABASE_SECRET_KEY: "not-used" };
  assert.equal(persistenceMode(env), "sandbox");
  assert.equal(createPersistenceClient(env), null);
  assert.throws(() => persistenceMode({ ...env, VERCEL: "1" }), /solo in sviluppo locale/);
  assert.throws(() => persistenceMode({ ...env, NODE_ENV: "production" }), /solo in sviluppo locale/);
});
