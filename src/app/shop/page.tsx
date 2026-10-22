import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { categories, collections, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description: "GTTW collections — S/S ‘21, Essentials, Autumn/Winter ‘22.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <Reveal>
        <p className="nav-link !text-[var(--gold)]">Shop</p>
        <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-tight">
          Collections
        </h1>
        <p className="mt-5 max-w-xl text-[var(--mist)]">
          Autumn/Winter ‘22 · Essentials · S/S ‘21 — product names and imagery from
          the live GTTW shop.
        </p>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-y border-[var(--line)] py-4 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
        {collections.map((c) => (
          <span key={c.slug}>{c.title}</span>
        ))}
        <span className="text-[var(--gold)]">·</span>
        {categories.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
        ALL SALES FINAL · Prices available on request / live checkout
      </Reveal>
    </div>
  );
}
