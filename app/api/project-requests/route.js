import { NextResponse } from "next/server";
import { submitProject } from "@/lib/easybatt-project-submit.mjs";
import { ProjectValidationError } from "@/lib/easybatt-projects.mjs";
import { PersistenceError } from "@/lib/easybatt-persistence.mjs";
import {
  RECEIPT_COOKIE,
  RECEIPT_SECONDS,
} from "@/lib/easybatt-project-security.mjs";

export const dynamic = "force-dynamic";
export async function POST(request) {
  const headers = { "Cache-Control": "private, no-store" };
  try {
    const { receipt, status } = await submitProject(request);
    const response = NextResponse.json({ received: true }, { status, headers });
    response.cookies.set(RECEIPT_COOKIE, receipt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/grazie-prova-easybatt",
      maxAge: RECEIPT_SECONDS,
    });
    return response;
  } catch (error) {
    if (error instanceof ProjectValidationError)
      return NextResponse.json(
        { error: error.message, fields: error.fields },
        { status: 400, headers },
      );
    const status =
      error instanceof PersistenceError
        ? error.status
        : error instanceof SyntaxError
          ? 400
          : error.status === 413
            ? 413
            : 503;
    if (status === 429) headers["Retry-After"] = "3600";
    return NextResponse.json(
      {
        error:
          error instanceof PersistenceError || status === 413
            ? error.message
            : "Invio non riuscito. Controlla i dati e riprova.",
      },
      { status, headers },
    );
  }
}
