"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/content";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { lines, subtotal, setQty, removeItem, clear } = useCart();

  return (
    <div className="mx-auto max-w-[900px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <p className="eyebrow">Cart</p>
      <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] leading-[1.05]">
        Your bag
      </h1>

      {!lines.length ? (
        <div className="mt-12 space-y-6">
          <p className="text-[var(--fg-soft)]">Your cart is empty.</p>
          <Link href="/shop" className="cta inline-flex">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              return (
                <li
                  key={`${line.slug}-${line.size}`}
                  className="flex gap-4 py-6 md:gap-6"
                >
                  <Link
                    href={`/shop/${product.slug}`}
                    className="product-frame relative h-28 w-24 shrink-0 overflow-hidden bg-[var(--bg-muted)] md:h-36 md:w-28"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="120px"
                      className="object-contain object-center p-2"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="font-display text-xl leading-tight hover:opacity-70"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs tracking-[0.1em] text-[var(--mist)] uppercase">
                        Size {line.size}
                      </p>
                      <p className="mt-2 text-sm">{formatPrice(product.price)}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="inline-flex items-center border border-[var(--line)]">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          onClick={() =>
                            setQty(line.slug, line.size, line.qty - 1)
                          }
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          onClick={() =>
                            setQty(line.slug, line.size, line.qty + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="nav-link"
                        onClick={() => removeItem(line.slug, line.size)}
                      >
                        Remove
                      </button>
                      <a
                        href={product.cargoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link"
                      >
                        Buy on gttw.net
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] tracking-[0.12em] text-[var(--mist)] uppercase">
                Subtotal
              </p>
              <p className="font-display mt-1 text-3xl">{formatPrice(subtotal)}</p>
              <p className="mt-2 max-w-sm text-[0.7rem] text-[var(--mist)]">
                Payment runs on the live GTTW Cargo checkout (Stripe / PayPal).
                ALL SALES FINAL.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <button
                type="button"
                className="cta"
                onClick={() => {
                  const urls = lines
                    .map((l) => getProduct(l.slug)?.cargoUrl)
                    .filter(Boolean) as string[];
                  const unique = [...new Set(urls)];
                  unique.forEach((url, i) => {
                    window.setTimeout(() => {
                      window.open(url, "_blank", "noopener,noreferrer");
                    }, i * 200);
                  });
                }}
              >
                Checkout on gttw.net
              </button>
              <button type="button" className="nav-link" onClick={clear}>
                Clear cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
