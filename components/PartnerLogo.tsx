'use client';

import { useState } from 'react';

export type PartnerLogoEntry = {
  name: string;
  url: string;
  /** Home partner strip: image fills the grid cell (not a tiny mark in a tall empty box). */
  size?: 'default' | 'prominent';
};

export function PartnerLogo({ name, url, size = 'default' }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const compactBrand =
    name === 'Coca-Cola' || name === 'Netflix' ? 'sm:scale-90' : '';
  /**
   * Desktop (sm+): GE / Apple / Toyota tuned vs peers.
   * Mobile (max-sm): crowd shrinks ~50% so cells aren’t dominant; GE & Apple read larger vs that crowd.
   */
  const brandScale =
    name === 'GE'
      ? 'max-sm:scale-[0.88] sm:scale-[0.6]'
      : name === 'Apple'
        ? 'max-sm:scale-[0.78] sm:scale-[0.525]'
        : name === 'Toyota'
          ? 'max-sm:scale-[0.50] sm:scale-[0.75]'
          : 'max-sm:scale-[0.44]';
  const hasUrl = Boolean(url?.trim());

  /** Mobile: shorter row + scale above; sm+ unchanged (matches prior desktop look). */
  const prominentShell =
    'group flex h-10 w-full min-w-0 items-stretch sm:h-24 md:h-28 lg:h-32';
  const defaultOuter =
    'group flex h-10 w-full max-w-[6rem] items-center justify-center px-1.5 sm:h-11 sm:max-w-none sm:px-4 md:h-14 md:px-5';
  const prominentImg =
    `block h-full w-full min-h-0 min-w-0 origin-center object-contain object-center transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 ${brandScale}`.trim();

  if (size === 'prominent') {
    if (!hasUrl || failed) {
      return (
        <div
          className={`${prominentShell} items-center justify-center px-2 sm:px-1`}
        >
          <span className="cursor-default whitespace-nowrap text-center font-heading text-[10px] font-bold uppercase tracking-widest text-artbar-navy/40 transition-colors group-hover:text-artbar-taupe sm:text-xs md:text-sm">
            {name}
          </span>
        </div>
      );
    }
    return (
      <div className={prominentShell}>
        <img
          src={url}
          alt={name}
          className={prominentImg}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  if (!hasUrl || failed) {
    return (
      <div className={defaultOuter}>
        <span className="cursor-default whitespace-nowrap text-center font-heading text-[10px] font-bold uppercase tracking-widest text-artbar-navy/40 transition-colors group-hover:text-artbar-taupe sm:text-xs md:text-sm">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className={defaultOuter}>
      <img
        src={url}
        alt={name}
        className={`max-h-7 origin-center w-auto max-w-full object-contain transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 sm:max-h-full ${brandScale} ${compactBrand}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
