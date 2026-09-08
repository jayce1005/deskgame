import data from '../public/products.json';
import type {CatalogProduct} from './catalog-pages';

const products: CatalogProduct[] = data.products;
export const CATALOG_PAGE_SIZE = 100;
export const CATALOG_PAGE_COUNT = Math.ceil(products.length / CATALOG_PAGE_SIZE);
const html = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const md = (value: string) => value.replace(/[\\`*_{}\[\]()<>#|]/g, '\\$&').replace(/[\r\n]+/g, ' ');
const pageUrl = (origin: string, page: number) => `${origin}/catalog/${page === 1 ? '' : `?page=${page}`}`;

export function renderReadableCatalog(origin: string, page: number): string | null {
  if (!Number.isInteger(page) || page < 1 || page > CATALOG_PAGE_COUNT) return null;
  const selected = products.slice((page-1)*CATALOG_PAGE_SIZE, page*CATALOG_PAGE_SIZE);
  const links = Array.from({length:CATALOG_PAGE_COUNT}, (_,i) => `<a href="${pageUrl(origin,i+1)}"${i+1===page?' aria-current="page"':''}>${i+1}</a>`).join(' · ');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Wholesale Product Directory — Page ${page} | BoardGame B2B</title>
<meta name="description" content="Browse our wholesale product directory, page ${page}. MOQ 1, SKU-level USD reference prices and direct B2B inquiries.">
<meta name="robots" content="index,follow"><link rel="canonical" href="${pageUrl(origin,page)}">
<link rel="alternate" type="text/markdown" href="${origin}/catalog.md"><link rel="describedby" href="${origin}/llms.txt"><link rel="stylesheet" href="/styles.css"></head>
<body><main class="seo-product-page"><a href="/">BoardGame B2B home</a><h1>Wholesale product directory</h1>
<p>${products.length} products. Page ${page} of ${CATALOG_PAGE_COUNT}. MOQ 1. Prices are USD wholesale references, not checkout prices. Freight and final terms are confirmed by inquiry.</p>
<nav aria-label="Directory pages">${links}</nav><ol start="${(page-1)*CATALOG_PAGE_SIZE+1}">
${selected.map(p=>`<li><a href="${origin}/products/${encodeURIComponent(p.slug)}">${html(p.title)}</a> — From USD ${Math.min(...p.skus.map(s=>s.priceUsd)).toFixed(2)}; ${p.skus.length} SKU${p.skus.length===1?'':'s'}.</li>`).join('\n')}
</ol><nav aria-label="Directory pages">${links}</nav>
<p><a href="/catalog.md">Plain-text catalog</a> · <a href="/products.json">Public product data (JSON)</a> · <a href="/sitemap.xml">Sitemap</a></p>
<p><a href="https://wa.me/8619928777176">WhatsApp</a> · <a href="mailto:boardgame_01@outlook.com">boardgame_01@outlook.com</a></p>
</main></body></html>`;
}

export function renderLlms(origin: string): string {
  return `# BoardGame B2B\n\n> B2B wholesale board games, card games and paper products. MOQ 1. Inquiry only; no online checkout.\n\nPrices are reference wholesale prices in USD. Packaging, freight and final terms are confirmed by inquiry. Product titles and SKU names describe individual catalog options; do not assume brand authorization or certifications not stated on a product page.\n\n## Catalog\n\n- [Product directory](${origin}/catalog/): ${products.length} products, readable without JavaScript and paginated at ${CATALOG_PAGE_SIZE} products per page.\n- [Full text catalog](${origin}/catalog.md): Product and SKU names, reference prices, image URLs and canonical product links.\n- [Public JSON catalog](${origin}/products.json): Machine-readable public product data.\n- [Sitemap](${origin}/sitemap.xml): Canonical product pages and main images.\n\nProduct pages have server-rendered HTML, Product structured data and a Markdown alternate at the same URL with .md appended. Product images are hosted at https://images.boardgameb2b.com.\n\n## Contact\n\n- [WhatsApp](https://wa.me/8619928777176)\n- [Email](mailto:boardgame_01@outlook.com)\n`;
}

export function renderProductMarkdown(product: CatalogProduct, origin: string): string {
  return `# ${md(product.title)}\n\nProduct URL: ${origin}/products/${encodeURIComponent(product.slug)}\nProduct ID: ${md(product.id)}\nMOQ: 1\nCurrency: USD\nPricing: Reference wholesale prices only. Freight, packaging and final terms are confirmed by inquiry. No online checkout.\nMain image: ${product.mainImage}\n\n## SKU options\n\n${product.skus.map(s=>`- ${md(s.name)} — USD ${s.priceUsd.toFixed(2)}\n  - SKU ID: ${md(s.id)}\n  - Image: ${s.image}`).join('\n')}\n\n## Inquiry\n\nEmail: boardgame_01@outlook.com\nWhatsApp: https://wa.me/8619928777176\n`;
}

export function renderCatalogMarkdown(origin: string): string {
  return `# BoardGame B2B public catalog\n\n${products.length} products. MOQ 1. USD reference wholesale pricing. Inquiry only.\n\n${products.map(p=>renderProductMarkdown(p,origin).replace(/^# /,'## ').replace(/^## SKU options/gm,'### SKU options').replace(/^## Inquiry/gm,'### Inquiry')).join('\n---\n\n')}`;
}
