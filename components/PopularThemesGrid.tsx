'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ThemeListItem } from '@/lib/theme-slugs';
import { themeSlugFromItem } from '@/lib/theme-slugs';

/** Same card treatment as the home “Popular Themes” grid. */
export function PopularThemesGrid({
  items,
  className,
}: {
  items: ThemeListItem[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 ${className ?? ''}`}
    >
      {items.map((themeItem) => {
        const slug = themeSlugFromItem(themeItem);
        return (
          <Link
            key={slug}
            href={`/themes/${slug}`}
            className="group relative block h-[380px] md:h-[500px] rounded-[var(--radius-card)] md:rounded-[var(--radius-section)] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src={themeItem.image}
              alt={themeItem.title}
              fill
              loading="eager"
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy from-[38%] via-artbar-navy/45 to-transparent opacity-85 md:from-[32%] md:via-artbar-navy/40 md:opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 w-full px-4 pb-9 pt-4 md:px-10 md:pb-10 md:pt-8">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <h3 className="mb-1.5 flex min-h-[2.5rem] items-end text-lg font-heading font-bold leading-tight tracking-tight text-white line-clamp-2 md:mb-2 md:min-h-[4.25rem] md:text-3xl">
                  {themeItem.title}
                </h3>
                <p className="min-h-[3.75rem] text-xs font-light leading-snug text-white/85 line-clamp-3 sm:text-sm md:min-h-[4.25rem] md:text-base md:leading-relaxed md:line-clamp-3">
                  {themeItem.desc}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
