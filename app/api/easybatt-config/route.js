import { NextResponse } from "next/server";
import { getEasyBattConfig, isEasyBattAdmin, saveEasyBattConfig } from "@/lib/easybatt-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ config: await getEasyBattConfig() });
}

export async function PUT(request) {
  if (!isEasyBattAdmin(request)) {
    return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const config = await saveEasyBattConfig(body?.config);
    return NextResponse.json({ config });
  } catch {
    return NextResponse.json({ error: "Non e' stato possibile salvare la configurazione." }, { status: 500 });
  }
}
