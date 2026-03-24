/**
 * Public URLs for Gemini-generated assets under public/media/generated/.
 * Keep filenames in sync with scripts/image-manifest.json.
 */
const g = (name: string) => `/media/generated/${name}`;

export const GI = {
  heroTeamBuilding: g('hero-team-building.jpg'),
  conceptMain: g('concept-main.jpg'),
  conceptDetail: g('concept-detail.jpg'),
  featureAllInclusive: g('feature-all-inclusive.jpg'),
  featureFreeFlowDrinks: g('feature-free-flow-drinks.jpg'),
  featureBilingual: g('feature-bilingual.jpg'),
  ctaBanner: g('cta-banner.jpg'),
  themes: {
    japanInspired: g('theme-japan-inspired.jpg'),
    paintPouring: g('theme-paint-pouring.jpg'),
    paintYourPet: g('theme-paint-your-pet.jpg'),
    alcoholInk: g('theme-alcohol-ink.jpg'),
    vanGogh: g('theme-van-gogh.jpg'),
    monet: g('theme-monet.jpg'),
    picasso: g('theme-picasso.jpg'),
    renoir: g('theme-renoir.jpg'),
    matisse: g('theme-matisse.jpg'),
    kids: g('theme-kids.jpg'),
    texturePainting: g('theme-texture-painting.jpg'),
    paintYourIdol: g('theme-paint-your-idol.jpg'),
  },
  instructors: {
    cathy: { profile: g('instructor-cathy-profile.jpg'), artwork: g('instructor-cathy-artwork.jpg') },
    naomi: { profile: g('instructor-naomi-profile.jpg'), artwork: g('instructor-naomi-artwork.jpg') },
    luci: { profile: g('instructor-luci-profile.jpg'), artwork: g('instructor-luci-artwork.jpg') },
    momo: { profile: g('instructor-momo-profile.jpg'), artwork: g('instructor-momo-artwork.jpg') },
    nanako: { profile: g('instructor-nanako-profile.jpg'), artwork: g('instructor-nanako-artwork.jpg') },
    aika: { profile: g('instructor-aika-profile.jpg'), artwork: g('instructor-aika-artwork.jpg') },
    kiyoe: { profile: g('instructor-kiyoe-profile.jpg'), artwork: g('instructor-kiyoe-artwork.jpg') },
    michi: { profile: g('instructor-michi-profile.jpg'), artwork: g('instructor-michi-artwork.jpg') },
    ken: { profile: g('instructor-ken-profile.jpg'), artwork: g('instructor-ken-artwork.jpg') },
  },
  locations: {
    daikanyama: g('loc-daikanyama.jpg'),
    harajuku: g('loc-harajuku.jpg'),
    ginza: g('loc-ginza.jpg'),
    yokohama: g('loc-yokohama.jpg'),
    osaka_namba: g('loc-osaka-namba.jpg'),
    osaka_caso: g('loc-osaka-caso.jpg'),
    osaka_umeda: g('loc-osaka-umeda.jpg'),
    osaka_hirakata: g('loc-osaka-hirakata.jpg'),
    okinawa: g('loc-okinawa.jpg'),
  },
  privateOccasions: {
    birthday: g('private-birthday.jpg'),
    bachelorette: g('private-bachelorette.jpg'),
    kidsParty: g('private-kids-party.jpg'),
    anniversary: g('private-anniversary.jpg'),
  },
  blog: {
    yokohamaCover: g('blog-yokohama-cover.jpg'),
    yokohamaInline: g('blog-yokohama-inline.jpg'),
  },
  testimonials: {
    ryan: g('testimonial-ryan.jpg'),
    ritsuko: g('testimonial-ritsuko.jpg'),
  },
} as const;
