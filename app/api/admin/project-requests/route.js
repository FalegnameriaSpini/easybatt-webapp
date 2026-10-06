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
import {
  romeDate,
  validContactDate,
  projectDeletion,
} from "@/lib/easybatt-project-retention.mjs";

export const dynamic = "force-dynamic";
const columns =
  "id,full_name,email,phone,company,profession,town,province,intervention,metres,timing,notes,source,privacy_version,privacy_acknowledged_at,marketing_consent,status,staff_notes,follow_up_on,revision,created_at,last_contact_on,retention_due_on";
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
    const today = romeDate();
    if (params.get("retention") === "due")
      query = query.neq("status", "customer").lte("retention_due_on", today);
    if (params.get("retention") === "unverified")
      query = query.neq("status", "customer").is("last_contact_on", null);
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .order("id")
      .range(page * 20, page * 20 + 19);
    if (error)
      throw new PersistenceError(
        "Elenco richieste non disponibile. Verifica le migrazioni Prova EasyBatt, inclusa la gestione dei 12 mesi.",
      );
    return NextResponse.json(
      {
        available: true,
        accepting: projectSettings().enabled,
        requests: data,
        count,
        page,
        today,
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
    if (Object.hasOwn(body, "last_contact_on")) {
      const current = await client
        .from("easybatt_project_requests")
        .select("created_at")
        .eq("id", body.id)
        .eq("revision", body.revision)
        .maybeSingle();
      if (current.error)
        throw new PersistenceError("Verifica della richiesta non disponibile.");
      if (!current.data)
        throw new PersistenceError(
          "Richiesta modificata o non disponibile. Aggiorna l'elenco.",
          409,
        );
      if (!validContactDate(body.last_contact_on, current.data.created_at))
        throw new PersistenceError(
          "L'ultimo contatto deve essere compreso tra la ricezione della richiesta e oggi.",
          400,
        );
      update.last_contact_on = body.last_contact_on;
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

export async function DELETE(request) {
  try {
    const client = adminClient(request);
    if (!client)
      throw new PersistenceError("Archivio richieste non configurato.");
    let selection;
    try {
      selection = projectDeletion(await limitedJson(request));
    } catch {
      throw new PersistenceError(
        "Conferma la cancellazione della richiesta selezionata.",
        400,
      );
    }
    // Revision and eligibility are checked in the same database delete.
    const { data, error } = await client
      .from("easybatt_project_requests")
      .delete()
      .eq("id", selection.id)
      .eq("revision", selection.revision)
      .neq("status", "customer")
      .lte("retention_due_on", romeDate())
      .select("id")
      .maybeSingle();
    if (error)
      throw new PersistenceError(
        "Cancellazione non confermata. Aggiorna l'elenco prima di riprovare.",
      );
    if (!data)
      throw new PersistenceError(
        "Richiesta modificata, non scaduta o non disponibile. Aggiorna l'elenco.",
        409,
      );
    return NextResponse.json({ deleted: true }, { headers: privateHeaders });
  } catch (error) {
    return customerFailure(error);
  }
}
