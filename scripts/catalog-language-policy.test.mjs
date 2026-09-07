import assert from 'node:assert/strict';
import { it } from 'vitest';
import { classifyLanguage } from './catalog-language-policy.mjs';
const cases = [
  [{ sourceSku: '中文版', sourceTitle: '英文纸牌游戏' }, 'excluded_language'],
  [{ sourceSku: '英文版', sourceTitle: '中文卡牌游戏' }, 'includes_english'],
  [{ sourceSku: '简中、英双语' }, 'includes_english'],
  [{ sourceSku: 'ODIN(中英西意德荷六语)' }, 'includes_english'],
  [{ sourceSku: 'RAUBER RAUPE（英、法、意）' }, 'includes_english'],
  [{ sourceTitle: '俄罗斯语TAPO塔罗牌' }, 'russian'],
  [{ sourceSku: '俄语 R1', sourceTitle: '英文塔罗牌' }, 'russian'],
  [{ sourceSku: '西班牙语版', sourceTitle: '英文桌游' }, 'spanish'],
  [{ sourceTitle: 'español Tarot' }, 'spanish'],
  [{ sourceSku: '德语版', sourceTitle: '英文俄语西班牙语版本' }, 'excluded_language'],
  [{ sourceSku: 'Russian Edition', descriptors: { Language: 'Spanish Edition' } }, 'unconfirmed'],
  [{ sourceTitle: '俄语版/西班牙语版塔罗牌' }, 'unconfirmed'],
  [{ sourceTitle: '全英版Talk Flirt Dare' }, 'includes_english'],
  [{ sourceSku: 'Татуаж Таро', sourceTitle: '1000款英文版塔罗牌' }, 'unconfirmed'],
  [{ sourceSku: 'English Edition', descriptors: { Language: 'Chinese' } }, 'unconfirmed'],
  [{ sourceSku: 'MONIKERS' }, 'unconfirmed'],
  [{ sourceTitle: '五国语言桌游' }, 'unconfirmed'],
];
for (const [input, expected] of cases) it(`classifies ${JSON.stringify(input)}`,()=>assert.equal(classifyLanguage(input).status, expected));
