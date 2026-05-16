# Artbar Tokyo

Bilingual Next.js marketing site for Artbar Tokyo, including Japanese-first public pages, English `/en` routes, SEO guide pages, local studio pages, a copy-admin workflow, and the Paint Your Pet sketch helper.

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with the needed server-side keys:

   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   RESEND_API_KEY=your_resend_api_key_here
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   COPY_ADMIN_PASSWORD=your_shared_copy_admin_password
   COPY_ADMIN_SESSION_SECRET=long_random_secret_for_cookie_signing
   ```

3. Start development:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Useful Checks

```bash
npm run build
npm run lint
npm run check:seo
npm run check:security
npm run check:performance
npm run check:docs
```

## Notes

- Public content is mostly static in `data/content.ts`.
- Japanese runtime copy can be published through `/copy-admin`.
- The Paint Your Pet sketch route uses `GEMINI_API_KEY` server-side only.
- Production deployment is Vercel-backed.
