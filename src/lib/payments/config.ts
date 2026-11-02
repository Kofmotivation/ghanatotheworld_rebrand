/**
 * Payments config — Stripe first; other providers can plug in later via PAYMENT_PROVIDER.
 * Site boots without keys; checkout returns 503 until enabled + secret set.
 */

export type PaymentsConfig = {
  enabled: boolean;
  provider: "stripe";
  stripeSecretKey: string | null;
  stripeWebhookSecret: string | null;
  /** Optional publishable key for future Elements (Checkout redirect does not need it). */
  stripePublishableKey: string | null;
  currency: string;
};

function truthy(v: string | undefined): boolean {
  if (!v) return false;
  return ["1", "true", "yes", "on"].includes(v.trim().toLowerCase());
}

export function getPaymentsConfig(): PaymentsConfig {
  const providerRaw = (
    process.env.PAYMENT_PROVIDER || "stripe"
  ).trim().toLowerCase();

  return {
    enabled: truthy(process.env.PAYMENTS_ENABLED),
    provider: providerRaw === "stripe" ? "stripe" : "stripe",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY?.trim() || null,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET?.trim() || null,
    stripePublishableKey:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || null,
    currency: (process.env.PAYMENTS_CURRENCY || "usd").trim().toLowerCase(),
  };
}

export function isPaymentsConfigured(cfg = getPaymentsConfig()): boolean {
  if (!cfg.enabled) return false;
  if (cfg.provider === "stripe") return Boolean(cfg.stripeSecretKey);
  return false;
}

export function paymentsDisabledReason(cfg = getPaymentsConfig()): string {
  if (!cfg.enabled) {
    return "Payments are disabled. Set PAYMENTS_ENABLED=true in Vercel env.";
  }
  if (cfg.provider === "stripe" && !cfg.stripeSecretKey) {
    return "Stripe secret key missing. Set STRIPE_SECRET_KEY.";
  }
  return "Payments are not configured.";
}
