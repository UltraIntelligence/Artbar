'use client';

import { useState } from 'react';

export type PartnerLogoEntry = {
  name: string;
  url: string;
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

export function PartnerLogo({ name, url }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const hasUrl = Boolean(url?.trim());
  const scale = OPTICAL_SCALE[name];

  return (
    <div className="group flex h-10 w-full items-center justify-center sm:h-12 md:h-16 lg:h-20">
      {hasUrl && !failed ? (
        <img
          src={url}
          alt={name}
          loading="lazy"
          decoding="async"
          style={scale ? { transform: `scale(${scale})` } : undefined}
          className="block h-full w-auto max-w-full origin-center object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
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
