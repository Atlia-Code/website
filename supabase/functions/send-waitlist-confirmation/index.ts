// Supabase Edge Function: send a plain-text waitlist confirmation email.
//
// Triggered by a Supabase Database Webhook on INSERT into public.waitlist.
// The webhook POSTs the new row; we authenticate the call with a shared secret
// header (the function URL is public) and send the email via the Resend API.
//
// Required secrets (set with `supabase secrets set`):
//   RESEND_API_KEY            - Resend API key with sending permission
//   WAITLIST_WEBHOOK_SECRET   - shared secret, also sent by the webhook as the
//                               `x-webhook-secret` header
//
// Deploy with:  supabase functions deploy send-waitlist-confirmation --no-verify-jwt

interface WaitlistRecord {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface WebhookPayload {
  type?: string;
  table?: string;
  record?: WaitlistRecord;
}

const FROM = "Atlia <founders@atlia.com>";
const REPLY_TO = "founders@atlia.com";

function confirmationText(firstName: string): string {
  const name = firstName ? ` ${firstName}` : "";
  return `Hi${name},

Thanks for joining the list — we'll be in contact soon.

If you have any questions, feel free to text us at (909) 729-6282 or (732) 610-3038.

Shaan and Edmond`;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Authenticate the webhook call against our shared secret.
  const expectedSecret = Deno.env.get("WAITLIST_WEBHOOK_SECRET");
  const providedSecret = req.headers.get("x-webhook-secret");
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not set");
    return new Response("Server not configured", { status: 500 });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const record = payload.record;
  const email = record?.email?.trim();
  if (!email) {
    console.error("No email in webhook payload", payload);
    return new Response("No email to send to", { status: 400 });
  }

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      reply_to: REPLY_TO,
      to: email,
      subject: "You're on the Atlia waitlist",
      text: confirmationText(record?.first_name?.trim() ?? ""),
    }),
  });

  if (!resendResp.ok) {
    const detail = await resendResp.text();
    console.error(`Resend error ${resendResp.status}: ${detail}`);
    // Non-2xx so the failure is visible in webhook/function logs. The signup is
    // already committed, so this does not affect the user joining the waitlist.
    return new Response("Failed to send email", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
