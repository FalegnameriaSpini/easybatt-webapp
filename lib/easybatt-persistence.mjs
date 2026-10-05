import { createClient } from "@supabase/supabase-js";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

export const IMAGE_BUCKET = "easybatt-models";
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

export class PersistenceError extends Error {
  constructor(message, status = 503) {
    super(message);
    this.status = status;
  }
}

export function persistenceMode(env = process.env) {
  const hasUrl = Boolean(env.SUPABASE_URL);
  const hasKey = Boolean(env.SUPABASE_SECRET_KEY);
  if (hasUrl !== hasKey) {
    throw new PersistenceError("Configurazione Supabase incompleta. Verifica le variabili ambiente.");
  }
  return hasUrl ? "supabase" : "local";
}

export function createPersistenceClient(env = process.env) {
  if (persistenceMode(env) !== "supabase") return null;
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }) },
  });
}

export function assertLocalWritesAllowed(env = process.env) {
  if (env.VERCEL) {
    throw new PersistenceError("Salvataggio online non configurato. Collega Supabase prima di pubblicare modifiche.");
  }
}

export function checkAdminPassword(provided, env = process.env) {
  // The development fallback must never become an online administrator password.
  const expected = env.EASYBATT_ADMIN_PASSWORD ||
    (!env.VERCEL && env.NODE_ENV === "development" ? "easybatt-admin" : "");
  if (!expected || !provided) return false;
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

export async function readCloudConfig(client) {
  const { data, error } = await client.from("easybatt_config")
    .select("config, revision").eq("id", "main").maybeSingle();
  if (error) throw new PersistenceError("Database non disponibile. Riprova tra poco.");
  if (!data) throw new PersistenceError("Catalogo Supabase non inizializzato. Esegui la migrazione iniziale.");
  return data;
}

export async function writeCloudConfig(client, config, expectedRevision) {
  const revision = randomUUID();
  const { data, error } = await client.from("easybatt_config")
    .update({ config, revision, updated_at: new Date().toISOString() })
    .eq("id", "main").eq("revision", expectedRevision)
    .select("revision").maybeSingle();
  if (error) throw new PersistenceError("Salvataggio non riuscito. Le modifiche non sono state confermate.");
  if (!data) throw new PersistenceError("Il listino e' stato modificato in un'altra sessione. Ricarica la pagina prima di riprovare.", 409);
  return { config, revision: data.revision };
}

export function validateImage(buffer, contentType) {
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) {
    throw new PersistenceError("Immagine vuota o troppo grande. Limite 3 MB.", 400);
  }
  const signatures = {
    "image/jpeg": buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
    "image/png": buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    "image/webp": buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP",
  };
  if (!signatures[contentType]) throw new PersistenceError("File non valido. Usa un'immagine JPG, PNG o WEBP.", 400);
}

export async function uploadCloudImage(client, name, buffer, contentType) {
  const bucket = client.storage.from(IMAGE_BUCKET);
  const { error } = await bucket.upload(name, buffer, { contentType, upsert: false, cacheControl: "31536000" });
  if (error) throw new PersistenceError("Caricamento su Storage non riuscito. Verifica il bucket delle immagini.");
  return bucket.getPublicUrl(name).data.publicUrl;
}
