// Raster derivatives only. The six SVG inputs must be exported from Figma Official Logo V2.
// Requires the website's existing sharp dependency; never reconstructs or changes logo geometry.
import sharp from "sharp";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/assets/brand/logos");
for (const ext of ["png", "jpg"]) await fs.mkdir(path.join(out, ext), { recursive: true });
for (const layout of ["mark", "lockup-horizontal", "lockup-stacked"]) {
  const width = layout === "mark" ? 1024 : 2400;
  const suffix = layout === "mark" ? "1024" : "2400w";
  for (const color of ["black", "white"]) {
    const stem = `yilun-lab-${layout}-${color}`;
    const source = path.join(out, "svg", `${stem}.svg`);
    await sharp(source)
      .resize({ width })
      .png()
      .toFile(path.join(out, "png", `${stem}-transparent-${suffix}.png`));
    const background = color === "black" ? "#fffaf0" : "#0a0b0d";
    const bgName = color === "black" ? "cream" : "black";
    await sharp(source)
      .resize({ width })
      .flatten({ background })
      .jpeg({ quality: 95, chromaSubsampling: "4:4:4" })
      .toFile(path.join(out, "jpg", `${stem}-on-${bgName}-${suffix}.jpg`));
  }
}
console.log("Rendered 6 PNG and 6 JPG variants from production SVG masters.");
