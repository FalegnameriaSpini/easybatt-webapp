"use client";

import { createClient } from "@supabase/supabase-js";

let initialization;
export function getCustomerAuth() {
  if (!initialization) initialization = fetch("/api/account/settings", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) throw new Error("Accesso clienti temporaneamente non disponibile.");
      const settings = await response.json();
      return { settings, client: settings.enabled ? createClient(settings.url, settings.key, {
        auth: { flowType: "implicit", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      }) : null };
    }).catch((error) => { initialization = undefined; throw error; });
  return initialization;
}

export async function customerHeaders(client) {
  if (!client) return {};
  const { data, error } = await client.auth.getSession();
  if (error) throw new Error("Sessione scaduta. Accedi nuovamente.");
  return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
}

export async function customerRequest(client, path, options = {}) {
  const response = await fetch(path, { ...options, cache: "no-store", headers: { ...await customerHeaders(client), ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Operazione non riuscita. Riprova.");
  return data;
}
