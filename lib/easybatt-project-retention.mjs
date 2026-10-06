import { UUID_PATTERN } from "./easybatt-projects.mjs";

export function romeDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
}

export function validContactDate(value, createdAt, today = romeDate()) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value &&
    value >= romeDate(new Date(createdAt)) &&
    value <= today
  );
}

export function projectCanExpire(project, today = romeDate()) {
  return (
    project.status !== "customer" &&
    Boolean(project.last_contact_on && project.retention_due_on) &&
    project.retention_due_on <= today
  );
}

export function projectDeletion(input) {
  if (
    !input ||
    typeof input.id !== "string" ||
    !UUID_PATTERN.test(input.id) ||
    typeof input.revision !== "string" ||
    !UUID_PATTERN.test(input.revision) ||
    input.confirmed !== true
  )
    throw new Error("Conferma la cancellazione della richiesta selezionata.");
  return { id: input.id, revision: input.revision };
}
