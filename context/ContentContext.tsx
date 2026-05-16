'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ContentData, SiteContent } from '../types';
import { type SiteLanguage, setLangCookieClient } from '../lib/language';
import { routeLocaleFromPathname, routeLocaleToSiteLanguage, switchLocaleHref } from '../lib/locale-routing';
import type { ResolvedJapaneseCopy } from '@/lib/copy/types';
import { mergeMediaIntoContent } from '@/lib/media/resolve';
import type { PublishedMediaMap } from '@/lib/media/types';

type Language = SiteLanguage;

interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent; // Shortcut for content[lang]
  jpCopy: ResolvedJapaneseCopy;
  media: PublishedMediaMap;
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
  initialMedia: PublishedMediaMap;
  /** True when the server already fetched fresh published JP copy from Supabase.
   *  When false (EN visitors, or JP visitors whose Supabase fetch timed out),
   *  the client retries via /api/copy-public on first JP render. */
  initialHasFetchedRuntimeJp: boolean;
}> = ({
  children,
  initialLang,
  initialContent,
  initialJpCopy,
  initialMedia,
  initialHasFetchedRuntimeJp,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);
  const [content, setContent] = useState<ContentData>(initialContent);
  const [jpCopy, setJpCopy] = useState<ResolvedJapaneseCopy>(initialJpCopy);
  const [media] = useState<PublishedMediaMap>(initialMedia);
  const [hasFetchedRuntimeJp, setHasFetchedRuntimeJp] = useState<boolean>(initialHasFetchedRuntimeJp);

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

  useEffect(() => {
    // Bare public URLs are intentionally Japanese; `/en` is the explicit English route.
    const routeLang = routeLocaleToSiteLanguage(routeLocaleFromPathname(pathname));
    setLang(routeLang);
  }, [pathname]);

  useEffect(() => {
    if (lang !== 'jp' || hasFetchedRuntimeJp) {
      return;
    }

    const controller = new AbortController();

    const loadPublishedCopy = async () => {
      try {
        const response = await fetch(`/api/copy-public?path=${encodeURIComponent(pathname)}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as PublishedJpResponse;
        if (!data?.content || !data?.jpCopy) return;

        setContent(mergeMediaIntoContent(data.content, media));
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
  }, [lang, hasFetchedRuntimeJp, media, pathname]);

  const toggleLang = () => {
    const next: Language = lang === 'en' ? 'jp' : 'en';
    setLangCookieClient(next);
    const suffix =
      typeof window === 'undefined' ? '' : `${window.location.search}${window.location.hash}`;
    setLang(next);
    router.push(switchLocaleHref(`${pathname}${suffix}`, next));
  };

  const site = content[lang];

  return (
    <ContentContext.Provider value={{
      lang,
      toggleLang,
      content,
      site,
      jpCopy,
      media,
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
