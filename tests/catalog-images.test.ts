import { describe, expect, it } from "vitest";
import { redirectCatalogImage } from "../src/catalog-images";

const pathname = `/images/catalog/${"a".repeat(64)}.jpg`;
describe("R2 catalog image migration", () => {
  for (const method of ["GET", "HEAD"]) {
    it(`preserves old image links for ${method}`, () => {
      const result = redirectCatalogImage(new Request(`https://boardgameb2b.com${pathname}?old=1`, { method }));
      expect(result?.status).toBe(301);
      expect(result?.headers.get("location")).toBe(`https://images.boardgameb2b.com${pathname}`);
    });
  }
  it("does not redirect unrelated assets or arbitrary paths", () => {
    for (const p of ["/logo.svg", "/images/brand/hero.png", "/images/catalog/not-an-image.jpg", "/images/catalog/../../api/health"]) {
      expect(redirectCatalogImage(new Request(`https://boardgameb2b.com${p}`))).toBeNull();
    }
  });
  it("does not expose upload or delete operations", () => {
    for (const method of ["POST", "PUT", "DELETE"]) {
      const result = redirectCatalogImage(new Request(`https://boardgameb2b.com${pathname}`, { method }));
      expect(result?.status).toBe(405);
      expect(result?.headers.get("allow")).toBe("GET, HEAD");
    }
  });
});
