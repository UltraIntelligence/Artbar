'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';

/** Single font-family name, safe for CSS custom properties (multi-word names must be quoted). */
function cssFontFamilyName(name: string): string {
  const escaped = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${escaped}'`;
}

function cssFontFamilyValue(name: string): string {
  if (name === 'Josefin Sans') {
    return `var(--font-josefin), ${cssFontFamilyName(name)}`;
  }

  return cssFontFamilyName(name);
}

export const ThemeInjector: React.FC = () => {
  const { content } = useContent();
  const { fonts } = content.theme || { fonts: { heading: 'Josefin Sans', body: 'Hiragino Kaku Gothic ProN' } };

  // Helper to identify if we need to load from Google (skip system fonts)
  const isSystemFont = (fontName: string) => {
    const systemFonts = ['Hiragino', 'YuGothic', 'Meiryo', 'sans-serif', 'serif', 'Arial', 'Helvetica'];
    return systemFonts.some(sf => fontName.includes(sf));
  };
  const isBundledFont = (fontName: string) => fontName === 'Josefin Sans';

  let googleFontsUrl = '';
  const fontsToLoad = new Set<string>();
  if (!isSystemFont(fonts.heading) && !isBundledFont(fonts.heading)) fontsToLoad.add(fonts.heading);
  if (!isSystemFont(fonts.body) && !isBundledFont(fonts.body)) fontsToLoad.add(fonts.body);

  if (fontsToLoad.size > 0) {
    // Construct Google Fonts URL: family=Name:wght@300;400;600;700&...
    const fontFamilies = Array.from(fontsToLoad)
      .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;600;700`)
      .join('&');
    googleFontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
  }

  return (
    <>
      {/* Inject CSS Variables for Tailwind using native style tag */}
      <style>{`
        :root {
          --font-heading: ${cssFontFamilyValue(fonts.heading)};
          --font-body: ${cssFontFamilyValue(fonts.body)};
        }
      `}</style>
      
      {/* Load Google Fonts if needed using native link tag */}
      {googleFontsUrl && (
        <link href={googleFontsUrl} rel="stylesheet" />
      )}
    </>
  );
};
