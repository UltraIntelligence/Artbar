# Artbar Tokyo content recovery

The September 27, 2026 transition captured the production Supabase project `rlwgkgbtbvwdjlbiksem` before replacing runtime copy and media reads. The private backup contains:

- Both `site_copy_locales` rows, including draft, published, and previous published payloads and timestamps.
- All 30 `site_media_overrides` rows, including draft and previous asset records.
- All 122 objects in the public `artbar-site-media` bucket, with size and SHA-256 checksums.

Keep that private archive separate from Git. The repository contains only the published payloads, 28 currently published replacement images, and `data/published-source-manifest.json` with source hashes and timestamps.

Before releasing this branch, compare the live database row timestamps and published payload/media hashes with `data/published-source-manifest.json`. If editors changed content after the snapshot, refresh the export and local files before deployment.

To restore the previous site quickly, redeploy the last production commit before this change, while the Supabase project is running. That commit still reads the database. If the project has later been paused, resume it first and verify both languages and image URLs. The private archive is the recovery source if Supabase data or objects are unavailable; import it only in a separately approved recovery operation, preserving the original rows and assets.

Do not pause or delete the Supabase project until this static version is deployed and both languages, media, forms, booking links, and browser network requests have been checked on the live site. Pausing is reversible; deleting the project is a separate permanent decision.
