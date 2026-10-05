import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { normalizeEasyBattConfig } from "../lib/easybatt-config.js";
import { createPersistenceClient, IMAGE_BUCKET, validateImage } from "../lib/easybatt-persistence.mjs";

const apply = process.argv.includes("--apply");
const root = process.cwd();
const publicDir = path.join(root, "public");
const mimeTypes = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

async function main() {
  const source = JSON.parse(await fs.readFile(path.join(root, "data", "easybatt-config.json"), "utf8"));
  if (!Array.isArray(source.models) || !source.models.length) throw new Error("Catalogo locale vuoto.");
  const config = normalizeEasyBattConfig(source);
  const images = new Map();
  for (const model of config.models) {
    for (const key of ["sectionImageUrl", "finishImageUrl"]) {
      const url = model[key];
      if (!url || url.startsWith("https://") || images.has(url)) continue;
      if (!url.startsWith("/") || url.startsWith("//")) throw new Error(`Percorso immagine non valido: ${url}`);
      const filePath = path.resolve(publicDir, `.${decodeURIComponent(url)}`);
      const relative = path.relative(publicDir, filePath);
      if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Percorso immagine esterno a public.");
      const buffer = await fs.readFile(filePath);
      const extension = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[extension];
      validateImage(buffer, contentType);
      const hash = createHash("sha256").update(buffer).digest("hex");
      images.set(url, { buffer, contentType, name: `catalog/${hash}${extension}` });
    }
  }
  console.log(`Verificati ${config.models.length} prodotti e ${images.size} immagini locali.`);
  if (!apply) {
    console.log("Solo verifica: nessun dato online modificato. Per trasferire: npm run supabase:migrate -- --apply");
    return;
  }

  const client = createPersistenceClient();
  if (!client) throw new Error("Imposta SUPABASE_URL e SUPABASE_SECRET_KEY in .env.local.");
  const existing = await client.from("easybatt_config").select("id").eq("id", "main").maybeSingle();
  if (existing.error) throw new Error("Tabella non accessibile. Esegui prima la migrazione SQL e verifica le chiavi.");
  if (existing.data) throw new Error("Catalogo online gia' presente: nessun dato sovrascritto. Usa l'admin per aggiornarlo.");

  const bucket = client.storage.from(IMAGE_BUCKET);
  const replacements = new Map();
  for (const [url, image] of images) {
    // Content-addressed names let retries safely detect uploads already completed.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const exists = await bucket.exists(image.name);
        if (!exists.data) {
          const { error } = await bucket.upload(image.name, image.buffer, {
            contentType: image.contentType, upsert: false, cacheControl: "31536000",
          });
          if (error) throw error;
        }
        break;
      } catch {
        if (attempt === 2) throw new Error(`Caricamento non riuscito per ${url}. Puoi ripetere il comando.`);
        await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * 1000));
      }
    }
    replacements.set(url, bucket.getPublicUrl(image.name).data.publicUrl);
    if (replacements.size % 25 === 0 || replacements.size === images.size) {
      console.log(`Immagini pronte: ${replacements.size}/${images.size}`);
    }
  }
  for (const model of config.models) {
    for (const key of ["sectionImageUrl", "finishImageUrl"]) {
      model[key] = replacements.get(model[key]) || model[key];
    }
  }
  // Insert only: even concurrent initializations cannot overwrite an existing catalog.
  const { error } = await client.from("easybatt_config").insert({ id: "main", config });
  if (error) throw new Error("Catalogo non inserito: verifica che non esista gia'. Il file locale non e' stato modificato.");
  console.log(`Trasferimento completato: ${config.models.length} prodotti. Il catalogo locale e' rimasto invariato.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
