import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { authenticatedCustomer, customerFailure, privateHeaders, CUSTOMER_COLUMNS } from "@/lib/easybatt-customer-store";
import { PersistenceError } from "@/lib/easybatt-persistence.mjs";
import { customerPricing, CONSENT_VERSION } from "@/lib/easybatt-customers.mjs";
import { getEasyBattConfig } from "@/lib/easybatt-store";

export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    const { customer } = await authenticatedCustomer(request);
    if (!customer) throw new PersistenceError("Profilo cliente non disponibile. Contatta EasyBatt.", 404);
    const { pricing } = customerPricing(await getEasyBattConfig(), customer);
    return NextResponse.json({ customer, pricing }, { headers: privateHeaders });
  } catch (error) { return customerFailure(error); }
}

export async function PATCH(request) {
  try {
    const { client, customer } = await authenticatedCustomer(request);
    if (!customer) throw new PersistenceError("Profilo non disponibile.", 404);
    const body = await request.json();
    if (typeof body.marketing_consent !== "boolean" || body.consent_version !== CONSENT_VERSION || typeof body.revision !== "string") {
      throw new PersistenceError("Preferenza o versione non valida. Ricarica la pagina.", 400);
    }
    const { data, error } = await client.from("easybatt_customers")
      .update({ marketing_consent: body.marketing_consent, consent_version: CONSENT_VERSION, revision: randomUUID() })
      .eq("id", customer.id).eq("revision", body.revision).select(CUSTOMER_COLUMNS).maybeSingle();
    if (error) throw new PersistenceError("Preferenza non salvata. Riprova.");
    if (!data) throw new PersistenceError("Profilo aggiornato in un'altra sessione. Ricarica la pagina.", 409);
    return NextResponse.json({ customer: data }, { headers: privateHeaders });
  } catch (error) { return customerFailure(error); }
}
