import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isEasyBattAdmin } from "@/lib/easybatt-store";

const uploadDir = path.join(process.cwd(), "public", "uploads", "easybatt-models");
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function safePart(value) {
  return String(value || "easybatt")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "easybatt";
}

export async function POST(request) {
  if (!isEasyBattAdmin(request)) {
    return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const code = safePart(formData.get("code"));
    const kind = safePart(formData.get("kind"));

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Nessun file caricato." }, { status: 400 });
    }

    const extension = allowedTypes.get(file.type);
    if (!extension) {
      return NextResponse.json({ error: "Formato non supportato. Usa JPG, PNG o WEBP." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Immagine troppo grande. Limite 5 MB." }, { status: 400 });
    }

    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = `${code}-${kind}-${Date.now()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/easybatt-models/${fileName}` });
  } catch {
    return NextResponse.json({ error: "Caricamento non riuscito." }, { status: 500 });
  }
}
