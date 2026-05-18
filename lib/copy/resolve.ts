import {
  FAQS_JP,
  LOCATION_SHORT_LABELS,
  POPULAR_THEMES,
  POPULAR_THEMES_JP,
  PRIVATE_PARTY_CAPACITY_ROWS,
  TEAM_BUILDING_LOGISTICS_ROWS,
} from '@/constants';
import { defaultContent } from '@/data/content';
import {
  DEFAULT_COPY_PAYLOADS,
  deepMergeTemplate,
} from '@/lib/copy/defaults';
import { sanitizeBlogHtml } from '@/lib/blog-html';
import type {
  CopyLocale,
  JapaneseCopyPayload,
  LocalizedCopyPayload,
  ResolvedJapaneseCopy,
} from '@/lib/copy/types';
import type { ContentData } from '@/types';

type JapaneseThemeItem = JapaneseCopyPayload['site']['home']['themes']['items'][number];

const LEGACY_THEME_SLUGS: Record<string, string> = {
  'texture-painting': 'texture-art',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRawJapaneseThemeItems(payload: unknown): JapaneseThemeItem[] | null {
  if (!isRecord(payload)) return null;
  const site = (payload as { site?: unknown }).site;
  if (!isRecord(site)) return null;
  const home = (site as { home?: unknown }).home;
  if (!isRecord(home)) return null;
  const themes = (home as { themes?: unknown }).themes;
  if (!isRecord(themes)) return null;
  const items = (themes as { items?: unknown }).items;
  return Array.isArray(items) ? (items as JapaneseThemeItem[]) : null;
}

function migrateLegacyField(
  item: Record<string, unknown>,
  legacyKey: string,
  neutralKey: string,
): void {
  if (typeof item[neutralKey] === 'string') return;
  if (typeof item[legacyKey] === 'string') {
    item[neutralKey] = item[legacyKey];
  }
}

function migrateLegacyJapaneseArrayFields(
  payload: Record<string, unknown>,
  arrayKey: string,
  fields: Array<[legacyKey: string, neutralKey: string]>,
): void {
  const items = payload[arrayKey];
  if (!Array.isArray(items)) return;

  for (const item of items) {
    if (!isRecord(item)) continue;
    for (const [legacyKey, neutralKey] of fields) {
      migrateLegacyField(item, legacyKey, neutralKey);
    }
  }
}

function migrateLegacyJapaneseFieldNames(payload: unknown): unknown {
  if (!isRecord(payload)) return payload;

  const migrated = structuredClone(payload) as Record<string, unknown>;

  migrateLegacyJapaneseArrayFields(migrated, 'instructors', [
    ['roleJp', 'role'],
    ['descJp', 'desc'],
  ]);
  migrateLegacyJapaneseArrayFields(migrated, 'locations', [
    ['nameJp', 'name'],
    ['addressJp', 'address'],
    ['accessJp', 'access'],
  ]);
  migrateLegacyJapaneseArrayFields(migrated, 'blog', [
    ['titleJp', 'title'],
    ['excerptJp', 'excerpt'],
    ['contentJp', 'content'],
    ['authorJp', 'author'],
  ]);

  return migrated;
}

function shouldMigrateJapaneseThemeItems(
  items: JapaneseCopyPayload['site']['home']['themes']['items'],
): boolean {
  if (items.length !== POPULAR_THEMES.length) {
    return false;
  }

  return items.every((item, index) => {
    const legacy = POPULAR_THEMES[index];
    return item.title === legacy.title && item.desc === legacy.desc;
  });
}

function normalizeJapaneseThemeItems(
  items: JapaneseCopyPayload['site']['home']['themes']['items'],
  rawItems: JapaneseThemeItem[] | null,
): JapaneseCopyPayload['site']['home']['themes']['items'] {
  const rawItemsBySlug = new Map(
    (rawItems ?? [])
      .filter((item) => typeof item.slug === 'string')
      .map((item) => [item.slug as string, item]),
  );
  const itemsBySlug = new Map(
    items
      .filter((item) => typeof item.slug === 'string')
      .map((item) => [item.slug as string, item]),
  );

  return POPULAR_THEMES_JP.map((theme, index) => {
    const legacySlug = LEGACY_THEME_SLUGS[theme.slug];
    const candidate =
      rawItemsBySlug.get(theme.slug) ??
      (legacySlug ? rawItemsBySlug.get(legacySlug) : undefined) ??
      itemsBySlug.get(theme.slug) ??
      (legacySlug ? itemsBySlug.get(legacySlug) : undefined) ??
      (items.length === POPULAR_THEMES_JP.length ? items[index] : undefined);

    return {
      ...theme,
      ...(candidate ?? {}),
      image: theme.image,
      slug: theme.slug,
    };
  });
}

function shouldMigrateJapaneseFaqs(faqs: JapaneseCopyPayload['faqs']): boolean {
  if (faqs.length !== defaultContent.faqs.length) {
    return false;
  }

  return faqs.every((faq, index) => {
    const legacy = defaultContent.faqs[index];
    return faq.question === legacy.question && faq.answer === legacy.answer;
  });
}

function migrateLegacyEnglishPageCopy(payload: JapaneseCopyPayload): void {
  const { site } = payload;
  const jp = defaultContent.jp;
  const en = defaultContent.en;

  if (site.pressPage.badge === en.pressPage.badge) site.pressPage.badge = jp.pressPage.badge;
  if (
    site.pressPage.title === en.pressPage.title ||
    site.pressPage.title === 'Media Coverage'
  ) {
    site.pressPage.title = jp.pressPage.title;
  }
  if (site.pressPage.subtitle === en.pressPage.subtitle) site.pressPage.subtitle = jp.pressPage.subtitle;
  if (site.pressPage.popupsTitle === en.pressPage.popupsTitle) {
    site.pressPage.popupsTitle = jp.pressPage.popupsTitle;
  }

  if (site.contactPage.badge === en.contactPage.badge) site.contactPage.badge = jp.contactPage.badge;
  if (site.contactPage.title === en.contactPage.title) site.contactPage.title = jp.contactPage.title;
  if (site.contactPage.notice1 === en.contactPage.notice1) site.contactPage.notice1 = jp.contactPage.notice1;
  if (site.contactPage.notice2 === en.contactPage.notice2) site.contactPage.notice2 = jp.contactPage.notice2;
  if (site.contactPage.faqTitle === en.contactPage.faqTitle) site.contactPage.faqTitle = jp.contactPage.faqTitle;
  if (site.contactPage.formTitle === en.contactPage.formTitle) site.contactPage.formTitle = jp.contactPage.formTitle;

  if (site.blogPage.title === en.blogPage.title) site.blogPage.title = jp.blogPage.title;
  if (site.blogPage.subtitle === en.blogPage.subtitle) site.blogPage.subtitle = jp.blogPage.subtitle;
  if (site.blogPage.readMore === en.blogPage.readMore) site.blogPage.readMore = jp.blogPage.readMore;
  if (site.blogPage.back === en.blogPage.back) site.blogPage.back = jp.blogPage.back;
}

const LEGACY_TEAM_BUILDING_LOGISTICS_NAMES: Record<string, string> = {
  'Artbar 銀座': 'Artbar Ginza',
  'Artbar Ginza(銀座スタジオ)': 'Artbar Ginza',
  'Artbar キャットストリート原宿': 'Artbar Cat Street Harajuku',
  'Artbar Cat Street Harajuku(原宿スタジオ)': 'Artbar Cat Street Harajuku',
  'Artbar 代官山': 'Artbar Daikanyama',
  'Artbar 横浜': 'Artbar Yokohama',
  'Artbar Yokohama Motomachi(横浜スタジオ)': 'Artbar Yokohama',
  '貴社オフィス／出張': 'Your Office / Offsite',
};

function migrateLegacyTeamBuildingLogisticsRows(payload: JapaneseCopyPayload): void {
  const targetsByName = new Map(
    TEAM_BUILDING_LOGISTICS_ROWS.map((row) => [row.name.en, row]),
  );

  payload.teamBuildingLogisticsRows = payload.teamBuildingLogisticsRows.map((row) => {
    const migratedName = LEGACY_TEAM_BUILDING_LOGISTICS_NAMES[row.name];
    const target = migratedName ? targetsByName.get(migratedName) : undefined;
    const name = target?.name.jp ?? row.name;
    const cap =
      name === 'Artbar Daikanyama' && row.cap === '最大10名'
        ? '最大12名'
        : row.cap;

    return { ...row, name, cap };
  });
}

export function normalizeJapaneseCopyPayload(payload: unknown): JapaneseCopyPayload {
  const migratedPayload = migrateLegacyJapaneseFieldNames(payload);
  const rawThemeItems = getRawJapaneseThemeItems(migratedPayload);
  const normalized = deepMergeTemplate(DEFAULT_COPY_PAYLOADS.jp, migratedPayload);

  // Older published JP copy records still contain English text for a few public
  // page headings. Upgrade only exact legacy English values so admin-edited JP
  // copy stays untouched.
  migrateLegacyEnglishPageCopy(normalized);
  migrateLegacyTeamBuildingLogisticsRows(normalized);

  // Older Japanese payloads stored the home theme cards from the English shared list.
  // Upgrade those exact legacy cards so the live site and copy admin both show JP text.
  if (shouldMigrateJapaneseThemeItems(normalized.site.home.themes.items)) {
    normalized.site.home.themes.items = structuredClone(POPULAR_THEMES_JP);
  }

  // Theme card slugs are hidden routing IDs. Keep Momo's visible copy, but prevent
  // edited or older payloads from sending customers to the wrong theme page.
  normalized.site.home.themes.items = normalizeJapaneseThemeItems(
    normalized.site.home.themes.items,
    rawThemeItems,
  );

  // Older Japanese payloads seeded FAQ entries from the English shared FAQ list.
  if (shouldMigrateJapaneseFaqs(normalized.faqs)) {
    normalized.faqs = structuredClone(FAQS_JP);
  }

  normalized.blog = normalized.blog.map((item) => ({
    ...item,
    content: sanitizeBlogHtml(item.content),
  }));

  return normalized;
}

export function normalizeCopyPayload(locale: CopyLocale, payload: unknown): LocalizedCopyPayload {
  if (locale === 'jp') {
    return normalizeJapaneseCopyPayload(payload);
  }

  const template = DEFAULT_COPY_PAYLOADS[locale];
  const normalized = deepMergeTemplate(template, payload);

  normalized.blog = normalized.blog.map((item) => ({
    ...item,
    content: sanitizeBlogHtml(item.content),
  }));

  return normalized;
}

export function mergePublishedLocaleIntoContent(
  locale: CopyLocale,
  payload: LocalizedCopyPayload,
): ContentData {
  const content = structuredClone(defaultContent);
  content[locale] = deepMergeTemplate(defaultContent[locale], payload.site);

  content.instructors = content.instructors.map((item) => {
    const copy = payload.instructors.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, roleEn: copy.role, descEn: copy.desc }
      : { ...item, roleJp: copy.role, descJp: copy.desc };
  });

  content.locations = content.locations.map((item) => {
    const copy = payload.locations.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, nameEn: copy.name, addressEn: copy.address, accessEn: copy.access }
      : { ...item, nameJp: copy.name, addressJp: copy.address, accessJp: copy.access };
  });

  content.blog = content.blog.map((item) => {
    const copy = payload.blog.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? {
          ...item,
          titleEn: copy.title,
          excerptEn: copy.excerpt,
          contentEn: sanitizeBlogHtml(copy.content),
          authorEn: copy.author,
        }
      : {
          ...item,
          titleJp: copy.title,
          excerptJp: copy.excerpt,
          contentJp: sanitizeBlogHtml(copy.content),
          authorJp: copy.author,
        };
  });

  return content;
}

export function mergePublishedIntoContent(payload: JapaneseCopyPayload): ContentData {
  return mergePublishedLocaleIntoContent('jp', payload);
}

export function buildResolvedCopy(locale: CopyLocale, payload: LocalizedCopyPayload): ResolvedJapaneseCopy {
  const legacyTeamBuildingRows = payload.teamBuildingLogisticsRows.length === TEAM_BUILDING_LOGISTICS_ROWS.length - 1;
  const daikanyamaIndex = TEAM_BUILDING_LOGISTICS_ROWS.findIndex(
    (item) => item.name.en === 'Artbar Daikanyama',
  );
  const getTeamBuildingLogisticsPayloadRow = (index: number) => {
    if (legacyTeamBuildingRows && daikanyamaIndex >= 0) {
      if (index === daikanyamaIndex) return undefined;
      if (index > daikanyamaIndex) return payload.teamBuildingLogisticsRows[index - 1];
    }

    return payload.teamBuildingLogisticsRows[index];
  };

  return {
    faqs: payload.faqs,
    teamBuildingTestimonials: payload.teamBuildingTestimonials,
    themePages: payload.themePages,
    locationShortLabels: LOCATION_SHORT_LABELS.map((item, index) => ({
      ...item,
      [locale]: payload.locationShortLabels[index] ?? item[locale],
    })),
    teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item, index) => {
      const payloadRow = getTeamBuildingLogisticsPayloadRow(index);

      return {
        ...item,
        name: {
          ...item.name,
          [locale]: payloadRow?.name ?? item.name[locale],
        },
        cap: {
          ...item.cap,
          [locale]: payloadRow?.cap ?? item.cap[locale],
        },
      };
    }),
    privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item, index) => ({
      ...item,
      name: {
        ...item.name,
        [locale]: payload.privatePartyCapacityRows[index]?.name ?? item.name[locale],
      },
      desc: {
        ...item.desc,
        [locale]: payload.privatePartyCapacityRows[index]?.desc ?? item.desc[locale],
      },
    })),
    ui: payload.ui,
  };
}

export function buildResolvedJapaneseCopy(payload: JapaneseCopyPayload): ResolvedJapaneseCopy {
  return buildResolvedCopy('jp', payload);
}
