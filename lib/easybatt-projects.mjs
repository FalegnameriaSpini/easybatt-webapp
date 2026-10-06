export const PROJECT_PROFESSIONS = {
  installer: "Posatore / parquetista",
  carpenter: "Falegname",
  contractor: "Impresa / ristrutturatore",
  retailer: "Rivenditore / showroom",
  professional: "Altro professionista",
  private: "Privato",
};
export const PROJECT_INTERVENTIONS = {
  new: "Nuova costruzione",
  renovation: "Ristrutturazione",
  replacement: "Sostituzione battiscopa",
  other: "Altro",
};
export const PROJECT_METRES = {
  unknown: "Non lo so ancora",
  up_to_50: "Fino a 50 m",
  up_to_100: "Oltre 50 fino a 100 m",
  up_to_200: "Oltre 100 fino a 200 m",
  over_200: "Oltre 200 m",
};
export const PROJECT_TIMING = {
  asap: "Appena possibile",
  month: "Entro 30 giorni",
  quarter: "1-3 mesi",
  later: "Oltre 3 mesi",
  unknown: "Non ancora definita",
};
export const PROJECT_STATES = {
  new: "Nuovo",
  to_contact: "Da contattare",
  contacted: "Contattato",
  evaluating: "Da valutare",
  suitable: "Progetto idoneo",
  unsuitable: "Progetto non idoneo",
  opportunity: "Opportunità",
  customer: "Cliente",
};
export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ProjectValidationError extends Error {
  constructor(fields) {
    super("Controlla i campi indicati.");
    this.fields = fields;
  }
}

export function projectData(input) {
  const source =
    input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const fields = {};
  const text = (key, max, required = false) => {
    const value = typeof source[key] === "string" ? source[key].trim() : "";
    if (
      (required && !value) ||
      value.length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
    )
      fields[key] = `Inserisci un valore valido (massimo ${max} caratteri).`;
    return value;
  };
  const option = (key, values) => {
    if (!Object.hasOwn(values, source[key]))
      fields[key] = "Seleziona una delle opzioni.";
    return source[key];
  };
  const data = {
    full_name: text("full_name", 120, true),
    company: text("company", 160),
    email: text("email", 254, true).toLowerCase(),
    phone: text("phone", 32, true),
    profession: option("profession", PROJECT_PROFESSIONS),
    town: text("town", 100, true),
    province: text("province", 2, true).toUpperCase(),
    intervention: option("intervention", PROJECT_INTERVENTIONS),
    metres: option("metres", PROJECT_METRES),
    timing: option("timing", PROJECT_TIMING),
    notes: text("notes", 3000),
    // Project enquiries do not collect marketing consent in this launch phase.
    marketing_consent: false,
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    fields.email = "Inserisci un indirizzo email valido.";
  if (
    !/^\+?[\d\s().-]+$/.test(data.phone) ||
    data.phone.replace(/\D/g, "").length < 6 ||
    data.phone.replace(/\D/g, "").length > 15
  )
    fields.phone = "Inserisci un numero di telefono valido.";
  if (!/^[A-Z]{2}$/.test(data.province))
    fields.province = "Inserisci la sigla della provincia (es. BS).";
  if (source.privacy_acknowledged !== true)
    fields.privacy_acknowledged =
      "Conferma di aver letto l'informativa privacy.";
  if (Object.keys(fields).length) throw new ProjectValidationError(fields);
  return data;
}

// Only explicit campaign labels and known paths: never store full URLs or query strings.
export function projectSource(input = {}) {
  const paths = [
    "/",
    "/come-funziona",
    "/per-professionisti",
    "/il-sistema",
    "/chi-siamo",
    "/quanto-mi-costa",
    "/prova-easybatt",
  ];
  const result = {
    page: paths.includes(input?.page) ? input.page : "/prova-easybatt",
  };
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = input?.[key];
    if (typeof value === "string" && /^[\w .-]{1,100}$/.test(value))
      result[key] = value;
  }
  return result;
}

export function projectReview(input) {
  if (
    !input ||
    !UUID_PATTERN.test(input.id) ||
    !UUID_PATTERN.test(input.revision) ||
    !Object.hasOwn(PROJECT_STATES, input.status)
  )
    throw new Error("Richiesta o stato non valido.");
  if (typeof input.staff_notes !== "string" || input.staff_notes.length > 4000)
    throw new Error("Le note possono contenere al massimo 4000 caratteri.");
  const date = input.follow_up_on || null;
  if (
    date &&
    (typeof date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date)
  )
    throw new Error("Data del ricontatto non valida.");
  return {
    status: input.status,
    staff_notes: input.staff_notes.trim(),
    follow_up_on: date,
  };
}
