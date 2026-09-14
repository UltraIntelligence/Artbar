'use client';

import { getArtbarBookingThemeUrl } from '@/constants';
import { trackBookingClick } from '@/lib/analytics';
import Image from 'next/image';
import Link from 'next/link';
import type { ThemeListItem } from '@/lib/theme-slugs';
import { themeSlugFromItem } from '@/lib/theme-slugs';
import { JpText } from './JpText';
import { stripJpSentinel } from '@/lib/jp-attr';
import { useContent } from '@/context/ContentContext';
import { localizeHrefForLanguage } from '@/lib/locale-routing';

/** Strip both the manual `<wbr>` markers and the server-side BudouX phrase
 *  sentinels (U+200B) before passing JP titles into attribute-only contexts. */
const cleanForAttr = (s: string) => stripJpSentinel(s.replace(/<wbr\s*\/?>/gi, ''));

/** Same card treatment as the home “Popular Themes” grid.
 *  `compact` trims tile height and type scale so the grid reads as supporting
 *  exploration next to the live booking section (home) instead of the page's
 *  dominant block; theme detail pages keep the default scale. */
export function PopularThemesGrid({
  items,
  className,
  compact = false,
  showAvailability = false,
}: {
  items: ThemeListItem[];
  className?: string;
  compact?: boolean;
  showAvailability?: boolean;
}) {
  const { lang } = useContent();

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 ${compact ? '' : 'lg:grid-cols-4'} gap-4 ${compact ? 'md:gap-6' : 'md:gap-8'} ${className ?? ''}`}
    >
      {items.map((themeItem) => {
        const slug = themeSlugFromItem(themeItem);
        return (
          <article key={slug} className="min-w-0">
          <Link
            href={localizeHrefForLanguage(`/themes/${slug}`, lang)}
            className={`group relative block ${compact ? 'h-[300px] md:h-[380px]' : 'h-[380px] md:h-[500px]'} rounded-[var(--radius-card)] md:rounded-[var(--radius-section)] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500`}
          >
            <Image
              src={themeItem.image}
              alt={cleanForAttr(themeItem.title)}
              fill
              sizes={compact ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 768px) 50vw, 25vw"}
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy from-[38%] via-artbar-navy/45 to-transparent opacity-85 md:from-[32%] md:via-artbar-navy/40 md:opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className={`absolute inset-x-0 bottom-0 w-full px-4 pb-9 pt-4 ${compact ? 'md:px-6 md:pb-7 md:pt-6' : 'md:px-10 md:pb-10 md:pt-8'}`}>
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <h3 className={`mb-1.5 flex min-h-[2.5rem] items-end text-lg font-heading font-bold leading-tight tracking-tight text-white line-clamp-2 md:mb-2 ${compact ? 'md:min-h-[3.5rem] md:text-2xl' : 'md:min-h-[4.25rem] md:text-3xl'}`}>
                  <JpText>{themeItem.title}</JpText>
                </h3>
                <p className={`min-h-[3.75rem] text-xs font-light leading-snug text-white/85 line-clamp-3 sm:text-sm ${compact ? 'md:min-h-[2.5rem] md:text-sm md:leading-snug md:line-clamp-2' : 'md:min-h-[4.25rem] md:text-base md:leading-relaxed md:line-clamp-3'}`}>
                  <JpText>{themeItem.desc}</JpText>
                </p>
              </div>
            </div>
          </Link>
          {showAvailability && <a href={getArtbarBookingThemeUrl(slug)} onClick={() => trackBookingClick('home_themes', { theme: slug })} aria-label={`${cleanForAttr(themeItem.title)}: ${lang === 'jp' ? '空き日程を見る' : 'View dates'}`} className="mt-2 flex min-h-11 items-center justify-center rounded-full border border-artbar-taupe/50 px-3 py-2 text-center text-sm font-bold text-artbar-navy hover:bg-white focus-visible:outline-2 focus-visible:outline-artbar-navy">{lang === 'jp' ? '空き日程を見る' : 'View dates'}</a>}
          </article>
        );
      })}
    </div>
  );
}
