import type { ManifestItem } from './image-manifest';
import { THEME_PAGE_IMAGE_PROMPT_ROWS } from '../data/theme-page-image-prompts';

const PROMPT_SUFFIX = ' No overlaid text, no watermarks, no brand logos in frame.';

/** 72 slots: `/themes/[slug]` hero, 4 examples, experience — filenames match `id`.jpg */
export const THEME_PAGE_MANIFEST_ITEMS: ManifestItem[] = THEME_PAGE_IMAGE_PROMPT_ROWS.map(({ id, prompt }) => ({
  id,
  publicUrl: `/media/generated/${id}.jpg`,
  prompt: prompt.trim() + PROMPT_SUFFIX,
  enabled: true,
  needsRevision: false,
}));
