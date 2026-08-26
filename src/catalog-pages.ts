import catalogJson from "../public/products.json";

interface CatalogSku {
  id: string;
  name: string;
  image: string;
  priceUsd: number;
}

export interface CatalogProduct {
  id: string;
  title: string;
  slug: string;
  mainImage: string;
  images: string[];
  priceUsd: number;
  skus: CatalogSku[];
}

interface CatalogData {
  generatedAt: string;
  products: CatalogProduct[];
}

const catalog = catalogJson as CatalogData;

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function escapeXml(value: unknown): string {
  return escapeHtml(value);
}

function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function usd(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function findCatalogProduct(slug: string): CatalogProduct | undefined {
  return catalog.products.find((product) => product.slug === slug);
}

export function renderProductPage(product: CatalogProduct, origin: string): string {
  const canonical = `${origin}/products/${encodeURIComponent(product.slug)}`;
  const description = `${product.title} for wholesale buyers. Review ${product.skus.length} available ${product.skus.length === 1 ? "variant" : "variants"}, product images and USD reference pricing, then send a B2B inquiry.`;
  const prices = product.skus.map((sku) => sku.priceUsd);
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        image: product.images,
        description,
        sku: product.id,
        url: canonical,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: lowPrice.toFixed(2),
          highPrice: highPrice.toFixed(2),
          offerCount: product.skus.length,
          url: canonical,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Wholesale catalog", item: `${origin}/#catalog` },
          { "@type": "ListItem", position: 2, name: product.title, item: canonical },
        ],
      },
    ],
  };
  const gallery = [...new Set([product.mainImage, ...product.images])].slice(0, 5);
  const variants = product.skus.map((sku) => `
    <article class="seo-sku">
      <img src="${escapeHtml(sku.image)}" alt="${escapeHtml(`${product.title} – ${sku.name}`)}" width="96" height="96" loading="lazy" referrerpolicy="no-referrer">
      <div><h3>${escapeHtml(sku.name)}</h3><p>${usd(sku.priceUsd)} <span>USD reference price</span></p></div>
    </article>`).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(product.title)} | Desktop Game Wholesale</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="Desktop Game">
    <meta property="og:title" content="${escapeHtml(product.title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(product.mainImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <script type="application/ld+json">${jsonLd(productSchema)}</script>
  </head>
  <body class="product-page-body">
    <header class="site-header">
      <a class="logo" href="/" aria-label="Desktop Game home"><span class="logo-symbol"><i></i><i></i><i></i></span><span>DESKTOP <b>GAME</b></span></a>
      <nav aria-label="Primary navigation"><a href="/#catalog">Catalog</a><a href="/#how-it-works">How it works</a><a href="/#about">About</a></nav>
      <a class="header-link" href="/?inquiry=${escapeHtml(product.id)}#inquiry">Send inquiry <span>↗</span></a>
    </header>
    <main class="seo-product-page">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/#catalog">Wholesale catalog</a><span>/</span><span aria-current="page">${escapeHtml(product.title)}</span></nav>
      <article class="seo-product-shell">
        <section class="seo-gallery" aria-label="Product images">
          <img class="seo-main-image" src="${escapeHtml(product.mainImage)}" alt="${escapeHtml(product.title)}" width="720" height="720" fetchpriority="high" referrerpolicy="no-referrer">
          ${gallery.length > 1 ? `<div class="seo-gallery-row">${gallery.slice(1).map((image, index) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${product.title} product view ${index + 2}`)}" width="120" height="120" loading="lazy" referrerpolicy="no-referrer">`).join("")}</div>` : ""}
        </section>
        <section class="seo-product-copy">
          <span class="kicker">B2B wholesale catalog</span>
          <h1>${escapeHtml(product.title)}</h1>
          <p class="seo-lead">Available for wholesale inquiry with clear SKU options and USD reference pricing.</p>
          <div class="seo-price"><strong>${usd(lowPrice)}${lowPrice !== highPrice ? `–${usd(highPrice)}` : ""}</strong><span>USD reference price</span></div>
          <div class="reference-note">This is a B2B inquiry listing, not an online checkout. Final price, MOQ, packaging, freight and commercial terms are confirmed separately.</div>
          <a class="inquiry-button" href="/?inquiry=${escapeHtml(product.id)}#inquiry">Send wholesale inquiry <span>↗</span></a>
        </section>
      </article>
      <section class="seo-variants" aria-labelledby="variantsTitle">
        <div class="section-heading"><div><span class="kicker">Available options</span><h2 id="variantsTitle">Product variants</h2></div><p>${product.skus.length} ${product.skus.length === 1 ? "SKU" : "SKUs"}</p></div>
        <div class="seo-sku-grid">${variants}</div>
      </section>
      <section class="seo-b2b-note">
        <span class="kicker">Wholesale process</span>
        <h2>From product selection to a confirmed quotation.</h2>
        <p>Include your preferred SKU, order quantity, destination country and packaging requirements in your inquiry. We will use those details to confirm the applicable MOQ, final unit price and shipping terms.</p>
        <a class="text-link" href="/?inquiry=${escapeHtml(product.id)}#inquiry">Request a quotation <span>↗</span></a>
      </section>
    </main>
    <footer><a class="logo footer-logo" href="/"><span class="logo-symbol"><i></i><i></i><i></i></span><span>DESKTOP <b>GAME</b></span></a><p>Wholesale card games and party games.<br>Pricing shown for reference only.</p><span>© 2026 Desktop Game</span></footer>
  </body>
</html>`;
}

export function renderSitemap(origin: string): string {
  const lastModified = catalog.generatedAt.slice(0, 10);
  const urls = [`${origin}/`, ...catalog.products.map((product) => `${origin}/products/${encodeURIComponent(product.slug)}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeXml(url)}</loc><lastmod>${lastModified}</lastmod></url>`).join("\n")}\n</urlset>\n`;
}

export function renderRobots(origin: string): string {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`;
}
