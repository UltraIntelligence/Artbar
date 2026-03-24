/**
 * Gemini image generation manifest. Paths must match data/generated-image-paths.ts.
 * Set `enabled: false` to skip a slot. Add optional `referencePaths` (repo-relative files).
 */
import { GI } from '../data/generated-image-paths';

export type ManifestItem = {
  id: string;
  /** URL path served by Next (e.g. /media/generated/foo.jpg) */
  publicUrl: string;
  prompt: string;
  enabled: boolean;
  /** Optional reference images (paths relative to repo root) */
  referencePaths?: string[];
};

const brand =
  'Art direction: premium editorial photo, warm inviting light, paint-and-sip studio mood in Tokyo. No overlaid text, no watermarks, no brand logos in the frame. Photorealistic, high detail.';

function item(partial: Omit<ManifestItem, 'enabled'> & { enabled?: boolean }): ManifestItem {
  return { enabled: true, ...partial };
}

export const IMAGE_MANIFEST: { items: ManifestItem[] } = {
  items: [
    item({
      id: 'hero-team-building',
      publicUrl: GI.heroTeamBuilding,
      prompt: `Wide cinematic hero: diverse professionals laughing together at easels in a bright modern art studio, wine glasses on tables, collaborative creative energy. ${brand}`,
    }),
    item({
      id: 'concept-main',
      publicUrl: GI.conceptMain,
      prompt: `Lounge-style art studio interior: guests painting on canvases with drinks, soft evening light, plants, cozy upscale Tokyo vibe. ${brand}`,
    }),
    item({
      id: 'concept-detail',
      publicUrl: GI.conceptDetail,
      prompt: `Close-up of hands holding a brush applying acrylic on canvas, palette and colors visible, shallow depth of field. ${brand}`,
    }),
    item({
      id: 'feature-all-inclusive',
      publicUrl: GI.featureAllInclusive,
      prompt: `Flat lay of pristine art supplies on a table: canvas, brushes, acrylic paints, apron neatly folded—everything provided for a class. ${brand}`,
    }),
    item({
      id: 'feature-free-flow-drinks',
      publicUrl: GI.featureFreeFlowDrinks,
      prompt: `Elegant still life: wine glasses, tea cup, small snacks on a studio side table next to a painting in progress. ${brand}`,
    }),
    item({
      id: 'feature-bilingual',
      publicUrl: GI.featureBilingual,
      prompt: `Friendly instructor gesturing at an easel while guests listen; diverse group, welcoming international atmosphere. ${brand}`,
    }),
    item({
      id: 'cta-banner',
      publicUrl: GI.ctaBanner,
      prompt: `Ultra-wide banner crop: blurred studio background with colorful canvases and warm bokeh lights, space for UI text elsewhere—center area calm and uncluttered. ${brand}`,
    }),
    // Themes (order matches POPULAR_THEMES in constants.ts)
    item({
      id: 'theme-japan-inspired',
      publicUrl: GI.themes.japanInspired,
      prompt: `Painting on easel showing Mount Fuji, cherry blossoms, soft Japanese-inspired palette, studio setting. ${brand}`,
    }),
    item({
      id: 'theme-paint-pouring',
      publicUrl: GI.themes.paintPouring,
      prompt: `Vibrant acrylic pour painting with cells and swirls on canvas, fluid art close-up. ${brand}`,
    }),
    item({
      id: 'theme-paint-your-pet',
      publicUrl: GI.themes.paintYourPet,
      prompt: `Cheerful pet portrait painting on canvas on easel, colorful brushwork, studio background soft blur. ${brand}`,
    }),
    item({
      id: 'theme-alcohol-ink',
      publicUrl: GI.themes.alcoholInk,
      prompt: `Dreamy alcohol ink abstract: flowing blues and pinks on synthetic paper, ethereal textures. ${brand}`,
    }),
    item({
      id: 'theme-van-gogh',
      publicUrl: GI.themes.vanGogh,
      prompt: `Canvas with impressionist starry night inspired brushstrokes, thick paint texture, gold and blue tones. ${brand}`,
    }),
    item({
      id: 'theme-monet',
      publicUrl: GI.themes.monet,
      prompt: `Soft impressionist water lilies style painting on easel, pastel greens and blues. ${brand}`,
    }),
    item({
      id: 'theme-picasso',
      publicUrl: GI.themes.picasso,
      prompt: `Bold cubist-inspired portrait study on canvas, geometric color blocks, art studio context. ${brand}`,
    }),
    item({
      id: 'theme-renoir',
      publicUrl: GI.themes.renoir,
      prompt: `Romantic soft-light figurative painting detail on canvas, warm skin tones and rose hues. ${brand}`,
    }),
    item({
      id: 'theme-matisse',
      publicUrl: GI.themes.matisse,
      prompt: `Matisse-inspired cut-out style vibrant shapes on canvas, expressive color. ${brand}`,
    }),
    item({
      id: 'theme-kids',
      publicUrl: GI.themes.kids,
      prompt: `Bright fun kids painting class: small canvases, cheerful colors, paint splatters, playful energy. ${brand}`,
    }),
    item({
      id: 'theme-texture-painting',
      publicUrl: GI.themes.texturePainting,
      prompt: `Heavy texture impasto abstract painting with palette knife, sculptural paint peaks. ${brand}`,
    }),
    item({
      id: 'theme-paint-your-idol',
      publicUrl: GI.themes.paintYourIdol,
      prompt: `Pop-art style portrait on canvas, bold colors, music or stage mood suggested without recognizable celebrity face—stylized silhouette. ${brand}`,
    }),
    // Instructors
    item({
      id: 'instructor-cathy-profile',
      publicUrl: GI.instructors.cathy.profile,
      prompt: `Professional headshot portrait of a friendly woman creative director, warm smile, soft studio lighting, neutral background, business-casual. ${brand}`,
    }),
    item({
      id: 'instructor-cathy-artwork',
      publicUrl: GI.instructors.cathy.artwork,
      prompt: `Colorful abstract acrylic painting on canvas in studio, expressive brushwork, leadership and creativity metaphor. ${brand}`,
    }),
    item({
      id: 'instructor-naomi-profile',
      publicUrl: GI.instructors.naomi.profile,
      prompt: `Professional headshot of a stylish young woman, marketing creative, confident smile, soft light, neutral background. ${brand}`,
    }),
    item({
      id: 'instructor-naomi-artwork',
      publicUrl: GI.instructors.naomi.artwork,
      prompt: `Modern abstract pour and ink painting, trendy palette, dynamic composition on easel. ${brand}`,
    }),
    item({
      id: 'instructor-luci-profile',
      publicUrl: GI.instructors.luci.profile,
      prompt: `Professional headshot of a young man artist, gentle expression, dreamy creative vibe, soft gradient background. ${brand}`,
    }),
    item({
      id: 'instructor-luci-artwork',
      publicUrl: GI.instructors.luci.artwork,
      prompt: `Fantasy-inspired colorful landscape painting, sunset and galaxy hues, whimsical but tasteful. ${brand}`,
    }),
    item({
      id: 'instructor-momo-profile',
      publicUrl: GI.instructors.momo.profile,
      prompt: `Professional headshot of a woman artist, bright energetic smile, contemporary style. ${brand}`,
    }),
    item({
      id: 'instructor-momo-artwork',
      publicUrl: GI.instructors.momo.artwork,
      prompt: `Dot technique abstract painting, meticulous colorful dots forming patterns on canvas. ${brand}`,
    }),
    item({
      id: 'instructor-nanako-profile',
      publicUrl: GI.instructors.nanako.profile,
      prompt: `Professional headshot of a Japanese woman artist, calm elegant, traditional-modern blend, soft light. ${brand}`,
    }),
    item({
      id: 'instructor-nanako-artwork',
      publicUrl: GI.instructors.nanako.artwork,
      prompt: `Japanese painting inspired floral work on canvas, delicate brushwork, muted elegant colors. ${brand}`,
    }),
    item({
      id: 'instructor-aika-profile',
      publicUrl: GI.instructors.aika.profile,
      prompt: `Professional headshot of a woman artist, soft colorful styling, natural warmth. ${brand}`,
    }),
    item({
      id: 'instructor-aika-artwork',
      publicUrl: GI.instructors.aika.artwork,
      prompt: `Large tapestry-style textile art detail, organic natural motifs, soft fibers and color. ${brand}`,
    }),
    item({
      id: 'instructor-kiyoe-profile',
      publicUrl: GI.instructors.kiyoe.profile,
      prompt: `Professional headshot of a woman pottery artist, earthy warm tones, gentle smile. ${brand}`,
    }),
    item({
      id: 'instructor-kiyoe-artwork',
      publicUrl: GI.instructors.kiyoe.artwork,
      prompt: `Handmade ceramic plates and cups on a table, artisan pottery, warm studio light. ${brand}`,
    }),
    item({
      id: 'instructor-michi-profile',
      publicUrl: GI.instructors.michi.profile,
      prompt: `Professional headshot of a woman kids art teacher, bright friendly expression, colorful scarf. ${brand}`,
    }),
    item({
      id: 'instructor-michi-artwork',
      publicUrl: GI.instructors.michi.artwork,
      prompt: `Playful kids painting: bright animals and shapes on canvas, joyful colors. ${brand}`,
    }),
    item({
      id: 'instructor-ken-profile',
      publicUrl: GI.instructors.ken.profile,
      prompt: `Professional headshot of a man artist, thoughtful smile, glasses optional, creative intellectual vibe. ${brand}`,
    }),
    item({
      id: 'instructor-ken-artwork',
      publicUrl: GI.instructors.ken.artwork,
      prompt: `Intricate whimsical ink illustration style artwork on paper at easel, fine line detail. ${brand}`,
    }),
    // Locations
    item({
      id: 'loc-daikanyama',
      publicUrl: GI.locations.daikanyama,
      prompt: `Exterior or storefront of a chic Tokyo neighborhood art studio near Daikanyama, daytime, stylish signage area blurred—no readable text. ${brand}`,
    }),
    item({
      id: 'loc-harajuku',
      publicUrl: GI.locations.harajuku,
      prompt: `Trendy Harajuku-area creative studio entrance, colorful urban Tokyo, youthful energy. ${brand}`,
    }),
    item({
      id: 'loc-ginza',
      publicUrl: GI.locations.ginza,
      prompt: `Upscale Ginza district art lounge interior glimpsed from entrance, refined luxury mood. ${brand}`,
    }),
    item({
      id: 'loc-yokohama',
      publicUrl: GI.locations.yokohama,
      prompt: `Yokohama bay city creative space, soft port-city light, Motomachi chic vibe, art class interior. ${brand}`,
    }),
    item({
      id: 'loc-osaka-namba',
      publicUrl: GI.locations.osaka_namba,
      prompt: `Modern high-rise studio interior in Osaka, panoramic city view through windows, bright and airy. ${brand}`,
    }),
    item({
      id: 'loc-osaka-caso',
      publicUrl: GI.locations.osaka_caso,
      prompt: `Seaside warehouse-style creative studio, industrial chic, Osaka harbor light. ${brand}`,
    }),
    item({
      id: 'loc-osaka-umeda',
      publicUrl: GI.locations.osaka_umeda,
      prompt: `Contemporary mall-adjacent studio lounge in Umeda, polished interior, evening ambiance. ${brand}`,
    }),
    item({
      id: 'loc-osaka-hirakata',
      publicUrl: GI.locations.osaka_hirakata,
      prompt: `Family-friendly mall studio space, welcoming bright interior, Hirakata suburban warmth. ${brand}`,
    }),
    item({
      id: 'loc-okinawa',
      publicUrl: GI.locations.okinawa,
      prompt: `Tropical Okinawa-inspired art studio interior, natural wood, ocean-tone accents, relaxed island vibe. ${brand}`,
    }),
    // Private parties
    item({
      id: 'private-birthday',
      publicUrl: GI.privateOccasions.birthday,
      prompt: `Celebration birthday table with cake and painting supplies, friends clinking glasses in art studio, festive warm lights. ${brand}`,
    }),
    item({
      id: 'private-bachelorette',
      publicUrl: GI.privateOccasions.bachelorette,
      prompt: `Group of friends laughing at easels, sparkling drinks, fun night-out energy in a studio. ${brand}`,
    }),
    item({
      id: 'private-kids-party',
      publicUrl: GI.privateOccasions.kidsParty,
      prompt: `Kids painting party: colorful aprons, small canvases, balloons soft blur in background. ${brand}`,
    }),
    item({
      id: 'private-anniversary',
      publicUrl: GI.privateOccasions.anniversary,
      prompt: `Couple painting together at adjacent easels, romantic warm lighting, champagne glasses side table. ${brand}`,
    }),
    // Blog
    item({
      id: 'blog-yokohama-cover',
      publicUrl: GI.blog.yokohamaCover,
      prompt: `Yokohama waterfront promenade at golden hour, red brick warehouse district distant, travel editorial photo. ${brand}`,
    }),
    item({
      id: 'blog-yokohama-inline',
      publicUrl: GI.blog.yokohamaInline,
      prompt: `Yokohama Chinatown street scene, lanterns bokeh, no readable text, vibrant editorial travel photo. ${brand}`,
    }),
    item({
      id: 'testimonial-ryan',
      publicUrl: GI.testimonials.ryan,
      prompt: `Neutral professional avatar portrait placeholder: smiling man, casual smart, soft gray background, realistic but generic—not a specific celebrity. ${brand}`,
    }),
    item({
      id: 'testimonial-ritsuko',
      publicUrl: GI.testimonials.ritsuko,
      prompt: `Neutral professional avatar portrait placeholder: smiling Japanese woman, casual elegant, soft gray background, realistic generic. ${brand}`,
    }),
  ],
};
