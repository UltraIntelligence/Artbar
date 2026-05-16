import { MediaAdmin } from '@/views/MediaAdmin';
import { getMediaEditorState } from '@/lib/media/store';

export const metadata = {
  title: 'Image Admin',
  robots: { index: false, follow: false },
};

export default async function ImageAdminPage() {
  const state = await getMediaEditorState();
  return <MediaAdmin initialState={state} />;
}
