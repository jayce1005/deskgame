import {readFileSync} from 'node:fs';
import {expect,it} from 'vitest';
import {CATALOG_PAGE_COUNT, renderReadableCatalog,renderLlms,renderProductMarkdown,renderCatalogMarkdown} from '../src/catalog-readable';
import worker from '../src/index';
const catalog=JSON.parse(readFileSync(new URL('../public/products.json',import.meta.url),'utf8'));
const origin='https://boardgameb2b.com';
it('discovers every product through bounded HTML pages without JavaScript',()=>{
  const slugs=[];
  for(let page=1;page<=CATALOG_PAGE_COUNT;page++) {
    const html=renderReadableCatalog(origin,page)!;
    const links=[...html.matchAll(/href="https:\/\/boardgameb2b.com\/products\/([^"]+)"/g)].map(m=>m[1]);
    expect(links.length).toBeLessThanOrEqual(100); slugs.push(...links);
    expect(html).toContain('rel="canonical"'); expect(html).not.toContain('<script');
  }
  expect(slugs).toEqual(catalog.products.map((p:{slug:string})=>encodeURIComponent(p.slug)));
  for(const page of [0,-1,1.2,NaN,CATALOG_PAGE_COUNT+1]) expect(renderReadableCatalog(origin,page)).toBeNull();
});
it('offers machine-readable public data without private supplier information',()=>{
  const llms=renderLlms(origin), full=renderCatalogMarkdown(origin);
  expect(llms).toContain('/products.json'); expect(llms).toContain('/sitemap.xml');
  expect(full.match(/Product URL:/g)).toHaveLength(catalog.products.length);
  expect(full.match(/SKU ID:/g)).toHaveLength(catalog.products.flatMap((p:{skus:unknown[]})=>p.skus).length);
  expect(full).not.toMatch(/1688\.com|alicdn\.com|sourcePrice|costUsd/);
  expect(full).toContain('https://images.boardgameb2b.com/');
  for(const p of catalog.products) {
    const text=renderProductMarkdown(p,origin);
    for(const sku of p.skus) expect(text).toContain(`USD ${sku.priceUsd.toFixed(2)}`);
  }
});
it('escapes product text as text rather than Markdown instructions or HTML',()=>{
  const p={...catalog.products[0],title:'<script>[bad](https://evil.test)'};
  const text=renderProductMarkdown(p,origin);
  expect(text).not.toContain('<script>'); expect(text).not.toContain('[bad](');
});
it('serves GET and HEAD for public machine-readable routes without exposing inquiry records',async()=>{
  // These public routes never use the database or static-asset binding.
  const env={} as Env;
  const slug=catalog.products[0].slug;
  for(const pathname of ['/robots.txt','/sitemap.xml','/llms.txt','/catalog.md','/catalog/','/catalog/?page=6',`/products/${slug}`,`/products/${slug}.md`]) {
    const get=await worker.fetch(new Request(origin+pathname),env);
    const head=await worker.fetch(new Request(origin+pathname,{method:'HEAD'}),env);
    expect(get.status).toBe(200); expect(head.status).toBe(200);
    expect(await get.text()).not.toBe(''); expect(await head.text()).toBe('');
    expect(head.headers.get('content-type')).toBe(get.headers.get('content-type'));
  }
  const invalid=await worker.fetch(new Request(origin+'/catalog/?page=999999'),env);
  expect(invalid.status).toBe(404);
  const duplicate=await worker.fetch(new Request(origin+'/catalog/?page=1'),env);
  expect(duplicate.status).toBe(301); expect(duplicate.headers.get('location')).toBe(origin+'/catalog/');
  const privateRoute=await worker.fetch(new Request(origin+'/api/inquiries'),env);
  expect(privateRoute.status).toBe(404);
});
