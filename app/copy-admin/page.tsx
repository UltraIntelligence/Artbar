import { CopyAdmin } from '@/views/CopyAdmin';
import { getCopyEditorState } from '@/lib/copy/store';

export const metadata = {
  title: 'Copy Admin',
  robots: { index: false, follow: false },
};

export default async function CopyAdminPage() {
  const state = await getCopyEditorState();
  return <CopyAdmin {...state} />;
}
