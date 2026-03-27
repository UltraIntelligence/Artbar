/**
 * Builds the imageSrcSet string for a Next.js optimised image preload link.
 * Widths match Next.js default deviceSizes; quality matches the default of 75.
 *
 * Usage in a Server Component page.tsx:
 *   <link rel="preload" as="image" imageSrcSet={nextImageSrcSet(src)} imageSizes="100vw" fetchPriority="high" />
 */
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const QUALITY = 75;

export function nextImageSrcSet(src: string): string {
  return DEVICE_SIZES.map(
    (w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${QUALITY} ${w}w`
  ).join(', ');
}
