'use client';

import React, { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { COPY_ADMIN_FIELD_LABELS, COPY_ADMIN_SECTIONS } from '@/lib/copy/defaults';
import type {
  CopyEditorState,
  CopyLocale,
  LocalizedCopyPayload,
  LocaleCopyEditorState,
} from '@/lib/copy/types';

type CopyAdminProps = CopyEditorState;
type LocalEditorRuntimeState = LocaleCopyEditorState & { savedDraft: LocalizedCopyPayload };
type CopyAdminRuntimeState = Record<CopyLocale, LocalEditorRuntimeState>;

const getAtPath = (obj: unknown, path: ReadonlyArray<string>) =>
  path.reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

const setAtPath = (obj: unknown, path: ReadonlyArray<string>, value: string): unknown => {
  if (path.length === 0) {
    return value;
  }

  if (Array.isArray(obj)) {
    const clone = [...obj];
    const index = Number(path[0]);
    clone[index] = setAtPath(clone[index], path.slice(1), value);
    return clone;
  }

  const clone = { ...(obj as Record<string, unknown>) };
  clone[path[0]] = setAtPath(clone[path[0]], path.slice(1), value);
  return clone;
};

const humanizeKey = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\bcta\b/gi, 'CTA')
    .replace(/\bp(\d+)\b/gi, 'Paragraph $1')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\bjp\b/gi, 'JP')
    .replace(/\ben\b/gi, 'EN')
    .replace(/\bseo\b/gi, 'SEO')
    .replace(/\bfaqs\b/gi, 'FAQs')
    .replace(/\bai\b/gi, 'AI')
    .replace(/\bbtn\b/gi, 'Button')
    .replace(/\bui\b/gi, 'UI')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());

const getArrayItemLabel = (item: unknown, index: number) => {
  if (!item || typeof item !== 'object') {
    return `Item ${index + 1}`;
  }

  const record = item as Record<string, unknown>;
  const preferred =
    record.slug ||
    record.id ||
    record.nameJp ||
    record.titleJp ||
    record.name ||
    record.title ||
    record.value;

  return preferred ? String(preferred) : `Item ${index + 1}`;
};

const getTextareaRows = (value: string) => {
  const lineCount = value.split('\n').length;
  return Math.max(3, Math.min(12, lineCount + 1));
};

const jsonEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const getLocaleLabel = (locale: CopyLocale) => (locale === 'en' ? 'English' : 'Japanese');

async function postJson<T>(url: string, body?: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Request failed.');
  }

  return response.json() as Promise<T>;
}

export const CopyAdmin: React.FC<CopyAdminProps> = ({
  locales,
  isConfigured,
}) => {
  const [runtimeState, setRuntimeState] = useState<CopyAdminRuntimeState>(() => ({
    en: {
      ...locales.en,
      savedDraft: locales.en.draft,
    },
    jp: {
      ...locales.jp,
      savedDraft: locales.jp.draft,
    },
  }));
  const [activeLocale, setActiveLocale] = useState<CopyLocale>('en');
  const [activeSection, setActiveSection] = useState<string>(COPY_ADMIN_SECTIONS[0]?.id ?? 'shared');
  const [showAdvancedPaths, setShowAdvancedPaths] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeState = runtimeState[activeLocale];
  const { draft, savedDraft, published, previousPublished: previousLive } = activeState;
  const activeLocaleLabel = getLocaleLabel(activeLocale);
  const previewHref = activeLocale === 'en' ? '/en' : '/';

  const selectedSection = useMemo(
    () => COPY_ADMIN_SECTIONS.find((section) => section.id === activeSection) ?? COPY_ADMIN_SECTIONS[0],
    [activeSection],
  );

  const updateLocaleState = (
    locale: CopyLocale,
    updater: (current: LocalEditorRuntimeState) => LocalEditorRuntimeState,
  ) => {
    setRuntimeState((current) => ({
      ...current,
      [locale]: updater(current[locale]),
    }));
  };

  const updateActiveLocaleState = (updater: (current: LocalEditorRuntimeState) => LocalEditorRuntimeState) => {
    updateLocaleState(activeLocale, updater);
  };

  const hasUnsavedChanges = !jsonEqual(draft, savedDraft);
  const hasUnpublishedChanges = !jsonEqual(savedDraft, published);
  const copyStateMessage = hasUnsavedChanges
    ? `${activeLocaleLabel} has edits on this screen that are not saved yet. Save draft first.`
    : hasUnpublishedChanges
      ? `${activeLocaleLabel} saved draft is ready. Customers will not see it until you publish.`
      : `Everything saved for ${activeLocaleLabel} is already live for customers.`;

  const sectionHasUnsavedChanges = (sectionId: string) => {
    const section = COPY_ADMIN_SECTIONS.find((item) => item.id === sectionId);
    if (!section) return false;
    return section.paths.some(({ path }) => !jsonEqual(getAtPath(draft, path), getAtPath(savedDraft, path)));
  };

  const handleSaveDraft = (message: string) => {
    const locale = activeLocale;
    const localeLabel = getLocaleLabel(locale);
    const draftToSave = runtimeState[locale].draft;

    startTransition(async () => {
      try {
        const data = await postJson<{ draft: LocalizedCopyPayload }>(
          `/api/copy-admin/draft?locale=${locale}`,
          { draft: draftToSave },
        );
        updateLocaleState(locale, (current) => ({
          ...current,
          draft: data.draft,
          savedDraft: data.draft,
        }));
        setStatus(`${localeLabel}: ${message} Customers will not see this until you publish.`);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Draft save failed.');
      }
    });
  };

  const handlePublish = () => {
    const locale = activeLocale;
    const localeLabel = getLocaleLabel(locale);
    const state = runtimeState[locale];
    const localeHasUnsavedChanges = !jsonEqual(state.draft, state.savedDraft);
    const localeHasUnpublishedChanges = !jsonEqual(state.savedDraft, state.published);

    if (localeHasUnsavedChanges) {
      setStatus(`Save the ${localeLabel} draft first. Then publish it to make it visible to customers.`);
      return;
    }

    if (!localeHasUnpublishedChanges) {
      setStatus(`Nothing new to publish for ${localeLabel}. The saved draft already matches the live website.`);
      return;
    }

    startTransition(async () => {
      try {
        const data = await postJson<{
          draft: LocalizedCopyPayload;
          published: LocalizedCopyPayload;
          previousPublished: LocalizedCopyPayload | null;
        }>(`/api/copy-admin/publish?locale=${locale}`);
        updateLocaleState(locale, (current) => ({
          ...current,
          draft: data.draft,
          savedDraft: data.draft,
          published: data.published,
          previousPublished: data.previousPublished,
        }));
        setStatus(`Published ${localeLabel} copy to the website. Customers can now see these changes.`);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Publish failed.');
      }
    });
  };

  const handleRollback = () => {
    const locale = activeLocale;
    const localeLabel = getLocaleLabel(locale);
    const state = runtimeState[locale];

    if (!state.previousPublished) {
      setStatus(`There is no previous live ${localeLabel} version to roll back to yet.`);
      return;
    }

    if (!window.confirm(`Roll the live ${localeLabel} site back to the previous publish?`)) {
      return;
    }

    startTransition(async () => {
      try {
        const data = await postJson<{
          draft: LocalizedCopyPayload;
          published: LocalizedCopyPayload;
          previousPublished: LocalizedCopyPayload | null;
        }>(`/api/copy-admin/rollback?locale=${locale}`);
        updateLocaleState(locale, (current) => ({
          ...current,
          draft: data.draft,
          savedDraft: data.draft,
          published: data.published,
          previousPublished: data.previousPublished,
        }));
        setStatus(`Rolled the live ${localeLabel} site back to the previous publish.`);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Rollback failed.');
      }
    });
  };

  const renderNode = (draftNode: unknown, publishedNode: unknown, path: ReadonlyArray<string>, depth = 0): React.ReactNode => {
    if (typeof draftNode === 'string') {
      const technicalPath = path.join('.');
      const label = COPY_ADMIN_FIELD_LABELS[technicalPath] ?? humanizeKey(path[path.length - 1] || 'Value');
      const isLockedRoutingId = path[path.length - 1] === 'slug';
      return (
        <div key={path.join('.')} className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-artbar-taupe">{label}</p>
            {showAdvancedPaths ? <p className="text-[10px] uppercase tracking-[0.16em] text-artbar-gray">{technicalPath}</p> : null}
            <div className="rounded-xl bg-artbar-bg px-4 py-3 text-sm leading-6 text-artbar-navy whitespace-pre-wrap">
              {typeof publishedNode === 'string' && publishedNode.length > 0 ? publishedNode : '—'}
            </div>
            <p className="text-xs text-artbar-gray">Live now</p>
          </div>
          <div className="space-y-2">
            <textarea
              value={draftNode}
              readOnly={isLockedRoutingId}
              rows={getTextareaRows(draftNode)}
              onChange={(event) => {
                if (isLockedRoutingId) {
                  return;
                }
                updateActiveLocaleState((current) => ({
                  ...current,
                  draft: setAtPath(current.draft, path, event.target.value) as LocalizedCopyPayload,
                }));
              }}
              className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-artbar-navy outline-none transition focus:border-artbar-taupe focus:ring-2 focus:ring-artbar-taupe/15 ${
                isLockedRoutingId ? 'bg-artbar-bg/70 text-artbar-gray' : ''
              }`}
            />
            <p className="text-xs text-artbar-gray">
              {isLockedRoutingId
                ? 'Locked routing ID. This is not shown to customers.'
                : 'Draft. Press Enter anywhere you want a real line break.'}
            </p>
          </div>
        </div>
      );
    }

    if (Array.isArray(draftNode)) {
      return (
        <div key={path.join('.')} className="space-y-4">
          {draftNode.map((item, index) => {
            const childPath = [...path, String(index)];
            const liveItem = Array.isArray(publishedNode) ? publishedNode[index] : undefined;
            return (
              <div key={childPath.join('.')} className="rounded-2xl border border-gray-200 bg-white/70 p-4">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <h4 className="text-sm font-bold text-artbar-navy">{getArrayItemLabel(item, index)}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-artbar-gray">{`Item ${index + 1}`}</span>
                </div>
                {renderNode(item, liveItem, childPath, depth + 1)}
              </div>
            );
          })}
        </div>
      );
    }

    if (draftNode && typeof draftNode === 'object') {
      return (
        <div key={path.join('.')} className="space-y-4">
          {Object.entries(draftNode as Record<string, unknown>).map(([key, value]) => {
            const childPath = [...path, key];
            const liveValue =
              publishedNode && typeof publishedNode === 'object'
                ? (publishedNode as Record<string, unknown>)[key]
                : undefined;
            const heading = humanizeKey(key);
            return (
              <div key={childPath.join('.')} className={depth === 0 ? 'space-y-4' : 'space-y-3'}>
                {typeof value === 'string' ? null : (
                  <div className={depth === 0 ? 'pt-1' : ''}>
                    <h3 className={depth === 0 ? 'text-lg font-heading font-bold text-artbar-navy' : 'text-sm font-bold text-artbar-navy'}>
                      {heading}
                    </h3>
                  </div>
                )}
                {renderNode(value, liveValue, childPath, depth + 1)}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-artbar-bg">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 md:px-8 lg:flex-row">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[20rem] lg:shrink-0">
          <div className="rounded-[2rem] border border-artbar-light-taupe/20 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">
              Site Admin
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-artbar-navy">
              Site Copy Admin
            </h1>
            <p className="mt-3 text-sm leading-6 text-artbar-gray">
              Choose a language, edit by page, save a draft, then publish when the wording is ready for customers.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-artbar-bg p-1">
              {(['en', 'jp'] as const).map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setActiveLocale(locale)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeLocale === locale
                      ? 'bg-artbar-navy text-white shadow-sm'
                      : 'text-artbar-navy hover:bg-white'
                  }`}
                >
                  {locale === 'en' ? 'English' : 'Japanese'}
                </button>
              ))}
            </div>
            <Link
              href="/copy-admin/images"
              className="mt-5 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border-2 border-artbar-navy px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-artbar-navy transition hover:bg-gray-50"
            >
              Replace Site Images
            </Link>

            <div className="mt-6 space-y-2">
              {COPY_ADMIN_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                    section.id === activeSection
                      ? 'bg-artbar-navy text-white shadow-md'
                      : 'bg-artbar-bg text-artbar-navy hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">{section.title}</span>
                    {sectionHasUnsavedChanges(section.id) ? (
                      <span className="rounded-full bg-artbar-taupe px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        Draft
                      </span>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="rounded-[2rem] border border-artbar-light-taupe/20 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">{selectedSection.title}</p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <h2 className="font-heading text-3xl font-bold text-artbar-navy">Live vs draft</h2>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedPaths((current) => !current)}
                    className="inline-flex min-h-[2rem] w-fit items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-artbar-navy transition hover:bg-artbar-bg"
                  >
                    {showAdvancedPaths ? 'Hide technical paths' : 'Advanced'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-artbar-gray">
                  Left side is what customers see now. Right side is the draft you are editing.
                </p>
                {!isConfigured ? (
                  <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Supabase or copy-admin environment variables are not configured yet, so save/publish actions are disabled.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSaveDraft(`${selectedSection.title} draft saved.`)}
                  disabled={isPending || !isConfigured}
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSaveDraft(`Saved the full ${activeLocaleLabel} draft.`)}
                  disabled={isPending || !isConfigured}
                >
                  Save All Drafts
                </Button>
                <Button
                  type="button"
                  variant="taupe"
                  onClick={handlePublish}
                  disabled={isPending || !isConfigured || hasUnsavedChanges || !hasUnpublishedChanges}
                >
                  Publish to Website
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRollback}
                  disabled={isPending || !isConfigured || !previousLive}
                >
                  Roll Back
                </Button>
                <Link
                  href={previewHref}
                  target="_blank"
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border-2 border-artbar-navy px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-artbar-navy transition hover:bg-gray-50"
                >
                  {`Preview ${activeLocaleLabel}`}
                </Link>
                <form action="/api/copy-admin/logout" method="post">
                  <Button type="submit" variant="outline" disabled={isPending}>
                    Log Out
                  </Button>
                </form>
                <p className="basis-full text-xs leading-5 text-artbar-gray">
                  Publish once after saving. When there is nothing new to publish, this button turns off.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className={`text-sm ${hasUnsavedChanges || hasUnpublishedChanges ? 'text-artbar-taupe' : 'text-artbar-gray'}`}>
                {copyStateMessage}
              </p>
              {status ? <p className="text-sm text-artbar-navy">{status}</p> : null}
            </div>

            <div className="mt-8 space-y-8">
              {selectedSection.paths.map(({ path, title }) => {
                const draftNode = getAtPath(draft, path);
                const publishedNode = getAtPath(published, path);
                return (
                  <section key={path.join('.')} className="space-y-4">
                    <div className="border-b border-gray-100 pb-3">
                      <h3 className="font-heading text-2xl font-bold text-artbar-navy">{title}</h3>
                      {showAdvancedPaths ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-artbar-gray">{path.join(' / ')}</p>
                      ) : null}
                    </div>
                    {renderNode(draftNode, publishedNode, path)}
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
