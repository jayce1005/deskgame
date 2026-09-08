import { parseInquiry } from "./inquiries";
import { findCatalogProduct, renderProductPage, renderRobots, renderSitemap } from "./catalog-pages";
import { redirectCatalogImage } from "./catalog-images";
import {renderReadableCatalog, renderLlms, renderProductMarkdown, renderCatalogMarkdown} from './catalog-readable';

const PUBLIC_ORIGIN = "https://boardgameb2b.com";
const REDIRECT_HOSTS = new Set(["www.boardgameb2b.com", "desktop-game.ocbinks.workers.dev"]);
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};
const MAX_BODY_BYTES = 16_384;

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: JSON_HEADERS });
}

function html(markup: string, status = 200): Response {
  return new Response(markup, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": status === 200 ? "public, max-age=300" : "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

async function readLimitedJson(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new Error("Content-Type must be application/json");
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) throw new Error("Request body is too large");
  if (!request.body) throw new Error("Request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BODY_BYTES) {
      await reader.cancel("body limit exceeded");
      throw new Error("Request body is too large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function createInquiry(request: Request, env: Env): Promise<Response> {
  if (!isSameOrigin(request)) return json({ error: "Cross-origin requests are not allowed" }, 403);

  const inquiry = parseInquiry(await readLimitedJson(request));
  if (inquiry.website) return json({ ok: true }, 201);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO inquiries (
      id, product_id, product_title, buyer_name, email, company, message, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)
  `).bind(
    id,
    inquiry.productId,
    inquiry.productTitle,
    inquiry.name,
    inquiry.email,
    inquiry.company,
    inquiry.message,
    createdAt,
  ).run();

  console.log(JSON.stringify({ event: "inquiry_created", inquiryId: id, productId: inquiry.productId, createdAt }));
  return json({ ok: true, reference: id.slice(0, 8).toUpperCase() }, 201);
}

async function handleApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/api/health") return json({ ok: true });
  if (request.method === "POST" && url.pathname === "/api/inquiries") return createInquiry(request, env);
  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (REDIRECT_HOSTS.has(url.hostname)) {
        return Response.redirect(`${PUBLIC_ORIGIN}${url.pathname}${url.search}`, 301);
      }
      if (url.pathname.startsWith("/api/")) return await handleApi(request, env);
      const imageRedirect = redirectCatalogImage(request);
      if (imageRedirect) return imageRedirect;
      const readable = request.method === 'GET' || request.method === 'HEAD';
      const textResponse = (body: string, type: string) => new Response(request.method==='HEAD'?null:body, {headers:{'content-type':type,'cache-control':'public, max-age=300','x-content-type-options':'nosniff',link:`<${PUBLIC_ORIGIN}/llms.txt>; rel="describedby"`,...(type.startsWith('text/markdown')?{'x-robots-tag':'noindex, follow'}:{})}});
      if (readable && url.pathname === '/llms.txt') return textResponse(renderLlms(PUBLIC_ORIGIN),'text/plain; charset=utf-8');
      if (readable && url.pathname === '/catalog.md') return textResponse(renderCatalogMarkdown(PUBLIC_ORIGIN),'text/markdown; charset=utf-8');
      if (readable && url.pathname === '/catalog') return Response.redirect(`${PUBLIC_ORIGIN}/catalog/${url.search}`,301);
      if (readable && url.pathname === '/catalog/') {
        const raw = url.searchParams.get('page') ?? '1';
        const page = /^\d+$/.test(raw) ? Number(raw) : NaN;
        const body = renderReadableCatalog(PUBLIC_ORIGIN,page);
        if (!body) return html('<!doctype html><title>Page not found</title><h1>Page not found</h1>',404);
        const canonical = `${PUBLIC_ORIGIN}/catalog/${page===1?'':`?page=${page}`}`;
        if (`${url.pathname}${url.search}`!==new URL(canonical).pathname+new URL(canonical).search) return Response.redirect(canonical,301);
        return textResponse(body,'text/html; charset=utf-8');
      }
      if (readable && url.pathname.startsWith('/products/') && url.pathname.endsWith('.md')) {
        const product = findCatalogProduct(decodeURIComponent(url.pathname.slice('/products/'.length,-3)));
        if (!product) return new Response('Product not found',{status:404});
        return textResponse(renderProductMarkdown(product,PUBLIC_ORIGIN),'text/markdown; charset=utf-8');
      }
      if (readable && url.pathname === "/sitemap.xml") {
        return new Response(request.method==='HEAD'?null:renderSitemap(PUBLIC_ORIGIN), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (readable && url.pathname === "/robots.txt") {
        return new Response(request.method==='HEAD'?null:renderRobots(PUBLIC_ORIGIN), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (readable && url.pathname.startsWith("/products/")) {
        const product = findCatalogProduct(decodeURIComponent(url.pathname.slice("/products/".length).replace(/\/$/, "")));
        const response = product ? html(renderProductPage(product, PUBLIC_ORIGIN)) : html("<!doctype html><title>Product not found</title><h1>Product not found</h1><p><a href='/#catalog'>Return to the wholesale catalog</a></p>", 404);
        return request.method==='HEAD'?new Response(null,response):response;
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      console.error(JSON.stringify({ event: "request_failed", message }));
      const isBadRequest = message.includes("required") || message.includes("Invalid") || message.includes("must") || message.includes("Content-Type") || message.includes("large");
      return json({ error: message }, isBadRequest ? 400 : 500);
    }
  },
} satisfies ExportedHandler<Env>;
