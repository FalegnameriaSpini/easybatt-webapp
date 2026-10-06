import test from "node:test";
import assert from "node:assert/strict";
import { registrationData, customerPricing, customerDecision, CONSENT_VERSION } from "../lib/easybatt-customers.mjs";
import { authSettings } from "../lib/easybatt-auth-settings.mjs";
import { normalizeEasyBattConfig } from "../lib/easybatt-config.js";
import { newPriceList } from "../lib/easybatt-price-lists.mjs";
import { publicEasyBattConfig } from "../lib/easybatt-public-config.mjs";

const registration = { full_name: " Mario Rossi ", account_type: "private", privacy_acknowledged: true, marketing_consent: false };
const list = { ...newPriceList("pro", "Professionisti"), status: "published", supplyDiscountPercent: 20, serviceRate: 2, travelRate: 0 };
const config = normalizeEasyBattConfig({ priceLists: [list] });
const approved = { account_type: "professional", status: "approved", email_confirmed_at: "2026-10-05T10:00:00Z", price_list_id: "pro" };

test("registration does not grant professional rights from client metadata", () => {
  const data = registrationData({ ...registration, status: "approved", price_list_id: "pro", role: "admin" });
  assert.equal(data.full_name, "Mario Rossi");
  assert.equal(data.marketing_consent, false);
  assert.equal(data.consent_version, CONSENT_VERSION);
  for (const key of ["status", "price_list_id", "role"]) assert.equal(Object.hasOwn(data, key), false);
});

test("privacy acknowledgement is separate from optional marketing", () => {
  assert.equal(registrationData(registration).marketing_consent, false);
  assert.equal(registrationData({ ...registration, marketing_consent: true }).marketing_consent, true);
  for (const value of [undefined, false, "true"]) assert.throws(() => registrationData({ ...registration, privacy_acknowledged: value }));
  assert.throws(() => registrationData({ ...registration, marketing_consent: "true" }));
});

test("professionals require bounded company name and Italian VAT format, private customers do not", () => {
  assert.throws(() => registrationData({ ...registration, account_type: "professional" }));
  const professional = { ...registration, account_type: "professional", company_name: " Ditta esempio ", vat_number: "IT12345678901" };
  assert.equal(registrationData(professional).vat_number, "12345678901");
  for (const value of ["", "00000000000", "123", "1234567890x"]) assert.throws(() => registrationData({ ...professional, vat_number: value }));
  assert.equal(registrationData({ ...registration, vat_number: "123", company_name: "Ignored" }).company_name, "");
  assert.throws(() => registrationData({ ...registration, full_name: "x".repeat(121) }));
});

test("only confirmed approved professional customers receive assigned published prices", () => {
  const publicConfig = publicEasyBattConfig(config);
  for (const customer of [null, {}, { ...approved, status: "pending" }, { ...approved, status: "rejected" }, { ...approved, account_type: "private" }, { ...approved, email_confirmed_at: null }, { ...approved, price_list_id: "other" }]) {
    assert.deepEqual(customerPricing(config, customer), { config: publicConfig, pricing: { kind: "public", name: "Listino pubblico" } });
  }
  assert.equal(customerPricing({ ...config, priceLists: [{ ...list, status: "draft" }] }, approved).pricing.kind, "public");
  assert.equal(customerPricing({ ...config, priceLists: [] }, approved).pricing.kind, "public");
});

test("personal prices discount selling price only, respect zero and inheritance, expose no private rules", () => {
  const before = structuredClone(config);
  const result = customerPricing(config, approved);
  const publicConfig = publicEasyBattConfig(config);
  assert.equal(result.pricing.name, "Professionisti");
  assert.equal(result.config.serviceRate, 2);
  assert.equal(result.config.travelRate, 0);
  assert.equal(result.config.installationRate, config.installationRate);
  assert.equal(result.config.models[0].supplyPricePerMl, publicConfig.models[0].supplyPricePerMl * 0.8);
  assert.equal(result.config.vat, config.vat);
  assert.deepEqual(result.config.shippingBands, publicConfig.shippingBands);
  for (const field of ["priceLists", "supplyMargin", "supplyBaseCostPerMl", "sourceVatPricePerMl"]) assert.equal(JSON.stringify(result).includes(`"${field}"`), false);
  assert.deepEqual(config, before);
});

test("admin decisions require email confirmation and published lists, revocation clears assignment", () => {
  assert.deepEqual(customerDecision({ status: "approved", price_list_id: "pro" }, approved, config), { status: "approved", price_list_id: "pro" });
  assert.throws(() => customerDecision({ status: "approved", price_list_id: "pro" }, { ...approved, email_confirmed_at: null }, config));
  assert.throws(() => customerDecision({ status: "approved", price_list_id: "missing" }, approved, config));
  assert.throws(() => customerDecision({ status: "approved", price_list_id: "pro" }, approved, { ...config, priceLists: [{ ...list, status: "draft" }] }));
  assert.throws(() => customerDecision({ status: "approved" }, { account_type: "private" }, config));
  assert.deepEqual(customerDecision({ status: "rejected", price_list_id: "pro" }, approved, config), { status: "rejected", price_list_id: null });
});

test("customer auth is opt-in, never exposes secret keys and stays disabled in the catalog sandbox", () => {
  const env = { EASYBATT_AUTH_ENABLED: "1", SUPABASE_URL: "https://example.supabase.co", SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test", SUPABASE_SECRET_KEY: "sb_secret_never_expose", EASYBATT_PRIVACY_URL: "https://example.com/privacy" };
  assert.equal(authSettings(env).enabled, true);
  assert.equal(JSON.stringify(authSettings(env)).includes("sb_secret"), false);
  assert.deepEqual(authSettings({ ...env, EASYBATT_SANDBOX: "1" }), { enabled: false });
  for (const key of Object.keys(env)) assert.deepEqual(authSettings({ ...env, [key]: "" }), { enabled: false });
  assert.deepEqual(authSettings({ ...env, SUPABASE_PUBLISHABLE_KEY: "sb_secret_wrong_key" }), { enabled: false });
  assert.deepEqual(authSettings({ ...env, EASYBATT_PRIVACY_URL: "javascript:alert(1)" }), { enabled: false });
});
