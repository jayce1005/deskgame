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
const SEO_TEMPLATE_UPDATED = "2026-09-01";

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
  const description = `${product.title} direct from a professional board game factory. MOQ 1 with wholesale display pricing, ${product.skus.length} available ${product.skus.length === 1 ? "variant" : "variants"}, product images and B2B inquiry.`;
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
        mainEntityOfPage: canonical,
        additionalProperty: {
          "@type": "PropertyValue",
          name: "Minimum order quantity",
          value: "1 piece",
        },
        offers: product.skus.map((sku) => ({
          "@type": "Offer",
          sku: sku.id,
          priceCurrency: "USD",
          price: sku.priceUsd.toFixed(2),
          url: canonical,
        })),
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
    <title>${escapeHtml(product.title)} | BoardGame B2B Wholesale</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="BoardGame B2B">
    <meta property="og:title" content="${escapeHtml(product.title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(product.mainImage)}">
    <meta property="og:image:alt" content="${escapeHtml(product.title)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(product.title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(product.mainImage)}">
    <meta name="twitter:image:alt" content="${escapeHtml(product.title)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <script type="application/ld+json">${jsonLd(productSchema)}</script>
  </head>
  <body class="product-page-body">
    <header class="site-header">
      <a class="logo" href="/" aria-label="BoardGame B2B home"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a>
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
          <p class="seo-lead">Factory-direct wholesale inquiry with clear SKU options, MOQ 1 and USD display pricing.</p>
          <div class="seo-price"><strong>${usd(lowPrice)}${lowPrice !== highPrice ? `–${usd(highPrice)}` : ""}</strong><span>USD reference price</span></div>
          <div class="reference-note"><strong>MOQ 1:</strong> the displayed factory wholesale reference price is available from one unit. This is a B2B inquiry listing, not an online checkout; packaging, freight and final terms are confirmed separately.</div>
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
        <p>Every catalog product starts at MOQ 1. Include your preferred SKU, quantity, destination country and packaging requirements so we can confirm the final unit price and shipping terms.</p>
        <a class="text-link" href="/?inquiry=${escapeHtml(product.id)}#inquiry">Request a quotation <span>↗</span></a>
      </section>
    </main>
    <footer><a class="logo footer-logo" href="/"><img class="brand-mark" src="/logo.svg" alt="" width="38" height="38"><span class="logo-copy"><span>BOARDGAME <b>B2B</b></span><small>Factory Games. MOQ One.</small></span></a><p>Wholesale games, journals and gift products.<br>Pricing shown for reference only.</p><span>© 2026 BoardGame B2B</span></footer>
  </body>
</html>`;
}

export function renderSitemap(origin: string): string {
  const catalogUpdated = catalog.generatedAt.slice(0, 10);
  const lastModified = catalogUpdated > SEO_TEMPLATE_UPDATED ? catalogUpdated : SEO_TEMPLATE_UPDATED;
  const homepage = `  <url><loc>${escapeXml(`${origin}/`)}</loc><lastmod>${lastModified}</lastmod></url>`;
  const products = catalog.products.map((product) => {
    const url = `${origin}/products/${encodeURIComponent(product.slug)}`;
    return `  <url><loc>${escapeXml(url)}</loc><lastmod>${lastModified}</lastmod><image:image><image:loc>${escapeXml(product.mainImage)}</image:loc><image:title>${escapeXml(product.title)}</image:title></image:image></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[homepage, ...products].join("\n")}\n</urlset>\n`;
}

export function renderRobots(origin: string): string {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`;
}
