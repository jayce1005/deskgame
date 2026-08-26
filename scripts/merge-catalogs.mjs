import fs from "node:fs";

const [basePath, incomingPath, outputPath = basePath] = process.argv.slice(2);
if (!basePath || !incomingPath) throw new Error("Usage: merge-catalogs.mjs <base.json> <incoming.json> [output.json]");

const base = JSON.parse(fs.readFileSync(basePath, "utf8"));
const incoming = JSON.parse(fs.readFileSync(incomingPath, "utf8"));
const merged = new Map(base.products.map((product) => [String(product.id), product]));
for (const product of incoming.products) merged.set(String(product.id), product);

const products = [...merged.values()];
const catalog = {
  generatedAt: new Date().toISOString(),
  currency: "USD",
  pricingNote: "Reference wholesale prices are shown in USD. Final terms are confirmed by inquiry.",
  products,
};

fs.writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Merged ${products.length} products and ${products.flatMap((product) => product.skus).length} SKUs.`);
