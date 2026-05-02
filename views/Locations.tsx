'use client';

import React from 'react';
import Image from 'next/image';
import { CalendarDays, Navigation } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ARTBAR_BOOKING_URL } from '../constants';
import type { Location } from '../types';
import type { ResolvedJapaneseCopy } from '@/lib/copy/types';

const FRANCHISE_LOCATION_IDS = new Set(['osaka_namba', 'osaka_umeda', 'osaka_hirakata']);

export const Locations: React.FC = () => {
  const { lang, content, site, jpCopy } = useContent();
  const operatingReveal = useScrollReveal();

  return (
    <div className="grain relative pt-24 md:pt-32 pb-16 md:pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-4">{site.nav.locations}</h1>
          <p className="text-artbar-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' 
              ? "Find your nearest studio. Each location offers a unique atmosphere for your creative journey."
              : jpCopy.ui.locations.intro
            }
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {content.locations.map((loc) => (
            <LocationCard
              key={loc.id}
              loc={loc}
              lang={lang}
              jpCopy={jpCopy}
            />
          ))}
        </div>

        <div ref={operatingReveal.ref} className={`reveal mt-16 md:mt-24 pt-12 md:pt-16 border-t border-artbar-light-taupe/30 ${operatingReveal.isVisible ? 'visible' : ''}`}>
           <div className="bg-white border md:border-2 border-artbar-navy p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] max-w-4xl mx-auto text-center md:text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-artbar-navy mb-4">{site.locationsPage.operating.title}</h3>
                    <p className="font-bold text-base md:text-lg mb-1">{site.locationsPage.operating.name}</p>
                    <p className="text-xs md:text-sm opacity-70 mb-1">{site.locationsPage.operating.address}</p>
                    <p className="text-xs md:text-sm opacity-70">{site.locationsPage.operating.ceo}</p>
                 </div>
                 <div className="flex flex-col gap-3 items-center md:items-end w-full md:w-auto">
                    <Button
                      variant="taupe"
                      size="cta"
                      className="w-full rounded-xl font-bold uppercase text-[10px] md:w-auto md:text-xs"
                    >
                       {site.locationsPage.operating.btnHiring}
                    </Button>
                    <Button
                      variant="outline"
                      size="cta"
                      className="w-full rounded-xl font-bold uppercase text-[10px] md:w-auto md:text-xs"
                    >
                       {site.locationsPage.operating.btnFranchise}
                    </Button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

function LocationCard({
  loc,
  lang,
  jpCopy,
}: {
  loc: Location;
  lang: 'en' | 'jp';
  jpCopy: ResolvedJapaneseCopy;
}) {
  const reveal = useScrollReveal();
  const isFranchise = FRANCHISE_LOCATION_IDS.has(loc.id);
  return (
            <div
              ref={reveal.ref}
              className={`reveal bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col lg:flex-row group transition-all hover:shadow-xl ${reveal.isVisible ? 'visible' : ''}`}
            >
              <div className="lg:w-2/5 relative min-h-[220px] lg:min-h-full overflow-hidden">
                <Image 
                  src={loc.image} 
                  alt={lang === 'en' ? loc.nameEn : loc.nameJp} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/50 to-transparent opacity-60 lg:opacity-30"></div>
              </div>

              {/* Details Section */}
              <div className="lg:w-3/5 p-6 md:p-12 flex flex-col">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-artbar-navy leading-tight">
                      {lang === 'en' ? loc.nameEn : loc.nameJp}
                      {isFranchise && (
                        <span className="ml-2 text-artbar-taupe">
                          {lang === 'en' ? '(Franchise)' : '（フランチャイズ）'}
                        </span>
                      )}
                    </h2>
                 </div>

                 {/* Action Bar */}
                 <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.addressJp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gray-100 px-5 py-3 text-xs font-bold uppercase tracking-wide text-artbar-navy transition-colors hover:bg-gray-200 md:text-sm"
                    >
                      <Navigation size={12} className="md:w-3.5 md:h-3.5" /> {lang === 'en' ? 'Directions' : jpCopy.ui.locations.directions}
                    </a>

                    {isFranchise && (
                      <a
                        href={ARTBAR_BOOKING_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-artbar-taupe bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide text-artbar-taupe transition-colors hover:bg-artbar-taupe hover:text-white md:text-sm"
                      >
                        <CalendarDays size={12} className="md:w-3.5 md:h-3.5" />
                        {lang === 'en' ? 'Book Now' : '予約する'}
                      </a>
                    )}
                 </div>

                 {/* Address & Access */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-artbar-taupe uppercase block mb-2">{lang === 'en' ? 'Location Address' : jpCopy.ui.locations.locationAddressLabel}</span>
                        <p className="font-medium text-artbar-navy leading-relaxed text-sm">
                           {lang === 'en' ? loc.addressEn : loc.addressJp}
                        </p>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-artbar-taupe uppercase block mb-2">{lang === 'en' ? 'Transit Access' : jpCopy.ui.locations.transitAccessLabel}</span>
                        <p className="font-medium text-artbar-gray leading-relaxed text-sm whitespace-pre-line">
                           {lang === 'en' ? loc.accessEn : loc.accessJp}
                        </p>
                    </div>
                 </div>

                 {/* Mini Map */}
                 <div className="mt-auto h-40 md:h-48 w-full rounded-2xl overflow-hidden relative bg-gray-100 border border-gray-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.addressJp)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      title={`${loc.nameEn} Map`}
                      className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    ></iframe>
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-bold text-artbar-navy shadow-sm pointer-events-none uppercase tracking-widest">
                       Google Maps
                    </div>
                 </div>

              </div>
            </div>
  );
}
