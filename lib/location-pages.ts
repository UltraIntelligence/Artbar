import { LOCATIONS } from '@/constants';

export function locationSlugFromId(id: string): string {
  return id.replace(/_/g, '-');
}

export function locationIdFromSlug(slug: string): string {
  return slug.replace(/-/g, '_');
}

export function getLocationBySlug(slug: string) {
  const id = locationIdFromSlug(slug);
  return LOCATIONS.find((location) => location.id === id) ?? null;
}

export function locationPath(slugOrId: string): string {
  return `/locations/${locationSlugFromId(slugOrId)}`;
}

export function getLocationPageSlugs(): string[] {
  return LOCATIONS.map((location) => locationSlugFromId(location.id));
}
