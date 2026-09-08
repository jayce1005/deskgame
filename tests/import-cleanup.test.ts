import {expect,it} from 'vitest';
import {cleanupImageNames} from '../scripts/import-cleanup-plan.mjs';
it('only cleans published cloud-backed files, preserving shared pending images',()=>{
  const names=['a','b','c'].map(c=>`${c.repeat(64)}.jpg`);
  const urls=names.map(n=>`https://images.boardgameb2b.com/images/catalog/${n}`);
  const input={catalog:{products:[{id:'live',mainImage:urls[0],images:urls,skus:[]}]},
    decisions:[{id:'live',status:'ready'},{id:'pending',status:'held'}], candidates:[],sources:{},
    indexes:[{products:[{id:'live',mainImage:urls[0],images:urls},{id:'pending',mainImage:urls[1]}]}],
    verifiedKeys:new Set(names.slice(0,2).map(n=>`images/catalog/${n}`))};
  expect(cleanupImageNames(input)).toEqual([names[0]]);
  expect(cleanupImageNames({...input,decisions:[{id:'live',status:'held'}]})).toEqual([]);
  expect(cleanupImageNames({...input,candidates:[{id:'pending',records:[{image:'source'}]}],sources:{source:{filename:names[0]}}})).toEqual([]);
});
