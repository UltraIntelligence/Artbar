# Data model (Artbar Tokyo)

## Domain overview

Artbar Tokyo is a **marketing website** for a bilingual (English/Japanese) paint-and-sip studio business: schedules and booking point to external flows; the site itself is **content + presentation**. There is **no database** in this repository. The canonical “domain” is a **single JSON-shaped document** (`ContentData` in `types.ts`) loaded from `data/content.ts`, optionally **overwritten per browser** via `localStorage` after edits in `/admin`. **Server routes** (`app/api/*`) are **stateless**: they call Google Gemini for text or image generation and return JSON; they do not persist user data.

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
| **Shipped defaults** | `defaultContent` from `data/content.ts` (built into the bundle) | Server Components, `generateMetadata`, `app/sitemap.ts` | SEO title/description for blog posts; URLs in sitemap |
| **Runtime (per browser)** | `deepMerge(defaultContent, localStorage)` in `ContentProvider` | Client components under `useContent()` | Everything users see after hydration; includes `/admin` edits |

There is **no sync** from runtime back to the repo or to the server bundle. Treat “production truth” for SEO as **git** unless you change how metadata is resolved.

---

## Core entities

| Entity | Purpose | Key fields | Where it lives |
|--------|---------|------------|----------------|
| **ContentData** | Root aggregate for all site content + theme tokens | `en`, `jp`, `images`, `theme`, shared arrays | `types.ts` (`ContentData`), `data/content.ts` (`defaultContent`), runtime merge in `context/ContentContext.tsx` |
| **SiteContent** | Per-language marketing copy (nav, home sections, page-specific blocks) | Nested `nav`, `home`, `footer`, `teamBuilding`, `privateParties`, `blogPage`, etc. | `types.ts` (`SiteContent`), `data/content.ts` (`en` / `jp`) |
| **ThemeConfig** | Admin-editable font stacks + Tailwind class strings for typography scale | `fonts.heading`, `fonts.body`, `typography.*` | `types.ts`, `data/content.ts` → `theme`; consumed by `components/ThemeInjector.tsx` |
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
| **AI text assist** | Prompt in → model text out | `prompt` / `text` | `app/api/ai-text/route.ts`; used from `views/Admin.tsx`, `views/Locations.tsx` |

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

- **Create:** `defaultContent` in `data/content.ts` (and imported constants) is the initial state; `ContentProvider` initializes state from that (`context/ContentContext.tsx`).
- **Update:** `/admin` mutates a local copy and calls `updateContent`, which **writes JSON** to `localStorage` key `artbar_content_v5`. On load, `deepMerge(defaultContent, parsed)` fills missing keys from **current** defaults.
- **Delete:** `resetContent()` clears `localStorage` and resets React state to `defaultContent`.

### BlogPost

- **Create/Update/Delete:** Through Admin UI (`views/Admin.tsx`) editing `content.blog` array; persisted with the rest of `ContentData`.
- **Visibility:** `published === false` hides posts from `views/BlogList.tsx` (`filter`).
- **Side effects:** `app/sitemap.ts` and `app/blog/[slug]/page.tsx` `generateMetadata` use **`defaultContent` from `data/content.ts` only**, not `localStorage`—see [Edge cases](#edge-cases-and-gotchas).

### Instructor, Location, Testimonial, MediaItem, FaqItem

- **Create/Update/Delete:** Via Admin sections that edit nested paths on `ContentData`; same localStorage persistence.
- **Defaults:** Often seeded from `constants.ts` in `data/content.ts`; admins can override in memory.

### ThemeConfig (fonts + typography classes)

- **Update:** Admin edits `content.theme`; `ThemeInjector` applies CSS variables and optional Google Fonts links (`components/ThemeInjector.tsx`).

### Theme slug pages (`THEME_CONFIG`)

- **Lifecycle:** **Code changes only**—deploy `views/ThemeDetail.tsx` / `app/themes/[slug]/page.tsx` to add or change a theme page.

#### How `/themes/[slug]` is reached from Home

`views/Home.tsx` does **not** read `THEME_CONFIG`. For each `site.home.themes.items` entry it computes:

```ts
themeItem.title.toLowerCase().replace(/ /g, '-').replace('!', '')
```

That string is the **`slug` in the URL** (`/themes/japan-inspired`, etc.). Therefore:

- **`THEME_CONFIG` keys must match** the slug produced from the **current** theme titles in content (EN/JP titles are the same for these items in practice; the slug uses whatever is in `items[].title` for the active build).
- Renaming a theme title in `/admin` without adding a matching key in `views/ThemeDetail.tsx` → `ThemeDetail` **falls back** to `THEME_CONFIG['japan-inspired']` (`views/ThemeDetail.tsx`), so users may see the **wrong** theme’s copy while the URL slug stays wrong for SEO.
- Titles like `"Kids!"` become `kids` (bang stripped). Special characters beyond spaces/`!` are **not** normalized—avoid punctuation in titles or extend the slug helper.
- **Example mismatch:** `constants.ts` uses the title `"Texture Painting"`, which slugifies to `texture-painting`, but `THEME_CONFIG` uses the key `texture-art`. That link resolves to the **fallback** page, not the texture theme—fix by aligning title ↔ key or adding a `texture-painting` config entry.

**Registered theme slugs** (keys of `THEME_CONFIG` in `views/ThemeDetail.tsx`):  
`japan-inspired`, `van-gogh`, `paint-pouring`, `alcohol-ink`, `monet`, `picasso`, `renoir`, `matisse`, `kids`, `texture-art`, `paint-your-pet`, `paint-your-idol`.

`app/themes/[slug]/page.tsx` defines `THEME_TITLES` for `<title>` tags; keys should stay aligned with the same slugs.

- **Imagery:** Hero, four example paintings, and the “experience” block use `THEME_PAGE_IMAGES` in `data/generated-image-paths.ts` (JPEGs under `public/media/generated/`, ids like `theme-{slug}-hero`, `theme-{slug}-example-1` … `-4`, `theme-{slug}-experience`). Prompts are in `data/theme-page-image-prompts.ts` and merged into `scripts/image-manifest.ts`; regenerate with `npm run generate:images:theme-pages`.

### Pet sketch / AI text

- **Create:** Each request is independent; no server-side storage. Client holds images in React state until navigation away.

---

## Invariants and constraints

- **`ContentData` must include both `en` and `jp`** for type satisfaction; runtime merge may patch partial objects.
- **`BlogPost.slug` must be unique** among posts for correct routing and “find by slug” in `views/BlogPost.tsx`.
- **`BlogPost.published`:** Listing and sitemap generation **intended** for published-only; implementation split between client list (`BlogList`) and build-time sitemap (`app/sitemap.ts`).
- **`deepMerge`:** Empty arrays in saved JSON **do not** override defaults—non-empty arrays replace. **Object** keys merge recursively.
- **API routes** expect `GEMINI_API_KEY` in the environment (`app/api/generate-sketch/route.ts`, `app/api/ai-text/route.ts`; image model override via `GEMINI_IMAGE_MODEL` per `lib/gemini-image-config.ts`).
- **Asset URLs:** Public files must live under `public/`; `GI` (`data/generated-image-paths.ts`) maps to `/media/generated/...` and `/media/instructors/...` (see `INSTRUCTOR_IDS`).
- **Home hero images:** `views/Home.tsx` falls back to `SITE_IMAGES.hero.home` from `constants.ts` when `content.images.hero.home` is empty or still a **toolandtea.com** placeholder URL—editing only one path can look “stuck.”

---

## API contracts (stateless)

| Route | Request body | Success response | Env / config |
|-------|----------------|------------------|--------------|
| `POST /api/generate-sketch` | `{ imageBase64: string }` | `{ imageBase64, mimeType }` | `GEMINI_API_KEY`; optional `GEMINI_IMAGE_MODEL` (`lib/gemini-image-config.ts`) |
| `POST /api/ai-text` | `{ prompt: string }` | `{ text: string }` | `GEMINI_API_KEY`; model fixed in route (`gemini-2.0-flash`) |

No sessions, quotas, or user IDs—only the Gemini call.

---

## Where to change what (editor checklist)

| Goal | Edit |
|------|------|
| Copy / wording (EN or JP) for pages | `data/content.ts` under `en` / `jp`, or `/admin` (local only) |
| Shared lists (instructors, locations, blog, FAQs) | Same; defaults often originate in `constants.ts` |
| New blog post in production SEO/sitemap | **Commit** changes to `data/content.ts` (and redeploy)—localStorage does not update server metadata |
| New `/themes/...` landing page | Add `THEME_CONFIG` entry + `THEME_TITLES` + ensure home theme **titles** slugify to that key |
| Fonts / typography scale | `content.theme` / Admin, consumed by `components/ThemeInjector.tsx` |
| Generated marketing images paths | `data/generated-image-paths.ts` (and assets under `public/media/generated/`) |
| Instructor list + photos | `INSTRUCTOR_IDS` + `INSTRUCTOR_ROWS` in `constants.ts`; JPEGs under `public/media/instructors/`; `scripts/image-manifest.ts` derives instructor slots from `INSTRUCTOR_IDS` |
| Global layout, nav shell | `app/layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx` |

---

## Edge cases and gotchas

- **SSR vs admin/localStorage:** Blog **metadata** (`generateMetadata`) and **sitemap** use **shipped** `defaultContent`, while the article body on `/blog/[slug]` uses **`content` from context** (merged with localStorage). Edits in `/admin` can **diverge** from OG tags and sitemap until code/content is redeployed or defaults are updated.
- **Stale `localStorage`:** Old keys can block new defaults (e.g. empty `images.hero.video`); **reset** in admin or clear `artbar_content_v5` (see project docs).
- **Theme slug drift:** Home links are **`/themes/${slugFromTitle}`** (`views/Home.tsx`). If the slug is **missing** from `THEME_CONFIG`, `ThemeDetail` still renders using the **Japan-Inspired** fallback—broken routing is subtle (wrong content, bad SEO), not necessarily a visible error page.
- **No auth on `/admin`:** Anyone with the URL can edit **client-side** content for that browser only; not a secure CMS.
- **No booking/user entities:** Sessions, tickets, and users are **out of scope** for this repo—copy may reference them, but no types exist.
- **Structured data:** `views/BlogPost.tsx` embeds Article JSON-LD; `views/Home.tsx` embeds Organization JSON-LD—**not** centralized in a dedicated `components/SEO.tsx` in this repo (AGENTS/CLAUDE may still mention a legacy path).

---

## Quick reference map

| Concern | Primary files |
|--------|----------------|
| Schema | `types.ts` |
| Default content | `data/content.ts`, `constants.ts` |
| Runtime content + persistence | `context/ContentContext.tsx` |
| Admin editor | `views/Admin.tsx` |
| Theme slug SEO pages | `views/ThemeDetail.tsx`, `app/themes/[slug]/page.tsx` |
| Blog | `views/BlogList.tsx`, `views/BlogPost.tsx`, `app/blog/**` |
| Sitemap | `app/sitemap.ts` |
| Gemini image | `app/api/generate-sketch/route.ts`, `lib/gemini-image-config.ts` |
| Gemini text | `app/api/ai-text/route.ts` |

---

## Glossary

| Term | Meaning here |
|------|----------------|
| **SiteContent** | One language’s full tree of UI strings (`en` or `jp`). |
| **ThemeConfig** | Admin-editable **typography / fonts** (`content.theme`), not paint “themes.” |
| **Paint theme / slug page** | SEO page under `/themes/[slug]`; copy lives in `ThemeDetail.tsx`, not `ContentData`. |
| **deepMerge** | Client-side merge of saved JSON onto `defaultContent`; preserves defaults when saved data omits keys; empty arrays keep defaults. |
