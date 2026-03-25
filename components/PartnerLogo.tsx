'use client';

import { useState } from 'react';

export type PartnerLogoEntry = { name: string; url: string };

export function PartnerLogo({ name, url }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const compactBrand =
    name === 'Coca-Cola' || name === 'Netflix' ? 'sm:scale-90' : '';
  const hasUrl = Boolean(url?.trim());

  if (!hasUrl || failed) {
    return (
      <div className="group flex h-8 w-full max-w-[8.75rem] items-center justify-center px-2 sm:h-11 sm:max-w-none sm:px-4 md:h-14 md:px-5">
        <span className="cursor-default whitespace-nowrap text-center font-heading text-[10px] font-bold uppercase tracking-widest text-artbar-navy/40 transition-colors group-hover:text-artbar-taupe sm:text-xs md:text-sm">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="group flex h-8 w-full max-w-[8.75rem] items-center justify-center px-2 sm:h-11 sm:max-w-none sm:px-4 md:h-14 md:px-5">
      <img
        src={url}
        alt={name}
        className={`max-h-[1.65rem] w-auto max-w-full object-contain transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 sm:max-h-full ${compactBrand}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
