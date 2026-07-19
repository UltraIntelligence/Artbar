'use client';

import { type CSSProperties, useState } from 'react';
import { PARTNER_LOGO_NORMALIZATION } from '../data/partner-logo-normalization';

export type PartnerLogoEntry = {
  name: string;
  url: string;
  width?: number;
  height?: number;
  size?: 'default' | 'compact';
  /** Multiplies the per-brand optical scale for a one-off layout emphasis (e.g.
   *  grouping small square emblems on their own row). Defaults to 1 (no change).
   *  This does not touch the generated normalization table. */
  scaleBoost?: number;
};

export function PartnerLogo({ name, url, width, height, size = 'default', scaleBoost = 1 }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const hasUrl = Boolean(url?.trim());
  const isCompact = size === 'compact';

  // Optical scale + tight intrinsic dimensions come from the generated
  // normalization table (scripts/normalize-partner-logos.mjs). One scale per
  // brand, breakpoint-independent — no hand-tuning. scaleBoost is an explicit
  // per-render multiplier for layout emphasis only.
  const norm = PARTNER_LOGO_NORMALIZATION[name];
  const scale = (norm?.scale ?? 1) * scaleBoost;
  const logoStyle = { '--partner-logo-scale': scale } as CSSProperties;
  const imageSizeClass = isCompact
    ? 'max-h-8 max-w-[7rem] sm:max-h-9 sm:max-w-[7.5rem] lg:max-h-10 lg:max-w-[8rem]'
    : 'max-h-8 max-w-[7rem] sm:max-h-10 sm:max-w-[8.5rem] md:max-h-full md:max-w-full';
  // Most marks can be flattened to one neutral ink with brightness-0. GE has
  // a white monogram knocked out of its blue disc, so preserve that contrast.
  const imageToneClass = name === 'GE'
    ? 'grayscale contrast-200 opacity-45 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100'
    : 'grayscale brightness-0 opacity-45 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100';

  // Compact base size governs the whole home grid; per-brand optical scale
  // (--partner-logo-scale) is applied on top, so shrinking these heights scales
  // every mark down uniformly and preserves the optical-weight ratios.
  return (
    <div className={`group flex w-full items-center justify-center ${isCompact ? 'h-12 sm:h-14' : 'h-10 sm:h-12 md:h-16 lg:h-20'}`}>
      {hasUrl && !failed ? (
        <img
          src={url}
          alt={name}
          width={norm?.width ?? width}
          height={norm?.height ?? height}
          loading="lazy"
          decoding="async"
          style={logoStyle}
          className={`block h-full w-auto origin-center scale-[var(--partner-logo-scale)] object-contain transition-[filter,opacity] duration-500 filter ${imageToneClass} ${imageSizeClass}`}
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
