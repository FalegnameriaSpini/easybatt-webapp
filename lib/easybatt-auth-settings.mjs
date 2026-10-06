import { CONSENT_VERSION, MARKETING_TEXT } from "./easybatt-customers.mjs";

export function authSettings(env = process.env) {
  // A local catalog sandbox must never create users in the live Supabase project.
  if (env.EASYBATT_SANDBOX === "1" || env.EASYBATT_AUTH_ENABLED !== "1") return { enabled: false };
  const key = env.SUPABASE_PUBLISHABLE_KEY || "";
  let validUrls = false;
  try {
    validUrls = new URL(env.SUPABASE_URL).protocol === "https:" && new URL(env.EASYBATT_PRIVACY_URL).protocol === "https:";
  } catch { /* Fail closed until setup is complete. */ }
  if (!validUrls || !key.startsWith("sb_publishable_") || !env.SUPABASE_SECRET_KEY) return { enabled: false };
  return { enabled: true, url: env.SUPABASE_URL, key, privacyUrl: env.EASYBATT_PRIVACY_URL, consentVersion: CONSENT_VERSION, marketingText: MARKETING_TEXT };
}
