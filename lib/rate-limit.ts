// Resets on cold start; not shared across instances. For production, swap the
// module-level `buckets` Map for Vercel KV / Upstash behind the same signature.

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
