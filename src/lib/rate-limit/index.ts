import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function createRedisLimiter(prefix: string, maxRequests: number) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxRequests, "1 m"),
    prefix,
    analytics: true,
  });
}

// In-memory fallback for development without Upstash
class MemoryRateLimiter {
  private requests = new Map<string, { count: number; resetAt: number }>();

  constructor(private maxRequests: number) {}

  async limit(identifier: string) {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetAt) {
      this.requests.set(identifier, { count: 1, resetAt: now + 60000 });
      return { success: true, limit: this.maxRequests, remaining: this.maxRequests - 1, reset: now + 60000 };
    }

    entry.count++;
    const remaining = Math.max(0, this.maxRequests - entry.count);
    return {
      success: entry.count <= this.maxRequests,
      limit: this.maxRequests,
      remaining,
      reset: entry.resetAt,
    };
  }
}

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL;

export const anonymousLimiter = hasUpstash
  ? createRedisLimiter("ratelimit:anon", 10)
  : new MemoryRateLimiter(10);

export const authenticatedLimiter = hasUpstash
  ? createRedisLimiter("ratelimit:auth", 30)
  : new MemoryRateLimiter(30);
