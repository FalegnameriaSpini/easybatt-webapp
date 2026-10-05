import "server-only";
import { promises as fs } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { normalizeEasyBattConfig } from "@/lib/easybatt-config";
import {
  assertLocalWritesAllowed, checkAdminPassword, createPersistenceClient,
  PersistenceError, persistenceMode, readCloudConfig, writeCloudConfig,
} from "@/lib/easybatt-persistence.mjs";

const configPath = path.join(process.cwd(), "data", "easybatt-config.json");

export async function getEasyBattConfigRecord() {
  const client = createPersistenceClient();
  if (client) {
    const record = await readCloudConfig(client);
    return { ...record, config: normalizeEasyBattConfig(record.config), storage: "supabase" };
  }
  const raw = await fs.readFile(configPath, "utf8");
  return {
    config: normalizeEasyBattConfig(JSON.parse(raw)),
    revision: createHash("sha256").update(raw).digest("hex"),
    storage: "local",
  };
}

export async function getEasyBattConfig() {
  return (await getEasyBattConfigRecord()).config;
}

// Serialize local writes so the revision check also protects concurrent local sessions.
let pendingWrite = Promise.resolve();
export async function saveEasyBattConfig(value, revision) {
  if (!value || !Array.isArray(value.models) || !value.models.length ||
      typeof revision !== "string" || !revision) {
    throw new PersistenceError("Configurazione o revisione mancante. Ricarica il listino prima di salvare.", 400);
  }
  const config = normalizeEasyBattConfig(value);
  const client = createPersistenceClient();
  if (client) return { ...await writeCloudConfig(client, config, revision), storage: "supabase" };
  assertLocalWritesAllowed();
  const write = pendingWrite.then(async () => {
    const current = await getEasyBattConfigRecord();
    if (current.revision !== revision) {
      throw new PersistenceError("Il listino e' stato modificato. Ricarica la pagina prima di salvare.", 409);
    }
    const raw = `${JSON.stringify(config, null, 2)}\n`;
    const temporary = `${configPath}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporary, raw, "utf8");
      await fs.rename(temporary, configPath);
    } finally {
      await fs.rm(temporary, { force: true });
    }
    return { config, revision: createHash("sha256").update(raw).digest("hex"), storage: "local" };
  });
  pendingWrite = write.catch(() => {});
  return write;
}

export function isEasyBattAdmin(request) {
  return checkAdminPassword(request.headers.get("x-admin-password") || "");
}

export function getStorageStatus() {
  const storage = persistenceMode();
  return { storage, writable: storage === "supabase" || !process.env.VERCEL };
}
