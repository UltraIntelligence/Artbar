import assert from 'node:assert/strict';
import { COPY_LOCALES, DEFAULT_COPY_PAYLOADS } from '../lib/copy/defaults';
import { buildPublicCopyPayload } from '../lib/copy/public-payload';
import { normalizeCopyPayload } from '../lib/copy/resolve';
import { getPublishedCopyPayload } from '../lib/copy/published';

// Public responses must preserve the requested language and caller-supplied copy.
for (const locale of COPY_LOCALES) {
  const published = getPublishedCopyPayload(locale);
  const actual = buildPublicCopyPayload(locale, published, {}, '/', <T>(value: T) => value);
  assert.equal(actual.content[locale].nav.book, published.site.nav.book);
  assert.equal(actual.localizedCopy.ui.footer.faq, published.ui.footer.faq);
  assert.equal(actual.jpCopy.ui.footer.faq, published.ui.footer.faq);
  const payload = structuredClone(published);
  payload.site.nav.book = `${locale} booking label`;
  payload.ui.footer.faq = `${locale} FAQ label`;
  const data = buildPublicCopyPayload(locale, payload, {}, '/', <T>(value: T) => value);
  assert.equal(data.locale, locale);
  assert.equal(data.content[locale].nav.book, `${locale} booking label`);
  assert.equal(data.localizedCopy.ui.footer.faq, `${locale} FAQ label`);
  assert.equal(data.jpCopy.ui.footer.faq, `${locale} FAQ label`, 'Compatibility alias must use the active language');
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
