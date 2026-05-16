import { defaultContent } from '@/data/content';
import { THEME_PAGE_IMAGES, THEME_PAGE_SLUGS } from '@/data/generated-image-paths';
import {
  INSTRUCTORS,
  LOCATIONS,
  MEDIA_LIST,
  SITE_IMAGES,
  TEAM_BUILDING_ACTIVITY_IMAGES,
} from '@/constants';
import type { MediaSlot, MediaVariantSpec } from './types';

export const IMAGE_UPLOAD_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
] as const;

const imageRendition = (
  fallbackUrl: string,
  options: Partial<MediaVariantSpec> = {}
): MediaVariantSpec => ({
  key: options.key ?? 'display',
  label: options.label ?? 'Display image',
  fit: options.fit ?? 'cover',
  quality: options.quality ?? 82,
  format: options.format ?? 'webp',
  fallbackUrl,
  width: options.width ?? 1600,
  height: options.height,
});

const slot = (
  pageKey: string,
  pageLabel: string,
  order: number,
  key: string,
  label: string,
  fallbackUrl: string,
  variants: MediaVariantSpec[] = [imageRendition(fallbackUrl)],
  sourcePath?: string,
  helpText = 'Image-only: staff upload one JPEG, PNG, WebP, or AVIF file for this slot.'
): MediaSlot => ({
  key,
  label,
  helpText,
  pageKey,
  pageLabel,
  order,
  fallbackUrl,
  acceptedMimeTypes: IMAGE_UPLOAD_MIME_TYPES,
  variants,
  sourcePath,
});

const page = (pageKey: string, pageLabel: string) => {
  let order = 0;
  return (
    key: string,
    label: string,
    fallbackUrl: string,
    variants?: MediaVariantSpec[],
    sourcePath?: string,
    helpText?: string
  ) => slot(pageKey, pageLabel, (order += 10), key, label, fallbackUrl, variants, sourcePath, helpText);
};

const home = page('home', 'Home');
const teamBuilding = page('team-building', 'Team Building');
const privateParties = page('private-parties', 'Private Parties');
const locationsPage = page('locations', 'Locations');
const instructorsPage = page('instructors', 'Instructors');
const blogPage = page('blog', 'Journal');
const pressPage = page('press', 'Press');
const shared = page('shared', 'Shared');

const themeTitleBySlug = new Map(
  defaultContent.en.home.themes.items.map((theme) => [theme.slug, theme.title])
);

const themePageSlots = THEME_PAGE_SLUGS.flatMap((slug) => {
  const add = page(`themes/${slug}`, `Theme: ${themeTitleBySlug.get(slug) ?? slug}`);
  const images = THEME_PAGE_IMAGES[slug];
  return [
    add(
      `themes.${slug}.hero`,
      'Hero image',
      images.hero,
      undefined,
      `THEME_PAGE_IMAGES.${slug}.hero`
    ),
    ...images.examples.map((image, index) =>
      add(
        `themes.${slug}.example.${index + 1}`,
        `Example painting ${index + 1}`,
        image,
        undefined,
        `THEME_PAGE_IMAGES.${slug}.examples[${index}]`
      )
    ),
    add(
      `themes.${slug}.experience`,
      'Experience image',
      images.experience,
      undefined,
      `THEME_PAGE_IMAGES.${slug}.experience`
    ),
  ];
});

export const MEDIA_SLOTS: MediaSlot[] = [
  home(
    'home.hero.desktop',
    'Hero desktop replacement image',
    SITE_IMAGES.hero.home,
    [
      imageRendition(SITE_IMAGES.hero.home, {
        label: 'Desktop display image',
        width: 1920,
        height: 1080,
        fit: 'cover',
      }),
    ],
    'defaultContent.images.hero.home',
    'Image-only replacement for the desktop home hero. The current bundled fallback is an MP4, but staff uploads are images only.'
  ),
  home(
    'home.hero.mobile',
    'Hero mobile replacement image',
    SITE_IMAGES.hero.homeMobile,
    [
      imageRendition(SITE_IMAGES.hero.homeMobile, {
        label: 'Mobile display image',
        width: 1080,
        height: 1920,
        fit: 'cover',
      }),
    ],
    'defaultContent.images.hero.homeMobile',
    'Image-only replacement for the mobile home hero. The current bundled fallback is an MP4, but staff uploads are images only.'
  ),
  home('home.concept.main', 'Concept main image', SITE_IMAGES.concept.main, undefined, 'defaultContent.images.concept.main'),
  home('home.concept.detail', 'Concept detail image', SITE_IMAGES.concept.detail, undefined, 'defaultContent.images.concept.detail'),
  ...defaultContent.en.home.features.items.map((feature, index) =>
    home(
      `home.features.${index + 1}`,
      `Feature: ${feature.title}`,
      feature.image,
      undefined,
      `defaultContent.en.home.features.items[${index}].image`
    )
  ),
  ...defaultContent.en.home.themes.items.map((theme, index) =>
    home(
      `home.popularThemes.${theme.slug ?? index + 1}`,
      `Popular theme: ${theme.title}`,
      theme.image,
      undefined,
      `defaultContent.en.home.themes.items[${index}].image`
    )
  ),
  home('home.cta', 'Bottom CTA image', SITE_IMAGES.cta, undefined, 'defaultContent.images.cta'),

  ...themePageSlots,

  teamBuilding('teamBuilding.hero', 'Hero image', SITE_IMAGES.hero.teamBuilding, undefined, 'defaultContent.images.hero.teamBuilding'),
  ...defaultContent.en.teamBuilding.activities.items.map((activity, index) =>
    teamBuilding(
      `teamBuilding.activities.${index + 1}`,
      `Activity: ${activity.title}`,
      TEAM_BUILDING_ACTIVITY_IMAGES[index],
      undefined,
      `TEAM_BUILDING_ACTIVITY_IMAGES[${index}]`
    )
  ),

  ...defaultContent.en.privateParties.occasions.map((occasion, index) =>
    privateParties(
      `privateParties.occasions.${index + 1}`,
      `Occasion: ${occasion.title}`,
      occasion.image,
      undefined,
      `defaultContent.en.privateParties.occasions[${index}].image`
    )
  ),

  ...LOCATIONS.map((location, index) =>
    locationsPage(
      `locations.${location.id}`,
      location.nameEn,
      location.image,
      undefined,
      `LOCATIONS[${index}].image`
    )
  ),

  ...INSTRUCTORS.flatMap((instructor, index) => [
    instructorsPage(
      `instructors.${instructor.id}.profile`,
      `${instructor.name} profile`,
      instructor.profileImage,
      undefined,
      `INSTRUCTORS[${index}].profileImage`
    ),
    instructorsPage(
      `instructors.${instructor.id}.artwork`,
      `${instructor.name} artwork`,
      instructor.artworkImage,
      undefined,
      `INSTRUCTORS[${index}].artworkImage`
    ),
  ]),

  ...defaultContent.blog.map((post, index) =>
    blogPage(
      `blog.${post.slug}.cover`,
      `${post.titleEn} cover`,
      post.image,
      undefined,
      `defaultContent.blog[${index}].image`
    )
  ),

  ...MEDIA_LIST.flatMap((item, index) => {
    const slots: MediaSlot[] = [];
    if (item.image) {
      slots.push(
        pressPage(
          `press.${index + 1}.image`,
          `${item.outlet} image`,
          item.image,
          undefined,
          `MEDIA_LIST[${index}].image`
        )
      );
    }
    if (item.logo) {
      slots.push(
        pressPage(
          `press.${index + 1}.logo`,
          `${item.outlet} logo`,
          item.logo,
          undefined,
          `MEDIA_LIST[${index}].logo`
        )
      );
    }
    return slots;
  }),

  shared(
    'shared.logo.dark',
    'Dark logo image',
    defaultContent.images.logoDark,
    [
      imageRendition(defaultContent.images.logoDark, {
        label: 'Dark logo display image',
        fit: 'inside',
        quality: 90,
      }),
    ],
    'defaultContent.images.logoDark',
    'Image-only replacement for the dark Artbar logo.'
  ),
  shared(
    'shared.logo.light',
    'Light logo image',
    defaultContent.images.logoLight,
    [
      imageRendition(defaultContent.images.logoLight, {
        label: 'Light logo display image',
        fit: 'inside',
        quality: 90,
      }),
    ],
    'defaultContent.images.logoLight',
    'Image-only replacement for the light Artbar logo.'
  ),
];

export function getMediaSlot(slotKey: string): MediaSlot | undefined {
  return MEDIA_SLOTS.find((slotItem) => slotItem.key === slotKey);
}
