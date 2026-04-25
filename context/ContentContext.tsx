'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentData, SiteContent } from '../types';
import { defaultContent } from '../data/content';
import { type SiteLanguage, setLangCookieClient } from '../lib/language';
import {
  DEFAULT_JAPANESE_COPY_PAYLOAD,
} from '@/lib/copy/defaults';
import {
  buildResolvedJapaneseCopy,
  mergePublishedIntoContent,
  normalizeJapaneseCopyPayload,
} from '@/lib/copy/resolve';
import type { JapaneseCopyPayload, ResolvedJapaneseCopy } from '@/lib/copy/types';

type Language = SiteLanguage;

interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent; // Shortcut for content[lang]
  jpCopy: ResolvedJapaneseCopy;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{
  children: React.ReactNode;
  /** From server (cookie + Accept-Language) so first paint matches the browser. */
  initialLang: Language;
  initialPublishedJpPayload?: JapaneseCopyPayload | null;
}> = ({ children, initialLang, initialPublishedJpPayload = null }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [publishedJpPayload, setPublishedJpPayload] =
    useState<JapaneseCopyPayload | null>(initialPublishedJpPayload);
  const [content, setContent] = useState<ContentData>(() =>
    initialPublishedJpPayload
      ? mergePublishedIntoContent(initialPublishedJpPayload)
      : defaultContent
  );
  const [jpCopy, setJpCopy] = useState<ResolvedJapaneseCopy>(() =>
    buildResolvedJapaneseCopy(initialPublishedJpPayload ?? DEFAULT_JAPANESE_COPY_PAYLOAD)
  );

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

  useEffect(() => {
    if (lang !== 'jp' || publishedJpPayload) {
      return;
    }

    const controller = new AbortController();

    const loadPublishedCopy = async () => {
      try {
        const response = await fetch('/api/copy-public', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { published?: JapaneseCopyPayload };
        if (!data.published) {
          return;
        }

        const normalized = normalizeJapaneseCopyPayload(data.published);
        setPublishedJpPayload(normalized);
        setContent(mergePublishedIntoContent(normalized));
        setJpCopy(buildResolvedJapaneseCopy(normalized));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('[copy-public] failed to load published Japanese copy', error);
        }
      }
    };

    void loadPublishedCopy();

    return () => controller.abort();
  }, [lang, publishedJpPayload]);

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
