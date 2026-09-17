/** Extra phrase boundaries for compounds BudouX can leave unbroken.
 * Preserve all other server-provided boundaries and all English copy. */
const PHRASES = [
  ['大人向け', '貸切プラン'],
  ['大人向け', 'パーティー'],
  ['ファミリー', 'イベント'],
  ['スタジオ', '完全貸切'],
  ['インストラクター', '紹介'],
  ['キッズ・', 'パーティー'],
  ['バースデー・', 'パーティー'],
  ['非言語', 'コミュニケーション'],
  ['お食事や', 'ケーキの', 'お持ち込み'],
];

export function addJapaneseDisplayBreaks(text: string): string {
  let result = text.replace(/<wbr\s*\/?>/gi, '\u200b');
  for (const parts of PHRASES) {
    const pattern = [...parts.join('')].join('\u200b*');
    result = result.replace(new RegExp(pattern, 'g'), parts.join('\u200b'));
  }
  return result;
}

export function cleanDisplayText(text: string): string {
  return text.replace(/<wbr\s*\/?>|\u200b/gi, '').trim();
}

export function studioDisplayName(text: string): string {
  return cleanDisplayText(text).replace(/[（(]\s*(?:フランチャイズ|Franchise)\s*[）)]/gi, '').trim();
}
