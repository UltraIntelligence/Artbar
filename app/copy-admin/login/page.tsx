import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { COPY_ADMIN_COOKIE, COPY_ADMIN_PATH } from '@/lib/copy/defaults';
import { hasValidAdminSession } from '@/lib/copy/session';

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  invalid: 'The password did not match. Please try again.',
  config: 'Copy admin is not configured yet. Add the required environment variables first.',
};

export const metadata = {
  title: 'Copy Admin Login',
  robots: { index: false, follow: false },
};

export default async function CopyAdminLoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COPY_ADMIN_COOKIE)?.value;
  if (await hasValidAdminSession(sessionToken)) {
    redirect(COPY_ADMIN_PATH);
  }

  const params = await searchParams;
  const error = params.error ? errorMessages[params.error] ?? errorMessages.invalid : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-artbar-bg px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-artbar-light-taupe/20 bg-white p-8 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-artbar-taupe">Private</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-artbar-navy">Japanese Copy Login</h1>
        <p className="mt-3 text-sm leading-6 text-artbar-gray">
          This editor is for the Artbar team only. Use the shared password to open the Japanese copy tool.
        </p>
        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}

        <form action="/api/copy-admin/login" method="post" className="mt-6 space-y-4">
          <label className="block text-sm font-bold text-artbar-navy">
            Shared password
            <input
              type="password"
              name="password"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none transition focus:border-artbar-taupe focus:ring-2 focus:ring-artbar-taupe/15"
              required
            />
          </label>
          <Button type="submit" variant="taupe" size="cta" className="w-full">
            Open Copy Editor
          </Button>
        </form>
      </div>
    </div>
  );
}
