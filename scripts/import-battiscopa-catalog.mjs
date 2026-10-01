import { promises as fs } from "node:fs";
import path from "node:path";
import { mapBattiscopaCatalog } from "../lib/easybatt-catalog.mjs";

const root = process.cwd();
const sourcePath = path.join(root, "data", "import", "battiscopa.json");
const configPath = path.join(root, "data", "easybatt-config.json");
const sourceProfileDir = path.join(root, "data", "import", "profili");
const sourceFinishDir = path.join(root, "data", "import", "finiture");
const publicProfileDir = path.join(root, "public", "catalog", "profili");
const publicFinishDir = path.join(root, "public", "catalog", "finiture");

async function filesByName(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true, recursive: true });
  return new Map(entries
    .filter((entry) => entry.isFile())
    .map((entry) => [entry.name, path.join(entry.parentPath, entry.name)]));
}

async function copyCatalogImages(models) {
  const profileSources = await filesByName(sourceProfileDir);
  const finishSources = await filesByName(sourceFinishDir);
  await fs.mkdir(publicProfileDir, { recursive: true });
  await fs.mkdir(publicFinishDir, { recursive: true });

  const missing = [];
  const copied = new Set();
  for (const model of models) {
    const profileName = decodeURIComponent(model.sectionImageUrl.split("/").at(-1));
    const finishName = decodeURIComponent(model.finishImageUrl.split("/").at(-1));
    const profileSource = profileSources.get(profileName);
    const finishSource = finishSources.get(finishName);

    if (!profileSource) missing.push(`Profilo mancante: ${profileName}`);
    if (!finishSource) missing.push(`Finitura mancante: ${finishName}`);
    if (profileSource && !copied.has(`p:${profileName}`)) {
      await fs.copyFile(profileSource, path.join(publicProfileDir, profileName));
      copied.add(`p:${profileName}`);
    }
    if (finishSource && !copied.has(`f:${finishName}`)) {
      await fs.copyFile(finishSource, path.join(publicFinishDir, finishName));
      copied.add(`f:${finishName}`);
    }
  }

  if (missing.length) throw new Error([...new Set(missing)].join("\n"));
  return copied.size;
}

const source = JSON.parse(await fs.readFile(sourcePath, "utf8"));
const { models, errors } = mapBattiscopaCatalog(source);
if (errors.length) throw new Error(errors.join("\n"));

const currentConfig = JSON.parse(await fs.readFile(configPath, "utf8"));
const copiedImages = await copyCatalogImages(models);
await fs.writeFile(configPath, `${JSON.stringify({ ...currentConfig, models }, null, 2)}\n`, "utf8");

console.log(`Importati ${models.length} prodotti e ${copiedImages} immagini uniche.`);
