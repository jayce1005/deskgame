import fs from 'node:fs/promises';
import path from 'node:path';
import { classifyLanguage, allowedLanguageStatuses } from './catalog-language-policy.mjs';
const [dir] = process.argv.slice(2);
if(!dir)throw new Error('Usage: review-sku-import.mjs private-batch-dir');
const read=async name=>JSON.parse(await fs.readFile(path.join(dir,name),'utf8'));
const candidates=await read('candidates.json');
const sources=await read('archived-image-index.json.sources.json');
const ocr=await read('ocr.json');
const byFile=new Map(ocr.map(x=>[x.file,x]));
const live=JSON.parse(await fs.readFile('public/products.json','utf8')).products;
const liveImages=new Map();
for(const p of live)for(const url of [p.mainImage,...p.images,...p.skus.map(x=>x.image)]){
 const key=path.basename(new URL(url).pathname);
 if(!liveImages.has(key))liveImages.set(key,new Map());
 liveImages.get(key).set(p.id,{id:p.id,title:p.title,slug:p.slug});
}
let previous=[];
try { previous=await read('review-candidates.json'); } catch(error) { if(error.code!=='ENOENT')throw error; }
const previousById=new Map(previous.map(c=>[c.id,c]));
for(const c of candidates){
 const checks=c.records.map(r=>classifyLanguage(r));
 const statuses=new Set(checks.map(x=>x.status));
 c.languageStatus=statuses.size===1?checks[0].status:'unconfirmed';
 c.languageEvidence=checks;
 // Preserve completed visual/similarity review when updating the policy.
 const old=previousById.get(c.id);
 for(const key of ['similarExistingImages','similarIncomingImages','manualReview'])if(old?.[key])c[key]=old[key];
 if(c.manualReview?.languageStatus)c.languageStatus=c.manualReview.languageStatus;
 c.languageEligible=allowedLanguageStatuses.includes(c.languageStatus);
 c.requiredEditionLabel={russian:'Russian Edition',spanish:'Spanish Edition'}[c.languageStatus]||null;
 const file=sources[c.mainImage]?.filename;
 c.imageFile=file||null;
 c.ocr=file?byFile.get(file)||null:null;
 c.existingImageMatches=file?[...(liveImages.get(file)?.values()||[])]:[];
 if(c.languageStatus==='excluded_language')c.flags.push('excluded_language');
 if(c.languageStatus==='unconfirmed')c.flags.push('language_unconfirmed');
 if(!file)c.flags.push('image_unavailable');
 if(c.ocr?.error)c.flags.push('ocr_failed');
 if(c.ocr?.hasChinese)c.flags.push('image_chinese_text_review');
 if(c.existingImageMatches.length)c.flags.push('possible_existing_duplicate');
 if(c.similarExistingImages?.length)c.flags.push('possible_existing_duplicate');
 if(c.similarIncomingImages?.length)c.flags.push('possible_batch_duplicate');
 c.flags=[...new Set(c.flags)];
}
await fs.writeFile(path.join(dir,'review-candidates.json'),JSON.stringify(candidates,null,2));
await fs.writeFile(path.join(dir,'language-policy.json'),JSON.stringify({allowed:['English editions or multilingual editions containing English','Russian editions','Spanish editions'],exclude:'Chinese-only and other editions not included in the allowed languages',editionLabels:{russian:'Russian Edition',spanish:'Spanish Edition'},uncertain:'Hold for exact SKU/version review; never infer edition from the game name alone',publicationApproved:false},null,2));
console.log(JSON.stringify({candidates:candidates.length,language:Object.fromEntries([...allowedLanguageStatuses,'excluded_language','unconfirmed'].map(v=>[v,candidates.filter(c=>c.languageStatus===v).length])),existingImageMatches:candidates.filter(c=>c.existingImageMatches.length).length,chineseImages:candidates.filter(c=>c.ocr?.hasChinese).length,ocrErrors:candidates.filter(c=>c.ocr?.error).length},null,2));
