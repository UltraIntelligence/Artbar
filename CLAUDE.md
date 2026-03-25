# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Artbar Tokyo (artbar.co.jp) — a bilingual (EN/JP) marketing site for a paint-and-sip studio business in Tokyo. Migrated from WordPress to a Next.js 15 App Router site. Includes an AI-powered pet sketch feature using Google Gemini.

**GitHub:** https://github.com/UltraIntelligence/Artbar

## Commands

```bash
npm run dev      # Next.js dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run generate:images      # All enabled manifest slots → public/media/generated/ (needs GEMINI_API_KEY)
npm run generate:images:dry  # List slots without calling the API
npm run generate:images:theme-pages  # 72 /themes/[slug] images only (hero + 4 examples + experience per theme)
npm run generate:images:revision     # Only slots with needsRevision in scripts/image-manifest.ts
```

No test framework is configured.

## Architecture

**Stack:** React 19 + TypeScript + Next.js 15 (App Router) + Tailwind CSS v4 (PostCSS)

### Key architectural decisions

- **Next.js 15 App Router** with file-based routing in `app/` — supports SSR and Server Components
- **Tailwind v4 via PostCSS** — theme tokens configured in `app/globals.css`, not a JS config file
- **Server Components** for route files (`app/**/page.tsx`, `app/layout.tsx`); client components for views and interactive UI
- **No backend/database** — all content lives in `data/content.ts` with localStorage persistence for admin edits (key: `artbar_content_v5`)
- **Server-side AI route** at `/api/generate-sketch` — Gemini API key stays server-side

### Content & i18n system

`ContentContext` (`context/ContentContext.tsx`) provides bilingual content via React Context:
- `useContent()` hook returns `{ lang, toggleLang, content, site, updateContent, resetContent }`
- `site` is a shortcut for `content[lang]` (either `content.en` or `content.jp`)
- Content schema is defined in `types.ts` — `ContentData` is the root type, `SiteContent` holds per-language strings
- Shared data (instructors, locations, blog posts, FAQs, media) lives outside the language split on `ContentData`
- Admin panel at `/admin` persists edits to localStorage with deep-merge on load

**Domain model:** [`data-model.md`](data-model.md) — entities (`ContentData`, `BlogPost`, themes), relationships, lifecycles, localStorage vs build-time content, and API boundaries.

### File organization

- `app/` — route files: `page.tsx` per route, `layout.tsx`, `globals.css`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, and API routes under `app/api/`
- `views/` — client-side page components (`'use client'`), one per route (e.g. `Home.tsx`, `BlogPost.tsx`)
- `components/` — shared UI (`Navbar`, `Footer`, `SEO`, `PetSketcher`, `PartnerLogo`, `Logo`, etc.)
- `components/ui/` — primitives (`Button`)
- `context/` — `ContentContext.tsx` (`'use client'`)
- `data/content.ts` — all site content (text, images, blog posts)
- `types.ts` — TypeScript interfaces for all content structures
- `constants.ts` — app constants (`INSTRUCTOR_ROWS` → `INSTRUCTORS`; photos wired via `GI.instructors`); `PARTNER_LOGOS` lists partner mark URLs (Wikimedia SVGs) used on home and `/team-building` — edit in one place to update both grids
- `data/generated-image-paths.ts` — `GI` public URLs; `THEME_PAGE_IMAGES` maps each theme slug to hero / four examples / experience URLs under `public/media/generated/`; `INSTRUCTOR_IDS` lists instructor slugs (keep in sync with `INSTRUCTOR_ROWS`). Client instructor photos: `public/media/instructors/{id}-profile.jpg` and `{id}-banner.jpg`. Studio location photos on `/locations`: `GI.locations` → `public/media/generated/loc-*.jpg` (see `LOCATIONS` in `constants.ts`; image manifest slots for these are disabled—replace files in `public`, not Gemini). Optional local staging folder `media/locations/` is not served by Next.js.
- `data/theme-page-image-prompts.ts` — Gemini prompts for theme detail imagery; merged into `scripts/image-manifest.ts` via `scripts/theme-page-manifest-items.ts`

### Routing

Routes are file-based in `app/`. Key routes: `/`, `/instructors`, `/team-building`, `/private-parties`, `/locations`, `/press`, `/contact`, `/blog`, `/blog/[slug]`, `/paint-your-pet`, `/themes/[slug]`, `/admin`.

### AI Feature (PetSketcher)

`components/PetSketcher.tsx` uploads a pet photo and calls the server-side route `app/api/generate-sketch/route.ts`, which uses `@google/genai` to generate line-art sketches via Gemini. Images are normalized to JPEG and resized to max 1536px before sending.

## Environment Variables

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
```

The API key is read server-side in `app/api/generate-sketch/route.ts` via `process.env.GEMINI_API_KEY`.

Batch image generation (`npm run generate:images`, `npm run generate:images:theme-pages`) uses the same key. Theme detail **example** images (`theme-*-example-[1–4]`) use explicit **1K / 1:1** in `lib/gemini-image-config.ts`; optional **`GEMINI_THEME_EXAMPLE_IMAGE_SIZE`** overrides size.

## Design Tokens

- **Navy:** `#053761` (primary brand color)
- **Taupe:** `#A39384` (accent)
- **Background:** `#F1EFEC` (off-white)
- **Gray:** `#797979` (body text)
- **Heading font:** Josefin Sans (weights 600, 700) — class `font-heading`
- **Body font:** system Japanese stack (Hiragino Kaku Gothic ProN, Meiryo)

These are defined in `app/globals.css` under `@theme`, referenced as `text-artbar-navy`, `bg-artbar-taupe`, etc.

### UI components

- **`Button`** (`components/ui/Button.tsx`): Marketing CTAs use `size="cta"` with `variant` (`taupe`, `primary`, `outline`, `outlineWhite`). Use `outlineWhite` on dark bands (e.g. home bottom CTA). The home hero row keeps three actions aligned with shared `heroCtaFrame` classes instead of default `cta` padding alone.
- **Home hero background:** Full-bleed photo uses a slow CSS drift (`hero-bg-drift`, ~48s, `ease-in-out`, `alternate`); animation is off when `prefers-reduced-motion: reduce`.

## SEO & Migration

The site was migrated from WordPress (see `migration.md`). The `SEO` component (`components/SEO.tsx`) handles meta tags, OG tags, and JSON-LD structured data. A `vercel.json` with 301 redirects from old WordPress URL patterns is in place.
