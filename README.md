# Artbar Tokyo

Bilingual Next.js marketing site for Artbar Tokyo, including Japanese-first public pages, English `/en` routes, SEO guide pages, local studio pages, a copy-admin workflow, and the Paint Your Pet sketch helper.

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

# Copy admin publishing
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
COPY_ADMIN_PASSWORD=your_shared_copy_admin_password
COPY_ADMIN_SESSION_SECRET=long_random_secret_for_cookie_signing
```

## Staff Admin Guide

- Go to `/copy-admin` to update Japanese site copy.
- Go to `/copy-admin/images` to manage site images.
- Use preview/review screens before publishing changes.
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
npm run check:media-slots
```

## Notes

- Public content is mostly static in `data/content.ts`.
- Japanese runtime copy can be published through `/copy-admin`.
- The Paint Your Pet sketch route uses `GEMINI_API_KEY` server-side only.
- Production deployment is Vercel-backed.
