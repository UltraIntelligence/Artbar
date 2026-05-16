import type { ContentData } from '@/types';
import type { PublishedMediaMap } from './types';

export function mediaAssetUrl(
  media: PublishedMediaMap | null | undefined,
  slotKey: string,
  fallback: string,
) {
  return encodeURI(media?.[slotKey]?.url || fallback);
}

export function mergeMediaIntoContent(content: ContentData, media: PublishedMediaMap): ContentData {
  const next = structuredClone(content);

  next.images.logoDark = mediaAssetUrl(media, 'shared.logo.dark', next.images.logoDark);
  next.images.logoLight = mediaAssetUrl(media, 'shared.logo.light', next.images.logoLight);

  next.images.hero.home = mediaAssetUrl(media, 'home.hero.desktop', next.images.hero.home);
  next.images.hero.homeMobile = mediaAssetUrl(media, 'home.hero.mobile', next.images.hero.homeMobile);
  next.images.hero.teamBuilding = mediaAssetUrl(
    media,
    'teamBuilding.hero',
    next.images.hero.teamBuilding,
  );
  next.images.concept.main = mediaAssetUrl(media, 'home.concept.main', next.images.concept.main);
  next.images.concept.detail = mediaAssetUrl(
    media,
    'home.concept.detail',
    next.images.concept.detail,
  );
  next.images.cta = mediaAssetUrl(media, 'home.cta', next.images.cta);

  for (const language of ['en', 'jp'] as const) {
    next[language].home.features.items = next[language].home.features.items.map((feature, index) => ({
      ...feature,
      image: mediaAssetUrl(media, `home.features.${index + 1}`, feature.image),
    }));

    next[language].home.themes.items = next[language].home.themes.items.map((theme, index) => ({
      ...theme,
      image: mediaAssetUrl(
        media,
        `home.popularThemes.${theme.slug ?? index + 1}`,
        theme.image,
      ),
    }));

    next[language].teamBuilding.activities.items =
      next[language].teamBuilding.activities.items.map((activity, index) => ({
        ...activity,
        image: mediaAssetUrl(
          media,
          `teamBuilding.activities.${index + 1}`,
          activity.image ?? '',
        ),
      }));

    next[language].privateParties.occasions = next[language].privateParties.occasions.map(
      (occasion, index) => ({
        ...occasion,
        image: mediaAssetUrl(media, `privateParties.occasions.${index + 1}`, occasion.image),
      }),
    );
  }

  next.locations = next.locations.map((location) => ({
    ...location,
    image: mediaAssetUrl(media, `locations.${location.id}`, location.image),
  }));

  next.instructors = next.instructors.map((instructor) => ({
    ...instructor,
    profileImage: mediaAssetUrl(
      media,
      `instructors.${instructor.id}.profile`,
      instructor.profileImage,
    ),
    artworkImage: mediaAssetUrl(
      media,
      `instructors.${instructor.id}.artwork`,
      instructor.artworkImage,
    ),
  }));

  next.blog = next.blog.map((post) => ({
    ...post,
    image: mediaAssetUrl(media, `blog.${post.slug}.cover`, post.image),
  }));

  next.media = next.media.map((item, index) => ({
    ...item,
    image: item.image
      ? mediaAssetUrl(media, `press.${index + 1}.image`, item.image)
      : item.image,
    logo: item.logo ? mediaAssetUrl(media, `press.${index + 1}.logo`, item.logo) : item.logo,
  }));

  return next;
}
