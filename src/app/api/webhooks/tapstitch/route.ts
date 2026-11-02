import { NextResponse } from "next/server";
import { getTapstitchConfig } from "@/lib/tapstitch/config";
import { tapstitchLog } from "@/lib/tapstitch/client";
import { verifyTapstitchWebhook } from "@/lib/tapstitch/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/tapstitch
 *
 * Receives Tapstitch fulfillment / status webhooks.
 * Configure callback URL in Developer Portal → Webhooks:
 *   https://<your-domain>/api/webhooks/tapstitch
 *
 * Event types (body.type): order_created, order_paid, order_in_production,
 * order_fulfilled, order_canceled, shipment_shipped, shipment_delivered, …
 *
 * Signature: set TAPSTITCH_WEBHOOK_SECRET to the portal `secret_key`.
 * Confirm header name via portal simulator (`signature_sample`).
 */
export async function POST(request: Request) {
  const cfg = getTapstitchConfig();
  const rawBody = await request.text();

  const verified = verifyTapstitchWebhook(rawBody, request.headers, cfg);
  if (!verified.ok) {
    tapstitchLog("warn", "webhook_signature_failed", {
      reason: verified.reason,
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { type?: string; id?: string; data?: unknown } = {};
  try {
    event = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = typeof event.type === "string" ? event.type : "unknown";

  // Intentionally no PII — only event type + presence flags.
  tapstitchLog("info", "webhook_received", {
    type,
    hasData: event.data != null,
    signature: verified.reason,
  });

  /**
   * Hook for order status sync (KV / DB) when GTTW adds persistence.
   * Keep handler fast — Tapstitch expects a quick 2xx.
   */
  switch (type) {
    case "order_fulfilled":
    case "shipment_shipped":
    case "shipment_delivered":
    case "order_canceled":
    case "order_paid":
    case "order_in_production":
    case "order_created":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true, type });
}

/** Health / webhook challenge probe */
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/webhooks/tapstitch",
    hint: "Configure this URL in Tapstitch Developer Portal → Webhooks",
  });
}
