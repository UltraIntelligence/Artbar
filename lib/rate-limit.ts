/**
 * Simple in-memory rate limiter for API routes.
 * Tracks requests per IP within a sliding window.
 * Note: resets on cold start — sufficient for a low-traffic site.
 */

const store = new Map<string, number[]>();

export function rateLimit(
  ip: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter(t => now - t < windowMs);
  timestamps.push(now);
  store.set(ip, timestamps);

  const allowed = timestamps.length <= limit;
  return { allowed, remaining: Math.max(0, limit - timestamps.length) };
}
