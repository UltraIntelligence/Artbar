'use client';

import React, { useState, useEffect } from 'react';
import { Wine, Star, Calendar, Palette, Heart, ArrowRight, Quote, ShieldCheck, Newspaper, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { PopularThemesGrid } from '../components/PopularThemesGrid';
import { useContent } from '../context/ContentContext';
import { LINE_ADD_FRIEND_URL, LINE_BRAND_ICON_SRC, SITE_IMAGES, CONCEPT_BLOCK_YOUTUBE_URL } from '../constants';

export const Home: React.FC = () => {
  const { content, site, lang } = useContent();
  const router = useRouter();
  const theme = content.theme.typography;

  const scrollToPopularThemes = () => {
    document.getElementById('popular-themes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Hero primary actions: clean pill buttons, natural sizing. */
  const heroCtaFrame =
    'inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-9 md:px-12 h-[3rem] sm:h-[3.35rem] md:h-[4rem] text-base sm:text-lg md:text-xl font-heading font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]';

  const heroImages = content.images.hero as {
    home: string;
    video?: string;
    videoMobile?: string;
  };
  const heroVideoDesktop = (heroImages.video ?? "").trim();
  const heroVideoMobile = (heroImages.videoMobile ?? "").trim() || heroVideoDesktop;
  /** MP4 sources for the concept block when no YouTube ID is set. */
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
      <section className="relative z-[1] min-h-[calc(100svh+4rem)] w-full overflow-x-hidden overflow-y-auto md:min-h-0 md:h-[100svh] md:overflow-visible">
        <div className="absolute inset-0 min-h-full md:min-h-[100svh] md:m-4 md:rounded-[2.5rem] overflow-hidden bg-artbar-navy">
          {/* Wrapper holds fade-in; img alone runs hero-bg-drift (animate-in on same node overrides CSS animation) */}
          <div className="absolute inset-0 animate-in fade-in duration-1000">
            <img
              src={heroBgSrc}
              alt="Artbar Experience"
              className="hero-bg-motion h-full w-full min-h-full min-w-full object-cover object-[center_19%]"
            />
          </div>
          {/* Neutral darkening — top-down for readability (no color cast on the photo) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 from-0% via-black/22 via-[45%] to-black/12 to-[100%] pointer-events-none" />
          {/* Brand navy — top-down; clears toward the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-artbar-navy from-0% via-artbar-navy/50 via-[58%] to-transparent to-[96%] opacity-75 pointer-events-none" />
          
          <div className="absolute inset-0 flex min-h-full flex-col items-center justify-center px-5 pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] pb-10 text-center md:min-h-[100svh] md:px-16 lg:px-20 md:pt-20 md:pb-20 max-w-[1400px] mx-auto">
            <div className="max-w-4xl flex w-full flex-col items-center gap-5 md:gap-7 lg:gap-8">

              {/* Badge */}
              <span className="animate-sheen inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading font-bold tracking-widest uppercase text-[8px] sm:text-[9px] md:text-xs">
                {site.home.hero.badge}
              </span>

              {/* Proof line — trust primer above headline */}
              <div className="flex items-center justify-center gap-2.5 md:gap-3.5 text-white/70">
                <div className="flex gap-0.5 text-yellow-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="animate-star h-4 w-4 md:h-5 md:w-5"
                      style={{ animationDelay: `${600 + i * 100}ms` }}
                      fill="currentColor"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="font-heading font-heavy text-white text-base md:text-xl tabular-nums">{site.home.hero.ratingScore}</span>
                <span className="text-white/40 text-lg">·</span>
                <span className="font-heading text-base md:text-xl text-white/70 tracking-wide">{site.home.hero.guestsNumber}+ {site.home.hero.guestsSuffix}</span>
              </div>

              {/* H1 */}
              <h1 className="font-heading font-heavy text-white tracking-tighter drop-shadow-lg flex flex-col items-center gap-1.5 md:gap-3 px-1 max-w-[min(100%,52rem)] lg:max-w-[56rem]">
                <span className={`${theme.heroTitle} block text-white leading-[0.92] md:leading-[0.94]`}>{site.home.hero.title}</span>
                <span className={`${theme.heroTitle} block text-artbar-taupe leading-[0.92] md:leading-[0.94]`}>{site.home.hero.titleHighlight}</span>
              </h1>

              {/* Subtitle */}
              <h2 className="text-white/85 font-light leading-relaxed drop-shadow-md whitespace-pre-line max-w-2xl text-base sm:text-lg md:text-2xl lg:text-[1.7rem] px-2">
                {site.home.hero.subtitle}
              </h2>

              {/* Primary CTAs */}
              <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3 md:gap-4 pt-2 md:pt-4">
                <Button
                  onClick={() => { window.location.hash = 'schedule'; }}
                  variant="taupe"
                  className={`${heroCtaFrame} !text-white shadow-[0_8px_30px_-8px_rgba(163,147,132,0.5)]`}
                >
                  {site.home.hero.ctaSchedule}
                  <ArrowRight size={16} className="shrink-0 text-white" aria-hidden />
                </Button>

                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${heroCtaFrame} bg-[#06C755] text-white shadow-[0_8px_30px_-8px_rgba(6,199,85,0.4)] hover:bg-[#05b34c]`}
                >
                  {site.home.hero.ctaLineChat}
                  <img src={LINE_BRAND_ICON_SRC} alt="" width={24} height={24} className="h-5 w-5 shrink-0 object-contain md:h-6 md:w-6" />
                </a>
              </div>

              {/* Tertiary text link */}
              <button
                type="button"
                onClick={scrollToPopularThemes}
                className="animate-sheen inline-flex items-center gap-1.5 font-heading text-base md:text-lg text-white/70 tracking-wide hover:text-white transition-colors duration-200"
              >
                {site.home.hero.ctaFindPainting}
                <ArrowRight size={14} className="text-white/50" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="relative z-[2] px-4 md:px-10">
        <div className="max-w-5xl mx-auto -mt-14 md:-mt-12 lg:-mt-16">
          
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
                   type="button"
                   onClick={() => setActiveIndex(i)}
                   aria-label={`Show testimonial ${i + 1}`}
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
            
            {/* Section heading — matches site section title scale */}
            <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy tracking-tight leading-tight whitespace-pre-line mb-10 md:mb-16 flex flex-col items-center max-w-4xl`}>
               <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-sm uppercase mb-3 md:mb-5 opacity-80">
                 {site.home.concept.est}
               </span>
               {site.home.concept.title}
            </h2>

            {/* Video / lifestyle — self-hosted MP4 (loop) + glass play → full video on YouTube */}
            <div className="group relative mb-16 md:mb-24 aspect-square md:aspect-video w-full max-w-[min(100%,42rem)] md:max-w-[min(100%,56rem)] overflow-hidden rounded-[3rem] shadow-2xl md:rounded-[5.5rem]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/40 via-transparent to-transparent pointer-events-none" />
              <a
                href={CONCEPT_BLOCK_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 top-1/2 z-20 flex h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/18 shadow-[0_8px_32px_-4px_rgba(5,55,97,0.35)] backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/28 hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-[5.5rem] md:w-[5.5rem]"
                aria-label="Watch the full video on YouTube"
              >
                <Play
                  className="ml-1 h-9 w-9 text-white drop-shadow-md md:h-12 md:w-12"
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden
                />
              </a>
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

          <PopularThemesGrid items={site.home.themes.items} />
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