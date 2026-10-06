import { publicEasyBattConfig } from "./easybatt-public-config.mjs";

export const CONSENT_VERSION = "2026-10-05-v1";
export const MARKETING_TEXT = "Desidero ricevere via email novita e offerte EasyBatt. Posso revocare il consenso in qualsiasi momento.";
export const CUSTOMER_STATES = { private: "Privato", pending: "In attesa di approvazione", approved: "Professionista approvato", rejected: "Richiesta non approvata" };

export function registrationData(input) {
  const name = typeof input?.full_name === "string" ? input.full_name.trim() : "";
  const company = typeof input?.company_name === "string" ? input.company_name.trim() : "";
  const vat = typeof input?.vat_number === "string" ? input.vat_number.trim().replace(/^IT/i, "") : "";
  if (!name || name.length > 120) throw new Error("Inserisci il nome (massimo 120 caratteri).");
  if (!["private", "professional"].includes(input.account_type)) throw new Error("Seleziona il tipo di account.");
  if (input.account_type === "professional" && (!company || company.length > 160 || !/^\d{11}$/.test(vat) || /^0+$/.test(vat))) {
    throw new Error("Inserisci ragione sociale e partita IVA italiana di 11 cifre. La verifica dell'attivita sara' manuale.");
  }
  if (input.privacy_acknowledged !== true) throw new Error("Conferma di aver letto l'informativa privacy.");
  if (typeof input.marketing_consent !== "boolean") throw new Error("Preferenza email non valida.");
  return {
    registration_source: "easybatt-v1", full_name: name, account_type: input.account_type,
    company_name: input.account_type === "professional" ? company : "",
    vat_number: input.account_type === "professional" ? vat : "",
    privacy_acknowledged: true, consent_version: CONSENT_VERSION, marketing_consent: input.marketing_consent,
  };
}

export function customerPricing(config, customer) {
  const result = publicEasyBattConfig(config);
  const list = customer?.account_type === "professional" && customer.status === "approved" && customer.email_confirmed_at
    ? config.priceLists?.find((item) => item.id === customer.price_list_id && item.status === "published") : null;
  if (!list) return { config: result, pricing: { kind: "public", name: "Listino pubblico" } };
  for (const key of ["serviceRate", "travelRate", "installationRate"]) result[key] = list[key] ?? config[key];
  for (const model of result.models) model.supplyPricePerMl *= 1 - list.supplyDiscountPercent / 100;
  return { config: result, pricing: { kind: "dedicated", name: list.name } };
}

export function customerDecision(body, customer, config) {
  if (!body || !["pending", "approved", "rejected"].includes(body.status) || customer.account_type !== "professional") {
    throw new Error("Operazione non valida per questo cliente.");
  }
  if (body.status === "approved" && !customer.email_confirmed_at) throw new Error("Il cliente deve prima confermare l'email.");
  const id = body.price_list_id || null;
  if (body.status === "approved" && id && !config.priceLists.some((list) => list.id === id && list.status === "published")) {
    throw new Error("Seleziona un listino pubblicato e salvato, oppure il listino pubblico.");
  }
  return { status: body.status, price_list_id: body.status === "approved" ? id : null };
}
