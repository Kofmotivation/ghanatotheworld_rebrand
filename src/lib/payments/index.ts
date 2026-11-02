import { getPaymentsConfig } from "@/lib/payments/config";
import { stripePaymentProvider } from "@/lib/payments/stripe";
import type { PaymentProvider } from "@/lib/payments/types";

/**
 * Active payment provider. Today: Stripe only.
 * Later: switch on PAYMENT_PROVIDER (paypal, etc.) without rewriting cart UI.
 */
export function getPaymentProvider(): PaymentProvider {
  const cfg = getPaymentsConfig();
  switch (cfg.provider) {
    case "stripe":
    default:
      return stripePaymentProvider;
  }
}

export {
  getPaymentsConfig,
  isPaymentsConfigured,
  paymentsDisabledReason,
} from "@/lib/payments/config";
export type {
  CheckoutCartLine,
  CheckoutSessionResult,
  PaymentProvider,
} from "@/lib/payments/types";
