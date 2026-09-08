export const CATALOG_IMAGE_ORIGIN = "https://images.boardgameb2b.com";

// Keep already-indexed image URLs and cached catalogs working after the R2 move.
export function redirectCatalogImage(request: Request): Response | null {
  const url = new URL(request.url);
  if (!/^\/images\/catalog\/[a-f0-9]{64}\.(?:jpg|png|webp|gif|avif)$/.test(url.pathname)) return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  }
  return Response.redirect(`${CATALOG_IMAGE_ORIGIN}${url.pathname}`, 301);
}
