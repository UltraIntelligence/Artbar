import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { geminiImageGenerationConfig, resolveGeminiImageModel } from '@/lib/gemini-image-config';
import { checkRateLimit } from '@/lib/rate-limit';

const REQUEST_TIMEOUT_MS = 45_000;
const MAX_IMAGE_BASE64_LENGTH = 12_000_000;
const MAX_JSON_BODY_LENGTH = 12_500_000;

type DetectedImageType = 'jpeg' | 'png' | 'webp';

class BodyTooLargeError extends Error {
  constructor() {
    super('Request body is too large.');
  }
}

class InvalidJsonBodyError extends Error {
  constructor() {
    super('Request body must be valid JSON.');
  }
}

function detectImageType(buf: Buffer): DetectedImageType | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) return 'png';
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return 'webp';
  return null;
}

async function readBoundedJsonBody(req: NextRequest): Promise<unknown> {
  const reader = req.body?.getReader();
  if (!reader) {
    throw new InvalidJsonBodyError();
  }

  const decoder = new TextDecoder();
  let totalBytes = 0;
  let bodyText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_JSON_BODY_LENGTH) {
      throw new BodyTooLargeError();
    }

    bodyText += decoder.decode(value, { stream: true });
  }

  bodyText += decoder.decode();

  try {
    return JSON.parse(bodyText);
  } catch {
    throw new InvalidJsonBodyError();
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = await checkRateLimit('generate-sketch', ip, 5, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const contentLength = req.headers.get('content-length');
  const parsedContentLength = contentLength ? Number(contentLength) : 0;
  if (
    Number.isFinite(parsedContentLength) &&
    parsedContentLength > MAX_JSON_BODY_LENGTH
  ) {
    return NextResponse.json(
      { error: 'Image is too large. Please try a smaller photo.' },
      { status: 413 }
    );
  }

  try {
    const body = await readBoundedJsonBody(req);
    const imageBase64 = typeof body === 'object' && body !== null
      ? (body as { imageBase64?: unknown }).imageBase64
      : undefined;

    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY for /api/generate-sketch');
      return NextResponse.json({ error: 'Sketch service is not configured right now.' }, { status: 500 });
    }

    if (typeof imageBase64 !== 'string' || !imageBase64.trim()) {
      return NextResponse.json({ error: 'imageBase64 required' }, { status: 400 });
    }

    if (imageBase64.length > MAX_IMAGE_BASE64_LENGTH) {
      return NextResponse.json({ error: 'Image is too large. Please try a smaller photo.' }, { status: 413 });
    }

    let header: Buffer;
    try {
      header = Buffer.from(imageBase64.slice(0, 32), 'base64');
    } catch {
      return NextResponse.json({ error: 'Invalid image data.' }, { status: 400 });
    }

    const detectedType = detectImageType(header);
    if (!detectedType) {
      console.warn('[generate-sketch] rejected upload: unrecognized image header');
      return NextResponse.json(
        { error: 'Unsupported image format. Please upload a JPEG, PNG, or WebP photo.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      Create a high-quality, black and white line drawing of this pet.
      Style: Realistic sketch, clean lines, white background.
      Focus on the facial features and fur texture.
      Do not add color. Make it look like a coloring book page.
      Keep only the pet from the uploaded photo and remove extra background clutter.
    `;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const response = await Promise.race([
      ai.models.generateContent({
        model: resolveGeminiImageModel(),
        contents: {
          parts: [
            { inlineData: { mimeType: `image/${detectedType}`, data: imageBase64 } },
            { text: prompt },
          ],
        },
        config: {
          ...geminiImageGenerationConfig,
        },
      }).finally(() => {
        if (timeoutId) clearTimeout(timeoutId);
      }),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Sketch generation timed out.')), REQUEST_TIMEOUT_MS);
      }),
    ]);

    const parts = response.candidates?.[0]?.content?.parts;
    const imagePart = parts?.find(
      (part: { inlineData?: { data?: string; mimeType?: string } }) => part.inlineData?.data
    );

    if (!imagePart?.inlineData?.data) {
      const fallbackText = parts?.find((part: { text?: string }) => part.text)?.text;
      console.error('No image generated from Gemini response', { fallbackText });
      return NextResponse.json(
        { error: 'We could not turn that photo into a sketch. Please try a different pet photo.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType || 'image/png',
    });
  } catch (error) {
    console.error('Sketch route failed', error);
    if (error instanceof BodyTooLargeError) {
      return NextResponse.json({ error: 'Image is too large. Please try a smaller photo.' }, { status: 413 });
    }
    if (error instanceof InvalidJsonBodyError) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : '';
    const errorStatus = typeof error === 'object' && error !== null ? (error as { status?: number }).status : undefined;
    const status =
      message === 'Sketch generation timed out.'
        ? 504
        : errorStatus === 429
          ? 429
          : 502;
    const customerMessage =
      status === 504
        ? 'The sketch took too long. Please try again.'
        : status === 429
          ? 'Too many sketch requests right now. Please wait a minute and try again.'
          : 'We could not create the sketch right now. Please try again in a moment.';
    return NextResponse.json({ error: customerMessage }, { status });
  }
}
