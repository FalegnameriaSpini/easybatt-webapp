export const DEFAULT_EASYBATT_CONFIG = {
  version: 1,
  serviceRate: 3.6,
  travelRate: 0.95,
  installationRate: 3,
  packagingWeightKgMl: 0.07,
  supplyMargin: 0.3,
  vat: 0.22,
  headquartersLabel: "Via Benedetto Castelli,40/42 - Gussago - BS",
  whatsappNumber: "393445677063",
  whatsappVerifyMessage:
    "Ciao, ho visto il prezzo per il mio progetto EasyBatt e vorrei prenotare la verifica.",
  whatsappRecapMessage:
    "Ciao, vorrei inviare il riepilogo del mio progetto EasyBatt.",
  whatsappMessage: "Ciao, ho visto EasyBatt e vorrei un chiarimento.",
  shippingBands: [
    { maxKg: 50, price: 17.5 },
    { maxKg: 100, price: 35 },
    { maxKg: 200, price: 70 },
    { maxKg: 300, price: 105 },
  ],
  models: [
    { code: "3013R3TG01", description: "30x13 R3 Tanganika Grezzo", material: "Multist. Tanganika", height: 30, thickness: 13, profile: "Raggio 3", finish: "Grezzo", weightKgMl: 0.1014, supplyBaseCostPerMl: 3.2, active: true },
    { code: "3013R3TG11", description: "30x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 30, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.1014, supplyBaseCostPerMl: 3.2, active: true },
    { code: "4013R3TG11", description: "40x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 40, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.1352, supplyBaseCostPerMl: 4, active: true },
    { code: "4013R3RV02", description: "40x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 40, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.1352, supplyBaseCostPerMl: 4, active: true },
    { code: "5013R3TG11", description: "50x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 50, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.169, supplyBaseCostPerMl: 4, active: true },
    { code: "5013R3RV02", description: "50x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 50, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.169, supplyBaseCostPerMl: 4, active: true },
    { code: "8013R3TG11", description: "80x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 80, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.2704, supplyBaseCostPerMl: 4, active: true },
    { code: "8013R3RV02", description: "80x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 80, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.2704, supplyBaseCostPerMl: 4, active: true },
    { code: "10013R3TG11", description: "100x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 100, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.338, supplyBaseCostPerMl: 4, active: true },
    { code: "10015AYB14", description: "100x15 Baroc Ayous 9010", material: "Massello Ayous", height: 100, thickness: 15, profile: "Barocco", finish: "Ral 9010", weightKgMl: 0.39, supplyBaseCostPerMl: 4.8, active: true },
    { code: "12013R3RV02", description: "120x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 120, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.4056, supplyBaseCostPerMl: 4.8, active: true },
    { code: "12015ROB01", description: "120x15 Baroc Rovere Grezzo", material: "Massello Rovere", height: 120, thickness: 15, profile: "Barocco", finish: "Grezzo", weightKgMl: 0.468, supplyBaseCostPerMl: 8.96, active: true },
  ],
};

function finiteNumber(value, fallback, min, max) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function text(value, fallback, max = 180) {
  return typeof value === "string" ? value.trim().slice(0, max) || fallback : fallback;
}

export function normalizeEasyBattConfig(value) {
  const input = value && typeof value === "object" ? value : {};
  const fallback = DEFAULT_EASYBATT_CONFIG;
  const defaultModels = new Map(fallback.models.map((item) => [item.code, item]));

  const models = Array.isArray(input.models)
    ? input.models.slice(0, 200).flatMap((raw, index) => {
        if (!raw || typeof raw !== "object") return [];
        const item = raw;
        const code = text(item.code, `MODEL-${index + 1}`, 40).replace(/[^a-zA-Z0-9_-]/g, "");
        const description = text(item.description, "", 160);
        if (!code || !description) return [];
        const defaultModel = defaultModels.get(code) || fallback.models[0];
        return [{
          code,
          description,
          material: text(item.material, defaultModel.material, 80),
          height: finiteNumber(item.height, defaultModel.height, 1, 500),
          thickness: finiteNumber(item.thickness, defaultModel.thickness, 1, 100),
          profile: text(item.profile, defaultModel.profile, 80),
          finish: text(item.finish, defaultModel.finish, 80),
          weightKgMl: finiteNumber(item.weightKgMl, defaultModel.weightKgMl, 0, 20),
          supplyBaseCostPerMl: finiteNumber(item.supplyBaseCostPerMl, defaultModel.supplyBaseCostPerMl, 0, 1000),
          active: item.active !== false,
        }];
      })
    : fallback.models.map((item) => ({ ...item }));

  const shippingBands = Array.isArray(input.shippingBands)
    ? input.shippingBands.slice(0, 20).flatMap((raw) => {
        if (!raw || typeof raw !== "object") return [];
        return [{
          maxKg: finiteNumber(raw.maxKg, 50, 1, 10000),
          price: finiteNumber(raw.price, 0, 0, 10000),
        }];
      }).sort((a, b) => a.maxKg - b.maxKg)
    : fallback.shippingBands.map((item) => ({ ...item }));

  return {
    version: fallback.version,
    serviceRate: finiteNumber(input.serviceRate, fallback.serviceRate, 0, 1000),
    travelRate: finiteNumber(input.travelRate, fallback.travelRate, 0, 100),
    installationRate: finiteNumber(input.installationRate, fallback.installationRate, 0, 1000),
    packagingWeightKgMl: finiteNumber(input.packagingWeightKgMl, fallback.packagingWeightKgMl, 0, 20),
    supplyMargin: finiteNumber(input.supplyMargin, fallback.supplyMargin, 0, 10),
    vat: finiteNumber(input.vat, fallback.vat, 0, 1),
    headquartersLabel: text(input.headquartersLabel, fallback.headquartersLabel, 180),
    whatsappNumber: phoneDigits(text(input.whatsappNumber, fallback.whatsappNumber, 30)),
    whatsappVerifyMessage: text(input.whatsappVerifyMessage, fallback.whatsappVerifyMessage, 300),
    whatsappRecapMessage: text(input.whatsappRecapMessage, fallback.whatsappRecapMessage, 300),
    whatsappMessage: text(input.whatsappMessage, fallback.whatsappMessage, 300),
    shippingBands: shippingBands.length ? shippingBands : fallback.shippingBands.map((item) => ({ ...item })),
    models: models.length ? models : fallback.models.map((item) => ({ ...item })),
  };
}

export function phoneDigits(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("3")) digits = `39${digits}`;
  return digits.slice(0, 15);
}
