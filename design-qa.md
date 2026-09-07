# BoardGame B2B homepage design QA

Date: 2026-09-07

## Source and evidence

- Source visual truth: `/Users/rong/.codex/generated_images/01a03871-4003-7a80-ad68-0aad7d7dec86/exec-e403cf6e-8525-483d-aa74-672ea53c29a7.png` (1374 × 1145).
- Implementation: `http://127.0.0.1:8790/`, existing Cloudflare application, catalog page 1, no active search or dialog.
- CSS desktop viewport: 1374 × 1145, reported DPR 1. Scrollbar leaves 1359 CSS pixels of content width.
- Raw capture: `/tmp/deskgame-approved-full.png`. The browser's full-page export renders at half CSS scale inside a larger canvas; its first 687 × 573 region was cropped and normalized to 1374 × 1145. No page content was retouched. This export has lower raster sharpness than the live page.
- Normalized desktop: `/tmp/deskgame-desktop-approved.png`.
- Combined source/implementation input: `/tmp/deskgame-comparison-approved.png` (2748 × 1145).
- Focused catalog comparison: `/tmp/deskgame-focus-approved.png` (1200 × 500). Both full composition and readable card/title/price regions were opened and compared together.
- Mobile post-fix screenshot: `/tmp/deskgame-mobile-after.png`; CSS viewport 390 × 844, content width 375. Also visually inspected tablet at 820 × 1000, content width 805.

## Findings and comparison history

1. [P2, resolved] Hero art was cropped across the tops of tall boxes. Earlier evidence: `/tmp/deskgame-desktop-before.png`. Replaced full-width cover scaling with a centered, capped-width raster. Latest comparison shows the boxes, journals and dice without distorted proportions or cut-off box tops.
2. [P2, resolved] Initial catalog spacing pushed the second row's price behind the persistent contact strip at the source viewport. Earlier evidence: `/tmp/deskgame-comparison.png` and `/tmp/deskgame-comparison-final.png`. Reduced hero to 400px, narrowed the catalog to 1210px, removed redundant visible card notes, tightened heading/row gaps and used 134px thumbnails. Post-fix evidence: `/tmp/deskgame-comparison-approved.png`; second-row price bottom is 1039.95px and contact strip top is 1046.80px.
3. [P2, resolved] Mobile email wrapped the final domain onto a separate line. Removed the redundant email icon on small screens and kept the address on one line. `/tmp/deskgame-mobile-after.png` shows complete contact details. Contact links have at least 44px height; no horizontal document overflow at tested mobile/tablet widths.

## Required fidelity surfaces

- Typography: Manrope display headings and DM Sans catalog/UI type retain the reference's geometric sans style. Two-line hero title, strong headline hierarchy, compact 13px catalog labels and USD prices checked. Product cards retain existing two-line truncation; complete titles are available in accessible link names and detail dialogs. The live page is sharper than the normalized browser export.
- Spacing/layout: white compact header, 400px green hero, aligned search/count row, five-column compact desktop grid, and green contact strip match the chosen composition. Tablet uses three columns and mobile two, with stacked hero copy/art. Search and both hero actions remain usable.
- Colors/tokens: forest green, warm white, lime primary action and muted green price text match the requested palette. Focus-visible styling and reduced-motion overrides are present.
- Imagery/icons: generated decorative raster follows the game-box/notebook/dice still-life direction. It does not reproduce the mock's branded packaging text; it is not used as product evidence. Every catalog product retains its actual supplied image and mapping. Existing brand logo reused; Bootstrap SVG icon assets carry their MIT license. No replacement of catalog images with generated mock images.
- Copy/content: selected headline, professional factory message, MOQ 1, USD reference pricing, and inquiry-only positioning retained. Real catalog order, titles, SKU names and prices deliberately differ from mock sample data. Search count remains total catalog size (431), with filtered-result summary available to assistive technology.

## Functional checks

- 100 cards on page 1, total 431 products; first ten product images loaded successfully.
- `werewolf` search returns the correct single product; unmatched query shows the empty-state message; clearing restores the catalog.
- Page 2 displays products 101–200; returning to page 1 works.
- Hero inquiry button opens the existing inquiry dialog.
- Last Call product opens the matching detail title, Last Call SKU, $1.68 price and product photos.
- Product inquiry carries the selected product title into the inquiry dialog.
- WhatsApp and email hrefs contain the supplied contacts. No external message or production inquiry was submitted during testing.
- Browser console checked after interactions: no warning/error entries; final error check empty.
- Existing automated tests: 11 passing. Type check and whitespace/diff check passing.
- Product catalog data files, pricing, backend, product routes and sitemap were not changed.

## Acceptable differences and remaining scope

- The selected picture is a style reference, not a new source of product data. Catalog contents remain authoritative.
- The contact strip remains visible while scrolling; the mock only depicts its initial position.
- Minor logo-size and raster-background differences are P3 polish, not usability blockers.
- No production deployment or external form-submission test is claimed by this report.

## Implementation checklist

- [x] Place final hero and licensed icon assets.
- [x] Preserve catalog data, search, pagination, product dialogs and inquiry path.
- [x] Compare source and rendered desktop together; fix all P2 findings and recapture.
- [x] Inspect mobile/tablet layouts and browser console.
- [x] Run existing tests, type check and diff checks.

final result: passed

## Follow-up: WhatsApp number hidden

At the user's request, visible phone numbers were removed from homepage/product contact links and footers. The persistent contact strip now uses a prominent green WhatsApp icon with an accessible label. The original wa.me destination and structured SEO contact metadata are retained. Browser inspection confirmed no displayed phone number, successful icon loading and the correct destination. Contact strip padding was reduced to preserve its compact height. This is an intentional user-directed deviation from the original reference.
