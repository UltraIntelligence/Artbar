'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ContentData, SiteContent } from '../types';
import { type SiteLanguage, setLangCookieClient } from '../lib/language';
import { routeLocaleFromPathname, routeLocaleToSiteLanguage, switchLocaleHref } from '../lib/locale-routing';
import type { ResolvedJapaneseCopy } from '@/lib/copy/types';
import type { PublishedMediaMap } from '@/lib/media/types';

type Language = SiteLanguage;

interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent; // Shortcut for content[lang]
  localizedCopy: ResolvedJapaneseCopy;
  jpCopy: ResolvedJapaneseCopy;
  media: PublishedMediaMap;
}

interface PublishedCopyResponse {
  content: ContentData;
  localizedCopy: ResolvedJapaneseCopy;
}

type RuntimeCopyState = {
  content: ContentData;
  localizedCopy: ResolvedJapaneseCopy;
  hasFetched: boolean;
};

type RuntimeCopyByLang = Record<Language, Record<string, RuntimeCopyState | undefined>>;

const ContentContext = createContext<ContentContextType | undefined>(undefined);

/**
 * ContentProvider is a pure consumer — initial content + localized copy are merged
 * server-side in `app/layout.tsx`. The runtime language toggle fetches
 * `/api/copy-public`, which returns merged data for the active language.
 *
 * Nothing in this client module imports `data/content` or `lib/copy/resolve`,
 * so neither defaultContent nor BudouX ends up in the client bundle.
 */
export const ContentProvider: React.FC<{
  children: React.ReactNode;
  /** From server (cookie + Accept-Language) so first paint matches the browser. */
  initialLang: Language;
  initialContent: ContentData;
  initialLocalizedCopy: ResolvedJapaneseCopy;
  initialMedia: PublishedMediaMap;
  /** True when the server already fetched fresh published copy from Supabase.
   *  When false, the client retries via /api/copy-public on first render. */
  initialHasFetchedRuntimeCopy: boolean;
}> = ({
  children,
  initialLang,
  initialContent,
  initialLocalizedCopy,
  initialMedia,
  initialHasFetchedRuntimeCopy,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);
  const [content, setContent] = useState<ContentData>(initialContent);
  const [localizedCopy, setLocalizedCopy] = useState<ResolvedJapaneseCopy>(initialLocalizedCopy);
  const [media] = useState<PublishedMediaMap>(initialMedia);
  const [runtimeByLang, setRuntimeByLang] = useState<RuntimeCopyByLang>(() => ({
    en: initialLang === 'en'
      ? {
        [pathname]: {
          content: initialContent,
          localizedCopy: initialLocalizedCopy,
          hasFetched: initialHasFetchedRuntimeCopy,
        },
      }
      : {},
    jp: initialLang === 'jp'
      ? {
        [pathname]: {
          content: initialContent,
          localizedCopy: initialLocalizedCopy,
          hasFetched: initialHasFetchedRuntimeCopy,
        },
      }
      : {},
  }));

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

  useEffect(() => {
    // Bare public URLs are intentionally Japanese; `/en` is the explicit English route.
    const routeLang = routeLocaleToSiteLanguage(routeLocaleFromPathname(pathname));
    const cachedRuntime = runtimeByLang[routeLang][pathname];

    setLang(routeLang);
    if (cachedRuntime) {
      setContent(cachedRuntime.content);
      setLocalizedCopy(cachedRuntime.localizedCopy);
    }
  }, [pathname, runtimeByLang]);

  useEffect(() => {
    const routeLang = routeLocaleToSiteLanguage(routeLocaleFromPathname(pathname));
    const activeRuntime = runtimeByLang[lang][pathname];

    if (lang !== routeLang || activeRuntime?.hasFetched) {
      return;
    }

    const controller = new AbortController();

    const loadPublishedCopy = async () => {
      try {
        const response = await fetch(
          `/api/copy-public?locale=${encodeURIComponent(lang)}&path=${encodeURIComponent(pathname)}`,
          {
            cache: 'no-store',
            signal: controller.signal,
          },
        );
        if (!response.ok) return;

        const data = (await response.json()) as PublishedCopyResponse;
        if (!data?.content || !data?.localizedCopy) return;

        setContent(data.content);
        setLocalizedCopy(data.localizedCopy);
        setRuntimeByLang((current) => ({
          ...current,
          [lang]: {
            ...current[lang],
            [pathname]: {
              content: data.content,
              localizedCopy: data.localizedCopy,
              hasFetched: true,
            },
          },
        }));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('[copy-public] failed to load published copy', error);
        }
      }
    };

    void loadPublishedCopy();

    return () => controller.abort();
  }, [lang, pathname, runtimeByLang]);

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
      localizedCopy,
      jpCopy: localizedCopy,
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
