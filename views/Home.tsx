'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Wine,
  Calendar,
  Palette,
  Heart,
  ArrowRight,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { PopularThemesGrid } from '../components/PopularThemesGrid';
import { StarRating } from '../components/StarRating';
import { useContent } from '../context/ContentContext';
import {
  LINE_ADD_FRIEND_URL,
  LINE_BRAND_ICON_SRC,
  SITE_IMAGES,
  CONCEPT_BLOCK_YOUTUBE_URL,
  PARTNER_LOGOS,
} from '../constants';
import { PartnerLogo } from '../components/PartnerLogo';
import {
  formatGuestCountCompactK,
  formatGuestCountDisplay,
  formatGuestConceptLabel,
} from '../lib/guest-count';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Fixed carousel height (~Ida Don’s testimonial) so the page doesn’t jump between slides.
 * Taller copy scrolls inside the quote area.
 */
const TESTIMONIAL_CAROUSEL_CARD_HEIGHT_CLASS =
  'h-[31rem] min-h-[31rem] sm:h-[33rem] sm:min-h-[33rem] md:h-[37rem] md:min-h-[37rem] lg:h-[39rem] lg:min-h-[39rem]';

/**
 * Square face crops for the concept social strip — Unsplash (hotlink OK per Unsplash license).
 * Curated East Asian–presenting adults for a Tokyo audience (mixed genders).
 */
const CONCEPT_SOCIAL_AVATAR_URLS = [
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=300&h=300&q=80',
] as const;

export const Home: React.FC = () => {
  const { content, site, lang } = useContent();
  const router = useRouter();
  const theme = content.theme.typography;
  /** JP hero: nowrap per line; fluid up to 1.9rem below `sm` so glyphs fit ~320px width, then same scale as EN. */
  const heroTitleScale =
    lang === 'jp'
      ? 'text-[clamp(1.5rem,7.4vw,1.9rem)] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.75rem] 2xl:text-[6.25rem] tracking-tight'
      : theme.heroTitle;
  const guestCountFormatted = formatGuestCountDisplay(lang);
  const guestConceptLabel = formatGuestConceptLabel(site.home.concept.guestsLabel, lang, guestCountFormatted);
  /** EN concept line: second line "— …" only from `md` (single line on small screens). */
  const enGuestConceptSplit =
    lang === 'en' && guestConceptLabel.includes(' — ')
      ? (() => {
          const parts = guestConceptLabel.split(' — ');
          if (parts.length < 2) return null;
          return { line1: parts[0], line2: `— ${parts.slice(1).join(' — ')}` };
        })()
      : null;

  const conceptReveal = useScrollReveal();
  const howItWorksReveal = useScrollReveal();
  const themesReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const featuredTestimonialsReveal = useScrollReveal();
  const carouselTestimonialsReveal = useScrollReveal();
  const asSeenInReveal = useScrollReveal();
  const bottomCtaReveal = useScrollReveal();

  const scrollToPopularThemes = () => {
    document.getElementById('popular-themes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Hero primary actions: fixed height + `leading-none` so the line box isn’t taller below the baseline (common JP/Latin mix). Inner row uses a tiny translate-y for optical center in the pill. */
  const heroCtaFrame =
    'inline-flex items-center justify-center rounded-full px-7 sm:px-9 md:px-12 h-[3rem] sm:h-[3.35rem] md:h-[4rem] py-0 text-base sm:text-lg md:text-xl font-heading font-bold tracking-wide leading-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]';
  const heroCtaInner =
    'inline-flex items-center translate-y-px gap-2.5 sm:translate-y-0.5';

  const heroImages = content.images.hero as {
    home: string;
    homeMobile?: string;
    video?: string;
    videoMobile?: string;
  };
  const heroVideoDesktop = (heroImages.video ?? "").trim();
  const heroVideoMobile = (heroImages.videoMobile ?? "").trim() || heroVideoDesktop;
  /** MP4 sources for the concept block when no YouTube ID is set. */
  const hasConceptVideo = Boolean(heroVideoDesktop || heroImages.videoMobile?.trim());

  const encMediaSrc = (path: string) => (path.includes(" ") ? encodeURI(path) : path);

  const rawHeroHome = (heroImages.home ?? "").trim();
  const heroBgSrc =
    rawHeroHome && !rawHeroHome.includes("toolandtea.com") ? rawHeroHome : SITE_IMAGES.hero.home;
  const heroBgIsVideo = /\.mp4(\?|$)/i.test(heroBgSrc);
  const heroBgUrl = encMediaSrc(heroBgSrc);

  const rawHeroHomeMobile = (heroImages.homeMobile ?? "").trim();
  const heroBgMobileSrc = heroBgIsVideo
    ? rawHeroHomeMobile && !rawHeroHomeMobile.includes("toolandtea.com")
      ? rawHeroHomeMobile
      : SITE_IMAGES.hero.homeMobile ?? heroBgSrc
    : heroBgSrc;
  const heroBgMobileUrl = encMediaSrc(heroBgMobileSrc);

  const conceptVideoDesktopUrl = encMediaSrc(heroVideoDesktop || heroVideoMobile);
  const conceptVideoMobileUrl = encMediaSrc(heroVideoMobile || heroVideoDesktop);

  /**
   * MP4 hero: show only neutral page bg + progress until the active video can play — no still, no navy, no poster flash.
   * Long timeout so iOS never stays blocked if events misfire.
   */
  const [heroVideoReady, setHeroVideoReady] = useState(!heroBgIsVideo);

  useEffect(() => {
    if (!heroBgIsVideo) {
      setHeroVideoReady(true);
      return;
    }
    setHeroVideoReady(false);
    const id = window.setTimeout(() => setHeroVideoReady(true), 15000);
    return () => window.clearTimeout(id);
  }, [heroBgIsVideo, heroBgSrc, heroBgMobileSrc]);

  const markHeroVideoReady = React.useCallback(() => {
    setHeroVideoReady(true);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const carouselTestimonials = site.home.testimonials.carousel;
  const featuredTestimonials = site.home.testimonials.featured;
  const activeCarouselTestimonial = carouselTestimonials[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [lang]);

  useEffect(() => {
    if (paused || carouselTestimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselTestimonials.length, paused]);

  useEffect(() => {
    if (!paused) return;
    const resume = setTimeout(() => setPaused(false), 12000);
    return () => clearTimeout(resume);
  }, [paused]);

  const goPrevTestimonial = () => {
    if (carouselTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + carouselTestimonials.length) % carouselTestimonials.length);
    setPaused(true);
  };

  const goNextTestimonial = () => {
    if (carouselTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % carouselTestimonials.length);
    setPaused(true);
  };

  // Icon mapping helper
  const getStepIcon = (index: number) => {
    const icons = [Calendar, Wine, Palette, Heart];
    return icons[index] || Calendar;
  };


  const meetRegularsHeading = lang === 'en' ? 'Meet Our Regulars' : 'ご利用企業様';
  const bookTeamBuildingCta = lang === 'en' ? 'Book Team Building' : 'チームビルディングを予約';
  const bilingualLine1 = 'Professional Bilingual';
  const bilingualLine2 = 'Instruction Provided';
  const bilingualJpLine1 = 'プロのバイリンガル';
  const bilingualJpLine2 = 'インストラクター';
  const mediaCoverageLabel = lang === 'en' ? 'Media Coverage' : 'メディア掲載';
  const asSeenInHeading = lang === 'en' ? 'As Seen In' : 'メディア掲載実績';

  return (
    <div className="w-full bg-artbar-bg">
      {/* Hero: extra min-height on small screens so all CTAs sit in the hero band; md+ stays one viewport */}
      <section className="relative z-[1] min-h-[calc(100svh+4rem)] w-full overflow-x-hidden overflow-y-auto md:min-h-0 md:h-[100svh] md:overflow-visible">
        <div
          className={`absolute inset-0 min-h-full md:min-h-[100svh] md:m-4 md:rounded-[var(--radius-section)] overflow-hidden ${
            heroBgIsVideo && !heroVideoReady ? 'bg-artbar-bg' : 'bg-artbar-navy'
          }`}
        >
          <div className="absolute inset-0 z-0">
            <div className="relative isolate h-full w-full min-h-full min-w-full">
              {heroBgIsVideo ? (
                <>
                  {/* Two videos: `<source media>` on MP4 is ignored/unreliable in Safari; CSS breakpoint is reliable */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={heroBgUrl}
                    onPlaying={markHeroVideoReady}
                    onCanPlay={(e) => {
                      if (e.currentTarget.readyState >= 3) markHeroVideoReady();
                    }}
                    className={`absolute inset-0 z-[1] hidden h-full w-full object-cover object-[center_19%] transition-opacity duration-500 ease-out md:block ${
                      heroVideoReady ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden
                  />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={heroBgMobileUrl}
                    onPlaying={markHeroVideoReady}
                    onCanPlay={(e) => {
                      if (e.currentTarget.readyState >= 3) markHeroVideoReady();
                    }}
                    className={`absolute inset-0 z-[1] h-full w-full object-cover object-[center_19%] transition-opacity duration-500 ease-out md:hidden ${
                      heroVideoReady ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden
                  />
                </>
              ) : (
                <Image
                  src={heroBgSrc}
                  alt="Artbar Experience"
                  fill
                  priority
                  sizes="100vw"
                  unoptimized={heroBgSrc.toLowerCase().endsWith('.gif')}
                  className={`object-cover object-[center_19%] ${
                    heroBgSrc.toLowerCase().endsWith('.gif') ? '' : 'hero-bg-motion'
                  }`}
                />
              )}
            </div>
          </div>
          {/* Two-layer wash — only after MP4 is ready (no gradients over loading plate) */}
          <div
            className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent from-[18%] via-artbar-navy/50 via-[55%] to-artbar-navy/90 to-100% transition-opacity duration-500 ${
              heroBgIsVideo && !heroVideoReady ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-artbar-taupe/80 from-0% to-transparent to-[52%] transition-opacity duration-500 ${
              heroBgIsVideo && !heroVideoReady ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden
          />

          {heroBgIsVideo && !heroVideoReady && (
            <div
              className="absolute inset-0 z-[20] flex flex-col items-center justify-center gap-5 bg-artbar-bg"
              aria-busy="true"
              aria-live="polite"
            >
              <span className="sr-only">
                {lang === 'jp' ? 'ヒーローを読み込み中' : 'Loading hero'}
              </span>
              <div className="h-1.5 w-56 max-w-[min(100%,14rem)] overflow-hidden rounded-full bg-artbar-navy/12">
                <div className="h-full w-1/3 rounded-full bg-artbar-taupe animate-hero-indeterminate" />
              </div>
            </div>
          )}

          <div
            className={`absolute inset-0 z-[3] flex min-h-full flex-col items-center justify-center px-5 pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] pb-10 text-center md:min-h-[100svh] md:px-16 lg:px-20 md:pt-20 md:pb-20 max-w-[1400px] mx-auto transition-opacity duration-500 ${
              heroBgIsVideo && !heroVideoReady ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <div className="max-w-4xl flex w-full flex-col items-center gap-5 md:gap-7 lg:gap-8">

              {/* Badge — JP: `font-sans` inner; padding between earlier symmetric and the heavier top bias */}
              <span
                className={`animate-sheen inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 text-center text-white ${
                  lang === 'jp'
                    ? 'pt-[0.38rem] pb-[0.32rem] text-xs sm:text-sm md:text-base normal-case leading-none tracking-wide'
                    : 'py-1.5 font-heading font-bold text-[8px] sm:text-[9px] md:text-xs uppercase tracking-widest'
                }`}
              >
                {lang === 'jp' ? (
                  <span className="font-sans font-bold leading-none">{site.home.hero.badge}</span>
                ) : (
                  site.home.hero.badge
                )}
              </span>

              {/* Proof line — trust primer above headline */}
              <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-1 text-white/70 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2.5 sm:gap-y-0 md:gap-3.5">
                <div className="flex shrink-0 items-center gap-2.5 md:gap-3.5">
                  <StarRating
                    size={16}
                    animated
                    delayBase={600}
                    className="md:[&>svg]:w-5 md:[&>svg]:h-5"
                  />
                  <span className="font-heading font-heavy text-white text-base md:text-xl tabular-nums">{site.home.hero.ratingScore}</span>
                  <span className="hidden text-white/40 text-lg sm:inline" aria-hidden>
                    ·
                  </span>
                </div>
                <span
                  className={`font-heading min-w-0 text-center text-white/70 sm:w-auto sm:max-w-[min(100%,36rem)] md:tracking-wide ${
                    lang === 'jp'
                      ? 'w-full max-w-full whitespace-nowrap text-[10px] tracking-tight sm:px-0 sm:text-xs md:text-xl'
                      : 'w-full text-sm leading-snug tracking-normal md:text-xl'
                  }`}
                >
                  {lang === 'jp'
                    ? site.home.hero.guestsSuffix.replace(/\{\{count\}\}/g, guestCountFormatted)
                    : `${guestCountFormatted}+ ${site.home.hero.guestsSuffix}`}
                </span>
              </div>

              <h1 className="font-heading font-heavy text-white tracking-tighter flex flex-col items-center gap-1.5 md:gap-3 px-1 max-w-[min(100%,52rem)] lg:max-w-[56rem]">
                <span
                  className={`${heroTitleScale} block text-white leading-[0.92] md:leading-[0.94] ${lang === 'jp' ? 'text-center whitespace-nowrap' : ''}`}
                >
                  {site.home.hero.title}
                </span>
                <span
                  className={`${heroTitleScale} block text-white leading-[0.92] md:leading-[0.94] ${lang === 'jp' ? 'text-center whitespace-nowrap' : ''}`}
                >
                  {site.home.hero.titleHighlight}
                </span>
              </h1>

              <h2
                className={`text-white/85 font-light leading-relaxed max-w-2xl text-base sm:text-lg md:text-2xl lg:text-[1.7rem] px-2 ${
                  lang === 'jp' ? '' : 'whitespace-pre-line'
                }`}
              >
                {lang === 'jp' ? (
                  <span dangerouslySetInnerHTML={{ __html: site.home.hero.subtitle }} />
                ) : (
                  site.home.hero.subtitle
                )}
              </h2>

              {/* Primary CTAs */}
              <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3 md:gap-4 pt-2 md:pt-4">
                <Button
                  onClick={() => { window.location.hash = 'schedule'; }}
                  variant="taupe"
                  className={`${heroCtaFrame} !text-white shadow-[0_8px_30px_-8px_rgba(163,147,132,0.5)]`}
                >
                  <span className={heroCtaInner}>
                    {site.home.hero.ctaSchedule}
                    <ArrowRight size={16} className="shrink-0 text-white" aria-hidden />
                  </span>
                </Button>

                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${heroCtaFrame} bg-[#06C755] text-white shadow-[0_8px_30px_-8px_rgba(6,199,85,0.4)] hover:bg-[#05b34c]`}
                >
                  <span className={heroCtaInner}>
                    {site.home.hero.ctaLineChat}
                    <img src={LINE_BRAND_ICON_SRC} alt="" width={24} height={24} className="h-5 w-5 shrink-0 object-contain md:h-6 md:w-6" />
                  </span>
                </a>
              </div>

              {/* Tertiary text link */}
              <button
                type="button"
                onClick={scrollToPopularThemes}
                className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-heading text-base md:text-lg text-white/70 tracking-wide hover:text-white transition-colors duration-200"
              >
                <span className="animate-text-shimmer">{site.home.hero.ctaFindPainting}</span>
                <ArrowRight size={14} className="animate-text-shimmer text-white/50" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured testimonials — overlap hero bottom to bridge into next section */}
      <section className="relative z-[3] bg-transparent px-4 pb-10 md:px-10 md:pb-14">
        <div
          ref={featuredTestimonialsReveal.ref}
          className={`mx-auto max-w-[1400px] -mt-16 sm:-mt-20 md:-mt-28 lg:-mt-32 reveal ${featuredTestimonialsReveal.isVisible ? 'visible' : ''}`}
        >
          <div
            className={`grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 reveal-stagger ${featuredTestimonialsReveal.isVisible ? 'visible' : ''}`}
          >
            {featuredTestimonials.map((item, index) => (
              <div
                key={index}
                className="relative flex h-full flex-col rounded-[var(--radius-card)] border border-white/60 bg-white p-8 shadow-[0_24px_70px_-28px_rgba(5,55,97,0.35)] transition-all duration-300 hover:shadow-[0_28px_80px_-24px_rgba(5,55,97,0.35)] md:rounded-[var(--radius-section)] md:p-10"
              >
                <div className="absolute right-6 top-6 text-artbar-taupe opacity-20 md:right-8 md:top-8">
                  <Heart size={32} fill="currentColor" />
                </div>
                <StarRating size={14} className="mb-6" />
                <p className="mb-8 flex-grow text-base font-light italic leading-relaxed text-artbar-navy md:text-lg">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-4">
                  {item.userImage ? (
                    <img
                      src={item.userImage}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-artbar-bg md:h-12 md:w-12"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-artbar-bg text-sm font-bold text-artbar-navy md:h-12 md:w-12 md:text-lg">
                      {item.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase tracking-wide text-artbar-navy md:text-sm">
                      {item.author}
                    </p>
                    {item.role && (
                      <p className="text-[9px] font-bold uppercase tracking-wider text-artbar-taupe md:text-xs">{item.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section - Refined for better balance */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-64 bg-artbar-bg overflow-hidden relative grain">
        <div ref={conceptReveal.ref} className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-[2]">
          <div className={`flex flex-col items-center text-center reveal ${conceptReveal.isVisible ? 'visible' : ''}`}>
            
            {/* Section heading — matches site section title scale */}
            <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy tracking-tight leading-tight whitespace-pre-line mb-10 md:mb-16 flex flex-col items-center max-w-4xl`}>
               <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-sm uppercase mb-3 md:mb-5 opacity-80">
                 {site.home.concept.est}
               </span>
               {site.home.concept.title}
            </h2>

            {/* Video / lifestyle — self-hosted MP4 (loop) + glass play → full video on YouTube */}
            <div className="group relative mb-16 md:mb-24 aspect-square md:aspect-video w-full max-w-[min(100%,42rem)] md:max-w-[min(100%,56rem)] overflow-hidden rounded-[var(--radius-feature)] shadow-2xl md:rounded-[var(--radius-feature)]">
              {hasConceptVideo ? (
                <>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={content.images.concept.main}
                    src={conceptVideoDesktopUrl}
                    className="hidden h-full w-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105 md:block"
                  />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={content.images.concept.main}
                    src={conceptVideoMobileUrl}
                    className="h-full w-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105 md:hidden"
                  />
                </>
              ) : (
                <Image
                  src={content.images.concept.main}
                  alt="Artbar Lifestyle"
                  fill
                  sizes="(max-width: 768px) 100vw, min(56rem, 100vw)"
                  className="object-cover transition-transform duration-[4s] ease-out group-hover:scale-105"
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
                      {CONCEPT_SOCIAL_AVATAR_URLS.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-full border-[3px] border-white object-cover shadow-xl md:h-24 md:w-24 md:border-[6px]"
                        />
                      ))}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-artbar-navy px-0.5 text-white shadow-xl md:h-24 md:w-24 md:border-[6px]">
                        <span className="text-center font-heading text-[0.65rem] font-heavy tabular-nums leading-none md:text-lg">
                          {formatGuestCountCompactK(lang)}
                        </span>
                      </div>
                  </div>
                  <div className="text-center">
                     <p className="text-artbar-navy font-heading font-bold text-3xl md:text-5xl mb-3 tabular-nums">
                       {enGuestConceptSplit ? (
                         <>
                           <span className="md:hidden">{guestConceptLabel}</span>
                           <span className="hidden md:flex md:flex-col md:items-center md:gap-1">
                             <span>{enGuestConceptSplit.line1}</span>
                             <span>{enGuestConceptSplit.line2}</span>
                           </span>
                         </>
                       ) : (
                         guestConceptLabel
                       )}
                     </p>
                     <div className="mx-auto flex max-w-xl flex-col items-center gap-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-artbar-taupe md:text-base leading-snug">
                        {lang === 'en' ? (
                          <>
                            <span>{bilingualLine1}</span>
                            <span>{bilingualLine2}</span>
                          </>
                        ) : (
                          <>
                            <span className="normal-case tracking-normal">{bilingualJpLine1}</span>
                            <span className="normal-case tracking-normal">{bilingualJpLine2}</span>
                          </>
                        )}
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partner logos — white card containment (home only; team building page stays flush) */}
      <section className="relative z-[2] px-3 pb-10 sm:px-4 sm:pb-12 md:px-10 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex w-full flex-col items-center rounded-[var(--radius-feature)] border border-gray-100 bg-white p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.12)] sm:p-10 md:p-14 md:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.15)] lg:px-16 lg:py-20 xl:py-24">
            <div className="mb-8 flex w-full items-center gap-3 sm:mb-12 sm:gap-4 md:mb-16 lg:mb-20">
              <div className="h-px flex-grow bg-artbar-navy/10" />
              <p className="shrink-0 px-4 text-center font-heading font-bold text-[10px] uppercase tracking-[0.4em] text-artbar-gray sm:px-6 md:px-8 md:text-xs">
                {meetRegularsHeading}
              </p>
              <div className="h-px flex-grow bg-artbar-navy/10" />
            </div>

            <div className="mx-auto mb-8 grid w-full max-w-7xl grid-cols-2 items-center justify-items-center gap-x-5 gap-y-9 sm:mb-12 sm:gap-x-10 sm:gap-y-16 md:mb-16 md:grid-cols-7 md:gap-x-14 md:gap-y-24 lg:mb-20 lg:gap-x-16 lg:gap-y-28 xl:gap-x-20">
              {PARTNER_LOGOS.map((logo, i) => (
                <PartnerLogo key={i} name={logo.name} url={logo.url} size="prominent" />
              ))}
            </div>

            <Button
              type="button"
              variant="taupe"
              size="cta"
              onClick={() => router.push('/team-building')}
              className="inline-flex w-full max-w-xs gap-2 whitespace-nowrap hover:scale-[1.02] sm:w-auto sm:max-w-none"
            >
              {bookTeamBuildingCta}
              <ArrowRight size={18} className="shrink-0" aria-hidden />
            </Button>
          </div>
        </div>
      </section>

       {/* How It Works */}
       <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[var(--radius-section)] md:rounded-[var(--radius-feature)]">
        <div ref={howItWorksReveal.ref} className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className={`text-center mb-12 md:mb-20 reveal ${howItWorksReveal.isVisible ? 'visible' : ''}`}>
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-6`}>{site.home.howItWorks.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.howItWorks.subtitle}
             </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 reveal-stagger ${howItWorksReveal.isVisible ? 'visible' : ''}`}>
            {site.home.howItWorks.steps.map((step, index) => {
              const Icon = getStepIcon(index);
              return (
                <div key={index} className="group relative bg-artbar-bg p-6 md:p-8 rounded-[var(--radius-card)] md:rounded-[var(--radius-section)] hover:bg-artbar-navy transition-all duration-300">
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
        <div ref={themesReveal.ref} className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6 reveal ${themesReveal.isVisible ? 'visible' : ''}`}>
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

          <PopularThemesGrid
            items={site.home.themes.items}
            className={`reveal-stagger ${themesReveal.isVisible ? 'visible' : ''}`}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[var(--radius-section)] md:rounded-[var(--radius-feature)]">
        <div ref={featuresReveal.ref} className="max-w-[1400px] mx-auto px-6 md:px-10">
           <div className={`text-center mb-12 md:mb-20 reveal ${featuresReveal.isVisible ? 'visible' : ''}`}>
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-4`}>{site.home.features.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.features.subtitle}
             </p>
           </div>
           
           <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 reveal-stagger ${featuresReveal.isVisible ? 'visible' : ''}`}>
              {site.home.features.items.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-full h-56 md:h-64 rounded-[var(--radius-card)] overflow-hidden mb-6 md:mb-8 shadow-sm relative">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
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

      {/* Testimonial carousel — full guest quotes (below Artbar Experience) */}
      <section className="relative z-[2] bg-artbar-bg px-4 pb-24 pt-16 md:px-8 md:pb-36 md:pt-24 lg:px-12 lg:pt-28">
        <div
          ref={carouselTestimonialsReveal.ref}
          className={`mx-auto max-w-[min(100%,52rem)] xl:max-w-6xl reveal ${carouselTestimonialsReveal.isVisible ? 'visible' : ''}`}
        >
          <div className="mb-12 flex items-center gap-4 md:mb-16">
            <div className="h-px flex-grow bg-artbar-navy/10" />
            <h2 className="px-4 text-center font-heading text-xl font-heavy uppercase tracking-widest text-artbar-navy md:text-3xl lg:text-4xl">
              {site.home.testimonials.title}
            </h2>
            <div className="h-px flex-grow bg-artbar-navy/10" />
          </div>

          <div
            className={`relative isolate w-full overflow-hidden rounded-[var(--radius-feature)] border border-white/60 bg-white shadow-[0_32px_100px_-28px_rgba(5,55,97,0.22),0_0_0_1px_rgba(5,55,97,0.04)] ${TESTIMONIAL_CAROUSEL_CARD_HEIGHT_CLASS}`}
          >
            {activeCarouselTestimonial ? (
              <div
                key={activeIndex}
                className="animate-testimonial-slide-in motion-reduce:animate-none flex h-full min-h-0 flex-col items-center px-5 pb-28 pt-8 text-center sm:px-10 sm:pb-32 sm:pt-10 md:px-14 md:pb-36 md:pt-12 lg:px-16"
              >
                <div className="mb-4 shrink-0 pt-2 md:mb-5 md:pt-3">
                  <StarRating
                    size={22}
                    animated
                    delayBase={100}
                    className="justify-center text-amber-400 md:[&>svg]:h-6 md:[&>svg]:w-6"
                  />
                </div>

                <div className="relative mx-auto mb-4 flex min-h-0 w-full max-w-3xl flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden px-1 [-webkit-overflow-scrolling:touch] md:mb-5 md:max-w-4xl lg:max-w-5xl">
                  <Quote
                    size={48}
                    className="pointer-events-none absolute left-0 top-0 text-artbar-taupe/[0.12] md:left-2 md:h-20 md:w-20"
                    aria-hidden
                  />
                  <p className="relative z-10 text-pretty text-lg font-heading font-normal leading-[1.55] text-artbar-navy md:text-2xl md:leading-[1.55] lg:text-[1.65rem] lg:leading-[1.6] xl:text-3xl xl:leading-[1.5]">
                    &ldquo;{activeCarouselTestimonial.text}&rdquo;
                  </p>
                  {activeCarouselTestimonial.date ? (
                    <p className="mt-6 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-artbar-taupe md:mt-8 md:text-xs">
                      {activeCarouselTestimonial.date}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-col items-center pb-1">
                  {activeCarouselTestimonial.userImage ? (
                    <img
                      src={activeCarouselTestimonial.userImage}
                      alt=""
                      className="mb-3 h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-artbar-bg md:h-14 md:w-14"
                    />
                  ) : (
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-artbar-bg to-artbar-bg/70 font-heading text-lg font-heavy text-artbar-navy shadow-inner ring-2 ring-white md:h-14 md:w-14 md:text-xl">
                      {activeCarouselTestimonial.author.charAt(0)}
                    </div>
                  )}
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-artbar-navy md:text-sm">
                    {activeCarouselTestimonial.author}
                  </p>
                  {activeCarouselTestimonial.role ? (
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-artbar-taupe md:text-xs">
                      {activeCarouselTestimonial.role}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Navigation: pill bar + elevated circular controls */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-stretch gap-0 sm:bottom-7 md:bottom-8">
              <div className="flex items-center gap-1 rounded-full border border-artbar-navy/10 bg-gradient-to-b from-white to-artbar-bg/40 p-1.5 pl-2 pr-2 shadow-[0_12px_40px_-12px_rgba(5,55,97,0.25)] backdrop-blur-md sm:gap-2 sm:p-2 sm:pl-3 sm:pr-3">
                <button
                  type="button"
                  onClick={goPrevTestimonial}
                  aria-label="Previous testimonial"
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-artbar-navy/10 bg-white text-artbar-navy shadow-sm transition-all duration-200 hover:border-artbar-taupe/50 hover:bg-artbar-taupe hover:text-white hover:shadow-md active:scale-95 md:h-12 md:w-12"
                >
                  <ChevronLeft
                    className="h-5 w-5 transition-transform group-hover:-translate-x-0.5 md:h-6 md:w-6"
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>

                <div className="flex min-w-[5.5rem] flex-col items-center justify-center px-2 sm:min-w-[6.5rem] sm:px-4">
                  <span className="font-heading text-[9px] font-bold uppercase tracking-[0.25em] text-artbar-taupe/90">
                    {lang === 'en' ? 'Stories' : 'ストーリー'}
                  </span>
                  <p className="font-heading text-lg font-heavy tabular-nums leading-none text-artbar-navy md:text-xl">
                    <span className="text-artbar-navy">{activeIndex + 1}</span>
                    <span className="mx-1.5 text-artbar-taupe/50 md:mx-2">/</span>
                    <span className="font-normal text-artbar-gray">{carouselTestimonials.length || '—'}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={goNextTestimonial}
                  aria-label="Next testimonial"
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-artbar-navy/10 bg-white text-artbar-navy shadow-sm transition-all duration-200 hover:border-artbar-taupe/50 hover:bg-artbar-taupe hover:text-white hover:shadow-md active:scale-95 md:h-12 md:w-12"
                >
                  <ChevronRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5 md:h-6 md:w-6"
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen In Section - GALLERY STYLE */}
      <section className="py-24 md:py-48 bg-white">
        <div ref={asSeenInReveal.ref} className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className={`text-center mb-16 md:mb-24 reveal ${asSeenInReveal.isVisible ? 'visible' : ''}`}>
             <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">{mediaCoverageLabel}</span>
             <h2 className="text-4xl md:text-7xl font-heading font-heavy text-artbar-navy tracking-tight">{asSeenInHeading}</h2>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-10 reveal-stagger ${asSeenInReveal.isVisible ? 'visible' : ''}`}>
             {content.media.map((item, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
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
        <div ref={bottomCtaReveal.ref} className="max-w-[1400px] mx-auto">
        <div className={`bg-artbar-navy rounded-[var(--radius-section)] md:rounded-[var(--radius-feature)] overflow-hidden relative shadow-2xl reveal ${bottomCtaReveal.isVisible ? 'visible' : ''}`}>
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
        </div>
      </section>
    </div>
  );
};
