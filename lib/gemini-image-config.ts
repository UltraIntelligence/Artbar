/**
 * Gemini 3.1 Flash Image Preview — API model id (user-facing name: "Nano Banana 2").
 * Use with GenerateContentConfig.responseModalities for image output.
 */
export const GEMINI_IMAGE_MODEL_DEFAULT = 'gemini-3.1-flash-image-preview';

export function resolveGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL || GEMINI_IMAGE_MODEL_DEFAULT;
}

/** Matches Gemini API / Python SDK expectation for image-capable responses. */
export const geminiImageGenerationConfig: { responseModalities: string[] } = {
  responseModalities: ['TEXT', 'IMAGE'],
};

/**
 * Manifest ids for `/themes/[slug]` “Example paintings” grid (`theme-*-example-1` … `4`).
 * These are shown at modest size on the site; lock to 1K square per Gemini `imageConfig`
 * (`imageSize`: `1K` | `2K` | `4K` — default API behavior is 1K if omitted).
 */
export const THEME_PAGE_EXAMPLE_MANIFEST_ID = /^theme-.+-example-[1-4]$/;

/** Optional extra fields merged into `GenerateContentConfig` for image generation. */
export function geminiImageConfigForManifestId(
  id: string
): { imageConfig: { imageSize: string; aspectRatio: string } } | Record<string, never> {
  if (THEME_PAGE_EXAMPLE_MANIFEST_ID.test(id)) {
    return {
      imageConfig: {
        imageSize: process.env.GEMINI_THEME_EXAMPLE_IMAGE_SIZE?.trim() || '1K',
        aspectRatio: '1:1',
      },
    };
  }
  return {};
}
