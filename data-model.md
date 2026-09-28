# Data model (Artbar Tokyo)

Artbar Tokyo is a bilingual marketing site. `/` serves Japanese and `/en` serves English. Booking links and embedded schedules use `booking.artbar.co.jp` and older `painta.co` URLs; they are separate customer systems.

## Public content

`data/content.ts` defines the `ContentData` structure and default shared objects. The current published language payloads are checked in as `data/published-copy/en.json` and `data/published-copy/jp.json`. `lib/copy/published.ts` normalizes those payloads, and `lib/copy/resolve.ts` merges the active language over `data/content.ts`. The root layout provides that result to `ContentProvider`. `/api/copy-public` serves the same checked-in content when a client changes language without a full page load. `/api/blog-post/[slug]` also reads checked-in copy.

Current published image replacements live under `public/media/published/`. `data/published-media.json` maps media slots to those local URLs. `lib/media/resolve.ts` applies them over the built-in images. `data/published-source-manifest.json` records the source row timestamps, payload hashes, asset paths, sizes, and hashes captured during the transition.

Theme landing page structure, SEO metadata, sitemap entries, and redirects remain code-managed. Contact form email and Paint Your Pet sketch generation still use their separate server-side services.

## Editing and recovery

Change customer-facing wording in both published language files as needed, keep the structural baseline in `data/content.ts` aligned when adding or removing fields, and review both language routes. Replace image files locally and update `data/published-media.json` for the relevant slot. Run `npm run check:published-content` and the full `npm run check` before review.

The private transition backup includes both locale rows with draft, published, and previous published payloads; all media override rows with their history; and every object in the old `artbar-site-media` bucket. Its location and restore steps are in `docs/content-recovery.md`. The private backup must never be committed.
