"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { formatPrice } from "@/lib/content";

type Props = {
  product: Product;
  /** editorial = Mowalola-inspired image-first shop tile */
  variant?: "editorial" | "grid";
};

export function ProductCard({ product, variant = "grid" }: Props) {
  const hover = product.images[1] ?? product.image;
  const editorial = variant === "editorial";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={
        editorial
          ? "shop-tile group block"
          : "collection-tile group block"
      }
    >
      <div
        className={
          editorial
            ? "product-frame shop-tile-frame relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg)]"
            : "product-frame relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg)]"
        }
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className={
            editorial
              ? "object-contain object-center p-4 transition-opacity duration-500 group-hover:opacity-0 md:p-6"
              : "object-contain object-center p-5 transition-opacity duration-300 group-hover:opacity-0 md:p-7"
          }
        />
        <Image
          src={hover}
          alt=""
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className={
            editorial
              ? "object-contain object-center p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6"
              : "object-contain object-center p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-7"
          }
        />

        {product.soldOut ? (
          <span
            className={
              editorial
                ? "absolute top-3 left-3 z-20 text-[0.6rem] tracking-[0.12em] text-[var(--mist)] uppercase"
                : "absolute top-2 left-2 z-20 text-[0.6rem] tracking-[0.1em] uppercase opacity-70"
            }
          >
            Sold out
          </span>
        ) : null}

        {!editorial ? (
          <div className="collection-tile-meta pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:p-4">
            <p className="text-[0.7rem] leading-snug tracking-[0.04em] uppercase">
              {product.name}
            </p>
            <p className="mt-0.5 text-[0.7rem] tracking-[0.04em] uppercase">
              {product.soldOut ? (
                <span className="line-through opacity-60">
                  {formatPrice(product.price)}
                </span>
              ) : (
                formatPrice(product.price)
              )}
            </p>
          </div>
        ) : null}
      </div>

      {editorial ? (
        <>
          {/* Desktop: meta reveals under image on hover */}
          <div className="shop-tile-meta mt-3 hidden px-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
            <p className="text-[0.72rem] leading-snug tracking-[0.06em] uppercase">
              {product.name}
            </p>
            <p className="mt-1 text-[0.72rem] tracking-[0.06em] text-[var(--fg-soft)] uppercase">
              {product.soldOut ? "Sold out" : formatPrice(product.price)}
            </p>
          </div>
          {/* Mobile: always show quiet meta (no hover) */}
          <div className="shop-tile-meta mt-2 px-0.5 md:hidden">
            <p className="text-[0.68rem] leading-snug tracking-[0.05em] uppercase">
              {product.name}
            </p>
            <p className="mt-0.5 text-[0.68rem] tracking-[0.05em] text-[var(--fg-soft)] uppercase">
              {product.soldOut ? "Sold out" : formatPrice(product.price)}
            </p>
          </div>
        </>
      ) : (
        <div className="collection-tile-meta-static border-t border-[var(--gridline)] px-2 py-2 md:hidden">
          <p className="text-[0.68rem] tracking-[0.04em] uppercase">
            {product.name}
          </p>
          <p className="text-[0.68rem] tracking-[0.04em] text-[var(--fg-soft)] uppercase">
            {product.soldOut ? "Sold out" : formatPrice(product.price)}
          </p>
        </div>
      )}
    </Link>
  );
}
