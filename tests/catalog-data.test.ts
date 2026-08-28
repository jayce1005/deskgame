import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const catalog = JSON.parse(readFileSync(new URL("../public/products.json", import.meta.url), "utf8"));

describe("public catalog", () => {
  it("contains all 431 products and 756 SKU rows", () => {
    expect(catalog.products).toHaveLength(431);
    expect(catalog.products.flatMap((product: { skus: unknown[] }) => product.skus)).toHaveLength(756);
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

  it("keeps product IDs and SEO slugs unique", () => {
    expect(new Set(catalog.products.map((product: { id: string }) => product.id)).size).toBe(catalog.products.length);
    expect(new Set(catalog.products.map((product: { slug: string }) => product.slug)).size).toBe(catalog.products.length);
  });

  it("serves every catalog image from a checked-in local asset", () => {
    const images = new Set<string>();
    for (const product of catalog.products) {
      images.add(product.mainImage);
      for (const image of product.images) images.add(image);
      for (const sku of product.skus) images.add(sku.image);
    }
    expect(images.size).toBe(2032);
    for (const image of images) {
      expect(image).toMatch(/^https:\/\/boardgameb2b\.com\/images\/catalog\/[a-f0-9]{64}\.(?:jpg|png|webp|gif|avif)$/);
      const pathname = new URL(image).pathname;
      expect(existsSync(new URL(`../public${pathname}`, import.meta.url))).toBe(true);
    }
  });
});
