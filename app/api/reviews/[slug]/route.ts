import { products } from "@/data/products";
import { redis, type Review } from "../store";

// GET approved reviews + average for one product (architecture.md §9).
// ponytail: filters status in the route — ceiling ~hundreds of reviews per
// product; index approved ids separately only if that's ever exceeded.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const ids = (await redis(["LRANGE", `reviews:${slug}`, 0, -1])) as string[];
    if (!ids || ids.length === 0) {
      return Response.json({ average: 0, count: 0, reviews: [] });
    }
    const raw = (await redis(["MGET", ...ids.map((id) => `review:${id}`)])) as (string | null)[];
    const approved = raw
      .map((r) => (r ? (JSON.parse(r) as Review) : null))
      .filter((r): r is Review => r !== null && r.status === "approved")
      .sort((a, b) => (a.ts < b.ts ? 1 : -1)); // newest first

    const count = approved.length;
    const average = count
      ? Math.round((approved.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10
      : 0;
    const reviews = approved.map(({ name, rating, comment, ts }) => ({
      name,
      rating,
      comment,
      ts,
    }));
    return Response.json({ average, count, reviews });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
