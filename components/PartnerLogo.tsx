'use client';

import { type CSSProperties, useState } from 'react';

export type PartnerLogoEntry = {
  name: string;
  url: string;
  width?: number;
  height?: number;
  size?: 'default' | 'compact';
};

/**
 * Optical scale per brand. Normalises visual weight across marks with
 * different intrinsic aspect ratios — square/tall marks (Apple, GE, Toyota)
 * dominate when filled to cell height; wide wordmarks (Bloomberg, Spotify)
 * already read large. Tuned visually, not algorithmically. The scale is
 * breakpoint-independent so optical proportions stay consistent across sizes.
 */
const DESKTOP_OPTICAL_SCALE: Record<string, number> = {
  Apple: 0.7,
  GE: 0.72,
  Toyota: 0.78,
  Adidas: 0.72,
  Spotify: 0.88,
  'Coca-Cola': 0.92,
  Netflix: 0.92,
};

const MOBILE_OPTICAL_SCALE: Record<string, number> = {
  Apple: 0.86,
  GE: 0.86,
  Toyota: 0.9,
  Adidas: 0.84,
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

export function PartnerLogo({ name, url, width, height, size = 'default' }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const hasUrl = Boolean(url?.trim());
  const isCompact = size === 'compact';
  const mobileScale = isCompact
    ? COMPACT_OPTICAL_SCALE[name] ?? DESKTOP_OPTICAL_SCALE[name] ?? 1
    : MOBILE_OPTICAL_SCALE[name] ?? 1;
  const desktopScale = isCompact
    ? mobileScale
    : DESKTOP_OPTICAL_SCALE[name] ?? mobileScale;
  const logoStyle = {
    '--partner-logo-mobile-scale': mobileScale,
    '--partner-logo-desktop-scale': desktopScale,
  } as CSSProperties;
  const imageSizeClass = isCompact
    ? 'max-h-8 max-w-[7.25rem] sm:max-h-10 sm:max-w-[8rem] md:max-h-full md:max-w-full'
    : 'max-h-8 max-w-[7rem] sm:max-h-10 sm:max-w-[8.5rem] md:max-h-full md:max-w-full';

  return (
    <div className={`group flex w-full items-center justify-center ${isCompact ? 'h-9 sm:h-11 md:h-16 lg:h-20' : 'h-10 sm:h-12 md:h-16 lg:h-20'}`}>
      {hasUrl && !failed ? (
        <img
          src={url}
          alt={name}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={logoStyle}
          className={`block h-full w-auto origin-center scale-[var(--partner-logo-mobile-scale)] object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 md:scale-[var(--partner-logo-desktop-scale)] ${imageSizeClass}`}
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
