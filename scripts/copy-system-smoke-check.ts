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
  assert.equal(hasText(payload.site.nav.book), true, `${locale} nav book copy exists`);

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

  for (const instructor of payload.instructors) {
    const merged = content.instructors.find((item) => item.id === instructor.id);
    assert.ok(merged, `${locale} instructor ${instructor.id} merges into public content`);
    assert.equal(
      hasText(instructor.role),
      true,
      `${locale} instructor ${instructor.id} role copy exists`,
    );
    assert.equal(
      hasText(instructor.desc),
      true,
      `${locale} instructor ${instructor.id} description copy exists`,
    );

    if (locale === 'en') {
      assert.equal(
        merged.roleEn,
        instructor.role,
        `English instructor ${instructor.id} role writes to roleEn`,
      );
      assert.equal(
        merged.descEn,
        instructor.desc,
        `English instructor ${instructor.id} description writes to descEn`,
      );
    } else {
      assert.equal(
        merged.roleJp,
        instructor.role,
        `Japanese instructor ${instructor.id} role writes to roleJp`,
      );
      assert.equal(
        merged.descJp,
        instructor.desc,
        `Japanese instructor ${instructor.id} description writes to descJp`,
      );
    }
  }

  for (const location of payload.locations) {
    const merged = content.locations.find((item) => item.id === location.id);
    assert.ok(merged, `${locale} location ${location.id} merges into public content`);
    assert.equal(
      hasText(location.name),
      true,
      `${locale} location ${location.id} name copy exists`,
    );
    assert.equal(
      hasText(location.address),
      true,
      `${locale} location ${location.id} address copy exists`,
    );
    assert.equal(
      hasText(location.access),
      true,
      `${locale} location ${location.id} access copy exists`,
    );

    if (locale === 'en') {
      assert.equal(
        merged.nameEn,
        location.name,
        `English location ${location.id} name writes to nameEn`,
      );
      assert.equal(
        merged.addressEn,
        location.address,
        `English location ${location.id} address writes to addressEn`,
      );
      assert.equal(
        merged.accessEn,
        location.access,
        `English location ${location.id} access writes to accessEn`,
      );
    } else {
      assert.equal(
        merged.nameJp,
        location.name,
        `Japanese location ${location.id} name writes to nameJp`,
      );
      assert.equal(
        merged.addressJp,
        location.address,
        `Japanese location ${location.id} address writes to addressJp`,
      );
      assert.equal(
        merged.accessJp,
        location.access,
        `Japanese location ${location.id} access writes to accessJp`,
      );
    }
  }
}

console.log('Copy system smoke check passed.');
