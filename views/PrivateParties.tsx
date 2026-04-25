'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { HERO_BLUR_DATA_URL } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, Clock, Users, Wine, Palette, Utensils, Sparkles } from 'lucide-react';

export const PrivateParties: React.FC = () => {
  const { site, lang, jpCopy } = useContent();
  const { privateParties } = site;
  const occasionsReveal = useScrollReveal();
  const pricingReveal = useScrollReveal();
  const capacityReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();

  const maxGuestsLabel = lang === 'en' ? 'Max Guests' : jpCopy.ui.privateParties.maxGuestsLabel;
  const priceSuffix = lang === 'en' ? '/ person (tax inc)' : jpCopy.ui.privateParties.priceSuffix;

  const topHeroSrc = privateParties.occasions[0]?.image ?? '';

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative w-full max-w-5xl mx-auto mb-12 h-[40vh] min-h-[220px] rounded-[2.5rem] overflow-hidden md:mb-16 bg-artbar-bg">
          <Image
            key={topHeroSrc || 'private-parties-hero'}
            src={topHeroSrc}
            alt={lang === 'en' ? 'Private party at Artbar Tokyo' : jpCopy.ui.privateParties.heroImageAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-artbar-bg via-artbar-bg/40 to-transparent" />
        </div>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-6 block">{privateParties.hero.badge}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-heavy text-artbar-navy mb-8 leading-tight">
            <span className="block">{privateParties.hero.title}</span> 
            <span className="text-artbar-taupe block">{privateParties.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-2xl text-artbar-gray leading-relaxed font-light">
            {privateParties.hero.subtitle}
          </p>
        </div>

        <div
          ref={occasionsReveal.ref}
          className={`reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 ${occasionsReveal.isVisible ? 'visible' : ''}`}
        >
          {privateParties.occasions.map((item, idx) => (
            <div key={idx} className="group relative h-48 md:h-96 rounded-[2rem] overflow-hidden cursor-pointer">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-artbar-navy/20 group-hover:bg-artbar-navy/40 transition-colors"></div>
              <div className="absolute bottom-6 left-4 right-4 md:left-6 md:right-6">
                <div className="bg-white/90 backdrop-blur-sm py-2 md:py-3 px-4 md:px-6 rounded-xl text-center shadow-lg">
                  <span className="font-heading font-bold text-artbar-navy text-sm md:text-base">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={pricingReveal.ref} className={`reveal grid md:grid-cols-2 gap-8 mb-32 ${pricingReveal.isVisible ? 'visible' : ''}`}>
            {/* Adult Pricing */}
            <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Wine size={120} className="text-artbar-navy" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                      <div>
                          <h3 className="text-3xl md:text-4xl font-heading font-heavy text-artbar-navy mb-2">{privateParties.pricing.adult.title}</h3>
                          <p className="text-artbar-gray font-medium">{privateParties.pricing.adult.subtitle}</p>
                      </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-5xl md:text-6xl font-heading font-bold text-artbar-navy">{privateParties.pricing.adult.price}</span>
                      <span className="text-artbar-gray text-base md:text-lg">{priceSuffix}</span>
                  </div>

                  <div className="space-y-6 mb-12">
                      {privateParties.pricing.adult.items.map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-artbar-bg flex items-center justify-center text-artbar-taupe mt-1 flex-shrink-0"><Check size={14} strokeWidth={3} /></div>
                            <div>
                            <span className="font-heading font-bold text-artbar-navy block">{item.title}</span>
                            <span className="text-base md:text-lg text-artbar-gray">{item.desc}</span>
                            </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="bg-artbar-bg p-6 rounded-2xl mb-8 border border-artbar-light-taupe/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-artbar-gray text-sm">{privateParties.pricing.common.venueFeeLabel}</span>
                        <span className="font-heading font-bold text-artbar-navy">{privateParties.pricing.common.venueFeePrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-artbar-gray text-sm">{privateParties.pricing.common.minGuestsLabel}</span>
                        <span className="font-heading font-bold text-artbar-navy">{privateParties.pricing.common.minGuests}</span>
                      </div>
                  </div>

                  <Button
                    variant="primary"
                    size="cta"
                    className="w-full rounded-2xl text-base shadow-lg shadow-artbar-navy/20 transition-transform hover:scale-[1.01]"
                  >
                    {privateParties.pricing.adult.cta}
                  </Button>
                </div>
            </div>

            {/* Kids Pricing */}
             <div className="bg-artbar-bg border border-artbar-light-taupe/30 p-8 md:p-14 rounded-[3rem] hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Palette size={120} className="text-artbar-taupe" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                       <div>
                          <h3 className="text-3xl md:text-4xl font-heading font-heavy text-artbar-navy mb-2">{privateParties.pricing.kids.title}</h3>
                          <p className="text-artbar-gray font-medium">{privateParties.pricing.kids.subtitle}</p>
                      </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-5xl md:text-6xl font-heading font-bold text-artbar-navy">{privateParties.pricing.kids.price}</span>
                      <span className="text-artbar-gray text-base md:text-lg">{priceSuffix}</span>
                  </div>

                  <div className="space-y-6 mb-12">
                      {privateParties.pricing.kids.items.map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-artbar-taupe mt-1 flex-shrink-0"><Check size={14} strokeWidth={3} /></div>
                            <div>
                            <span className="font-heading font-bold text-artbar-navy block">{item.title}</span>
                            <span className="text-base md:text-lg text-artbar-gray">{item.desc}</span>
                            </div>
                        </div>
                      ))}
                  </div>

                  <div className="bg-white p-6 rounded-2xl mb-8 border border-artbar-light-taupe/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-artbar-gray text-sm">{privateParties.pricing.common.venueFeeLabel}</span>
                        <span className="font-heading font-bold text-artbar-navy">{privateParties.pricing.common.venueFeePrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-artbar-gray text-sm">{privateParties.pricing.common.minGuestsLabel}</span>
                        <span className="font-heading font-bold text-artbar-navy">{privateParties.pricing.common.minGuests}</span>
                      </div>
                  </div>

                  <Button
                    variant="outline"
                    size="cta"
                    className="w-full rounded-2xl border-2 border-artbar-navy bg-transparent text-base hover:bg-artbar-navy hover:text-white"
                  >
                    {privateParties.pricing.kids.cta}
                  </Button>
                </div>
            </div>
        </div>

        <div ref={capacityReveal.ref} className={`reveal mb-32 ${capacityReveal.isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-4 mb-12">
             <div className="h-px bg-artbar-light-taupe flex-grow"></div>
             <h2 className="text-2xl md:text-3xl font-heading font-bold text-artbar-navy text-center px-4">{privateParties.capacity.title}</h2>
             <div className="h-px bg-artbar-light-taupe flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {jpCopy.privatePartyCapacityRows.map((loc, i) => (
               <div key={i} className={`p-6 rounded-[2rem] text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px] ${loc.highlight ? 'bg-artbar-navy text-white' : 'bg-white text-artbar-navy'}`}>
                  <span className="text-3xl md:text-4xl font-heading font-bold mb-2">{loc.cap}</span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{maxGuestsLabel}</span>
                  <h4 className="font-bold text-base md:text-lg leading-tight">{loc.name[lang]}</h4>
                  <span className="text-sm md:text-base mt-2 opacity-80">{loc.desc[lang]}</span>
               </div>
             ))}
          </div>
        </div>

        <div ref={timelineReveal.ref} className={`reveal bg-white rounded-[3rem] p-8 md:p-16 border border-artbar-bg shadow-sm ${timelineReveal.isVisible ? 'visible' : ''}`}>
           <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Timeline */}
              <div>
                 <h3 className="text-2xl font-heading font-bold text-artbar-navy mb-8 flex items-center gap-3">
                    <Clock className="text-artbar-taupe" /> {privateParties.timeline.title}
                 </h3>
                 <div className="space-y-8 relative pl-4">
                    <div className="absolute left-[27px] top-2 bottom-4 w-0.5 bg-artbar-bg"></div>
                    {privateParties.timeline.steps.map((step, i) => (
                       <div key={i} className="relative flex gap-6 items-start">
                          <div className="w-6 h-6 rounded-full bg-artbar-taupe border-4 border-white shadow-sm flex-shrink-0 relative z-10"></div>
                          <div>
                             <span className="text-xs font-bold text-artbar-gray bg-artbar-bg px-2 py-1 rounded mb-1 inline-block">{step.time}</span>
                             <h4 className="font-bold text-artbar-navy">{step.title}</h4>
                             <p className="text-base md:text-lg text-artbar-gray">{step.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Catering */}
              <div className="bg-artbar-bg rounded-[2.5rem] p-8 md:p-10">
                  <h3 className="text-2xl font-heading font-bold text-artbar-navy mb-6 flex items-center gap-3">
                    <Utensils className="text-artbar-taupe" /> {privateParties.catering.title}
                  </h3>
                  <p className="text-artbar-navy leading-relaxed mb-6">
                    {privateParties.catering.desc}
                  </p>
                  <ul className="space-y-4 mb-8">
                     {privateParties.catering.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-artbar-gray">
                            <Sparkles size={16} className="text-artbar-taupe mt-1 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                     ))}
                  </ul>
                  <Button size="sm" variant="outline" className="w-full bg-white border-transparent text-artbar-navy hover:bg-artbar-taupe hover:text-white">
                     {privateParties.catering.cta}
                  </Button>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};
