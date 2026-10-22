"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href="/shop" className="product-tile group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ink-soft)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover object-center"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm leading-snug">{product.name}</p>
          <p className="mt-1 text-xs tracking-[0.12em] text-[var(--mist)] uppercase">
            {product.collection}
          </p>
        </div>
        <span className="text-[0.65rem] tracking-[0.14em] text-[var(--indigo)] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View
        </span>
      </div>
    </Link>
  );
}
