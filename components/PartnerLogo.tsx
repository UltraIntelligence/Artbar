'use client';

import { useState } from 'react';

export type PartnerLogoEntry = {
  name: string;
  url: string;
  size?: 'default' | 'compact';
};

/**
 * Optical scale per brand. Normalises visual weight across marks with
 * different intrinsic aspect ratios — square/tall marks (Apple, GE, Toyota)
 * dominate when filled to cell height; wide wordmarks (Bloomberg, Spotify)
 * already read large. Tuned visually, not algorithmically. The scale is
 * breakpoint-independent so optical proportions stay consistent across sizes.
 */
const OPTICAL_SCALE: Record<string, number> = {
  Apple: 0.7,
  GE: 0.72,
  Toyota: 0.78,
  Adidas: 0.72,
  Spotify: 0.88,
  'Coca-Cola': 0.92,
  Netflix: 0.92,
};

const COMPACT_OPTICAL_SCALE: Record<string, number> = {
  Apple: 1.08,
  GE: 1.12,
  Toyota: 0.98,
  Adidas: 1.08,
  Spotify: 1.08,
  'Coca-Cola': 0.98,
  Netflix: 0.98,
  Amazon: 0.94,
  Google: 0.94,
};

export function PartnerLogo({ name, url, size = 'default' }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const hasUrl = Boolean(url?.trim());
  const isCompact = size === 'compact';
  const scale = isCompact ? COMPACT_OPTICAL_SCALE[name] ?? OPTICAL_SCALE[name] : OPTICAL_SCALE[name];

  return (
    <div className={`group flex w-full items-center justify-center ${isCompact ? 'h-9 sm:h-11 md:h-16 lg:h-20' : 'h-10 sm:h-12 md:h-16 lg:h-20'}`}>
      {hasUrl && !failed ? (
        <img
          src={url}
          alt={name}
          loading="lazy"
          decoding="async"
          style={scale ? { transform: `scale(${scale})` } : undefined}
          className={`block h-full w-auto origin-center object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 ${isCompact ? 'max-h-8 max-w-[7.25rem] sm:max-h-10 sm:max-w-[8rem] md:max-h-full md:max-w-full' : 'max-w-full'}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="cursor-default whitespace-nowrap text-center font-heading text-[10px] font-bold uppercase tracking-widest text-artbar-navy/40 transition-colors group-hover:text-artbar-taupe sm:text-xs md:text-sm">
          {name}
        </span>
      )}
    </div>
  );
}
