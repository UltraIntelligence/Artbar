# English Copy Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Artbar staff edit, preview, save, publish, and roll back English site wording through the same friendly copy-admin workflow already used for Japanese.

**Status:** Completed on branch `codex/english-copy-admin`. The final implementation went beyond the first draft by wiring all reviewed English customer-facing copy surfaces to the active-language copy object and adding regression coverage for the areas most likely to drift.

**Architecture:** Keep `data/content.ts` as the shipped fallback/default source, and use the existing Supabase table `site_copy_locales` for one copy record per language: `en` and `jp`. Generalize the current Japanese-only copy store into locale-aware functions, then make `/copy-admin` a language-tabbed "Site Copy Admin" that hides technical paths by default and publishes one language at a time.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Supabase service-role access, Tailwind CSS v4, existing smoke-check scripts with `tsx`.

---

## Product Decision

Use one admin area, not separate tools:

- `/copy-admin` becomes **Site Copy Admin**.
- Top tabs: `English` and `Japanese`.
- Left sidebar remains page-based: Home, Team Building, Private Parties, Locations, Blog, Footer, etc.
- Main editor shows plain staff labels like `Home hero headline`, `Footer tagline`, and `Button: Book now`.
- Technical paths like `site / home / hero / title` stay hidden behind an `Advanced` toggle.
- Save/publish/rollback operate on the selected language only.
- English starts from `defaultContent.en`; Japanese keeps current defaults and migration protections.

## Scope Check

This plan covers copy editing only. It does not change the existing image replacement system at `/copy-admin/images`, except for navigation labels back to the main copy admin. It also does not create a visual page-preview iframe; it adds clear preview links to the public route for the selected language.

## File Structure

- `lib/copy/types.ts`  
  Owns locale-aware payload, record, and editor-state types.

- `lib/copy/defaults.ts`  
  Owns `COPY_LOCALES`, default payloads for `en` and `jp`, admin sections, plain field labels, and the existing `deepMergeTemplate`.

- `lib/copy/resolve.ts`  
  Owns normalization and merge logic. Existing Japanese migration behavior stays Japanese-only. New English normalization is intentionally lighter.

- `lib/copy/store.ts`  
  Owns Supabase reads/writes for copy records. All read/save/publish/rollback functions accept a locale.

- `app/api/copy-admin/draft/route.ts`  
  Saves the selected language draft.

- `app/api/copy-admin/publish/route.ts`  
  Publishes the selected language draft.

- `app/api/copy-admin/rollback/route.ts`  
  Rolls back the selected language live copy.

- `app/api/copy-public/route.ts`  
  Returns merged public content for a requested language, defaulting to Japanese for old callers.

- `app/layout.tsx`  
  Fetches the correct published copy for the initial route language, not only Japanese.

- `context/ContentContext.tsx`  
  Stores the merged content and resolved copy for the active language; preserves `jpCopy` as a compatibility alias until all views are migrated.

- `views/CopyAdmin.tsx`  
  Becomes the staff-facing language-tabbed Site Copy Admin.

- `scripts/copy-system-smoke-check.ts`  
  Adds focused assertions for the bilingual copy system.

- `package.json`  
  Adds `check:copy-system` and includes it in `npm run check`.

- `README.md`, `data-model.md`, `AGENTS.md`  
  Update docs so future agents and staff know English copy is backend-editable too.

---

### Task 1: Add a Failing Copy-System Smoke Check

**Files:**
- Create: `scripts/copy-system-smoke-check.ts`
- Modify: `package.json`

- [ ] **Step 1: Create the smoke check script**

Create `scripts/copy-system-smoke-check.ts` with this exact content:

```ts
import assert from 'node:assert/strict';
import {
  COPY_LOCALES,
  DEFAULT_COPY_PAYLOADS,
} from '../lib/copy/defaults';
import {
  mergePublishedLocaleIntoContent,
  normalizeCopyPayload,
} from '../lib/copy/resolve';

assert.deepEqual(COPY_LOCALES, ['en', 'jp']);

for (const locale of COPY_LOCALES) {
  const payload = DEFAULT_COPY_PAYLOADS[locale];
  assert.equal(payload.site.nav.book.length > 0, true, `${locale} nav book copy exists`);
  assert.equal(payload.instructors.length > 0, true, `${locale} instructor copy exists`);
  assert.equal(payload.locations.length > 0, true, `${locale} location copy exists`);

  const normalized = normalizeCopyPayload(locale, {
    site: {
      nav: {
        book: locale === 'en' ? 'Reserve a Seat' : '予約する',
      },
    },
  });

  const content = mergePublishedLocaleIntoContent(locale, normalized);
  assert.equal(
    content[locale].nav.book,
    locale === 'en' ? 'Reserve a Seat' : '予約する',
    `${locale} nav copy merges into public content`,
  );
}

const english = mergePublishedLocaleIntoContent('en', DEFAULT_COPY_PAYLOADS.en);
assert.equal(
  english.instructors[0].descEn,
  DEFAULT_COPY_PAYLOADS.en.instructors[0].desc,
  'English instructor copy writes to descEn',
);

const japanese = mergePublishedLocaleIntoContent('jp', DEFAULT_COPY_PAYLOADS.jp);
assert.equal(
  japanese.instructors[0].descJp,
  DEFAULT_COPY_PAYLOADS.jp.instructors[0].desc,
  'Japanese instructor copy writes to descJp',
);

console.log('Copy system smoke check passed.');
```

- [ ] **Step 2: Wire the script into package commands**

Modify `package.json` scripts so this block includes `check:copy-system`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "check": "npm run lint && npm run typecheck && npm run check:docs && npm run check:seo && npm run check:security && npm run check:performance && npm run check:media-slots && npm run check:copy-system && npm run build",
    "check:seo": "tsx scripts/seo-smoke-check.ts",
    "check:performance": "tsx scripts/performance-smoke-check.ts",
    "check:security": "tsx scripts/security-smoke-check.ts",
    "check:docs": "tsx scripts/docs-smoke-check.ts",
    "check:media-slots": "tsx scripts/media-slots-smoke-check.ts",
    "check:copy-system": "tsx scripts/copy-system-smoke-check.ts",
    "generate:images": "tsx scripts/generate-site-images.ts",
    "generate:images:dry": "tsx scripts/generate-site-images.ts --dry-run",
    "generate:images:revision": "tsx scripts/generate-site-images.ts --needs-revision",
    "generate:images:theme-pages": "tsx scripts/generate-site-images.ts --theme-pages"
  }
}
```

- [ ] **Step 3: Run the new check and confirm it fails for the right reason**

Run:

```bash
npm run check:copy-system
```

Expected: FAIL because `COPY_LOCALES`, `DEFAULT_COPY_PAYLOADS`, `normalizeCopyPayload`, and `mergePublishedLocaleIntoContent` do not exist yet.

- [ ] **Step 4: Commit**

```bash
git add package.json scripts/copy-system-smoke-check.ts
git commit -m "test: add copy system smoke check"
```

---

### Task 2: Generalize Copy Types and Defaults

**Files:**
- Modify: `lib/copy/types.ts`
- Modify: `lib/copy/defaults.ts`

- [ ] **Step 1: Replace Japanese-only payload types with locale-aware aliases**

In `lib/copy/types.ts`, add these exports near the top after imports. Keep the existing `JapaneseCopyPayload` name as an alias so current code keeps compiling during the migration:

```ts
export type CopyLocale = 'en' | 'jp';

export interface LocalizedInstructorCopy {
  id: string;
  role: string;
  desc: string;
}

export interface LocalizedLocationCopy {
  id: string;
  name: string;
  address: string;
  access: string;
}

export interface LocalizedBlogCopy {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface LocalizedThemeLogisticsRowCopy {
  name: string;
  cap: string;
}

export interface LocalizedPrivatePartyCapacityRowCopy {
  name: string;
  desc: string;
}
```

Then change `JapaneseCopyPayload` to:

```ts
export interface LocalizedCopyPayload {
  site: SiteContent;
  instructors: LocalizedInstructorCopy[];
  locations: LocalizedLocationCopy[];
  faqs: FaqItem[];
  teamBuildingTestimonials: Testimonial[];
  blog: LocalizedBlogCopy[];
  themePages: Record<string, ThemeJpStrings>;
  locationShortLabels: string[];
  teamBuildingLogisticsRows: LocalizedThemeLogisticsRowCopy[];
  privatePartyCapacityRows: LocalizedPrivatePartyCapacityRowCopy[];
  ui: JapaneseUiCopy;
}

export type JapaneseCopyPayload = LocalizedCopyPayload;
```

Change `CopyRecord` to:

```ts
export interface CopyRecord {
  locale: CopyLocale;
  draft_payload: LocalizedCopyPayload;
  published_payload: LocalizedCopyPayload;
  previous_published_payload: LocalizedCopyPayload | null;
  created_at?: string;
  updated_at?: string;
  published_at?: string | null;
}
```

Change `CopyEditorState` to:

```ts
export interface LocaleCopyEditorState {
  draft: LocalizedCopyPayload;
  published: LocalizedCopyPayload;
  previousPublished: LocalizedCopyPayload | null;
}

export interface CopyEditorState {
  locales: Record<CopyLocale, LocaleCopyEditorState>;
  isConfigured: boolean;
}
```

- [ ] **Step 2: Add English UI defaults**

In `lib/copy/defaults.ts`, create `DEFAULT_ENGLISH_UI_COPY` directly after `DEFAULT_JAPANESE_UI_COPY`:

```ts
export const DEFAULT_ENGLISH_UI_COPY = {
  navbar: {
    switchToJapanese: 'Japanese',
    switchToEnglish: 'English',
    compactJapanese: 'JP',
    compactEnglish: 'EN',
  },
  footer: {
    faq: 'FAQ',
    careers: 'Careers',
    emailLabel: 'Email Artbar Tokyo',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    logoAlt: 'Artbar Tokyo',
  },
  home: {
    meetRegularsHeading: 'Meet Our Regulars',
    bookTeamBuildingCta: 'Book Team Building',
    bilingualLine1: 'Bilingual instruction available',
    bilingualLine2: '(for many classes)',
    mediaCoverageLabel: 'Media Coverage',
    asSeenInHeading: 'As Seen In',
    heroLoading: 'Loading hero',
    storiesLabel: 'Stories',
    heroImageAlt: 'Artbar Experience',
    conceptImageAlt: 'Artbar Lifestyle',
    ctaImageAlt: 'Artbar Studio',
    conceptVideoCta: 'Watch the full video on YouTube',
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
  },
  contact: {
    subjectOptions: [
      { value: '', label: 'Select a subject...' },
      { value: 'general', label: 'General inquiry' },
      { value: 'booking', label: 'Booking question' },
      { value: 'private', label: 'Private party' },
      { value: 'instructor', label: 'Instructor question' },
      { value: 'cancellation', label: 'Cancellation' },
      { value: 'other', label: 'Other' },
    ],
    subjectLabel: 'Subject (required)',
    nameLabel: 'Name (required)',
    namePlaceholder: 'Artbar Taro',
    emailLabel: 'Email (required)',
    emailPlaceholder: 'hello@example.com',
    phoneLabel: 'Phone (required)',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help you?',
    send: 'Send Message',
    sent: 'Message sent! We will get back to you soon.',
    failed: 'Failed to send. Please try again or email us directly.',
  },
  locations: {
    intro: 'Find the studio closest to you. Each Artbar location offers its own atmosphere and creative experience.',
    directions: 'Get Directions',
    aiLoaded: 'AI information loaded',
    aiSummary: 'AI Summary',
    aiError: 'AI summary is unavailable right now.',
    mapsInsightsTitle: 'Maps Insights',
    sourcePrefix: 'Source',
    locationAddressLabel: 'Location Address',
    transitAccessLabel: 'Transit Access',
  },
  press: {
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
  },
  privateParties: {
    maxGuestsLabel: 'Max Guests',
    priceSuffix: '/ person (tax inc)',
    heroImageAlt: 'Private party at Artbar Tokyo',
  },
  teamBuilding: {
    heroImageAlt: 'Team building art session at Artbar Tokyo',
    specialtyChips: ['Candle Making', 'Resin Art', 'Alcohol Ink'],
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
  },
  blogList: {
    comingSoon: 'Coming Soon...',
  },
  blogPost: {
    articleNotFoundTitle: 'Article not found',
    articleNotFoundCta: 'Back to Journal',
    shareLabel: 'Share this article',
    facebookShareLabel: 'Share on Facebook',
    xShareLabel: 'Share on X',
    linkedinShareLabel: 'Share on LinkedIn',
    moreFromJournal: 'More from the Journal',
    readStory: 'Read story',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for may have been removed, renamed, or is temporarily unavailable.',
    cta: 'Back home',
  },
  themeDetail: {
    atmosphereImageAlt: 'Artbar atmosphere',
    viewSchedule: 'View schedule',
    inspiration: 'Inspiration',
    examplePaintings: 'Example Paintings',
    exampleBlurb: 'A sample of what you can create in our {{name}} paint and sip class.',
    theExperience: 'The Experience',
    guestFavorite: 'Guest favorite',
    bilingualSessions: 'Social painting sessions',
    expertGuidance: 'Step-by-step guidance',
    community: 'Community',
    whatToExpect: 'What to expect',
    whatToExpectSub: 'Everything you need to complete your artwork in Tokyo is included. No hidden fees.',
    bilingualArtClass: 'Bilingual art class',
    perfectForGifting: 'Perfect for gifting',
    viewUpcoming: 'View upcoming sessions',
    discoverMore: 'Discover more styles',
    discoverSub: 'From fluid art to impressionist gardens, find your next creative experience at Artbar Tokyo.',
    allCategories: 'All themes',
  },
  paintYourPet: {
    ...DEFAULT_JAPANESE_UI_COPY.paintYourPet,
    headerBadge: 'Artbar original program',
    originalPhoto: 'Original pet photo',
    canvasSketch: 'Canvas pet sketch',
    professionalSketchNote: 'An artist prepares a sketch like this on canvas before your class.',
    howItWorks: 'How it works',
    priceLabel: 'Price',
    sketchTitle: 'Magic Sketch Preview',
    sketchIntro: 'Upload a pet photo to preview a simple canvas sketch.',
    uploadCta: 'Upload photo',
    uploadFormats: 'JPG, PNG, HEIC, AVIF',
    uploadAriaLabel: 'Upload pet photo',
    originalPetAlt: 'Original pet photo',
    aiSketchAlt: 'AI sketch',
    sketching: 'Creating sketch...',
    generateLineArt: 'Generate line art',
    sketchPlaceholder: 'Your sketch will appear here',
    saveSketch: 'Save sketch',
  },
} satisfies JapaneseCopyPayload['ui'];
```

- [ ] **Step 3: Add default payload builders**

In `lib/copy/defaults.ts`, import `THEME_CONFIG` and the theme-copy type:

```ts
import { THEME_CONFIG } from '@/data/theme-details';
import type { ThemeJpStrings } from '@/data/theme-details-jp-strings';
```

Then add these helpers after `DEFAULT_ENGLISH_UI_COPY`:

```ts
const buildThemeCopyFromConfig = (): Record<string, ThemeJpStrings> =>
  Object.fromEntries(
    Object.entries(THEME_CONFIG).map(([slug, theme]) => [
      slug,
      {
        title: theme.title,
        heroBadge: theme.heroBadge,
        heroSub: theme.heroSub,
        introTitle: theme.introTitle,
        introDesc: theme.introDesc,
        quickFeatures: theme.quickFeatures.map(({ title, desc }) => ({ title, desc })),
        examples: theme.examples.map(({ title }) => ({ title })),
        exampleBlurb: theme.exampleBlurb,
        expectTitle: theme.expectTitle,
        expectDesc: theme.expectDesc,
        perfectTitle: theme.perfectTitle,
        perfectFor: [...theme.perfectFor],
        whatYouGet: theme.whatYouGet.map(({ text, sub }) => ({ text, sub })),
        ctaTitle: theme.ctaTitle,
        ctaSub: theme.ctaSub,
        seoTitle: theme.seoTitle,
        seoDesc: theme.seoDesc,
      },
    ]),
  );

const buildEnglishCopyPayload = (): JapaneseCopyPayload => ({
  site: structuredClone(defaultContent.en),
  instructors: defaultContent.instructors.map((item) => ({
    id: item.id,
    role: item.roleEn,
    desc: item.descEn,
  })),
  locations: defaultContent.locations.map((item) => ({
    id: item.id,
    name: item.nameEn,
    address: item.addressEn,
    access: item.accessEn,
  })),
  faqs: structuredClone(defaultContent.faqs),
  teamBuildingTestimonials: structuredClone(defaultContent.teamBuildingTestimonials),
  blog: defaultContent.blog.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.titleEn,
    excerpt: item.excerptEn,
    content: item.contentEn,
    author: item.authorEn,
  })),
  themePages: buildThemeCopyFromConfig(),
  locationShortLabels: LOCATION_SHORT_LABELS.map((item) => item.en),
  teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item) => ({
    name: item.name.en,
    cap: item.cap.en,
  })),
  privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item) => ({
    name: item.name.en,
    desc: item.desc.en,
  })),
  ui: structuredClone(DEFAULT_ENGLISH_UI_COPY),
});

const buildJapaneseCopyPayload = (): JapaneseCopyPayload => ({
  site: structuredClone(defaultContent.jp),
  instructors: defaultContent.instructors.map((item) => ({
    id: item.id,
    role: item.roleJp,
    desc: item.descJp,
  })),
  locations: defaultContent.locations.map((item) => ({
    id: item.id,
    name: item.nameJp,
    address: item.addressJp,
    access: item.accessJp,
  })),
  faqs: structuredClone(FAQS_JP),
  teamBuildingTestimonials: structuredClone(defaultContent.teamBuildingTestimonials),
  blog: defaultContent.blog.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.titleJp,
    excerpt: item.excerptJp,
    content: item.contentJp,
    author: item.authorJp,
  })),
  themePages: structuredClone(THEME_JP),
  locationShortLabels: LOCATION_SHORT_LABELS.map((item) => item.jp),
  teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item) => ({
    name: item.name.jp,
    cap: item.cap.jp,
  })),
  privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item) => ({
    name: item.name.jp,
    desc: item.desc.jp,
  })),
  ui: structuredClone(DEFAULT_JAPANESE_UI_COPY),
});

export const COPY_LOCALES = ['en', 'jp'] as const;

export const DEFAULT_COPY_PAYLOADS = {
  en: buildEnglishCopyPayload(),
  jp: buildJapaneseCopyPayload(),
} satisfies Record<(typeof COPY_LOCALES)[number], JapaneseCopyPayload>;

export const DEFAULT_JAPANESE_COPY_PAYLOAD = DEFAULT_COPY_PAYLOADS.jp;
```

Remove the previous object literal assigned to `DEFAULT_JAPANESE_COPY_PAYLOAD`; its data is now produced by `buildJapaneseCopyPayload()`.

- [ ] **Step 4: Run typecheck and expected smoke check**

Run:

```bash
npm run typecheck
npm run check:copy-system
```

Expected: `typecheck` may fail in `lib/copy/resolve.ts` because old `roleJp`/`descJp` field names were removed. `check:copy-system` still fails because resolver exports are not implemented yet.

- [ ] **Step 5: Commit**

```bash
git add lib/copy/types.ts lib/copy/defaults.ts
git commit -m "refactor: add locale-aware copy defaults"
```

---

### Task 3: Add Locale-Aware Normalize and Merge Logic

**Files:**
- Modify: `lib/copy/resolve.ts`

- [ ] **Step 1: Add locale-aware public functions**

In `lib/copy/resolve.ts`, keep existing Japanese migration helpers, then add these functions after `normalizeJapaneseCopyPayload`:

```ts
import type { CopyLocale, LocalizedCopyPayload } from '@/lib/copy/types';
import { DEFAULT_COPY_PAYLOADS } from '@/lib/copy/defaults';

export function normalizeCopyPayload(locale: CopyLocale, payload: unknown): LocalizedCopyPayload {
  const template = DEFAULT_COPY_PAYLOADS[locale];
  const normalized = deepMergeTemplate(template, payload);

  if (locale === 'jp') {
    return normalizeJapaneseCopyPayload(normalized);
  }

  normalized.blog = normalized.blog.map((item) => ({
    ...item,
    content: sanitizeBlogHtml(item.content),
  }));

  return normalized;
}

export function mergePublishedLocaleIntoContent(
  locale: CopyLocale,
  payload: LocalizedCopyPayload,
): ContentData {
  const content = structuredClone(defaultContent);
  content[locale] = deepMergeTemplate(defaultContent[locale], payload.site);

  content.instructors = content.instructors.map((item) => {
    const copy = payload.instructors.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, roleEn: copy.role, descEn: copy.desc }
      : { ...item, roleJp: copy.role, descJp: copy.desc };
  });

  content.locations = content.locations.map((item) => {
    const copy = payload.locations.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? { ...item, nameEn: copy.name, addressEn: copy.address, accessEn: copy.access }
      : { ...item, nameJp: copy.name, addressJp: copy.address, accessJp: copy.access };
  });

  content.blog = content.blog.map((item) => {
    const copy = payload.blog.find((candidate) => candidate.id === item.id);
    if (!copy) return item;
    return locale === 'en'
      ? {
          ...item,
          titleEn: copy.title,
          excerptEn: copy.excerpt,
          contentEn: sanitizeBlogHtml(copy.content),
          authorEn: copy.author,
        }
      : {
          ...item,
          titleJp: copy.title,
          excerptJp: copy.excerpt,
          contentJp: sanitizeBlogHtml(copy.content),
          authorJp: copy.author,
        };
  });

  return content;
}
```

- [ ] **Step 2: Preserve existing Japanese function names**

Replace the body of `mergePublishedIntoContent` with this compatibility wrapper:

```ts
export function mergePublishedIntoContent(payload: JapaneseCopyPayload): ContentData {
  return mergePublishedLocaleIntoContent('jp', payload);
}
```

- [ ] **Step 3: Update `buildResolvedJapaneseCopy` field reads**

Inside `buildResolvedJapaneseCopy`, replace field reads from old Japanese-specific names:

```ts
row.name
row.cap
item.desc
item.title
item.excerpt
item.content
item.author
```

The important conversion is that `payload.teamBuildingLogisticsRows`, `payload.privatePartyCapacityRows`, and `payload.blog` now use neutral field names. For example:

```ts
privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item, index) => {
  const payloadRow = payload.privatePartyCapacityRows[index];
  return {
    ...item,
    name: {
      ...item.name,
      jp: payloadRow?.name ?? item.name.jp,
    },
    desc: {
      ...item.desc,
      jp: payloadRow?.desc ?? item.desc.jp,
    },
  };
}),
```

- [ ] **Step 4: Run the smoke check**

Run:

```bash
npm run check:copy-system
```

Expected: PASS with `Copy system smoke check passed.`

- [ ] **Step 5: Commit**

```bash
git add lib/copy/resolve.ts
git commit -m "refactor: merge copy by locale"
```

---

### Task 4: Make the Copy Store and APIs Locale-Aware

**Files:**
- Modify: `lib/copy/store.ts`
- Modify: `app/api/copy-admin/draft/route.ts`
- Modify: `app/api/copy-admin/publish/route.ts`
- Modify: `app/api/copy-admin/rollback/route.ts`
- Modify: `app/api/copy-public/route.ts`

- [ ] **Step 1: Add locale validation in `lib/copy/store.ts`**

Add this helper near the top:

```ts
import {
  COPY_LOCALES,
  DEFAULT_COPY_PAYLOADS,
} from '@/lib/copy/defaults';
import type { CopyLocale } from '@/lib/copy/types';

export function parseCopyLocale(value: unknown): CopyLocale {
  return value === 'en' || value === 'jp' ? value : 'jp';
}
```

- [ ] **Step 2: Parameterize reads and cache tags**

Replace the fixed cache tag and `readCopyRecord` query with locale-aware versions:

```ts
const publishedCopyCacheTag = (locale: CopyLocale) => `artbar-published-${locale}-copy`;

async function readCopyRecord(locale: CopyLocale): Promise<CopyRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(COPY_TABLE)
    .select('locale, draft_payload, published_payload, previous_published_payload, created_at, updated_at, published_at')
    .eq('locale', locale)
    .maybeSingle();

  if (error) {
    console.error('[copy-store] failed to load copy record', error);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    locale,
    draft_payload: normalizeCopyPayload(locale, data.draft_payload),
    published_payload: normalizeCopyPayload(locale, data.published_payload),
    previous_published_payload: data.previous_published_payload
      ? normalizeCopyPayload(locale, data.previous_published_payload)
      : null,
  };
}
```

Replace `readPublishedCopyRecord` with:

```ts
const readPublishedCopyRecord = (locale: CopyLocale) =>
  unstable_cache(
    async () => {
      const record = await readCopyRecord(locale);
      if (!record) {
        throw new Error(`Published ${locale} copy is unavailable.`);
      }
      return record;
    },
    [`artbar-published-${locale}-copy-v1`],
    {
      tags: [publishedCopyCacheTag(locale)],
      revalidate: 60,
    },
  )();
```

- [ ] **Step 3: Replace public store functions**

Update exported functions in `lib/copy/store.ts`:

```ts
export async function getPublishedCopyPayload(
  locale: CopyLocale,
  options?: { timeoutMs?: number },
) {
  const record = options?.timeoutMs
    ? await withTimeout(readPublishedCopyRecord(locale), options.timeoutMs)
    : await readPublishedCopyRecord(locale).catch(() => null);

  return record?.published_payload ?? null;
}

export async function getPublishedJapaneseCopyPayload(options?: { timeoutMs?: number }) {
  return getPublishedCopyPayload('jp', options);
}

export async function getCopyEditorState(): Promise<CopyEditorState> {
  const entries = await Promise.all(
    COPY_LOCALES.map(async (locale) => {
      const record = await readCopyRecord(locale);
      return [
        locale,
        {
          draft: record?.draft_payload ?? DEFAULT_COPY_PAYLOADS[locale],
          published: record?.published_payload ?? DEFAULT_COPY_PAYLOADS[locale],
          previousPublished: record?.previous_published_payload ?? null,
        },
      ] as const;
    }),
  );

  return {
    locales: Object.fromEntries(entries) as CopyEditorState['locales'],
    isConfigured: isCopyBackendConfigured(),
  };
}
```

Update `saveDraftPayload`, `publishDraftPayload`, and `rollbackPublishedPayload` so each accepts `locale: CopyLocale`, uses `DEFAULT_COPY_PAYLOADS[locale]`, and calls `revalidateTag(publishedCopyCacheTag(locale))` after publish/rollback.

- [ ] **Step 4: Update copy-admin API routes**

In each route, parse the selected locale from the request:

```ts
const locale = parseCopyLocale(request.nextUrl.searchParams.get('locale'));
```

For `draft/route.ts`, call:

```ts
const draft = await saveDraftPayload(locale, body.draft);
return NextResponse.json({ locale, draft });
```

For `publish/route.ts`, call:

```ts
return NextResponse.json({ locale, ...(await publishDraftPayload(locale)) });
```

For `rollback/route.ts`, call:

```ts
return NextResponse.json({ locale, ...(await rollbackPublishedPayload(locale)) });
```

- [ ] **Step 5: Update public copy API**

In `app/api/copy-public/route.ts`, replace the Japanese-only payload read with:

```ts
const locale = parseCopyLocale(request.nextUrl.searchParams.get('locale'));
const [publishedPayload, publishedMedia] = await Promise.all([
  getPublishedCopyPayload(locale, { timeoutMs: 4000 }),
  withTimeout(getPublishedMediaMap(), 4000, {}),
]);
const published = publishedPayload ?? DEFAULT_COPY_PAYLOADS[locale];
const currentPath = request.nextUrl.searchParams.get('path');
const mergedContent = mergePublishedLocaleIntoContent(locale, published);
const contentForResponse = locale === 'jp' ? segmentJpDeep(mergedContent) : mergedContent;
const content = trimBlogBodiesForPath(
  mergeMediaIntoContent(contentForResponse, publishedMedia),
  currentPath,
);
const localizedCopy = locale === 'jp'
  ? segmentJpDeep(buildResolvedJapaneseCopy(published))
  : buildResolvedJapaneseCopy(published);
```

Return:

```ts
return NextResponse.json(
  { locale, content, localizedCopy, jpCopy: localizedCopy },
  {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  },
);
```

- [ ] **Step 6: Run checks**

```bash
npm run check:copy-system
npm run typecheck
```

Expected: both pass, or `typecheck` points to `ContentContext`/`CopyAdmin` because their prop shapes have not been updated yet. If so, continue to the next tasks before committing.

- [ ] **Step 7: Commit after typecheck is clean**

```bash
git add lib/copy/store.ts app/api/copy-admin/draft/route.ts app/api/copy-admin/publish/route.ts app/api/copy-admin/rollback/route.ts app/api/copy-public/route.ts
git commit -m "feat: support copy records by locale"
```

---

### Task 5: Fetch Published English Copy on Public Pages

**Files:**
- Modify: `app/layout.tsx`
- Modify: `context/ContentContext.tsx`

- [ ] **Step 1: Update server layout fetch**

In `app/layout.tsx`, replace the Japanese-only fetch block with:

```ts
const [supabasePayload, publishedMedia] = await Promise.all([
  getPublishedCopyPayload(initialLang, { timeoutMs: 4000 }),
  getPublishedMediaMap(),
]);
const publishedPayload = supabasePayload ?? DEFAULT_COPY_PAYLOADS[initialLang];
const mergedContent = mergePublishedLocaleIntoContent(initialLang, publishedPayload);
const contentForLanguage = initialLang === 'jp' ? segmentJpDeep(mergedContent) : mergedContent;
const initialContent = mergeMediaIntoContent(contentForLanguage, publishedMedia);
const requestPathname = headersList.get(ROUTE_PATHNAME_HEADER);
const trimmedInitialContent = trimBlogBodiesForPath(initialContent, requestPathname);
const initialLocalizedCopy =
  initialLang === 'jp'
    ? segmentJpDeep(buildResolvedJapaneseCopy(publishedPayload))
    : buildResolvedJapaneseCopy(publishedPayload);
const initialHasFetchedRuntimeCopy = supabasePayload !== null;
```

Pass `initialLocalizedCopy` and `initialHasFetchedRuntimeCopy` into `ContentProvider`.

- [ ] **Step 2: Update ContentContext props**

In `context/ContentContext.tsx`, change the context type to include a generic `localizedCopy` while preserving the old `jpCopy` name:

```ts
interface ContentContextType {
  lang: Language;
  toggleLang: () => void;
  content: ContentData;
  site: SiteContent;
  localizedCopy: ResolvedJapaneseCopy;
  jpCopy: ResolvedJapaneseCopy;
  media: PublishedMediaMap;
}
```

Change provider props:

```ts
initialLocalizedCopy: ResolvedJapaneseCopy;
initialHasFetchedRuntimeCopy: boolean;
```

Change state:

```ts
const [localizedCopy, setLocalizedCopy] = useState<ResolvedJapaneseCopy>(initialLocalizedCopy);
const [hasFetchedRuntimeCopy, setHasFetchedRuntimeCopy] = useState<boolean>(initialHasFetchedRuntimeCopy);
```

Change the runtime fetch effect condition:

```ts
if (hasFetchedRuntimeCopy) {
  return;
}
```

Change the fetch URL:

```ts
const response = await fetch(
  `/api/copy-public?locale=${encodeURIComponent(lang)}&path=${encodeURIComponent(pathname)}`,
  {
    cache: 'no-store',
    signal: controller.signal,
  },
);
```

Change response handling:

```ts
const data = (await response.json()) as PublishedCopyResponse;
if (!data?.content || !data?.localizedCopy) return;

setContent(data.content);
setLocalizedCopy(data.localizedCopy);
setHasFetchedRuntimeCopy(true);
```

Return both names:

```tsx
<ContentContext.Provider value={{
  lang,
  toggleLang,
  content,
  site,
  localizedCopy,
  jpCopy: localizedCopy,
  media,
}}>
```

- [ ] **Step 3: Reset runtime-fetch state when route language changes**

In the effect that watches `pathname`, set fetch status based on whether the new route language is already represented:

```ts
useEffect(() => {
  const routeLang = routeLocaleToSiteLanguage(routeLocaleFromPathname(pathname));
  setLang(routeLang);
  setHasFetchedRuntimeCopy(routeLang === initialLang && initialHasFetchedRuntimeCopy);
}, [pathname, initialLang, initialHasFetchedRuntimeCopy]);
```

- [ ] **Step 4: Run checks**

```bash
npm run typecheck
npm run check:copy-system
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx context/ContentContext.tsx
git commit -m "feat: load published copy for active language"
```

---

### Task 6: Redesign Copy Admin for English and Japanese

**Files:**
- Modify: `views/CopyAdmin.tsx`
- Modify: `lib/copy/defaults.ts`

- [ ] **Step 1: Add staff-friendly field labels**

In `lib/copy/defaults.ts`, export this object after `COPY_ADMIN_SECTIONS`:

```ts
export const COPY_ADMIN_FIELD_LABELS: Record<string, string> = {
  'site.nav.book': 'Main booking button',
  'site.nav.schedule': 'Schedule link',
  'site.nav.instructors': 'Instructors link',
  'site.nav.teamBuilding': 'Team Building link',
  'site.nav.privateParties': 'Private Parties link',
  'site.nav.locations': 'Locations link',
  'site.nav.contact': 'Contact link',
  'site.nav.blog': 'Journal link',
  'site.footer.tagline': 'Footer tagline',
  'site.home.hero.badge': 'Home hero badge',
  'site.home.hero.title': 'Home hero headline',
  'site.home.hero.titleHighlight': 'Home hero highlighted headline',
  'site.home.hero.subtitle': 'Home hero supporting line',
  'site.home.hero.ctaSchedule': 'Hero button: Schedule',
  'site.home.hero.ctaLineChat': 'Hero button: Line chat',
  'site.home.hero.ctaFindPainting': 'Hero button: Find painting',
  'site.home.concept.title': 'Home concept headline',
  'site.home.concept.p1': 'Home concept paragraph',
  'site.home.themes.title': 'Popular Themes headline',
  'site.home.themes.subtitle': 'Popular Themes intro',
  'site.home.cta.title': 'Bottom CTA headline',
  'site.home.cta.subtitle': 'Bottom CTA text',
  'site.teamBuilding.hero.title': 'Team Building hero headline',
  'site.privateParties.hero.title': 'Private Parties hero headline',
  'site.contactPage.title': 'Contact page headline',
  'site.blogPage.title': 'Journal page headline',
};
```

- [ ] **Step 2: Change CopyAdmin state shape**

In `views/CopyAdmin.tsx`, import `CopyLocale`, `LocalizedCopyPayload`, and `COPY_ADMIN_FIELD_LABELS`. Replace single-language state with:

```ts
const [activeLocale, setActiveLocale] = useState<CopyLocale>('en');
const [drafts, setDrafts] = useState(initialState.locales);
const activeState = drafts[activeLocale];
const draft = activeState.draft;
const savedDraft = activeState.draft;
const published = activeState.published;
const previousLive = activeState.previousPublished;
```

Use an updater:

```ts
const updateActiveLocaleState = (
  updater: (state: LocaleCopyEditorState) => LocaleCopyEditorState,
) => {
  setDrafts((current) => ({
    ...current,
    [activeLocale]: updater(current[activeLocale]),
  }));
};
```

- [ ] **Step 3: Post locale-aware API requests**

Replace `postJson('/api/copy-admin/draft', { draft })` with:

```ts
postJson<{ draft: LocalizedCopyPayload }>(
  `/api/copy-admin/draft?locale=${activeLocale}`,
  { draft },
)
```

Replace publish and rollback URLs similarly:

```ts
`/api/copy-admin/publish?locale=${activeLocale}`
`/api/copy-admin/rollback?locale=${activeLocale}`
```

- [ ] **Step 4: Add language tabs and clearer title**

Replace the sidebar title block with:

```tsx
<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">
  Site Admin
</p>
<h1 className="mt-3 font-heading text-3xl font-bold text-artbar-navy">
  Site Copy Admin
</h1>
<p className="mt-3 text-sm leading-6 text-artbar-gray">
  Choose a language, edit by page, save a draft, then publish when the wording is ready for customers.
</p>
<div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-artbar-bg p-1">
  {(['en', 'jp'] as const).map((locale) => (
    <button
      key={locale}
      type="button"
      onClick={() => setActiveLocale(locale)}
      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
        activeLocale === locale
          ? 'bg-artbar-navy text-white shadow-sm'
          : 'text-artbar-navy hover:bg-white'
      }`}
    >
      {locale === 'en' ? 'English' : 'Japanese'}
    </button>
  ))}
</div>
```

- [ ] **Step 5: Hide technical paths by default**

Add state:

```ts
const [showAdvancedPaths, setShowAdvancedPaths] = useState(false);
```

In each field card, replace label logic with:

```ts
const fieldPath = path.join('.');
const label = COPY_ADMIN_FIELD_LABELS[fieldPath] ?? humanizeKey(path[path.length - 1] || 'Value');
```

Replace always-visible path text with:

```tsx
{showAdvancedPaths ? (
  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-artbar-gray">
    {path.join(' / ')}
  </p>
) : null}
```

Add an advanced toggle near the section title:

```tsx
<button
  type="button"
  onClick={() => setShowAdvancedPaths((current) => !current)}
  className="text-xs font-bold uppercase tracking-[0.18em] text-artbar-taupe"
>
  {showAdvancedPaths ? 'Hide technical paths' : 'Advanced'}
</button>
```

- [ ] **Step 6: Add preview links**

Add helper:

```ts
const previewHref = activeLocale === 'en' ? '/en' : '/';
```

Add a link beside save/publish:

```tsx
<Link
  href={previewHref}
  target="_blank"
  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border-2 border-artbar-navy px-5 py-2.5 font-heading text-sm font-bold tracking-wide text-artbar-navy transition hover:bg-gray-50"
>
  Preview {activeLocale === 'en' ? 'English' : 'Japanese'}
</Link>
```

- [ ] **Step 7: Run checks**

```bash
npm run typecheck
npm run lint
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add views/CopyAdmin.tsx lib/copy/defaults.ts
git commit -m "feat: add language tabs to copy admin"
```

---

### Task 7: Move Visible English Hardcoded Labels Through Copy

**Files:**
- Modify: `views/Home.tsx`
- Modify: `views/Contact.tsx`
- Modify: `views/TeamBuilding.tsx`
- Modify: `views/PrivateParties.tsx`
- Modify: `views/BlogList.tsx`
- Modify: `components/Logo.tsx`

- [ ] **Step 1: Replace hardcoded English UI reads in Home**

In `views/Home.tsx`, replace English hardcoded fallbacks with `localizedCopy.ui.home`:

```ts
const meetRegularsHeading = localizedCopy.ui.home.meetRegularsHeading;
const bookTeamBuildingCta = localizedCopy.ui.home.bookTeamBuildingCta;
const mediaCoverageLabel = localizedCopy.ui.home.mediaCoverageLabel;
const asSeenInHeading = localizedCopy.ui.home.asSeenInHeading;
const heroImageAlt = stripJpSentinel(localizedCopy.ui.home.heroImageAlt);
const conceptImageAlt = stripJpSentinel(localizedCopy.ui.home.conceptImageAlt);
const ctaImageAlt = stripJpSentinel(localizedCopy.ui.home.ctaImageAlt);
const conceptVideoCta = stripJpSentinel(localizedCopy.ui.home.conceptVideoCta);
const previousTestimonialLabel = stripJpSentinel(localizedCopy.ui.home.previousTestimonial);
const nextTestimonialLabel = stripJpSentinel(localizedCopy.ui.home.nextTestimonial);
```

- [ ] **Step 2: Replace hardcoded English UI reads in Contact**

In `views/Contact.tsx`, build labels from `localizedCopy.ui.contact`:

```ts
const copy = localizedCopy.ui.contact;
const subjects = copy.subjectOptions.map((item) => ({
  value: item.value,
  label: stripJpSentinel(item.label),
}));
const labels = {
  subjectLabel: copy.subjectLabel,
  nameLabel: copy.nameLabel,
  namePlaceholder: stripJpSentinel(copy.namePlaceholder),
  emailLabel: copy.emailLabel,
  emailPlaceholder: stripJpSentinel(copy.emailPlaceholder),
  phoneLabel: copy.phoneLabel,
  messageLabel: copy.messageLabel,
  messagePh: stripJpSentinel(copy.messagePlaceholder),
  send: copy.send,
  sent: copy.sent,
  failed: copy.failed,
};
```

- [ ] **Step 3: Replace hardcoded English UI reads in TeamBuilding and PrivateParties**

Use:

```ts
const bookTeamCta = localizedCopy.ui.home.bookTeamBuildingCta;
const maxGuestsLabel = localizedCopy.ui.privateParties.maxGuestsLabel;
const priceSuffix = localizedCopy.ui.privateParties.priceSuffix;
```

For alt text:

```ts
stripJpSentinel(localizedCopy.ui.teamBuilding.heroImageAlt)
stripJpSentinel(localizedCopy.ui.privateParties.heroImageAlt)
```

- [ ] **Step 4: Replace blog coming soon and logo labels**

Use:

```ts
localizedCopy.ui.blogList.comingSoon
localizedCopy.ui.footer.logoAlt
```

- [ ] **Step 5: Run a hardcoded-label scan**

Run:

```bash
rg -n "lang === 'en' \\? '[^']+'" views components app
```

Expected: Remaining matches are route breadcrumbs, legal page language labels, or intentionally non-admin copy. Any remaining marketing/customer-facing labels in Home, Contact, Team Building, Private Parties, Blog, and Logo should be moved into `localizedCopy`.

- [ ] **Step 6: Run checks**

```bash
npm run typecheck
npm run lint
npm run check:copy-system
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add views/Home.tsx views/Contact.tsx views/TeamBuilding.tsx views/PrivateParties.tsx views/BlogList.tsx components/Logo.tsx
git commit -m "feat: use editable copy for visible english labels"
```

---

### Task 8: Update Docs and Verification

**Files:**
- Modify: `README.md`
- Modify: `data-model.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: Update README staff admin guide**

In `README.md`, replace the copy-admin bullets with:

```md
- Go to `/copy-admin` to update English or Japanese site copy.
- Use the language tabs to choose English or Japanese before editing.
- Save Draft keeps changes private.
- Preview opens the public language route in a new tab.
- Publish makes the selected language visible to customers.
- Go to `/copy-admin/images` to manage site images.
```

- [ ] **Step 2: Update data model**

In `data-model.md`, make the copy table description say:

```md
`site_copy_locales` stores one row per editable language. Current locale keys are `en` and `jp`. Each row has `draft_payload`, `published_payload`, `previous_published_payload`, and publish timestamps. Public pages merge the selected language payload over `data/content.ts` defaults.
```

- [ ] **Step 3: Confirm AGENTS describes the new behavior**

Make sure `AGENTS.md` says:

```md
Copy admin at `/copy-admin` manages English and Japanese copy through the Supabase table `site_copy_locales`; each language has separate draft, published, and previous-published state.
```

- [ ] **Step 4: Run full checks**

```bash
npm run check
```

Expected: PASS.

- [ ] **Step 5: Manual admin smoke test**

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/copy-admin
```

Manual checks:

- English tab is visible.
- Japanese tab is visible.
- Switching tabs changes the draft/live content without losing edits.
- Technical paths are hidden until `Advanced` is clicked.
- `Preview English` opens `/en`.
- `Preview Japanese` opens `/`.
- `Publish to Website` text names the selected language.

- [ ] **Step 6: Commit**

```bash
git add README.md data-model.md AGENTS.md
git commit -m "docs: document bilingual copy admin"
```

---

## Self-Review

**Spec coverage:** The plan covers English wording editing, a staff-friendly display, separate language publish states, backend store changes, public page loading, hardcoded English label migration, and docs.

**Placeholder scan:** No `TBD`, `TODO`, or unspecified "handle edge cases" steps remain. Every task names concrete files, commands, and expected outcomes.

**Type consistency:** The plan consistently uses `CopyLocale`, `LocalizedCopyPayload`, `DEFAULT_COPY_PAYLOADS`, `normalizeCopyPayload`, and `mergePublishedLocaleIntoContent` after defining them. Existing `JapaneseCopyPayload` remains as a compatibility alias during migration.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-18-english-copy-admin.md`. Two execution options:

**1. Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
