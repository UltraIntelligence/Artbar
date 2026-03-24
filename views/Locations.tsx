'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Navigation, Star, MapPin, Loader2, Info, Sparkles } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { Location } from '../types';

export const Locations: React.FC = () => {
  const { lang, content, site } = useContent();
  const operatingReveal = useScrollReveal();
  
  // State for AI Insights
  const [insights, setInsights] = useState<Record<string, { text: string; chunks: any[] }>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchLocationInsights = async (id: string, name: string, address: string) => {
    // If already loaded, don't fetch again
    if (insights[id]) return;

    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const prompt = `You are a helpful assistant for Artbar Tokyo. Write a short, engaging 2-3 sentence AI summary about the following location that highlights its atmosphere and local area for visitors.\n\nLocation: ${name}\nAddress: ${address}`;
      const res = await fetch('/api/ai-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const text = data.text || "Could not fetch insights at this time.";
      const chunks: any[] = [];

      if (isMounted.current) {
        setInsights((prev) => ({ ...prev, [id]: { text, chunks } }));
      }
    } catch (error) {
      console.error("Failed to fetch location insights:", error);
      if (isMounted.current) {
        setInsights((prev) => ({
            ...prev,
            [id]: { text: "Unable to load Google Maps data.", chunks: [] }
        }));
      }
    } finally {
      if (isMounted.current) {
        setLoading((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <div className="grain relative pt-24 md:pt-32 pb-16 md:pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-4">{site.nav.locations}</h1>
          <p className="text-artbar-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' 
              ? "Find your nearest studio. Each location offers a unique atmosphere for your creative journey."
              : "お近くのスタジオを探す。各ロケーションでユニークな雰囲気とクリエイティブな体験をお楽しみください。"
            }
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {content.locations.map((loc) => (
            <LocationCard
              key={loc.id}
              loc={loc}
              lang={lang}
              insights={insights}
              loading={loading}
              fetchLocationInsights={fetchLocationInsights}
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
  insights,
  loading,
  fetchLocationInsights,
}: {
  loc: Location;
  lang: 'en' | 'jp';
  insights: Record<string, { text: string; chunks: { web?: { uri?: string }; maps?: { uri?: string } }[] }>;
  loading: Record<string, boolean>;
  fetchLocationInsights: (id: string, name: string, address: string) => Promise<void>;
}) {
  const reveal = useScrollReveal();
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
                    </h2>
                 </div>

                 {/* Action Bar */}
                 <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.addressJp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 text-artbar-navy font-bold text-[10px] md:text-xs uppercase tracking-wide hover:bg-gray-200 transition-colors"
                    >
                      <Navigation size={12} className="md:w-3.5 md:h-3.5" /> {lang === 'en' ? 'Directions' : 'ルート案内'}
                    </a>

                    <button
                      onClick={() => fetchLocationInsights(loc.id, loc.nameEn, loc.addressJp)}
                      disabled={loading[loc.id] || !!insights[loc.id]}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-wide transition-colors border ${
                        insights[loc.id] 
                          ? 'bg-artbar-taupe/10 text-artbar-taupe border-artbar-taupe/20 cursor-default'
                          : 'bg-white border-artbar-taupe text-artbar-taupe hover:bg-artbar-taupe hover:text-white'
                      }`}
                    >
                       {loading[loc.id] ? (
                          <Loader2 size={12} className="animate-spin md:w-3.5 md:h-3.5" />
                       ) : (
                          <Sparkles size={12} className="md:w-3.5 md:h-3.5" />
                       )}
                       {insights[loc.id] ? (lang === 'en' ? 'AI Loaded' : 'AI情報表示中') : (lang === 'en' ? 'AI Summary' : 'AI サマリー')}
                    </button>
                 </div>

                 {/* AI Insights Display */}
                 {insights[loc.id] && (
                    <div className="mb-8 bg-artbar-bg/50 p-5 md:p-6 rounded-2xl border border-artbar-taupe/10 animate-in fade-in slide-in-from-top-2">
                       <div className="flex items-start gap-3">
                          <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500 shrink-0">
                             <Star size={14} fill="currentColor" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-artbar-navy text-xs md:text-sm mb-1 uppercase tracking-widest">Maps Insights</h4>
                            <p className="text-artbar-navy/80 text-sm leading-relaxed italic">
                              "{insights[loc.id].text}"
                            </p>
                            
                            {/* Source Links */}
                            {insights[loc.id].chunks?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {insights[loc.id].chunks.map((chunk, i) => {
                                        const uri = chunk.web?.uri || chunk.maps?.uri;
                                        if (!uri) return null;
                                        return (
                                            <a key={i} href={uri} target="_blank" rel="noopener noreferrer" className="text-[9px] text-artbar-taupe hover:underline flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-100 font-bold uppercase">
                                                <Info size={10} /> Source {i + 1}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                          </div>
                       </div>
                    </div>
                 )}

                 {/* Address & Access */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-artbar-taupe uppercase block mb-2">Location Address</span>
                        <p className="font-medium text-artbar-navy leading-relaxed text-sm">
                           {lang === 'en' ? loc.addressEn : loc.addressJp}
                        </p>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-artbar-taupe uppercase block mb-2">Transit Access</span>
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