import { createHmac, timingSafeEqual } from "crypto";
import type { TapstitchConfig } from "@/lib/tapstitch/config";

/**
 * Webhook signature verification.
 *
 * Tapstitch Developer Portal issues `secret_key` + `public_key` when you save
 * a webhook, and the simulator returns `signature_sample`. Exact header names
 * are confirmed in the portal simulator — we accept common variants.
 *
 * Env:
 * - TAPSTITCH_WEBHOOK_SECRET → HMAC-SHA256 hex of raw body (preferred when set)
 * - TAPSTITCH_WEBHOOK_PUBLIC_KEY → reserved for asymmetric verify (document in portal)
 *
 * If no secret is configured, verification is skipped (local/dev only). Production
 * should always set TAPSTITCH_WEBHOOK_SECRET.
 */

const SIGNATURE_HEADERS = [
  "x-tapstitch-signature",
  "x-pf-signature",
  "x-signature",
  "tapstitch-signature",
] as const;

export function readWebhookSignature(headers: Headers): string | null {
  for (const name of SIGNATURE_HEADERS) {
    const v = headers.get(name);
    if (v?.trim()) return v.trim();
  }
  // Some providers use `t=…,v1=…` Stripe-style — return raw for HMAC of body only path
  const alt = headers.get("x-tapstitch-signature-256");
  return alt?.trim() || null;
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length || ba.length === 0) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function safeEqualUtf8(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * @returns true if signature valid OR verification not configured
 * @returns false if secret configured but signature missing/invalid
 */
export function verifyTapstitchWebhook(
  rawBody: string,
  headers: Headers,
  cfg: TapstitchConfig,
): { ok: boolean; reason: string } {
  if (!cfg.webhookSecret) {
    return {
      ok: true,
      reason: "TAPSTITCH_WEBHOOK_SECRET unset — signature check skipped",
    };
  }

  const provided = readWebhookSignature(headers);
  if (!provided) {
    return {
      ok: false,
      reason: `Missing signature header (tried ${SIGNATURE_HEADERS.join(", ")})`,
    };
  }

  // Strip optional scheme prefixes: sha256=… / v1=…
  const token = provided.includes("=")
    ? provided.split(",").pop()?.split("=").pop()?.trim() || provided
    : provided;

  const digestHex = createHmac("sha256", cfg.webhookSecret)
    .update(rawBody, "utf8")
    .digest("hex");
  const digestB64 = createHmac("sha256", cfg.webhookSecret)
    .update(rawBody, "utf8")
    .digest("base64");

  if (
    safeEqualHex(token.toLowerCase(), digestHex) ||
    safeEqualUtf8(token, digestB64) ||
    safeEqualUtf8(provided, digestHex) ||
    safeEqualUtf8(provided, digestB64)
  ) {
    return { ok: true, reason: "hmac_ok" };
  }

  return { ok: false, reason: "Signature mismatch" };
}
