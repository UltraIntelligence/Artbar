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

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{
  children: React.ReactNode;
  /** From server (cookie + Accept-Language) so first paint matches the browser. */
  initialLang: Language;
  initialContent: ContentData;
  initialJpCopy: ResolvedJapaneseCopy;
}> = ({ children, initialLang, initialContent, initialJpCopy }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [content] = useState<ContentData>(initialContent);

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

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
      jpCopy: initialJpCopy,
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
