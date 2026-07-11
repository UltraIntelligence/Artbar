'use client';

import { type CSSProperties, useState } from 'react';
import { PARTNER_LOGO_NORMALIZATION } from '../data/partner-logo-normalization';

export type PartnerLogoEntry = {
  name: string;
  url: string;
  width?: number;
  height?: number;
  size?: 'default' | 'compact';
};

export function PartnerLogo({ name, url, width, height, size = 'default' }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const hasUrl = Boolean(url?.trim());
  const isCompact = size === 'compact';

  // Optical scale + tight intrinsic dimensions come from the generated
  // normalization table (scripts/normalize-partner-logos.mjs). One scale per
  // brand, breakpoint-independent — no hand-tuning.
  const norm = PARTNER_LOGO_NORMALIZATION[name];
  const scale = norm?.scale ?? 1;
  const logoStyle = { '--partner-logo-scale': scale } as CSSProperties;
  const imageSizeClass = isCompact
    ? 'max-h-7 sm:max-h-9 md:max-h-full max-w-full'
    : 'max-h-8 max-w-[7rem] sm:max-h-10 sm:max-w-[8.5rem] md:max-h-full md:max-w-full';

  return (
    <div className={`group flex w-full items-center justify-center ${isCompact ? 'h-8 sm:h-10 md:h-14 lg:h-[4.375rem]' : 'h-10 sm:h-12 md:h-16 lg:h-20'}`}>
      {hasUrl && !failed ? (
        <img
          src={url}
          alt={name}
          width={norm?.width ?? width}
          height={norm?.height ?? height}
          loading="lazy"
          decoding="async"
          style={logoStyle}
          className={`block h-full w-auto origin-center scale-[var(--partner-logo-scale)] object-contain transition-[filter,opacity] duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 ${imageSizeClass}`}
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
