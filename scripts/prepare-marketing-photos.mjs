import { mkdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Indica la cartella privata con le fotografie originali.");
const output = fileURLToPath(new URL("../public/marketing/originali/", import.meta.url));

// Coordinates refer to the oriented photograph resized to 1600 px wide.
// Opaque masks are flattened BEFORE any crop or export; originals stay private.
// Each mask takes the colour of the surface it covers (label or paper), so the
// cover reads as a blank line instead of a grey bar. It is still opaque.
const KIT_LABEL = "#cdd6e2";
const kit = {
  file: "20261016_191511.jpg",
  sha256: "423335aeab15fb07ab522ce2e00e3b7f680bced7e0b78cd5b40a4247e9b48a70",
  masks: [
    { points: "464,385 591,351 594,363 468,397", color: KIT_LABEL },
    { points: "782,295 886,256 891,267 787,306", color: KIT_LABEL },
    { points: "996,232 1095,197 1099,207 1000,242", color: KIT_LABEL },
    { points: "985,337 1092,300 1097,311 990,348", color: KIT_LABEL },
    { points: "1066,422 1176,383 1181,395 1071,434", color: KIT_LABEL },
    { points: "1212,513 1320,466 1325,478 1217,525", color: KIT_LABEL },
    { points: "1235,676 1355,622 1360,635 1240,689", color: KIT_LABEL },
    // Customer reference in the title block of the printed plan.
    { points: "241,568 350,550 352,590 239,601", color: "#d0d3de" },
  ],
};

const photos = [
  { ...kit, name: "kit-codificato-v2" },
  // Opening image: the same masked photograph, cropped wide for the hero.
  { ...kit, name: "pezzi-codificati-apertura", crop: { left: 0, top: 230, width: 1600, height: 720 } },
  // Close-up of the coded labels for the "Pronti da posare" step.
  { ...kit, name: "kit-dettaglio-etichette", crop: { left: 640, top: 200, width: 800, height: 600 } },
  { file: "20261001_150246(3).jpg", name: "rilievo-laser" },
  {
    // Laser alone in the empty room; the bottom edge (an object near the
    // camera) is cropped away.
    file: "20261001_150421.jpg", name: "rilievo-stanza",
    crop: { left: 0, top: 0, width: 1600, height: 790 },
  },
  {
    file: "20261016_163433.jpg", name: "lavorazione-battiscopa-v2",
    sha256: "d05c890ceb5f3894f4480ef806f010297b5430f87f27a7f6cdfe1eb6a46b7641",
    masks: [{ points: "809,240 954,222 956,239 812,257", color: "#d4d4d8" }],
  },
  {
    // Piece F07: label angle and saw display show the same 42.5 degrees.
    file: "20261016_193130.jpg", name: "troncatrice-angolo",
    sha256: "33d41f2d4ed307a03234edba90de4c094558a84065256b01a74d36d7a4c496c2",
    masks: [{ points: "112,284 628,320 626,384 110,346", color: "#bec2c9" }],
  },
  {
    file: "20261016_114835.jpg", name: "etichetta-pezzo-v2",
    sha256: "41384f9189be0ad0cd99c6c55a24e738b12ff49f0f86ed1de4cc62152936ac81",
    masks: [{ points: "718,640 1207,635 1210,689 719,700", color: "#c4deff" }],
    rotate: 180,
    crop: { left: 220, top: 400, width: 1050, height: 640 },
  },
  {
    // The crop starts below the "Pianta" viewport tab of the drawing program.
    file: "Screenshot 2026-10-14 090311.png", name: "software-planimetria-v2",
    crop: { left: 108, top: 96, width: 1440, height: 750 },
  },
  {
    file: "Screenshot 2026-10-14 102145.png", name: "software-dettaglio-codici-v2",
    crop: { left: 104, top: 95, width: 1490, height: 777 },
  },
  {
    // Lower left of the corridor: skirting board and floor, without the open
    // door, the box behind it and the cardboard on the floor.
    file: "20251215_165216.jpg", name: "ambiente-battiscopa-bianco-v2",
    crop: { left: 0, top: 1450, width: 900, height: 550 },
  },
];

await mkdir(output, { recursive: true });
for (const photo of photos) {
  const original = await readFile(path.join(source, photo.file));
  if (photo.masks?.length && createHash("sha256").update(original).digest("hex") !== photo.sha256) {
    throw new Error(`Sorgente cambiata: ricontrolla le maschere di ${photo.file} prima di esportarla.`);
  }
  let buffer = await sharp(original).autoOrient()
    .resize({ width: 1600, withoutEnlargement: true }).png().toBuffer();
  const { width, height } = await sharp(buffer).metadata();
  if (photo.masks?.length) {
    const polygons = photo.masks.map(({ points, color }) => `<polygon points="${points}" fill="${color}"/>`).join("");
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${polygons}</svg>`);
    buffer = await sharp(buffer).composite([{ input: mask }]).png().toBuffer();
  }
  if (photo.rotate) buffer = await sharp(buffer).rotate(photo.rotate).png().toBuffer();
  let image = sharp(buffer);
  if (photo.crop) image = image.extract(photo.crop);
  const target = path.join(output, `${photo.name}.webp`);
  await image.webp({ quality: 90, effort: 6 }).toFile(target);
  const info = await sharp(target).metadata();
  if (info.exif || info.xmp || info.iptc) throw new Error(`Metadati privati: ${photo.name}`);
  console.log(`${photo.name}: ${info.width} x ${info.height}, ${(await stat(target)).size} bytes`);
}
