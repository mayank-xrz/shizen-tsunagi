import { Resend } from "resend";
import { products } from "@/data/products";

const TO = "stsales@shizentsunagi.com";
// ponytail: sandbox sender until shizentsunagi.com is verified in Resend
// (Phase 3.5) — then switch to notify@shizentsunagi.com
const FROM = "onboarding@resend.dev";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const { email, product, company } = body ?? {};

  if (company) return Response.json({ ok: true }); // honeypot: silent drop

  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const match = products.find((p) => p.slug === product);
  if (!match) return Response.json({ ok: false }, { status: 400 });

  // client is created per request so a missing key can never fake a 200
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ ok: false }, { status: 502 });
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      to: TO,
      from: FROM,
      subject: `Notify request: ${match.name}`,
      text: `${email} asked to be notified about ${match.name} at ${new Date().toISOString()}`,
    });
    if (error) return Response.json({ ok: false }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
