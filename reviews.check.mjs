// The one check for the review flow (rules.md §2), zero-dep.
// Run: npm run build && npm run start, then (with the same env the server has):
//   MODERATION_SECRET=$(...) BASE_URL=http://127.0.0.1:3000 node reviews.check.mjs
// Exercises the full store→moderate→retrieve cycle end to end and cleans up
// after itself (rejects its own test review), so it is safely re-runnable.
// Exits nonzero on any failure. Needs a reachable Upstash Redis — a storage
// failure surfaces as 502 here, not a false pass.
import assert from "node:assert";
import crypto from "node:crypto";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const secret = process.env.MODERATION_SECRET;
if (!secret) {
  console.error("reviews.check: MODERATION_SECRET must be set (same value as the server)");
  process.exit(1);
}

const slug = "chocolate-mix";
const ip = crypto.randomUUID(); // fresh rate-limit bucket per run — never pollutes a real IP
const sign = (id, action) => crypto.createHmac("sha256", secret).update(id + action).digest("hex");

const post = (body) =>
  fetch(`${base}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
const moderate = (id, action, sig) =>
  fetch(`${base}/api/reviews/moderate?id=${id}&action=${action}&sig=${sig}`);
const feed = async () => {
  const r = await fetch(`${base}/api/reviews/${slug}`);
  assert.equal(r.status, 200, "GET feed must be 200");
  return r.json();
};

const before = await feed();

// validation: the server is the trust boundary
assert.equal((await post({ product: slug, name: "X", rating: 9, comment: "hi" })).status, 400, "bad rating must 400");
assert.equal((await post({ product: "no-such-mix", name: "X", rating: 4, comment: "hi" })).status, 400, "bad slug must 400");

// honeypot: silent 200, stores nothing
assert.equal(
  (await post({ product: slug, name: "Bot", rating: 5, comment: "spam", company: "Bot Corp" })).status,
  200,
  "honeypot must 200",
);
assert.equal((await feed()).count, before.count, "honeypot must store nothing");

// valid submission: 200 with id, but pending → invisible
const nonce = `check-${Date.now()}`;
const valid = await post({ product: slug, name: "Review Check", rating: 5, comment: nonce });
assert.equal(valid.status, 200, "valid submission must 200");
const { id } = await valid.json();
assert.ok(id, "valid submission must return an id");
assert.equal((await feed()).count, before.count, "pending review must be invisible");

// moderation link with a bad signature is rejected
assert.equal((await moderate(id, "approve", "deadbeef")).status, 401, "bad sig must 401");
assert.equal((await feed()).count, before.count, "review must stay invisible after bad sig");

// moderation with a locally-computed valid signature approves it
assert.equal((await moderate(id, "approve", sign(id, "approve"))).status, 200, "approve must 200");
const after = await feed();
assert.equal(after.count, before.count + 1, "approved review must be visible");
const mine = after.reviews.find((r) => r.comment === nonce);
assert.ok(mine && mine.rating === 5 && mine.name === "Review Check", "approved review must carry the submitted fields");
const expectedAvg = Math.round((after.reviews.reduce((s, r) => s + r.rating, 0) / after.count) * 10) / 10;
assert.equal(after.average, expectedAvg, "average must match the returned reviews");

// cleanup: reject the test review so the store is left as found
assert.equal((await moderate(id, "reject", sign(id, "reject"))).status, 200, "cleanup reject must 200");
assert.equal((await feed()).count, before.count, "store must be restored after cleanup");

console.log(`reviews.check: all assertions passed (approved review visible with avg ${after.average}, then cleaned up)`);
