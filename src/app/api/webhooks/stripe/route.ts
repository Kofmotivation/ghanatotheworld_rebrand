import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPaymentsConfig } from "@/lib/payments/config";
import { getStripe } from "@/lib/payments/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/stripe
 * Configure in Stripe Dashboard → Developers → Webhooks:
 *   https://<domain>/api/webhooks/stripe
 * Events: checkout.session.completed, checkout.session.async_payment_succeeded
 */
export async function POST(request: Request) {
  const cfg = getPaymentsConfig();
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!cfg.stripeWebhookSecret) {
    console.warn({
      scope: "stripe_webhook",
      message: "STRIPE_WEBHOOK_SECRET unset — rejecting",
    });
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 },
    );
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      cfg.stripeWebhookSecret,
    );
  } catch {
    console.warn({ scope: "stripe_webhook", message: "signature_failed" });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Safe log — no PII / card data
  console.info({
    scope: "stripe_webhook",
    type: event.type,
    id: event.id,
  });

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.info({
        scope: "stripe_webhook",
        message: "order_paid",
        sessionId: session.id,
        paymentStatus: session.payment_status,
        hasShipping: Boolean(session.shipping_details),
      });
      // Hook: create Tapstitch fulfillment order / store order record when ready.
      break;
    }
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/webhooks/stripe",
    hint: "Add this URL in Stripe Dashboard → Webhooks",
  });
}
