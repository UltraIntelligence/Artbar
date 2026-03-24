/**
 * Public URLs for Gemini-generated assets under public/media/generated/.
 * Real instructor photos live under public/media/instructors/{id}-profile|banner.jpg.
 */
const g = (name: string) => `/media/generated/${name}`;

const instructorPhoto = (id: string) => ({
  profile: `/media/instructors/${id}-profile.jpg`,
  artwork: `/media/instructors/${id}-banner.jpg`,
});

/**
 * Slugs for `/media/instructors/{id}-*.jpg`. Keep in sync with row order in `constants.ts` (`INSTRUCTOR_ROWS`).
 * Add/remove ids here — `GI.instructors` and `scripts/image-manifest.ts` follow automatically.
 */
export const INSTRUCTOR_IDS = [
  'cathy',
  'naomi',
  'luci',
  'momo',
  'nanako',
  'kiyoe',
  'michi',
  'mineko',
  'sakura',
  'daria',
  'diamanteyuko',
  'rie',
  'ken',
  'naoko',
  'helen',
  'yuka',
  'jenna',
  'akiko',
  'minako',
  'akko',
  'glicinapeony',
] as const;

export type InstructorId = (typeof INSTRUCTOR_IDS)[number];

const instructorPhotos = Object.fromEntries(
  INSTRUCTOR_IDS.map((id) => [id, instructorPhoto(id)])
) as { [K in InstructorId]: ReturnType<typeof instructorPhoto> };

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
  instructors: instructorPhotos,
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
