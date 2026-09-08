import {describe,it,expect} from 'vitest';
// @ts-expect-error Reviewed batch mapping is a standalone JavaScript import tool.
import {titleFor,editionFor} from '../scripts/catalog-copy-20260908.mjs';
const candidate=(sourceSku:string,index=9999)=>({index,sourceSku,sourceTitle:'宝可梦卡牌360张',records:[{descriptors:{}}]});
describe('reviewed supplier copy',()=>{
 it('keeps SKU pack quantities ahead of parent quantities',()=>{
  expect(titleFor(candidate('MEGA EVOLUTION72/盒'))).toContain('72 Cards');
  expect(titleFor(candidate('Y33.Prismatic.Evolutions324'))).toContain('324 Cards');
  expect(titleFor(candidate('151Booster BundIe72张/盒E151'))).toContain('72 Cards');
 });
 it('does not lose model suffixes next to Chinese language labels',()=>{
  expect(titleFor(candidate('MEGA2西语-西语360张'))).toBe('Pokemon Phantasmal Flames Trading Cards - 360 Cards - Spanish Edition');
 });
 it('preserves the manually verified French set and multilingual edition',()=>{
  expect(titleFor(candidate('EVOLUTIONS法语',1614))).toBe('Pokemon Prismatic Evolutions Trading Cards - 360 Cards - French Edition');
  expect(editionFor(candidate('ODIN(中英西意德荷六语)'))).toBe('Multilingual Edition (Chinese, English, Spanish, Italian, German and Dutch)');
 });
 it('holds unresolved variant names instead of inventing a name',()=>{
  expect(titleFor(candidate('不明款式'))).toBeNull();
 });
});
