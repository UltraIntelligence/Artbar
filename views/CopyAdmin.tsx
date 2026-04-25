'use client';

import React, { useMemo, useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { COPY_ADMIN_SECTIONS } from '@/lib/copy/defaults';
import type { CopyEditorState, JapaneseCopyPayload } from '@/lib/copy/types';

type CopyAdminProps = CopyEditorState;

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
  draft: initialDraft,
  published: initialPublished,
  previousPublished,
  isConfigured,
}) => {
  const [draft, setDraft] = useState(initialDraft);
  const [savedDraft, setSavedDraft] = useState(initialDraft);
  const [published, setPublished] = useState(initialPublished);
  const [previousLive, setPreviousLive] = useState(previousPublished);
  const [activeSection, setActiveSection] = useState<string>(COPY_ADMIN_SECTIONS[0]?.id ?? 'shared');
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedSection = useMemo(
    () => COPY_ADMIN_SECTIONS.find((section) => section.id === activeSection) ?? COPY_ADMIN_SECTIONS[0],
    [activeSection],
  );

  const hasUnsavedChanges = !jsonEqual(draft, savedDraft);
  const hasUnpublishedChanges = !jsonEqual(savedDraft, published);
  const copyStateMessage = hasUnsavedChanges
    ? 'You have edits on this screen that are not saved yet. Save draft first.'
    : hasUnpublishedChanges
      ? 'Saved draft is ready. Customers will not see it until you publish.'
      : 'Everything saved is already live for customers.';

  const sectionHasUnsavedChanges = (sectionId: string) => {
    const section = COPY_ADMIN_SECTIONS.find((item) => item.id === sectionId);
    if (!section) return false;
    return section.paths.some(({ path }) => !jsonEqual(getAtPath(draft, path), getAtPath(savedDraft, path)));
  };

  const handleSaveDraft = (message: string) => {
    startTransition(async () => {
      try {
        const data = await postJson<{ draft: JapaneseCopyPayload }>('/api/copy-admin/draft', { draft });
        setDraft(data.draft);
        setSavedDraft(data.draft);
        setStatus(`${message} Customers will not see this until you publish.`);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Draft save failed.');
      }
    });
  };

  const handlePublish = () => {
    if (hasUnsavedChanges) {
      setStatus('Save the draft first. Then publish it to make it visible to customers.');
      return;
    }

    if (!hasUnpublishedChanges) {
      setStatus('Nothing new to publish. The saved draft already matches the live website.');
      return;
    }

    startTransition(async () => {
      try {
        const data = await postJson<{
          draft: JapaneseCopyPayload;
          published: JapaneseCopyPayload;
          previousPublished: JapaneseCopyPayload | null;
        }>('/api/copy-admin/publish');
        setDraft(data.draft);
        setSavedDraft(data.draft);
        setPublished(data.published);
        setPreviousLive(data.previousPublished);
        setStatus('Published to the website. Customers can now see these Japanese copy changes.');
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Publish failed.');
      }
    });
  };

  const handleRollback = () => {
    if (!previousLive) {
      setStatus('There is no previous live version to roll back to yet.');
      return;
    }

    if (!window.confirm('Roll the live Japanese site back to the previous publish?')) {
      return;
    }

    startTransition(async () => {
      try {
        const data = await postJson<{
          draft: JapaneseCopyPayload;
          published: JapaneseCopyPayload;
          previousPublished: JapaneseCopyPayload | null;
        }>('/api/copy-admin/rollback');
        setDraft(data.draft);
        setSavedDraft(data.draft);
        setPublished(data.published);
        setPreviousLive(data.previousPublished);
        setStatus('Rolled the live Japanese site back to the previous publish.');
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Rollback failed.');
      }
    });
  };

  const renderNode = (draftNode: unknown, publishedNode: unknown, path: ReadonlyArray<string>, depth = 0): React.ReactNode => {
    if (typeof draftNode === 'string') {
      const label = humanizeKey(path[path.length - 1] || 'Value');
      return (
        <div key={path.join('.')} className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-artbar-taupe">{label}</p>
            <div className="rounded-xl bg-artbar-bg px-4 py-3 text-sm leading-6 text-artbar-navy whitespace-pre-wrap">
              {typeof publishedNode === 'string' && publishedNode.length > 0 ? publishedNode : '—'}
            </div>
            <p className="text-xs text-artbar-gray">Live now</p>
          </div>
          <div className="space-y-2">
            <textarea
              value={draftNode}
              rows={getTextareaRows(draftNode)}
              onChange={(event) => {
                setDraft((current) => setAtPath(current, path, event.target.value) as JapaneseCopyPayload);
              }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-artbar-navy outline-none transition focus:border-artbar-taupe focus:ring-2 focus:ring-artbar-taupe/15"
            />
            <p className="text-xs text-artbar-gray">Draft. Press Enter anywhere you want a real line break.</p>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">Copy Admin</p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-artbar-navy">Japanese Copy Editor</h1>
            <p className="mt-3 text-sm leading-6 text-artbar-gray">
              Edit by page here, then check the public site in another window for layout context.
            </p>

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
                <h2 className="mt-2 font-heading text-3xl font-bold text-artbar-navy">Live vs draft</h2>
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
                  onClick={() => handleSaveDraft('Saved the full Japanese draft.')}
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
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-artbar-gray">{path.join(' / ')}</p>
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
