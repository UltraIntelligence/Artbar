import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { geminiImageGenerationConfig, resolveGeminiImageModel } from '@/lib/gemini-image-config';

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();

  if (!imageBase64) {
    return NextResponse.json({ error: 'imageBase64 required' }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const prompt = `
    Create a high-quality, black and white line drawing of this pet.
    Style: Realistic sketch, clean lines, white background.
    Focus on the facial features and fur texture.
    Do not add color. Make it look like a coloring book page.
  `;

  const response = await ai.models.generateContent({
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
  });

  const parts = response.candidates?.[0]?.content?.parts;
  const imagePart = parts?.find((p: any) => p.inlineData);

  if (!imagePart?.inlineData) {
    return NextResponse.json({ error: 'No image generated' }, { status: 500 });
  }

  return NextResponse.json({
    imageBase64: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || 'image/png',
  });
}
