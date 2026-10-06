import { isIP } from "node:net";
import {
  createPersistenceClient,
  PersistenceError,
} from "./easybatt-persistence.mjs";
import { projectSettings } from "./easybatt-project-settings.mjs";
import {
  projectData,
  projectSource,
  PROJECT_MARKETING_TEXT,
  UUID_PATTERN,
} from "./easybatt-projects.mjs";
import {
  limitedJson,
  privateDigest,
  projectReceipt,
} from "./easybatt-project-security.mjs";

export async function submitProject(
  request,
  { env = process.env, createClient = createPersistenceClient } = {},
) {
  const settings = projectSettings(env);
  if (!settings.enabled)
    throw new PersistenceError(
      "Il modulo non è disponibile. Puoi scriverci a info@easy-batt.it.",
      503,
    );
  if (request.headers.get("origin") !== new URL(request.url).origin)
    throw new PersistenceError("Origine della richiesta non valida.", 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    throw new PersistenceError("Formato della richiesta non valido.", 415);
  const body = await limitedJson(request);
  if (
    !body ||
    !UUID_PATTERN.test(body.id || "") ||
    typeof body.website !== "string" ||
    body.website !== ""
  )
    throw new PersistenceError("Richiesta non valida.", 400);
  if (body.privacy_version !== settings.privacyVersion)
    throw new PersistenceError(
      "L'informativa è cambiata. Ricarica la pagina prima di inviare.",
      409,
    );
  const data = {
    ...projectData(body),
    source: projectSource(body.source),
    privacy_version: settings.privacyVersion,
    privacy_url: settings.privacyUrl,
    marketing_text: PROJECT_MARKETING_TEXT,
  };
  // Vercel overwrites this header. Never trust a caller-supplied x-forwarded-for.
  const ip = env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : "local";
  if (env.VERCEL && !isIP(ip || ""))
    throw new PersistenceError("Richiesta non disponibile. Riprova tra poco.");
  const secret = env.EASYBATT_PROJECTS_SECRET;
  const client = createClient(env);
  if (!client)
    throw new PersistenceError("Ricezione non disponibile. Riprova tra poco.");
  const { data: result, error } = await client.rpc("easybatt_submit_project", {
    p_id: body.id,
    p_hash: privateDigest(`payload:${JSON.stringify(data)}`, secret),
    p_data: data,
    p_ip_key: privateDigest(`ip:${ip}`, secret),
    p_email_key: privateDigest(`email:${data.email}`, secret),
  });
  if (error)
    throw new PersistenceError(
      "Non siamo riusciti a confermare la ricezione. Riprova: lo stesso invio non verrà duplicato.",
    );
  if (result === "rate_limited")
    throw new PersistenceError(
      "Hai inviato diverse richieste. Riprova tra un'ora oppure scrivici a info@easy-batt.it.",
      429,
    );
  if (result === "conflict")
    throw new PersistenceError(
      "Questo invio risulta già ricevuto con dati diversi. Ricarica la pagina per un nuovo progetto.",
      409,
    );
  if (!["created", "duplicate"].includes(result))
    throw new PersistenceError("Ricezione non confermata. Riprova tra poco.");
  return {
    receipt: projectReceipt(body.id, secret),
    status: result === "created" ? 201 : 200,
  };
}
