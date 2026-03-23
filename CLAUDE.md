# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Artbar Tokyo (artbar.co.jp) — a bilingual (EN/JP) marketing site for a paint-and-sip studio business in Tokyo. Recently migrated from WordPress to a React SPA. Includes an AI-powered pet sketch feature using Google Gemini.

**GitHub:** https://github.com/UltraIntelligence/Artbar

## Commands

```bash
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

No test framework is configured.

## Architecture

**Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (CDN) + HashRouter

### Key architectural decisions

- **Client-side SPA** with hash-based routing (`/#/path`) — no SSR/SSG
- **Tailwind via CDN** in `index.html` (not PostCSS) — theme colors, fonts, and animations are configured inline in the `<script>` tag in `index.html`, not in a tailwind config file
- **ES module import map** in `index.html` for React, React-DOM, Router, Lucide, and Google GenAI
- **No backend/database** — all content lives in `data/content.ts` with localStorage persistence for admin edits (key: `artbar_content_v5`)

### Content & i18n system

`ContentContext` (`context/ContentContext.tsx`) provides bilingual content via React Context:
- `useContent()` hook returns `{ lang, toggleLang, content, site, updateContent, resetContent }`
- `site` is a shortcut for `content[lang]` (either `content.en` or `content.jp`)
- Content schema is defined in `types.ts` — `ContentData` is the root type, `SiteContent` holds per-language strings
- Shared data (instructors, locations, blog posts, FAQs, media) lives outside the language split on `ContentData`
- Admin panel at `/admin` persists edits to localStorage with deep-merge on load

### File organization

- `pages/` — route-level components (one per route in `App.tsx`)
- `components/` — shared UI (`Navbar`, `Footer`, `SEO`, `PetSketcher`, `Logo`, etc.)
- `components/ui/` — primitives (`Button`)
- `data/content.ts` — all site content (text, images, blog posts)
- `types.ts` — TypeScript interfaces for all content structures
- `constants.ts` — app constants

### Routing

Routes are defined in `App.tsx` using `react-router-dom` v7 `HashRouter`. Key routes: `/`, `/instructors`, `/team-building`, `/private-parties`, `/locations`, `/press`, `/contact`, `/blog`, `/blog/:slug`, `/paint-your-pet`, `/themes/:slug`, `/admin`.

### AI Feature (PetSketcher)

`components/PetSketcher.tsx` uses `@google/genai` to generate line-art sketches from pet photos via Gemini. Images are normalized to JPEG and resized to max 1536px before sending.

## Environment Variables

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
```

Vite injects this as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (see `vite.config.ts` `define` block).

## Design Tokens

- **Navy:** `#053761` (primary brand color)
- **Taupe:** `#A39384` (accent)
- **Background:** `#F1EFEC` (off-white)
- **Gray:** `#797979` (body text)
- **Heading font:** Josefin Sans (weights 600, 700) — class `font-heading`
- **Body font:** system Japanese stack (Hiragino Kaku Gothic ProN, Meiryo)

These are defined in the Tailwind config inside `index.html`, referenced as `text-artbar-navy`, `bg-artbar-taupe`, etc.

## SEO & Migration

The site was migrated from WordPress (see `migration.md`). The `SEO` component (`components/SEO.tsx`) handles meta tags, OG tags, and JSON-LD structured data using React 19's automatic head hoisting. A `vercel.json` with 301 redirects from old WordPress URL patterns is planned but not yet created.
