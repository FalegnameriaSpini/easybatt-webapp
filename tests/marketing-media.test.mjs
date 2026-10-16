import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { marketingMedia, processSteps } from "../lib/easybatt-marketing.mjs";

function localFile(media) {
  assert.ok(media.src.startsWith("/marketing/originali/"));
  return fileURLToPath(new URL(`../public${media.src}`, import.meta.url));
}

test("Original marketing photographs exist with correct dimensions and no private metadata", async () => {
  for (const media of Object.values(marketingMedia)) {
    const metadata = await sharp(localFile(media)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, media.width, media.src);
    assert.equal(metadata.height, media.height, media.src);
    assert.ok(media.alt && media.caption);
    for (const field of ["exif", "xmp", "iptc"]) assert.equal(metadata[field], undefined, `${media.src}: ${field}`);
  }
});

test("Every detailed process step references a prepared photograph", () => {
  for (const step of processSteps) assert.ok(marketingMedia[step.media], step.id);
});

test("Measurement shows a different site from the system and opening photographs", () => {
  const measurement = marketingMedia[processSteps.find(step => step.id === "rilievo").media];
  assert.notEqual(measurement.src, marketingMedia.rilievoStanza.src);
  assert.notEqual(measurement.src, marketingMedia.rilievo.src);
  assert.equal(measurement.width / measurement.height, 4 / 3);
});

test("Calculation shows a different complete plan from the software and placement views", () => {
  const calculation = marketingMedia[processSteps.find(step => step.id === "elaborazione").media];
  assert.notEqual(calculation.src, marketingMedia.software.src);
  assert.notEqual(calculation.src, marketingMedia.planimetria.src);
  assert.equal(calculation.width / calculation.height, 4 / 3);
});

test("Public photos contain flattened opaque covers at the customer-reference locations", async () => {
  // Covers take the colour of the label or paper they hide (see the script).
  const label = [205, 214, 226];
  const paper = [208, 211, 222];
  const checks = [
    ["kit", label, [[527, 376], [835, 282], [1046, 219], [1041, 323], [1120, 409], [1265, 497], [1297, 658]]],
    ["kit", paper, [[288, 575]]],
    // Same photograph cropped from top 230 for the opening image.
    ["hero", label, [[835, 52], [1120, 179], [1265, 267]]],
    ["hero", paper, [[288, 345]]],
    ["lavorazione", [212, 212, 216], [[884, 240]]],
    ["codifica", [196, 222, 255], [[479, 129]]],
    ["troncatrice", [190, 194, 201], [[370, 335], [200, 318], [560, 350]]],
  ];
  for (const [key, color, points] of checks) {
    for (const [left, top] of points) {
      const rgb = await sharp(localFile(marketingMedia[key]))
        .extract({ left, top, width: 1, height: 1 }).removeAlpha().raw().toBuffer();
      color.forEach((expected, channel) => {
        assert.ok(Math.abs(rgb[channel] - expected) <= 8, `${key}: cover missing at ${left},${top}`);
      });
    }
  }
});
