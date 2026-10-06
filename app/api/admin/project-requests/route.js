import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEasyBattAdmin } from "@/lib/easybatt-store";
import {
  createPersistenceClient,
  PersistenceError,
} from "@/lib/easybatt-persistence.mjs";
import { customerFailure, privateHeaders } from "@/lib/easybatt-customer-store";
import { PROJECT_STATES, projectReview } from "@/lib/easybatt-projects.mjs";
import { projectSettings } from "@/lib/easybatt-project-settings.mjs";
import { limitedJson } from "@/lib/easybatt-project-security.mjs";

export const dynamic = "force-dynamic";
const columns =
  "id,full_name,email,phone,company,profession,town,province,intervention,metres,timing,notes,source,privacy_version,privacy_acknowledged_at,marketing_consent,status,staff_notes,follow_up_on,revision,created_at";
function adminClient(request) {
  if (!isEasyBattAdmin(request))
    throw new PersistenceError("Accesso non autorizzato.", 401);
  return createPersistenceClient();
}
export async function GET(request) {
  try {
    const client = adminClient(request);
    if (!client)
      return NextResponse.json(
        { available: false, requests: [], count: 0 },
        { headers: privateHeaders },
      );
    const params = new URL(request.url).searchParams;
    const page = Math.max(
      0,
      Math.min(100000, parseInt(params.get("page"), 10) || 0),
    );
    let query = client
      .from("easybatt_project_requests")
      .select(columns, { count: "exact" });
    if (
      params.get("status") &&
      Object.hasOwn(PROJECT_STATES, params.get("status"))
    )
      query = query.eq("status", params.get("status"));
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .order("id")
      .range(page * 20, page * 20 + 19);
    if (error)
      throw new PersistenceError(
        "Elenco richieste non disponibile. Verifica la migrazione Prova EasyBatt.",
      );
    return NextResponse.json(
      {
        available: true,
        accepting: projectSettings().enabled,
        requests: data,
        count,
        page,
      },
      { headers: privateHeaders },
    );
  } catch (error) {
    return customerFailure(error);
  }
}
export async function PATCH(request) {
  try {
    const client = adminClient(request);
    if (!client)
      throw new PersistenceError("Archivio richieste non configurato.");
    const body = await limitedJson(request);
    let update;
    try {
      update = projectReview(body);
    } catch (error) {
      throw new PersistenceError(error.message, 400);
    }
    const { data, error } = await client
      .from("easybatt_project_requests")
      .update({
        ...update,
        revision: randomUUID(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .eq("revision", body.revision)
      .select(columns)
      .maybeSingle();
    if (error)
      throw new PersistenceError("Aggiornamento non salvato. Riprova.");
    if (!data)
      throw new PersistenceError(
        "Richiesta modificata in un'altra sessione. Aggiorna l'elenco.",
        409,
      );
    return NextResponse.json({ request: data }, { headers: privateHeaders });
  } catch (error) {
    return customerFailure(error);
  }
}
