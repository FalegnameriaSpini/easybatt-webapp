import { NextResponse } from "next/server";
import { projectSettings } from "@/lib/easybatt-project-settings.mjs";
export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.json(projectSettings(), {
    headers: { "Cache-Control": "no-store" },
  });
}
