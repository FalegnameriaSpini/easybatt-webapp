import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const symbol = await fs.readFile(path.join(root, "app/icon.svg"));
const iconDir = path.join(root, "public/icons");
await fs.mkdir(iconDir, { recursive: true });

for (const size of [180, 192, 512]) {
  const target = size === 180
    ? path.join(root, "app/apple-icon.png")
    : path.join(iconDir, `easybatt-${size}.png`);
  await sharp(symbol, { density: 600 })
    .resize(size, size)
    .flatten({ background: "#FFFFFF" })
    .png()
    .toFile(target);
}

// ICO directory entries point to PNG images at the standard browser sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size =>
  sharp(symbol, { density: 600 }).resize(size, size).png().toBuffer(),
));
const directory = Buffer.alloc(6 + 16 * images.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(images.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await fs.writeFile(path.join(root, "app/favicon.ico"), Buffer.concat([directory, ...images]));
console.log("Generated EasyBatt favicon, Apple icon and home-screen icons.");
