'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';

export const ThemeInjector: React.FC = () => {
  const { content } = useContent();
  const { fonts } = content.theme || { fonts: { heading: 'Josefin Sans', body: 'Hiragino Kaku Gothic ProN' } };

  // Helper to identify if we need to load from Google (skip system fonts)
  const isSystemFont = (fontName: string) => {
    const systemFonts = ['Hiragino', 'YuGothic', 'Meiryo', 'sans-serif', 'serif', 'Arial', 'Helvetica'];
    return systemFonts.some(sf => fontName.includes(sf));
  };

  let googleFontsUrl = '';
  const fontsToLoad = new Set<string>();
  if (!isSystemFont(fonts.heading)) fontsToLoad.add(fonts.heading);
  if (!isSystemFont(fonts.body)) fontsToLoad.add(fonts.body);

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
          --font-heading: ${fonts.heading};
          --font-body: ${fonts.body};
        }
      `}</style>
      
      {/* Load Google Fonts if needed using native link tag */}
      {googleFontsUrl && (
        <link href={googleFontsUrl} rel="stylesheet" />
      )}
    </>
  );
};