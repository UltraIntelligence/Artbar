'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';

/** Single font-family name, safe for CSS custom properties (multi-word names must be quoted). */
function cssFontFamilyName(name: string): string {
  const escaped = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${escaped}'`;
}

/** Bundled via `next/font` in `app/layout.tsx` — skip duplicate Google Fonts CSS. */
const SELF_HOSTED_GOOGLE_FONTS = new Set(['Poppins', 'Noto Sans JP']);

function googleWghtAxis(fontName: string): string {
  if (fontName === 'Noto Sans JP') return '400;500;700';
  return '400;500;600;700';
}

export const ThemeInjector: React.FC = () => {
  const { content } = useContent();
  const { fonts } = content.theme || { fonts: { heading: 'Poppins', body: 'Noto Sans JP' } };

  // Helper to identify if we need to load from Google (skip system fonts)
  const isSystemFont = (fontName: string) => {
    const systemFonts = ['Hiragino', 'YuGothic', 'Meiryo', 'sans-serif', 'serif', 'Arial', 'Helvetica'];
    return systemFonts.some(sf => fontName.includes(sf));
  };

  let googleFontsUrl = '';
  const fontsToLoad = new Set<string>();
  const maybeAddGoogle = (fontName: string) => {
    if (isSystemFont(fontName) || SELF_HOSTED_GOOGLE_FONTS.has(fontName)) return;
    fontsToLoad.add(fontName);
  };
  maybeAddGoogle(fonts.heading);
  maybeAddGoogle(fonts.body);

  if (fontsToLoad.size > 0) {
    const fontFamilies = Array.from(fontsToLoad)
      .map(f => `family=${f.replace(/ /g, '+')}:wght@${googleWghtAxis(f)}`)
      .join('&');
    googleFontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
  }

  return (
    <>
      {/* Inject CSS Variables for Tailwind using native style tag */}
      <style>{`
        :root {
          --font-heading: ${cssFontFamilyName(fonts.heading)};
          --font-body: ${cssFontFamilyName(fonts.body)};
        }
      `}</style>
      
      {/* Load Google Fonts if needed using native link tag */}
      {googleFontsUrl && (
        <link href={googleFontsUrl} rel="stylesheet" />
      )}
    </>
  );
};