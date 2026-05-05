'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';

const BUNDLED_HEADING_FONT = 'Josefin Sans';
const SYSTEM_FONT_HINTS = ['Hiragino', 'YuGothic', 'Meiryo', 'sans-serif', 'serif', 'Arial', 'Helvetica'];

/** Single font-family name, safe for CSS custom properties (multi-word names must be quoted). */
function cssFontFamilyName(name: string): string {
  const escaped = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${escaped}'`;
}

function cssFontFamilyValue(name: string): string {
  if (isBundledFont(name)) {
    return `var(--font-josefin), ${cssFontFamilyName(name)}`;
  }

  return cssFontFamilyName(name);
}

function isSystemFont(fontName: string): boolean {
  return SYSTEM_FONT_HINTS.some(sf => fontName.includes(sf));
}

function isBundledFont(fontName: string): boolean {
  return fontName === BUNDLED_HEADING_FONT;
}

export const ThemeInjector: React.FC = () => {
  const { content } = useContent();
  const { fonts } = content.theme || { fonts: { heading: BUNDLED_HEADING_FONT, body: 'Hiragino Kaku Gothic ProN' } };

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
