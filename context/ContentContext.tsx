'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentData, SiteContent } from '../types';
import { type SiteLanguage, setLangCookieClient } from '../lib/language';
import type { ResolvedJapaneseCopy } from '@/lib/copy/types';

type Language = SiteLanguage;

interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent; // Shortcut for content[lang]
  jpCopy: ResolvedJapaneseCopy;
}

interface PublishedJpResponse {
  content: ContentData;
  jpCopy: ResolvedJapaneseCopy;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

/**
 * ContentProvider is a pure consumer — initial content + JP copy are merged and
 * BudouX-segmented server-side in `app/layout.tsx`. The runtime EN→JP toggle
 * fetches `/api/copy-public`, which also returns merged + segmented data.
 *
 * Nothing in this client module imports `data/content` or `lib/copy/resolve`,
 * so neither defaultContent nor BudouX ends up in the client bundle.
 */
export const ContentProvider: React.FC<{
  children: React.ReactNode;
  /** From server (cookie + Accept-Language) so first paint matches the browser. */
  initialLang: Language;
  initialContent: ContentData;
  initialJpCopy: ResolvedJapaneseCopy;
}> = ({ children, initialLang, initialContent, initialJpCopy }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [content, setContent] = useState<ContentData>(initialContent);
  const [jpCopy, setJpCopy] = useState<ResolvedJapaneseCopy>(initialJpCopy);
  // Track whether we've fetched the runtime-published JP override. Layout pre-fetches
  // for JP visitors; EN visitors who toggle to JP later trigger the runtime fetch once.
  const [hasFetchedRuntimeJp, setHasFetchedRuntimeJp] = useState<boolean>(initialLang === 'jp');

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

  useEffect(() => {
    if (lang !== 'jp' || hasFetchedRuntimeJp) {
      return;
    }

    const controller = new AbortController();

    const loadPublishedCopy = async () => {
      try {
        const response = await fetch('/api/copy-public', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as PublishedJpResponse;
        if (!data?.content || !data?.jpCopy) return;

        setContent(data.content);
        setJpCopy(data.jpCopy);
        setHasFetchedRuntimeJp(true);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('[copy-public] failed to load published Japanese copy', error);
        }
      }
    };

    void loadPublishedCopy();

    return () => controller.abort();
  }, [lang, hasFetchedRuntimeJp]);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Language = prev === 'en' ? 'jp' : 'en';
      setLangCookieClient(next);
      return next;
    });
  };

  const site = content[lang];

  return (
    <ContentContext.Provider value={{
      lang,
      toggleLang,
      content,
      site,
      jpCopy,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
