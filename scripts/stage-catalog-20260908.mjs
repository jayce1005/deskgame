import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {titleFor,editionFor} from './catalog-copy-20260908.mjs';
import {referencePriceUsd} from './catalog-pricing.mjs';
const dir=process.argv[2];if(!dir)throw new Error('Private batch directory required');
const read=async f=>JSON.parse(await fs.readFile(path.join(dir,f),'utf8'));
const candidates=await read('review-candidates.json');
assert.equal(createHash('sha256').update(await fs.readFile(path.join(dir,'review-candidates.json'))).digest('hex'),'092034ccdad1edeb84426703733a32adaf72bcacdab3cf17d553fab238965bc6','Review indices require the exact inspected input');
const source=await read('source-summary.json');
assert.equal(source.markupPercent,45);assert.equal(source.skuCount,1900);assert.equal(candidates.length,1876);
let baseline;try{baseline=await read('baseline-products.json');}catch(e){if(e.code!=='ENOENT')throw e;baseline=JSON.parse(await fs.readFile('public/products.json','utf8'));await fs.writeFile(path.join(dir,'baseline-products.json'),JSON.stringify(baseline,null,2));}
// All 868 distinct images visually inspected in 25 contact sheets. These images
// still carry supplier overlays, have conflicting edition evidence, or are collages
// that do not identify the selected SKU. Apply findings to every shared reference.
const overlay=new Set([10,13,14,15,44,76,115,188,189,219,257,387,492,493,494,1378,1509,1511,1512,1519,1520,1599,1600,1601,1632,1633,1634,1635,1700,1701,1703,1704,1707,1708,1710,1711,1712,1719,1720,1794,1795,1799,1801,1802,1804,1807,1812,1813,1815,1816,1817,1818,1819,1820,1822,1823,1824,1825,1830,1831,1834,1836,1839,1840,1841,1842,1843,1844,1845,1846,1847,1848,1850,1851,1853,1861,1862,1863,1868,1872,1873]);
for(let i=1578;i<=1586;i++)overlay.add(i);
overlay.add(1474);overlay.add(1761);
const cleanMiddle=new Set([462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,507,508,509,510,542,632]);
const ambiguous=new Map([[159,'French SKU image shows Spanish packaging'],[162,'English SKU image explicitly says Spanish'],[191,'SKU says card box; image does not identify exact contents'],[1364,'Image is only a clearance notice'],[1506,'Image is only a clearance notice'],[1800,'Named tarot deck uses a multi-deck collage'],[1803,'Named tarot deck uses a multi-deck collage'],[1806,'Named tarot deck uses a multi-deck collage'],[1809,'Numeric SKU 8 cannot be assigned to one of the pictured decks'],[1810,'Numeric SKU 1 cannot be assigned to one of the pictured decks'],[1814,'Multiple different games pictured for Avalon SKU'],[1821,'Three different games pictured for single SKU'],[1828,'English SKU image has German game packaging'],[1829,'English SKU image has French card packaging'],[1849,'Packaging text does not confirm claimed English edition'],[1865,'Four different games pictured for single SKU'],[1867,'SKU calls this a chest but image shows standard game packaging'],[1869,'SKU names Four Souls but image shows only an unidentified storage chest'],[1874,'Image does not confirm included versions']]);
const firstByFile=new Map();for(const c of candidates)if(c.imageFile&&!firstByFile.has(c.imageFile))firstByFile.set(c.imageFile,c);
ambiguous.set(11,'Supplement collage does not identify exact supplied expansion');
ambiguous.set(17,'French SKU uses English package photo');
ambiguous.set(1650,'SWO variant uses Sun & Moon package photo; exact set needs confirmation');
const imageReview={};
for(const [file,c] of firstByFile){let reason=null;
 if(overlay.has(c.index)||(c.index>=426&&c.index<=1363&&!cleanMiddle.has(c.index)))reason='Chinese supplier watermark or promotional text must be removed';
 if(ambiguous.has(c.index))reason=ambiguous.get(c.index);
 imageReview[file]={firstIndex:c.index,status:reason?'held':'reviewed',reason,ocrChineseFinding:!!c.ocr?.hasChinese};
}
const decisions=[],products=[],assets=[],dedup=new Map();
const baseIds=new Set(baseline.products.map(p=>p.id));
for(const p of baseline.products)dedup.set(JSON.stringify([p.title.toLowerCase(),p.mainImage]),p.id);
for(const c of candidates){
 const title=titleFor(c),r={index:c.index,id:c.id,sourceRows:c.records.map(r=>r.sourceRow),sourceSku:c.sourceSku,title};
 const reject=(status,reason)=>decisions.push({...r,status,reason});
 if(c.flags.includes('non_product')){reject('excluded','Postage/price-adjustment row is not merchandise');continue;}
 if(baseIds.has(c.id)){reject('existing_overlap','Existing SKU and reference price preserved');continue;}
 if(c.flags.includes('price_conflict')){reject('held','Same source SKU has conflicting USD costs: 2.24 and 4.48');continue;}
 if(ambiguous.has(c.index)){reject('held',ambiguous.get(c.index));continue;}
 if(!title||/[\u3400-\u9fff]|TODO/.test(title)){reject('held','Exact SKU name and variant need additional review');continue;}
 const review=imageReview[c.imageFile];
 if(!review||review.status!=='reviewed'){reject('held',review?.reason||'Missing image review');continue;}
 assert(c.ocr&&!c.ocr.error);
 const price=referencePriceUsd(c.records[0].costUsd,45);assert.equal(price,c.priceUsd);
 const image=`https://images.boardgameb2b.com/images/catalog/${c.imageFile}`;
 // Deduplicate only when the full reviewed title (including edition/pack size)
 // and exact image bytes agree. Keep first source offer and its checked price.
 const key=JSON.stringify([title.toLowerCase(),image]);
 if(dedup.has(key)){reject('batch_overlap',`Same reviewed product, edition, quantity and image: ${dedup.get(key)}`);continue;}
 dedup.set(key,c.id);
 const bytes=await fs.readFile(path.join(dir,'images',c.imageFile));assert.equal(createHash('sha256').update(bytes).digest('hex'),c.imageFile.split('.')[0]);
 const slug=title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,75)+'-'+c.id.slice(4);
 products.push({id:c.id,title,slug,mainImage:image,images:[image],priceUsd:price,skus:[{id:c.id+'-1',name:title,image,priceUsd:price}]});
 assets.push({from:path.join(dir,'images',c.imageFile),file:c.imageFile});
 decisions.push({...r,status:'ready',language:editionFor(c),selectedImage:c.imageFile});
}
const merged={...baseline,generatedAt:new Date().toISOString(),products:[...baseline.products,...products]};
assert.equal(new Set(merged.products.map(p=>p.id)).size,merged.products.length);assert.equal(new Set(merged.products.map(p=>p.slug)).size,merged.products.length);
assert.deepEqual(merged.products.slice(0,baseline.products.length),baseline.products);
assert.equal(decisions.reduce((n,d)=>n+d.sourceRows.length,0),1900);
const summary={sourceProducts:300,sourceSkuRows:1900,uniqueCandidates:1876,repeatRowsMerged:24,markupPercent:45,languagePolicy:'All languages approved on 2026-09-08; actual edition preserved',counts:Object.fromEntries(['ready','held','excluded','existing_overlap','batch_overlap'].map(s=>[s,decisions.filter(d=>d.status===s).length])),newProducts:products.length,totalProducts:merged.products.length,totalSkus:merged.products.reduce((n,p)=>n+p.skus.length,0),newImages:new Set(assets.map(a=>a.file)).size,publicationApproved:true,published:false};
await fs.writeFile(path.join(dir,'image-visual-review.json'),JSON.stringify(imageReview,null,2));
await fs.writeFile(path.join(dir,'publication-review.json'),JSON.stringify({summary,decisions,assets},null,2));
await fs.writeFile(path.join(dir,'staged-products.json'),JSON.stringify(merged,null,2)+'\n');
await fs.mkdir(path.join(dir,'publish-images'),{recursive:true});
for(const a of assets)await fs.copyFile(a.from,path.join(dir,'publish-images',a.file));
console.log(JSON.stringify(summary,null,2));
if(process.argv.includes('--install')){
 const current=JSON.parse(await fs.readFile('public/products.json','utf8'));assert.deepEqual(current.products,baseline.products,'Catalog changed after baseline');
 await fs.copyFile(path.join(dir,'staged-products.json'),'public/products.json');
 await fs.writeFile('scripts/catalog-release-20260908.json',JSON.stringify({totalProducts:merged.products.length,totalSkus:summary.totalSkus,totalImages:new Set(merged.products.flatMap(p=>[p.mainImage,...p.images,...p.skus.map(s=>s.image)])).size,newProducts:products.map(p=>({id:p.id,title:p.title,slug:p.slug,priceUsd:p.priceUsd}))},null,2)+'\n');
}
