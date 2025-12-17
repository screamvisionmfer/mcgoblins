import fs from "node:fs";
import path from "node:path";

const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

export function getArts(): string[] {
  const dir = path.join(process.cwd(), "public", "arts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((f) => `/arts/${f}`);
}
