# Artbar Tokyo

Bilingual Next.js marketing site for Artbar Tokyo, including Japanese-first public pages, English `/en` routes, SEO guide pages, local studio pages, and the Paint Your Pet sketch helper. Site content is managed in code.

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`.

For the public site, no local keys are required. Add `.env.local` only when testing server-side features:

```bash
# Paint Your Pet sketch generation
GEMINI_API_KEY=your_gemini_api_key_here

# Contact form email sending
RESEND_API_KEY=your_resend_api_key_here

```

## Updating Site Content

- Edit `data/published-copy/en.json` and `data/published-copy/jp.json` for current published wording. Their source snapshot is recorded in `data/published-source-manifest.json`.
- Replace current image files under `public/media/published/` and update `data/published-media.json` with the relevant slot URL. Keep the source manifest in sync when changing these files.
- `data/content.ts` remains the structural baseline for routes, metadata, and fallback shapes. Published language payloads take precedence on customer-facing pages.
- The original Supabase records, drafts, previous versions, and all bucket objects are held in a private backup outside this repository. See `docs/content-recovery.md`.
- Do not run image generation unless you mean to create new AI images. Use `npm run generate:images:dry` first to preview what would be changed.

## Useful Checks

```bash
npm run check
```

Or run checks one by one:

```bash
npm run build
npm run lint
npm run typecheck
npm run check:seo
npm run check:security
npm run check:performance
npm run check:docs
npm run check:published-content
```

## Notes

- Public wording comes from the checked-in published language payloads. Current image replacements are local files.
- The Paint Your Pet sketch route uses `GEMINI_API_KEY` server-side only.
- Production deployment is Vercel-backed.
