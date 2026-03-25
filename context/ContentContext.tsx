'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentData, SiteContent } from '../types';
import { defaultContent } from '../data/content';
import { type SiteLanguage, setLangCookieClient } from '../lib/language';

type Language = SiteLanguage;

interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent; // Shortcut for content[lang]
  updateContent: (newContent: ContentData) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Versioned storage key to handle schema updates
const STORAGE_KEY = 'artbar_content_v5';

// Helper: Deep merge to ensure defaults fill gaps in saved data
const deepMerge = (base: any, source: any): any => {
  if (typeof base !== 'object' || base === null) return source !== undefined ? source : base;
  if (typeof source !== 'object' || source === null) return base;
  
  if (Array.isArray(source)) {
    return source.length > 0 ? source : base;
  }
  if (Array.isArray(base)) return base;

  const output = { ...base };
  
  Object.keys(base).forEach(key => {
    if (source[key] !== undefined) {
       output[key] = deepMerge(base[key], source[key]);
    }
  });
  
  return output;
};

export const ContentProvider: React.FC<{
  children: React.ReactNode;
  /** From server (cookie + Accept-Language) so first paint matches the browser. */
  initialLang: Language;
}> = ({ children, initialLang }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  }, [lang]);

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed && typeof parsed === 'object') {
          const merged = deepMerge(defaultContent, parsed);
          setContent(merged);
        }
      } catch (e) {
        console.error("Failed to parse saved content", e);
        localStorage.removeItem(STORAGE_KEY);
        setContent(defaultContent);
      }
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Language = prev === 'en' ? 'jp' : 'en';
      setLangCookieClient(next);
      return next;
    });
  };

  const updateContent = (newContent: ContentData) => {
    try {
      setContent(newContent);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save content", e);
      alert("Warning: Changes could not be saved locally. Data may be too large.");
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  const site = content[lang] || defaultContent[lang];

  return (
    <ContentContext.Provider value={{ 
      lang, 
      toggleLang, 
      content, 
      site, 
      updateContent,
      resetContent 
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
