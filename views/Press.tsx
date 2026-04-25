'use client';

import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Press: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { content, site, lang, jpCopy } = useContent();
  const carouselReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
           <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">{site.pressPage.badge}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-6">{site.pressPage.title}</h1>
          <p className="text-lg md:text-xl text-artbar-gray">{site.pressPage.subtitle}</p>
        </div>

        <div ref={carouselReveal.ref} className={`reveal relative mb-32 group ${carouselReveal.isVisible ? 'visible' : ''}`}>
          <div className="hidden md:block">
            <button 
              type="button"
              onClick={() => scroll('left')} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 bg-white shadow-lg min-w-[44px] min-h-[44px] w-12 h-12 rounded-full flex items-center justify-center text-artbar-navy hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label={lang === 'en' ? 'Scroll left' : jpCopy.ui.press.scrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              type="button"
              onClick={() => scroll('right')} 
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 bg-white shadow-lg min-w-[44px] min-h-[44px] w-12 h-12 rounded-full flex items-center justify-center text-artbar-navy hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              aria-label={lang === 'en' ? 'Scroll right' : jpCopy.ui.press.scrollRight}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory px-2 touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {content.media.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[280px] h-[400px] relative rounded-[2rem] overflow-hidden shadow-lg snap-start bg-gray-200 group/card transition-transform hover:-translate-y-2 duration-300"
              >
                <img 
                  src={item.image || `https://picsum.photos/seed/press${idx}/300/500`} 
                  alt={item.outlet} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/90 via-artbar-navy/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm h-12 flex items-center justify-center max-w-[120px]">
                     {item.logo ? (
                       <img 
                         src={item.logo} 
                         alt={`${item.outlet} logo`} 
                         className="h-full w-auto object-contain" 
                       />
                     ) : (
                       <span className="text-artbar-navy font-bold text-xs uppercase tracking-wider">{item.outlet.split(' ')[0]}</span>
                     )}
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2 leading-tight drop-shadow-sm">{item.outlet}</h3>
                    <p className="font-mono text-sm md:text-base opacity-80 bg-artbar-navy/50 inline-block px-2 py-1 rounded backdrop-blur-sm border border-white/20">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={timelineReveal.ref} className={`reveal bg-artbar-navy text-white rounded-[3rem] p-8 md:p-24 shadow-2xl relative overflow-hidden ${timelineReveal.isVisible ? 'visible' : ''}`}>
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 relative z-10">{site.pressPage.popupsTitle}</h2>
          <div className="border-l-2 border-white/20 pl-8 md:pl-10 space-y-16 relative z-10">
            {site.pressPage.popups.map((event, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[43px] md:-left-[51px] top-1 w-6 h-6 rounded-full bg-artbar-taupe border-4 border-artbar-navy"></div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">{event.title}</h3>
                <div className="flex items-center gap-4 text-artbar-light-taupe">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded text-sm">{event.date}</span>
                    <span className="text-sm md:text-base">{event.loc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
