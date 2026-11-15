import { readFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Indica la cartella privata delle foto prima e dopo la posa.");
const output = new URL("../public/marketing/originali/", import.meta.url);
await mkdir(output, { recursive: true });

// Customer references on labels and plans are covered on the original pixels,
// before resizing. Every pixel inside a mask is replaced (nothing is blurred,
// so no trace of the text survives), but the cover is rebuilt from the paper
// or label around it: same shading, same grain, soft edge. A flat patch would
// hide the data too, but it reads as an obvious grey rectangle.
// Never publish the source JPEGs or use generated photographs to document
// actual workmanship.
const photos = [
  {
    file: "20261020_171435_edited.jpg",
    name: "battiscopa-prima-posa",
    sha256: "af53ee0cb2630edb475c0745c2b764bee3624b55fb24b45b91ac5e0e24e16a03",
    masks: [
      "767,979 1008,908 1017,943 776,1014",
      "1000,1212 1176,1278 1135,1392 960,1325",
      "1302,1326 1452,1384 1410,1500 1260,1442",
    ],
  },
  {
    file: "20261020_171328.jpg",
    name: "battiscopa-dopo-posa",
    sha256: "e632e3587b1a49557ba3e59f03cbe5e86811b28ce430de8cb6271c4c1f68b287",
    masks: [
      "473,530 558,482 561,502 476,550",
      "974,1018 1095,1140 1018,1218 898,1096",
      "1170,1190 1275,1290 1220,1350 1115,1250",
    ],
  },
];

const luminance = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function parsePoints(points) {
  return points.split(" ").map(pair => pair.split(",").map(Number));
}

// Mean thickness of the polygon (2 x area / perimeter): a thin band on a label
// gets a small blur, a block on the plan a larger one.
function thickness(points) {
  let area = 0;
  let perimeter = 0;
  points.forEach(([x, y], i) => {
    const [nx, ny] = points[(i + 1) % points.length];
    area += x * ny - nx * y;
    perimeter += Math.hypot(nx - x, ny - y);
  });
  return Math.abs(area) / perimeter;
}

async function rasterize(points, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#000"/><polygon points="${points}" fill="#fff"/></svg>`;
  return sharp(Buffer.from(svg)).flatten({ background: "#000" }).extractChannel(0).raw().toBuffer();
}

function gaussianKernel(sigma) {
  const radius = Math.ceil(3 * sigma);
  const kernel = new Float32Array(2 * radius + 1);
  let sum = 0;
  for (let i = -radius; i <= radius; i++) {
    kernel[i + radius] = Math.exp(-(i * i) / (2 * sigma * sigma));
    sum += kernel[i + radius];
  }
  return kernel.map(value => value / sum);
}

// Separable blur with zero padding, so normalised convolution stays exact at
// the edges of the working area.
function blur(values, w, h, kernel) {
  const radius = (kernel.length - 1) / 2;
  const row = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let i = Math.max(-radius, -x); i <= Math.min(radius, w - 1 - x); i++)
        sum += values[y * w + x + i] * kernel[i + radius];
      row[y * w + x] = sum;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let i = Math.max(-radius, -y); i <= Math.min(radius, h - 1 - y); i++)
        sum += row[(y + i) * w + x] * kernel[i + radius];
      out[y * w + x] = sum;
    }
  return out;
}

// Deterministic noise: the same source always gives the same public file.
function noiseSource(seed) {
  let state = seed >>> 0;
  const uniform = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return () => Math.sqrt(-2 * Math.log(uniform() + 1e-12)) * Math.cos(2 * Math.PI * uniform());
}

async function coverWithPaper(pixels, width, height, points, seed) {
  const polygon = parsePoints(points);
  const mask = await rasterize(points, width, height);
  const sigma = Math.min(24, Math.max(3, 0.4 * thickness(polygon)));
  const reach = Math.ceil(4 * sigma);
  const xs = polygon.map(([x]) => x);
  const ys = polygon.map(([, y]) => y);
  const x0 = Math.max(0, Math.min(...xs) - reach);
  const y0 = Math.max(0, Math.min(...ys) - reach);
  const x1 = Math.min(width, Math.max(...xs) + reach + 1);
  const y1 = Math.min(height, Math.max(...ys) + reach + 1);
  const w = x1 - x0;
  const h = y1 - y0;
  const size = w * h;
  const at = (x, y) => ((y0 + y) * width + x0 + x) * 3;

  // Inside: any covered pixel, even partly, is replaced in full.
  const inside = new Uint8Array(size);
  const lum = new Float32Array(size);
  const around = [];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const p = at(x, y);
      inside[i] = mask[(y0 + y) * width + x0 + x] > 0 ? 1 : 0;
      lum[i] = luminance(pixels[p], pixels[p + 1], pixels[p + 2]);
      if (!inside[i]) around.push(lum[i]);
    }
  // Paper level: the bright end of what surrounds the mask. Only pixels close
  // to it are used as source, so ink, wood, floor and wall never bleed in.
  around.sort((a, b) => a - b);
  const paper = around[Math.floor(0.9 * (around.length - 1))];
  const isPaper = new Uint8Array(size);
  for (let i = 0; i < size; i++) isPaper[i] = !inside[i] && lum[i] > 0.85 * paper ? 1 : 0;

  const kernel = gaussianKernel(sigma);
  const weight = blur(Float32Array.from(isPaper), w, h, kernel);
  const fill = [0, 1, 2].map(c => {
    const values = new Float32Array(size);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        values[i] = isPaper[i] ? pixels[at(x, y) + c] : 0;
      }
    return blur(values, w, h, kernel);
  });

  // Grain of the paper around the mask, measured against the smooth fill.
  const residuals = [];
  for (let i = 0; i < size; i++)
    if (isPaper[i] && weight[i] > 0.05)
      residuals.push(Math.abs(lum[i] - luminance(fill[0][i], fill[1][i], fill[2][i]) / weight[i]));
  residuals.sort((a, b) => a - b);
  const grain = Math.min(6, 1.4826 * residuals[Math.floor(residuals.length / 2)]);

  // Soft edge outward, on paper only: the cover blends into the paper but
  // never into a printed line, the wood of the board or the floor.
  const edge = blur(Float32Array.from(inside), w, h, gaussianKernel(1.5));
  const noise = noiseSource(seed);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const alpha = inside[i] ? 1 : isPaper[i] ? Math.min(1, edge[i]) : 0;
      if (alpha <= 0.01) continue;
      const p = at(x, y);
      const n = grain * noise();
      for (let c = 0; c < 3; c++) {
        const smooth = weight[i] > 1e-4 ? fill[c][i] / weight[i] : paper;
        const value = (smooth + n) * alpha + pixels[p + c] * (1 - alpha);
        pixels[p + c] = Math.max(0, Math.min(255, Math.round(value)));
      }
    }
}

for (const photo of photos) {
  const original = await readFile(path.join(source, photo.file));
  const sha256 = createHash("sha256").update(original).digest("hex");
  if (sha256 !== photo.sha256)
    throw new Error(`Sorgente cambiata: ricontrolla le maschere di ${photo.file}.`);
  const { data, info } = await sharp(original).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const [index, points] of photo.masks.entries())
    await coverWithPaper(data, info.width, info.height, points, parseInt(sha256.slice(index * 8, index * 8 + 8), 16));
  // Built from raw pixels: the public file carries no layer or metadata that
  // could reveal the covered text.
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(1200, 1600, { fit: "cover" })
    .webp({ quality: 90, effort: 6 })
    .toFile(fileURLToPath(new URL(`${photo.name}.webp`, output)));
  console.log(`${photo.name}: 1200 x 1600; source SHA256 ${sha256}`);
}
