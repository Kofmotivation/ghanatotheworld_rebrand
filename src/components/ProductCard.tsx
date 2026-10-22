"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href="/shop" className="product-tile group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-muted)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover object-center"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          {product.collection}
        </p>
        <p className="text-sm leading-snug">{product.name}</p>
      </div>
    </Link>
  );
}
