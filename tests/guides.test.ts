import { describe, expect, it } from "vitest";
import { findGuide, renderGuideIndex, renderGuideMarkdown, renderGuidePage } from "../src/guides";

const origin = "https://boardgameb2b.com";
const slug = "wholesale-party-card-games-buyer-checklist";

describe("wholesale buying guides", () => {
  it("renders an indexable article with matching metadata and structured data", () => {
    const guide = findGuide(slug)!;
    const html = renderGuidePage(guide, origin);
    expect(html).toContain(`<link rel="canonical" href="${origin}/guides/${slug}">`);
    expect(html).toContain(`<h1>${guide.title}</h1>`);
    expect(html).toContain('"@type":"Article"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain(`${origin}/guides/${slug}.md`);
  });

  it("uses factual catalog examples and gives actionable inquiry guidance", () => {
    const html = renderGuidePage(findGuide(slug)!, origin);
    expect(html.match(/href="\/products\//g)?.length).toBeGreaterThanOrEqual(5);
    expect(html).toContain("Last Call English Drinking Card Game");
    expect(html).toContain("exact SKU name");
    expect(html).toContain("destination country and postal code");
    expect(html).toContain("MOQ 1");
    expect(html).toContain("B2B inquiry site rather than an online checkout");
    expect(html).toContain("boardgame_01@outlook.com");
    expect(html).toContain("https://wa.me/8619928777176");
    expect(html).not.toMatch(/certified|licensed|annual capacity|ships in \d+ days/i);
  });

  it("publishes a discoverable guide index and Markdown alternate", () => {
    const guide = findGuide(slug)!;
    const index = renderGuideIndex(origin);
    const markdown = renderGuideMarkdown(guide, origin);
    expect(index).toContain(`/guides/${slug}`);
    expect(index).toContain('"@type":"CollectionPage"');
    expect(markdown).toContain(`Canonical URL: ${origin}/guides/${slug}`);
    expect(markdown).toContain("## Buyer checklist");
    expect(markdown).toContain("Displayed prices are USD wholesale reference prices");
  });
});
