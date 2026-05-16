import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { getMediaSlot } from '@/lib/media/slots';
import { processMediaImageUpload } from '@/lib/media/processor';
import {
  getMediaEditorState,
  isMediaBackendConfigured,
  saveDraftMediaAsset,
  uploadProcessedMediaFile,
} from '@/lib/media/store';
import type { MediaAsset } from '@/lib/media/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sanitizePathSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function assignUploadedFileUrls(
  asset: MediaAsset,
  fileKey: string,
  storagePath: string,
  publicUrl: string,
) {
  if (fileKey === 'original' && asset.original) {
    asset.original.url = publicUrl;
    asset.original.storagePath = storagePath;
    return;
  }

  const rendition = asset.renditions?.[fileKey];
  if (rendition) {
    rendition.url = publicUrl;
    rendition.storagePath = storagePath;
    asset.url ||= publicUrl;
    asset.storagePath ||= storagePath;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Please log in to upload site images.' }, { status: 401 });
  }

  if (!isMediaBackendConfigured()) {
    return NextResponse.json({ error: 'Media storage is not configured.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const slotKey = String(formData.get('slotKey') || '');
    const alt = String(formData.get('alt') || '').trim();
    const file = formData.get('file');
    const slot = getMediaSlot(slotKey);

    if (!slot) {
      return NextResponse.json({ error: 'That image slot was not found.' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please choose an image to upload.' }, { status: 400 });
    }

    const uploadedAt = new Date().toISOString();
    const processed = await processMediaImageUpload(
      Buffer.from(await file.arrayBuffer()),
      file.type,
      slot,
      alt || slot.label,
      uploadedAt,
    );

    const uploadId = randomUUID();
    const slotPath = sanitizePathSegment(slot.key);

    for (const processedFile of processed.files) {
      const storagePath = `${slotPath}/${uploadId}/${processedFile.key}.${processedFile.extension}`;
      const publicUrl = await uploadProcessedMediaFile(
        storagePath,
        processedFile.buffer,
        processedFile.mimeType ?? 'application/octet-stream',
      );
      assignUploadedFileUrls(processed.asset, processedFile.key, storagePath, publicUrl);
    }

    const asset = await saveDraftMediaAsset(slot.key, processed.asset);
    return NextResponse.json({
      asset,
      state: await getMediaEditorState(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload the image.' },
      { status: 500 },
    );
  }
}
