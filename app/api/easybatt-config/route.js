import { NextResponse } from "next/server";
import { getEasyBattConfig, getEasyBattConfigRecord, getStorageStatus, isEasyBattAdmin, saveEasyBattConfig } from "@/lib/easybatt-store";
import { publicEasyBattConfig } from "@/lib/easybatt-public-config.mjs";
import { PersistenceError } from "@/lib/easybatt-persistence.mjs";
import { authSettings } from "@/lib/easybatt-auth-settings.mjs";
import { authenticatedCustomer } from "@/lib/easybatt-customer-store";
import { customerPricing } from "@/lib/easybatt-customers.mjs";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "private, no-store", Vary: "x-admin-password, Authorization" };

function failure(error) {
  return NextResponse.json({ error: error instanceof PersistenceError ? error.message : "Configurazione non disponibile. Riprova tra poco." },
    { status: error instanceof PersistenceError ? error.status : 503, headers });
}

export async function GET(request) {
  const admin = new URL(request.url).searchParams.get("admin") === "1";
  if (admin && !isEasyBattAdmin(request)) {
    return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401, headers });
  }
  try {
    if (!admin && request.headers.has("authorization") && authSettings().enabled) {
      const { customer } = await authenticatedCustomer(request);
      return NextResponse.json(customerPricing(await getEasyBattConfig(), customer), { headers });
    }
    return NextResponse.json(admin
      ? { ...await getEasyBattConfigRecord(), ...getStorageStatus() }
      : { config: publicEasyBattConfig(await getEasyBattConfig()) }, { headers });
  } catch (error) {
    return failure(error);
  }
}

export async function PUT(request) {
  if (!isEasyBattAdmin(request)) {
    return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const record = await saveEasyBattConfig(body?.config, body?.revision);
    return NextResponse.json(record, { headers });
  } catch (error) {
    return failure(error);
  }
}
