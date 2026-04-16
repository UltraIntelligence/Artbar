import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { geminiImageGenerationConfig, resolveGeminiImageModel } from '@/lib/gemini-image-config';
import { rateLimit } from '@/lib/rate-limit';

const REQUEST_TIMEOUT_MS = 45_000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = rateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY for /api/generate-sketch');
      return NextResponse.json({ error: 'Sketch service is not configured right now.' }, { status: 500 });
    }

    if (typeof imageBase64 !== 'string' || !imageBase64.trim()) {
      return NextResponse.json({ error: 'imageBase64 required' }, { status: 400 });
    }

    if (imageBase64.length > 12_000_000) {
      return NextResponse.json({ error: 'Image is too large. Please try a smaller photo.' }, { status: 413 });
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
            { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
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
