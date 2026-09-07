import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { reviewedCopy } from './catalog-copy-20260907.mjs';
const dir=process.argv[2];
if(!dir)throw new Error('Usage: stage-catalog-20260907.mjs private-batch-dir');
const read=async f=>JSON.parse(await fs.readFile(path.join(dir,f),'utf8'));
const raw=await fs.readFile(path.join(dir,'candidates.json'));
assert.equal(createHash('sha256').update(raw).digest('hex'),'c7e7d93682479a2c9f32785eb645288590e6d95b2998bdaa4e069deb07b92443','Copy mapping belongs to a different source batch');
const candidates=await read('review-candidates.json');
let baseline;
try { baseline=await read('baseline-products.json'); }
catch(e){if(e.code!=='ENOENT')throw e;baseline=JSON.parse(await fs.readFile('public/products.json','utf8'));await fs.writeFile(path.join(dir,'baseline-products.json'),JSON.stringify(baseline,null,2));}
const baselineIds=new Set(baseline.products.map(p=>p.id));
// Same item or a possible edition overlap: keep the existing URL, do not duplicate or overwrite it.
const existingOverlap={
  37:'69284351488739487',145:'69284351488121351',158:'69284351488121275',319:'69284351488122207',322:'69284351488735131',324:'69284351488727073',
  359:'69284351488124559',369:'69284351488743335',380:'69284351488741311',396:'69284351488123897',397:'69284351488125075',401:'69284351488732673',
  408:'69284351488121133',409:'69284351488120697',438:'69284351488125011',439:'69284351488125151',446:'69284351488122313',451:'69284351488730051',
  456:'69284351488125549',462:'69284351488122313',478:'69284351488124615',486:'69284351488124827',500:'69284351488122247',501:'69284351488572481',
  547:'69284351488742287',596:'69284351488120943',597:'69284351488123405',608:'69284351488742219',611:'69284351488732547',613:'69284351488744495',
  616:'69284351488743241',628:'69284351488120829',647:'69284351488735207',677:'69284351488734503',678:'69284351488739163',679:'69284351488726081',
  683:'69284351488727303',709:'69284351488737215',716:'69284351488120757',752:'69284351488741943',
  586:'69284351488735943',672:'69284351488729695',
};
const repeatOf={425:65,584:64,700:40,540:355,544:177,545:457,557:390,512:393};
// Full-resolution visual review: OCR confused artwork/stylized Latin or Cyrillic text with Chinese.
const ocrFalsePositives=new Set([
 'e6a36354671e95ab2994349e46824cebcae16b105f2608719a719aa6f5bcae29.jpg',
 'c1342cec5c204f0584c347124a4d40e0a31334300819588debf0cec16f17a211.jpg',
 '9a10adb37426e5009bf6ddf9feeb4677c80d3cc0b0471573c74021b1a9e4ab76.jpg',
 '7a8e3f4c2f7c759710556d4213b6e2eb2e0f81322f67f2d304964b3d730c8c59.jpg',
 '4dd6343271cb8d7edbd8d4746ef4a69e894e78601acdecbbf3db3134ab50877e.jpg',
 '27e04b471c3ca0be0f2ab303e1aa1bce62dbe794f7f6a30fbdef35680c35369c.jpg',
]);
const sourceCache=await read('archived-image-index.json.sources.json');
const alternateCache=await read('alternate-probe.json.sources.json');
const alternateOcr=new Map((await read('alternate-probe-ocr.json')).map(o=>[o.file,o]));
const overrideLanguages={698:'spanish'}; // Specific Spanish SKU/packaging overrides the generic English parent title.
const alternateIndexes={599:1,753:1};
const products=[],decisions=[],assets=[];
for(const c of candidates){
 const result={index:c.index,id:c.id,sourceRows:c.records.map(r=>r.sourceRow),sourceSku:c.sourceSku,title:reviewedCopy[c.index]||null};
 const reject=(status,reason)=>{decisions.push({...result,status,reason});};
 if(c.flags.includes('non_product')){reject('excluded','Non-product postage or price-adjustment link');continue;}
 if(c.languageStatus==='excluded_language'){reject('excluded','Language is not included in the requested English/Russian/Spanish policy');continue;}
 if(existingOverlap[c.index]){assert(baselineIds.has(existingOverlap[c.index]));reject('existing_overlap',`Existing or potentially same-edition listing retained: ${existingOverlap[c.index]}`);continue;}
 if(repeatOf[c.index]!==undefined){reject('batch_overlap',`Same named item already reviewed at candidate ${repeatOf[c.index]}; confirm packaging/edition before adding another URL`);continue;}
 if(c.flags.includes('price_conflict')){reject('held','Conflicting USD costs in repeated source rows');continue;}
 if(c.index===203){reject('held','SKU names the SETI expansion but the image shows the base game');continue;}
 const language=overrideLanguages[c.index]||c.languageStatus;
 if(!['includes_english','russian','spanish'].includes(language)){reject('held','Supplied language/version needs confirmation');continue;}
 if(!result.title){reject('held','Exact SKU identity and a matching single-product image require further review');continue;}
 const alternate=alternateIndexes[c.index];
 const sourceUrl=alternate!==undefined?c.alternateImages[alternate]:c.mainImage;
 const file=alternate!==undefined?alternateCache[sourceUrl]?.filename:sourceCache[sourceUrl]?.filename;
 const ocr=alternate!==undefined?alternateOcr.get(file):c.ocr;
 if(!file||!ocr||ocr.error){reject('held','Selected image or OCR is unavailable');continue;}
 if(ocr.hasChinese&&!ocrFalsePositives.has(file)){reject('held','Selected image has Chinese OCR findings requiring cleanup or false-positive review');continue;}
 const imagePath=path.join(dir,alternate!==undefined?'alternate-probe-images':'images',file);
 const bytes=await fs.readFile(imagePath);
 assert.equal(createHash('sha256').update(bytes).digest('hex'),file.split('.')[0]);
 const price=Math.round(Math.round(c.records[0].costUsd*100)*1.25)/100;
 assert.equal(price,c.priceUsd); assert(price>0 && Number.isFinite(price));
 assert(!/[\u3400-\u9fff]|TODO/.test(result.title));
 if(language==='russian')assert(result.title.includes('Russian Edition'));
 if(language==='spanish')assert(result.title.includes('Spanish Edition'));
 const url=`https://boardgameb2b.com/images/catalog/${file}`;
 const slug=result.title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,75)+'-'+c.id.slice(4);
 const product={id:c.id,title:result.title,slug,mainImage:url,images:[url],priceUsd:price,skus:[{id:c.id+'-1',name:result.title,image:url,priceUsd:price}]};
 products.push(product);assets.push({from:imagePath,file});
 decisions.push({...result,status:'ready',language,selectedImage:file,ocrVisualFalsePositive:ocrFalsePositives.has(file)});
}
const merged={...baseline,generatedAt:new Date().toISOString(),products:[...baseline.products,...products]};
assert.equal(new Set(merged.products.map(p=>p.id)).size,merged.products.length);
assert.equal(new Set(merged.products.map(p=>p.slug)).size,merged.products.length);
assert.deepEqual(merged.products.slice(0,baseline.products.length),baseline.products);
assert.equal(decisions.length,755);assert.equal(decisions.reduce((n,d)=>n+d.sourceRows.length,0),831);
const summary={sourceProducts:708,sourceSkuRows:831,repeatRowsMerged:76,uniqueCandidates:755,counts:Object.fromEntries(['ready','excluded','existing_overlap','batch_overlap','held'].map(s=>[s,decisions.filter(d=>d.status===s).length])),newProducts:products.length,newSkus:products.length,totalProducts:merged.products.length,totalSkus:merged.products.reduce((n,p)=>n+p.skus.length,0),newImages:new Set(assets.map(a=>a.file)).size,publicationApproved:true,published:false};
await fs.writeFile(path.join(dir,'staged-products.json'),JSON.stringify(merged,null,2)+'\n');
await fs.writeFile(path.join(dir,'publication-review.json'),JSON.stringify({summary,decisions,assets},null,2));
const md=['# 2026-09-07 商品批次上架检查','',`源商品 708 个，SKU 行 831 条；合并重复采集行 76 条。`,`本次可新增 ${products.length} 个独立 SKU 商品，网站共 ${merged.products.length} 个商品。`,`现有商品和链接全部保留；未通过检查的条目未加入待发布 JSON。`,'','## 分类统计','',...Object.entries(summary.counts).map(([s,n])=>`- ${s}: ${n}`),'','## 明细（内部核对，不用于网站）','','| 编号 | SKU | 状态 | 原因 |','|---|---|---|---|',...decisions.map(d=>`| ${d.index} | ${d.sourceSku.replace(/\|/g,'/').replace(/\n/g,' ')} | ${d.status} | ${d.reason||d.title} |`)];
await fs.writeFile(path.join(dir,'上架检查报告.md'),md.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
if(process.argv.includes('--install')){
 const current=JSON.parse(await fs.readFile('public/products.json','utf8'));
 assert([baseline,merged].some(x=>JSON.stringify(x.products)===JSON.stringify(current.products)),'Public catalog changed after staging; refusing to overwrite unrelated changes');
 for(const asset of assets){
  const target=path.join('public/images/catalog',asset.file);
  try {await fs.copyFile(asset.from,target,fs.constants.COPYFILE_EXCL);}
  catch(e){if(e.code!=='EEXIST')throw e;assert.equal(createHash('sha256').update(await fs.readFile(target)).digest('hex'),asset.file.split('.')[0]);}
 }
 await fs.copyFile(path.join(dir,'staged-products.json'),'public/products.json');
 const imageCount=new Set(merged.products.flatMap(p=>[p.mainImage,...p.images,...p.skus.map(s=>s.image)])).size;
 // Public-safe release fixture: no source rows, supplier URLs, costs or unreviewed product data.
 await fs.writeFile('scripts/catalog-release-20260907.json',JSON.stringify({totalProducts:merged.products.length,totalSkus:summary.totalSkus,totalImages:imageCount,newProducts:products.map(p=>({id:p.id,title:p.title,slug:p.slug,priceUsd:p.priceUsd}))},null,2)+'\n');
 console.log('Installed verified catalog and selected images locally. Not yet deployed.');
}
