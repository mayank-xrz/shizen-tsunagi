// The one check for the notify route (rules.md §2).
// Run: npm run build && npm run start, then in another shell: node notify.check.mjs
// Exits nonzero on any failure. The valid pair asserts NOT-400: 200 with a real
// RESEND_API_KEY (a real email goes to the admin inbox), 502 without one —
// either way validation accepted it.
import assert from "node:assert";

const url = "http://localhost:3000/api/notify";
const post = (body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const badEmail = await post({ email: "not-an-email", product: "chocolate-mix", company: "" });
assert.equal(badEmail.status, 400, "bad email must 400");

const badSlug = await post({ email: "check@example.com", product: "no-such-mix", company: "" });
assert.equal(badSlug.status, 400, "bad slug must 400");

const honeypot = await post({ email: "check@example.com", product: "chocolate-mix", company: "Bot Corp" });
assert.equal(honeypot.status, 200, "honeypot must silently 200");

const valid = await post({ email: "check@example.com", product: "chocolate-mix", company: "" });
assert.notEqual(valid.status, 400, "valid pair must pass validation");

console.log(`notify.check: all 4 assertions passed (valid pair → ${valid.status})`);
