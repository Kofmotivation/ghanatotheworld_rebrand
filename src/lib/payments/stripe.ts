import Stripe from "stripe";
import {
  getPaymentsConfig,
  isPaymentsConfigured,
  paymentsDisabledReason,
} from "@/lib/payments/config";
import { resolveCheckoutLines } from "@/lib/payments/catalog";
import type {
  CreateCheckoutInput,
  CheckoutSessionResult,
  PaymentProvider,
} from "@/lib/payments/types";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const cfg = getPaymentsConfig();
  if (!cfg.stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(cfg.stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return stripeClient;
}

export const stripePaymentProvider: PaymentProvider = {
  id: "stripe",

  async createCheckoutSession(
    input: CreateCheckoutInput,
  ): Promise<CheckoutSessionResult> {
    const cfg = getPaymentsConfig();
    if (!isPaymentsConfigured(cfg)) {
      throw new Error(paymentsDisabledReason(cfg));
    }

    const resolved = resolveCheckoutLines(input.lines);
    if (!resolved.ok) {
      const err = new Error(resolved.error);
      (err as Error & { status: number }).status = 400;
      throw err;
    }

    const stripe = getStripe();
    const origin = input.origin.replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "GH",
          "NG",
          "FR",
          "DE",
          "NL",
          "BE",
          "IE",
          "AU",
          "NZ",
        ],
      },
      phone_number_collection: { enabled: true },
      line_items: resolved.items.map((item) => ({
        quantity: item.qty,
        price_data: {
          currency: cfg.currency,
          unit_amount: item.unitAmountCents,
          product_data: {
            name: item.product.name,
            description: `Size ${item.size} · ${item.product.collection}`,
            images: item.product.image ? [item.product.image] : undefined,
            metadata: {
              slug: item.product.slug,
              size: item.size,
            },
          },
        },
      })),
      metadata: {
        source: "gttw-site",
        line_count: String(resolved.items.length),
        slugs: resolved.items.map((i) => i.product.slug).join(",").slice(0, 450),
      },
      ...(input.customerEmail
        ? { customer_email: input.customerEmail }
        : {}),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return {
      provider: "stripe",
      url: session.url,
      sessionId: session.id,
    };
  },
};
