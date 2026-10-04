# Data model (Artbar Tokyo)

Artbar Tokyo is a bilingual marketing site. `/` serves Japanese and `/en` serves English. Booking links and embedded schedules use `booking.artbar.co.jp` and older `painta.co` URLs; they are separate customer systems.

## Public content

`data/content.ts` defines the `ContentData` structure and default shared objects. The current published language payloads are checked in as `data/published-copy/en.json` and `data/published-copy/jp.json`. `lib/copy/published.ts` normalizes those payloads, and `lib/copy/resolve.ts` merges the active language over `data/content.ts`. The root layout provides that result to `ContentProvider`. `/api/copy-public` serves the same checked-in content when a client changes language without a full page load. `/api/blog-post/[slug]` also reads checked-in copy.

Current published image replacements live under `public/media/published/`. `data/published-media.json` maps media slots to those local URLs. `lib/media/resolve.ts` applies them over the built-in images. `data/published-source-manifest.json` records the source row timestamps, payload hashes, asset paths, sizes, and hashes captured during the transition.

Theme landing page structure, SEO metadata, sitemap entries, and redirects remain code-managed. Contact form email and Paint Your Pet sketch generation still use their separate server-side services.

## Booking acquisition

`components/PaintaAcquisitionBridge.tsx` and `lib/painta-acquisition.ts` retain
the most recent tagged or external-referral visit in browser localStorage
(`artbar.painta.acquisition.v1`) for 30 days. The record holds five UTM fields,
the original capture time and external referrer origin; it contains no customer
or GA4 identifiers. Direct/internal navigation preserves the existing record.
Restricted storage falls back to memory for the current document.

Links, iframe URLs and code-driven booking buttons pass that evidence only to
`https://booking.artbar.co.jp`, preserving locale, filters and destination paths.
Internal theme/location/home tags are removed. Unknown origins remain unknown.
Painta must support `painta_acquisition_at` and `painta_acquisition_referrer`
before this producer is deployed. Run `npm run test:acquisition` and verify a
tagged landing through both language routes, an embed and a booking button.
This does not backfill historical sources or prove a GA4/Google Ads receipt.

## Editing and recovery

Change customer-facing wording in both published language files as needed, keep the structural baseline in `data/content.ts` aligned when adding or removing fields, and review both language routes. Replace image files locally and update `data/published-media.json` for the relevant slot. Run `npm run check:published-content` and the full `npm run check` before review.

The private transition backup includes both locale rows with draft, published, and previous published payloads; all media override rows with their history; and every object in the old `artbar-site-media` bucket. Its location and restore steps are in `docs/content-recovery.md`. The private backup must never be committed.
