import { NextRequest, NextResponse } from 'next/server';
import {
  COPY_ADMIN_COOKIE,
  COPY_ADMIN_PATH,
  COPY_ADMIN_SESSION_MAX_AGE,
} from '@/lib/copy/defaults';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSessionSecret() {
  return process.env.COPY_ADMIN_SESSION_SECRET || '';
}

function base64UrlEncode(value: string) {
  const base64 = btoa(String.fromCharCode(...encoder.encode(value)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4 || 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return decoder.decode(bytes);
}

async function signValue(value: string) {
  const secret = getSessionSecret();
  if (!secret) {
    return '';
  }
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  const bytes = new Uint8Array(signature);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function createAdminSessionToken() {
  const payload = {
    exp: Date.now() + COPY_ADMIN_SESSION_MAX_AGE * 1000,
  };
  const raw = base64UrlEncode(JSON.stringify(payload));
  const signature = await signValue(raw);
  return `${raw}.${signature}`;
}

export async function hasValidAdminSession(token: string | undefined | null) {
  if (!token) {
    return false;
  }
  const [raw, signature] = token.split('.');
  if (!raw || !signature) {
    return false;
  }

  const expected = await signValue(raw);
  if (!expected || signature !== expected) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(raw)) as { exp?: number };
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminRequestAuthenticated(request: NextRequest) {
  return hasValidAdminSession(request.cookies.get(COPY_ADMIN_COOKIE)?.value);
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(COPY_ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COPY_ADMIN_SESSION_MAX_AGE,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(COPY_ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export function getCopyAdminLoginUrl(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `${COPY_ADMIN_PATH}/login`;
  url.search = '';
  return url;
}
