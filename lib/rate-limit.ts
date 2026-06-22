// In-memory, per-instance rate limiter for the AI Espresso demo.
//
// This is intentionally simple: it resets on cold start and is not shared across
// serverless instances. For production abuse control, replace the module-level
// `buckets` map with a durable store (e.g. Vercel KV / Upstash Redis) behind the
// same `isRateLimited` signature.

type Bucket = { count: number; resetAt: number };

const DEFAULT_LIMIT = 10;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000;

const buckets = new Map<string, Bucket>();

export function isRateLimited(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
  now = Date.now(),
): boolean {
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > limit;
}

export function resetRateLimits(): void {
  buckets.clear();
}
