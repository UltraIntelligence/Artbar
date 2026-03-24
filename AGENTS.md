# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
- `components/` — shared UI (`Navbar`, `Footer`, `SEO`, `PetSketcher`, `Logo`, etc.)
- `components/ui/` — primitives (`Button` — marketing CTAs use `size="cta"` and `variant` `taupe` / `primary` / `outline` / `outlineWhite`; home hero row uses shared `heroCtaFrame` for three matching pills)
- `context/` — `ContentContext.tsx` (`'use client'`)
- `data/content.ts` — all site content (text, images, blog posts)
- `types.ts` — TypeScript interfaces for all content structures
- `constants.ts` — app constants (`INSTRUCTOR_ROWS` → `INSTRUCTORS`; photos wired via `GI.instructors`)
- `data/generated-image-paths.ts` — `GI` public URLs; `THEME_PAGE_IMAGES` maps each theme slug to hero / four examples / experience URLs under `public/media/generated/`; `INSTRUCTOR_IDS` lists instructor slugs (keep in sync with `INSTRUCTOR_ROWS`). Client instructor photos: `public/media/instructors/{id}-profile.jpg` and `{id}-banner.jpg`
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

## Design Tokens

- **Navy:** `#053761` (primary brand color)
- **Taupe:** `#A39384` (accent)
- **Background:** `#F1EFEC` (off-white)
- **Gray:** `#797979` (body text)
- **Heading font:** Josefin Sans (weights 600, 700) — class `font-heading`
- **Body font:** system Japanese stack (Hiragino Kaku Gothic ProN, Meiryo)

These are defined in `app/globals.css` under `@theme`, referenced as `text-artbar-navy`, `bg-artbar-taupe`, etc.

## SEO & Migration

The site was migrated from WordPress (see `migration.md`). The `SEO` component (`components/SEO.tsx`) handles meta tags, OG tags, and JSON-LD structured data. A `vercel.json` with 301 redirects from old WordPress URL patterns is in place.

## Learned User Preferences

- When testimonial or hero-adjacent controls overlap names or labels, adjust vertical padding, min-height, or control offset first; do not change horizontal section margins unless the user asks for it.
- For hero CTAs and social-proof pills, use shared dimensions and centered content; when matching control size to siblings, constrain the pill or button frame (min-height, padding) first rather than shrinking prominent brand icons or key marks; keep sibling hero CTAs the same size and use the same animation on all of them when any one animates. Keep primary marketing buttons cohesive across pages so key CTAs are not awkwardly oversized or split across many lines on small screens.
- For headline social proof (guest counts, ratings), prefer exact figures the user provides over rounded shorthand when credibility matters.
- Full-bleed heroes under a fixed navbar need explicit top space (safe-area plus nav offset) or start-aligned content on small viewports; vertical centering alone can push the headline into the nav. On the home hero (and similar), keep the navbar transparent until the user scrolls; avoid a solid colored bar on first paint.
- Hero photography that uses `object-cover`: nudge focal point with `object-position` (e.g. vertical %) when faces or key subjects clip before changing wider layout or section structure.
- On touch viewports, show explanatory copy that desktop reveals on hover (for example theme card subtitles under titles).

## Learned Workspace Facts

- Tailwind v4 maps `font-heading` and `font-sans` to `--font-heading` and `--font-sans`; `--font-family-heading` / `--font-family-sans` style names do not generate those utilities.
- `next/font` should expose a dedicated CSS variable (e.g. `--font-josefin`) and reference it from `@theme` `--font-heading`, not reuse `--font-heading` as the font loader variable.
- Theme or admin-injected font stacks must quote multi-word family names in CSS custom properties so the intended face applies.
- Assets loaded by URL must live under `public/`; files only in a repo-root folder such as `media/` are not served by Next.js.
- localStorage key `artbar_content_v5` can retain stale values (empty `images.hero.video`, old `theme.typography` strings) that block new defaults; admin reset or clearing that key applies updated hero media and typography.
- `next.config.ts` may set `outputFileTracingRoot` to this project root so Next does not pick a wrong workspace root when another lockfile exists on the machine (e.g. in the home directory).
- The hero viewport uses a static image from `images.hero.home`; `images.hero.video` and `images.hero.videoMobile` feed the concept/lifestyle block, not the full-screen hero background. Home applies a slow CSS keyframe drift to that hero background (`hero-bg-drift` in `views/Home.tsx`); it is disabled when the user prefers reduced motion. The concept block may use looped in-page video with a control that opens a longer clip in a new tab (e.g. YouTube) when embedding would cause letterboxing or layout issues.
- `lib/gemini-image-config.ts` holds the default Gemini image model (`gemini-3.1-flash-image-preview`) and related generation options; override the model with `GEMINI_IMAGE_MODEL` when needed.
- Export `viewport` with `viewportFit: 'cover'` from `app/layout.tsx` so `env(safe-area-inset-*)` works in CSS on notched devices.
- `scripts/image-manifest.ts` entries can set `needsRevision` / `reviewNotes` (`npm run generate:images:revision`). Theme detail pages resolve `THEME_CONFIG[slug]` in `views/ThemeDetail.tsx`; unknown slugs fall back to Japan-Inspired, so home theme links must match `THEME_CONFIG` keys (e.g. `texture-painting` vs `texture-art`).
- Home hero and concept guest totals are computed in `lib/guest-count.ts` from a Tokyo (JST) anchor date, base count, and daily increment; `data/content.ts` guest number strings are reference and admin copy. Japanese concept headlines can use `{{count}}` for the live formatted total.
