"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { formatPrice } from "@/lib/content";
import { useCart } from "@/components/cart/CartProvider";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    if (product.soldOut) return;
    addItem(product.slug, size, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.68rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          Size
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-[2.75rem] border px-3 py-2 text-xs tracking-[0.08em] uppercase transition-colors ${
                size === s
                  ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                  : "border-[var(--line)] hover:border-[var(--fg-soft)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.68rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          Quantity
        </p>
        <div className="mt-3 inline-flex items-center border border-[var(--line)]">
          <button
            type="button"
            className="px-3 py-2 text-sm"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="min-w-[2rem] text-center text-sm">{qty}</span>
          <button
            type="button"
            className="px-3 py-2 text-sm"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          className="cta"
          disabled={product.soldOut}
          onClick={onAdd}
        >
          {product.soldOut
            ? "Sold out"
            : added
              ? "Added to cart"
              : `Add to cart — ${formatPrice(product.price)}`}
        </button>
        {!product.soldOut ? (
          <a
            href={product.cargoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
          >
            Buy on gttw.net
          </a>
        ) : (
          <a
            href={product.cargoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link self-center"
          >
            View on gttw.net
          </a>
        )}
        <Link href="/cart" className="nav-link self-center">
          View cart
        </Link>
      </div>

      <p className="text-[0.7rem] leading-relaxed text-[var(--mist)]">
        Checkout completes on the live GTTW Cargo shop (Stripe / PayPal). ALL
        SALES FINAL.
      </p>
    </div>
  );
}
