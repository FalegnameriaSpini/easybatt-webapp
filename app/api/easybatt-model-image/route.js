import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEasyBattAdmin } from "@/lib/easybatt-store";
import { assertLocalWritesAllowed, createPersistenceClient, MAX_IMAGE_BYTES, PersistenceError, uploadCloudImage, validateImage } from "@/lib/easybatt-persistence.mjs";

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

    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Immagine troppo grande. Limite 3 MB." }, { status: 400 });
    }

    const fileName = `${code}-${kind}-${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    validateImage(buffer, file.type);
    const client = createPersistenceClient();
    if (client) {
      const url = await uploadCloudImage(client, fileName, buffer, file.type);
      return NextResponse.json({ url });
    }
    assertLocalWritesAllowed();
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ url: `/uploads/easybatt-models/${fileName}` });
  } catch (error) {
    return NextResponse.json({ error: error instanceof PersistenceError ? error.message : "Caricamento non riuscito." },
      { status: error instanceof PersistenceError ? error.status : 500 });
  }
}
