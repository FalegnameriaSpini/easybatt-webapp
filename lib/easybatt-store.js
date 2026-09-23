import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EASYBATT_CONFIG, normalizeEasyBattConfig } from "@/lib/easybatt-config";

const dataDir = path.join(process.cwd(), "data");
const configPath = path.join(dataDir, "easybatt-config.json");

export async function getEasyBattConfig() {
  try {
    const raw = await fs.readFile(configPath, "utf8");
    return normalizeEasyBattConfig(JSON.parse(raw));
  } catch {
    return normalizeEasyBattConfig(DEFAULT_EASYBATT_CONFIG);
  }
}

export async function saveEasyBattConfig(value) {
  const config = normalizeEasyBattConfig(value);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  return config;
}

export function isEasyBattAdmin(request) {
  const expected = process.env.EASYBATT_ADMIN_PASSWORD || "easybatt-admin";
  const provided = request.headers.get("x-admin-password") || "";
  return provided === expected;
}
