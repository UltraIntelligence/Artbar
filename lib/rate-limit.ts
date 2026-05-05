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
let warnedRedisFailure = false;

type LocalBucket = {
  reset: number;
  hits: number[];
};

const localBuckets = new Map<string, LocalBucket>();

function checkLocalRateLimit(name: string, ip: string, max: number, windowSec: number): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const key = `${name}:${max}:${windowSec}:${ip}`;
  const bucket = localBuckets.get(key) ?? { reset: now + windowMs, hits: [] };
  bucket.hits = bucket.hits.filter((hit) => now - hit < windowMs);

  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0] ?? now;
    bucket.reset = oldest + windowMs;
    localBuckets.set(key, bucket);
    return {
      allowed: false,
      remaining: 0,
      reset: bucket.reset,
    };
  }

  bucket.hits.push(now);
  bucket.reset = (bucket.hits[0] ?? now) + windowMs;
  localBuckets.set(key, bucket);

  if (localBuckets.size > 10_000) {
    const expiredBefore = now - windowMs;
    for (const [bucketKey, value] of localBuckets) {
      if (value.hits.every((hit) => hit < expiredBefore)) {
        localBuckets.delete(bucketKey);
      }
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, max - bucket.hits.length),
    reset: bucket.reset,
  };
}

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
 * Sliding-window rate limit backed by Upstash Redis. Falls back to a per-process
 * in-memory limiter when Redis is missing or briefly unavailable. That fallback is
 * not globally distributed across serverless instances, but it still protects the
 * common abuse path and avoids the previous allow-all behavior.
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
      console.warn('[rate-limit] Upstash Redis not configured; using local fallback limiter');
    }
    return checkLocalRateLimit(name, ip, max, windowSec);
  }
  try {
    const result = await limiter.limit(ip);
    return { allowed: result.success, remaining: result.remaining, reset: result.reset };
  } catch (error) {
    // Upstash network/transport failure: degrade to the same local limiter used
    // when Redis is not configured, instead of letting every request through.
    if (!warnedRedisFailure) {
      warnedRedisFailure = true;
      console.warn('[rate-limit] Upstash request failed; using local fallback limiter', error);
    }
    return checkLocalRateLimit(name, ip, max, windowSec);
  }
}
