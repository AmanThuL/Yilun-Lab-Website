// Structural + raster checks for the six logo masters.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public/assets/brand/logos");
const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
assert.equal(manifest.vectorExports.length, 12, "Expected six SVG and six PDF exports");
for (const entry of manifest.vectorExports) {
  const bytes = await fs.readFile(path.join(dir, entry.file));
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    entry.sha256,
    `${entry.file}: differs from recorded Figma export`
  );
}
console.log("12 vector exports match the recorded Figma hashes");
async function alpha(src, width = 2048) {
  return sharp(src)
    .resize({ width })
    .ensureAlpha()
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });
}
for (const layout of ["mark", "lockup-horizontal", "lockup-stacked"]) {
  const blacks = await fs.readFile(path.join(dir, "svg", `yilun-lab-${layout}-black.svg`), "utf8");
  const whites = await fs.readFile(path.join(dir, "svg", `yilun-lab-${layout}-white.svg`), "utf8");
  assert.equal(
    blacks.replaceAll('fill="black"', 'fill="white"'),
    whites,
    `${layout}: black/white geometry differs`
  );
  assert(
    !/<(?:mask|clipPath|image|text|filter|use)\b|\bstroke=|url\(/.test(blacks),
    `${layout}: unsupported construct`
  );
  const { data, info } = await alpha(Buffer.from(blacks));
  const b = [info.width, info.height, 0, 0];
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[y * info.width + x] > 127) {
        b[0] = Math.min(b[0], x);
        b[1] = Math.min(b[1], y);
        b[2] = Math.max(b[2], x + 1);
        b[3] = Math.max(b[3], y + 1);
      }
  assert(Math.abs((b[0] + b[2]) / 2 - info.width / 2) <= 1, `${layout}: x center off`);
  assert(Math.abs((b[1] + b[3]) / 2 - info.height / 2) <= 1, `${layout}: y center off`);
  assert(b[0] > 0 && b[1] > 0 && b[2] < info.width && b[3] < info.height, `${layout}: clipped`);
  const suffix = layout === "mark" ? "1024" : "2400w",
    width = layout === "mark" ? 1024 : 2400;
  for (const color of ["black", "white"]) {
    const stem = `yilun-lab-${layout}-${color}`;
    const png = path.join(dir, "png", `${stem}-transparent-${suffix}.png`);
    const actual = await alpha(png, width),
      expected = await alpha(path.join(dir, "svg", `${stem}.svg`), width);
    assert.deepEqual(actual.data, expected.data, `${stem}: PNG differs from SVG`);
  }
  console.log(
    `${layout}: paths only; black/white identical; centered; no clipping; PNG matches SVG`
  );
}
