import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

const catalog = JSON.parse(readFileSync(new URL("../public/products.json", import.meta.url), "utf8"));
const release = JSON.parse(readFileSync(new URL("../scripts/catalog-release-20260907.json", import.meta.url), "utf8"));
const imageManifest = JSON.parse(readFileSync(new URL("../scripts/catalog-images.json", import.meta.url), "utf8"));

describe("public catalog", () => {
  it("contains the complete reviewed release with one product per new SKU", () => {
    expect(catalog.products).toHaveLength(release.totalProducts);
    expect(catalog.products.flatMap((product: { skus: unknown[] }) => product.skus)).toHaveLength(release.totalSkus);
    expect(release.newProducts.length).toBe(141);
    for(const item of release.newProducts){
      const p=catalog.products.find((p: {id:string})=>p.id===item.id);
      expect(p).toBeTruthy();
      expect(p.title).toBe(item.title);
      expect(p.skus).toHaveLength(1);
      expect(p.skus[0].name).toBe(p.title);
      expect(p.priceUsd).toBe(item.priceUsd);
      expect(p.skus[0].priceUsd).toBe(item.priceUsd);
      expect(p.skus[0].image).toBe(p.mainImage);
    }
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

  it("serves every catalog image from the project R2 archive with a content hash manifest", () => {
    const images = new Set<string>();
    for (const product of catalog.products) {
      images.add(product.mainImage);
      for (const image of product.images) images.add(image);
      for (const sku of product.skus) images.add(sku.image);
    }
    expect(images.size).toBe(release.totalImages);
    expect(imageManifest.bucket).toBe("boardgameb2b-images");
    expect(imageManifest.origin).toBe("https://images.boardgameb2b.com");
    const files = new Map<string, {sha256:string; bytes:number}>(imageManifest.files.map((f: {key:string; sha256:string; bytes:number})=>[f.key,f]));
    expect(files.size).toBe(imageManifest.files.length);
    for (const image of images) {
      expect(image).toMatch(/^https:\/\/images\.boardgameb2b\.com\/images\/catalog\/[a-f0-9]{64}\.(?:jpg|png|webp|gif|avif)$/);
      const pathname = new URL(image).pathname;
      const file = files.get(pathname.slice(1));
      expect(file).toBeTruthy();
      expect(file?.sha256).toBe(pathname.split('/').at(-1)?.split('.')[0]);
      expect(file?.bytes).toBeGreaterThan(0);
      const local = new URL(`../public${pathname}`, import.meta.url);
      if (existsSync(local)) {
        const bytes = readFileSync(local);
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(file?.sha256);
        expect(bytes.length).toBe(file?.bytes);
      }
    }
  });
});
