import "server-only";

/**
 * Lightweight spam protection for the public forms:
 * - honeypot field (checked by the schema),
 * - minimum time on the form,
 * - per-IP rate limit.
 *
 * The rate limit is in memory, so on serverless hosting it applies per
 * instance. That is enough to stop simple bots; add Cloudflare Turnstile or a
 * shared store (e.g. Upstash Redis) if spam becomes a problem.
 */

const MIN_FILL_MS = 3_000;
const MAX_AGE_MS = 1000 * 60 * 60 * 24; // a form left open for a day is stale
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function looksAutomated(startedAt: number, now: number) {
  const elapsed = now - startedAt;
  return elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS;
}

export function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

export function clientKey(h: Headers) {
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
