import { getProduct, type Product } from "@/lib/content";
import type { CheckoutCartLine } from "@/lib/payments/types";

export type ResolvedLine = {
  product: Product;
  size: string;
  qty: number;
  /** Stripe unit_amount in the smallest currency unit (cents). */
  unitAmountCents: number;
};

/** Validate cart against server catalog — never trust client prices. */
export function resolveCheckoutLines(
  lines: CheckoutCartLine[],
): { ok: true; items: ResolvedLine[] } | { ok: false; error: string } {
  if (!Array.isArray(lines) || lines.length < 1) {
    return { ok: false, error: "Cart is empty" };
  }

  const items: ResolvedLine[] = [];

  for (const [i, line] of lines.entries()) {
    if (!line || typeof line !== "object") {
      return { ok: false, error: `Invalid line at index ${i}` };
    }
    if (typeof line.slug !== "string" || !line.slug) {
      return { ok: false, error: `line[${i}].slug is required` };
    }
    if (typeof line.size !== "string" || !line.size) {
      return { ok: false, error: `line[${i}].size is required` };
    }
    const qty = Number(line.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      return { ok: false, error: `line[${i}].qty must be 1–20` };
    }

    const product = getProduct(line.slug);
    if (!product) {
      return { ok: false, error: `Unknown product: ${line.slug}` };
    }
    if (product.soldOut) {
      return { ok: false, error: `${product.name} is sold out` };
    }
    if (!product.sizes.includes(line.size)) {
      return {
        ok: false,
        error: `Size ${line.size} unavailable for ${product.name}`,
      };
    }

    const unitAmountCents = Math.round(product.price * 100);
    if (unitAmountCents < 50) {
      return { ok: false, error: `Invalid price for ${product.name}` };
    }

    items.push({
      product,
      size: line.size,
      qty,
      unitAmountCents,
    });
  }

  return { ok: true, items };
}
