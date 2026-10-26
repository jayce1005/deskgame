import { describe, expect, it } from "vitest";
import { LANDING_PAGES, findLandingPage, renderLandingMarkdown, renderLandingPage } from "../src/landing-pages";
import worker from "../src/index";

const origin = "https://boardgameb2b.com";

describe("commercial-intent landing pages", () => {
  it("publishes five distinct pages with indexable metadata and real catalog links", () => {
    expect(LANDING_PAGES).toHaveLength(5);
    expect(new Set(LANDING_PAGES.map((page) => page.title)).size).toBe(5);
    for (const page of LANDING_PAGES) {
      const html = renderLandingPage(page, origin);
      expect(html).toContain(`<link rel="canonical" href="${origin}/${page.slug}">`);
      expect(html).toContain(`<h1>${page.heading}</h1>`);
      expect(html).toContain('"@type":"WebPage"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain('"@type":"BreadcrumbList"');
      expect(html.match(/href="\/products\//g)).toHaveLength(5);
      expect(html).toContain("MOQ 1");
      expect(html).toContain("USD");
      expect(html).toContain("https://wa.me/8619928777176");
      expect(html).toContain("boardgame_01@outlook.com");
      expect(html).not.toMatch(/certified|licensed factory|annual capacity|guaranteed delivery|ships in \d+ days/i);
    }
  });

  it("publishes Markdown alternates with the same factual limitations", () => {
    for (const page of LANDING_PAGES) {
      const markdown = renderLandingMarkdown(page, origin);
      expect(markdown).toContain(`Canonical URL: ${origin}/${page.slug}`);
      expect(markdown).toContain("Public catalog prices are USD wholesale references");
      expect(markdown.match(/https:\/\/boardgameb2b\.com\/products\//g)).toHaveLength(5);
      expect(markdown).toContain("B2B inquiry site, not an online checkout");
    }
  });

  it("serves canonical HTML and Markdown routes with GET and HEAD", async () => {
    const env = {} as Env;
    for (const page of LANDING_PAGES) {
      expect(findLandingPage(page.slug)).toBe(page);
      for (const suffix of ["", ".md"]) {
        const path = `/${page.slug}${suffix}`;
        const get = await worker.fetch(new Request(origin + path), env);
        const head = await worker.fetch(new Request(origin + path, { method: "HEAD" }), env);
        expect(get.status).toBe(200);
        expect(head.status).toBe(200);
        expect(await get.text()).not.toBe("");
        expect(await head.text()).toBe("");
      }
    }
    const slash = await worker.fetch(new Request(`${origin}/${LANDING_PAGES[0].slug}/`), env);
    expect(slash.status).toBe(301);
    expect(slash.headers.get("location")).toBe(`${origin}/${LANDING_PAGES[0].slug}`);
  });
});
