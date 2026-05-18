import { createClient } from '@supabase/supabase-js';
import { revalidateTag, unstable_cache } from 'next/cache';
import {
  COPY_LOCALES,
  COPY_TABLE,
  DEFAULT_COPY_PAYLOADS,
} from '@/lib/copy/defaults';
import type {
  CopyLocale,
  CopyEditorState,
  CopyRecord,
  ResolvedCopyBundle,
} from '@/lib/copy/types';
import {
  buildResolvedJapaneseCopy,
  mergePublishedLocaleIntoContent,
  normalizeCopyPayload,
} from '@/lib/copy/resolve';

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

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | null> {
  if (timeoutMs <= 0) {
    return promise.then((value) => value);
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    promise
      .then((value) => resolve(value))
      .catch(() => resolve(null))
      .finally(() => clearTimeout(timer));
  });
}

const publishedCopyCacheTag = (locale: CopyLocale) => `artbar-published-${locale}-copy`;

const readPublishedCopyRecord = (locale: CopyLocale) =>
  unstable_cache(
    async () => {
      const record = await readCopyRecord(locale);
      if (!record) {
        throw new Error(`Published ${locale} copy is unavailable.`);
      }
      return record;
    },
    [`artbar-published-${locale}-copy-v1`],
    {
      tags: [publishedCopyCacheTag(locale)],
      revalidate: 60,
    },
  )();

export function parseCopyLocale(value: unknown): CopyLocale {
  return value === 'en' || value === 'jp' ? value : 'jp';
}

async function readCopyRecord(locale: CopyLocale): Promise<CopyRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(COPY_TABLE)
    .select('locale, draft_payload, published_payload, previous_published_payload, created_at, updated_at, published_at')
    .eq('locale', locale)
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
    locale,
    draft_payload: normalizeCopyPayload(locale, data.draft_payload),
    published_payload: normalizeCopyPayload(locale, data.published_payload),
    previous_published_payload: data.previous_published_payload
      ? normalizeCopyPayload(locale, data.previous_published_payload)
      : null,
  };
}

export function isCopyBackendConfigured() {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

export async function getPublishedCopyPayload(
  locale: CopyLocale,
  options?: { timeoutMs?: number },
) {
  const record = options?.timeoutMs
    ? await withTimeout(readPublishedCopyRecord(locale), options.timeoutMs)
    : await readPublishedCopyRecord(locale).catch(() => null);

  return record?.published_payload ?? null;
}

export async function getPublishedJapaneseCopyPayload(options?: { timeoutMs?: number }) {
  return getPublishedCopyPayload('jp', options);
}

export async function getResolvedCopyBundle(): Promise<ResolvedCopyBundle> {
  const published =
    (await getPublishedCopyPayload('jp')) ?? DEFAULT_COPY_PAYLOADS.jp;

  return {
    content: mergePublishedLocaleIntoContent('jp', published),
    jpCopy: buildResolvedJapaneseCopy(published),
  };
}

export async function getCopyEditorState(): Promise<CopyEditorState> {
  const entries = await Promise.all(
    COPY_LOCALES.map(async (locale) => {
      const record = await readCopyRecord(locale);
      return [
        locale,
        {
          draft: record?.draft_payload ?? DEFAULT_COPY_PAYLOADS[locale],
          published: record?.published_payload ?? DEFAULT_COPY_PAYLOADS[locale],
          previousPublished: record?.previous_published_payload ?? null,
        },
      ] as const;
    }),
  );

  return {
    locales: Object.fromEntries(entries) as CopyEditorState['locales'],
    isConfigured: isCopyBackendConfigured(),
  };
}

export async function saveDraftPayload(locale: CopyLocale, payload: unknown) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord(locale);
  const now = new Date().toISOString();
  const normalizedPayload = normalizeCopyPayload(locale, payload);
  const published = existing?.published_payload ?? DEFAULT_COPY_PAYLOADS[locale];

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale,
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

export async function publishDraftPayload(locale: CopyLocale) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord(locale);
  const now = new Date().toISOString();
  const draft = existing?.draft_payload ?? DEFAULT_COPY_PAYLOADS[locale];
  const published = existing?.published_payload ?? DEFAULT_COPY_PAYLOADS[locale];

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale,
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
    throw new Error(`Failed to publish ${locale} copy.`);
  }

  revalidateTag(publishedCopyCacheTag(locale));

  return {
    draft,
    published: draft,
    previousPublished: published,
  };
}

export async function rollbackPublishedPayload(locale: CopyLocale) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase backend is not configured.');
  }

  const existing = await readCopyRecord(locale);
  const previous = existing?.previous_published_payload;
  if (!previous) {
    throw new Error('No previous published version is available to roll back.');
  }

  const currentPublished = existing?.published_payload ?? DEFAULT_COPY_PAYLOADS[locale];
  const now = new Date().toISOString();

  const { error } = await supabase.from(COPY_TABLE).upsert(
    {
      locale,
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
    throw new Error(`Failed to roll back ${locale} copy.`);
  }

  revalidateTag(publishedCopyCacheTag(locale));

  return {
    draft: previous,
    published: previous,
    previousPublished: currentPublished,
  };
}
