'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { MediaAsset, MediaEditorSlotState, MediaEditorState } from '@/lib/media/types';

type MediaAdminProps = {
  initialState: MediaEditorState;
};

type UploadResponse = {
  state: MediaEditorState;
};

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;

const isVideoUrl = (url?: string | null) => Boolean(url?.split('?')[0]?.toLowerCase().match(/\.(mp4|webm|mov|m4v)$/));

const sameAsset = (first: MediaAsset | null | undefined, second: MediaAsset | null | undefined) =>
  JSON.stringify(first ?? null) === JSON.stringify(second ?? null);

const formatBytes = (value?: number) => {
  if (!value) return null;
  if (value >= 1024 * 1024) return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  if (value >= 1024) return `${Math.round(value / 1024)} KB`;
  return `${value} B`;
};

const getRecommendedSize = (slotState: MediaEditorSlotState) => {
  const sized = slotState.slot.variants
    .map((variant) => {
      if (variant.width && variant.height) {
        return `${variant.label}: ${variant.width} x ${variant.height}`;
      }
      if (variant.width) return `${variant.label}: ${variant.width}px wide`;
      if (variant.height) return `${variant.label}: ${variant.height}px tall`;
      return null;
    })
    .filter(Boolean);

  return sized.length > 0 ? sized.join(' / ') : 'Flexible size';
};

async function postJson<T>(url: string) {
  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Request failed.');
  }
  return response.json() as Promise<T>;
}

const Preview = ({
  asset,
  label,
}: {
  asset: MediaAsset | null;
  label: string;
}) => {
  const url = asset?.url;

  return (
    <div className="min-w-0 space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-artbar-gray">{label}</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-artbar-bg">
        {url && !isVideoUrl(url) ? (
          <Image
            src={url}
            alt={asset?.alt || label}
            fill
            sizes="(min-width: 1024px) 240px, 50vw"
            className="object-cover"
            unoptimized={url.endsWith('.svg')}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs leading-5 text-artbar-gray">
            {url ? 'Video fallback. Replace with an image to preview here.' : 'No image yet.'}
          </div>
        )}
      </div>
      <p className="truncate text-[11px] leading-5 text-artbar-gray" title={url || 'No URL'}>
        {url || 'No URL'}
      </p>
      {asset?.width && asset.height ? (
        <p className="text-[11px] text-artbar-gray">
          {asset.width} x {asset.height}
          {asset.sizeBytes ? ` - ${formatBytes(asset.sizeBytes)}` : ''}
        </p>
      ) : null}
    </div>
  );
};

export const MediaAdmin: React.FC<MediaAdminProps> = ({ initialState }) => {
  const [state, setState] = useState(initialState);
  const [activePageKey, setActivePageKey] = useState(initialState.pages[0]?.pageKey ?? '');
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const activePage = useMemo(
    () => state.pages.find((page) => page.pageKey === activePageKey) ?? state.pages[0],
    [activePageKey, state.pages],
  );

  const isConfigured = state.pages.some((page) => page.slots.some((slotState) => slotState.isConfigured));
  const hasDirtyImages = state.pages.some((page) => page.slots.some((slotState) => slotState.isDirty));
  const hasRollbackImages = state.pages.some((page) =>
    page.slots.some((slotState) => Boolean(slotState.previousPublishedAsset)),
  );
  const isBusy = Boolean(pending);

  const handleUpload = async (slotState: MediaEditorSlotState, file: File | undefined) => {
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      setStatus('That image is over 30MB. Please choose a smaller JPEG, PNG, WebP, or AVIF file.');
      return;
    }

    if (!slotState.slot.acceptedMimeTypes.includes(file.type)) {
      setStatus('Please choose a JPEG, PNG, WebP, or AVIF image.');
      return;
    }

    const formData = new FormData();
    formData.append('slotKey', slotState.slot.key);
    formData.append('alt', slotState.slot.label);
    formData.append('file', file);

    setPending(slotState.slot.key);
    setStatus(`Uploading ${slotState.slot.label}...`);
    try {
      const response = await fetch('/api/media-admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Upload failed.');
      }
      const data = (await response.json()) as UploadResponse;
      setState(data.state);
      setStatus(`${slotState.slot.label} draft uploaded. Publish images when you are ready to make it live.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setPending(null);
      const input = fileInputs.current[slotState.slot.key];
      if (input) input.value = '';
    }
  };

  const handlePublish = async () => {
    if (!hasDirtyImages) {
      setStatus('Nothing new to publish. The draft images already match the live site.');
      return;
    }

    setPending('publish');
    setStatus('Publishing image drafts...');
    try {
      const nextState = await postJson<MediaEditorState>('/api/media-admin/publish');
      setState(nextState);
      setStatus('Published image drafts. Customer pages now use the live images.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Publish failed.');
    } finally {
      setPending(null);
    }
  };

  const handleRollback = async () => {
    if (!hasRollbackImages) {
      setStatus('There are no previous live images to roll back to yet.');
      return;
    }

    if (!window.confirm('Roll live images back to the previous published version?')) {
      return;
    }

    setPending('rollback');
    setStatus('Rolling back live images...');
    try {
      const nextState = await postJson<MediaEditorState>('/api/media-admin/rollback');
      setState(nextState);
      setStatus('Rolled live images back to the previous publish.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Rollback failed.');
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="min-h-screen bg-artbar-bg">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 md:px-8 lg:flex-row">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[20rem] lg:shrink-0">
          <div className="rounded-[2rem] border border-artbar-light-taupe/20 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">Image Admin</p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-artbar-navy">Site Images</h1>
            <p className="mt-3 text-sm leading-6 text-artbar-gray">
              Replace images by page. Uploads are drafts until you publish them.
            </p>
            <Link
              href="/copy-admin"
              className="mt-5 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border-2 border-artbar-navy px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-artbar-navy transition hover:bg-gray-50"
            >
              Back to Copy Editor
            </Link>

            <div className="mt-6 space-y-2">
              {state.pages.map((page) => {
                const pageHasDraft = page.slots.some((slotState) => slotState.isDirty);
                return (
                  <button
                    key={page.pageKey}
                    type="button"
                    onClick={() => setActivePageKey(page.pageKey)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                      page.pageKey === activePage?.pageKey
                        ? 'bg-artbar-navy text-white shadow-md'
                        : 'bg-artbar-bg text-artbar-navy hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">{page.pageLabel}</span>
                      {pageHasDraft ? (
                        <span className="rounded-full bg-artbar-taupe px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          Draft
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="rounded-[2rem] border border-artbar-light-taupe/20 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">
                  {activePage?.pageLabel ?? 'Images'}
                </p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-artbar-navy">Images in page order</h2>
                <p className="mt-2 text-sm text-artbar-gray">
                  Live is what customers see now. Draft is the replacement waiting to be published.
                </p>
                {!isConfigured ? (
                  <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Media storage is not configured yet, so image actions are disabled.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="taupe"
                  onClick={handlePublish}
                  disabled={isBusy || !isConfigured || !hasDirtyImages}
                >
                  Publish Images
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRollback}
                  disabled={isBusy || !isConfigured || !hasRollbackImages}
                >
                  Roll Back Images
                </Button>
                <form action="/api/copy-admin/logout" method="post">
                  <Button type="submit" variant="outline" disabled={isBusy}>
                    Log Out
                  </Button>
                </form>
                <p className="basis-full text-xs leading-5 text-artbar-gray">
                  Upload first, then publish once. Draft images stay off the live site until then.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className={`text-sm ${hasDirtyImages ? 'text-artbar-taupe' : 'text-artbar-gray'}`}>
                {hasDirtyImages
                  ? 'You have image drafts waiting to publish.'
                  : 'Everything uploaded already matches the live site.'}
              </p>
              {status ? <p className="text-sm text-artbar-navy">{status}</p> : null}
            </div>

            <div className="mt-8 space-y-4">
              {(activePage?.slots ?? []).map((slotState, index) => {
                const liveAsset = slotState.publishedAsset ?? slotState.fallbackAsset;
                const hasDraftPreview = Boolean(slotState.draftAsset) && !sameAsset(slotState.draftAsset, liveAsset);
                const slotPending = pending === slotState.slot.key;

                return (
                  <section
                    key={slotState.slot.key}
                    className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
                  >
                    <div className="min-w-0 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-artbar-bg text-sm font-bold text-artbar-navy">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-heading text-xl font-bold text-artbar-navy">{slotState.slot.label}</h3>
                          <p className="mt-1 text-sm leading-6 text-artbar-gray">{slotState.slot.helpText}</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-artbar-bg px-4 py-3 text-xs leading-5 text-artbar-gray">
                        <p>
                          <span className="font-bold text-artbar-navy">Recommended:</span> {getRecommendedSize(slotState)}
                        </p>
                        <p className="mt-1 truncate" title={slotState.slot.sourcePath ?? slotState.slot.key}>
                          Source: {slotState.slot.sourcePath ?? slotState.slot.key}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          ref={(node) => {
                            fileInputs.current[slotState.slot.key] = node;
                          }}
                          type="file"
                          accept={slotState.slot.acceptedMimeTypes.join(',')}
                          className="hidden"
                          onChange={(event) => handleUpload(slotState, event.target.files?.[0])}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputs.current[slotState.slot.key]?.click()}
                          disabled={isBusy || !slotState.isConfigured}
                        >
                          {slotPending ? 'Uploading...' : 'Replace'}
                        </Button>
                        {slotState.isDirty ? (
                          <span className="rounded-full bg-artbar-taupe px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                            Draft waiting
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid min-w-0 gap-4 md:grid-cols-2">
                      <Preview asset={liveAsset} label={slotState.publishedAsset ? 'Live now' : 'Fallback'} />
                      {hasDraftPreview ? (
                        <Preview asset={slotState.draftAsset} label="Draft replacement" />
                      ) : (
                        <div className="min-w-0 space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-artbar-gray">Draft replacement</p>
                          <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-4 text-center text-xs leading-5 text-artbar-gray">
                            No different draft image.
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
