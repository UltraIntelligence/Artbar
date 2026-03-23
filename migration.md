# Artbar Tokyo: WordPress to React Migration Guide

**Critical Warning:** Migrating a 9-year-old domain from a Server-Side CMS (WordPress) to a Client-Side Single Page Application (React) carries high SEO risk. If Google bots cannot find your old pages, or if they encounter "Soft 404s", your traffic will drop.

Follow this guide strictly to maintain your search engine standing.

---

## Phase 1: Preparation (Before You Switch)

### 1. Crawl Your Existing Site
Do not guess your URLs. You need a list of **every single URL** currently indexed by Google.
*   **Tools:** Screaming Frog SEO Spider (Free up to 500 pages), or export your Sitemap from WordPress (usually at `yourdomain.com/sitemap_index.xml`).
*   **Action:** Create a spreadsheet with two columns: `Old URL` and `New URL`.

### 2. The 301 Redirect Map (The Holy Grail)
You **cannot** handle migration redirects inside React (e.g., using `react-router` to redirect). By the time React loads, the browser has already received a `200 OK` status for the wrong page, which confuses Google.

**Redirects must happen at the Server/CDN level (Vercel, Netlify, AWS).**

#### Mapping Strategy:
| Content Type | Old WordPress URL Pattern | New React URL Pattern | Notes |
| :--- | :--- | :--- | :--- |
| **Home** | `/` | `/` | |
| **Schedule** | `/events/`, `/calendar/` | `/#schedule` | Anchor link on home |
| **Blog Posts** | `/2023/10/my-post/` | `/blog/my-post` | *Critical: Keep slugs identical if possible* |
| **Categories** | `/category/news/` | `/blog` | Redirect categories to the main blog list |
| **Pages** | `/contact-us/` | `/contact` | |
| **Team** | `/about/instructors/` | `/instructors` | |

### 3. Asset & Image Migration
*   **Risk:** Your WordPress blog posts likely contain images like `<img src="/wp-content/uploads/2019/10/image.jpg" />`.
*   **Solution:**
    1.  Download your `wp-content/uploads` folder.
    2.  Upload these to a storage bucket (S3, Cloudinary) OR put them in the React `public/assets` folder (only if < 100MB total).
    3.  Find/Replace database content in your JSON data to point to the new image paths.

---

## Phase 2: Technical Configuration (The Code)

We have already installed `react-helmet-async` and a `SEO.tsx` component. Ensure the following are dynamic:

1.  **Title Tags:** Must be unique per page.
    *   *Old:* "Artbar Tokyo | Paint & Sip"
    *   *New:* "Artbar Tokyo | Paint & Sip Studio" (Keep keywords consistent).
2.  **Meta Descriptions:** Copy your high-performing descriptions from WordPress (Yoast SEO data) into the React `content.ts` or `SEO.tsx` config.
3.  **Canonical URLs:**
    *   The `SEO.tsx` component automatically generates self-referencing canonicals.
    *   Example: `<link rel="canonical" href="https://artbar.co.jp/blog/my-post" />`
    *   This tells Google "This is the master copy of the page."

---

## Phase 3: Hosting Configuration (Vercel Example)

Assuming you host on Vercel (recommended for React), you configure redirects in `vercel.json` in the root directory.

**Create `vercel.json`:**

```json
{
  "cleanUrls": true,
  "redirects": [
    { 
      "source": "/2023/10/:slug", 
      "destination": "/blog/:slug", 
      "permanent": true 
    },
    { 
      "source": "/contact-us", 
      "destination": "/contact", 
      "permanent": true 
    },
    { 
      "source": "/events", 
      "destination": "/", 
      "permanent": true 
    }
    // Add specific high-traffic pages individually here
  ]
}
```

*   **Permanent: true** sends a **301 Status Code**. This tells Google "Pass all the SEO juice/ranking power from the old URL to the new URL."

---

## Phase 4: The Sitemap (`sitemap.xml`)

React apps do not generate sitemaps automatically like WordPress. You must generate one so Google knows what pages exist.

**Option A: Static Generation (Manual)**
For a small site, create a file `public/sitemap.xml`:
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://artbar.co.jp/</loc>
      <lastmod>2024-03-20</lastmod>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://artbar.co.jp/blog/why-art-is-therapy</loc>
      <lastmod>2024-03-15</lastmod>
   </url>
   <!-- Add all locations, instructors, and blog posts -->
</urlset>
```

**Option B: Script Generation (Recommended)**
Create a post-build script that reads your `content.ts` and generates this XML file during deployment.

---

## Phase 5: Post-Launch Checklist (The First 48 Hours)

1.  **Google Search Console (GSC):**
    *   Verify the new React site in GSC.
    *   **Submit the new `sitemap.xml`** immediately.
    *   Use the "URL Inspection Tool" on your Homepage and one Blog Post. Click "Request Indexing" to force Google to re-crawl.

2.  **Monitor 404s:**
    *   Watch GSC for "Page Not Found" errors.
    *   If you see a spike in 404s, your `vercel.json` (or server config) redirects are missing entries. Add them immediately.

3.  **Check Structured Data:**
    *   Go to [Rich Results Test](https://search.google.com/test/rich-results).
    *   Test a Blog Post URL. It should detect "Article".
    *   Test a Location URL. It should detect "LocalBusiness".

4.  **Analytics:**
    *   Ensure GA4 (Google Analytics 4) is firing on route changes.
    *   *Note:* In React (SPA), default GA4 often misses pageviews when navigating between pages because the browser doesn't do a full reload. Ensure your Analytics implementation listens to the Router.

## Summary

1.  **301 Redirects** are the most important technical requirement.
2.  **Dynamic Metadata** (Helmet) allows Google to read the React pages.
3.  **Structured Data** (JSON-LD) helps AI and Bots understand the content.
4.  **Sitemap** guides the bots to the new structure.

If you follow this map, you will retain your domain authority and potentially improve rankings due to the faster speed and better user experience (UX) of the new site.
