import sharp from 'sharp';
import type { MediaAsset, MediaAssetFile, MediaSlot, MediaVariantSpec } from './types';

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
const ORIGINAL_PREVIEW_WIDTH = 2400;
const ORIGINAL_PREVIEW_QUALITY = 86;

export interface ProcessedMediaFile extends Omit<MediaAssetFile, 'url'> {
  key: string;
  buffer: Buffer;
  extension: string;
}

export interface ProcessedMediaAsset {
  asset: MediaAsset;
  files: ProcessedMediaFile[];
}

function assertSupportedUpload(buffer: Buffer, sourceMimeType: string, slot: MediaSlot) {
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error('That image is too large. Please upload an image under 30MB.');
  }

  if (sourceMimeType === 'image/svg+xml') {
    throw new Error('SVG uploads are not supported. Please upload a JPG, PNG, WebP, or AVIF image.');
  }

  if (!slot.acceptedMimeTypes.includes(sourceMimeType)) {
    throw new Error('This image type is not supported for that slot. Please upload a JPG, PNG, WebP, or AVIF image.');
  }
}

function getFormatMime(format: MediaVariantSpec['format'] | 'jpeg') {
  return format === 'webp' ? 'image/webp' : 'image/jpeg';
}

function getExtension(format: MediaVariantSpec['format'] | 'jpeg') {
  return format === 'webp' ? 'webp' : 'jpg';
}

async function getImageFileMetadata(buffer: Buffer, mimeType: string): Promise<Omit<MediaAssetFile, 'url'>> {
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    mimeType,
    sizeBytes: buffer.byteLength,
  };
}

async function createOriginalPreview(baseImage: sharp.Sharp): Promise<ProcessedMediaFile> {
  const buffer = await baseImage
    .clone()
    .resize({
      width: ORIGINAL_PREVIEW_WIDTH,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: ORIGINAL_PREVIEW_QUALITY, mozjpeg: true })
    .toBuffer();

  return {
    key: 'original',
    buffer,
    extension: 'jpg',
    ...(await getImageFileMetadata(buffer, 'image/jpeg')),
  };
}

async function createRendition(
  baseImage: sharp.Sharp,
  variant: MediaVariantSpec,
): Promise<ProcessedMediaFile> {
  let image = baseImage.clone().resize({
    width: variant.width,
    height: variant.height,
    fit: variant.fit,
    withoutEnlargement: variant.fit === 'inside',
  });

  if (variant.format === 'webp') {
    image = image.webp({ quality: variant.quality ?? 82 });
  } else {
    image = image.jpeg({ quality: variant.quality ?? 82, mozjpeg: true });
  }

  const buffer = await image.toBuffer();
  const mimeType = getFormatMime(variant.format);

  return {
    key: variant.key,
    buffer,
    extension: getExtension(variant.format),
    ...(await getImageFileMetadata(buffer, mimeType)),
  };
}

export async function processMediaImageUpload(
  buffer: Buffer,
  sourceMimeType: string,
  slot: MediaSlot,
  alt: string,
  uploadedAt: string,
): Promise<ProcessedMediaAsset> {
  assertSupportedUpload(buffer, sourceMimeType, slot);

  let baseImage: sharp.Sharp;
  try {
    const image = sharp(buffer, { failOn: 'error' });
    await image.metadata();
    baseImage = image.rotate();
  } catch {
    throw new Error('We could not read that image. Please try a different JPG, PNG, WebP, or AVIF file.');
  }

  const original = await createOriginalPreview(baseImage);
  const renditions = await Promise.all(
    slot.variants.map((variant) => createRendition(baseImage, variant)),
  );
  const primaryRendition = renditions[0] ?? original;

  return {
    asset: {
      url: '',
      width: primaryRendition.width,
      height: primaryRendition.height,
      mimeType: primaryRendition.mimeType,
      sizeBytes: primaryRendition.sizeBytes,
      alt,
      uploadedAt,
      original: {
        url: '',
        width: original.width,
        height: original.height,
        mimeType: original.mimeType,
        sizeBytes: original.sizeBytes,
      },
      renditions: Object.fromEntries(
        renditions.map((rendition) => [
          rendition.key,
          {
            url: '',
            width: rendition.width,
            height: rendition.height,
            mimeType: rendition.mimeType,
            sizeBytes: rendition.sizeBytes,
          },
        ]),
      ),
    },
    files: [original, ...renditions],
  };
}
