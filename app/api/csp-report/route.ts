import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const MAX_REPORT_BODY_LENGTH = 64_000;
const MAX_LOG_VALUE_LENGTH = 500;
const URL_REPORT_KEYS = new Set(['blocked-uri', 'document-uri', 'referrer', 'source-file']);

function truncate(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }
  return value.length > MAX_LOG_VALUE_LENGTH
    ? `${value.slice(0, MAX_LOG_VALUE_LENGTH)}...`
    : value;
}

function getRateLimitIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-vercel-forwarded-for') ??
    forwardedFor?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function sanitizeUrl(value: string): string {
  try {
    const url = new URL(value);
    return truncate(`${url.origin}${url.pathname}`) as string;
  } catch {
    return truncate(value) as string;
  }
}

function sanitizeString(key: string, value: string) {
  if (URL_REPORT_KEYS.has(key) || /^https?:\/\//i.test(value)) {
    return sanitizeUrl(value);
  }

  return truncate(value);
}

function sanitizeReport(value: unknown): unknown {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeReport);
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      typeof entry === 'object' && entry !== null
        ? sanitizeReport(entry)
        : typeof entry === 'string'
          ? sanitizeString(key, entry)
          : truncate(entry),
    ]),
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_REPORT_BODY_LENGTH) {
    return new NextResponse(null, { status: 204 });
  }

  const ip = getRateLimitIp(request);
  const { allowed } = await checkRateLimit('csp-report', ip, 60, 60);
  if (!allowed) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await request.text();
  if (!body || body.length > MAX_REPORT_BODY_LENGTH) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const parsed = JSON.parse(body);
    console.warn('[csp-report]', sanitizeReport(parsed));
  } catch {
    console.warn('[csp-report] received non-json report');
  }

  return new NextResponse(null, { status: 204 });
}
