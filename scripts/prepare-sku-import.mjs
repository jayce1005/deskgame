import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Private, review-only preparation. Never writes to public/products.json.
const [workbookPath, summaryPath, outputDir] = process.argv.slice(2);
if (!workbookPath || !summaryPath || !outputDir) throw new Error('Usage: prepare-sku-import.mjs workbook.xlsx source-summary.json private-output-dir');
const modulePath = process.env.ARTIFACT_TOOL_MODULE;
if (!modulePath) throw new Error('ARTIFACT_TOOL_MODULE is required');
const { FileBlob, SpreadsheetFile } = await import(modulePath);
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(workbookPath));
const rows = workbook.worksheets.getItemAt(0).getUsedRange().values;
const headers = rows[0].map(String);
const idx = Object.fromEntries(headers.map((h,i)=>[h,i]));
const summary = JSON.parse(await fs.readFile(summaryPath,'utf8'));
const normalized = s => String(s ?? '').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();
const hash = s => createHash('sha256').update(s).digest('hex');
const groups = new Map();
for (const product of summary.products) for (const sku of product.skus) {
  const row = rows[sku.rowNumber-1];
  if (String(row[idx['全球产品ID']]) !== product.id) throw new Error(`Source row mismatch at ${sku.rowNumber}`);
  const sourceUrl = String(row[idx['来源Url']] || '');
  const offer = sourceUrl.match(/\/offer\/(\d+)\.html/)?.[1];
  const descriptorValues = [...new Set(Object.values(sku.descriptors).map(normalized).filter(v=>v && v!==normalized(sku.sourceSku)))].sort();
  const key = JSON.stringify([offer || product.id,normalized(sku.sourceSku),descriptorValues]);
  // A missing SKU is not sufficient identity evidence for automatic merging.
  const identity = sku.sourceSku ? key : `${key}:${product.id}:${sku.rowNumber}`;
  const record = {sourceProductId:product.id,sourceRow:sku.rowNumber,sourceTitle:product.sourceTitle,sourceSku:sku.sourceSku,descriptors:sku.descriptors,sourceUrl,offerId:offer||null,costUsd:sku.costUsd,priceUsd:sku.displayPriceUsd,variantImages:sku.variantImages,productImages:product.productImages,description:String(row[idx['产品描述']]||''),parentSkuCount:product.skus.length};
  if(!groups.has(identity)) groups.set(identity,{id:`sku-${hash(identity).slice(0,20)}`,identity,records:[]});
  groups.get(identity).records.push(record);
}
const candidates=[...groups.values()].map((group,index)=>{
  const r=group.records[0];
  const flags=[];
  const costs=[...new Set(group.records.map(r=>r.costUsd))];
  const variants=[...new Set(group.records.flatMap(r=>r.variantImages))];
  const galleries=[...new Set(group.records.flatMap(r=>r.productImages))];
  if(costs.length>1)flags.push('price_conflict');
  if(!r.sourceSku || /^\d+$/.test(r.sourceSku.trim()))flags.push('missing_or_numeric_sku');
  if(!variants.length)flags.push(r.parentSkuCount>1?'missing_variant_image':'main_image_requires_identity_check');
  if(!variants.length&&!galleries.length)flags.push('missing_all_images');
  if(/补差|补运费|差价链接|运费专拍/.test(r.sourceTitle))flags.push('non_product');
  if(/中文|简中|繁中|中英|中、英|六语|五语/.test(`${r.sourceTitle} ${r.sourceSku}`))flags.push('check_language_edition');
  return {...group,index,sourceTitle:r.sourceTitle,sourceSku:r.sourceSku,priceUsd:costs.length===1?r.priceUsd:null,costOptionsUsd:costs,mainImage:variants[0]||galleries[0]||'',imageSource:variants.length?'variant':'parent_gallery',alternateImages:[...variants.slice(1),...galleries.filter(u=>u!==variants[0])],flags,reviewStatus:'pending',titleEn:null};
});
await fs.mkdir(outputDir,{recursive:true});
await fs.writeFile(path.join(outputDir,'source-summary.json'),JSON.stringify(summary,null,2));
await fs.writeFile(path.join(outputDir,'candidates.json'),JSON.stringify(candidates,null,2));
const stats={sourceFile:workbookPath,sourceProducts:summary.productCount,sourceSkuRows:summary.skuCount,candidates:candidates.length,repeatRows:summary.skuCount-candidates.length,repeatGroups:candidates.filter(c=>c.records.length>1).length,priceConflictGroups:candidates.filter(c=>c.flags.includes('price_conflict')).length,numericOrMissingSku:candidates.filter(c=>c.flags.includes('missing_or_numeric_sku')).length,missingVariantImage:candidates.filter(c=>c.flags.includes('missing_variant_image')).length,nonProducts:candidates.filter(c=>c.flags.includes('non_product')).length,existingCatalogChanged:false,published:false};
await fs.writeFile(path.join(outputDir,'summary.json'),JSON.stringify(stats,null,2));
// Temporary input for the existing image archiver; never treat this as publication-ready.
const images={products:candidates.filter(c=>c.mainImage&&!c.flags.includes('non_product')).map(c=>({id:c.id,mainImage:c.mainImage,images:[],skus:[]}))};
await fs.writeFile(path.join(outputDir,'image-download-input.json'),JSON.stringify(images));
console.log(JSON.stringify(stats,null,2));
