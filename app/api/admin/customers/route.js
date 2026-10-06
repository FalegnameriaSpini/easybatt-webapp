import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEasyBattAdmin, getEasyBattConfig } from "@/lib/easybatt-store";
import { customerClient, customerFailure, privateHeaders, CUSTOMER_COLUMNS } from "@/lib/easybatt-customer-store";
import { PersistenceError } from "@/lib/easybatt-persistence.mjs";
import { customerDecision } from "@/lib/easybatt-customers.mjs";

export const dynamic = "force-dynamic";
function requireAdmin(request) {
  if (!isEasyBattAdmin(request)) throw new PersistenceError("Accesso non autorizzato.", 401);
}
export async function GET(request) {
  try {
    requireAdmin(request);
    const client = customerClient();
    const params = new URL(request.url).searchParams;
    const page = Math.max(0, Math.min(100000, Number.parseInt(params.get("page"), 10) || 0));
    let query = client.from("easybatt_customers").select(CUSTOMER_COLUMNS, { count: "exact" });
    const status = params.get("status");
    if (["private", "pending", "approved", "rejected"].includes(status)) query = query.eq("status", status);
    const { data, error, count } = await query.order("created_at", { ascending: false }).order("id").range(page * 25, page * 25 + 24);
    if (error) throw new PersistenceError("Elenco clienti non disponibile. Verifica la migrazione utenti.");
    const config = await getEasyBattConfig();
    return NextResponse.json({ customers: data, count, page, priceLists: config.priceLists.filter((list) => list.status === "published").map(({ id, name }) => ({ id, name })) }, { headers: privateHeaders });
  } catch (error) { return customerFailure(error); }
}

export async function PATCH(request) {
  try {
    requireAdmin(request);
    const client = customerClient();
    const body = await request.json();
    if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id) || typeof body.revision !== "string") throw new PersistenceError("Dati cliente non validi.", 400);
    const current = await client.from("easybatt_customers").select(CUSTOMER_COLUMNS).eq("id", body.id).maybeSingle();
    if (current.error) throw new PersistenceError("Cliente non disponibile.");
    if (!current.data) throw new PersistenceError("Cliente non trovato.", 404);
    let decision;
    try { decision = customerDecision(body, current.data, await getEasyBattConfig()); }
    catch (error) { throw new PersistenceError(error.message, 400); }
    const { data, error } = await client.from("easybatt_customers").update({ ...decision, revision: randomUUID() })
      .eq("id", body.id).eq("revision", body.revision).select(CUSTOMER_COLUMNS).maybeSingle();
    if (error) throw new PersistenceError("Approvazione non salvata. Riprova.");
    if (!data) throw new PersistenceError("Cliente modificato in un'altra sessione. Aggiorna l'elenco.", 409);
    return NextResponse.json({ customer: data }, { headers: privateHeaders });
  } catch (error) { return customerFailure(error); }
}
