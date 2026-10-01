export const FINISH_FAMILY_ORDER = [
  "Legno grezzo",
  "Legno verniciato",
  "Laccato",
  "Laminato",
  "PVC",
  "Prelaccato / fondo",
];

export function inferFinishFamily(finish) {
  const value = String(finish || "").trim();
  if (value.startsWith("Laminato")) return "Laminato";
  if (value.startsWith("PVC")) return "PVC";
  if (value.startsWith("Laccato")) return "Laccato";
  if (value === "Grezzo") return "Legno grezzo";
  if (value.startsWith("Verniciato") || value === "Spazzolato") return "Legno verniciato";
  return "Prelaccato / fondo";
}

export function finishLabelFromFilename(filename) {
  const stem = String(filename || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return stem
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "pvc") return "PVC";
      if (lower === "ral") return "RAL";
      return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
    })
    .join(" ");
}

function requiredText(value, field, index, errors, max = 180) {
  const text = typeof value === "string" ? value.trim().slice(0, max) : "";
  if (!text) errors.push(`Riga ${index + 1}: campo ${field} mancante.`);
  return text;
}

function finiteNumber(value, field, index, errors, min = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min) {
    errors.push(`Riga ${index + 1}: valore ${field} non valido.`);
    return 0;
  }
  return parsed;
}

export function mapBattiscopaCatalog(value) {
  if (!Array.isArray(value)) {
    return { models: [], errors: ["Il file deve contenere un elenco JSON di prodotti."] };
  }

  const errors = [];
  const seenCodes = new Set();
  const rawModels = value.slice(0, 1000).flatMap((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push(`Riga ${index + 1}: prodotto non valido.`);
      return [];
    }

    const code = requiredText(item.codice, "codice", index, errors, 40).replace(/[^a-zA-Z0-9_-]/g, "");
    const description = requiredText(item.descrizione, "descrizione", index, errors, 180);
    const material = requiredText(item.materiale, "materiale", index, errors, 120);
    const profile = requiredText(item.sagoma, "sagoma", index, errors, 80);
    const finish = requiredText(item.finitura, "finitura", index, errors, 120);
    const measure = requiredText(item.misura, "misura", index, errors, 40);
    const profileImage = requiredText(item.immagine_profilo, "immagine_profilo", index, errors, 180);
    const finishImage = requiredText(item.immagine_finitura, "immagine_finitura", index, errors, 180);

    if (!code || !description || !material || !profile || !finish || !measure || !profileImage || !finishImage) return [];
    if (seenCodes.has(code)) {
      errors.push(`Riga ${index + 1}: codice duplicato ${code}.`);
      return [];
    }
    seenCodes.add(code);

    return [{
      code,
      description,
      material,
      height: finiteNumber(item.altezza_mm, "altezza_mm", index, errors, 1),
      thickness: finiteNumber(item.spessore_mm, "spessore_mm", index, errors, 1),
      measure,
      stickLengthLabel: requiredText(String(item.stecca_mm ?? ""), "stecca_mm", index, errors, 40),
      profile,
      finish,
      finishFamily: inferFinishFamily(finish),
      finishLabel: finishLabelFromFilename(finishImage),
      weightKgMl: finiteNumber(item.peso_kg_ml, "peso_kg_ml", index, errors),
      supplyBaseCostPerMl: finiteNumber(item.prezzo_netto, "prezzo_netto", index, errors),
      sourceVatPricePerMl: finiteNumber(item.prezzo_iva, "prezzo_iva", index, errors),
      sectionImageUrl: `/catalog/profili/${encodeURIComponent(profileImage)}`,
      finishImageUrl: `/catalog/finiture/${encodeURIComponent(finishImage)}`,
      active: true,
    }];
  });

  if (value.length > 1000) errors.push("Il catalogo supera il limite di 1000 prodotti.");
  const materialsByFinishImage = new Map();
  rawModels.forEach((model) => {
    if (!materialsByFinishImage.has(model.finishImageUrl)) materialsByFinishImage.set(model.finishImageUrl, new Set());
    materialsByFinishImage.get(model.finishImageUrl).add(model.material);
  });

  const models = rawModels.map((model) => {
    const hasMaterialVariants = materialsByFinishImage.get(model.finishImageUrl)?.size > 1;
    return {
      ...model,
      finishKey: hasMaterialVariants ? `${model.finishImageUrl}|${model.material}` : model.finishImageUrl,
      finishLabel: hasMaterialVariants ? `${model.finishLabel} · ${model.material}` : model.finishLabel,
    };
  });

  return { models, errors };
}
