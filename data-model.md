# Data model (Artbar Tokyo)

## Domain overview

Artbar Tokyo is a **marketing website** for a bilingual (English/Japanese) paint-and-sip studio business: schedules and booking point to external flows; most of the site is **content + presentation**. The baseline content still ships as a single JSON-shaped document (`ContentData` in `types.ts`) from `data/content.ts`, which keeps SEO metadata, sitemap generation, and build-time defaults reliable.

The live product also has a **Supabase-backed copy publishing layer**. Staff use `/copy-admin` to save draft/published English or Japanese copy; public routes read the selected language payload through server helpers and `/api/copy-public`.

This is the completed bilingual version of the earlier Supabase-backed Japanese copy publishing layer.

`site_copy_locales` stores one row per editable language. Current locale keys are `en` and `jp`. Each row has `draft_payload`, `published_payload`, `previous_published_payload`, and publish timestamps. Public pages merge the selected language payload over `data/content.ts` defaults.

A second, **code-only** layer exists for **theme landing pages** (`/themes/[slug]`): long-form copy and layout live in `views/ThemeDetail.tsx` (`THEME_CONFIG`), not in `ContentData`—see [Theme slug pages](#theme-slug-pages) below.

### Content hierarchy (mental model)

```text
ContentData
├── en ───────────────────────── SiteContent (all EN strings / nested blocks)
├── jp ───────────────────────── SiteContent (mirror shape; not auto-synced)
├── theme ────────────────────── ThemeConfig (fonts + typography Tailwind classes)
├── images ───────────────────── Record (hero, logos, feature blocks…)
├── instructors[] ───────────── Instructor
├── locations[] ─────────────── Location
├── blog[] ───────────────────── BlogPost
├── media[] ─────────────────── MediaItem
├── faqs[] ───────────────────── FaqItem
└── teamBuildingTestimonials[] ─ Testimonial
```

Embedded testimonials also appear under `site.home.testimonials.items` (same `Testimonial` shape, different array).

### Two data planes (read this before debugging)

| Plane | Source | Who reads it | Typical use |
|-------|--------|----------------|---------------|
| **Shipped defaults** | `defaultContent` from `data/content.ts` (built into the bundle) | Server Components, metadata, sitemap, fallback UI | SEO/build-time defaults; safe fallback when the copy backend is unavailable |
| **Published admin copy** | Supabase locale row read by `lib/copy/store.ts`, merged by `lib/copy/resolve.ts` | `app/layout.tsx`, `/api/copy-public`, `/api/blog-post/[slug]`, `ContentProvider` retry path | Live English/Japanese copy managed through `/copy-admin`; public pages merge the selected language when configured |
Treat `data/content.ts` as the durable SEO/build fallback and `/copy-admin`/Supabase as the live language publishing surface.

---

## Core entities

| Entity | Purpose | Key fields | Where it lives |
|--------|---------|------------|----------------|
| **ContentData** | Root aggregate for all site content + theme tokens | `en`, `jp`, `images`, `theme`, shared arrays | `types.ts` (`ContentData`), `data/content.ts` (`defaultContent`), runtime merge in `context/ContentContext.tsx` |
| **SiteContent** | Per-language marketing copy (nav, home sections, page-specific blocks) | Nested `nav`, `home`, `footer`, `teamBuilding`, `privateParties`, `blogPage`, etc. | `types.ts` (`SiteContent`), `data/content.ts` (`en` / `jp`) |
| **ThemeConfig** | Code/content-defined font stacks + Tailwind class strings for typography scale | `fonts.heading`, `fonts.body`, `typography.*` | `types.ts`, `data/content.ts` → `theme`; consumed by `components/ThemeInjector.tsx` |
| **Instructor** | Staff profile for `/instructors` | `id`, `name`, `roleEn`/`roleJp`, `descEn`/`descJp`, `languages`, `profileImage`, `artworkImage` | `types.ts`; bios in `constants.ts` (`INSTRUCTOR_ROWS` → `INSTRUCTORS`); image slugs in `INSTRUCTOR_IDS` + `GI.instructors` (`data/generated-image-paths.ts`); merged in `data/content.ts` |
| **Location** | Studio / franchise location | `id`, `nameEn`/`nameJp`, addresses, `accessEn`/`accessJp`, `image` | `types.ts`, `constants.ts` (`LOCATIONS`), `data/content.ts` |
| **BlogPost** | Journal article | `id`, `slug`, `published`, `titleEn`/`titleJp`, `contentEn`/`contentJp` (HTML), `excerpt*`, `author*`, `date`, `tags`, `image` | `types.ts`, `data/content.ts` `blog`; list UI `views/BlogList.tsx` |
| **Testimonial** | Quote + attribution | `text`, `author`, optional `role`, `userImage` | `types.ts`; **home** testimonials in `site.home.testimonials.items`; **team building** in `content.teamBuildingTestimonials` (`constants.ts` + `data/content.ts`) |
| **MediaItem** | Press / PR coverage row | `outlet`, `date`, optional `image`, `logo` | `types.ts`, `constants.ts` (`MEDIA_LIST`), `content.media` |
| **FaqItem** | FAQ pair | `question`, `answer` | `types.ts`, `constants.ts` (`FAQS`), `content.faqs` |
| **Images bucket** | Arbitrary image URLs (hero, logos, feature blocks) | `Record<string, any>` — e.g. `hero.home`, `concept`, `features` | `types.ts`, `data/content.ts` `images`; defaults use `constants.ts` `SITE_IMAGES` + `data/generated-image-paths.ts` (`GI`) |
| **Popular theme (home)** | Carousel/grid items on home “Popular Themes” | `title`, `desc`, `image` per item | `constants.ts` (`POPULAR_THEMES`), wired into `data/content.ts` under `site.home.themes.items` |
| **Theme slug page** | SEO landing page per paint theme | URL `slug` → rich `ThemeContent` (hero, intro, examples, CTAs) | **Not** in `ContentData` — `views/ThemeDetail.tsx` (`THEME_CONFIG`); metadata titles in `app/themes/[slug]/page.tsx` (`THEME_TITLES`) |
| **Pet sketch session** | Ephemeral user upload → generated line art | Client: `image` / `generatedImage` Data URLs; API: `imageBase64` in/out | `components/PetSketcher.tsx`, `app/api/generate-sketch/route.ts`; **no persistence** |

Supporting **navigation** types (`NavLink`, etc.) exist in `types.ts` but are not persisted as separate collections.

---

## Relationships

- **ContentData ↔ SiteContent (1:2 languages):** `content.en` and `content.jp` are **parallel trees** of the same shape. No foreign keys—translators keep pairs in sync manually. `useContent().site` selects one branch via `lang` (`context/ContentContext.tsx`). Active `lang` is chosen from cookie `artbar_lang` or `Accept-Language` on first load (`lib/language.ts`, root `app/layout.tsx`); `toggleLang` updates the cookie.
- **ContentData → shared arrays (1:many):** `instructors`, `locations`, `blog`, `media`, `faqs`, `teamBuildingTestimonials` belong to the **single** `ContentData` root, not to a language key. **Enforced by** TypeScript only.
- **Instructor / Location identity:** `id` strings are **stable identifiers** for React keys and routing assumptions; duplicates are not prevented at runtime.
- **BlogPost:** `slug` is the **route key** (`/blog/[slug]`). `id` is secondary. **Enforced by** convention + `find` in views; duplicate slugs would be ambiguous.
- **BlogPost.tags:** `string[]` — **no** separate Tag entity; no tag index in-repo.
- **Testimonials ↔ pages:** Home uses embedded `Testimonial[]` inside `SiteContent`; team building uses a **separate** array `teamBuildingTestimonials`. Same interface, **two pools**—no shared ID.
- **Theme concepts (three sources):** (1) `POPULAR_THEMES` / `home.themes.items` for marketing snippets; (2) `GI.themes.*` in `data/generated-image-paths.ts` for asset paths; (3) `THEME_CONFIG` in `ThemeDetail.tsx` keyed by **URL slug** (e.g. `japan-inspired`). Slugs must **align** with how the home page **builds** links—**no single source of truth** in the DB sense (see [Theme slug pages](#theme-slug-pages)).
- **Images:** `content.images` is a **flexible** bag (`Record<string, any>`); structure is **not** enforced beyond usage sites (e.g. `Home.tsx` reading `content.images.hero`).

---

## Lifecycles

### ContentData (whole document)

- **Create:** `defaultContent` in `data/content.ts` (and imported constants) is the default tree. `app/layout.tsx` can merge published English or Japanese copy from Supabase before handing content to `ContentProvider`.
- **Update:** `/copy-admin` saves English or Japanese draft/published copy in Supabase. `/api/copy-public` returns the selected language's merged published tree for client retries when copy was not fetched on the first server render. Shared content is still changed in code.
- **Delete / reset:** `/copy-admin` can roll back to the previous published payload for the selected language. Shipped default removals happen through code/content changes.

### BlogPost

- **Create/Update/Delete:** Blog posts ship from `data/content.ts`. There is no current in-product blog editor documented here.
- **Visibility:** `published === false` hides posts from `views/BlogList.tsx` (`filter`).
- **Runtime lookup:** `views/BlogPost.tsx` may fetch `/api/blog-post/[slug]`, which still uses the Japanese published-copy path before returning the post body for that slug. Main layout and `/api/copy-public` are language-aware; this route needs a separate update before it can read English published copy too.
- **Side effects:** `app/sitemap.ts` and `app/blog/[slug]/page.tsx` `generateMetadata` use **`defaultContent` from `data/content.ts`**—see [Edge cases](#edge-cases-and-gotchas).

### Instructor, Location, Testimonial, MediaItem, FaqItem

- **Create/Update/Delete:** Defaults are changed through code/content updates, usually in `constants.ts` and `data/content.ts`.
- **Defaults:** These values seed the public site at build/runtime fallback; `/copy-admin` is for English/Japanese copy publishing, not a full editor for every shared list.

### ThemeConfig (fonts + typography classes)

- **Update:** Change `content.theme` in `data/content.ts`; `ThemeInjector` applies CSS variables and optional Google Fonts links (`components/ThemeInjector.tsx`).

### Theme slug pages (`THEME_CONFIG`)

- **Lifecycle:** **Code changes only**—deploy `views/ThemeDetail.tsx` / `app/themes/[slug]/page.tsx` to add or change a theme page.

#### How `/themes/[slug]` is reached from Home

`views/Home.tsx` does **not** read `THEME_CONFIG`. For each `site.home.themes.items` entry it computes:

```ts
themeItem.title.toLowerCase().replace(/ /g, '-').replace('!', '')
```

That string is the **`slug` in the URL** (`/themes/japan-inspired`, etc.). Therefore:

- **`THEME_CONFIG` keys must match** the slug produced from the **current** theme titles in content (EN/JP titles are the same for these items in practice; the slug uses whatever is in `items[].title` for the active build).
- Renaming a theme title in content without adding a matching key in `views/ThemeDetail.tsx` → `ThemeDetail` **falls back** to `THEME_CONFIG['japan-inspired']` (`views/ThemeDetail.tsx`), so users may see the **wrong** theme’s copy while the URL slug stays wrong for SEO.
- Titles like `"Kids!"` become `kids` (bang stripped). Special characters beyond spaces/`!` are **not** normalized—avoid punctuation in titles or extend the slug helper.
- **Example mismatch:** `constants.ts` uses the title `"Texture Painting"`, which slugifies to `texture-painting`, but `THEME_CONFIG` uses the key `texture-art`. That link resolves to the **fallback** page, not the texture theme—fix by aligning title ↔ key or adding a `texture-painting` config entry.

**Registered theme slugs** (keys of `THEME_CONFIG` in `views/ThemeDetail.tsx`):  
`japan-inspired`, `van-gogh`, `paint-pouring`, `alcohol-ink`, `monet`, `picasso`, `renoir`, `matisse`, `kids`, `texture-art`, `paint-your-pet`, `paint-your-idol`.

`app/themes/[slug]/page.tsx` defines `THEME_TITLES` for `<title>` tags; keys should stay aligned with the same slugs.

- **Imagery:** Hero, four example paintings, and the “experience” block use `THEME_PAGE_IMAGES` in `data/generated-image-paths.ts` (JPEGs under `public/media/generated/`, ids like `theme-{slug}-hero`, `theme-{slug}-example-1` … `-4`, `theme-{slug}-experience`). Prompts are in `data/theme-page-image-prompts.ts` and merged into `scripts/image-manifest.ts`; regenerate with `npm run generate:images:theme-pages`.

### Pet sketch

- **Create:** Each request is independent; no server-side storage. Client holds images in React state until navigation away.

---

## Invariants and constraints

- **`ContentData` must include both `en` and `jp`** for type satisfaction; runtime merge may patch partial objects.
- **`BlogPost.slug` must be unique** among posts for correct routing and “find by slug” in `views/BlogPost.tsx`.
- **`BlogPost.published`:** Listing and sitemap generation **intended** for published-only; implementation split between client list (`BlogList`) and build-time sitemap (`app/sitemap.ts`).
- **`deepMergeTemplate`:** Missing or `null` saved values preserve defaults. **Object** keys merge recursively. Arrays must be arrays; override arrays control the resulting length, so empty arrays produce empty arrays.
- **API routes** expect `GEMINI_API_KEY` in the environment (`app/api/generate-sketch/route.ts`; image model override via `GEMINI_IMAGE_MODEL` per `lib/gemini-image-config.ts`).
- **Asset URLs:** Public files must live under `public/`; `GI` (`data/generated-image-paths.ts`) maps to `/media/generated/...` and `/media/instructors/...` (see `INSTRUCTOR_IDS`).
- **Home hero images:** `views/Home.tsx` falls back to `SITE_IMAGES.hero.home` from `constants.ts` when `content.images.hero.home` is empty or still a **toolandtea.com** placeholder URL--editing only one path can look "stuck."

---

## API contracts

| Route | Purpose | Notes |
|-------|---------|-------|
| `POST /api/generate-sketch` | Paint Your Pet upload → Gemini sketch image | Requires `GEMINI_API_KEY`; optional `GEMINI_IMAGE_MODEL`; request size/rate limits apply |
| `POST /api/contact` | Customer contact form → staff email | Requires `RESEND_API_KEY`; validates required customer fields and rate limits submissions |
| `GET /api/copy-public` | Public copy feed | Reads published Supabase copy for the requested language when configured, merges it into content, and returns the active language payload with no-store caching |
| `POST /api/copy-admin/login` | Copy admin login | Requires `COPY_ADMIN_PASSWORD`, `COPY_ADMIN_SESSION_SECRET`, and Supabase config |
| `POST /api/copy-admin/logout` | Copy admin logout | Clears the copy-admin session cookie |
| `POST /api/copy-admin/draft` | Save selected language copy draft | Authenticated, same-origin admin mutation; writes draft payload to Supabase |
| `POST /api/copy-admin/publish` | Publish selected language copy draft | Authenticated, same-origin admin mutation; promotes draft to published and revalidates the copy cache |
| `POST /api/copy-admin/rollback` | Restore previous published copy | Authenticated, same-origin admin mutation; uses the previous published Supabase payload for the selected language |
| `GET /api/blog-post/[slug]` | Runtime blog post lookup | Still reads the Japanese published-copy path, merges content, and returns the published post for the slug |
| `POST /api/csp-report` | Browser Content Security Policy reports | Rate-limited log endpoint; sanitizes incoming report values |

These routes are still light product plumbing, not a booking/account system. Customer bookings and payments remain outside this repo.

---

## Where to change what (editor checklist)

| Goal | Edit |
|------|------|
| Copy / wording (EN or JP) for pages | `data/content.ts` for shipped defaults; `/copy-admin` for live published English/Japanese copy |
| Shared lists (instructors, locations, blog, FAQs) | Code/content changes; defaults often originate in `constants.ts` |
| New blog post in production SEO/sitemap | **Commit** changes to `data/content.ts` and redeploy |
| New `/themes/...` landing page | Add `THEME_CONFIG` entry + `THEME_TITLES` + ensure home theme **titles** slugify to that key |
| Fonts / typography scale | `content.theme` in `data/content.ts`, consumed by `components/ThemeInjector.tsx` |
| Generated marketing images paths | `data/generated-image-paths.ts` (and assets under `public/media/generated/`) |
| Instructor list + photos | `INSTRUCTOR_IDS` + `INSTRUCTOR_ROWS` in `constants.ts`; JPEGs under `public/media/instructors/`; `scripts/image-manifest.ts` derives instructor slots from `INSTRUCTOR_IDS` |
| Global layout, nav shell | `app/layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx` |

---

## Edge cases and gotchas

- **Shipped blog data vs runtime copy:** Blog **metadata** (`generateMetadata`) and **sitemap** use **shipped** `defaultContent`; the article body can refresh through `/api/blog-post/[slug]`, but that route still merges the Japanese published-copy path unless/until it is separately updated for English. Publish important SEO-facing blog changes through `data/content.ts`.
- **Theme slug drift:** Home links are **`/themes/${slugFromTitle}`** (`views/Home.tsx`). If the slug is **missing** from `THEME_CONFIG`, `ThemeDetail` still renders using the **Japan-Inspired** fallback—broken routing is subtle (wrong content, bad SEO), not necessarily a visible error page.
- **No booking/user entities:** Sessions, tickets, and users are **out of scope** for this repo—copy may reference them, but no types exist.
- **Structured data:** `views/BlogPost.tsx` embeds Article JSON-LD; `views/Home.tsx` embeds Organization JSON-LD—**not** centralized in a dedicated `components/SEO.tsx` in this repo (AGENTS/CLAUDE may still mention a legacy path).

---

## Quick reference map

| Concern | Primary files |
|--------|----------------|
| Schema | `types.ts` |
| Default content | `data/content.ts`, `constants.ts` |
| Runtime content + publishing | `app/layout.tsx`, `context/ContentContext.tsx`, `lib/copy/store.ts`, `lib/copy/resolve.ts` |
| Copy admin | `/copy-admin` routes/views for published English/Japanese copy |
| Theme slug SEO pages | `views/ThemeDetail.tsx`, `app/themes/[slug]/page.tsx` |
| Blog | `views/BlogList.tsx`, `views/BlogPost.tsx`, `app/blog/**` |
| Sitemap | `app/sitemap.ts` |
| Gemini image | `app/api/generate-sketch/route.ts`, `lib/gemini-image-config.ts` |

---

## Glossary

| Term | Meaning here |
|------|----------------|
| **SiteContent** | One language’s full tree of UI strings (`en` or `jp`). |
| **ThemeConfig** | Code/content-defined **typography / fonts** (`content.theme`), not paint “themes.” |
| **Paint theme / slug page** | SEO page under `/themes/[slug]`; copy lives in `ThemeDetail.tsx`, not `ContentData`. |
| **deepMergeTemplate** | Merge helper for copy/default payloads; missing or `null` saved values preserve defaults, objects merge recursively, and override arrays control the resulting array length. |
