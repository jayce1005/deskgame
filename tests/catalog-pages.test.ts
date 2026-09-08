import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { findCatalogProduct, renderProductPage, renderRobots, renderSitemap } from "../src/catalog-pages";

const origin = "https://boardgameb2b.com";
const catalog = JSON.parse(readFileSync(new URL("../public/products.json", import.meta.url), "utf8"));

describe("SEO catalog pages", () => {
  it("uses WhatsApp icons without displaying the phone number", () => {
    const homepage = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
    const product = findCatalogProduct("last-call-english-drinking-card-game-for-friends-and-family-parties-125925")!;
    for (const html of [homepage, renderProductPage(product, origin)]) {
      const visibleMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      expect(visibleMarkup).not.toContain("+86 199 2877 7176");
      expect(visibleMarkup).toContain('/icons/whatsapp.svg');
      expect(visibleMarkup).toContain('aria-label="Chat on WhatsApp"');
      expect(visibleMarkup).toContain("https://wa.me/8619928777176");
    }
  });

  it("renders a unique, indexable product page with visible B2B content", () => {
    const product = findCatalogProduct("last-call-english-drinking-card-game-for-friends-and-family-parties-125925");
    expect(product).toBeTruthy();
    const html = renderProductPage(product!, origin);
    expect(html).toContain(`<link rel="canonical" href="${origin}/products/${product!.slug}">`);
    expect(html).toContain(`<h1>${product!.title}</h1>`);
    expect(html).toContain("B2B inquiry listing");
    expect(html).toContain('"@type":"Product"');
    expect(html).toContain('"@type":"Offer"');
    expect(html).not.toContain('"@type":"AggregateOffer"');
    expect(html).toContain('"name":"Minimum order quantity","value":"1 piece"');
    expect(html).toContain('"telephone":"+86 199 2877 7176"');
    expect(html).toContain("https://wa.me/8619928777176");
    expect(html).toContain("boardgame_01@outlook.com");
    expect(html).toContain(product!.skus[0].name);
  });

  it("publishes the homepage and every current product URL in the sitemap", () => {
    const sitemap = renderSitemap(origin);
    expect(sitemap.match(/<url>/g)).toHaveLength(catalog.products.length+1);
    expect(sitemap.match(/<image:image>/g)).toHaveLength(catalog.products.length);
    expect(sitemap).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(sitemap).toContain(`<lastmod>${catalog.generatedAt.slice(0,10)}</lastmod>`);
    expect(sitemap).toContain("/products/last-call-english-drinking-card-game");
    expect(sitemap).toContain("<image:title>");
    expect(renderRobots(origin)).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });

  it("includes canonical, social and structured metadata on the catalog page", () => {
    const homepage = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
    expect(homepage).toContain("Board Game Manufacturer &amp; Wholesale Supplier | BoardGame B2B");
    expect(homepage).toContain('<link rel="canonical"');
    expect(homepage).toContain('<link rel="sitemap"');
    expect(homepage).toContain('name="twitter:title"');
    expect(homepage).toContain('type="application/ld+json"');
    expect(homepage).toContain("Factory Games. MOQ One.");
    expect(homepage).toContain("MOQ is always 1");
    expect(homepage).toContain('id="contact"');
    expect(homepage).toContain("https://wa.me/8619928777176");
    expect(homepage).toContain("boardgame_01@outlook.com");
    const schemaMarkup = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    expect(schemaMarkup).toBeTruthy();
    const schema = JSON.parse(schemaMarkup!);
    const organization = schema["@graph"].find((item: { "@type": string }) => item["@type"] === "Organization");
    expect(organization.email).toBe("boardgame_01@outlook.com");
    expect(organization.telephone).toBe("+86 199 2877 7176");
    expect(homepage).toContain('id="searchInput"');
    expect(homepage).toContain('id="pagination"');
    const app = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
    expect(app).toContain("const PAGE_SIZE = 100");
    const wrangler = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
    expect(wrangler).toContain('"run_worker_first": true');
  });
});
