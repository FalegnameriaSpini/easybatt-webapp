export const MAX_PRICE_LISTS = 100;
export const PRICE_LIST_RATES = [
  { key: "serviceRate", label: "Misurazione e taglio", unit: "EUR/ml", max: 1000 },
  { key: "travelRate", label: "Trasferta", unit: "EUR/km A/R", max: 100 },
  { key: "installationRate", label: "Posa in opera", unit: "EUR/ml", max: 1000 },
];

export function newPriceList(id, name = "Nuovo listino") {
  return {
    id, name, status: "draft", supplyDiscountPercent: null,
    serviceRate: null, travelRate: null, installationRate: null,
  };
}

function optionalNumber(value) {
  if (value === null || value === undefined || (typeof value === "string" && !value.trim())) return null;
  if (typeof value !== "number" && typeof value !== "string") return NaN;
  return Number(value);
}

export function validatePriceLists(lists) {
  if (!Array.isArray(lists)) return ["Listini mancanti. Ricarica la pagina admin prima di salvare."];
  if (lists.length > MAX_PRICE_LISTS) return [`Sono consentiti al massimo ${MAX_PRICE_LISTS} listini.`];
  const errors = [];
  const ids = new Set();
  const names = new Set();
  for (const [index, list] of lists.entries()) {
    const label = `Listino ${index + 1}`;
    if (!list || typeof list !== "object" || Array.isArray(list)) {
      errors.push(`${label}: dati non validi.`);
      continue;
    }
    if (typeof list.id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(list.id) || ids.has(list.id)) {
      errors.push(`${label}: identificativo non valido o duplicato.`);
    }
    ids.add(list.id);
    const name = typeof list.name === "string" ? list.name.trim() : "";
    if (!name || name.length > 100 || names.has(name.toLocaleLowerCase("it"))) {
      errors.push(`${label}: inserisci un nome univoco, da 1 a 100 caratteri.`);
    }
    names.add(name.toLocaleLowerCase("it"));
    if (!["draft", "published"].includes(list.status)) errors.push(`${label}: stato non valido.`);
    const fields = [{ key: "supplyDiscountPercent", label: "Sconto battiscopa", max: 100 }, ...PRICE_LIST_RATES];
    for (const field of fields) {
      const value = optionalNumber(list[field.key]);
      if (value !== null && (!Number.isFinite(value) || value < 0 || value > field.max)) {
        errors.push(`${label}, ${field.label}: inserisci un numero tra 0 e ${field.max}.`);
      }
    }
    if (list.status === "published" && optionalNumber(list.supplyDiscountPercent) === null) {
      errors.push(`${label}: conferma lo sconto battiscopa prima di pubblicare (anche 0%).`);
    }
  }
  return errors;
}

export function normalizePriceLists(value) {
  if (value === undefined) return [newPriceList("professionisti", "Professionisti")];
  // Invalid stored rules must not silently turn into free services or active discounts.
  const errors = validatePriceLists(value);
  if (errors.length) throw new Error(errors[0]);
  return value.map((list) => ({
    id: list.id,
    name: list.name.trim(),
    status: list.status,
    supplyDiscountPercent: optionalNumber(list.supplyDiscountPercent),
    ...Object.fromEntries(PRICE_LIST_RATES.map(({ key }) => [key, optionalNumber(list[key])])),
  }));
}

// Administrative preview only. Public pricing and customer authorization stay separate.
export function previewPriceList(config, list, model) {
  const [normalized] = normalizePriceLists([list]);
  const discount = normalized.supplyDiscountPercent ?? 0;
  const publicSupplyPrice = model ? model.supplyBaseCostPerMl * (1 + config.supplyMargin) : null;
  return {
    ...Object.fromEntries(PRICE_LIST_RATES.map(({ key }) => [key, normalized[key] ?? config[key]])),
    publicSupplyPrice,
    supplyPrice: publicSupplyPrice === null ? null : publicSupplyPrice * (1 - discount / 100),
  };
}
