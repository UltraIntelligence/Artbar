/**
 * Gemini image generation manifest. Paths must match data/generated-image-paths.ts.
 * Set `enabled: false` to skip a slot. Add optional `referencePaths` (repo-relative files).
 *
 * Review workflow: set `needsRevision: true` and short `reviewNotes` when feedback is pending;
 * update `prompt` when you have final copy, then regenerate (see `npm run generate:images` with `--needs-revision`).
 *
 * Prompts for hero/themes/features/CTA/private/blog/testimonials: client-supplied (Claude batch).
 * Instructor + location slots: disabled — replace with client-provided photos in /public and GI paths when ready.
 */
import { GI, INSTRUCTOR_IDS } from '../data/generated-image-paths';

export type ManifestItem = {
  id: string;
  /** URL path served by Next (e.g. /media/generated/foo.jpg) */
  publicUrl: string;
  prompt: string;
  enabled: boolean;
  /** True when this slot is flagged for a prompt/image redo (see review workflow in file header). */
  needsRevision?: boolean;
  /** Short feedback to remember before the prompt is rewritten (optional). */
  reviewNotes?: string;
  /** Optional reference images (paths relative to repo root) */
  referencePaths?: string[];
};

function item(partial: Omit<ManifestItem, 'enabled'> & { enabled?: boolean }): ManifestItem {
  return { enabled: true, needsRevision: false, ...partial };
}

export const IMAGE_MANIFEST: { items: ManifestItem[] } = {
  items: [
    item({
      id: 'hero-team-building',
      publicUrl: GI.heroTeamBuilding,
      prompt:
        'Wide 16:9 cinematic editorial photo. Corporate team of 10 adults at wooden tripod easels in a bright Tokyo paint studio. Mixed group — Japanese men and women aged 25–40 in smart casual attire, two Western colleagues. Black aprons, paint-splattered tables, colorful canvases on white wall shelves behind. Warm overhead string fairy lights, large windows, collaborative and engaged atmosphere. Polished Vogue Japan editorial quality, rich warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'team-building-paint-sip',
      publicUrl: GI.teamBuildingActivities.paintSip,
      prompt:
        'Vertical 3:4 editorial photo. Large international corporate office in Tokyo — bright open plan with glass walls and floor-to-ceiling windows. One breakout area set up as a team event: mixed Japanese and Western colleagues in business casual with black painting aprons, each at their own easel and canvas, instructor-style step-by-step guidance; nearby credenza with wine glasses and carafes. Premium B2B team-building mood, warm lighting, Vogue Japan editorial quality. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'team-building-collaborative-mural',
      publicUrl: GI.teamBuildingActivities.collaborativeMural,
      prompt:
        'Vertical 3:4 editorial photo. Same tier of modern Tokyo corporate HQ: colleagues in black aprons stand at multiple easels along a long wall, aligning separate painted canvases that slot together into one giant collaborative mural, coordinating and gesturing. International Japanese office team, engaged and unified. Neutral executive interior, soft daylight, editorial photography. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'team-building-action-painting',
      publicUrl: GI.teamBuildingActivities.actionPainting,
      prompt:
        'Vertical 3:4 editorial photo. Corporate event space inside a large Tokyo office: floors and walls protected with drop cloths; diverse Japanese and international professionals in black aprons doing high-energy Jackson Pollock-style splatter and drip painting on wide floor canvases, motion and flying paint. Daylight from tall windows, bold but professional editorial mood. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'concept-main',
      publicUrl: GI.conceptMain,
      prompt:
        'Wide 16:9 editorial lifestyle photo. Interior of a modern Tokyo paint-and-sip studio, three Japanese women aged 20s seated at wooden tripod easels with wine glasses on the table. Soft warm string fairy lights overhead, black aprons, colorful finished canvases displayed on white shelves. Relaxed, social, premium atmosphere. TimeOut Tokyo editorial quality, warm rich tones, shallow depth of field. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'concept-detail',
      publicUrl: GI.conceptDetail,
      prompt:
        'Square 1:1 editorial close-up. Two Japanese women aged early 20s laughing together at a paint-splattered wooden studio table, paintbrushes in hand, black aprons, wine glass visible in foreground. Warm bokeh string lights overhead, wooden easel with canvas in background. Candid joyful moment, Vogue Japan editorial quality, warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'feature-all-inclusive',
      publicUrl: GI.featureAllInclusive,
      prompt:
        'Square 1:1 editorial flat lay. Art supplies neatly arranged on a paint-splattered wooden studio table — stretched canvas, assorted paintbrushes, acrylic paint palette, folded black apron, red plastic paint cups. Warm overhead studio lighting, no people. Clean and premium, TimeOut Tokyo editorial style. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'feature-free-flow-drinks',
      publicUrl: GI.featureFreeFlowDrinks,
      prompt:
        'Square 1:1 editorial close-up. Two wine glasses, a sparkling water, and small plates of light snacks on a paint-splattered wooden studio table. Wooden tripod easels and canvases softly blurred in background, warm bokeh string fairy lights overhead. Relaxed and social Tokyo studio atmosphere, rich warm tones, shallow depth of field. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'feature-bilingual',
      publicUrl: GI.featureBilingual,
      prompt:
        'Wide 16:9 editorial photo. Female Japanese art instructor aged late 20s in black apron gesturing at a canvas on a wooden tripod easel, explaining technique to a small group — one Japanese woman, one Western woman with brown hair, both smiling and engaged. Warm string fairy lights, colorful canvases on white shelves in background. Welcoming bilingual workshop energy, Vogue Japan editorial quality. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'cta-banner',
      publicUrl: GI.ctaBanner,
      prompt:
        'Ultra-wide 21:9 panoramic editorial photo. Empty Tokyo paint-and-sip studio interior, wooden tripod easels set up with blank canvases, paint-splattered tables, red paint cups, colorful finished artworks on white wall shelves. Soft warm bokeh string fairy lights, large windows with soft daylight. Calm premium atmosphere, generous empty center space for text overlay, muted warm tones, no people. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    // Themes (order matches POPULAR_THEMES in constants.ts)
    item({
      id: 'theme-japan-inspired',
      publicUrl: GI.themes.japanInspired,
      prompt:
        'Square 1:1 editorial close-up of a finished acrylic painting on canvas resting on a wooden easel. Mount Fuji with cherry blossoms in soft pink and blue tones, impressionist brushwork, Japanese art mood. Warm studio lighting, slightly blurred studio background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-paint-pouring',
      publicUrl: GI.themes.paintPouring,
      prompt:
        'Square 1:1 overhead editorial close-up of a finished fluid acrylic pour painting on canvas. Vivid flowing cells of deep blue, gold, and white, abstract organic texture, high detail. Warm studio surface beneath, no people. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-paint-your-pet',
      publicUrl: GI.themes.paintYourPet,
      prompt:
        'Square 1:1 editorial close-up of a finished oil-style portrait painting of a Shiba Inu on canvas, resting on a wooden easel. Warm painterly background, soft expressive brushwork. Warm Tokyo studio lighting behind. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-alcohol-ink',
      publicUrl: GI.themes.alcoholInk,
      prompt:
        'Square 1:1 editorial close-up of finished alcohol ink artwork on white paper. Soft flowing teal, coral, and gold tones, organic marble-like texture, delicate ink blooms. Clean studio surface, warm light. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-van-gogh',
      publicUrl: GI.themes.vanGogh,
      prompt:
        'Square 1:1 editorial close-up of a finished canvas painting on a wooden easel. Swirling night sky in deep blue and gold, bold expressive post-impressionist brushstrokes, Van Gogh inspired mood. Not copying a specific painting. Warm studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-monet',
      publicUrl: GI.themes.monet,
      prompt:
        'Square 1:1 editorial close-up of a finished impressionist canvas painting on a wooden easel. Soft water lily garden scene, dappled light, loose pastel greens and pinks, painterly Monet-inspired mood. Warm studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-picasso',
      publicUrl: GI.themes.picasso,
      prompt:
        'Square 1:1 editorial close-up of a finished canvas painting on a wooden easel. Bold geometric abstract portrait in cubist style, primary colors, flat angular shapes, expressive and graphic. Warm studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-renoir',
      publicUrl: GI.themes.renoir,
      prompt:
        'Square 1:1 editorial close-up of a finished impressionist canvas painting on a wooden easel. Soft romantic portrait of a woman in warm golden light, blush and cream tones, loose Renoir-inspired brushwork. Warm studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-matisse',
      publicUrl: GI.themes.matisse,
      prompt:
        'Square 1:1 editorial close-up of a finished canvas painting on a wooden easel. Bright expressive flat color shapes, bold outlines, flowers and figures in a joyful vivid palette, Matisse-inspired. Warm studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-kids',
      publicUrl: GI.themes.kids,
      prompt:
        "Square 1:1 editorial close-up of a finished children's acrylic canvas painting on a small easel. Bright colorful animals and rainbows, thick simple brushwork, cheerful and playful. Clean bright studio lighting, no people. No overlaid text, no watermarks, no brand logos in frame.",
    }),
    item({
      id: 'theme-texture-painting',
      publicUrl: GI.themes.texturePainting,
      prompt:
        'Square 1:1 editorial close-up of a finished impasto texture painting on canvas. Thick layered palette knife strokes, rich earth tones and gold, highly dimensional tactile surface. Warm studio lighting, no people. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'theme-paint-your-idol',
      publicUrl: GI.themes.paintYourIdol,
      prompt:
        'Square 1:1 editorial close-up of a finished pop-art inspired portrait painting on canvas on a wooden easel. Bold graphic stylized face, vibrant flat colors, no real celebrity likeness. Warm Tokyo studio bokeh background. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    // Instructors — client-provided photos; generation disabled (ids from INSTRUCTOR_IDS)
    ...INSTRUCTOR_IDS.flatMap((id) => [
      item({
        id: `instructor-${id}-profile`,
        publicUrl: GI.instructors[id].profile,
        prompt: 'Client-provided image — generation disabled.',
        enabled: false,
      }),
      item({
        id: `instructor-${id}-artwork`,
        publicUrl: GI.instructors[id].artwork,
        prompt: 'Client-provided image — generation disabled.',
        enabled: false,
      }),
    ]),
    // Locations — client-provided photos; generation disabled
    item({
      id: 'loc-daikanyama',
      publicUrl: GI.locations.daikanyama,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-harajuku',
      publicUrl: GI.locations.harajuku,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-ginza',
      publicUrl: GI.locations.ginza,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-yokohama',
      publicUrl: GI.locations.yokohama,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-osaka-namba',
      publicUrl: GI.locations.osaka_namba,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-osaka-caso',
      publicUrl: GI.locations.osaka_caso,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-osaka-umeda',
      publicUrl: GI.locations.osaka_umeda,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-osaka-hirakata',
      publicUrl: GI.locations.osaka_hirakata,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'loc-okinawa',
      publicUrl: GI.locations.okinawa,
      prompt: 'Client-provided image — generation disabled.',
      enabled: false,
    }),
    item({
      id: 'private-birthday',
      publicUrl: GI.privateOccasions.birthday,
      prompt:
        'Wide 16:9 editorial lifestyle photo. Group of four Japanese women aged 20s celebrating at a paint-and-sip studio in Tokyo, birthday cake on the paint-splattered table, balloons in background, paintbrushes and wine glasses visible. Black aprons, warm string fairy lights, joyful and warm atmosphere. Vogue Japan editorial quality. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'private-bachelorette',
      publicUrl: GI.privateOccasions.bachelorette,
      prompt:
        'Wide 16:9 editorial lifestyle photo. Group of five stylish Japanese women aged mid-20s painting together at wooden tripod easels in a Tokyo studio, laughing and toasting wine glasses. Black aprons, string fairy lights overhead, fun and chic energy, safe for work. TimeOut Tokyo editorial quality, rich warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'private-kids-party',
      publicUrl: GI.privateOccasions.kidsParty,
      prompt:
        'Wide 16:9 editorial lifestyle photo. Four children aged 6–10 at small wooden easels painting bright colorful designs, big smiles, colorful aprons. One Japanese mother watching warmly in background. Bright clean studio lighting, cheerful and family-friendly. Artbar Lab alcohol-free setting. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'private-anniversary',
      publicUrl: GI.privateOccasions.anniversary,
      prompt:
        'Wide 16:9 editorial lifestyle photo. Japanese couple aged late 20s painting side by side at a Tokyo studio, leaning toward each other and smiling. Shared paint-splattered table, wine glasses, warm string fairy lights overhead, soft bokeh background. Romantic but tasteful, warm golden tones, Vogue Japan editorial quality. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'blog-yokohama-cover',
      publicUrl: GI.blog.yokohamaCover,
      prompt:
        'Wide 16:9 cinematic editorial photo. Scenic Yokohama waterfront street scene, late afternoon golden hour light, mix of modern and historic architecture, tree-lined shopping street, warm inviting atmosphere. No people required, travel lifestyle quality, rich warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'blog-yokohama-inline',
      publicUrl: GI.blog.yokohamaInline,
      prompt:
        'Wide 16:9 editorial travel photo. Charming Yokohama Motomachi shopping street detail — café terrace, boutique storefronts, soft afternoon light filtering through trees. Warm editorial travel photography style, inviting and unhurried mood. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'testimonial-ryan',
      publicUrl: GI.testimonials.ryan,
      prompt:
        'Portrait 3:4 head and shoulders editorial photo. Friendly Western man aged early 30s, brown hair, warm natural smile, smart casual clothing. Neutral soft-focus Tokyo studio or café background. Clean professional portrait quality, warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
    item({
      id: 'testimonial-ritsuko',
      publicUrl: GI.testimonials.ritsuko,
      prompt:
        'Portrait 3:4 head and shoulders editorial photo. Friendly Japanese woman aged late 20s, warm natural smile, smart casual clothing. Neutral soft-focus Tokyo studio or café background. Clean professional portrait quality, warm tones. No overlaid text, no watermarks, no brand logos in frame.',
    }),
  ],
};
