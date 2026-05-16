import { track } from '@vercel/analytics';

export type BookingClickLocation =
  | 'nav_schedule'
  | 'nav_book_button'
  | 'mobile_menu_book_button'
  | 'mobile_sticky_book_button'
  | 'footer'
  | 'home_hero'
  | 'home_themes'
  | 'home_bottom'
  | 'paint_your_pet'
  | 'theme_hero'
  | 'theme_bottom'
  | `location_${string}`;

export function trackBookingClick(
  location: BookingClickLocation,
  extra?: { theme?: string },
): void {
  const data: Record<string, string> = { location };
  if (extra?.theme) data.theme = extra.theme;
  track('booking_cta_clicked', data);
}
