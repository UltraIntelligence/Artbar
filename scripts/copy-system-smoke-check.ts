import assert from 'node:assert/strict';
import {
  COPY_LOCALES,
  DEFAULT_COPY_PAYLOADS,
} from '../lib/copy/defaults';
import {
  buildResolvedCopy,
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

  const editedPayload = structuredClone(payload);
  editedPayload.faqs[0] = {
    question: `${locale} edited FAQ question`,
    answer: `${locale} edited FAQ answer`,
  };
  editedPayload.teamBuildingTestimonials[0] = {
    ...editedPayload.teamBuildingTestimonials[0],
    text: `${locale} edited team testimonial`,
    author: `${locale} edited team author`,
  };
  editedPayload.teamBuildingLogisticsRows[0] = {
    name: `${locale} edited logistics studio`,
    cap: `${locale} edited logistics capacity`,
  };
  editedPayload.privatePartyCapacityRows[0] = {
    name: `${locale} edited party capacity`,
    desc: `${locale} edited party description`,
  };
  editedPayload.themePages['japan-inspired'] = {
    ...editedPayload.themePages['japan-inspired'],
    title: `${locale} edited theme title`,
    introTitle: `${locale} edited theme intro`,
  };

  const resolved = buildResolvedCopy(locale, normalizeCopyPayload(locale, editedPayload));
  assert.equal(
    resolved.faqs[0]?.question,
    `${locale} edited FAQ question`,
    `${locale} FAQ edits resolve for public pages`,
  );
  assert.equal(
    resolved.teamBuildingTestimonials[0]?.text,
    `${locale} edited team testimonial`,
    `${locale} team testimonial edits resolve for public pages`,
  );
  assert.equal(
    resolved.teamBuildingLogisticsRows[0]?.name[locale],
    `${locale} edited logistics studio`,
    `${locale} logistics card name writes to active language`,
  );
  assert.equal(
    resolved.teamBuildingLogisticsRows[0]?.cap[locale],
    `${locale} edited logistics capacity`,
    `${locale} logistics card capacity writes to active language`,
  );
  assert.equal(
    resolved.privatePartyCapacityRows[0]?.name[locale],
    `${locale} edited party capacity`,
    `${locale} private party capacity name writes to active language`,
  );
  assert.equal(
    resolved.privatePartyCapacityRows[0]?.desc[locale],
    `${locale} edited party description`,
    `${locale} private party capacity description writes to active language`,
  );
  assert.equal(
    resolved.themePages['japan-inspired']?.title,
    `${locale} edited theme title`,
    `${locale} theme detail edits resolve for public pages`,
  );
}

console.log('Copy system smoke check passed.');
