import assert from 'node:assert/strict';
import { COPY_LOCALES, DEFAULT_COPY_PAYLOADS } from '../lib/copy/defaults';
import { buildPublicCopyPayload } from '../lib/copy/public-payload';
import { normalizeCopyPayload } from '../lib/copy/resolve';

// Public responses must preserve the requested language and caller-supplied copy.
for (const locale of COPY_LOCALES) {
  const payload = structuredClone(DEFAULT_COPY_PAYLOADS[locale]);
  payload.site.nav.book = `${locale} booking label`;
  payload.ui.footer.faq = `${locale} FAQ label`;
  const data = buildPublicCopyPayload(locale, payload, {}, '/', <T>(value: T) => value);
  assert.equal(data.locale, locale);
  assert.equal(data.content[locale].nav.book, `${locale} booking label`);
  assert.equal(data.localizedCopy.ui.footer.faq, `${locale} FAQ label`);
  assert.deepEqual(data.jpCopy, data.localizedCopy, 'Compatibility alias must use the active language');
}

// Narrow display repairs must not change studio prices or overwrite newer copy.
const oldLayoutCopy = structuredClone(DEFAULT_COPY_PAYLOADS.jp);
oldLayoutCopy.site.privateParties.pricing.adult.price = '¥12,345';
oldLayoutCopy.site.teamBuilding.pricing.price = '¥23,456';
oldLayoutCopy.site.privateParties.occasions[3].title = ' ';
oldLayoutCopy.site.teamBuilding.valueProp.benefits[0].title = 'ウェルウェルビーイング';
const repairedLayoutCopy = normalizeCopyPayload('jp', oldLayoutCopy);
assert.equal(repairedLayoutCopy.site.privateParties.occasions[3].title, DEFAULT_COPY_PAYLOADS.jp.site.privateParties.occasions[3].title);
assert.equal(repairedLayoutCopy.site.teamBuilding.valueProp.benefits[0].title, 'ウェルビーイング');
assert.deepEqual(repairedLayoutCopy.site.privateParties.pricing, oldLayoutCopy.site.privateParties.pricing);
assert.deepEqual(repairedLayoutCopy.site.teamBuilding.pricing, oldLayoutCopy.site.teamBuilding.pricing);
oldLayoutCopy.site.privateParties.occasions[3].title = 'スタッフが編集したタイトル';
assert.equal(normalizeCopyPayload('jp', oldLayoutCopy).site.privateParties.occasions[3].title, 'スタッフが編集したタイトル');

console.log('Public copy language and pricing preservation checks passed.');
