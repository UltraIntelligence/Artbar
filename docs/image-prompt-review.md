# Artbar website — image review sheet

**What this is:** A simple checklist of **pages** on the site and **photos or graphics** that appear there. For each one we explain **what the picture should feel like** and **why it’s there**. The line **“Your prompt adjustment”** is for **you** to write notes or extra instructions when you generate or commission images (for example: “warmer light,” “more people,” “no wine glasses”).

**How to use it:** Go page by page. Read the suggestion. If you agree, you can leave the adjustment line empty or write “OK.” If you want something different, write your change on the next line.

**Note:** Some things are **not** custom photos (for example: **videos**, **company logos** from Wikipedia, the **LINE app icon**, or **Google Maps**). Those are listed at the bottom so you don’t wonder where they went.

---

## Site-wide (every page)

### Navbar & footer — Artbar logo

- **What should be shown:** The official Artbar logo (dark or light version depending on background).
- **Why:** So visitors instantly recognize the brand on every screen.
- **Your prompt adjustment:**


*(These usually stay as your existing logo files from the website, not AI-generated.)*

---

## Home `/`

### 1. Hero background (large photo behind the title)

- **What should be shown:** A wide, welcoming shot of your paint-and-sip world—studio energy, people enjoying painting, warm light. Should feel **premium and social**, not empty stock office.
- **Why:** This is the first thing people see; it sets the mood for the whole business.
- **Your prompt adjustment:**


*(In data: `images.hero.home` — default file under `/public/media`.)*

### 2. Concept / lifestyle block — main image

- **What should be shown:** The “main” lifestyle image next to or above your story (relax, sip, create). Could be the studio interior, guests at easels, drinks on the table—**inviting and on-brand**.
- **Why:** Explains what Artbar *feels* like beyond the headline.
- **Your prompt adjustment:**


### 3. Concept / lifestyle block — detail image (smaller or overlapping)

- **What should be shown:** A **closer** moment—hands painting, brush on canvas, color detail—pairs with the main image without repeating the exact same shot.
- **Why:** Adds texture and “real workshop” feeling.
- **Your prompt adjustment:**


### 4. Concept area — video (if enabled)

- **What should be shown:** *(Not a still image.)* Short loop of studio vibe / painting / social energy.
- **Why:** Motion grabs attention and shows the experience.
- **Your prompt adjustment:**


*(Usually `.mp4` files in `/public/media` — not generated in the same step as stills.)*

### 5. “Popular themes” — 12 theme thumbnails

Each card needs a small **square-ish** image that matches the theme name (Japan, pour painting, pet portrait, Van Gogh, kids, etc.).

| # | Theme name (English) | What should be shown | Why |
|---|----------------------|----------------------|-----|
| 1 | Japan Inspired | Japanese motifs: sakura, Fuji, seasonal Japan mood | Matches class offering |
| 2 | Paint Pouring | Fluid pour art, cells, flowing color | Shows technique |
| 3 | Paint Your Pet | Pet portrait on canvas / cute animal art | Highlights popular class |
| 4 | Alcohol Ink | Soft flowing ink abstract | Style sample |
| 5 | Van Gogh | Starry night / sunflower **style** (not copying a single famous work) | Classic master theme |
| 6 | Monet | Soft gardens, impressionist light | Classic master theme |
| 7 | Picasso | Bold, geometric / cubist **inspired** look | Classic master theme |
| 8 | Renoir | Soft portraits / romantic light | Classic master theme |
| 9 | Matisse | Bright shapes, expressive color | Classic master theme |
| 10 | Kids! | Fun, bright, kid-friendly painting | Family offering |
| 11 | Texture Painting | Thick paint, palette knife texture | Technique sample |
| 12 | Paint Your Idol | Pop-inspired portrait energy (avoid real celebrity faces if using AI) | Fun add-on class |

- **Your prompt adjustment (all themes or note per theme):**


### 6. “The Artbar experience” — 3 feature images

- **All-inclusive (supplies):** Materials laid out—canvas, brushes, apron—**“everything included.”**
- **Free-flow drinks:** Wine / tea / snacks mood—**social and relaxed**, not a bar ad.
- **Bilingual instruction:** Instructor with guests, **welcoming to Japanese and English speakers.**

- **Why:** Answers “what do I get?” in one glance per block.
- **Your prompt adjustment:**


### 7. Team-building strip — company logos

- **What should be shown:** *(Usually not AI.)* Recognizable **client / partner logos** (often loaded from Wikipedia or brand assets).
- **Why:** Social proof for corporate customers.
- **Your prompt adjustment:**


### 8. Press / media carousel — article image + outlet logo

- **What should be shown:** For each press item: a **cover-style image** and often a **small logo** of the magazine or TV channel.
- **Why:** Shows credibility (“as seen in…”).
- **Your prompt adjustment:**


*(Many of these still point at your old WordPress media URLs. You can later replace with static files in `/public`.)*

### 9. Bottom CTA banner (wide strip)

- **What should be shown:** A **very wide** calm background—studio blur, canvases, warm lights—with **room for text** (text is added in the site, not inside the photo).
- **Why:** Last push to book or contact without feeling cluttered.
- **Your prompt adjustment:**


### 10. Decorative-only placeholders (fake avatars, etc.)

- **What:** Some small circles use **random placeholder faces** from the internet for demo layout.
- **Why:** Filler until you plug in real guest photos or testimonials.
- **Your prompt adjustment:**


*(Optional to replace later—not part of the main `/media/generated` batch unless you want.)*

---

## Team building `/team-building`

### 1. Hero image (full width under the headline)

- **What should be shown:** **Corporate-friendly** energy: teams at easels, collaborative painting, professional but warm—**not** a party-night vibe.
- **Why:** This page sells to companies; the photo should match “offsite / workshop.”
- **Your prompt adjustment:**


### 2. “Trusted by” logo row

- **What:** Same idea as home—**company logos** (often external SVG/PNG links).
- **Why:** Trust for B2B buyers.
- **Your prompt adjustment:**


### 3. Testimonial section photos (if shown)

- **What:** Some layouts use **placeholder** stock-style images for testimonials.
- **Why:** Visual rhythm; can be swapped for real event photos later.
- **Your prompt adjustment:**


---

## Private parties `/private-parties`

### Four “occasion” cards (Birthday, Bachelorette, Kids, Anniversary)

- **What should be shown (one image each):**
  - **Birthday:** Cake, celebration, friends, painting—**joyful group**.
  - **Bachelorette:** Friends night out energy in the studio—**fun, stylish, safe for work**.
  - **Kids:** Bright, kid-scale easels or simple designs—**family-friendly**.
  - **Anniversary / couples:** Two people painting together—**warm, romantic but tasteful**.

- **Why:** Helps visitors imagine *their* event type.
- **Your prompt adjustment:**


---

## Locations `/locations`

### One image per studio (several cities)

- **What should be shown:** Each location gets a **hero-style photo** suggesting that area—Tokyo chic, Yokohama bay mood, Osaka energy, Okinawa warmth, etc. Doesn’t need to be the exact storefront if you don’t have a photo yet; it should **feel** like the right city and **upscale creative space**.
- **Why:** People choose a venue emotionally before they read the address.
- **Your prompt adjustment (one note for all, or per city):**


---

## Instructors `/instructors`

### For each instructor — two images

1. **Profile (headshot)**  
   - **What:** Friendly, professional portrait—**the person guests will meet**.  
   - **Why:** Builds trust and connection.

2. **Artwork sample**  
   - **What:** A piece in their style (abstract, ink, pottery, kids’ art, etc.)—shows **their creative flavor**.  
   - **Why:** Proves they’re working artists, not generic stock.

- **Your prompt adjustment (names: Cathy, Naomi, Luci, Momo, Nanako, Aika, Kiyoe, Michi, Ken):**


*(Best long-term: **real photos** of your team. AI can fill in until you have a shoot.)*

---

## Blog — list `/blog`

### Card image per post

- **What should be shown:** For each post, a **cover image** that matches the title (e.g. Yokohama walk → waterfront / city mood).
- **Why:** Gets clicks and makes the journal feel real.
- **Your prompt adjustment:**


---

## Blog — article `/blog/[slug]` (example: Yokohama walk)

### 1. Hero image at top of article

- **Same as the card image** for that post—big and cinematic.
- **Why:** Immersion and share previews.
- **Your prompt adjustment:**


### 2. Inline image inside the article body

- **What should be shown:** Extra scene that fits the paragraph (e.g. street, landmark)—**supports the story**, not random decoration.
- **Why:** Breaks up text and illustrates the trip or topic.
- **Your prompt adjustment:**


---

## Press `/press`

### Each media feature — main image + optional logo

- **What:** Magazine cover style shot, TV still, or article mockup mood + **outlet logo** when you have it.
- **Why:** Proof of coverage.
- **Your prompt adjustment:**


*(Often still linked to old WordPress URLs; you can migrate to `/public` over time.)*

---

## Theme detail `/themes/[slug]`

### Hero and example images

- **What:** Large hero and smaller “example” images for the selected theme. **Right now** some of these use **placeholder generators** until you attach real assets per theme.
- **Why:** Sells a specific class type.
- **Your prompt adjustment:**


---

## Paint your pet `/paint-your-pet`

### Demo “before / after” placeholders

- **What:** Simple placeholders for “original photo” vs “canvas sketch”—often **not** final art yet.
- **Why:** Explains the flow; the **real** magic is your in-studio sketch + optional AI tool elsewhere.
- **Your prompt adjustment:**


---

## Contact `/contact`

- **Photos:** None required for the main layout (text and form only).
- **Your prompt adjustment:** N/A

---

## Things that usually stay “as-is” (not AI prompts)

| Item | What it is |
|------|------------|
| **Videos** | `.mp4` files (home lifestyle block) |
| **LINE icon** | Official green app mark (`/public/media/...`) |
| **Brand logos in “trusted by”** | Wikipedia / company SVGs—legal/trademark sensitive |
| **Google Maps** | Embedded map on Locations—not an image file |
| **Some testimonial avatars** | Random placeholders until you add real faces |

---

## After you fill in “Your prompt adjustment”

1. You can paste your notes into `scripts/image-manifest.ts` (each slot has a **prompt** string), or tell whoever runs generation what to change.
2. Run **`npm run generate:images`** when ready (see project README / scripts). That fills **`/public/media/generated/`** with files the site already points at.

---

*This file is for **you**—edit freely. It does not change the live site by itself.*
