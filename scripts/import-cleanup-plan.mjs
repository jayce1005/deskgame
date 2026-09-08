// Published, cloud-backed images only; preserve files also used by pending items.
export function cleanupImageNames({catalog, decisions, candidates, indexes, sources, verifiedKeys}) {
  const basename = value => { try { return new URL(value).pathname.split('/').at(-1); } catch { return null; } };
  const liveIds = new Set(catalog.products.map(p => p.id));
  const liveImages = new Set(catalog.products.flatMap(p => [p.mainImage, ...p.images, ...p.skus.map(s => s.image)]).map(basename));
  const published = new Set(decisions.filter(d => d.status === 'ready' && liveIds.has(d.id)).map(d => d.id));
  const owned = new Set(), protectedImages = new Set();
  const add = (id, file) => { if (file) (published.has(id) ? owned : protectedImages).add(file); };
  for (const index of indexes) for (const p of index.products) {
    for (const value of [p.mainImage, ...(p.images || []), ...(p.skus || []).map(s => s.image)]) add(p.id, basename(value));
  }
  function walk(id, value) {
    if (typeof value === 'string') { if (sources[value]) add(id, sources[value].filename); }
    else if (Array.isArray(value)) for (const entry of value) walk(id, entry);
    else if (value && typeof value === 'object') for (const entry of Object.values(value)) walk(id, entry);
  }
  for (const candidate of candidates) walk(candidate.id, candidate);
  return [...owned].filter(name => /^[a-f0-9]{64}\.(jpg|png|webp|gif|avif)$/.test(name)
    && liveImages.has(name) && verifiedKeys.has(`images/catalog/${name}`) && !protectedImages.has(name)).sort();
}
