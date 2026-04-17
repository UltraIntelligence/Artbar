import { createClient } from '@supabase/supabase-js';
import {
  COPY_LOCALE,
  COPY_TABLE,
  DEFAULT_JAPANESE_COPY_PAYLOAD,
} from '@/lib/copy/defaults';
import type {
  CopyEditorState,
  CopyRecord,
  JapaneseCopyPayload,
  ResolvedCopyBundle,
} from '@/lib/copy/types';
import {
  buildResolvedJapaneseCopy,
  mergePublishedIntoContent,
  normalizeJapaneseCopyPayload,
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
    draft_payload: normalizeJapaneseCopyPayload(data.draft_payload),
    published_payload: normalizeJapaneseCopyPayload(data.published_payload),
    previous_published_payload: data.previous_published_payload
      ? normalizeJapaneseCopyPayload(data.previous_published_payload)
      : null,
  };
}

export function isCopyBackendConfigured() {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

export async function getPublishedJapaneseCopyPayload(options?: { timeoutMs?: number }) {
  const record = options?.timeoutMs
    ? await withTimeout(readCopyRecord(), options.timeoutMs)
    : await readCopyRecord();

  return record?.published_payload ?? null;
}

export async function getResolvedCopyBundle(): Promise<ResolvedCopyBundle> {
  const published =
    (await getPublishedJapaneseCopyPayload()) ?? DEFAULT_JAPANESE_COPY_PAYLOAD;

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
  const normalizedPayload = normalizeJapaneseCopyPayload(payload);
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
