"use client";

import { useState } from "react";
import type { CartLine } from "@/components/cart/CartProvider";

type Props = {
  lines: CartLine[];
  disabled?: boolean;
};

export function CheckoutButton({ lines, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCheckout = async () => {
    if (!lines.length || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as {
        url?: string;
        error?: string;
        configured?: boolean;
      };
      if (!res.ok || !data.url) {
        setError(
          data.error ||
            (res.status === 503
              ? "Checkout isn’t enabled yet. Add Stripe keys in Vercel."
              : "Checkout failed. Try again."),
        );
        setLoading(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error starting checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <button
        type="button"
        className="cta"
        disabled={disabled || loading || !lines.length}
        onClick={onCheckout}
      >
        {loading ? "Redirecting…" : "Checkout with Stripe"}
      </button>
      {error ? (
        <p className="max-w-xs text-right text-[0.7rem] text-red-700/80">
          {error}
        </p>
      ) : null}
    </div>
  );
}
