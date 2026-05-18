import assert from 'node:assert/strict';
import {
  COPY_LOCALES,
  DEFAULT_COPY_PAYLOADS,
} from '../lib/copy/defaults';
import {
  mergePublishedLocaleIntoContent,
  normalizeCopyPayload,
} from '../lib/copy/resolve';

assert.deepEqual(COPY_LOCALES, ['en', 'jp']);

const hasText = (value: string | undefined) =>
  typeof value === 'string' && value.trim().length > 0;

for (const locale of COPY_LOCALES) {
  const payload = DEFAULT_COPY_PAYLOADS[locale];
  assert.equal(payload.site.nav.book.length > 0, true, `${locale} nav book copy exists`);
  assert.equal(
    payload.instructors.some((instructor) => hasText(instructor.desc)),
    true,
    `${locale} instructor description copy exists`,
  );
  assert.equal(
    payload.locations.some(
      (location) =>
        hasText(location.name) && hasText(location.address) && hasText(location.access),
    ),
    true,
    `${locale} location name, address, and access copy exists`,
  );

  const normalized = normalizeCopyPayload(locale, {
    site: {
      nav: {
        book: locale === 'en' ? 'Reserve a Seat' : '予約する',
      },
    },
  });

  const content = mergePublishedLocaleIntoContent(locale, normalized);
  assert.equal(
    content[locale].nav.book,
    locale === 'en' ? 'Reserve a Seat' : '予約する',
    `${locale} nav copy merges into public content`,
  );
}

const english = mergePublishedLocaleIntoContent('en', DEFAULT_COPY_PAYLOADS.en);
assert.equal(
  english.instructors[0].descEn,
  DEFAULT_COPY_PAYLOADS.en.instructors[0].desc,
  'English instructor copy writes to descEn',
);

const japanese = mergePublishedLocaleIntoContent('jp', DEFAULT_COPY_PAYLOADS.jp);
assert.equal(
  japanese.instructors[0].descJp,
  DEFAULT_COPY_PAYLOADS.jp.instructors[0].desc,
  'Japanese instructor copy writes to descJp',
);

console.log('Copy system smoke check passed.');
