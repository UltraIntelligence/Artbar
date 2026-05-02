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
  DEFAULT_JAPANESE_COPY_PAYLOAD,
  deepMergeTemplate,
} from '@/lib/copy/defaults';
import type {
  JapaneseCopyPayload,
  ResolvedJapaneseCopy,
} from '@/lib/copy/types';
import type { ContentData } from '@/types';

type JapaneseThemeItem = JapaneseCopyPayload['site']['home']['themes']['items'][number];

function getRawJapaneseThemeItems(payload: unknown): JapaneseThemeItem[] | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const site = (payload as { site?: unknown }).site;
  if (typeof site !== 'object' || site === null) return null;
  const home = (site as { home?: unknown }).home;
  if (typeof home !== 'object' || home === null) return null;
  const themes = (home as { themes?: unknown }).themes;
  if (typeof themes !== 'object' || themes === null) return null;
  const items = (themes as { items?: unknown }).items;
  return Array.isArray(items) ? (items as JapaneseThemeItem[]) : null;
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
    const candidate =
      rawItemsBySlug.get(theme.slug) ??
      itemsBySlug.get(theme.slug) ??
      (items.length === POPULAR_THEMES_JP.length ? items[index] : undefined);

    return {
      ...theme,
      ...(candidate ?? {}),
      image: theme.image,
      slug: theme.slug,
      bookingUrl: theme.bookingUrl,
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

export function normalizeJapaneseCopyPayload(payload: unknown): JapaneseCopyPayload {
  const rawThemeItems = getRawJapaneseThemeItems(payload);
  const normalized = deepMergeTemplate(DEFAULT_JAPANESE_COPY_PAYLOAD, payload);

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

  return normalized;
}

export function mergePublishedIntoContent(payload: JapaneseCopyPayload): ContentData {
  const content = structuredClone(defaultContent);
  content.jp = deepMergeTemplate(defaultContent.jp, payload.site);

  const instructorsById = new Map(payload.instructors.map((item) => [item.id, item]));
  content.instructors = content.instructors.map((item) => {
    const copy = instructorsById.get(item.id);
    return copy
      ? {
          ...item,
          roleJp: copy.roleJp,
          descJp: copy.descJp,
        }
      : item;
  });

  const locationsById = new Map(payload.locations.map((item) => [item.id, item]));
  content.locations = content.locations.map((item) => {
    const copy = locationsById.get(item.id);
    return copy
      ? {
          ...item,
          nameJp: copy.nameJp,
          addressJp: copy.addressJp,
          accessJp: copy.accessJp,
        }
      : item;
  });

  const blogById = new Map(payload.blog.map((item) => [item.id, item]));
  content.blog = content.blog.map((item) => {
    const copy = blogById.get(item.id);
    return copy
      ? {
          ...item,
          titleJp: copy.titleJp,
          excerptJp: copy.excerptJp,
          contentJp: copy.contentJp,
          authorJp: copy.authorJp,
        }
      : item;
  });

  return content;
}

export function buildResolvedJapaneseCopy(payload: JapaneseCopyPayload): ResolvedJapaneseCopy {
  return {
    faqs: payload.faqs,
    teamBuildingTestimonials: payload.teamBuildingTestimonials,
    themePages: payload.themePages,
    locationShortLabels: LOCATION_SHORT_LABELS.map((item, index) => ({
      ...item,
      jp: payload.locationShortLabels[index] ?? item.jp,
    })),
    teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item, index) => ({
      ...item,
      name: {
        ...item.name,
        jp: payload.teamBuildingLogisticsRows[index]?.name ?? item.name.jp,
      },
      cap: {
        ...item.cap,
        jp: payload.teamBuildingLogisticsRows[index]?.cap ?? item.cap.jp,
      },
    })),
    privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item, index) => ({
      ...item,
      name: {
        ...item.name,
        jp: payload.privatePartyCapacityRows[index]?.name ?? item.name.jp,
      },
      desc: {
        ...item.desc,
        jp: payload.privatePartyCapacityRows[index]?.desc ?? item.desc.jp,
      },
    })),
    ui: payload.ui,
  };
}
