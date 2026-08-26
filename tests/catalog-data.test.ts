import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const catalog = JSON.parse(readFileSync(new URL("../public/products.json", import.meta.url), "utf8"));

describe("public catalog", () => {
  it("contains all 69 products and 122 SKU rows", () => {
    expect(catalog.products).toHaveLength(69);
    expect(catalog.products.flatMap((product: { skus: unknown[] }) => product.skus)).toHaveLength(122);
  });

  it("keeps English names, public USD prices, and valid images", () => {
    for (const product of catalog.products) {
      expect(product.title).not.toMatch(/[\u3400-\u9fff]/);
      expect(product.mainImage).toMatch(/^https:\/\//);
      expect(Number.isFinite(product.priceUsd)).toBe(true);
      for (const sku of product.skus) {
        expect(sku.name).not.toMatch(/[\u3400-\u9fff]/);
        expect(sku.image).toMatch(/^https:\/\//);
        expect(Number.isFinite(sku.priceUsd)).toBe(true);
      }
    }
  });

  it("does not expose source links or cost fields", () => {
    const serialized = JSON.stringify(catalog);
    expect(serialized).not.toContain("1688.com");
    expect(serialized).not.toMatch(/cost|sourceUrl|sourcePrice/i);
  });
});
