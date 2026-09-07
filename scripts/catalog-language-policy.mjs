// Language eligibility is only a review gate, never publication approval.
const english = /(?:英文|英语|全英版|中[、，,\s/]*英|英[、，,\s/]*(?:中|法|日|西|德|意)|\benglish\b)/i;
const russian = /(?:俄罗斯语|俄语|俄文|\brussian\b)/i;
const spanish = /(?:西语|西班牙语|西班牙文|\b(?:espanol|español|spanish)\b)/i;
const other = /(?:俄罗斯语|俄语|俄文|西语|西班牙语|简中|繁中|简体中文|繁体中文|中文版|中文|德语|法语|日文|日语|\b(?:espanol|español|russian|spanish|german|french|japanese|chinese)\b)/i;
const explicit = text => english.test(text) ? 'includes_english'
  : russian.test(text) && spanish.test(text) ? 'unconfirmed'
  : russian.test(text) ? 'russian'
  : spanish.test(text) ? 'spanish'
  : other.test(text) ? 'excluded_language' : null;

export const allowedLanguageStatuses = ['includes_english', 'russian', 'spanish'];

export function classifyLanguage({ sourceSku = '', sourceTitle = '', descriptors = {} }) {
  const skuStatus = explicit(sourceSku);
  const languageStatus = explicit(String(descriptors.Language || ''));
  if (skuStatus && languageStatus && skuStatus !== languageStatus) {
    return { status: 'unconfirmed', evidence: 'conflicting_sku_language_fields' };
  }
  if (skuStatus || languageStatus) {
    return { status: skuStatus || languageStatus, evidence: 'explicit_sku_language' };
  }
  // A foreign-script SKU can contradict a generic English parent title.
  // Do not infer the supplied edition solely from its name, in either direction.
  if (/[\u0400-\u04ff]/u.test(sourceSku)) {
    return { status: 'unconfirmed', evidence: 'foreign_script_sku_requires_version_check' };
  }
  return { status: explicit(sourceTitle) || 'unconfirmed', evidence: 'parent_title_only_requires_image_review' };
}
