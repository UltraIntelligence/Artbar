'use client';

import React, { useState, useEffect } from 'react';
import { Wine, Star, Calendar, Palette, Heart, ArrowRight, Quote, ShieldCheck, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { LINE_ADD_FRIEND_URL, LINE_BRAND_ICON_SRC, SITE_IMAGES } from '../constants';
export const Home: React.FC = () => {
  const { content, site, lang } = useContent();
  const router = useRouter();
  const theme = content.theme.typography;

  const scrollToPopularThemes = () => {
    document.getElementById('popular-themes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Hero primary actions: fixed width/height so Book / LINE / Find match; icons stay within the box. */
  const heroCtaFrame =
    'box-border inline-flex flex-nowrap items-center justify-center gap-2 rounded-full px-5 py-0 text-[0.9375rem] sm:text-base md:text-lg md:px-10 md:text-xl h-[2.95rem] sm:h-[3.35rem] md:h-[4.1rem] w-full max-w-[min(100%,17.5rem)] sm:w-[17.5rem] sm:max-w-[17.5rem] md:w-[19rem] md:max-w-[19rem] lg:w-[20rem] lg:max-w-[20rem] font-heading font-bold transition-all duration-300 transform animate-pulse-soft';

  const heroImages = content.images.hero as {
    home: string;
    video?: string;
    videoMobile?: string;
  };
  const heroVideoDesktop = (heroImages.video ?? "").trim();
  const heroVideoMobile = (heroImages.videoMobile ?? "").trim() || heroVideoDesktop;
  /** Former hero videos now play in the concept / lifestyle block. */
  const hasConceptVideo = Boolean(heroVideoDesktop || heroImages.videoMobile?.trim());

  const rawHeroHome = (heroImages.home ?? "").trim();
  const heroBgSrc =
    rawHeroHome && !rawHeroHome.includes("toolandtea.com") ? rawHeroHome : SITE_IMAGES.hero.home;

  // Testimonial cycling logic
  const [activeIndex, setActiveIndex] = useState(0);
  const topTestimonials = site.home.testimonials.items.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [topTestimonials.length]);

  // Icon mapping helper
  const getStepIcon = (index: number) => {
    const icons = [Calendar, Wine, Palette, Heart];
    return icons[index] || Calendar;
  };

  /** Hero social proof: equal-width pills; number left, stars/avatars + label right (fills width). */
  const heroProofPill =
    'grid w-full min-h-[5.75rem] sm:min-h-[6.25rem] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 md:gap-6 rounded-[1.25rem] sm:rounded-3xl border border-white/18 bg-black/40 px-5 py-4 md:px-6 md:py-5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300 hover:bg-black/50';
  const heroProofDetail =
    'flex min-w-0 w-full flex-col items-end justify-center gap-2.5 md:gap-3 text-right';
  const heroProofStat =
    'font-heading font-heavy tabular-nums leading-none text-white text-[1.45rem] sm:text-[1.75rem] md:text-[2.35rem] lg:text-[2.5rem] tracking-tight [font-feature-settings:"tnum"]';
  const heroProofMeta =
    'max-w-full font-heading text-[0.7rem] sm:text-[0.75rem] md:text-sm font-medium text-white/82 leading-snug tracking-wide';
  const heroProofSuffix =
    'max-w-full font-heading text-[0.7rem] sm:text-[0.75rem] md:text-sm font-medium text-white/82 leading-snug tracking-wide';

  const REGULAR_LOGOS = [
    { name: "Coca-Cola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "L'Oreal", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg" },
    { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Bloomberg", url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg" },
    { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Morrison Foerster", url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Morrison_and_Foerster_logo.svg" },
    { name: "GE", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/General_Electric_logo.svg" },
    { name: "LUMINE", url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Lumine_logo.svg" }
  ];

  // Structured Data for Organization (Brand)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Artbar Tokyo",
    "url": "https://artbar.co.jp",
    "logo": "https://artbar.co.jp/wp-content/uploads/ArtBar-Logo_new_200.png",
    "sameAs": [
      "https://www.facebook.com/artbartokyo",
      "https://www.instagram.com/artbartokyo"
    ]
  };

  return (
    <div className="w-full bg-artbar-bg">
      <style>{`
        @keyframes star-pop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.3) rotate(5deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .animate-star {
          animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          display: inline-block;
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s infinite ease-in-out;
        }

        /* Glassy Sheen Animation */
        @keyframes sheen {
          0% { transform: translateX(-120%) skewX(-20deg); }
          15% { transform: translateX(250%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-sheen {
          position: relative;
          overflow: hidden;
        }
        .animate-sheen::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          transform: translateX(-120%) skewX(-20deg);
          animation: sheen 5s infinite ease-in-out;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }

        /* Very slow, subtle hero background drift — ease-in-out + alternate = seamless loop */
        @keyframes hero-bg-drift {
          0% {
            transform: scale(1.045) translate(0%, 0%);
          }
          100% {
            transform: scale(1.09) translate(-0.9%, -0.55%);
          }
        }
        .hero-bg-motion {
          transform-origin: center center;
          animation: hero-bg-drift 48s ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-motion {
            animation: none;
            transform: scale(1.05);
            will-change: auto;
          }
        }
      `}</style>
      
      {/* Hero: extra min-height on small screens so all CTAs sit in the hero band; md+ stays one viewport */}
      <section className="relative z-[15] min-h-[calc(100svh+6rem)] w-full overflow-x-hidden overflow-y-auto md:min-h-0 md:h-[100svh] md:overflow-hidden">
        <div className="absolute inset-0 min-h-full md:min-h-[100svh] md:m-4 md:rounded-[2.5rem] overflow-hidden bg-artbar-navy">
          {/* Wrapper holds fade-in; img alone runs hero-bg-drift (animate-in on same node overrides CSS animation) */}
          <div className="absolute inset-0 animate-in fade-in duration-1000">
            <img
              src={heroBgSrc}
              alt="Artbar Experience"
              className="hero-bg-motion h-full w-full min-h-full min-w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-artbar-navy/80" />
          
          <div className="absolute inset-0 flex min-h-full flex-col justify-start items-center px-4 pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] text-center md:min-h-[100svh] md:justify-center md:px-16 lg:px-20 md:pt-24 md:pb-32 lg:pt-28 lg:pb-40 max-w-[1400px] mx-auto">
            <div className="max-w-5xl flex w-full flex-col items-center pt-0 gap-7 md:gap-12 lg:gap-16">
              
              <span className="animate-sheen inline-flex items-center justify-center text-center pt-1.5 pb-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading font-bold tracking-widest uppercase text-[8px] sm:text-[9px] md:text-sm max-md:translate-y-1">
                {site.home.hero.badge}
              </span>
              
              <h1 className="font-heading font-heavy text-white tracking-tighter drop-shadow-lg flex flex-col items-center gap-2 md:gap-4 lg:gap-5 px-1 max-w-[min(100%,52rem)] lg:max-w-[56rem]">
                <span className={`${theme.heroTitle} block text-white leading-[0.92] md:leading-[0.94]`}>{site.home.hero.title}</span>
                <span className={`${theme.heroTitle} block text-artbar-taupe leading-[0.92] md:leading-[0.94]`}>{site.home.hero.titleHighlight}</span>
              </h1>
              
              <div className="w-full max-w-2xl mx-auto px-1 sm:px-2">
                <h2 className={`${theme.bodyLarge} text-white/90 font-light leading-snug sm:leading-relaxed drop-shadow-md px-2 sm:px-4 whitespace-pre-line text-[0.875rem] sm:text-sm md:text-lg lg:text-xl`}>
                  {site.home.hero.subtitle}
                </h2>
              </div>

              {/* Proof + CTAs: extra desktop offset below subtitle; large gap before buttons */}
              <div className="flex w-full max-w-[min(100%,72rem)] flex-col items-center gap-10 md:gap-16 lg:gap-20 md:pt-4 lg:pt-8">
                <div className="grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                <div
                  className={`${heroProofPill} cursor-default`}
                  aria-label={`${site.home.hero.ratingScore} out of 5, ${site.home.hero.ratingSource}`}
                >
                  <span className={`${heroProofStat} shrink-0 justify-self-start`}>{site.home.hero.ratingScore}</span>
                  <div className={heroProofDetail}>
                    <div className="flex w-full justify-end gap-1 md:gap-1.5 text-yellow-400">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="animate-star h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                          style={{ animationDelay: `${600 + i * 100}ms` }}
                          fill="currentColor"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <p className={heroProofMeta}>{site.home.hero.ratingSource}</p>
                  </div>
                </div>

                <div
                  className={`${heroProofPill} cursor-default`}
                  aria-label={`${site.home.hero.guestsNumber} ${site.home.hero.guestsSuffix}`}
                >
                  <span className={`${heroProofStat} shrink-0 justify-self-start`}>{site.home.hero.guestsNumber}</span>
                  <div className={heroProofDetail}>
                    <div className="flex w-full justify-end -space-x-2 sm:-space-x-2.5 md:-space-x-3 pl-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <img
                          key={i}
                          className="animate-star relative z-[1] h-7 w-7 rounded-full border-2 border-white/35 object-cover ring-1 ring-black/20 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          style={{ animationDelay: `${900 + i * 80}ms` }}
                          src={`https://picsum.photos/seed/guestface${i}/100`}
                          alt=""
                        />
                      ))}
                    </div>
                    <p className={heroProofSuffix}>{site.home.hero.guestsSuffix}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-[2] flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-10 px-2 sm:flex-row sm:flex-wrap sm:px-0 max-md:mt-1">
                <Button
                  onClick={() => {
                    window.location.hash = 'schedule';
                  }}
                  variant="taupe"
                  className={`${heroCtaFrame} !text-white !shadow-[0_10px_40px_-10px_rgba(163,147,132,0.6)] hover:!shadow-[0_15px_50px_-10px_rgba(163,147,132,0.7)]`}
                >
                  <span className="min-w-0 flex-1 truncate text-white">{site.home.hero.ctaSchedule}</span>
                  <ArrowRight size={18} className="ml-1 shrink-0 text-white" aria-hidden />
                </Button>

                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${heroCtaFrame} border-none bg-[#06C755] text-white shadow-[0_10px_36px_-12px_rgba(6,199,85,0.45)] hover:bg-[#05b34c] hover:shadow-[0_14px_44px_-10px_rgba(6,199,85,0.5)]`}
                >
                  <span className="min-w-0 flex-1 truncate leading-tight text-white">{site.home.hero.ctaLineChat}</span>
                  <img
                    src={LINE_BRAND_ICON_SRC}
                    alt=""
                    width={32}
                    height={32}
                    className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8"
                  />
                </a>

                <Button
                  type="button"
                  onClick={scrollToPopularThemes}
                  variant="ghost"
                  size="cta"
                  className={`${heroCtaFrame} !border-2 !border-white/85 !bg-white/10 !text-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm hover:!bg-white/18 hover:!text-white focus:!ring-white/40`}
                >
                  <span className="min-w-0 flex-1 truncate text-center leading-tight text-white">
                    {site.home.hero.ctaFindPainting}
                  </span>
                  <ArrowRight size={18} className="ml-1 shrink-0 text-white opacity-90" aria-hidden />
                </Button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="relative z-10 px-4 md:px-10">
        <div className="max-w-5xl mx-auto -mt-10 md:-mt-8 lg:-mt-10 -translate-y-px">
          
          {/* Centered High-Impact Review Card (Horizontal Cycling Animation) */}
          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.18)] flex flex-col items-center text-center relative overflow-hidden group mb-12 min-h-[360px] md:min-h-[420px] justify-center">
            {topTestimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 p-8 md:p-14 pb-16 md:pb-20 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : idx < activeIndex 
                      ? 'opacity-0 -translate-x-full pointer-events-none'
                      : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '100ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '200ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '300ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '400ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '500ms' }} />
                </div>

                <div className="relative mb-8">
                    <Quote size={40} className="text-artbar-taupe/10 absolute -top-4 -left-4 md:-top-6 md:-left-10 md:w-16 md:h-16" />
                    <p className="text-lg md:text-3xl font-heading font-normal text-artbar-navy leading-snug max-w-xl relative z-10 px-4">
                      "{testimonial.text}"
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    {testimonial.userImage ? (
                      <img
                        src={testimonial.userImage}
                        alt=""
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mb-3 shadow-inner ring-2 ring-white"
                      />
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-artbar-bg rounded-full flex items-center justify-center text-artbar-navy font-heading font-heavy text-base md:text-lg mb-3 shadow-inner">
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                    <p className="font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-[0.15em]">{testimonial.author}</p>
                    {testimonial.role && <p className="text-[9px] md:text-[10px] text-artbar-taupe font-bold uppercase tracking-[0.1em] mt-0.5">{testimonial.role}</p>}
                </div>
              </div>
            ))}

            {/* Pagination dots */}
            <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
               {topTestimonials.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => setActiveIndex(i)}
                   className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-artbar-taupe' : 'w-1 bg-gray-200 hover:bg-gray-300'}`}
                 />
               ))}
            </div>
          </div>

          {/* Standardized Corporate Logo Grid */}
          <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="bg-artbar-navy py-5 text-center">
               <h3 className="font-heading font-heavy text-white text-[10px] md:text-xs tracking-[0.4em] uppercase">Meet Our Regulars</h3>
            </div>
            <div className="p-10 md:p-20 flex flex-col items-center">
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16 items-center justify-items-center mb-16">
                  {REGULAR_LOGOS.map((logo, i) => (
                    <div key={i} className="w-full flex items-center justify-center h-12 md:h-20 max-w-[160px] md:max-w-[200px] px-2">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="max-h-[60%] max-w-[80%] object-contain transition-all duration-700 opacity-100 grayscale-0 filter drop-shadow-sm" 
                        style={{ 
                          transform: logo.name === 'Coca-Cola' || logo.name === 'Netflix' ? 'scale(0.9)' : 'scale(1)' 
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const span = document.createElement('span');
                            span.innerText = logo.name;
                            span.className = "font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-widest text-center leading-tight opacity-70";
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>
                  ))}
               </div>
               
               <Button
                  type="button"
                  variant="taupe"
                  size="cta"
                  onClick={() => router.push('/team-building')}
                  className="inline-flex w-full max-w-xs gap-2 whitespace-nowrap hover:scale-[1.02] sm:w-auto sm:max-w-none"
               >
                  Book Team Building
                  <ArrowRight size={18} className="shrink-0" aria-hidden />
               </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Concept Section - Refined for better balance */}
      <section className="py-24 md:py-64 bg-artbar-bg overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Massive Centered Heading */}
            <h2 className="text-[2.25rem] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-heading font-heavy text-artbar-navy leading-[1] md:leading-[0.85] tracking-tighter whitespace-pre-line mb-12 md:mb-24 flex flex-col items-center">
               <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-lg uppercase mb-4 md:mb-8 opacity-80">
                 {site.home.concept.est}
               </span>
               {site.home.concept.title}
            </h2>

            {/* High impact centered collage — video (ex–hero) or fallback image */}
            <div className="group relative mb-16 md:mb-24 aspect-square w-full max-w-[min(100%,42rem)] overflow-hidden rounded-[3rem] shadow-2xl md:rounded-[5.5rem]">
              {hasConceptVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105"
                >
                  <source
                    src={heroVideoDesktop || heroVideoMobile}
                    type="video/mp4"
                    media="(min-width: 768px)"
                  />
                  <source src={heroVideoMobile || heroVideoDesktop} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={content.images.concept.main}
                  alt="Artbar Lifestyle"
                  className="h-full w-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/40 via-transparent to-transparent" />
               
               {/* Detail Floating Image Overlay */}
               <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-20 w-32 h-32 md:w-80 md:h-80 rounded-[2rem] md:rounded-[4.5rem] overflow-hidden border-[8px] md:border-[24px] border-artbar-bg shadow-2xl hidden sm:block">
                  <img src={content.images.concept.detail} alt="Art Detail" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
               </div>

               {/* Centered Rating Overlay - SHRUNKEN FOR BETTER FOCUS */}
               <div className="absolute bottom-6 left-6 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-10 rounded-2xl md:rounded-[4rem] shadow-xl border border-white/50 flex flex-col items-center animate-pulse-soft pointer-events-none min-w-[120px] md:min-w-[260px]">
                  <div className="flex items-baseline justify-center gap-0.5 md:gap-1 mb-2 md:mb-4">
                    <span className="text-5xl md:text-8xl lg:text-9xl font-heading font-heavy text-artbar-navy leading-none tracking-tighter tabular-nums">
                      {site.home.hero.ratingScore}
                    </span>
                    <span className="text-yellow-500 text-3xl md:text-6xl lg:text-7xl leading-none" aria-hidden>★</span>
                  </div>
                  <div className="flex text-yellow-500 gap-0.5 md:gap-2 mb-2 md:mb-6">
                     {[1,2,3,4,5].map(i => (
                       <Star key={i} fill="currentColor" className="w-6 h-6 md:w-12 md:h-12" />
                     ))}
                  </div>
                  <p className="text-[8px] md:text-xs font-heavy text-artbar-navy uppercase tracking-[0.3em] opacity-90 text-center">
                    {site.home.concept.ratingLabel}
                  </p>
               </div>
            </div>

            {/* Bold Paragraph Copy - NORMAL SIZED */}
            <div className="max-w-4xl mx-auto space-y-12">
               <p className="text-artbar-navy text-lg md:text-2xl leading-relaxed md:leading-relaxed font-normal">
                 {site.home.concept.p1}
               </p>

               {/* Social Proof centered stats */}
               <div className="flex flex-col items-center gap-8">
                  <div className="flex -space-x-5 md:-space-x-8">
                      {[1,2,3,4,5,6].map(i => (
                        <img key={i} className="w-14 h-14 md:w-24 md:h-24 rounded-full border-[3px] md:border-[6px] border-white shadow-xl object-cover" src={`https://picsum.photos/seed/trust${i}/150`} alt="Artbar Guest" />
                      ))}
                      <div className="w-[4.5rem] h-[4.5rem] md:w-36 md:h-36 rounded-full border-[3px] md:border-[6px] border-white bg-artbar-navy text-white flex items-center justify-center shadow-xl px-1">
                        <span className="text-sm md:text-2xl font-heading font-heavy tabular-nums leading-none text-center">
                          {site.home.concept.guestsCount}
                        </span>
                      </div>
                  </div>
                  <div className="text-center">
                     <p className="text-artbar-navy font-heading font-bold text-3xl md:text-5xl mb-3 tabular-nums">{site.home.concept.guestsLabel}</p>
                     <p className="text-[10px] md:text-base font-bold text-artbar-taupe uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                        <ShieldCheck size={20} className="text-green-600" /> Professional Bilingual Instruction Provided
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

       {/* How It Works */}
       <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[2.5rem] md:rounded-[3rem]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-20">
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-6`}>{site.home.howItWorks.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.howItWorks.subtitle}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {site.home.howItWorks.steps.map((step, index) => {
              const Icon = getStepIcon(index);
              return (
                <div key={index} className="group relative bg-artbar-bg p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-artbar-navy transition-all duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white text-artbar-taupe flex items-center justify-center mb-6 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <Icon size={24} className="md:w-7 md:h-7" />
                  </div>
                  <h3 className={`${theme.cardTitle} font-heading font-bold mb-3 text-artbar-navy group-hover:text-white transition-colors text-lg md:text-2xl`}>{step.title}</h3>
                  <p className={`${theme.body} text-artbar-gray group-hover:text-white/80 transition-colors leading-relaxed text-sm md:text-base`}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section
        id="popular-themes"
        className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-32 bg-artbar-bg"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-6xl font-heading font-heavy text-artbar-navy mb-4 tracking-tight leading-none">{site.home.themes.title}</h2>
              <p className={`${theme.bodyLarge} text-artbar-gray max-w-lg text-sm md:text-xl`}>
                {site.home.themes.subtitle}
              </p>
            </div>
            <Button
                variant="taupe"
                size="cta"
                onClick={() => window.location.hash = 'schedule'}
                className="w-full uppercase tracking-widest text-[10px] sm:text-xs md:text-xs md:w-auto"
            >
              {site.home.themes.cta}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {site.home.themes.items.map((themeItem, index) => {
              const slug = themeItem.title.toLowerCase().replace(/ /g, '-').replace('!', '');
              return (
                <Link 
                  key={index} 
                  href={`/themes/${slug}`}
                  className="group relative h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <img 
                    src={themeItem.image} 
                    alt={themeItem.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy via-artbar-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-10 w-full">
                    <h3 className="text-lg md:text-3xl font-heading font-bold text-white mb-2 leading-tight tracking-tight">{themeItem.title}</h3>
                    <p className="text-white/85 text-[10px] sm:text-xs md:text-sm font-light leading-snug md:leading-relaxed mb-0 md:mb-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                      {themeItem.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[2.5rem] md:rounded-[3rem]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
           <div className="text-center mb-12 md:mb-20">
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-4`}>{site.home.features.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.features.subtitle}
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {site.home.features.items.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-full h-56 md:h-64 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 shadow-sm relative">
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-artbar-navy/10 group-hover:bg-transparent transition-colors"></div>
                   </div>
                   <h3 className="text-xl md:text-2xl font-heading font-bold text-artbar-navy mb-3 md:mb-4">{feature.title}</h3>
                   <p className="text-artbar-gray leading-relaxed text-sm md:text-base">
                     {feature.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Bottom Testimonials Grid */}
      <section className="py-16 md:py-32 bg-artbar-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
             <h2 className="text-xl md:text-3xl font-heading font-heavy text-artbar-navy text-center px-4 uppercase tracking-widest">{site.home.testimonials.title}</h2>
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {site.home.testimonials.items.map((item, index) => (
              <div key={index} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 relative flex flex-col h-full">
                 <div className="absolute top-6 right-6 md:top-8 md:right-8 text-artbar-taupe opacity-20">
                    <Heart size={32} fill="currentColor" />
                 </div>
                 <div className="flex items-center gap-1.5 text-yellow-400 mb-6">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                 </div>
                 <p className="text-artbar-navy text-base md:text-lg leading-relaxed mb-8 font-light italic flex-grow">
                   "{item.text}"
                 </p>
                 <div className="flex items-center gap-4 mt-auto">
                    {item.userImage ? (
                      <img
                        src={item.userImage}
                        alt=""
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 ring-2 ring-artbar-bg"
                      />
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-artbar-bg rounded-full flex items-center justify-center text-artbar-navy font-bold text-sm md:text-lg shrink-0">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div>
                        <p className="font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-wide">{item.author}</p>
                        {item.role && <p className="text-[9px] md:text-xs text-artbar-taupe font-bold uppercase tracking-wider">{item.role}</p>}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In Section - GALLERY STYLE */}
      <section className="py-24 md:py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
             <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">Media Coverage</span>
             <h2 className="text-4xl md:text-7xl font-heading font-heavy text-artbar-navy tracking-tight">As Seen In</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-10">
             {content.media.map((item, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                   {/* Background Image (Main) */}
                   <img 
                      src={item.image} 
                      alt={item.outlet}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                      onError={(e) => (e.target as HTMLImageElement).src = `https://picsum.photos/seed/media${i}/600/800`}
                   />
                   
                   {/* Dark Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/90 via-artbar-navy/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                   
                   {/* Foreground Content */}
                   <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 transform transition-transform duration-500 group-hover:scale-105">
                         <div className="h-10 md:h-12 w-full flex items-center justify-center mb-2">
                            {item.logo ? (
                               <img 
                                 src={item.logo} 
                                 alt={item.outlet} 
                                 className="max-h-full max-w-full object-contain"
                                 onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                               />
                            ) : (
                               <span className="text-[10px] font-bold text-artbar-navy uppercase tracking-widest">{item.outlet}</span>
                            )}
                         </div>
                         <span className="text-[10px] md:text-[11px] font-mono text-artbar-taupe font-bold tracking-widest block border-t border-gray-100 pt-2">
                            {item.date}
                         </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto bg-artbar-navy rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl">
           <img 
              src={content.images.cta || "https://picsum.photos/seed/artbarcta/1920/600"} 
              alt="Artbar Studio" 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-artbar-navy/95 via-artbar-navy/80 to-artbar-navy/40"></div>
           
           <div className="relative z-10 px-8 py-12 md:p-32 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 text-center md:text-left">
              <div className="max-w-2xl">
                 <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-sm uppercase mb-4 block">{site.home.cta.badge}</span>
                 <h2 className="text-3xl md:text-7xl font-heading font-heavy text-white mb-6 leading-tight">
                   {site.home.cta.title}
                 </h2>
                 <p className="text-base md:text-xl text-artbar-light-taupe/90 font-light max-w-lg leading-relaxed">
                   {site.home.cta.subtitle}
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
                 <Button
                   variant="taupe"
                   size="cta"
                   onClick={() => window.location.hash = 'schedule'}
                   className="w-full min-w-0 shadow-xl sm:w-auto sm:min-w-[12.5rem]"
                 >
                   {site.home.cta.btnBook}
                 </Button>
                 <Button
                   onClick={() => router.push('/contact')}
                   variant="outlineWhite"
                   size="cta"
                   className="w-full sm:w-auto sm:min-w-[12.5rem]"
                 >
                   {site.home.cta.btnContact}
                 </Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};