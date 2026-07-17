// Shared server helpers for the review flow (architecture.md §9). One module,
// not three copies — the Redis wire call and the HMAC pair are used by all
// three review routes (rules.md ladder rung 2: reuse before rewrite). Colocated
// in the feature folder; Next only treats route.ts/page.tsx as routes, so this
// is a plain module.
import crypto from "node:crypto";
import { products } from "@/data/products";

export const NAME_MAX = 40;
export const COMMENT_MAX = 500;
export const RATE_LIMIT = 5; // submissions per IP per window
export const RATE_WINDOW = 3600; // seconds

export type Review = {
  id: string;
  product: string;
  name: string;
  rating: number;
  comment: string;
  ts: string;
  status: "pending" | "approved";
};

function config() {
  // read under the spec names OR Vercel's Upstash-integration names (the write
  // token, never the read-only one) — the platform injects KV_* automatically
  // (architecture.md §7). Fixes the production 502: only KV_* deploy.
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("redis not configured");
  return { url, token };
}

// Upstash Redis over its REST API with plain fetch — no new dependency.
// Throws on any failure so callers map it to 502 (a storage failure never
// fakes success).
export async function redis(command: (string | number)[]) {
  const { url, token } = config();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.error) {
    throw new Error(json?.error ?? `redis ${res.status}`);
  }
  return json.result;
}

// Two-or-more writes in one round trip. Not transactional (Upstash pipeline
// isn't) — a partial failure throws → 502; the ponytail ceiling for an orphaned
// review:{id} without its list entry is acceptable pre-launch.
export async function redisPipeline(commands: (string | number)[][]) {
  const { url, token } = config();
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !Array.isArray(json)) throw new Error(`redis pipeline ${res.status}`);
  for (const r of json) if (r?.error) throw new Error(r.error);
  return json.map((r) => r.result);
}

// sig = HMAC-SHA256(id + action, MODERATION_SECRET) — architecture.md §9.
// reviews.check.mjs recomputes this exact formula to exercise moderation.
export function sign(id: string, action: string) {
  // fail-closed (architecture.md §9): never sign with an empty key — an
  // empty-key HMAC over the id (which POST returns) is forgeable by anyone.
  const secret = process.env.MODERATION_SECRET;
  if (!secret) throw new Error("MODERATION_SECRET not set");
  return crypto.createHmac("sha256", secret).update(id + action).digest("hex");
}

export function verify(id: string, action: string, sig: string) {
  try {
    const expected = Buffer.from(sign(id, action));
    const given = Buffer.from(sig ?? "");
    return expected.length === given.length && crypto.timingSafeEqual(expected, given);
  } catch {
    return false; // secret unset (or any error) → reject the link
  }
}

// The server is the trust boundary — every field re-checked here regardless of
// the client. Returns a ready-to-store pending Review, or null on any breach.
export function validateReview(body: unknown): Review | null {
  if (!body || typeof body !== "object") return null;
  const { product, name, rating, comment } = body as Record<string, unknown>;
  if (!products.some((p) => p.slug === product)) return null;
  if (typeof name !== "string" || name.trim().length === 0 || name.length > NAME_MAX) return null;
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) return null;
  if (typeof comment !== "string" || comment.trim().length === 0 || comment.length > COMMENT_MAX) {
    return null;
  }
  return {
    id: crypto.randomUUID(),
    product: product as string,
    name: name.trim(),
    rating,
    comment: comment.trim(),
    ts: new Date().toISOString(),
    status: "pending",
  };
}
