'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContent } from '../context/ContentContext';
import { PopularThemesGrid } from '../components/PopularThemesGrid';
import { pickDiscoveryThemes } from '../lib/theme-slugs';
import { THEME_PAGE_IMAGES } from '../data/generated-image-paths';
import {
  getPh,
  getThemeContent,
  resolveThemeContentSlug,
} from '../data/theme-details';
import { Button } from '../components/ui/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, Lightbulb, Star, Users, Gift, ArrowRight } from 'lucide-react';

export const ThemeDetail: React.FC = () => {
  const params = useParams();
  const rawSlug = (params.slug as string) || '';
  const resolvedSlug = resolveThemeContentSlug(rawSlug);
  const router = useRouter();
  const { site, lang } = useContent();
  const theme = getThemeContent(resolvedSlug, lang);
  const pageImages = THEME_PAGE_IMAGES[resolvedSlug as keyof typeof THEME_PAGE_IMAGES];

  const intro = useScrollReveal();
  const gallery = useScrollReveal();
  const experience = useScrollReveal();
  const perfect = useScrollReveal();
  const whatYouGet = useScrollReveal();

  const discoveryThemes = useMemo(
    () => pickDiscoveryThemes(resolvedSlug, site.home.themes.items, 4),
    [resolvedSlug, site.home.themes.items]
  );

  const heroSrc = pageImages?.hero ?? getPh(1920, 1080, theme.title);
  const [heroBackdropReady, setHeroBackdropReady] = useState(false);

  useEffect(() => {
    setHeroBackdropReady(false);
  }, [heroSrc]);

  const stripTitleForGallery = (t: string) =>
    t
      .replace(' Classes with Wine', '')
      .replace(' Paint and Sip Classes', '')
      .replace(' Art Classes with Wine', '')
      .replace(' Sessions', '')
      .replace(' Classes', '');

  const ui = {
    viewSchedule: lang === 'en' ? 'View Schedule' : 'スケジュールを見る',
    inspiration: lang === 'en' ? 'Inspiration' : 'インスピレーション',
    examplePaintings: lang === 'en' ? 'Example Paintings' : '作品例',
    exampleBlurb: (name: string) =>
      lang === 'en'
        ? `A glimpse into our ${name} paint and sip art classes`
        : `${name}のペイント＆シップクラスの一例です`,
    theExperience: lang === 'en' ? 'THE EXPERIENCE' : '体験について',
    guestFavorite: lang === 'en' ? 'Guest Favorite' : 'ゲスト人気',
    bilingualSessions: lang === 'en' ? 'Bilingual Social Sessions' : 'バイリンガル・ソーシャル枠',
    expertGuidance: lang === 'en' ? 'Expert Step-by-Step Guidance' : '丁寧なステップ指導',
    community: lang === 'en' ? 'The Community' : 'コミュニティ',
    whatToExpect: lang === 'en' ? 'What to Expect' : '体験に含まれるもの',
    whatToExpectSub:
      lang === 'en'
        ? 'Everything you need to create your masterpiece in Tokyo is provided. No extra fees, no hidden costs.'
        : '東京で作品を完成させるために必要なものはすべて込み。追加料金や隠れた費用はありません。',
    bilingualArtClass: lang === 'en' ? 'Bilingual Art Class' : 'バイリンガル・アートクラス',
    perfectForGifting: lang === 'en' ? 'Perfect for Gifting' : 'ギフトにも最適',
    viewUpcoming: lang === 'en' ? 'View Upcoming Schedule' : '開催予定を見る',
    discoverMore: lang === 'en' ? 'Discover More Styles' : 'ほかのスタイルを見る',
    discoverSub:
      lang === 'en'
        ? 'From fluid art to impressionist gardens, find your next creative escape at Artbar Tokyo.'
        : 'フルイドアートから印象派の庭まで、次の創作体験をArtbar Tokyoで。',
    allCategories: lang === 'en' ? 'All Theme Categories' : 'すべてのテーマ',
  };

  return (
    <div className="bg-artbar-bg min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] md:min-h-[75vh] bg-artbar-navy flex items-center justify-center text-white mt-24 mx-4 md:m-4 md:mt-24 rounded-[2.5rem] overflow-hidden py-16 md:py-0">
        <Image
          key={heroSrc}
          src={heroSrc}
          alt={theme.title}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            heroBackdropReady ? 'opacity-50' : 'opacity-0'
          }`}
          sizes="100vw"
          onLoadingComplete={() => setHeroBackdropReady(true)}
          onError={() => setHeroBackdropReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-artbar-navy/20 to-artbar-navy/90" />

        <div className="relative z-10 text-center px-6 max-w-5xl w-full">
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading font-bold text-xs md:text-sm mb-6 md:mb-8 uppercase tracking-widest">
            {theme.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-heavy mb-6 md:mb-8 leading-tight tracking-tight">
            {theme.title}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl opacity-90 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {theme.heroSub}
          </p>
          <div className="flex justify-center items-center w-full px-4 sm:px-0 mb-8">
            <Button
              variant="taupe"
              size="cta"
              onClick={() => (window.location.hash = 'schedule')}
              className="animate-pulse w-full max-w-[20rem] gap-2 shadow-[0_10px_40px_-10px_rgba(163,147,132,0.6)] transition-all duration-300 hover:shadow-[0_15px_50px_-10px_rgba(163,147,132,0.7)] sm:w-auto sm:max-w-none"
            >
              {ui.viewSchedule}
              <ArrowRight size={18} className="shrink-0" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      {/* The Concept Intro */}
      <section className="py-24 bg-white mx-0 md:mx-6 md:-mt-12 relative z-10 md:rounded-[3rem] shadow-xl text-center">
        <div
          ref={intro.ref}
          className={`reveal max-w-[1400px] mx-auto px-6 md:px-10 ${intro.isVisible ? 'visible' : ''}`}
        >
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-heavy text-artbar-navy mb-8 leading-tight">
              {theme.introTitle}
            </h2>
            <p className="text-artbar-gray text-lg md:text-2xl leading-relaxed font-light">
              {theme.introDesc}
            </p>
          </div>

          <div
            className={`grid sm:grid-cols-3 gap-12 max-w-5xl mx-auto reveal-stagger ${intro.isVisible ? 'visible' : ''}`}
          >
            {theme.quickFeatures.map((feat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-artbar-bg rounded-2xl flex items-center justify-center text-artbar-taupe shrink-0 shadow-sm transition-transform group-hover:scale-110">
                  <feat.icon size={28} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-artbar-navy text-xl mb-2 tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-artbar-gray text-sm md:text-base leading-relaxed max-w-[240px] mx-auto">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="grain relative py-24 bg-artbar-bg">
        <div
          ref={gallery.ref}
          className={`reveal max-w-[1400px] mx-auto px-6 md:px-10 ${gallery.isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-3 block">
              {ui.inspiration}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-heavy text-artbar-navy mb-4">
              {ui.examplePaintings}
            </h2>
            <p className="text-artbar-gray text-lg md:text-xl font-light">
              {ui.exampleBlurb(stripTitleForGallery(theme.title))}
            </p>
          </div>

          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 reveal-stagger ${gallery.isVisible ? 'visible' : ''}`}
          >
            {theme.examples.map((ex, i) => (
              <div key={i} className="group flex flex-col items-center">
                <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white mb-6 group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={pageImages?.examples[i] ?? ex.image}
                    alt={ex.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-artbar-navy/0 group-hover:bg-artbar-navy/20 transition-colors" />
                </div>
                <h4 className="text-center font-heading font-bold text-artbar-navy text-sm md:text-base group-hover:text-artbar-taupe transition-colors px-2">
                  {ex.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Deep Dive */}
      <section className="py-24 bg-white md:mx-6 md:rounded-[3rem] shadow-sm">
        <div
          ref={experience.ref}
          className={`reveal max-w-[1400px] mx-auto px-6 md:px-10 ${experience.isVisible ? 'visible' : ''}`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src={pageImages?.experience ?? getPh(1000, 750, 'Studio Atmosphere')}
                alt="Artbar Atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-artbar-navy/10" />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-artbar-navy uppercase tracking-widest">
                    {ui.guestFavorite}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex flex-col gap-5 md:gap-6">
                <span className="block w-fit text-artbar-taupe font-heading font-bold tracking-widest text-xs uppercase border-b border-artbar-taupe/30 pb-2.5">
                  {ui.theExperience}
                </span>
                <h3 className="text-3xl md:text-5xl font-heading font-heavy text-artbar-navy leading-tight">
                  {theme.expectTitle}
                </h3>
              </div>
              <p className="text-artbar-gray text-lg md:text-xl leading-relaxed font-light">
                {theme.expectDesc}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 text-artbar-navy font-bold text-sm">
                  <Users size={20} className="text-artbar-taupe" />
                  <span className="uppercase tracking-widest">{ui.bilingualSessions}</span>
                </div>
                <div className="flex items-center gap-3 text-artbar-navy font-bold text-sm">
                  <Lightbulb size={20} className="text-artbar-taupe" />
                  <span className="uppercase tracking-widest">{ui.expertGuidance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Identification */}
      <section className="grain relative py-24 bg-artbar-bg">
        <div
          ref={perfect.ref}
          className={`reveal max-w-[1400px] mx-auto px-6 md:px-10 ${perfect.isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-3 block">
              {ui.community}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-heavy text-artbar-navy mb-4">
              {theme.perfectTitle}
            </h2>
            <div className="h-1 w-24 bg-artbar-taupe mx-auto rounded-full" />
          </div>

          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal-stagger ${perfect.isVisible ? 'visible' : ''}`}
          >
            {theme.perfectFor.map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-[3rem] bg-white shadow-sm flex flex-col items-center text-center group hover:bg-artbar-navy hover:scale-105 transition-all duration-500 border border-white"
              >
                <div className="w-14 h-14 rounded-full bg-artbar-bg flex items-center justify-center text-artbar-taupe mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Heart size={26} />
                </div>
                <p className="text-artbar-navy font-heading font-bold leading-relaxed group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Block */}
      <section className="py-24 bg-white md:mx-6 md:rounded-[3rem] shadow-sm">
        <div
          ref={whatYouGet.ref}
          className={`reveal max-w-[1400px] mx-auto px-6 md:px-10 ${whatYouGet.isVisible ? 'visible' : ''}`}
        >
          <div className="bg-artbar-bg rounded-[4rem] p-12 md:p-20 shadow-inner border border-artbar-light-taupe/10">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-3 block">
                {ui.bilingualArtClass}
              </span>
              <h2 className="text-3xl md:text-6xl font-heading font-heavy text-artbar-navy mb-6">
                {ui.whatToExpect}
              </h2>
              <p className="text-artbar-gray text-lg md:text-xl font-light">{ui.whatToExpectSub}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-y-16 gap-x-24">
              {theme.whatYouGet.map((item, i) => (
                <div key={i} className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-artbar-taupe shrink-0 group-hover:bg-artbar-navy group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-bold text-artbar-navy mb-2">{item.text}</h4>
                    <p className="text-artbar-gray text-base leading-relaxed font-light">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex gap-8">
                <div className="flex items-center gap-3 text-xs font-bold text-artbar-taupe uppercase tracking-widest">
                  <Gift size={16} /> {ui.perfectForGifting}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion */}
      <section className="py-24 px-4 md:px-10 bg-artbar-bg">
        <div className="max-w-[1400px] mx-auto bg-artbar-navy rounded-[3rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-artbar-taupe/20 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter">
              {theme.ctaTitle}
            </h2>
            <p className="text-white/80 text-lg md:text-2xl mb-12 font-light max-w-xl mx-auto leading-relaxed">
              {theme.ctaSub}
            </p>
            <div className="flex justify-center items-center w-full px-4 sm:px-0">
              <Button
                variant="taupe"
                size="cta"
                onClick={() => (window.location.hash = 'schedule')}
                className="shadow-[0_10px_40px_-10px_rgba(163,147,132,0.6)] transition-all hover:scale-105 hover:bg-white hover:text-artbar-navy hover:shadow-[0_15px_50px_-10px_rgba(255,255,255,0.2)] active:scale-95"
              >
                {ui.viewUpcoming}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Cross-Sell */}
      <section className="py-24 bg-white md:mx-6 md:rounded-[3rem] shadow-sm mb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-heavy text-artbar-navy mb-4 tracking-tight leading-none">
                {ui.discoverMore}
              </h2>
              <p className="text-artbar-gray text-lg font-light max-w-lg">{ui.discoverSub}</p>
            </div>
            <Button
              onClick={() => router.push('/#popular-themes')}
              variant="outline"
              size="cta"
              className="w-full uppercase tracking-widest text-xs md:w-auto"
            >
              {ui.allCategories}
            </Button>
          </div>

          <PopularThemesGrid items={discoveryThemes} />
        </div>
      </section>
    </div>
  );
};
