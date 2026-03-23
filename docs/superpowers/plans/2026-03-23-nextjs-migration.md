# Next.js App Router Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Artbar Tokyo site from a Vite React SPA with HashRouter to Next.js 16 App Router, gaining clean URLs, server-side metadata for SEO, a proper build pipeline, and a server-side Gemini API route.

**Architecture:** Pages are Server Component route files that export `metadata` and render client-side view components from `views/`. All view components use `'use client'` and the existing `useContent()` hook — this keeps page component code changes minimal while still getting server-side `<head>` tags. The Gemini API key moves from client-side to a Next.js API route. Tailwind moves from CDN inline script to a proper PostCSS build with Tailwind v4.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (PostCSS), `@google/genai`, `next/font/google`, Lucide React, Supabase (future)

---

## File Map

### Delete
- `index.html` — replaced by `app/layout.tsx` + Next.js HTML shell
- `index.tsx` — replaced by `app/layout.tsx` entry point
- `App.tsx` — replaced by `app/layout.tsx` + route files
- `vite.config.ts` — replaced by `next.config.ts`

### Rename
- `pages/` → `views/` — avoids Next.js Pages Router conflict

### Create
- `next.config.ts` — Next.js config
- `postcss.config.ts` — Tailwind v4 PostCSS plugin
- `app/layout.tsx` — root layout (ContentProvider, ThemeInjector, Navbar, Footer)
- `app/globals.css` — Tailwind v4 `@import` + `@theme` tokens + custom animations
- `app/page.tsx` — Home route (metadata + `<HomeView>`)
- `app/instructors/page.tsx`
- `app/team-building/page.tsx`
- `app/private-parties/page.tsx`
- `app/locations/page.tsx`
- `app/press/page.tsx`
- `app/contact/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx` — with `generateMetadata`
- `app/paint-your-pet/page.tsx`
- `app/themes/[slug]/page.tsx` — with `generateMetadata`
- `app/admin/page.tsx`
- `app/not-found.tsx`
- `app/sitemap.ts` — auto-generated sitemap
- `app/robots.ts`
- `app/api/generate-sketch/route.ts` — Gemini server-side API route
- `vercel.json` — 301 redirects from WordPress URLs
- `.env.local.example`

### Modify
- `package.json` — remove Vite deps, add Next.js
- `tsconfig.json` — Next.js-compatible config
- `context/ContentContext.tsx` — add `'use client'`
- `components/Navbar.tsx` — replace `react-router-dom` with `next/link`, `usePathname`, `useRouter`
- `components/Footer.tsx` — replace `react-router-dom` with `next/link`, `useRouter`
- `components/ThemeInjector.tsx` — add `'use client'`, use `next/head` pattern → just inject `<style>` (works in client components)
- `components/ScrollToTop.tsx` — rewrite using `usePathname` from `next/navigation`; remove first-visit-redirect logic (SPA artifact, not needed in Next.js)
- `components/PetSketcher.tsx` — replace direct `GoogleGenAI` call with `fetch('/api/generate-sketch')`
- All files in `views/` — add `'use client'` directive to each

---

## Task 1: Rename `pages/` → `views/`

**Files:**
- Rename: `pages/` → `views/`
- Modify: all files that import from `../pages/` or `./pages/`

- [ ] **Step 1: Rename the directory**

```bash
mv /Users/ryan/Code/Artbar/pages /Users/ryan/Code/Artbar/views
```

- [ ] **Step 2: Verify no other imports reference `pages/`**

```bash
grep -r "from.*['\"].*pages/" /Users/ryan/Code/Artbar --include="*.tsx" --include="*.ts" -l
```

Expected: no output (App.tsx imports from `./pages/X` — that file is being deleted anyway)

- [ ] **Step 3: Commit**

```bash
cd /Users/ryan/Code/Artbar
git add -A
git commit -m "refactor: rename pages/ to views/ to avoid Next.js Pages Router conflict"
```

---

## Task 2: Update `package.json` + `tsconfig.json`

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace package.json**

```json
{
  "name": "artbar-tokyo",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^0.554.0",
    "@google/genai": "^1.30.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "~5.8.2",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.4.0"
  }
}
```

Note: Next.js 15 is the stable release as of the plan date. It uses React 19 and has full App Router support. (Next.js 16 is referenced in the Vercel ecosystem docs as the upcoming version — use 15 until 16 is stable.)

- [ ] **Step 2: Replace tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Install dependencies**

```bash
cd /Users/ryan/Code/Artbar
rm -rf node_modules package-lock.json
npm install
```

Expected: clean install, no peer dep errors

- [ ] **Step 4: Commit**

```bash
git add package.json tsconfig.json package-lock.json
git commit -m "chore: replace Vite with Next.js 15, add Tailwind v4 PostCSS"
```

---

## Task 3: PostCSS + Tailwind CSS v4 setup

**Files:**
- Create: `postcss.config.ts`
- Create: `app/globals.css`

- [ ] **Step 1: Create `postcss.config.ts`**

```ts
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 2: Create `app/globals.css`**

Translate the entire inline Tailwind config from `index.html` and animations from `index.css` into Tailwind v4 CSS syntax:

```css
@import "tailwindcss";

/* ─── Brand Tokens ─────────────────────────────────────── */
@theme {
  /* Colors */
  --color-artbar-navy: #053761;
  --color-artbar-taupe: #A39384;
  --color-artbar-light-taupe: #D1C7B8;
  --color-artbar-bg: #F1EFEC;
  --color-artbar-gray: #797979;
  --color-artbar-blue: #3E6686;
  /* Backward-compat aliases */
  --color-artbar-gold: #A39384;
  --color-artbar-beige: #F1EFEC;
  --color-artbar-orange: #A39384;
  --color-artbar-text: #053761;

  /* Font families */
  --font-family-sans: var(--font-body), "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
    "游ゴシック", YuGothic, "メイリオ", Meiryo, sans-serif;
  --font-family-heading: var(--font-heading), "Josefin Sans", sans-serif;

  /* Border radius */
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2.5rem;
  --radius-5xl: 3rem;

  /* Animations */
  --animate-in: fade-in 0.2s ease-out;
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-in-from-top-2: slide-in-from-top-2 0.3s ease-out;
  --animate-slide-in-from-top-4: slide-in-from-top-4 0.5s ease-out;
  --animate-slide-in-from-top-5: slide-in-from-top-5 0.3s ease-out;
  --animate-zoom-in-95: zoom-in-95 0.2s ease-out;
}

/* ─── Keyframes ─────────────────────────────────────────── */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slide-in-from-top-2 {
  from { transform: translateY(-0.5rem); opacity: 0; }
  to   { transform: translateY(0);       opacity: 1; }
}
@keyframes slide-in-from-top-4 {
  from { transform: translateY(-1rem);   opacity: 0; }
  to   { transform: translateY(0);       opacity: 1; }
}
@keyframes slide-in-from-top-5 {
  from { transform: translateY(-1.25rem); opacity: 0; }
  to   { transform: translateY(0);        opacity: 1; }
}
@keyframes zoom-in-95 {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}

/* ─── Base Styles ───────────────────────────────────────── */
:root {
  --font-heading: 'Josefin Sans';
  --font-body: 'Hiragino Kaku Gothic ProN';
}

body {
  background-color: #F1EFEC;
  color: #053761;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── Utility Classes ───────────────────────────────────── */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.animate-in { animation-duration: 0.5s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
.fade-in           { animation-name: fade-in; }
.slide-in-from-top-4 { animation-name: slide-in-from-top-4; }
.slide-in-from-top-2 { animation-name: slide-in-from-top-2; }
.zoom-in-95        { animation-name: zoom-in-95; }

/* Font weight utilities matching old Tailwind config */
.font-bold  { font-weight: 600; }
.font-heavy { font-weight: 700; }
```

- [ ] **Step 3: Commit**

```bash
git add postcss.config.ts app/globals.css
git commit -m "feat: add Tailwind v4 PostCSS config and global CSS with brand tokens"
```

---

## Task 4: Next.js config + root layout

**Files:**
- Create: `next.config.ts`
- Create: `app/layout.tsx`
- Create: `.env.local.example`

- [ ] **Step 1: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'toolandtea.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create `.env.local.example`**

```
GEMINI_API_KEY=your_gemini_api_key_here
```

- [ ] **Step 3: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeInjector } from '@/components/ThemeInjector';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Artbar Tokyo | Paint & Sip Studio',
    template: '%s | Artbar Tokyo',
  },
  description: 'Artbar Tokyo — Japan\'s leading paint and sip studio. Creative art classes in Daikanyama, Harajuku, Ginza, Yokohama, Osaka and Okinawa.',
  metadataBase: new URL('https://artbar.co.jp'),
  openGraph: {
    siteName: 'Artbar Tokyo',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefinSans.variable}>
      <body>
        <ContentProvider>
          <ThemeInjector />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans text-artbar-navy selection:bg-artbar-taupe selection:text-white">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ContentProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add next.config.ts app/layout.tsx .env.local.example
git commit -m "feat: add Next.js config and root layout with Josefin Sans font"
```

---

## Task 5: Update shared client components

**Files:**
- Modify: `context/ContentContext.tsx`
- Modify: `components/ThemeInjector.tsx`
- Modify: `components/ScrollToTop.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Add `'use client'` to `ContentContext.tsx`**

Add as first line:
```tsx
'use client';
```

- [ ] **Step 2: Add `'use client'` to `ThemeInjector.tsx`**

Add as first line:
```tsx
'use client';
```

No other changes needed — rendering `<style>` tags in a client component is fine.

- [ ] **Step 3: Rewrite `ScrollToTop.tsx`**

Replace entirely with a Next.js version. Remove the first-visit redirect logic (SPA artifact — Next.js handles real URLs directly):

```tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
```

- [ ] **Step 4: Update `Navbar.tsx`**

Replace react-router-dom imports with Next.js equivalents:
- `import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'` →
  `import Link from 'next/link'` + `import { usePathname, useRouter } from 'next/navigation'`
- Add `'use client'` as first line
- Replace `RouterLink` with `Link`
- Replace `useLocation()` with `usePathname()` — update all `location.pathname` refs to use the returned string directly
- Replace `location.hash` with `''` (hash-based active detection no longer needed — clean URLs)
- Replace `useNavigate()` with `useRouter()`
- Replace `navigate('/#schedule')` with `router.push('/#schedule')`
- The `handleLogoClick` logic: replace `location.pathname === '/'` with `pathname === '/'`

- [ ] **Step 5: Update `Footer.tsx`**

- Add `'use client'` as first line
- Replace `import { Link, useNavigate } from 'react-router-dom'` with `import Link from 'next/link'` + `import { useRouter } from 'next/navigation'`
- Replace `<Link to="...">` with `<Link href="...">`
- Replace `navigate('/admin')` with `router.push('/admin')`

- [ ] **Step 6: Verify components compile**

```bash
cd /Users/ryan/Code/Artbar
npx tsc --noEmit
```

Expected: no errors in the shared components

- [ ] **Step 7: Commit**

```bash
git add context/ContentContext.tsx components/ThemeInjector.tsx components/ScrollToTop.tsx components/Navbar.tsx components/Footer.tsx
git commit -m "refactor: migrate shared components to Next.js (use client, next/link, next/navigation)"
```

---

## Task 6: Add `'use client'` to all view components

**Files:** All 13 files in `views/`

- [ ] **Step 1: Add `'use client'` to each view**

Add `'use client'` as the first line of each of these files:
- `views/Home.tsx`
- `views/Instructors.tsx`
- `views/TeamBuilding.tsx`
- `views/PrivateParties.tsx`
- `views/Locations.tsx`
- `views/Press.tsx`
- `views/Contact.tsx`
- `views/BlogList.tsx`
- `views/BlogPost.tsx`
- `views/PaintYourPet.tsx`
- `views/ThemeDetail.tsx`
- `views/Admin.tsx`
- `views/NotFound.tsx`

Also replace any `react-router-dom` `Link`/`useNavigate`/`useParams` in view files:
- `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
- `<Link to="...">` → `<Link href="...">`
- `import { useParams } from 'react-router-dom'` → `import { useParams } from 'next/navigation'`
- `import { useNavigate } from 'react-router-dom'` → `import { useRouter } from 'next/navigation'`

Run to find all react-router-dom usages in views:
```bash
grep -r "react-router-dom" /Users/ryan/Code/Artbar/views --include="*.tsx" -l
```

- [ ] **Step 2: Verify no react-router-dom imports remain in views/ or components/**

```bash
grep -r "react-router-dom" /Users/ryan/Code/Artbar --include="*.tsx" --include="*.ts" -l
```

Expected: no output

- [ ] **Step 3: Check TypeScript**

```bash
cd /Users/ryan/Code/Artbar && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add views/
git commit -m "refactor: add 'use client' to all view components, migrate to next/navigation"
```

---

## Task 7: Create route files (static pages)

Create thin Server Component route files for each page. Each exports `metadata` and renders the matching view component.

**Files:** 10 new `app/*/page.tsx` files

- [ ] **Step 1: Create `app/page.tsx`**

```tsx
import { defaultContent } from '@/data/content';
import { Home } from '@/views/Home';

export const metadata = {
  title: 'Artbar Tokyo | Paint & Sip Studio',
  description: defaultContent.en.home.hero.subtitle,
};

export default function HomePage() {
  return <Home />;
}
```

- [ ] **Step 2: Create remaining static route files**

Pattern for each (repeat for all routes below):

```tsx
// app/instructors/page.tsx
import { defaultContent } from '@/data/content';
import { Instructors } from '@/views/Instructors';

export const metadata = {
  title: defaultContent.en.instructorsPage.title,
};

export default function InstructorsPage() {
  return <Instructors />;
}
```

Routes to create:
- `app/instructors/page.tsx` → `<Instructors />`
- `app/team-building/page.tsx` → `<TeamBuilding />`
- `app/private-parties/page.tsx` → `<PrivateParties />`
- `app/locations/page.tsx` → `<Locations />`
- `app/press/page.tsx` → `<Press />`
- `app/contact/page.tsx` → `<Contact />`
- `app/blog/page.tsx` → `<BlogList />`
- `app/paint-your-pet/page.tsx` → `<PaintYourPet />`
- `app/admin/page.tsx` → `<Admin />`

- [ ] **Step 3: Create `app/not-found.tsx`**

```tsx
import { NotFound } from '@/views/NotFound';

export default function NotFoundPage() {
  return <NotFound />;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: add Next.js App Router route files for all static pages"
```

---

## Task 8: Dynamic route files

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/themes/[slug]/page.tsx`

- [ ] **Step 1: Create `app/blog/[slug]/page.tsx`**

```tsx
import { defaultContent } from '@/data/content';
import { BlogPost } from '@/views/BlogPost';
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = defaultContent.blog.find(p => p.slug === slug);
  if (!post) return { title: 'Blog | Artbar Tokyo' };
  return {
    title: post.titleEn,
    description: post.excerptEn,
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
    },
  };
}

export default function BlogPostPage() {
  return <BlogPost />;
}
```

- [ ] **Step 2: Create `app/themes/[slug]/page.tsx`**

```tsx
import { ThemeDetail } from '@/views/ThemeDetail';

export default function ThemeDetailPage() {
  return <ThemeDetail />;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog app/themes
git commit -m "feat: add dynamic route files for blog posts and theme detail pages"
```

---

## Task 9: Gemini API route (server-side)

Move the Gemini API key from the browser to a server-side Next.js API route.

**Files:**
- Create: `app/api/generate-sketch/route.ts`
- Modify: `components/PetSketcher.tsx`

- [ ] **Step 1: Create `app/api/generate-sketch/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();

  if (!imageBase64) {
    return NextResponse.json({ error: 'imageBase64 required' }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const prompt = `
    Create a high-quality, black and white line drawing of this pet.
    Style: Realistic sketch, clean lines, white background.
    Focus on the facial features and fur texture.
    Do not add color. Make it look like a coloring book page.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
        { text: prompt },
      ],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  const imagePart = parts?.find(p => p.inlineData);

  if (!imagePart?.inlineData) {
    return NextResponse.json({ error: 'No image generated' }, { status: 500 });
  }

  return NextResponse.json({
    imageBase64: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || 'image/png',
  });
}
```

- [ ] **Step 2: Update `PetSketcher.tsx` to call the API route**

Replace the `generateSketch` function. Remove the `GoogleGenAI` import. Change the generate logic to:

```tsx
const generateSketch = async () => {
  if (!image) return;
  setLoading(true);
  try {
    const base64Data = image.split(',')[1];
    const res = await fetch('/api/generate-sketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: base64Data }),
    });
    if (!res.ok) throw new Error('API error');
    const { imageBase64, mimeType } = await res.json();
    setGeneratedImage(`data:${mimeType};base64,${imageBase64}`);
  } catch (error) {
    console.error('Sketch generation failed', error);
    alert('Something went wrong. Please check your connection or try a smaller image.');
  } finally {
    setLoading(false);
  }
};
```

Also remove `process.env.API_KEY` — it's no longer needed client-side.

- [ ] **Step 3: Verify `GEMINI_API_KEY` is in `.env.local`**

```bash
grep GEMINI_API_KEY /Users/ryan/Code/Artbar/.env.local
```

Expected: `GEMINI_API_KEY=...` (non-empty)

- [ ] **Step 4: Commit**

```bash
git add app/api/generate-sketch/route.ts components/PetSketcher.tsx
git commit -m "feat: move Gemini API key server-side via Next.js API route"
```

---

## Task 10: SEO — sitemap, robots, 301 redirects

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `vercel.json`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import { defaultContent } from '@/data/content';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://artbar.co.jp';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/instructors`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/team-building`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/private-parties`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/locations`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/press`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/paint-your-pet`, priority: 0.8, changeFrequency: 'monthly' },
  ];

  const blogRoutes: MetadataRoute.Sitemap = defaultContent.blog
    .filter(p => p.published)
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(post.date),
    }));

  return [...staticRoutes, ...blogRoutes];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: 'https://artbar.co.jp/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create `vercel.json`**

Based on the WordPress URL patterns documented in `migration.md`:

```json
{
  "cleanUrls": true,
  "redirects": [
    { "source": "/events", "destination": "/", "permanent": true },
    { "source": "/events/", "destination": "/", "permanent": true },
    { "source": "/calendar", "destination": "/", "permanent": true },
    { "source": "/about/instructors", "destination": "/instructors", "permanent": true },
    { "source": "/contact-us", "destination": "/contact", "permanent": true },
    { "source": "/category/:slug", "destination": "/blog", "permanent": true },
    { "source": "/:year(\\d{4})/:month(\\d{2})/:slug", "destination": "/blog/:slug", "permanent": true }
  ]
}
```

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts vercel.json
git commit -m "feat: add sitemap, robots.txt, and WordPress 301 redirects"
```

---

## Task 11: Delete old Vite files + smoke test

**Files:**
- Delete: `index.html`, `index.tsx`, `App.tsx`, `vite.config.ts`

- [ ] **Step 1: Delete Vite artifacts**

```bash
cd /Users/ryan/Code/Artbar
rm index.html index.tsx App.tsx vite.config.ts
```

- [ ] **Step 2: Run dev server**

```bash
npm run dev
```

Expected: Next.js dev server starts on http://localhost:3000 with no errors

- [ ] **Step 3: Manual smoke test — visit each route**

- [ ] `/` — Home page renders
- [ ] `/instructors` — Instructors page renders
- [ ] `/team-building` — renders
- [ ] `/private-parties` — renders
- [ ] `/locations` — renders
- [ ] `/blog` — renders
- [ ] `/blog/[any-slug]` — renders without crash
- [ ] `/paint-your-pet` — renders, file upload works
- [ ] `/admin` — renders, content editor loads
- [ ] Language toggle EN/JP works on any page
- [ ] Navbar mobile menu opens/closes
- [ ] `/sitemap.xml` — returns XML
- [ ] `/robots.txt` — returns valid robots content

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: successful build with no TypeScript errors

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove Vite files, Next.js migration complete"
```

---

## Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update commands section**

Replace Vite commands with:
```
npm run dev      # Next.js dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server locally
```

Update architecture section to reflect Next.js App Router, PostCSS Tailwind, file-based routing, and server-side Gemini API route.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Next.js architecture"
```

---

## Execution Notes

- Do **not** delete `react-router-dom` from package.json until Task 6 is confirmed passing (some views may still reference it)
- If TypeScript errors appear in view components after Task 6, fix them individually before moving to Task 7
- The `ScrollToTop` first-visit redirect removal is intentional — Next.js handles direct URL access natively
- `ThemeInjector` renders `<style>` directly in a client component — this is valid in Next.js App Router
- Tailwind v4 does not use a `tailwind.config.ts` — all config lives in `app/globals.css` via `@theme`
