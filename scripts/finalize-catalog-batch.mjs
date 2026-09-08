// Private publication receipt and readable unresolved-item report. No credentials.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const dir=path.resolve(process.argv[2]||'');
assert(/^\d{8}-\d{6}$/.test(path.basename(dir)),'Supply a dated batch directory');
assert.equal(path.dirname(dir),path.resolve('.catalog-imports'));
const read=async f=>JSON.parse(await fs.readFile(f,'utf8'));
const review=await read(path.join(dir,'publication-review.json'));
const catalogBytes=await fs.readFile('public/products.json');
const catalog=JSON.parse(catalogBytes);
const verified=await read('.catalog-imports/r2-migration-20260908/site-verified.json');
assert.equal(verified.catalogSha256,createHash('sha256').update(catalogBytes).digest('hex'));
assert(Date.now()-Date.parse(verified.verifiedAt)<3600000,'Re-verify publication before finalizing');
const byId=new Map(catalog.products.map(p=>[p.id,p]));
for(const d of review.decisions.filter(d=>d.status==='ready'))assert.equal(byId.get(d.id)?.title,d.title);
review.summary.published=true;review.summary.publishedAt=verified.verifiedAt;
review.summary.complete=review.summary.counts.held===0;
await fs.writeFile(path.join(dir,'publication-review.json'),JSON.stringify(review,null,2)+'\n');
const reasons={
 'Exact SKU name and variant need additional review':'SKU 名称/具体款式尚未完成确认',
 'Chinese supplier watermark or promotional text must be removed':'需要去除供应商中文水印或促销文字',
};
const held=review.decisions.filter(d=>d.status==='held');
const counts=held.reduce((out,d)=>{out[d.reason]=(out[d.reason]||0)+1;return out;},{});
const clean=v=>String(v??'').replace(/[|\r\n]/g,' ');
const lines=['# 本批发布及待处理清单','',
 `已发布 ${review.summary.newProducts} 个独立 SKU 商品页；网站共 ${catalog.products.length} 个商品。`,
 `本批新商品按美元成本加价 ${review.summary.markupPercent}%；旧商品价格不变。`,
 `仍有 ${held.length} 个条目未发布，本批尚未全部完成。源表和未处理图片保留。`,'',
 '## 未发布原因','',...Object.entries(counts).map(([reason,n])=>`- ${reasons[reason]||reason}：${n} 条`),'',
 '## 逐项清单','', '| 表格原行号 | SKU 原名称 | 原因 |','| --- | --- | --- |',
 ...held.map(d=>`| ${d.sourceRows.join(', ')} | ${clean(d.sourceSku)} | ${clean(reasons[d.reason]||d.reason)} |`),''];
await fs.writeFile(path.join(dir,'待处理清单.md'),lines.join('\n'));
console.log(JSON.stringify({published:review.summary.newProducts,held:held.length,report:path.join(dir,'待处理清单.md')}));
