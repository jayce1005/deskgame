export interface Guide {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "base-game-expansion-bundle-b2b-sku-guide",
    title: "Base Game, Expansion or Bundle? A B2B Board Game SKU Verification Guide",
    description: "A practical guide to identifying base games, expansions, accessories and bundles before requesting a wholesale board game quotation.",
    published: "2026-10-09",
    updated: "2026-10-09",
  },
  {
    slug: "wholesale-family-board-games-card-games-assortment-guide",
    title: "Wholesale Family Board Games & Card Games: A Buyer’s Assortment Guide",
    description: "A practical B2B guide to building a family game assortment across card games, board games, language options, price points and exact catalog SKUs.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
  {
    slug: "board-game-supplier-faq-before-ordering",
    title: "Board Game Supplier FAQ: 9 Questions B2B Buyers Should Ask Before Ordering",
    description: "A practical FAQ for confirming products, SKUs, language, samples, packaging, timing, freight and quotation terms with a board game supplier.",
    published: "2026-10-02",
    updated: "2026-10-02",
  },
  {
    slug: "wholesale-two-player-board-games-card-games-guide",
    title: "Wholesale Two-Player Board Games & Card Games: A Buyer’s Category Guide",
    description: "A practical B2B guide to comparing two-player board games and card games by play style, language, edition, SKU and wholesale reference price.",
    published: "2026-09-30",
    updated: "2026-09-30",
  },
  {
    slug: "board-game-lead-time-shipping-inquiry-checklist",
    title: "Board Game Lead Time & Shipping: A B2B Inquiry Checklist",
    description: "A practical checklist for giving suppliers the product, quantity, destination and timing details needed to confirm board game availability, lead time and freight terms.",
    published: "2026-09-29",
    updated: "2026-09-29",
  },
  {
    slug: "moq-1-board-game-sample-order-plan",
    title: "MOQ 1 Board Game Sourcing: A Sample Order Plan for B2B Buyers",
    description: "A practical plan for using MOQ 1 to compare board game and card game samples, document SKU findings and prepare a better follow-up quotation request.",
    published: "2026-09-25",
    updated: "2026-09-25",
  },
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

const sampleOrderExamples = [
  {
    title: "Digital Number Tile Family Board Game",
    slug: "digital-number-tile-family-board-game-745351",
    price: "USD 6.51",
    review: "A family board-game format for reviewing a component-based product.",
  },
  {
    title: "Guess in 10 Animal Planet Kids' Educational Card Game",
    slug: "guess-in-10-animal-planet-kids-educational-card-game-125219",
    price: "USD 2.24",
    review: "A children’s educational card-game format with a named catalog SKU.",
  },
  {
    title: "Tag Team English Two-Player Fighting Card Game",
    slug: "tag-team-english-two-player-fighting-card-game-740413",
    price: "USD 7.45",
    review: "An English two-player card-game format for checking audience and language fit.",
  },
  {
    title: "Mindful Talk for Kids Parent-Child Conversation Cards",
    slug: "mindful-talk-for-kids-parent-child-conversation-cards-124559",
    price: "USD 3.73",
    review: "A parent-child conversation-card format for comparing a prompt-led deck.",
  },
  {
    title: "Casting Shadows English Strategy Board Game and Expansion",
    slug: "casting-shadows-english-strategy-board-game-and-expansion-744615",
    price: "USD 14.90",
    review: "A two-SKU listing that separates the English base game from its English expansion.",
  },
];

const shippingInquiryExamples = [
  {
    title: "So... Cards English Conversation Starter Deck",
    slug: "so-cards-english-conversation-starter-deck-739639",
    price: "USD 1.49",
    planning: "A single-SKU English card deck for a straightforward product-line record.",
  },
  {
    title: "Captain Flip Bilingual Family Board Game",
    slug: "captain-flip-bilingual-family-board-game-727561",
    price: "USD 5.13",
    planning: "A bilingual board-game listing with two named SKUs that must be separated in an inquiry.",
  },
  {
    title: "Sewing Journal and Quilting Project Cards – 3 Options",
    slug: "sewing-journal-and-quilting-project-cards-3-options-570163",
    price: "USD 4.10",
    planning: "A three-option listing that illustrates why quantities belong beside exact SKU names.",
  },
  {
    title: "Patchwork Christmas Edition Two-Player Board Game",
    slug: "patchwork-christmas-edition-two-player-board-game-737871",
    price: "USD 4.48",
    planning: "A seasonal edition where the requested receiving date should be stated clearly.",
  },
  {
    title: "Sail English Two-Player Cooperative Card Game with Expansion",
    slug: "sail-english-two-player-cooperative-card-game-with-expansion-732493",
    price: "USD 3.73",
    planning: "A listing whose title identifies an included expansion, useful for confirming package scope.",
  },
];

const twoPlayerExamples = [
  {
    title: "Twilight Struggle English Two-Player Strategy Board Game",
    slug: "twilight-struggle-english-two-player-strategy-board-game-735415",
    price: "USD 11.18",
    role: "An English strategy board-game reference for a longer-form category position.",
  },
  {
    title: "Kimono Memories Bilingual Two-Player Card Game",
    slug: "kimono-memories-bilingual-two-player-card-game-736023",
    price: "USD 4.10",
    role: "A bilingual card-game option for buyers comparing language presentation.",
  },
  {
    title: "Sky Team English Two-Player Cooperative Board Game",
    slug: "sky-team-english-two-player-cooperative-board-game-727073",
    price: "USD 9.31",
    role: "An English cooperative board game for a teamwork-led assortment position.",
  },
  {
    title: "Agent Avenue Bilingual Two-Player Deduction Game",
    slug: "agent-avenue-bilingual-two-player-deduction-game-726175",
    price: "USD 2.33",
    role: "A bilingual deduction game for a compact comparison option.",
  },
  {
    title: "The Fox in the Forest Two-Player Card Game",
    slug: "the-fox-in-the-forest-two-player-card-game-5d47590bc2bb378249ea",
    price: "USD 5.60",
    role: "A two-player card-game listing for a card-focused assortment position.",
  },
];

const supplierFaqExamples = [
  {
    title: "7 Wonders Duel English Board Game and Expansions",
    slug: "7-wonders-duel-english-board-game-and-expansions-734039",
    price: "USD 13.04",
    lesson: "A three-SKU page where the English base game and named English expansions must be requested separately.",
  },
  {
    title: "Dice Miner English Board Game and Expansion",
    slug: "dice-miner-english-board-game-and-expansion-730281",
    price: "USD 10.05",
    lesson: "A two-SKU listing that separates the English base game from its expansion.",
  },
  {
    title: "Dixit English Board Game and Expansion Collection",
    slug: "dixit-english-board-game-and-expansion-collection-727871",
    price: "USD 6.89",
    lesson: "A multi-option page where the exact base game or numbered expansion belongs in the inquiry.",
  },
  {
    title: "Cabo Bilingual Family Card Game",
    slug: "cabo-bilingual-family-card-game-728141",
    price: "USD 2.05",
    lesson: "A bilingual card-game page with two named editions that should remain distinct in a buying sheet.",
  },
  {
    title: "Heat Pedal to the Metal English Racing Game Collection",
    slug: "heat-pedal-to-the-metal-english-racing-game-collection-725691",
    price: "USD 22.35",
    lesson: "A five-option English collection that illustrates why package scope must be confirmed for every line.",
  },
];

const familyGameExamples = [
  {
    title: "Slapburger Fast-Paced Family Card Game",
    slug: "slapburger-fast-paced-family-card-game-124615",
    price: "USD 2.24",
    role: "A single-SKU family card game for a compact, card-led assortment position.",
  },
  {
    title: "Happy Salmon English Family Party Card Game",
    slug: "happy-salmon-english-family-party-card-game-120901",
    price: "USD 3.70",
    role: "An English family party card game for a social-play category position.",
  },
  {
    title: "Tiki Topple Family Strategy Board Game",
    slug: "tiki-topple-family-strategy-board-game-742287",
    price: "USD 2.61",
    role: "A family strategy board-game reference for comparing a board format with card-only options.",
  },
  {
    title: "Dragonwood English Family Strategy Card Game",
    slug: "dragonwood-english-family-strategy-card-game-733429",
    price: "USD 4.48",
    role: "An English strategy card game for a more strategy-led family category position.",
  },
  {
    title: "Wandering Towers English Family Strategy Board Game",
    slug: "wandering-towers-english-family-strategy-board-game-727587",
    price: "USD 11.18",
    role: "An English family strategy board game at a higher displayed reference price in this comparison set.",
  },
];

const gameScopeExamples = [
  {
    title: "Here to Slay Base Game – English Edition",
    slug: "here-to-slay-base-game-english-edition-122673",
    price: "USD 3.73",
    scope: "A single-SKU English listing explicitly identified as a base game.",
  },
  {
    title: "Splendor The Sun Never Sets Strategy Game Expansion",
    slug: "splendor-the-sun-never-sets-strategy-game-expansion-742729",
    price: "USD 11.18",
    scope: "A single-SKU listing explicitly identified as an expansion rather than a base game.",
  },
  {
    title: "Azul Joker Tiles Acrylic Game Expansion",
    slug: "azul-joker-tiles-acrylic-game-expansion-739427",
    price: "USD 2.98",
    scope: "An acrylic-tile expansion listing whose package scope should remain attached to its exact title.",
  },
  {
    title: "Project L Bilingual Puzzle Board Game with Expansions",
    slug: "project-l-bilingual-puzzle-board-game-with-expansions-733789",
    price: "USD 35.38",
    scope: "A bilingual listing whose title states that expansions are included with the board game.",
  },
  {
    title: "Carcassonne 3.0 English Board Game with Mini Expansions",
    slug: "carcassonne-3-0-english-board-game-with-mini-expansions-725505",
    price: "USD 6.51",
    scope: "An English board-game listing whose title identifies included mini expansions.",
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

function renderGameScopeGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to confirm whether selected SKUs are base games, expansions or bundles.")}`;
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
  const productRows = gameScopeExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.scope)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Game scope and SKU verification</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Product scope checklist</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published October 9, 2026</time><span>7-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">A base game, an expansion and a bundle can share artwork, a product family name or a catalog page while representing different buying lines. Before comparing wholesale prices, identify exactly what the selected SKU contains and whether it is intended to stand alone. This prevents a visually similar option from being recorded as the wrong product scope.</p>
          <aside class="guide-summary" aria-labelledby="gameScopeChecklist"><h2 id="gameScopeChecklist">Verify these five points</h2><ol><li>Exact product URL and SKU name.</li><li>Base game, expansion, accessory or bundle status.</li><li>Language and edition wording.</li><li>Included package scope.</li><li>Reference price, quantity and unresolved questions.</li></ol></aside>

          <h2>1. Treat product scope as a required field</h2>
          <p>Add a “product scope” column to the buying sheet and classify each line using the listing’s confirmed wording. Useful categories include base game, expansion, accessory and bundle. If the scope cannot be confirmed from the title, SKU and current images, mark it as an inquiry question.</p>
          <p>Do not let an internal shorthand replace the full name. A family name alone may not distinguish the complete game from an add-on or special package.</p>

          <h2>2. Keep the exact SKU attached to the page</h2>
          <p>Record the canonical product URL and full SKU name together. On a multi-option listing, each SKU can describe a different edition or package. The page title is useful context, but it may not be precise enough for the requested line.</p>
          <p>Copy the displayed price beside the same SKU. This reduces the risk of attaching the price of an expansion or accessory to a base game in a later spreadsheet.</p>

          <h2>3. Ask whether an expansion is usable on its own</h2>
          <p>An item labelled “expansion” should not automatically be treated as a complete game. Ask the supplier to confirm whether another product is required and identify the compatible base game when that matters to the buying decision.</p>
          <p>Do not infer compatibility only from similar branding or artwork. Keep the supplier’s confirmation with the exact SKU record and repeat the question when the edition changes.</p>

          <h2>4. Define what a bundle includes</h2>
          <p>Words such as “with expansions,” “complete,” “set” or “bundle” still require a checkable package description. Ask which named items or components are included in the selected SKU and whether the images show the same package currently being quoted.</p>
          <p>If the requested package differs from the standard listing, write the change separately. A custom combination should not inherit the displayed reference price or timing of the catalog SKU without confirmation.</p>

          <h2>5. Preserve language and edition wording</h2>
          <p>Language and edition belong in the same line as product scope. Repeat “English,” “bilingual,” a version number or other edition wording exactly as shown. Do not move scope information from one language edition to another unless the supplier confirms it.</p>

          <h2>6. Compare real catalog scope examples</h2>
          <p>The listings below illustrate how scope can be expressed in a title. Their displayed prices are USD wholesale references for the linked catalog SKUs, not proof that different products contain equivalent components.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog reference</th><th>Reference price</th><th>Scope indicated by the listing</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>Open each product page and keep the exact title and SKU in the comparison sheet. When a detail is important but not stated, ask for confirmation instead of filling the gap from another listing.</p>

          <h2>7. Use MOQ 1 to check the selected scope</h2>
          <p>BoardGame B2B lists MOQ 1 for public catalog products. A focused sample can help a buyer review the selected SKU, visible language and package presentation before planning a wider order. This is a B2B inquiry site rather than an online checkout, so availability, final pricing, freight and commercial terms are confirmed separately.</p>

          <h2>8. Send a scope-aware quotation request</h2>
          <p>For every line, send the canonical product URL, exact SKU name, requested quantity, language, edition and expected package scope. Add the destination country, city and postal code, packaging requirements, and desired receiving date or planning window.</p>
          <p>Ask the supplier to confirm whether the line is a base game, expansion, accessory or bundle; what it includes; whether another product is required; current availability; final unit price; freight basis; and applicable commercial terms. Keep that dated response with the same buying-sheet version.</p>

          <section class="guide-cta" aria-labelledby="gameScopeCta"><span class="kicker">Confirm the complete buying line</span><h2 id="gameScopeCta">Send exact SKU links and the scope you expect.</h2><p>The sales team can confirm whether each option is a base game, expansion or included bundle before preparing the quotation.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Base%20game%20and%20expansion%20SKU%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

function renderFamilyGameGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like a quotation for wholesale family games.")}`;
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
  const productRows = familyGameExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.role)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Family game assortment</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Family game category guide</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published October 8, 2026</time><span>7-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">“Family game” is a broad buying category rather than one product format. A useful wholesale assortment may include compact card games, social party formats and strategy board games, but every item still needs a clear category role, confirmed language, exact SKU and price record. This guide provides a practical way to build that mix without treating every family-labelled title as interchangeable.</p>
          <aside class="guide-summary" aria-labelledby="familyGameChecklist"><h2 id="familyGameChecklist">Build the assortment in five steps</h2><ol><li>Define the customer and shelf role.</li><li>Balance card, party and board-game formats.</li><li>Confirm language and exact SKU.</li><li>Compare reference prices within the same scope.</li><li>Evaluate a focused sample set before expanding.</li></ol></aside>

          <h2>1. Give every product a category role</h2>
          <p>Start by describing why each shortlisted item belongs in the range. One product may serve as a compact card option, another as a social-play choice and another as a strategy board game. These roles make the assortment easier to review than a long list built only around box artwork.</p>
          <p>Use the wording that is actually confirmed by the catalog title and SKU. If audience, rules, components or other important details are unclear, make them inquiry questions instead of adding assumptions to the buying sheet.</p>

          <h2>2. Compare product format before price</h2>
          <p>A card game and a boxed board game can occupy different positions even when both sit in the family category. Compare physical format, language wording, SKU scope and intended assortment role before using displayed price as the deciding factor.</p>
          <p>Keep board games and card games visible as separate columns or tags in the shortlist. That simple distinction helps buyers see whether the proposed range is concentrated in one format or intentionally varied.</p>

          <h2>3. Confirm language and edition</h2>
          <p>Language belongs in the product record. Repeat “English,” “bilingual” or other language wording exactly when it appears in the title or SKU, and check the current product images. Do not infer language from artwork or carry a language description from one edition to another.</p>
          <p>Record the canonical product URL and exact SKU name. If a page later contains more than one edition, keeping that identifying pair together prevents the title, image and price from being mixed during internal review.</p>

          <h2>4. Compare real family-game catalog references</h2>
          <p>The examples below show several possible positions within a family-game assortment. Prices are the current displayed USD wholesale references for the linked catalog SKUs. They do not include freight and are not final quotations.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog product</th><th>Reference price</th><th>Possible assortment role</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>The displayed price range in this small set should not be read as a quality ranking. The products differ in format and category role, so compare like with like and open each page to confirm the exact SKU.</p>

          <h2>5. Use MOQ 1 to evaluate a focused mix</h2>
          <p>BoardGame B2B lists MOQ 1 for public catalog products. A buyer can use a small initial quantity to compare selected formats, visible language, packaging and assortment fit before requesting a broader quotation. The site is for B2B inquiries rather than online checkout; availability, freight and final terms are confirmed separately.</p>
          <p>Choose samples that answer different questions. For example, compare one compact card format, one social-play format and one board-game format instead of ordering several products that fill the same role.</p>

          <h2>6. Keep a checkable comparison sheet</h2>
          <p>For every shortlisted line, record the full product title, canonical URL, exact SKU name, displayed reference price, desired quantity and intended assortment role. Add a question column for any language, package-scope or packaging detail that still needs confirmation.</p>
          <p>When the shortlist changes, update the sheet version and date. This prevents a later supplier reply from being matched to an earlier product mix.</p>

          <h2>7. Request the quotation SKU by SKU</h2>
          <p>Send the product URL, exact SKU name and quantity for each line. Include the destination country, city and postal code, any packaging or labeling requirements, and the desired receiving date or planning window.</p>
          <p>Ask the supplier to confirm current availability, final unit price, package scope, packaging, freight basis and applicable commercial terms. Keep the displayed website price separate from the final dated quotation in your records.</p>

          <section class="guide-cta" aria-labelledby="familyGameCta"><span class="kicker">Build a family-game shortlist</span><h2 id="familyGameCta">Send exact product and SKU links for a quotation.</h2><p>Share the role, quantity and destination for each selected item. The sales team can then confirm the current details.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Wholesale%20family%20game%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

function renderSupplierFaqPage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to confirm details for a board game wholesale inquiry.")}`;
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
  const productRows = supplierFaqExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.lesson)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Supplier FAQ</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Supplier cooperation FAQ</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published October 2, 2026</time><span>8-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">A productive supplier conversation starts with a request that both sides can check. Product family names, screenshots and target prices are useful context, but they do not identify the exact SKU, language, package scope or destination. These nine questions help B2B buyers turn an early shortlist into a quotation request with fewer hidden assumptions.</p>
          <aside class="guide-summary" aria-labelledby="supplierFaqSummary"><h2 id="supplierFaqSummary">Information to place at the top of the inquiry</h2><ol><li>Canonical product URL and exact SKU name.</li><li>Required quantity for each SKU.</li><li>Language, edition and package scope.</li><li>Destination country, city and postal code.</li><li>Packaging needs and requested receiving window.</li></ol></aside>

          <h2>1. Is this the exact product and SKU?</h2>
          <p>Ask the supplier to confirm the full product title and selected SKU for every line. A single product page can contain a base game, expansions, editions or several unrelated options. Copying only the page title can leave the requested item ambiguous.</p>
          <p>Use the canonical product URL rather than a screenshot alone. Keep the SKU name beside its quantity and displayed reference price so the identifying information does not separate during internal review.</p>

          <h2>2. Which language and edition will be supplied?</h2>
          <p>Repeat language and edition wording exactly as shown in the listing. “English,” “bilingual,” a year, a box style or an expansion name can identify a materially different catalog option. If the wording is not clear, ask for confirmation before treating the item as suitable for your market.</p>
          <p>Do not infer language from the front image. Request current product and SKU images when a visual check is important, and keep unresolved details marked as questions.</p>

          <h2>3. Does the SKU describe a base game, expansion or bundle?</h2>
          <p>A shared listing does not mean every SKU includes the same components. Ask the supplier to confirm whether the selected line is a base game, an expansion, an accessory or a bundle, and what package scope the quotation covers.</p>
          <p>This distinction also matters when comparing prices. A lower reference price for an expansion cannot be compared directly with a complete base game unless the scope is understood.</p>

          <h2>4. How should MOQ 1 be used?</h2>
          <p>BoardGame B2B lists MOQ 1 for public catalog products. Buyers can use one unit as a starting point for evaluating a selected SKU, visible language, packaging and assortment fit. This is a B2B inquiry site rather than an online checkout, so current availability, final pricing, freight and commercial terms are still confirmed by the sales team.</p>
          <p>Define what the sample should help you decide. Record observations against the exact SKU and use that record in the follow-up request.</p>

          <h2>5. What does the displayed price include?</h2>
          <p>The catalog displays USD wholesale reference prices for the linked products. Ask for the final unit price for the exact SKU and quantity, and keep the website reference separate from the supplier’s dated quotation.</p>
          <p>Do not assume the display includes freight, duties, taxes, special packaging or labeling. Ask the supplier to state what is included and excluded from the quotation.</p>

          <h2>6. What packaging or labeling must be confirmed?</h2>
          <p>Describe any required labels, outer-carton marks, inserts or other packaging changes before asking for final timing and price. A modified package should not be treated as identical to the standard catalog item.</p>
          <p>If artwork files are involved, ask which files and approvals are needed. Use clear version names so both sides discuss the same material.</p>

          <h2>7. What product examples show about SKU scope</h2>
          <p>The live pages below show why exact SKU wording belongs in every supplier conversation. Their prices are current USD wholesale references for the linked listings, not delivered costs or promises of availability.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog reference</th><th>Displayed price</th><th>Question the listing helps surface</th></tr></thead><tbody>${productRows}</tbody></table></div>

          <h2>8. Which timing milestone are we discussing?</h2>
          <p>Separate current availability, order preparation and transit information. State whether your date means goods ready, dispatched, received at a destination or available for a launch. When possible, provide a planning window and the latest useful receiving date.</p>
          <p>Ask for a dated response tied to the exact SKU, quantity, destination and packaging version. If those inputs change, request an updated confirmation.</p>

          <h2>9. Which destination and freight basis should be quoted?</h2>
          <p>Provide the destination country, city and postal code. If you need delivery to a named warehouse, port or other point, state it clearly. Ask what the proposed freight basis includes and excludes instead of assuming every local charge or service is covered.</p>
          <p>A useful final response should let you match each price and condition to a named SKU. Review product, language, package scope, quantity, unit price, packaging, freight basis and timing together before relying on the quotation.</p>

          <section class="guide-cta" aria-labelledby="supplierFaqCta"><span class="kicker">Prepare a checkable inquiry</span><h2 id="supplierFaqCta">Send one line for every exact SKU you need.</h2><p>Include quantities, destination, packaging questions and the receiving window. The sales team can then confirm the current quotation details.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Board%20game%20supplier%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

function renderTwoPlayerGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like a quotation for wholesale two-player games.")}`;
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
  const productRows = twoPlayerExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.role)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Two-player games</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Two-player category guide</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published September 30, 2026</time><span>7-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">Two-player games can support several different buying occasions: couples, friends, travel collections, gift assortments and dedicated strategy players. The player count alone does not make the products interchangeable. A useful B2B shortlist should connect the intended customer with the play style, language, edition, exact SKU and displayed reference price.</p>
          <aside class="guide-summary" aria-labelledby="twoPlayerChecklist"><h2 id="twoPlayerChecklist">Build the shortlist in five steps</h2><ol><li>Define the intended buyer and playing occasion.</li><li>Choose the play style and physical format.</li><li>Confirm language, edition and package scope.</li><li>Record the exact product URL, SKU and reference price.</li><li>Send quantities and delivery details in one inquiry.</li></ol></aside>

          <h2>1. Start with the buying occasion</h2>
          <p>Decide where the product belongs in your assortment before comparing boxes. A couples or gift collection may need an approachable format, while a specialist game range may need strategy-led options. A travel or compact-card section creates a different brief from a shelf position for boxed board games.</p>
          <p>Write one sentence describing the target customer and occasion. This makes it easier to reject products that match the player count but not the role you need them to fill.</p>

          <h2>2. Separate play style from product format</h2>
          <p>Two-player describes the audience size, not the experience. The catalog includes titles identified as cooperative, deduction, strategy and card-game formats. Compare those labels separately from physical format: a card game and a component-based board game may require different shelf space, packaging review and customer explanation.</p>
          <p>Use only information confirmed by the listing title, SKU and images when creating your first shortlist. If an important mechanic, component or rule detail is not clear, mark it as a question for the inquiry rather than filling the gap with an assumption.</p>

          <h2>3. Confirm language, edition and package scope</h2>
          <p>Language affects the product customers receive. Repeat “English” or “bilingual” wording exactly when it appears in the catalog title and SKU. Do not infer the language from artwork alone, and do not treat visually similar editions as the same product.</p>
          <p>Also check whether the requested line is a base game, an expansion or a special edition. Keep that wording attached to the SKU and ask for confirmation whenever the package scope is unclear.</p>

          <h2>4. Compare real two-player catalog references</h2>
          <p>These live catalog listings illustrate distinct positions within the two-player category. Prices shown are current USD wholesale reference prices for the linked items. They are not freight-inclusive or final quotation prices.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog product</th><th>Reference price</th><th>Category position</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>Price should stay attached to the exact SKU. A different language, edition or option can have a different reference price, so a parent title without its SKU is not enough for a reliable buying sheet.</p>

          <h2>5. Use MOQ 1 for focused evaluation</h2>
          <p>BoardGame B2B lists MOQ 1 for public catalog products. Buyers can use a small initial quantity to compare selected formats, check the visible language and packaging, and document questions before preparing a broader assortment. MOQ 1 does not turn the site into a retail checkout; availability, packaging, freight and final commercial terms are confirmed by inquiry.</p>
          <p>For each evaluation item, record the canonical product link, exact SKU name, displayed price and the decision it is meant to support. This keeps feedback tied to the correct product.</p>

          <h2>6. Send a SKU-by-SKU quotation request</h2>
          <p>Include the product URL, exact SKU name and quantity for every line. Add the destination country, city and postal code, any packaging or labeling requirements, and your desired receiving date or planning window. Ask the supplier to confirm availability, final unit price, package scope, freight basis and applicable commercial terms.</p>
          <p>Keep the website reference price separate from the final quotation in your records. If the selected edition, quantity or destination changes, request an updated confirmation instead of carrying the earlier figure forward.</p>

          <section class="guide-cta" aria-labelledby="twoPlayerCta"><span class="kicker">Build a two-player shortlist</span><h2 id="twoPlayerCta">Send exact product and SKU links for a quotation.</h2><p>Tell the sales team which options you need, the quantity for each SKU and the destination. The team can then confirm the current commercial details.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Wholesale%20two-player%20game%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

function renderShippingInquiryGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to confirm availability, lead time and freight for a board game inquiry.")}`;
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
  const productRows = shippingInquiryExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.planning)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">Lead time and shipping checklist</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Quotation and delivery planning</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published September 29, 2026</time><span>8-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">A supplier cannot confirm a useful board game timeline from a product name and country alone. Availability, preparation time and freight depend on the exact SKU, quantity, package scope, destination and the meaning of your requested date. A complete first inquiry gives both sides a shared basis for planning without turning an estimate into an unsupported promise.</p>
          <aside class="guide-summary" aria-labelledby="shippingQuickChecklist"><h2 id="shippingQuickChecklist">Send these details together</h2><ol><li>Exact product URL and SKU name.</li><li>Quantity for every SKU.</li><li>Destination country, city and postal code.</li><li>Packaging or labeling requirements.</li><li>Your requested receiving date or planning window.</li></ol></aside>

          <h2>1. Separate availability, preparation and transit</h2>
          <p>“How long does shipping take?” combines several different questions. First confirm whether the exact SKU and quantity are available. Then ask when the order could be ready under the confirmed packaging requirements. Finally, request the freight option and estimated transit information for the stated destination.</p>
          <p>Keeping these stages separate makes revisions easier to understand. A change in SKU, quantity, packaging or destination can affect one or more stages, so the earlier answer should not automatically be applied to the new request.</p>

          <h2>2. Identify every line by product and SKU</h2>
          <p>Copy the canonical product URL, full title and selected SKU name into the inquiry. For a multi-SKU listing, place the quantity beside each option. Do not send only a screenshot or a shortened name, because similar artwork or related editions may not describe the same item.</p>
          <p>Repeat language, edition and expansion wording exactly as shown. If a listing distinguishes a base game, expansion, seasonal edition or bilingual option, keep that distinction in the order plan and ask the supplier to confirm the package scope.</p>

          <h2>3. State the destination precisely</h2>
          <p>Country alone is not enough for a useful freight discussion. Provide the destination city and postal code, and explain whether the address is commercial or residential if that information is relevant to the requested quotation. If you require delivery to a warehouse, port or other named point, state it clearly and ask what the quoted freight basis includes.</p>
          <p>Do not assume that a freight figure includes duties, taxes, local handling or every delivery service. Ask the supplier to identify inclusions and exclusions in plain language. Legal and import obligations should be confirmed with the appropriate qualified parties for the destination market.</p>

          <h2>4. Define the date you actually mean</h2>
          <p>A buyer’s “deadline” may mean the date goods must be ready, leave the origin, reach a destination facility or become available for a launch. Write the specific milestone and date. When the schedule is flexible, provide a planning window instead of a single hard date.</p>
          <p>For seasonal or event-led products, also state the latest useful receiving date. This helps the supplier evaluate the request against availability and freight choices without assuming a timetable that was never provided.</p>

          <h2>5. Use live catalog listings as planning examples</h2>
          <p>The listings below illustrate why timeline questions should stay attached to exact SKUs and package descriptions. Their displayed prices are USD wholesale references for the linked catalog items, not freight quotes or delivered costs.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog reference</th><th>Displayed price</th><th>Planning detail to preserve</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>The examples range from a single card-deck SKU to multi-option listings and a seasonal edition. The right comparison is not which item is “fastest”; it is whether the inquiry contains enough detail for the supplier to confirm the requested item and timing.</p>

          <h2>6. Keep packaging changes visible</h2>
          <p>If you need labels, outer-carton marks, inserts or another packaging change, include that requirement before requesting the timeline. Do not treat a modified package as identical to the standard catalog item. Ask what files, approvals or confirmations are needed and whether the request changes the preparation schedule.</p>
          <p>Use version-controlled artwork names when files are involved. A clear file version and approval status help prevent the timeline from being discussed against an obsolete package.</p>

          <h2>7. Ask for a dated, conditional response</h2>
          <p>Request confirmation for the exact inquiry version and note the date of the response. A useful reply should identify the SKU and quantity, current availability, any preparation assumptions, the freight basis and the timing estimate associated with those details.</p>
          <p>Treat timing as an estimate until the supplier confirms the final commercial terms. If the order details change or time passes, ask for an updated confirmation rather than relying on an older message.</p>

          <h2>8. Keep website prices separate from delivered cost</h2>
          <p>BoardGame B2B displays MOQ 1 and USD wholesale reference prices for catalog products. It is a B2B inquiry site, not an online checkout. The displayed product price does not by itself include packaging changes, freight or final commercial terms.</p>
          <p>In your comparison sheet, keep columns for the displayed reference price, confirmed product quotation, freight basis and other confirmed amounts. This preserves the source of each figure and prevents a product-page price from being mistaken for a delivered total.</p>

          <section class="guide-cta" aria-labelledby="shippingGuideCta"><span class="kicker">Request a usable timeline</span><h2 id="shippingGuideCta">Send the SKU, quantity, destination and date in one message.</h2><p>Add packaging requirements and ask the wholesale team to confirm availability, preparation assumptions, freight basis and final terms for that exact request.</p><div><a class="inquiry-button" href="/#contact">Start an inquiry <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=Board%20game%20lead%20time%20and%20shipping%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
}

function renderSampleOrderGuidePage(guide: Guide, origin: string): string {
  const canonical = `${origin}/guides/${guide.slug}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to prepare an MOQ 1 board game sample inquiry.")}`;
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
  const productRows = sampleOrderExamples.map((item) => `<tr><th scope="row"><a href="/products/${item.slug}">${escapeHtml(item.title)}</a></th><td>${item.price}</td><td>${escapeHtml(item.review)}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(guide.title)} | BoardGame B2B</title>
    <meta name="description" content="${escapeHtml(guide.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${canonical}.md"><link rel="describedby" href="${origin}/llms.txt">
    <meta property="og:type" content="article"><meta property="og:site_name" content="BoardGame B2B"><meta property="og:title" content="${escapeHtml(guide.title)}"><meta property="og:description" content="${escapeHtml(guide.description)}"><meta property="og:url" content="${canonical}"><meta property="article:published_time" content="${guide.published}"><meta property="article:modified_time" content="${guide.updated}">
    <meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(guide.title)}"><meta name="twitter:description" content="${escapeHtml(guide.description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${jsonLd(schema)}</script></head>
    <body class="product-page-body">${header()}<main class="guide-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/">Buying guides</a><span>/</span><span aria-current="page">MOQ 1 sample order plan</span></nav>
      <article class="guide-article">
        <header class="guide-hero"><span class="kicker">Low-quantity product review</span><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><div class="guide-meta"><time datetime="${guide.updated}">Published September 25, 2026</time><span>8-minute read</span></div></header>
        <div class="guide-body">
          <p class="guide-intro">MOQ 1 gives a wholesale buyer a practical way to examine individual catalog products before planning a larger assortment. The value of a sample order, however, depends on how it is designed and recorded. A random group of attractive games produces less useful information than a small set chosen to answer specific buying questions.</p>
          <aside class="guide-summary" aria-labelledby="sampleQuickChecklist"><h2 id="sampleQuickChecklist">A useful sample plan</h2><ol><li>Write the decision each sample must support.</li><li>Select exact product and SKU links.</li><li>Compare different formats without mixing the criteria.</li><li>Record language, packaging, components and displayed price.</li><li>Use the findings in a SKU-by-SKU follow-up inquiry.</li></ol></aside>

          <h2>1. Decide what the sample order must teach you</h2>
          <p>Start with a short list of questions. You may need to compare a card-only deck with a component-based board game, review the difference between a base game and an expansion, check whether an English edition fits your market, or examine how a children’s product differs from an adult product. Every sample should have a reason for being in the order.</p>
          <p>This prevents the review from becoming a simple preference test. The objective is to collect facts that help a buyer decide which exact SKUs deserve a quotation for the next quantity.</p>

          <h2>2. Select exact SKUs, not broad product ideas</h2>
          <p>Record the canonical product URL, full product title and chosen SKU name. If one listing contains several SKUs, treat each option as a separate line. A base game and an expansion, for example, should not be merged because their roles in an assortment are different even when they share a product page.</p>
          <p>Language and edition wording should be copied exactly from the catalog. Do not shorten a title in a way that removes “English,” “bilingual,” “kids,” “expansion” or another detail that changes the buyer’s interpretation.</p>

          <h2>3. Build a balanced review set</h2>
          <p>A balanced set does not need to be large. It needs enough contrast to answer your questions. One approach is to select a family game, an educational card game, a two-player title, a conversation deck and a listing with more than one SKU. This creates a useful comparison across audience, play format and product structure.</p>
          <p>Keep category expectations separate. A compact prompt deck and a component-based strategy game should not be judged by the same packaging or displayed-price benchmark. Compare each sample with the role you want it to fill.</p>

          <h2>4. Review current catalog examples</h2>
          <p>The following live listings illustrate a varied sample set. Prices are the current USD wholesale reference prices displayed for these catalog products. They are not delivered prices or final quotation terms.</p>
          <div class="guide-table-wrap"><table><thead><tr><th>Catalog sample</th><th>Displayed price</th><th>What it can help review</th></tr></thead><tbody>${productRows}</tbody></table></div>
          <p>The purpose of this table is not to recommend one product over another. It shows how a buyer can give each sample a defined review task and preserve the link between the product, SKU and reference price.</p>

          <h2>5. Use one inspection sheet for every sample</h2>
          <p>Create the same record for each item so observations remain comparable. Include the product and SKU names, language or edition, package condition on arrival, visible components, printed content, reference price captured from the site and any questions that need supplier confirmation.</p>
          <p>Photographing the received item beside its SKU record can reduce mix-ups when several visually similar products are reviewed at once. Keep subjective reactions—such as audience appeal—separate from observable details and unanswered commercial questions.</p>

          <h2>6. Understand what MOQ 1 does and does not mean</h2>
          <p>BoardGame B2B states MOQ 1 for the products in its public catalog, with USD wholesale reference pricing available from a single unit. The site is for B2B inquiries, not online checkout. Availability, packaging, freight and final terms are confirmed separately.</p>
          <p>MOQ 1 makes a small starting selection possible; it does not make every cost or condition identical at every quantity. Use the displayed price for initial comparison, then request confirmation for the exact SKUs, quantities and destination you plan to buy.</p>

          <h2>7. Turn inspection notes into a follow-up quotation</h2>
          <p>After review, divide samples into three groups: proceed, hold for clarification and remove from the shortlist. For each “proceed” item, send the product URL, exact SKU name and intended quantity. Add the destination country and postal code, packaging requirements and desired receiving date or planning window.</p>
          <p>For items needing clarification, ask a specific question tied to the SKU. Avoid a general request such as “send more information.” A question about edition, included components, packaging or availability is easier to confirm and keep in the final quotation record.</p>

          <h2>8. Preserve the decision trail</h2>
          <p>Keep the sample inspection sheet with the supplier’s confirmed response. Separate the website reference price from the final quotation and note the date each was recorded. If you later change the SKU, quantity, packaging request or destination, request an updated confirmation rather than applying an old figure to a new requirement.</p>

          <section class="guide-cta" aria-labelledby="sampleGuideCta"><span class="kicker">Start with a defined review</span><h2 id="sampleGuideCta">Choose the questions first, then choose the samples.</h2><p>Send the exact product links and SKU names, quantity for each item, destination and any packaging questions. The wholesale team can confirm availability, freight and final terms.</p><div><a class="inquiry-button" href="/#catalog">Browse the catalog <span>↗</span></a><a class="whatsapp-button" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div><p class="guide-contact">Email: <a href="mailto:${CONTACT_EMAIL}?subject=MOQ%201%20board%20game%20sample%20inquiry">${CONTACT_EMAIL}</a></p></section>
        </div>
      </article>
      <nav class="guide-more" aria-label="More buying resources"><a href="/guides/">All buying guides</a><a href="/catalog/">Text product directory</a></nav>
    </main>${footer()}</body></html>`;
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
  if (guide.slug === "base-game-expansion-bundle-b2b-sku-guide") return renderGameScopeGuidePage(guide, origin);
  if (guide.slug === "wholesale-family-board-games-card-games-assortment-guide") return renderFamilyGameGuidePage(guide, origin);
  if (guide.slug === "board-game-supplier-faq-before-ordering") return renderSupplierFaqPage(guide, origin);
  if (guide.slug === "wholesale-two-player-board-games-card-games-guide") return renderTwoPlayerGuidePage(guide, origin);
  if (guide.slug === "board-game-lead-time-shipping-inquiry-checklist") return renderShippingInquiryGuidePage(guide, origin);
  if (guide.slug === "moq-1-board-game-sample-order-plan") return renderSampleOrderGuidePage(guide, origin);
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
  if (guide.slug === "base-game-expansion-bundle-b2b-sku-guide") {
    const products = gameScopeExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.scope}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Product scope checklist\n\n1. Record the exact product URL and SKU name.\n2. Classify the line as a base game, expansion, accessory or bundle.\n3. Preserve language and edition wording.\n4. Confirm what the selected package includes.\n5. Keep reference price, quantity and unresolved questions together.\n\n## Catalog references\n\n${products}\n\nDisplayed prices are USD wholesale references for the linked catalog products. BoardGame B2B lists MOQ 1 and is a B2B inquiry site, not an online checkout. Availability, final package scope, compatibility, packaging, freight and commercial terms are confirmed separately.\n\n## Quotation request\n\nSend each canonical product URL, exact SKU name, quantity, language, edition and expected package scope, plus the destination country, city and postal code, packaging requirements, and requested receiving window. Ask whether an expansion requires another product and request a dated response for the exact inquiry version.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "wholesale-family-board-games-card-games-assortment-guide") {
    const products = familyGameExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.role}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Family game assortment checklist\n\n1. Define the customer and shelf role.\n2. Balance card, party and board-game formats.\n3. Confirm language and exact SKU.\n4. Compare reference prices within the same product scope.\n5. Evaluate a focused sample set before expanding.\n\n## Catalog references\n\n${products}\n\nDisplayed prices are USD wholesale references for the linked catalog products. BoardGame B2B lists MOQ 1 and is a B2B inquiry site, not an online checkout. Availability, packaging, freight and final commercial terms are confirmed separately.\n\n## Quotation request\n\nSend each canonical product URL, exact SKU name and quantity, plus the intended assortment role, destination country, city and postal code, packaging requirements, and requested receiving window. Keep the website reference price separate from the final dated quotation.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "board-game-supplier-faq-before-ordering") {
    const products = supplierFaqExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.lesson}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Nine supplier questions\n\n1. Is this the exact product and SKU?\n2. Which language and edition will be supplied?\n3. Is the SKU a base game, expansion, accessory or bundle?\n4. How should MOQ 1 be used for evaluation?\n5. What does the displayed reference price include?\n6. What packaging or labeling must be confirmed?\n7. Which files or approvals are needed?\n8. Which timing milestone are we discussing?\n9. Which destination and freight basis should be quoted?\n\n## Catalog references\n\n${products}\n\nDisplayed prices are USD wholesale references for the linked catalog products. BoardGame B2B lists MOQ 1 and is a B2B inquiry site, not an online checkout. Availability, final unit pricing, package scope, packaging, freight and commercial terms are confirmed separately.\n\n## Inquiry details\n\nSend every canonical product URL, exact SKU name and quantity, plus language, edition, package scope, destination country, city and postal code, packaging requirements, and requested receiving window. Ask for a dated response tied to that exact inquiry version.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "wholesale-two-player-board-games-card-games-guide") {
    const products = twoPlayerExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.role}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Two-player category checklist\n\n1. Define the intended buyer and playing occasion.\n2. Choose the play style and physical format.\n3. Confirm language, edition and package scope.\n4. Record the exact product URL, SKU and reference price.\n5. Send quantities and delivery details in one inquiry.\n\n## Catalog references\n\n${products}\n\nDisplayed prices are USD wholesale references for the linked catalog products. BoardGame B2B lists MOQ 1 and is a B2B inquiry site, not an online checkout. Availability, packaging, freight and final terms are confirmed separately.\n\n## Quotation request\n\nSend each product URL, exact SKU name and quantity, plus the destination country, city and postal code, packaging requirements, and requested receiving date or planning window. Ask the supplier to confirm availability, final unit price, package scope, freight basis and applicable commercial terms.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "board-game-lead-time-shipping-inquiry-checklist") {
    const products = shippingInquiryExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.planning}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Details to send together\n\n1. Exact product URL and SKU name.\n2. Quantity for every SKU.\n3. Destination country, city and postal code.\n4. Packaging or labeling requirements.\n5. Requested receiving date or planning window.\n\n## Catalog planning references\n\n${products}\n\nDisplayed prices are USD wholesale references for the linked catalog products. They are not freight quotes or delivered costs. BoardGame B2B is a B2B inquiry site with MOQ 1; availability, preparation assumptions, packaging, freight and final terms are confirmed separately.\n\n## Timeline request\n\nAsk the supplier to separate current availability, order preparation and transit information. State the milestone your date refers to and request a dated response for the exact SKU, quantity, destination and packaging version.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "moq-1-board-game-sample-order-plan") {
    const products = sampleOrderExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.review}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Sample order plan\n\n1. Write the decision each sample must support.\n2. Select exact product and SKU links.\n3. Compare different formats without mixing the criteria.\n4. Record language, packaging, components and displayed price.\n5. Use the findings in a SKU-by-SKU follow-up inquiry.\n\n## Catalog sample references\n\n${products}\n\nBoardGame B2B states MOQ 1 for public catalog products and displays USD wholesale reference prices. The site is for B2B inquiries, not online checkout. Availability, packaging, freight and final terms are confirmed separately.\n\n## Follow-up quotation\n\nSend the product URL, exact SKU name, quantity for each item, destination country and postal code, packaging questions, and desired receiving date or planning window. Keep the displayed reference price separate from the final quotation.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  if (guide.slug === "custom-card-game-printing-packaging-inquiry-checklist") {
    const products = customExamples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.format}`).join("\n");
    return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nPublished: ${guide.published}\n\n${guide.description}\n\n## Information to prepare\n\n1. Project purpose, audience and language.\n2. Card count and any other required components.\n3. Finished format and packaging direction.\n4. Artwork status and one version-controlled file set.\n5. Quantity options, destination and desired timing.\n\n## Catalog format references\n\n${products}\n\nDisplayed prices apply to the linked catalog products and are not custom-printing quotations. Existing catalog listings show MOQ 1 and USD reference prices; custom project requirements, pricing, packaging, freight and final terms must be confirmed by inquiry.\n\n## Inquiry details\n\nSend the working name of each SKU, its component list, language, packaging direction, artwork status, requested quantities, destination country and postal code, and desired timing. Ask the supplier to confirm accepted artwork requirements and all final commercial terms.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
  }
  const products = examples.map((item) => `- [${item.title}](${origin}/products/${item.slug}) — ${item.price}. ${item.use}`).join("\n");
  return `# ${guide.title}\n\nCanonical URL: ${origin}/guides/${guide.slug}\nUpdated: ${guide.updated}\n\n${guide.description}\n\n## Buyer checklist\n\n1. Define the intended audience and occasion.\n2. Confirm the language and edition shown on the selected SKU.\n3. Compare content format, price and assortment role.\n4. Record the exact product URL and SKU name.\n5. Send quantity, destination and packaging requirements together.\n\n## Catalog examples\n\n${products}\n\nDisplayed prices are USD wholesale reference prices. MOQ is 1. BoardGame B2B is an inquiry site, not an online checkout; availability, packaging, freight and final terms are confirmed separately.\n\n## Prepare an inquiry\n\nInclude each product URL, exact SKU name, quantity, destination country and postal code, packaging requirements, and desired receiving date or planning window.\n\n- Catalog: ${origin}/#catalog\n- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n- Email: ${CONTACT_EMAIL}\n`;
}
