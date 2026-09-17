import assert from 'node:assert/strict';
import { addJapaneseDisplayBreaks, cleanDisplayText, studioDisplayName } from '../lib/jp-display';
import { isYearEndPartySeason } from '../lib/seasonal';

assert.equal(addJapaneseDisplayBreaks('大人向け貸切プラン'), '大人向け\u200b貸切プラン');
assert.equal(addJapaneseDisplayBreaks('インストラクター紹\u200b介'), 'インストラクター\u200b紹介');
assert.equal(addJapaneseDisplayBreaks('Birthday party'), 'Birthday party');
assert.equal(cleanDisplayText('¥6,\u200b600〜'), '¥6,600〜');
assert.equal(studioDisplayName('大阪（フランチャイズ）'), '大阪');
assert.equal(studioDisplayName('(Franchise) Osaka'), 'Osaka');
assert.equal(isYearEndPartySeason(new Date('2026-08-31T14:59:59Z')), false);
assert.equal(isYearEndPartySeason(new Date('2026-08-31T15:00:00Z')), true);
assert.equal(isYearEndPartySeason(new Date('2026-12-31T14:59:59Z')), true);
assert.equal(isYearEndPartySeason(new Date('2026-12-31T15:00:00Z')), false);
console.log('Responsive display smoke check passed.');
