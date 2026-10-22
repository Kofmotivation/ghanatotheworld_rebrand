import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { campaigns, categories, getProduct, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description: "GTTW collections — S/S ‘21, Essentials, Autumn/Winter ‘22.",
};

type Props = {
  searchParams: Promise<{ chapter?: string; category?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { chapter, category } = await searchParams;
  const activeCampaign = campaigns.find((c) => c.shopFilter === chapter);
  let filtered = activeCampaign
    ? activeCampaign.productSlugs
        .map((s) => getProduct(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : products;

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  const title = activeCampaign
    ? activeCampaign.title
    : category
      ? category
      : "All";

  return (
    <div className="bg-[var(--bg)]">
      {/* Compact collection chrome — HOE collections/all rhythm */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--gridline)] px-4 py-4 md:px-6">
        <div>
          <h1 className="font-display text-[1.65rem] leading-none tracking-[0.02em] md:text-[2rem]">
            {title}
          </h1>
          <p className="mt-1 text-[0.68rem] tracking-[0.1em] text-[var(--mist)] uppercase">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
            {activeCampaign || category ? (
              <>
                {" · "}
                <Link href="/shop" className="underline-offset-2 hover:underline">
                  Clear
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <p className="max-w-xs text-right text-[0.65rem] tracking-[0.08em] text-[var(--mist)] uppercase">
          ALL SALES FINAL
        </p>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--gridline)] px-4 py-3 text-[0.65rem] tracking-[0.12em] uppercase md:px-6">
        <Link
          href="/shop"
          className={!chapter && !category ? "text-[var(--fg)]" : "text-[var(--mist)] hover:text-[var(--fg)]"}
        >
          All
        </Link>
        {campaigns.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?chapter=${c.shopFilter}`}
            className={
              chapter === c.shopFilter
                ? "text-[var(--fg)]"
                : "text-[var(--mist)] hover:text-[var(--fg)]"
            }
          >
            {c.title}
          </Link>
        ))}
        <span className="text-[var(--gridline)]" aria-hidden>
          |
        </span>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/shop?category=${encodeURIComponent(c)}`}
            className={
              category?.toLowerCase() === c.toLowerCase()
                ? "text-[var(--fg)]"
                : "text-[var(--mist)] hover:text-[var(--fg)]"
            }
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Hairline collection grid */}
      <ul className="collection-grid">
        {filtered.map((p) => (
          <li key={p.slug} className="collection-grid-cell">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
