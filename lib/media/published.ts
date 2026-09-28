import media from '@/data/published-media.json';
import type { PublishedMediaMap } from '@/lib/media/types';

export function getPublishedMediaMap(): PublishedMediaMap {
  return media;
}
