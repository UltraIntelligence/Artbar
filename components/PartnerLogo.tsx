'use client';

import { useState } from 'react';

export type PartnerLogoEntry = { name: string; url: string };

export function PartnerLogo({ name, url }: PartnerLogoEntry) {
  const [failed, setFailed] = useState(false);
  const scaleClass = name === 'Coca-Cola' || name === 'Netflix' ? 'scale-90' : '';
  const hasUrl = Boolean(url?.trim());

  if (!hasUrl || failed) {
    return (
      <div className="group flex h-11 w-full items-center justify-center px-2 sm:h-12 md:h-14 md:px-3">
        <span className="cursor-default whitespace-nowrap text-center font-heading text-xs font-bold uppercase tracking-widest text-artbar-navy/40 transition-colors group-hover:text-artbar-taupe md:text-sm">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="group flex h-11 w-full items-center justify-center px-2 sm:h-12 md:h-14 md:px-3">
      <img
        src={url}
        alt={name}
        className={`max-h-full max-w-full object-contain transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 ${scaleClass}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
