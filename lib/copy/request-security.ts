import { NextRequest, NextResponse } from 'next/server';

export function isSameOriginMutation(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const requestUrl = new URL(request.url);
      const protocol = request.headers.get('x-forwarded-proto') ?? requestUrl.protocol.replace(':', '');
      const forwardedHost = request.headers.get('x-forwarded-host');
      const host = forwardedHost ?? request.headers.get('host');
      const allowedOrigins = new Set([requestUrl.origin]);
      if (host) {
        allowedOrigins.add(`${protocol}://${host}`);
      }

      return allowedOrigins.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  return !fetchSite || fetchSite === 'same-origin' || fetchSite === 'none';
}

export function forbiddenMutationResponse() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
