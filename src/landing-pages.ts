import catalogJson from "../public/products.json";
import type { CatalogProduct } from "./catalog-pages";

const products = (catalogJson as { products: CatalogProduct[] }).products;
const CONTACT_EMAIL = "boardgame_01@outlook.com";
const WHATSAPP_NUMBER = "8619928777176";

interface LandingSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  checklistTitle: string;
  checklist: string[];
  sections: LandingSection[];
  examples: string[];
  examplesTitle: string;
  examplesIntro: string;
  faqs: LandingFaq[];
  updated: string;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "custom-board-game-manufacturer",
    title: "Custom Board Game Manufacturer Inquiry Guide | BoardGame B2B",
    description: "Prepare a clear custom board game manufacturing inquiry covering components, artwork, packaging, quantities, destination and approval questions.",
    eyebrow: "Custom board game sourcing",
    heading: "Plan a custom board game manufacturing inquiry that can be quoted.",
    intro: "A custom board game request needs more than a theme and a target price. Buyers should define the physical product, artwork status, packaging direction, quantities and destination before asking a supplier to confirm feasibility, pricing and timing.",
    checklistTitle: "Information to prepare before contacting a manufacturer",
    checklist: [
      "Working product name, audience and intended market.",
      "Card, board, token, dice, booklet and other component requirements.",
      "Finished dimensions, quantities and packaging direction.",
      "Artwork status, language and version-controlled file names.",
      "Destination country, city, postal code and requested planning window.",
    ],
    sections: [
      {
        heading: "Define the physical product before requesting a price",
        paragraphs: [
          "List every required component and identify which details are fixed versus open for supplier input. A card-only game, a board game with tokens and a boxed set with several inserts do not share the same quotation basis.",
          "Use dimensions, counts and material questions rather than broad labels such as “standard quality.” When a specification is undecided, mark it as an open question so the supplier can respond without treating an assumption as approved.",
        ],
      },
      {
        heading: "Keep artwork and language versions controlled",
        paragraphs: [
          "State whether artwork is complete, in progress or still conceptual. Give each shared file set a clear version name and identify the language required on cards, boards, rules, inserts and packaging.",
          "Do not send several conflicting files without explaining which one should be reviewed. Ask the supplier to confirm accepted file requirements, proof stages and any missing information for the exact project.",
        ],
      },
      {
        heading: "Separate the sample decision from the production decision",
        paragraphs: [
          "Explain what an initial sample must help you evaluate: dimensions, component fit, printed language, packaging structure or another visible requirement. A sample review should be recorded against the exact project version.",
          "Catalog MOQ 1 applies to current public catalog products. A custom manufacturing project has its own requirements, quantities and quotation basis, which must be confirmed separately by inquiry.",
        ],
      },
      {
        heading: "Request a quotation with a stable scope",
        paragraphs: [
          "Ask for the selected specification, quantity scenarios, packaging, artwork assumptions, destination and commercial terms to be shown clearly. Keep unresolved items visible rather than comparing incomplete quotations as if they cover identical products.",
          "If the component list, artwork, quantity or delivery requirement changes, request an updated confirmation tied to the revised brief.",
        ],
      },
    ],
    examples: [
      "casting-shadows-english-strategy-board-game-and-expansion-744615",
      "digital-number-tile-family-board-game-745351",
      "azul-first-edition-multilingual-tile-board-game-741181",
      "splendor-board-game-duel-expansions-and-playmat-collection-725361",
      "stick-stack-bilingual-balance-party-game-737521",
    ],
    examplesTitle: "Board game format references from the live catalog",
    examplesIntro: "These products illustrate different component, edition and package scopes. Their displayed prices apply only to the linked catalog SKUs and are not custom-manufacturing quotations.",
    faqs: [
      { question: "Does the public MOQ 1 automatically apply to a custom board game?", answer: "No. MOQ 1 applies to public catalog products. Custom project quantities, specifications and pricing must be confirmed through a separate inquiry." },
      { question: "What should be included in the first message?", answer: "Send the component list, dimensions or open size questions, language, artwork status, packaging direction, quantity scenarios, destination and requested planning window." },
      { question: "Are the catalog prices custom-production prices?", answer: "No. Catalog prices are USD wholesale references for the linked existing products. A custom project requires its own confirmed quotation." },
    ],
    updated: "2026-10-26",
  },
  {
    slug: "wholesale-card-games",
    title: "Wholesale Card Games for B2B Buyers | MOQ 1 Catalog",
    description: "Compare wholesale card game formats, languages, exact SKUs and USD reference prices, then prepare a card-game quotation request with MOQ 1.",
    eyebrow: "Wholesale card game catalog",
    heading: "Source wholesale card games by exact title, language and SKU.",
    intro: "Card games can look similar while serving very different audiences and markets. Build a useful B2B shortlist by preserving the exact title, language, edition, SKU image and reference price for every selected option.",
    checklistTitle: "Card game buying checklist",
    checklist: [
      "Choose the intended audience and retail position.",
      "Confirm the exact game title, language and edition.",
      "Keep every SKU image and USD reference price matched.",
      "Review visible package scope and record open content questions.",
      "Send quantity, destination and packaging requirements together.",
    ],
    sections: [
      {
        heading: "Build the range around buyer intent",
        paragraphs: [
          "Separate family, party, couples, conversation, educational and language-led products instead of treating every deck as interchangeable. Give each shortlisted SKU a clear reason for being in the assortment.",
          "Titles and packaging provide useful starting evidence, but do not infer age guidance, card count, play time or content suitability when those details are not stated. Add them to the inquiry when they matter to your market.",
        ],
      },
      {
        heading: "Verify language on the exact SKU",
        paragraphs: [
          "Copy English, Spanish, bilingual or other edition wording exactly as it appears. Ask which language is printed on cards, rules, inserts and packaging when the listing does not answer the question clearly.",
          "A shared parent page may contain several titles or language editions. One row in the buying sheet should represent one exact SKU, with its current image and price evidence attached.",
        ],
      },
      {
        heading: "Use MOQ 1 for a focused evaluation",
        paragraphs: [
          "Every public catalog product lists MOQ 1. Select a small number of distinct SKUs and define what each sample should help you check, such as visible language, box presentation, card handling or assortment fit.",
          "The site is for B2B inquiries rather than online checkout. Availability, final unit pricing, packaging, freight and commercial terms are confirmed by the sales team.",
        ],
      },
      {
        heading: "Send a line-by-line card game inquiry",
        paragraphs: [
          "Include the canonical product URL, exact SKU name and quantity for every line. Add the destination country, city and postal code, packaging or labeling requirements and the requested receiving window.",
          "Keep the displayed website price separate from the final dated quotation so that your records show which amount was a reference and which amount was commercially confirmed.",
        ],
      },
    ],
    examples: [
      "last-call-english-drinking-card-game-for-friends-and-family-parties-125925",
      "guess-in-10-animal-planet-kids-educational-card-game-125219",
      "our-moments-couples-conversation-starter-cards-123965",
      "virus-and-spanish-language-party-card-games-24-options-121015",
      "splurt-and-assorted-english-party-card-games-10-options-122313",
    ],
    examplesTitle: "Wholesale card game catalog references",
    examplesIntro: "These live products show several audience, language and multi-SKU positions. Prices are current USD wholesale references for the linked options.",
    faqs: [
      { question: "What is the MOQ for catalog card games?", answer: "The public catalog lists MOQ 1 for every product. Availability and final commercial terms are confirmed by inquiry." },
      { question: "Can several card game SKUs be combined in one inquiry?", answer: "Yes. List each canonical product URL, exact SKU name and quantity separately so the requested options remain unambiguous." },
      { question: "Do displayed prices include freight?", answer: "No. Displayed prices are USD wholesale references. Packaging, freight and final terms are confirmed separately." },
    ],
    updated: "2026-10-26",
  },
  {
    slug: "private-label-card-game-printing",
    title: "Private Label Card Game Printing Inquiry Checklist",
    description: "Prepare a private label card game printing inquiry with card count, dimensions, artwork, language, box direction, quantities and delivery details.",
    eyebrow: "Private label inquiry planning",
    heading: "Turn a private label card game idea into a clear supplier brief.",
    intro: "Private label card game requests need a defined print and packaging scope. This page helps buyers organize the information a supplier needs to review before confirming feasibility, proofs, quantities, pricing or timing.",
    checklistTitle: "Private label brief essentials",
    checklist: [
      "Card count, finished dimensions and any non-card components.",
      "Front, back, rule and packaging artwork status.",
      "Required language for every printed element.",
      "Box or package direction and any insert requirements.",
      "Quantity scenarios, destination and requested planning window.",
    ],
    sections: [
      {
        heading: "Specify the deck rather than only the concept",
        paragraphs: [
          "Provide the intended number of cards, finished size and any required pieces beyond the deck. State which decisions are final and which require supplier confirmation.",
          "If you are using an existing catalog product only as a format reference, identify the characteristic you are comparing. Do not assume its components, price or MOQ automatically transfer to a private label project.",
        ],
      },
      {
        heading: "Prepare one controlled artwork package",
        paragraphs: [
          "Separate card fronts, card backs, rules, box panels and inserts in a clearly named file set. State the current revision and who is responsible for final text and artwork approval.",
          "Ask which file formats, color settings, bleed, safe areas and proof stages need confirmation. These requirements should come from the supplier response for the exact project rather than from an unrelated product page.",
        ],
      },
      {
        heading: "Describe packaging as part of the product",
        paragraphs: [
          "Name the intended package type and explain whether it needs an insert, tray, sleeve, label or other element. Provide dimensions when known and mark undecided structures as questions.",
          "Packaging changes can alter the quotation basis and preparation work. Keep the approved package version attached to the deck version when comparing responses.",
        ],
      },
      {
        heading: "Request comparable quantity scenarios",
        paragraphs: [
          "Give a specific initial quantity and any useful comparison quantities. Include the destination country, city and postal code so freight can be discussed against a real delivery point.",
          "Ask the response to separate unit pricing, packaging assumptions, freight basis and other confirmed terms. Do not treat a public catalog reference price as a private label quotation.",
        ],
      },
    ],
    examples: [
      "bestself-intimacy-deck-150-couples-conversation-prompts-121483",
      "couples-connection-deck-conversation-cards-123237",
      "date-night-adventure-couples-card-game-576073",
      "tell-me-more-conversation-starter-card-game-122207",
      "game-that-song-music-party-card-game-black-edition-124705",
    ],
    examplesTitle: "Existing deck-format references",
    examplesIntro: "Use these live catalog products only to compare visible deck and package directions. Their SKUs and prices do not constitute private label printing specifications or quotations.",
    faqs: [
      { question: "Can I use a catalog product price for my private label deck?", answer: "No. Catalog prices apply to the linked existing SKUs. Private label artwork, components, packaging, quantities and delivery requirements need a separate quotation." },
      { question: "Should artwork be complete before the first inquiry?", answer: "Not necessarily, but state the artwork status clearly and provide a stable component and packaging brief. Ask what files and approvals are required next." },
      { question: "What language information should I provide?", answer: "Identify the language required on cards, rules, packaging, labels and inserts, and keep each text version under clear revision control." },
    ],
    updated: "2026-10-26",
  },
  {
    slug: "low-moq-board-game-supplier",
    title: "Low MOQ Board Game Supplier | MOQ 1 Wholesale Catalog",
    description: "Use MOQ 1 to evaluate exact board game and card game SKUs before requesting a larger B2B quotation with confirmed pricing and freight.",
    eyebrow: "Low MOQ wholesale sourcing",
    heading: "Start with one exact SKU, then build a better wholesale order.",
    intro: "The public BoardGame B2B catalog lists MOQ 1 for every product. Buyers can use a focused starting quantity to compare selected products while keeping each title, SKU, image, language and reference price accurately recorded.",
    checklistTitle: "A practical MOQ 1 evaluation plan",
    checklist: [
      "Give every sample a specific evaluation purpose.",
      "Choose the exact product URL and child SKU.",
      "Record image, language, edition and displayed price.",
      "Inspect the received item against the same SKU record.",
      "Prepare follow-up quantities and destination details.",
    ],
    sections: [
      {
        heading: "Use a small start to answer defined questions",
        paragraphs: [
          "Select products that test different category roles, price positions, languages or formats. Avoid ordering many near-identical items without deciding what the comparison should reveal.",
          "Record the exact SKU before sending the inquiry. A parent listing can contain different editions, titles, colors or accessories, so the parent name alone may not identify the requested item.",
        ],
      },
      {
        heading: "Keep MOQ separate from availability",
        paragraphs: [
          "MOQ 1 states the public catalog starting quantity. It does not guarantee current stock or replace a supplier confirmation for the selected SKU and destination.",
          "Ask the sales team to confirm the exact item, current availability, final unit price, packaging, freight basis and other commercial terms before relying on the reference listing.",
        ],
      },
      {
        heading: "Document the physical review",
        paragraphs: [
          "When the item is received, compare its visible title, edition, language, components and packaging with the buying record. Photograph relevant differences and keep the notes attached to the exact SKU.",
          "Do not apply one sample result automatically to other options on the same parent page. Materially different SKUs need their own verification questions.",
        ],
      },
      {
        heading: "Turn findings into a larger quotation request",
        paragraphs: [
          "Remove unsuitable lines, retain the selected SKUs and enter a quantity for every option. Add destination country, city and postal code, packaging requirements and a requested receiving window.",
          "Keep the original USD website reference price in a separate field from the dated quotation. This makes later changes in scope, quantity or freight easier to audit.",
        ],
      },
    ],
    examples: [
      "virus-original-card-game-green-edition-125609",
      "tiki-topple-family-strategy-board-game-742287",
      "pelusas-spanish-and-portuguese-family-card-game-121689",
      "splendor-duel-gem-token-strategy-board-game-746231",
      "wild-charades-adult-party-card-game-124695",
    ],
    examplesTitle: "MOQ 1 catalog examples",
    examplesIntro: "These linked products cover several formats and language positions. Each public listing shows MOQ 1 and a USD reference price for its exact SKU.",
    faqs: [
      { question: "Does MOQ 1 mean this is a retail checkout site?", answer: "No. BoardGame B2B is an inquiry site. The public catalog starts at one unit, while availability, final pricing, packaging, freight and terms are confirmed offline." },
      { question: "Can I request several different products at MOQ 1?", answer: "You can send several product links, but list each exact SKU and quantity separately so the sales team can confirm the request." },
      { question: "Is the displayed price the delivered price?", answer: "No. It is a USD wholesale reference for the product. Freight and final commercial terms are confirmed separately." },
    ],
    updated: "2026-10-26",
  },
  {
    slug: "custom-board-game-packaging",
    title: "Custom Board Game Packaging Inquiry Guide",
    description: "Prepare a custom board game packaging inquiry covering product dimensions, components, box direction, inserts, artwork, quantities and destination.",
    eyebrow: "Board game packaging planning",
    heading: "Describe custom board game packaging as a complete product system.",
    intro: "A packaging request should connect the box or container to the components it must protect and present. Buyers can use this checklist to prepare dimensions, structure questions, artwork status, quantities and delivery details for supplier confirmation.",
    checklistTitle: "Packaging inquiry checklist",
    checklist: [
      "Product and component list with known dimensions.",
      "Preferred box, sleeve, insert or tray direction.",
      "Artwork, language, label and barcode requirements.",
      "Sample or proof questions and approval responsibilities.",
      "Quantity scenarios, destination and planning window.",
    ],
    sections: [
      {
        heading: "Start with the contents the package must hold",
        paragraphs: [
          "List cards, boards, tokens, dice, booklets and other pieces with known finished dimensions and counts. Explain whether the package must hold one product, a bundle or several SKU combinations.",
          "If component dimensions are not final, say so. A supplier cannot confirm a final packaging structure from exterior artwork alone.",
        ],
      },
      {
        heading: "Separate structure from graphic artwork",
        paragraphs: [
          "Describe the intended box or package direction separately from its printed design. Identify inserts, trays, sleeves, labels or other requested elements and mark any structure that still needs confirmation.",
          "Keep structural revisions and artwork revisions clearly named. Ask which template, proof and approval steps apply to the exact proposed package.",
        ],
      },
      {
        heading: "Confirm language and market-facing details",
        paragraphs: [
          "State the required language for the exterior, rules, warnings, labels and inserts. Provide barcode or other market-facing requirements as buyer inputs rather than assuming they are included automatically.",
          "Questions involving legal or regulatory requirements should be confirmed with appropriately qualified parties for the destination market. The supplier inquiry should clearly show which packaging elements still require buyer approval.",
        ],
      },
      {
        heading: "Keep packaging costs tied to the project version",
        paragraphs: [
          "Send quantity scenarios, destination and the current component and artwork version together. Ask the response to state the package scope and assumptions used for the quotation.",
          "The public catalog provides useful visual format references, but its displayed prices apply to existing products. Custom packaging, freight and final commercial terms require separate confirmation.",
        ],
      },
    ],
    examples: [
      "splendor-board-game-duel-expansions-and-playmat-collection-725361",
      "sushi-go-family-card-and-dice-game-collection-727243",
      "stick-stack-bilingual-balance-party-game-737521",
      "virus-and-spanish-language-party-card-games-24-options-121015",
      "casting-shadows-english-strategy-board-game-and-expansion-744615",
    ],
    examplesTitle: "Existing packaging and format references",
    examplesIntro: "These products show different visible box, component and multi-SKU situations. Use them only as catalog references; packaging specifications and custom quotations must be confirmed separately.",
    faqs: [
      { question: "What dimensions should be included?", answer: "Provide known finished dimensions and counts for every component, plus any target exterior package dimensions. Mark undecided dimensions as open questions." },
      { question: "Do catalog prices include custom packaging?", answer: "No. Catalog prices apply to existing linked SKUs. Custom structures, artwork, inserts, labels, quantities and freight require a separate quotation." },
      { question: "What should I send with packaging artwork?", answer: "Send one clearly named artwork version, the component list, structure direction, required language, quantity scenarios, destination and a list of unresolved approval questions." },
    ],
    updated: "2026-10-26",
  },
];

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] ?? character);
}

function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function money(product: CatalogProduct): string {
  const prices = product.skus.map((sku) => sku.priceUsd);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  return low === high ? `USD ${low.toFixed(2)}` : `USD ${low.toFixed(2)}–${high.toFixed(2)}`;
}

function header(): string {
  return `<header class="site-header"><a class="logo" href="/" aria-label="BoardGame B2B home"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a><nav aria-label="Primary navigation"><a href="/#catalog">Catalog</a><a href="/guides/">Guides</a><a href="/#about">About</a><a href="/#contact">Contact</a></nav><a class="header-link" href="/#contact">Send inquiry <span>↗</span></a></header>`;
}

function footer(): string {
  return `<footer><a class="logo footer-logo" href="/"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a><p>Wholesale games and sourcing references.<br>Pricing shown for reference only.</p><div class="footer-contact"><a class="whatsapp-icon-link" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><img src="/icons/whatsapp.svg" alt="" width="28" height="28">WhatsApp</a><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></div><span>© 2026 BoardGame B2B</span></footer>`;
}

export function findLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}

export function renderLandingPage(page: LandingPage, origin: string): string {
  const canonical = `${origin}/${page.slug}`;
  const examples = page.examples.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is CatalogProduct => Boolean(product));
  const otherPages = LANDING_PAGES.filter((item) => item.slug !== page.slug);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I would like to discuss ${page.heading}`)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: page.title,
        description: page.description,
        url: canonical,
        dateModified: page.updated,
        isPartOf: { "@type": "WebSite", "@id": `${origin}/#website`, name: "BoardGame B2B Wholesale Catalog", url: `${origin}/` },
        about: { "@type": "Thing", name: page.heading },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: page.heading, item: canonical },
        ],
      },
    ],
  };
  const exampleCards = examples.map((product) => `<article class="landing-product-card"><a href="/products/${product.slug}"><img src="${escapeHtml(product.mainImage)}" alt="${escapeHtml(product.title)}" width="240" height="240" loading="lazy" referrerpolicy="no-referrer"><h3>${escapeHtml(product.title)}</h3></a><p>${money(product)} · ${product.skus.length} ${product.skus.length === 1 ? "SKU" : "SKUs"} · MOQ 1</p></article>`).join("");
  const sections = page.sections.map((section, index) => `<section class="landing-copy-section"><span class="landing-number">0${index + 1}</span><div><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}</div></section>`).join("");
  const faqs = page.faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join("");
  const related = otherPages.map((item) => `<a href="/${item.slug}">${escapeHtml(item.heading)} <span>↗</span></a>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt"><meta property="og:type" content="website"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head><body class="product-page-body">${header()}<main class="landing-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">${escapeHtml(page.eyebrow)}</span></nav><article><header class="landing-hero"><span class="kicker">${escapeHtml(page.eyebrow)}</span><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.intro)}</p><div class="landing-actions"><a class="inquiry-button" href="/#contact">Send an inquiry <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="landing-note">MOQ 1 applies to public catalog products. Custom requirements, availability, final pricing, packaging, freight and commercial terms are confirmed by inquiry.</p></header><section class="landing-checklist" aria-labelledby="checklistTitle"><div><span class="kicker">Buyer checklist</span><h2 id="checklistTitle">${escapeHtml(page.checklistTitle)}</h2></div><ol>${page.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></section><div class="landing-copy">${sections}</div><section class="landing-examples"><span class="kicker">Live catalog references</span><h2>${escapeHtml(page.examplesTitle)}</h2><p>${escapeHtml(page.examplesIntro)}</p><div class="landing-product-grid">${exampleCards}</div><a class="text-link" href="/#catalog">Browse the full catalog <span>↗</span></a></section><section class="landing-faq"><span class="kicker">Buyer questions</span><h2>Frequently asked questions</h2>${faqs}</section><section class="guide-cta landing-cta"><span class="kicker">Prepare the next step</span><h2>Send exact product links or a clearly scoped project brief.</h2><p>Include SKU names or project specifications, quantities, destination and packaging questions. The sales team will confirm the applicable details for your request.</p><div><a class="inquiry-button" href="/#contact">Start an inquiry <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p></section><nav class="landing-related" aria-label="Related wholesale sourcing pages"><h2>Related sourcing pages</h2>${related}</nav></article></main>${footer()}</body></html>`;
}

export function renderLandingMarkdown(page: LandingPage, origin: string): string {
  const examples = page.examples.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is CatalogProduct => Boolean(product));
  return `# ${page.heading}\n\nCanonical URL: ${origin}/${page.slug}\nUpdated: ${page.updated}\n\n${page.intro}\n\n## ${page.checklistTitle}\n\n${page.checklist.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n${page.sections.map((section) => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`).join("\n\n")}\n\n## ${page.examplesTitle}\n\n${page.examplesIntro}\n\n${examples.map((product) => `- [${product.title}](${origin}/products/${product.slug}) — ${money(product)}; ${product.skus.length} ${product.skus.length === 1 ? "SKU" : "SKUs"}; MOQ 1.`).join("\n")}\n\n## Frequently asked questions\n\n${page.faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}\n\nPublic catalog prices are USD wholesale references. BoardGame B2B is a B2B inquiry site, not an online checkout. Availability, final pricing, packaging, freight and commercial terms are confirmed separately.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
}
