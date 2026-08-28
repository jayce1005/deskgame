import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { findCatalogProduct, renderProductPage, renderRobots, renderSitemap } from "../src/catalog-pages";

const origin = "https://boardgameb2b.com";

describe("SEO catalog pages", () => {
  it("renders a unique, indexable product page with visible B2B content", () => {
    const product = findCatalogProduct("last-call-english-drinking-card-game-for-friends-and-family-parties-125925");
    expect(product).toBeTruthy();
    const html = renderProductPage(product!, origin);
    expect(html).toContain(`<link rel="canonical" href="${origin}/products/${product!.slug}">`);
    expect(html).toContain(`<h1>${product!.title}</h1>`);
    expect(html).toContain("B2B inquiry listing");
    expect(html).toContain('"@type":"Product"');
    expect(html).toContain(product!.skus[0].name);
  });

  it("publishes the homepage and all 431 product URLs in the sitemap", () => {
    const sitemap = renderSitemap(origin);
    expect(sitemap.match(/<url>/g)).toHaveLength(432);
    expect(sitemap).toContain("/products/last-call-english-drinking-card-game");
    expect(renderRobots(origin)).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });

  it("includes canonical, social and structured metadata on the catalog page", () => {
    const homepage = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
    expect(homepage).toContain("Board Game Factory — MOQ 1 &amp; Wholesale Prices | BoardGame B2B");
    expect(homepage).toContain('<link rel="canonical"');
    expect(homepage).toContain('type="application/ld+json"');
    expect(homepage).toContain("Factory Games. MOQ One.");
    expect(homepage).toContain("MOQ is always 1");
    expect(homepage).toContain('id="searchInput"');
    expect(homepage).toContain('id="pagination"');
    const app = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
    expect(app).toContain("const PAGE_SIZE = 100");
  });
});
