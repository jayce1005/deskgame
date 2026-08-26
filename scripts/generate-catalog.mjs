import fs from "node:fs";
import { FileBlob, SpreadsheetFile } from "/Users/rong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
import { copyById } from "./catalog-copy.mjs";

const input = process.argv[2];
const output = process.argv[3] || new URL("../public/products.json", import.meta.url);
if (!input) throw new Error("Usage: generate-catalog.mjs <input.xlsx> [output.json]");

function urls(value, separator = /[\n|]+/) {
  return [...new Set(String(value || "").split(separator).map((item) => item.trim()).filter((item) => /^https:\/\//.test(item)))];
}

function usd(cost) {
  return Math.round(Number(cost) * 1.25 * 100) / 100;
}

function slug(title, id) {
  return `${title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80)}-${id.slice(-6)}`;
}

const blob = await FileBlob.load(input);
const workbook = await SpreadsheetFile.importXlsx(blob);
const rows = workbook.worksheets.getItemAt(0).getRange("A1:AG2000").values;
const headers = rows[0];
const index = Object.fromEntries(headers.map((header, position) => [header, position]));
const records = rows.slice(1).filter((row) => row[index["全球产品ID"]]);
const grouped = new Map();
for (const row of records) {
  const id = String(row[index["全球产品ID"]]);
  if (!grouped.has(id)) grouped.set(id, []);
  grouped.get(id).push(row);
}

const products = [];
for (const [id, productRows] of grouped) {
  const copy = copyById[id];
  if (!copy) throw new Error(`Missing English copy for product ${id}`);
  if (copy.skus.length !== productRows.length) {
    throw new Error(`SKU count mismatch for ${id}: ${copy.skus.length} names for ${productRows.length} rows`);
  }

  const allImages = urls(productRows[0][index["产品图片"]], /\n+/);
  const galleryIndexes = copy.galleryIndexes || allImages.slice(0, 5).map((_, position) => position + 1);
  const gallery = [...new Set(galleryIndexes.map((position) => allImages[position - 1]).filter(Boolean))];
  const mainImage = allImages[(copy.mainImageIndex || 1) - 1] || gallery[0] || "";
  if (!gallery.includes(mainImage)) gallery.unshift(mainImage);

  const skus = productRows.map((row, position) => ({
    id: `${id}-${position + 1}`,
    name: copy.skus[position],
    image: urls(row[index["变种图片"]])[0] || mainImage,
    priceUsd: usd(row[index["全球价格"]]),
  }));

  products.push({
    id,
    title: copy.title,
    slug: slug(copy.title, id),
    mainImage,
    images: gallery,
    priceUsd: Math.min(...skus.map((sku) => sku.priceUsd)),
    skus,
  });
}

const catalog = {
  generatedAt: new Date().toISOString(),
  currency: "USD",
  pricingNote: "Reference wholesale prices are shown in USD. Final terms are confirmed by inquiry.",
  products,
};
fs.writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${products.length} products and ${products.flatMap((product) => product.skus).length} SKUs.`);
