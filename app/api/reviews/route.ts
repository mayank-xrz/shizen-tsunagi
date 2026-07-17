import { Resend } from "resend";
import { products } from "@/data/products";
import {
  validateReview,
  redis,
  redisPipeline,
  sign,
  RATE_LIMIT,
  RATE_WINDOW,
  type Review,
} from "./store";

const TO = "stsales@shizentsunagi.com";
// ponytail: sandbox sender until shizentsunagi.com is verified in Resend
// (Phase 3.5) — then switch to notify@shizentsunagi.com. Mirrors notify/route.
const FROM = "onboarding@resend.dev";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (body?.company) return Response.json({ ok: true }); // honeypot: silent drop

  const review = validateReview(body);
  if (!review) return Response.json({ ok: false }, { status: 400 });

  // rate limit + store: any Redis failure is 502, never a fake success
  try {
    const ip = (
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "local"
    )
      .split(",")[0]
      .trim();
    const count = (await redis(["INCR", `ratelimit:${ip}`])) as number;
    if (count === 1) await redis(["EXPIRE", `ratelimit:${ip}`, RATE_WINDOW]);
    if (count > RATE_LIMIT) return Response.json({ ok: false }, { status: 429 });

    await redisPipeline([
      ["SET", `review:${review.id}`, JSON.stringify(review)],
      ["RPUSH", `reviews:${review.product}`, review.id],
    ]);
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }

  // email is best-effort: the review is safely stored pending. A send failure
  // must not fail the request (the visitor did their part) — it only strands
  // the review invisible until re-moderated. ponytail: revisit if it bites.
  const origin = new URL(request.url).origin;
  await sendModerationEmail(review, origin).catch(() => {});

  return Response.json({ ok: true, id: review.id });
}

async function sendModerationEmail(review: Review, origin: string) {
  if (!process.env.RESEND_API_KEY) return;
  const product = products.find((p) => p.slug === review.product);
  const link = (action: string) =>
    `${origin}/api/reviews/moderate?id=${review.id}&action=${action}&sig=${sign(review.id, action)}`;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    to: TO,
    from: FROM,
    subject: `Review to moderate: ${product?.name ?? review.product}`,
    text: [
      `${review.name} left a ${review.rating}-star review for ${product?.name ?? review.product}:`,
      "",
      review.comment,
      "",
      `Approve: ${link("approve")}`,
      `Reject:  ${link("reject")}`,
    ].join("\n"),
  });
}
