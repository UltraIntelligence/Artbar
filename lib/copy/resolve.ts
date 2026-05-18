import {
  LOCATION_SHORT_LABELS,
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

export function normalizeJapaneseCopyPayload(payload: unknown): JapaneseCopyPayload {
  const migratedPayload = migrateLegacyJapaneseFieldNames(payload);
  const rawThemeItems = getRawJapaneseThemeItems(migratedPayload);
  const normalized = deepMergeTemplate(DEFAULT_COPY_PAYLOADS.jp, migratedPayload);

  // Theme card slugs are hidden routing IDs. Keep Momo's visible copy, but prevent
  // edited or older payloads from sending customers to the wrong theme page.
  normalized.site.home.themes.items = normalizeJapaneseThemeItems(
    normalized.site.home.themes.items,
    rawThemeItems,
  );

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

  const instructorsById = new Map(payload.instructors.map((item) => [item.id, item]));
  content.instructors = content.instructors.map((item) => {
    const copy = instructorsById.get(item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, roleEn: copy.role, descEn: copy.desc }
      : { ...item, roleJp: copy.role, descJp: copy.desc };
  });

  const locationsById = new Map(payload.locations.map((item) => [item.id, item]));
  content.locations = content.locations.map((item) => {
    const copy = locationsById.get(item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, nameEn: copy.name, addressEn: copy.address, accessEn: copy.access }
      : { ...item, nameJp: copy.name, addressJp: copy.address, accessJp: copy.access };
  });

  const blogById = new Map(payload.blog.map((item) => [item.id, item]));
  content.blog = content.blog.map((item) => {
    const copy = blogById.get(item.id);
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
