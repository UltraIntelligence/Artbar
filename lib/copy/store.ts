import { createClient } from '@supabase/supabase-js';
import {
  COPY_LOCALE,
  COPY_TABLE,
  DEFAULT_JAPANESE_COPY_PAYLOAD,
  deepMergeTemplate,
} from '@/lib/copy/defaults';
import type {
  CopyEditorState,
  CopyRecord,
  JapaneseCopyPayload,
  ResolvedCopyBundle,
  ResolvedJapaneseCopy,
} from '@/lib/copy/types';
import {
  LOCATION_SHORT_LABELS,
  PRIVATE_PARTY_CAPACITY_ROWS,
  TEAM_BUILDING_LOGISTICS_ROWS,
} from '@/constants';
import { defaultContent } from '@/data/content';

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const key = getServiceRoleKey();
  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizePayload(payload: unknown): JapaneseCopyPayload {
  return deepMergeTemplate(DEFAULT_JAPANESE_COPY_PAYLOAD, payload);
}

function mergePublishedIntoContent(payload: JapaneseCopyPayload) {
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

function buildResolvedJapaneseCopy(payload: JapaneseCopyPayload): ResolvedJapaneseCopy {
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

async function readCopyRecord(): Promise<CopyRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(COPY_TABLE)
    .select('locale, draft_payload, published_payload, previous_published_payload, created_at, updated_at, published_at')
    .eq('locale', COPY_LOCALE)
    .maybeSingle();

  if (error) {
    console.error('[copy-store] failed to load copy record', error);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    draft_payload: normalizePayload(data.draft_payload),
    published_payload: normalizePayload(data.published_payload),
    previous_published_payload: data.previous_published_payload
      ? normalizePayload(data.previous_published_payload)
      : null,
  };
}

export function isCopyBackendConfigured() {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

export async function getResolvedCopyBundle(): Promise<ResolvedCopyBundle> {
  const record = await readCopyRecord();
  const published = record?.published_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;

  return {
    content: mergePublishedIntoContent(published),
    jpCopy: buildResolvedJapaneseCopy(published),
  };
}

export async function getCopyEditorState(): Promise<CopyEditorState> {
  const record = await readCopyRecord();

  return {
    draft: record?.draft_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD,
    published: record?.published_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD,
    previousPublished: record?.previous_published_payload ?? null,
    isConfigured: isCopyBackendConfigured(),
  };
}

export async function saveDraftPayload(payload: JapaneseCopyPayload) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord();
  const now = new Date().toISOString();
  const normalizedPayload = normalizePayload(payload);
  const published = existing?.published_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale: COPY_LOCALE,
      draft_payload: normalizedPayload,
      published_payload: published,
      previous_published_payload: existing?.previous_published_payload ?? null,
      updated_at: now,
      published_at: existing?.published_at ?? null,
    },
    { onConflict: 'locale' },
  );

  if (error) {
    console.error('[copy-store] failed to save draft payload', error);
    throw new Error('Failed to save draft copy.');
  }

  return normalizedPayload;
}

export async function publishDraftPayload() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord();
  const now = new Date().toISOString();
  const draft = existing?.draft_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;
  const published = existing?.published_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale: COPY_LOCALE,
      draft_payload: draft,
      published_payload: draft,
      previous_published_payload: published,
      updated_at: now,
      published_at: now,
    },
    { onConflict: 'locale' },
  );

  if (error) {
    console.error('[copy-store] failed to publish draft payload', error);
    throw new Error('Failed to publish Japanese copy.');
  }

  return {
    draft,
    published: draft,
    previousPublished: published,
  };
}

export async function rollbackPublishedPayload() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord();
  const previous = existing?.previous_published_payload;
  if (!previous) {
    throw new Error('No previous published version is available to roll back.');
  }

  const currentPublished = existing?.published_payload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;
  const now = new Date().toISOString();

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale: COPY_LOCALE,
      draft_payload: previous,
      published_payload: previous,
      previous_published_payload: currentPublished,
      updated_at: now,
      published_at: now,
    },
    { onConflict: 'locale' },
  );

  if (error) {
    console.error('[copy-store] failed to roll back payload', error);
    throw new Error('Failed to roll back Japanese copy.');
  }

  return {
    draft: previous,
    published: previous,
    previousPublished: currentPublished,
  };
}
