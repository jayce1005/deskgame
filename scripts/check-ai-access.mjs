import {execFileSync} from 'node:child_process';
import {fetch,EnvHttpProxyAgent} from 'undici';
import fs from 'node:fs';
const catalog=JSON.parse(fs.readFileSync(new URL('../public/products.json',import.meta.url),'utf8'));
const dispatcher=new EnvHttpProxyAgent();
async function read(url,options={}) {
  for(let attempt=0;attempt<3;attempt++) {
    try {return await fetch(url,{...options,dispatcher,signal:AbortSignal.timeout(20000)});}
    catch(e) {if(attempt===2) throw new Error(`Network check failed: ${new URL(url).pathname}`); await new Promise(r=>setTimeout(r,1000));}
  }
}
try {
  if(process.argv.includes('--cloudflare')) {
    const output=execFileSync('./node_modules/.bin/wrangler',['auth','token','--json'],{encoding:'utf8',stdio:['ignore','pipe','pipe'],env:{...process.env,WRANGLER_WRITE_LOGS:'false'}});
    const {token}=JSON.parse(output.slice(output.indexOf('{')));
    if(!token) throw new Error('Wrangler token unavailable');
    for(const endpoint of ['bot_management','rulesets','settings/security_level']) {
      const response=await read(`https://api.cloudflare.com/client/v4/zones/980e455c26d4fd803a86b1c83358f36e/${endpoint}`,{headers:{authorization:`Bearer ${token}`}});
      console.log(JSON.stringify({endpoint,status:response.status,data:await response.json()}));
    }
  } else {
    const paths=process.argv.includes('--before')?['/robots.txt','/products.json']:['/robots.txt','/sitemap.xml','/llms.txt','/catalog/',`/catalog/?page=${Math.ceil(catalog.products.length/100)}`,'/catalog.md','/products.json',`/products/${catalog.products.at(-1).slug}`,`/products/${catalog.products.at(-1).slug}.md`];
    for(const ua of ['Mozilla/5.0','OAI-SearchBot','ChatGPT-User','Claude-SearchBot','PerplexityBot']) {
      for(const pathname of paths) {
        const r=await read(`https://boardgameb2b.com${pathname}`,{headers:{'user-agent':ua}});
        const body=await r.text();
        let ok=r.status===200 && !/cf-chl-|Just a moment\.\.\./i.test(body);
        if(pathname==='/llms.txt') ok=ok && body.startsWith('# BoardGame B2B') && body.includes('/catalog.md');
        if(pathname.startsWith('/catalog/')) ok=ok && body.includes('Wholesale product directory') && body.includes('/products/');
        if(pathname==='/catalog.md') ok=ok && (body.match(/Product URL:/g)||[]).length===catalog.products.length;
        if(pathname.endsWith('.md')) ok=ok && (r.headers.get('content-type')||'').startsWith('text/markdown');
        console.log(JSON.stringify({ua,path:pathname,status:r.status,contentType:r.headers.get('content-type'),bytes:body.length,ok}));
        if(!ok) process.exitCode=1;
      }
      const image=await read(catalog.products[0].mainImage,{method:'HEAD',headers:{'user-agent':ua}});
      const imageOk=image.status===200 && image.headers.get('content-type')?.startsWith('image/');
      console.log(JSON.stringify({ua,path:'R2 sample image',status:image.status,ok:!!imageOk}));
      if(!imageOk) process.exitCode=1;
    }
  }
} finally {await dispatcher.close();}
