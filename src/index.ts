import { parseInquiry } from "./inquiries";
import { findCatalogProduct, renderProductPage, renderRobots, renderSitemap } from "./catalog-pages";

const PUBLIC_ORIGIN = "https://boardgameb2b.com";
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
      if (url.hostname === "www.boardgameb2b.com") {
        return Response.redirect(`${PUBLIC_ORIGIN}${url.pathname}${url.search}`, 301);
      }
      if (url.pathname.startsWith("/api/")) return await handleApi(request, env);
      if (request.method === "GET" && url.pathname === "/sitemap.xml") {
        return new Response(renderSitemap(PUBLIC_ORIGIN), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (request.method === "GET" && url.pathname === "/robots.txt") {
        return new Response(renderRobots(PUBLIC_ORIGIN), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (request.method === "GET" && url.pathname.startsWith("/products/")) {
        const product = findCatalogProduct(decodeURIComponent(url.pathname.slice("/products/".length).replace(/\/$/, "")));
        return product ? html(renderProductPage(product, PUBLIC_ORIGIN)) : html("<!doctype html><title>Product not found</title><h1>Product not found</h1><p><a href='/#catalog'>Return to the wholesale catalog</a></p>", 404);
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
