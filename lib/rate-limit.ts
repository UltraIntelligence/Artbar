import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const limiters = new Map<string, Ratelimit>();
let warnedMissingRedis = false;

function getLimiter(name: string, max: number, windowSec: number): Ratelimit | null {
  if (!redis) return null;
  const cacheKey = `${name}:${max}:${windowSec}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(max, `${windowSec} s`),
      prefix: `rl:${name}`,
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number;
};

/**
 * Sliding-window rate limit backed by Upstash Redis. Falls back to allow-all when
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are unset; this lets the route
 * stay up before the Upstash Marketplace integration is provisioned. A warning is
 * logged once per process in production so ops can see the gap.
 *
 * IP extraction relies on the leftmost x-forwarded-for value, which Vercel's edge
 * sets to the trusted client IP. If deployed behind a different proxy, callers must
 * sanitize the header before passing it here.
 */
export async function checkRateLimit(
  name: string,
  ip: string,
  max: number,
  windowSec: number,
): Promise<RateLimitResult> {
  const limiter = getLimiter(name, max, windowSec);
  if (!limiter) {
    if (process.env.NODE_ENV === 'production' && !warnedMissingRedis) {
      warnedMissingRedis = true;
      console.warn('[rate-limit] Upstash Redis not configured; allowing all requests');
    }
    return { allowed: true, remaining: -1, reset: 0 };
  }
  const result = await limiter.limit(ip);
  return { allowed: result.success, remaining: result.remaining, reset: result.reset };
}
