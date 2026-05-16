import { IMAGE_UPLOAD_MIME_TYPES, MEDIA_SLOTS } from '@/lib/media/slots';

const IMAGE_UPLOAD_MIME_TYPE_SET: ReadonlySet<string> = new Set(IMAGE_UPLOAD_MIME_TYPES);

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function isValidUrl(url: string) {
  return (url.startsWith('/') && !url.startsWith('//')) || /^https?:\/\//.test(url);
}

const seenKeys = new Set<string>();
const pageOrders = new Map<string, number>();

for (const slot of MEDIA_SLOTS) {
  assert(!seenKeys.has(slot.key), `Duplicate media slot key: ${slot.key}`);
  seenKeys.add(slot.key);

  assert(slot.label.trim(), `Media slot ${slot.key} is missing a label.`);
  assert(slot.pageKey.trim(), `Media slot ${slot.key} is missing a page key.`);
  assert(slot.pageLabel.trim(), `Media slot ${slot.key} is missing a page label.`);
  assert(slot.fallbackUrl.trim(), `Media slot ${slot.key} is missing a fallback URL.`);
  assert(isValidUrl(slot.fallbackUrl), `Media slot ${slot.key} has an invalid fallback URL: ${slot.fallbackUrl}`);
  assert(slot.acceptedMimeTypes.length > 0, `Media slot ${slot.key} is missing accepted MIME types.`);
  assert(
    slot.acceptedMimeTypes.length === IMAGE_UPLOAD_MIME_TYPE_SET.size,
    `Media slot ${slot.key} must accept the full image-only MIME set.`
  );
  for (const mimeType of slot.acceptedMimeTypes) {
    assert(
      IMAGE_UPLOAD_MIME_TYPE_SET.has(mimeType),
      `Media slot ${slot.key} accepts unsupported MIME type: ${mimeType}`
    );
  }
  for (const mimeType of IMAGE_UPLOAD_MIME_TYPE_SET) {
    assert(
      slot.acceptedMimeTypes.includes(mimeType),
      `Media slot ${slot.key} is missing accepted MIME type: ${mimeType}`
    );
  }
  assert(slot.variants.length > 0, `Media slot ${slot.key} is missing variants.`);

  for (const variant of slot.variants) {
    assert(variant.label.trim(), `Media slot ${slot.key} has a variant missing a label.`);
    assert(variant.fit === 'cover' || variant.fit === 'inside', `Media slot ${slot.key} has invalid variant fit.`);
    assert(variant.format === 'jpeg' || variant.format === 'webp', `Media slot ${slot.key} has invalid variant format.`);
    if (variant.fallbackUrl) {
      assert(
        isValidUrl(variant.fallbackUrl),
        `Media slot ${slot.key} has an invalid ${variant.key} fallback URL: ${variant.fallbackUrl}`
      );
    }
  }

  const lastOrder = pageOrders.get(slot.pageKey);
  assert(
    lastOrder === undefined || slot.order > lastOrder,
    `Media slot ${slot.key} is out of order on page ${slot.pageKey}.`
  );
  pageOrders.set(slot.pageKey, slot.order);
}

console.log(`Media slot smoke check passed (${MEDIA_SLOTS.length} slots).`);
