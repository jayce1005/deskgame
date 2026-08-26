import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const [catalogPath, imageOutputDir, stagedCatalogPath, publicBase = "https://desktop-game.ocbinks.workers.dev/images/catalog"] = process.argv.slice(2);
if (!catalogPath || !imageOutputDir || !stagedCatalogPath) {
  throw new Error("Usage: archive-catalog-images.mjs <catalog.json> <image-output-dir> <staged-catalog.json> [public-base]");
}

const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const urls = new Set();
for (const product of catalog.products) {
  urls.add(product.mainImage);
  for (const image of product.images || []) urls.add(image);
  for (const sku of product.skus || []) urls.add(sku.image);
}

const sourceUrls = [...urls].filter((value) => {
  try { return new URL(value).hostname !== "desktop-game.ocbinks.workers.dev"; }
  catch { return false; }
});

const extensionByType = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"],
]);

function detectExtension(bytes, contentType) {
  const normalized = String(contentType || "").split(";")[0].trim().toLowerCase();
  if (extensionByType.has(normalized)) return extensionByType.get(normalized);
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (String.fromCharCode(...bytes.slice(0, 4)) === "RIFF") return "webp";
  if (String.fromCharCode(...bytes.slice(0, 3)) === "GIF") return "gif";
  throw new Error(`Unsupported image type: ${contentType || "unknown"}`);
}

async function fetchImage(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "Mozilla/5.0 DesktopGameImageArchive/1.0" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.byteLength < 32) throw new Error("Image response is empty or invalid");
      return { bytes, contentType: response.headers.get("content-type") || "" };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

await fs.mkdir(imageOutputDir, { recursive: true });
const replacements = new Map();
const files = new Map();
const failures = [];
let completed = 0;

async function processUrl(url) {
  try {
    const { bytes, contentType } = await fetchImage(url);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const extension = detectExtension(bytes, contentType);
    const filename = `${hash}.${extension}`;
    const destination = path.join(imageOutputDir, filename);
    if (!files.has(filename)) {
      await fs.writeFile(destination, bytes);
      files.set(filename, { filename, bytes: bytes.byteLength, contentType: extensionByType.has(contentType) ? contentType : `image/${extension === "jpg" ? "jpeg" : extension}` });
    }
    replacements.set(url, `${publicBase}/${filename}`);
  } catch (error) {
    failures.push({ url, error: error instanceof Error ? error.message : String(error) });
  } finally {
    completed += 1;
    if (completed % 100 === 0 || completed === sourceUrls.length) console.log(`Downloaded ${completed}/${sourceUrls.length}`);
  }
}

const concurrency = 12;
for (let index = 0; index < sourceUrls.length; index += concurrency) {
  await Promise.all(sourceUrls.slice(index, index + concurrency).map(processUrl));
}

if (failures.length) {
  await fs.writeFile(`${stagedCatalogPath}.failures.json`, JSON.stringify(failures, null, 2));
  throw new Error(`${failures.length} images failed to download; catalog was not rewritten.`);
}

const replace = (value) => replacements.get(value) || value;
for (const product of catalog.products) {
  product.mainImage = replace(product.mainImage);
  product.images = (product.images || []).map(replace);
  for (const sku of product.skus || []) sku.image = replace(sku.image);
}
catalog.generatedAt = new Date().toISOString();

await fs.writeFile(stagedCatalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
const report = {
  sourceUrls: sourceUrls.length,
  storedFiles: files.size,
  totalBytes: [...files.values()].reduce((sum, file) => sum + file.bytes, 0),
  files: [...files.values()],
};
await fs.writeFile(`${stagedCatalogPath}.report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ sourceUrls: report.sourceUrls, storedFiles: report.storedFiles, totalBytes: report.totalBytes }, null, 2));
