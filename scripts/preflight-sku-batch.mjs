import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {classifyLanguage} from './catalog-language-policy.mjs';
import {referencePriceUsd} from './catalog-pricing.mjs';
const dir=process.argv[2];
if(!dir)throw new Error('Usage: preflight-sku-batch.mjs private-batch-dir');
const read=async f=>JSON.parse(await fs.readFile(f,'utf8'));
const summary=await read(path.join(dir,'source-summary.json'));
const candidates=await read(path.join(dir,'candidates.json'));
const sources=await read(path.join(dir,'archived-image-index.json.sources.json'));
const liveBytes=await fs.readFile('public/products.json');
const live=JSON.parse(liveBytes);
const liveIds=new Set(live.products.map(p=>p.id));
const imageOwners=new Map();
for(const p of live.products)for(const u of [p.mainImage,...p.images,...p.skus.map(s=>s.image)]){
 const file=path.basename(new URL(u).pathname);
 if(!imageOwners.has(file))imageOwners.set(file,new Set());
 imageOwners.get(file).add(p.id);
}
let ocr=[];
try{ocr=await read(path.join(dir,'ocr.json'));}catch(e){if(e.code!=='ENOENT')throw e;}
const ocrByFile=new Map(ocr.map(x=>[x.file,x]));
const rows=[];
for(const c of candidates){
 for(const r of c.records){assert.equal(r.priceUsd,referencePriceUsd(r.costUsd,summary.markupPercent));rows.push(r.sourceRow);}
 if(c.costOptionsUsd.length===1)assert.equal(c.priceUsd,referencePriceUsd(c.costOptionsUsd[0],summary.markupPercent));
 const imageFile=sources[c.mainImage]?.filename;
 if(!c.flags.includes('non_product')){
  assert(imageFile,`Missing selected image ${c.index}`);
  const bytes=await fs.readFile(path.join(dir,'images',imageFile));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),imageFile.split('.')[0]);
 }
 c.imageFile=imageFile||null;
 c.ocr=ocrByFile.get(imageFile)||null;
 c.existingIdMatch=liveIds.has(c.id);
 c.existingImageMatches=[...(imageOwners.get(imageFile)||[])];
 c.languageEvidence=c.records.map(classifyLanguage);
 const statuses=[...new Set(c.languageEvidence.map(x=>x.status))];
 c.languageStatus=statuses.length===1?statuses[0]:'unconfirmed';
 c.reviewStatus='pending';
}
assert.equal(rows.length,summary.skuCount);
assert.equal(new Set(rows).size,rows.length);
assert.equal(new Set(candidates.map(c=>c.id)).size,candidates.length);
const report={sourceProducts:summary.productCount,sourceSkuRows:rows.length,uniqueCandidates:candidates.length,repeatRows:rows.length-candidates.length,markupPercent:summary.markupPercent,sourceCurrency:'USD',nonProducts:candidates.filter(c=>c.flags.includes('non_product')).length,priceConflicts:candidates.filter(c=>c.flags.includes('price_conflict')).map(c=>({id:c.id,sku:c.sourceSku,sourceRows:c.records.map(r=>r.sourceRow),costOptionsUsd:c.costOptionsUsd})),existingIdMatches:candidates.filter(c=>c.existingIdMatch).length,existingImageMatches:candidates.filter(c=>c.existingImageMatches.length).length,downloadedImages:new Set(Object.values(sources).map(x=>x.filename)).size,ocrScanned:ocr.length,ocrChineseFindings:ocr.filter(x=>x.hasChinese).length,ocrErrors:ocr.filter(x=>x.error).length,language:Object.fromEntries(['includes_english','russian','spanish','excluded_language','unconfirmed'].map(s=>[s,candidates.filter(c=>c.languageStatus===s).length])),baselineCatalogSha256:createHash('sha256').update(liveBytes).digest('hex'),catalogChanged:false,published:false,pendingDecisions:['Confirm whether every SKU overrides the previous allowed-language policy','Resolve conflicting costs','Review exact SKU names and image matches, including Chinese promotional overlays']};
await fs.writeFile(path.join(dir,'review-candidates.json'),JSON.stringify(candidates,null,2)+'\n');
await fs.writeFile(path.join(dir,'preflight.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
