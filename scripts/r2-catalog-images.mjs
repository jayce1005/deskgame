// Dedicated catalog migration tool. Credentials stay in memory; never printed or persisted.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fetch, EnvHttpProxyAgent} from 'undici';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '..');
const account = '84e4375bb0b189f1b8e33cbfc48866ae';
const bucket = 'boardgameb2b-images';
const origin = 'https://images.boardgameb2b.com';
const manifestPath = path.join(root, 'scripts/catalog-images.json');
const privateDir = path.join(root, '.catalog-imports/r2-migration-20260908');
const receiptPath = path.join(privateDir, 'uploaded.json');
const dispatcher = new EnvHttpProxyAgent();
const mime = {jpg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif',avif:'image/avif'};
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const writeJson = async (file, data) => {
  const temp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data, null, 2)+'\n');
  await fs.rename(temp, file);
};
async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file,'utf8')); }
  catch(e) { if(e.code === 'ENOENT' && fallback !== undefined) return fallback; throw e; }
}
let token;
function auth() {
  if(!token) {
    const output = execFileSync(path.join(root,'node_modules/.bin/wrangler'), ['auth','token','--json'], {
      cwd:root, encoding:'utf8', stdio:['ignore','pipe','pipe'],
      env:{...process.env,WRANGLER_WRITE_LOGS:'false'},
    });
    // Wrangler may print a proxy warning before its JSON.
    const data = JSON.parse(output.slice(output.indexOf('{')));
    assert(data.token && ['oauth','api_token'].includes(data.type));
    token=data.token;
  }
  return token;
}
async function request(url, options={}, authenticated=false) {
  for(let attempt=0;attempt<5;attempt++) {
    try {
      const response=await fetch(url, {...options, dispatcher, signal:AbortSignal.timeout(45000),
        headers:{...(authenticated?{authorization:`Bearer ${auth()}`} : {}), ...options.headers}});
      if(!response.ok && !(options.redirect==='manual' && response.status===301)) { const status=response.status; await response.body?.cancel(); throw new Error(`HTTP ${status} at ${new URL(url).pathname}`); }
      return response;
    } catch(e) { if(attempt===4) throw e; await sleep(1000*2**attempt); }
  }
}
async function pool(items, worker, concurrency=6) {
  let index=0, failure;
  await Promise.all(Array.from({length:concurrency}, async()=>{
    while(index<items.length && !failure) {
      try { await worker(items[index++]); } catch(e) { failure=e; }
    }
  }));
  if(failure) throw failure;
}
await fs.mkdir(privateDir,{recursive:true});
const command=process.argv[2];
function catalogKeys(catalog) {
  return [...new Set(catalog.products.flatMap(p=>[p.mainImage,...p.images,...p.skus.map(s=>s.image)]))].map(value=>{
    const url=new URL(value);
    assert(['boardgameb2b.com','images.boardgameb2b.com'].includes(url.hostname));
    assert(/^\/images\/catalog\/[a-f0-9]{64}\.(jpg|png|webp|gif|avif)$/.test(url.pathname));
    return url.pathname.slice(1);
  });
}
async function verifiedManifest() {
  const manifest=await readJson(manifestPath);
  assert.equal(manifest.bucket,bucket); assert.equal(manifest.origin,origin);
  assert.equal(new Set(manifest.files.map(f=>f.key)).size,manifest.files.length);
  for(const file of manifest.files) {
    assert(/^images\/catalog\/[a-f0-9]{64}\.(jpg|png|webp|gif|avif)$/.test(file.key));
    assert.equal(path.basename(file.key).split('.')[0],file.sha256);
  }
  const verified=await readJson(path.join(privateDir,'verified.json'));
  assert.equal(verified.origin,origin);
  assert.equal(verified.manifestSha256,digest(await fs.readFile(manifestPath)));
  assert.deepEqual(verified.keys,manifest.files.map(f=>f.key).sort());
  return manifest;
}
try {
  if(command==='prepare') {
    const dir=path.resolve(root,process.argv[3] || 'public/images/catalog');
    const previous=await readJson(manifestPath,{files:[]});
    const byKey=new Map(previous.files.map(f=>[f.key,f]));
    let names;
    try { names=await fs.readdir(dir); } catch(e) { if(e.code==='ENOENT') names=[]; else throw e; }
    for(const filename of names.sort()) {
      assert(/^[a-f0-9]{64}\.(jpg|png|webp|gif|avif)$/.test(filename));
      const bytes=await fs.readFile(path.join(dir,filename));
      assert.equal(digest(bytes),filename.split('.')[0]);
      const entry={key:`images/catalog/${filename}`,sha256:digest(bytes),bytes:bytes.length,contentType:mime[filename.split('.').pop()]};
      if(byKey.has(entry.key)) assert.deepEqual(byKey.get(entry.key),entry);
      byKey.set(entry.key,entry);
    }
    const files=[...byKey.values()].sort((a,b)=>a.key.localeCompare(b.key));
    assert(files.length>0);
    await writeJson(manifestPath,{bucket,origin,files});
    console.log(JSON.stringify({images:files.length,bytes:files.reduce((n,f)=>n+f.bytes,0)}));
  } else if(command==='zone') {
    const result=await (await request('https://api.cloudflare.com/client/v4/zones?name=boardgameb2b.com',{},true)).json();
    assert.equal(result.result.length,1);
    console.log(JSON.stringify({id:result.result[0].id,name:result.result[0].name}));
  } else if(command==='upload') {
    const manifest=await readJson(manifestPath);
    const receipts=await readJson(receiptPath,{});
    let completed=0, nextStart=Date.now(), checkpoint=Promise.resolve();
    try { await pool(manifest.files,async file=>{
      if(receipts[file.key]?.sha256===file.sha256 && receipts[file.key]?.bytes===file.bytes) { completed++; return; }
      const imageDir=path.resolve(root,process.argv[3] || 'public/images/catalog');
      const bytes=await fs.readFile(path.join(imageDir,path.basename(file.key)));
      assert.equal(digest(bytes),file.sha256); assert.equal(bytes.length,file.bytes);
      // Stay below the Cloudflare API's account rate limit, including retries.
      const start=Math.max(Date.now(),nextStart); nextStart=start+320; await sleep(start-Date.now());
      const response=await request(`https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucket}/objects/${file.key}`,{
        method:'PUT',body:bytes,headers:{'content-type':file.contentType,'content-length':String(file.bytes),'cache-control':'public, max-age=31536000, immutable','cf-r2-storage-class':'Standard'},
      },true);
      await response.arrayBuffer();
      receipts[file.key]={sha256:file.sha256,bytes:file.bytes,uploadedAt:new Date().toISOString()};
      completed++;
      if(completed%25===0) {
        console.log(`Uploaded ${completed}/${manifest.files.length}`);
        checkpoint=checkpoint.then(()=>writeJson(receiptPath,receipts)); await checkpoint;
      }
    }); } finally { await checkpoint; await writeJson(receiptPath,receipts); }
    console.log(`Upload complete: ${Object.keys(receipts).length} objects`);
  } else if(command==='verify') {
    const manifest=await readJson(manifestPath);
    const checked=[];
    let uploads=process.argv.includes('--wait-for-upload') ? await readJson(receiptPath,{}) : null;
    await pool(manifest.files,async file=>{
      const deadline=Date.now()+300000;
      while(uploads && uploads[file.key]?.sha256!==file.sha256) {
        assert(Date.now()<deadline,`Still waiting for upload: ${file.key}`);
        await sleep(2000); uploads=await readJson(receiptPath,{});
      }
      const response=await request(`${origin}/${file.key}`);
      assert.equal(response.headers.get('content-type')?.split(';')[0],file.contentType);
      const bytes=new Uint8Array(await response.arrayBuffer());
      assert.equal(bytes.length,file.bytes); assert.equal(digest(bytes),file.sha256);
      checked.push(file.key);
      if(checked.length%100===0) console.log(`Verified ${checked.length}/${manifest.files.length}`);
    },8);
    await writeJson(path.join(privateDir,'verified.json'),{origin,manifestSha256:digest(await fs.readFile(manifestPath)),verifiedAt:new Date().toISOString(),count:checked.length,keys:checked.sort()});
    console.log(`All ${checked.length} remote image bytes verified`);
  } else if(command==='install') {
    const manifest=await verifiedManifest();
    const catalogPath=path.join(root,'public/products.json');
    const original=await fs.readFile(catalogPath,'utf8');
    const catalog=JSON.parse(original);
    const keys=new Set(manifest.files.map(f=>f.key));
    for(const key of catalogKeys(catalog)) assert(keys.has(key),`Unverified image: ${key}`);
    const backup=path.join(privateDir,'products-before-r2.json');
    try { await fs.writeFile(backup,original,{flag:'wx'}); } catch(e) { if(e.code!=='EEXIST') throw e; }
    const rewrite=value=>`${origin}${new URL(value).pathname}`;
    for(const p of catalog.products) {
      p.mainImage=rewrite(p.mainImage); p.images=p.images.map(rewrite);
      for(const s of p.skus) s.image=rewrite(s.image);
    }
    await writeJson(catalogPath,catalog);
    const indexPath=path.join(root,'public/index.html');
    const index=await fs.readFile(indexPath,'utf8');
    await fs.writeFile(indexPath,index.replaceAll('https://boardgameb2b.com/images/catalog/','https://images.boardgameb2b.com/images/catalog/'));
    console.log(`Updated image URLs only; ${catalog.products.length} products preserved`);
  } else if(command==='verify-site') {
    const manifest=await verifiedManifest();
    const local=await readJson(path.join(root,'public/products.json'));
    const live=await (await request('https://boardgameb2b.com/products.json')).json();
    assert.deepEqual(live,local);
    const sitemap=await (await request('https://boardgameb2b.com/sitemap.xml')).text();
    assert.equal((sitemap.match(/<url>/g)||[]).length,local.products.length+1);
    assert(sitemap.includes(origin));
    const homepage=await (await request('https://boardgameb2b.com/')).text();
    assert(homepage.includes(origin)); assert(homepage.includes('searchInput')); assert(homepage.includes('pagination'));
    for(const p of [local.products[0],local.products.at(-1)]) {
      const html=await (await request(`https://boardgameb2b.com/products/${p.slug}`)).text();
      assert(html.includes(p.mainImage)); assert(html.includes('canonical')); assert(html.includes('wa.me'));
    }
    for(const file of [manifest.files[0],manifest.files.at(-1)]) {
      const response=await request(`https://boardgameb2b.com/${file.key}`,{redirect:'manual'});
      assert.equal(response.status,301);
      assert.equal(response.headers.get('location'),`${origin}/${file.key}`);
      await response.body?.cancel();
    }
    await writeJson(path.join(privateDir,'site-verified.json'),{verifiedAt:new Date().toISOString(),catalogSha256:digest(await fs.readFile(path.join(root,'public/products.json'))),manifestSha256:digest(await fs.readFile(manifestPath)),products:local.products.length});
    console.log(`Production verified: ${local.products.length} products, sitemap and R2 links`);
  } else if(command==='cleanup') {
    const manifest=await verifiedManifest();
    const site=await readJson(path.join(privateDir,'site-verified.json'));
    assert.equal(site.catalogSha256,digest(await fs.readFile(path.join(root,'public/products.json'))));
    assert.equal(site.manifestSha256,digest(await fs.readFile(manifestPath)));
    assert(Date.now()-Date.parse(site.verifiedAt)<86400000,'Re-verify production before cleanup');
    const files=[];
    // Validate the complete exact target list before deleting any file.
    for(const file of manifest.files) {
      const target=path.join(root,'public',file.key);
      try { const bytes=await fs.readFile(target); assert.equal(digest(bytes),file.sha256); files.push(target); }
      catch(e) { if(e.code!=='ENOENT') throw e; }
    }
    for(const target of files) await fs.unlink(target);
    console.log(`Removed ${files.length} verified local replicas; R2 and Git history preserved`);
  } else throw new Error('Usage: node scripts/r2-catalog-images.mjs prepare|zone|upload|verify|install|verify-site|cleanup [image-directory]');
} finally { await dispatcher.close(); }
