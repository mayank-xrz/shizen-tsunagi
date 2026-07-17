import { redis, redisPipeline, verify, type Review } from "../store";

// Owner-facing moderation via HMAC-signed email links (architecture.md §9).
// Returns a plain confirmation page — no styling, no color literals; it is seen
// only by the owner after clicking a link in the moderation email.
function page(title: string, message: string, status: number) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1.5rem;line-height:1.6"><h1>${title}</h1><p>${message}</p></body></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  const action = searchParams.get("action") ?? "";
  const sig = searchParams.get("sig") ?? "";

  if (action !== "approve" && action !== "reject") {
    return page("Invalid link", "This moderation link is malformed.", 400);
  }
  if (!verify(id, action, sig)) {
    return page("Invalid link", "This moderation link could not be verified.", 401);
  }

  try {
    const raw = (await redis(["GET", `review:${id}`])) as string | null;
    if (!raw) {
      return page("Already handled", "This review is no longer pending.", 200);
    }
    const review = JSON.parse(raw) as Review;

    if (action === "approve") {
      review.status = "approved";
      await redis(["SET", `review:${id}`, JSON.stringify(review)]);
      return page("Review approved", `The review by ${escapeHtml(review.name)} is now visible.`, 200);
    }

    await redisPipeline([
      ["DEL", `review:${id}`],
      ["LREM", `reviews:${review.product}`, 0, id],
    ]);
    return page("Review rejected", "The review has been removed.", 200);
  } catch {
    return page("Something went wrong", "Please try the link again.", 502);
  }
}
