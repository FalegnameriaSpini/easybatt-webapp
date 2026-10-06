import { NextResponse } from "next/server";
import { authSettings } from "@/lib/easybatt-auth-settings.mjs";

export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.json(authSettings(), { headers: { "Cache-Control": "no-store" } });
}
