"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto max-w-[720px] px-5 pt-14 pb-24 text-center md:px-8 md:pt-20">
      <p className="eyebrow">Checkout</p>
      <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.05]">
        Thank you
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[var(--fg-soft)]">
        Payment received. You’ll get a Stripe receipt by email. We’ll follow up
        on fulfillment separately. ALL SALES FINAL.
      </p>
      {sessionId ? (
        <p className="mt-4 text-[0.65rem] tracking-[0.08em] text-[var(--mist)] uppercase">
          Ref {sessionId.slice(0, 20)}…
        </p>
      ) : null}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="cta">
          Continue shopping
        </Link>
        <Link href="/" className="nav-link self-center">
          Home
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
          <p className="text-[var(--fg-soft)]">Confirming payment…</p>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
