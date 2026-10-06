import "server-only";
import { NextResponse } from "next/server";
import { createPersistenceClient, PersistenceError } from "./easybatt-persistence.mjs";
import { authSettings } from "./easybatt-auth-settings.mjs";

export const privateHeaders = { "Cache-Control": "private, no-store", Vary: "Authorization, x-admin-password" };
export const CUSTOMER_COLUMNS = "id,full_name,email,account_type,company_name,vat_number,status,price_list_id,email_confirmed_at,marketing_consent,marketing_updated_at,consent_version,created_at,revision";

export function customerClient() {
  if (!authSettings().enabled) throw new PersistenceError("Accesso clienti non ancora attivo.", 503);
  return createPersistenceClient();
}

export async function authenticatedCustomer(request, client = customerClient()) {
  const authorization = request.headers.get("authorization") || "";
  if (!/^Bearer [^\s]+$/.test(authorization)) throw new PersistenceError("Accedi al tuo account.", 401);
  // Never authorize using client session data or editable user_metadata.
  const { data, error } = await client.auth.getUser(authorization.slice(7));
  if (error || !data.user?.email_confirmed_at) throw new PersistenceError("Sessione non valida. Conferma l'email e accedi nuovamente.", 401);
  const result = await client.from("easybatt_customers").select(CUSTOMER_COLUMNS).eq("id", data.user.id).maybeSingle();
  if (result.error) throw new PersistenceError("Profilo non disponibile. Riprova tra poco.");
  return { client, customer: result.data, user: data.user };
}

export function customerFailure(error) {
  if (error instanceof SyntaxError) return NextResponse.json({ error: "Richiesta non valida." }, { status: 400, headers: privateHeaders });
  return NextResponse.json({ error: error instanceof PersistenceError ? error.message : "Operazione non disponibile. Riprova tra poco." },
    { status: error instanceof PersistenceError ? error.status : 503, headers: privateHeaders });
}
