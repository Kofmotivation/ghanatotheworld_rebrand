"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { formatPrice } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  const hover = product.images[1] ?? product.image;

  return (
    <Link href={`/shop/${product.slug}`} className="collection-tile group block">
      <div className="product-frame relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain object-center p-5 transition-opacity duration-300 group-hover:opacity-0 md:p-7"
        />
        <Image
          src={hover}
          alt=""
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain object-center p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-7"
        />

        {/* HOE-style meta overlay — reveals on hover */}
        <div className="collection-tile-meta pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:p-4">
          <p className="text-[0.7rem] leading-snug uppercase tracking-[0.04em]">
            {product.name}
          </p>
          <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.04em]">
            {product.soldOut ? (
              <span className="line-through opacity-60">
                {formatPrice(product.price)}
              </span>
            ) : (
              formatPrice(product.price)
            )}
          </p>
        </div>

        {product.soldOut ? (
          <span className="absolute top-2 left-2 z-20 text-[0.6rem] tracking-[0.1em] uppercase opacity-70">
            Sold out
          </span>
        ) : null}
      </div>

      {/* Always-visible compact meta (mobile / no-hover) */}
      <div className="collection-tile-meta-static border-t border-[var(--gridline)] px-2 py-2 md:hidden">
        <p className="text-[0.68rem] uppercase tracking-[0.04em]">{product.name}</p>
        <p className="text-[0.68rem] uppercase tracking-[0.04em] text-[var(--fg-soft)]">
          {product.soldOut ? "Sold out" : formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
