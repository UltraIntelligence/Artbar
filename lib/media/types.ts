export type MediaVariantFit = 'cover' | 'inside';
export type MediaVariantFormat = 'jpeg' | 'webp';

/** Generated output rendition from one staff-uploaded image. Not a separate upload target. */
export interface MediaVariantSpec {
  key: string;
  label: string;
  width?: number;
  height?: number;
  fit: MediaVariantFit;
  quality?: number;
  format: MediaVariantFormat;
  fallbackUrl?: string;
}

export interface MediaSlot {
  key: string;
  label: string;
  helpText?: string;
  pageKey: string;
  pageLabel: string;
  order: number;
  fallbackUrl: string;
  /** Staff upload types for this one image slot. First media-admin version is image-only. */
  acceptedMimeTypes: readonly string[];
  variants: MediaVariantSpec[];
  sourcePath?: string;
}

export interface MediaAsset {
  url: string;
  storagePath?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  sizeBytes?: number;
  alt?: string;
  uploadedAt?: string;
  original?: MediaAssetFile;
  renditions?: Record<string, MediaAssetFile>;
}

export interface MediaAssetFile {
  url: string;
  storagePath?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  sizeBytes?: number;
}

export interface MediaOverrideRecord {
  slotKey: string;
  draftAsset: MediaAsset | null;
  publishedAsset: MediaAsset | null;
  previousPublishedAsset: MediaAsset | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface MediaEditorSlotState {
  slot: MediaSlot;
  draftAsset: MediaAsset | null;
  publishedAsset: MediaAsset | null;
  previousPublishedAsset: MediaAsset | null;
  fallbackAsset: MediaAsset;
  isDirty: boolean;
  isConfigured: boolean;
}

export interface MediaEditorPageState {
  pageKey: string;
  pageLabel: string;
  slots: MediaEditorSlotState[];
}

export interface MediaEditorState {
  pages: MediaEditorPageState[];
  publishedMedia: PublishedMediaMap;
}

export type PublishedMediaMap = Record<string, MediaAsset>;
