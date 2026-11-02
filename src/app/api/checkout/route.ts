import { NextResponse } from "next/server";
import {
  getPaymentProvider,
  isPaymentsConfigured,
  paymentsDisabledReason,
  getPaymentsConfig,
  type CheckoutCartLine,
} from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/checkout
 * Body: { lines: [{ slug, size, qty }], email? }
 * Creates a Stripe Checkout Session (or future provider) and returns { url }.
 */
export async function POST(request: Request) {
  const cfg = getPaymentsConfig();
  if (!isPaymentsConfigured(cfg)) {
    return NextResponse.json(
      { error: paymentsDisabledReason(cfg), configured: false },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const lines = b.lines as CheckoutCartLine[] | undefined;
  const email =
    typeof b.email === "string" && b.email.includes("@") ? b.email : undefined;

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://www.ghanatotheworld.com";

  try {
    const provider = getPaymentProvider();
    const session = await provider.createCheckoutSession({
      lines: lines || [],
      origin,
      customerEmail: email,
    });

    return NextResponse.json({
      ok: true,
      provider: session.provider,
      url: session.url,
      sessionId: session.sessionId,
    });
  } catch (e) {
    const status =
      e && typeof e === "object" && "status" in e
        ? Number((e as { status: number }).status)
        : 502;
    const message = e instanceof Error ? e.message : "Checkout failed";
    console.error({ scope: "payments", message: "checkout_failed", status });
    return NextResponse.json(
      { error: message },
      { status: status === 400 ? 400 : 502 },
    );
  }
}

/** Health / config probe — never leaks secrets */
export async function GET() {
  const cfg = getPaymentsConfig();
  return NextResponse.json({
    ok: true,
    configured: isPaymentsConfigured(cfg),
    provider: cfg.provider,
    enabled: cfg.enabled,
  });
}
