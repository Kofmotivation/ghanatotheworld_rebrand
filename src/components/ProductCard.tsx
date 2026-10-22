"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { formatPrice } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="product-tile group block">
      <div className="product-frame relative aspect-[4/5] overflow-hidden bg-[var(--bg-muted)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain object-center p-4 md:p-5"
        />
        {product.soldOut ? (
          <span className="absolute top-3 left-3 text-[0.6rem] tracking-[0.12em] text-[var(--mist)] uppercase">
            Sold out
          </span>
        ) : null}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          {product.collection}
        </p>
        <p className="text-sm leading-snug">{product.name}</p>
        <p className="text-sm text-[var(--fg-soft)]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
