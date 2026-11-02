/** Shared checkout types — provider-agnostic so Stripe can be swapped/extended. */

export type CheckoutCartLine = {
  slug: string;
  size: string;
  qty: number;
};

export type CheckoutSessionResult = {
  provider: "stripe" | "paypal" | "other";
  url: string;
  sessionId: string;
};

export type PaymentProviderId = "stripe";

export type CreateCheckoutInput = {
  lines: CheckoutCartLine[];
  origin: string;
  customerEmail?: string;
};

export interface PaymentProvider {
  id: PaymentProviderId;
  createCheckoutSession(
    input: CreateCheckoutInput,
  ): Promise<CheckoutSessionResult>;
}
