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
            className="group relative block h-[300px] md:h-[500px] rounded-[var(--radius-card)] md:rounded-[var(--radius-section)] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src={themeItem.image}
              alt={themeItem.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy via-artbar-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-10 w-full">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <h3 className="text-lg md:text-3xl font-heading font-bold text-white mb-2 leading-tight tracking-tight line-clamp-2 min-h-[2.75rem] md:min-h-[4.25rem] flex items-end">
                  {themeItem.title}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm md:text-base font-light leading-snug md:leading-relaxed line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
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
