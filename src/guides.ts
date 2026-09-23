export interface Guide {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "custom-card-game-printing-packaging-inquiry-checklist",
    title: "Custom Card Game Printing & Packaging: An Inquiry Checklist",
    description: "A practical B2B checklist for organizing artwork, card content, packaging choices, quantities and delivery details before requesting a custom card game quotation.",
    published: "2026-09-23",
    updated: "2026-09-23",
  },
  {
    slug: "wholesale-party-card-games-buyer-checklist",
    title: "Wholesale Party Card Games: A Buyer’s Selection Checklist",
    description: "A practical checklist for comparing party card games, choosing the right edition and preparing a clear MOQ 1 wholesale inquiry.",
    published: "2026-09-22",
    updated: "2026-09-22",
  },
];

const CONTACT_EMAIL = "boardgame_01@outlook.com";
const WHATSAPP_NUMBER = "8619928777176";

const examples = [
  {
    title: "Last Call English Drinking Card Game for Friends and Family Parties",
    slug: "last-call-english-drinking-card-game-for-friends-and-family-parties-125925",
    price: "USD 1.68",
    use: "A drinking-game option for adult social occasions.",
  },
  {
    title: "The Voting Game Adult Party Card Game",
    slug: "the-voting-game-adult-party-card-game-125151",
    price: "USD 3.73",
    use: "A group party format built around voting prompts.",
  },
  {
    title: "Wild Charades Adult Party Card Game",
    slug: "wild-charades-adult-party-card-game-124695",
    price: "USD 2.15",
    use: "An activity-led choice for buyers seeking a charades format.",
  },
  {
    title: "Game That Song Music Party Card Game – Black Edition",
    slug: "game-that-song-music-party-card-game-black-edition-124705",
    price: "USD 1.11",
    use: "A music-themed option for party-game assortments.",
  },
  {
    title: "Perfect Date Night Questions Couples Conversation Card Game",
    slug: "perfect-date-night-questions-couples-conversation-card-game-121351",
    price: "USD 2.42",
    use: "A conversation-led format for couples and date-night collections.",
  },
];

const customExamples = [
  {
    title: "Activity, Wellness and Educational Card Decks – 13 Options",
    slug: "activity-wellness-and-educational-card-decks-13-options-570235",
    price: "USD 1.86",
    format: "A multi-SKU listing that shows how one product family can contain distinct deck themes.",
  },
  {
    title: "Couples Connection Deck Conversation Cards",
    slug: "couples-connection-deck-conversation-cards-123237",
    price: "USD 2.42",
    format: "A conversation-deck listing with two named SKU options.",
  },
  {
    title: "BestSelf Intimacy Deck – 150 Couples Conversation Prompts",
    slug: "bestself-intimacy-deck-150-couples-conversation-prompts-121483",
    price: "USD 1.86",
    format: "A single-SKU card deck with a stated prompt count in the catalog title.",
  },
  {
    title: "Truth or Dare Adult Card Game - Red Box",
    slug: "truth-or-dare-adult-card-game-red-box-b4b24fb62540afe8753b",
    price: "USD 2.24",
    format: "A boxed adult card-game format identified by its box color.",
  },
  {
    title: "Blank Slate Party Board Game",
    slug: "blank-slate-party-board-game-1e817eb057847fd6b660",
    price: "USD 8.39",
    format: "A broader party-game format useful when comparing a card-only brief with a component-based game.",
  },
];

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function header(): string {
  return `<header class="site-header">
      <a class="logo" href="/" aria-label="BoardGame B2B home"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a>
      <nav aria-label="Primary navigation"><a href="/#catalog">Catalog</a><a href="/guides/">Guides</a><a href="/#about">About</a><a href="/#contact">Contact</a></nav>
      <a class="header-link" href="/#contact">Send inquiry <span>↗</span></a>
    </header>`;
}

function footer(): string {
  return `<footer><a class="logo footer-logo" href="/"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a><p>Wholesale games, journals and gift products.<br>Pricing shown for reference only.</p><div class="footer-contact"><a class="whatsapp-icon-link" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><img src="/icons/whatsapp.svg" alt="" width="28" height="28">WhatsApp</a><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></div><span>© 2026 BoardGame B2B</span></footer>`;
}

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function renderGuideIndex(origin: string): string {
  const canonical = `${origin}/guides/`;
  const cards = GUIDES.map((guide) => `<article class="guide-card"><span class="kicker">Buying guide</span><h2><a href="/guides/${guide.slug}">${escapeHtml(guide.title)}</a></h2><p>${escapeHtml(guide.description)}</p><a class="text-link" href="/guides/${guide.slug}">Read the guide <span>↗</span></a></article>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Board Game Wholesale Buying Guides",
    url: canonical,
    description: "Practical guides for wholesale board game and card game buyers.",
    hasPart: GUIDES.map((guide) => ({ "@type": "Article", headline: guide.title, url: `${origin}/guides/${guide.slug}` })),
  };
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Board Game Wholesale Buying Guides | BoardGame B2B</title>
    <meta name="description" content="Practical guides for selecting wholesale board games and card games, comparing SKU options and preparing a clear B2B inquiry.">
    <meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="website"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="Board Game Wholesale Buying Guides"><meta property="og:description" content="Practical selection and inquiry guidance for B2B board game buyers."><meta property="og:url" content="${canonical}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-index"><span class="kicker">B2B sourcing knowledge</span><h1>Wholesale buying guides</h1><p class="guide-index-lead">Use these practical checklists to compare catalog options and send a more complete quotation request.</p><div class="guide-grid">${cards}</div><p class="guide-index-catalog"><a class="text-link" href="/#catalog">Browse the wholesale catalog <span>↗</span></a></p></main>${footer()}</body></html>`;
}

function renderCustomGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to discuss a custom card game printing and packaging quotation.")}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.updated,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "BoardGame B2B", url: `${origin}/` },
        publisher: { "@type": "Organization", name: "BoardGame B2B", url: `${origin}/`, logo: { "@type": "ImageObject", url: `${origin}/logo.svg` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: "Buying guides", item: `${origin}/guides/` },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
        ],
      },
    ],
  };
  const productRows = customExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.format)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Custom printing inquiry checklist</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Custom project preparation</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published September 23, 2026</time><span>8-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">A useful custom card game inquiry is not just a request for “a deck with my logo.” It is a compact project brief that helps a supplier understand what must be printed, packed and quoted. Preparing the content, product structure and destination details before the first message makes different quotation options easier to compare.</p>
          <aside class="guide-summary" aria-labelledby="customQuickChecklist"><h2 id="customQuickChecklist">Information to prepare first</h2><ol><li>Project purpose, audience and language.</li><li>Card count and any other required components.</li><li>Finished format and packaging direction.</li><li>Artwork status and one version-controlled file set.</li><li>Quantity options, destination and desired timing.</li></ol></aside>

          <h2>1. Define the product before discussing decoration</h2>
          <p>Begin with what the customer will receive and how the game will be used. State whether the project is a conversation deck, party game, educational card set, prompt deck or a game with additional components. Identify the intended audience, language and sales market. These details help keep content, packaging and quotation discussions attached to one clearly defined product.</p>
          <p>If there are multiple editions, describe them as separate SKUs. A language change, card-count change or different box should not be hidden inside a general phrase such as “three versions.” Give every version a short working name and list what changes.</p>

          <h2>2. Build a component list</h2>
          <p>Write a simple inventory of everything expected inside the finished package. For a card-only product this may begin with the number of cards and the package. For a broader game, list every additional component you want the supplier to review. Do not assume that an item visible in a reference photo will automatically be included in a quotation.</p>
          <p>Where a technical decision is not final, mark it as “to be confirmed” rather than inventing a specification. Ask the supplier to confirm available formats, materials, finishing options and any file templates required for the selected construction.</p>

          <h2>3. Describe packaging by function</h2>
          <p>Packaging has practical jobs: it contains the components, protects them during handling, presents the product and carries required buyer-supplied information. In the inquiry, explain whether the project needs a compact deck box, a larger game box or another direction. Add any inserts, instructions or labeling elements that must be considered.</p>
          <p>If you are using an existing product as a visual reference, link to the exact page and say which aspect is relevant—for example, the boxed presentation or the way several deck themes are organized. A reference is not a technical specification, so ask for the final construction and dimensions to be confirmed in the quotation process.</p>

          <h2>4. Prepare controlled artwork and content files</h2>
          <p>Keep one current file set with clear names and a version date. Separate card faces, card backs, packaging panels and instruction content so the supplier can identify each part. Include a written list of languages and editions, and check that the wording in the files matches the SKU names in the brief.</p>
          <p>Before production decisions, ask which file formats, color settings, bleed, safe area and image requirements apply to the confirmed format. These requirements depend on the production setup, so they should come from the supplier’s accepted template rather than a generic online template.</p>

          <h2>5. Use catalog products as format references</h2>
          <p>The following live catalog pages show different product and SKU structures. Their displayed prices apply to the listed catalog products; they are not custom-printing quotations. Use them to make your format discussion more concrete, then request confirmation for your own brief.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog reference</th><th>Displayed price</th><th>What the listing helps illustrate</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>Notice that some pages contain one SKU while others contain several named options. Your custom brief should be equally explicit: connect each edition to its own content, packaging direction and requested quantity.</p>

          <h2>6. Request quantities as scenarios</h2>
          <p>State the initial quantity you want quoted and, when useful, one or two comparison quantities. This gives the supplier a defined set of scenarios instead of an open-ended request for the “best price.” Keep quantities attached to each SKU when editions differ.</p>
          <p>The public catalog uses MOQ 1 and USD reference prices for existing listings. A custom project has its own requirements and must be confirmed by inquiry; do not assume that a catalog MOQ or displayed catalog price automatically applies to custom printing.</p>

          <h2>7. Include delivery information without guessing freight</h2>
          <p>Provide the destination country and postal code, plus any delivery deadline or planning window. If you need the quotation prepared under a particular shipping or commercial arrangement, ask the supplier to state what is included. Freight, packing and final terms should be confirmed rather than estimated from a product-page reference price.</p>

          <h2>8. Ask for a quotation that can be checked</h2>
          <p>A useful response should let you match each cost and condition to a named SKU. Ask the supplier to confirm the selected format, included components, packaging, quantity, artwork requirements, availability or production timing, freight basis and final commercial terms. If any point remains open, keep it visibly marked instead of treating it as approved.</p>
          <p>When comparing responses, use the same brief for every option. Changes to card count, packaging or delivery details can change the basis of a quotation, so record revisions and request an updated confirmation when the brief changes.</p>

          <section class="guide-cta" aria-labelledby="customGuideCta"><span class="kicker">Prepare your brief</span><h2 id="customGuideCta">Send one clear file set and one SKU-by-SKU request.</h2><p>Include your product concept, component list, packaging direction, artwork status, quantities and destination. The sales team can then confirm which details are needed for a formal quotation.</p><div><a class="inquiry-button" href="/#contact">Start an inquiry <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Custom%20card%20game%20printing%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

export function renderGuidePage(guide: Guide, origin: string): string {
  if (guide.slug === "custom-card-game-printing-packaging-inquiry-checklist") return renderCustomGuidePage(guide, origin);
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like a quotation for wholesale party card games.")}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.updated,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "BoardGame B2B", url: `${origin}/` },
        publisher: { "@type": "Organization", name: "BoardGame B2B", url: `${origin}/`, logo: { "@type": "ImageObject", url: `${origin}/logo.svg` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: "Buying guides", item: `${origin}/guides/` },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
        ],
      },
    ],
  };
  const productRows = examples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.use)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Party card game checklist</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Wholesale buyer checklist</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Updated September 22, 2026</time><span>7-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">Party card games can look similar in a catalog while serving very different buyers. A drinking game, a couples conversation deck and a music challenge should not be treated as interchangeable products. The quickest way to build a useful shortlist is to start with the customer and occasion, then confirm the exact edition, SKU and delivered requirements before requesting a quotation.</p>
          <aside class="guide-summary" aria-labelledby="quickChecklist"><h2 id="quickChecklist">The short checklist</h2><ol><li>Define the intended audience and occasion.</li><li>Confirm the language and edition shown on the selected SKU.</li><li>Compare content format, price and assortment role.</li><li>Record the exact product URL and SKU name.</li><li>Send quantity, destination and packaging requirements together.</li></ol></aside>

          <h2>1. Start with the buyer and occasion</h2>
          <p>A useful assortment begins with a specific use case. Decide whether you are sourcing for adult parties, couples, family gatherings, music-focused events or conversation-led play. This keeps visually attractive products from entering a collection where the theme or content does not fit the intended customer.</p>
          <p>Also consider how the product will sit beside the rest of your range. A broad assortment may benefit from several distinct formats, while a tightly focused store may need one clear hero theme with a smaller number of supporting choices.</p>

          <h2>2. Match the exact language and edition</h2>
          <p>Language is part of the product, not a minor variation. Read the full catalog title and SKU name, and check the product images before adding an item to your shortlist. If an edition or language is important, repeat it in your inquiry. Do not assume that two boxes with similar artwork contain the same text or prompts.</p>
          <p>For mixed-language markets, list each acceptable language separately. That gives the sales team a concrete basis for checking the requested option rather than guessing from a general product family.</p>

          <h2>3. Use the displayed price as a comparison point</h2>
          <p>BoardGame B2B shows USD wholesale reference prices and MOQ 1 for catalog products. The reference price helps buyers compare options from a single unit, but this is a B2B inquiry site rather than an online checkout. Packaging, freight, availability and final commercial terms are confirmed separately.</p>
          <p>When comparing products, keep the product and SKU attached to every price. A different SKU can have a different reference price, so copying only a parent product title into a buying sheet can create confusion later.</p>

          <h2>4. Compare real catalog options</h2>
          <p>The examples below show how different party-card formats can fill different positions in a wholesale assortment. Prices are the current displayed USD reference prices for the linked catalog listings; open the product page to review its available SKU options.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog product</th><th>Reference price</th><th>Possible assortment role</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>A lower displayed price does not by itself make one product a better fit. Theme, audience, language and the exact selected option matter to the buying decision. Use the table to create a shortlist, not as a substitute for a quotation.</p>

          <h2>5. Keep the SKU attached to the product</h2>
          <p>Each shortlisted line should contain the product title, canonical product URL, selected SKU name, displayed reference price and intended quantity. This is especially important when a listing contains multiple box styles, editions or language options. A simple one-line record prevents the image, title and price from being separated during internal review.</p>
          <p>If the correct SKU is unclear, include the product URL and describe the visible option you want. The sales team can then confirm the closest catalog match before final pricing.</p>

          <h2>6. Prepare one complete inquiry</h2>
          <p>A clear first message reduces follow-up questions. Include:</p>
          <ul><li>the product URL and exact SKU name for every shortlisted item;</li><li>the quantity required for each SKU;</li><li>the destination country and postal code;</li><li>any packaging or labeling requirements you need confirmed;</li><li>your desired receiving date or planning window.</li></ul>
          <p>Ask the quotation to confirm availability, final unit pricing, packaging, freight and applicable commercial terms. If your assortment is still exploratory, MOQ 1 lets you request a small starting quantity, but the same identifying details are still useful.</p>

          <h2>7. Review the quotation against the original brief</h2>
          <p>Before proceeding, compare the confirmed SKU and language with your shortlist. Check that quantities, destination and packaging requirements match what you sent. Keep displayed website prices separate from the final quotation so your records show which figures were references and which were confirmed terms.</p>

          <section class="guide-cta" aria-labelledby="guideCta"><span class="kicker">Ready to shortlist?</span><h2 id="guideCta">Browse party card games, then send the exact options you need.</h2><p>Start with the searchable catalog. When you are ready, share each product link, SKU, quantity and destination for a wholesale quotation.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Wholesale%20party%20card%20game%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

export function renderGuideMarkdown(guide: Guide, origin: string): string {
  if (guide.slug === "custom-card-game-printing-packaging-inquiry-checklist") {
    const products = customExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.format}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Information to prepare\n\n1. Project purpose, audience and language.\n2. Card count and any other required components.\n3. Finished format and packaging direction.\n4. Artwork status and one version-controlled file set.\n5. Quantity options, destination and desired timing.\n\n## Catalog format references\n\n${products}\n\nDisplayed prices apply to the linked catalog products and are not custom-printing quotations. Existing catalog listings show MOQ 1 and USD reference prices; custom project requirements, pricing, packaging, freight and final terms must be confirmed by inquiry.\n\n## Inquiry details\n\nSend the working name of each SKU, its component list, language, packaging direction, artwork status, requested quantities, destination country and postal code, and desired timing. Ask the supplier to confirm accepted artwork requirements and all final commercial terms.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  const products = examples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.use}`).join("\n");
  return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nUpdated: ${guide.updated}\n\n${guide.description}\n\n## Buyer checklist\n\n1. Define the intended audience and occasion.\n2. Confirm the language and edition shown on the selected SKU.\n3. Compare content format, price and assortment role.\n4. Record the exact product URL and SKU name.\n5. Send quantity, destination and packaging requirements together.\n\n## Catalog examples\n\n${products}\n\nDisplayed prices are USD wholesale reference prices. MOQ is 1. BoardGame B2B is an inquiry site, not an online checkout; availability, packaging, freight and final terms are confirmed separately.\n\n## Prepare an inquiry\n\nInclude each product URL, exact SKU name, quantity, destination country and postal code, packaging requirements, and desired receiving date or planning window.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
}
