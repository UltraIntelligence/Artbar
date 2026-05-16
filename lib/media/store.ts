import { createClient } from '@supabase/supabase-js';
import { revalidateTag, unstable_cache } from 'next/cache';
import { MEDIA_SLOTS } from './slots';
import type {
  MediaAsset,
  MediaAssetFile,
  MediaEditorPageState,
  MediaEditorState,
  MediaOverrideRecord,
  PublishedMediaMap,
} from './types';

const MEDIA_TABLE = 'site_media_overrides';
const MEDIA_BUCKET = 'artbar-site-media';
const PUBLISHED_MEDIA_CACHE_TAG = 'artbar-published-site-media';

type MediaOverrideRow = {
  slot_key: string;
  draft_asset: unknown | null;
  published_asset: unknown | null;
  previous_published_asset: unknown | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

type ReadMediaRecordsOptions = {
  throwOnError?: boolean;
};

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeMediaAssetFile(value: unknown): MediaAssetFile | undefined {
  if (!isRecord(value) || typeof value.url !== 'string') {
    return undefined;
  }

  return {
    url: value.url,
    storagePath: typeof value.storagePath === 'string' ? value.storagePath : undefined,
    width: typeof value.width === 'number' ? value.width : undefined,
    height: typeof value.height === 'number' ? value.height : undefined,
    mimeType: typeof value.mimeType === 'string' ? value.mimeType : undefined,
    sizeBytes: typeof value.sizeBytes === 'number' ? value.sizeBytes : undefined,
  };
}

function normalizeMediaAsset(value: unknown): MediaAsset | null {
  if (!isRecord(value) || typeof value.url !== 'string') {
    return null;
  }

  const renditions = isRecord(value.renditions)
    ? Object.fromEntries(
        Object.entries(value.renditions)
          .map(([key, file]) => [key, normalizeMediaAssetFile(file)])
          .filter((entry): entry is [string, MediaAssetFile] => Boolean(entry[1])),
      )
    : undefined;

  return {
    url: value.url,
    storagePath: typeof value.storagePath === 'string' ? value.storagePath : undefined,
    width: typeof value.width === 'number' ? value.width : undefined,
    height: typeof value.height === 'number' ? value.height : undefined,
    mimeType: typeof value.mimeType === 'string' ? value.mimeType : undefined,
    sizeBytes: typeof value.sizeBytes === 'number' ? value.sizeBytes : undefined,
    alt: typeof value.alt === 'string' ? value.alt : undefined,
    uploadedAt: typeof value.uploadedAt === 'string' ? value.uploadedAt : undefined,
    original: normalizeMediaAssetFile(value.original),
    renditions,
  };
}

function normalizeMediaRecord(row: MediaOverrideRow): MediaOverrideRecord {
  return {
    slotKey: row.slot_key,
    draftAsset: normalizeMediaAsset(row.draft_asset),
    publishedAsset: normalizeMediaAsset(row.published_asset),
    previousPublishedAsset: normalizeMediaAsset(row.previous_published_asset),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

function areSameMediaAssets(
  first: MediaAsset | null | undefined,
  second: MediaAsset | null | undefined,
) {
  return JSON.stringify(first ?? null) === JSON.stringify(second ?? null);
}

async function readMediaRecords(
  options: ReadMediaRecordsOptions = {},
): Promise<MediaOverrideRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(MEDIA_TABLE)
    .select('slot_key, draft_asset, published_asset, previous_published_asset, created_at, updated_at, published_at')
    .order('slot_key', { ascending: true });

  if (error) {
    console.error('[media-store] failed to load media records', error);
    if (options.throwOnError) {
      throw new Error('Failed to load site images. Please try again.');
    }
    return [];
  }

  return (data ?? []).map((row) => normalizeMediaRecord(row as MediaOverrideRow));
}

async function readPublishedMediaMap(): Promise<PublishedMediaMap> {
  const records = await readMediaRecords({ throwOnError: true });
  return Object.fromEntries(
    records
      .filter((record) => record.publishedAsset)
      .map((record) => [record.slotKey, record.publishedAsset as MediaAsset]),
  );
}

const readCachedPublishedMediaMap = unstable_cache(
  readPublishedMediaMap,
  ['artbar-published-site-media-v1'],
  {
    tags: [PUBLISHED_MEDIA_CACHE_TAG],
    revalidate: 60,
  },
);

export function isMediaBackendConfigured() {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

export async function getPublishedMediaMap(): Promise<PublishedMediaMap> {
  return readCachedPublishedMediaMap().catch(() => ({}));
}

export async function getMediaEditorState(): Promise<MediaEditorState> {
  const mediaRecords = await readMediaRecords({ throwOnError: true });
  const records = new Map(mediaRecords.map((record) => [record.slotKey, record]));
  const publishedMedia = Object.fromEntries(
    mediaRecords
      .filter((record) => record.publishedAsset)
      .map((record) => [record.slotKey, record.publishedAsset as MediaAsset]),
  );
  const isConfigured = isMediaBackendConfigured();
  const pages = new Map<string, MediaEditorPageState>();

  for (const slot of MEDIA_SLOTS) {
    const record = records.get(slot.key);
    const draftAsset = record?.draftAsset ?? null;
    const publishedAsset = record?.publishedAsset ?? null;

    if (!pages.has(slot.pageKey)) {
      pages.set(slot.pageKey, {
        pageKey: slot.pageKey,
        pageLabel: slot.pageLabel,
        slots: [],
      });
    }

    pages.get(slot.pageKey)?.slots.push({
      slot,
      draftAsset,
      publishedAsset,
      previousPublishedAsset: record?.previousPublishedAsset ?? null,
      fallbackAsset: {
        url: slot.fallbackUrl,
        alt: slot.label,
        renditions: Object.fromEntries(
          slot.variants
            .filter((variant) => variant.fallbackUrl)
            .map((variant) => [
              variant.key,
              {
                url: variant.fallbackUrl as string,
              },
            ]),
        ),
      },
      isDirty: !areSameMediaAssets(draftAsset, publishedAsset),
      isConfigured,
    });
  }

  return {
    pages: Array.from(pages.values()),
    publishedMedia,
  };
}

export async function uploadProcessedMediaFile(path: string, buffer: Buffer, contentType: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Media storage is not configured.');
  }

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    console.error('[media-store] failed to upload media file', error);
    throw new Error('Failed to upload the image. Please try again.');
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveDraftMediaAsset(slotKey: string, asset: MediaAsset) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Media storage is not configured.');
  }

  const existing = (await readMediaRecords({ throwOnError: true })).find(
    (record) => record.slotKey === slotKey,
  );
  const now = new Date().toISOString();

  const { error } = await supabase.from(MEDIA_TABLE).upsert(
    {
      slot_key: slotKey,
      draft_asset: asset,
      published_asset: existing?.publishedAsset ?? null,
      previous_published_asset: existing?.previousPublishedAsset ?? null,
      updated_at: now,
      published_at: existing?.publishedAt ?? null,
    },
    { onConflict: 'slot_key' },
  );

  if (error) {
    console.error('[media-store] failed to save draft media asset', error);
    throw new Error('Failed to save the draft image.');
  }

  return asset;
}

export async function publishDraftMediaAssets() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Media storage is not configured.');
  }

  const records = (await readMediaRecords({ throwOnError: true })).filter(
    (record) => record.draftAsset && !areSameMediaAssets(record.draftAsset, record.publishedAsset),
  );
  if (records.length === 0) {
    return getMediaEditorState();
  }

  const now = new Date().toISOString();
  const rows = records.map((record) => ({
    slot_key: record.slotKey,
    draft_asset: record.draftAsset,
    published_asset: record.draftAsset,
    previous_published_asset: record.publishedAsset,
    updated_at: now,
    published_at: now,
  }));

  const { error } = await supabase.from(MEDIA_TABLE).upsert(rows, { onConflict: 'slot_key' });
  if (error) {
    console.error('[media-store] failed to publish media assets', error);
    throw new Error('Failed to publish image changes.');
  }

  revalidateTag(PUBLISHED_MEDIA_CACHE_TAG);
  return getMediaEditorState();
}

export async function rollbackPublishedMediaAssets() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Media storage is not configured.');
  }

  const records = (await readMediaRecords({ throwOnError: true })).filter(
    (record) =>
      record.previousPublishedAsset &&
      !areSameMediaAssets(record.previousPublishedAsset, record.publishedAsset),
  );
  if (records.length === 0) {
    throw new Error('No previous published images are available to roll back.');
  }

  const now = new Date().toISOString();
  const rows = records.map((record) => {
    const previous = record.previousPublishedAsset as MediaAsset;
    return {
      slot_key: record.slotKey,
      draft_asset: previous,
      published_asset: previous,
      previous_published_asset: record.publishedAsset,
      updated_at: now,
      published_at: now,
    };
  });

  const { error } = await supabase.from(MEDIA_TABLE).upsert(rows, { onConflict: 'slot_key' });
  if (error) {
    console.error('[media-store] failed to roll back media assets', error);
    throw new Error('Failed to roll back image changes.');
  }

  revalidateTag(PUBLISHED_MEDIA_CACHE_TAG);
  return getMediaEditorState();
}
