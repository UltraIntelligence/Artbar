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
