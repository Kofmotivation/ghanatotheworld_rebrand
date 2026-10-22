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

  const filteredActive = Boolean(activeCampaign || category);

  return (
    <div className="shop-page bg-[var(--bg)]">
      <div className="shop-page-chrome px-4 pt-8 pb-2 md:px-10 md:pt-12 md:pb-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-[0.02em]">
            {title}
          </h1>
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
            {filtered.length} look{filtered.length === 1 ? "" : "s"}
            {filteredActive ? (
              <>
                {" · "}
                <Link href="/shop" className="hover:text-[var(--fg)]">
                  View all
                </Link>
              </>
            ) : null}
          </p>
        </div>

        {/* Collection filters — quiet uppercase row */}
        <nav
          className="shop-filters mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 md:mt-8"
          aria-label="Shop collections"
        >
          <Link
            href="/shop"
            className={`shop-filter-link${!chapter && !category ? " is-active" : ""}`}
          >
            All
          </Link>
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?chapter=${c.shopFilter}`}
              className={`shop-filter-link${
                chapter === c.shopFilter ? " is-active" : ""
              }`}
            >
              {c.title}
            </Link>
          ))}
        </nav>

        <nav
          className="shop-filters shop-filters--secondary mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pb-6 md:pb-8"
          aria-label="Shop categories"
        >
          {categories.map((c) => (
            <Link
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              className={`shop-filter-link shop-filter-link--quiet${
                category?.toLowerCase() === c.toLowerCase()
                  ? " is-active"
                  : ""
              }`}
            >
              {c}
            </Link>
          ))}
        </nav>
      </div>

      <ul className="shop-grid px-3 pb-16 md:px-8 md:pb-24">
        {filtered.map((p) => (
          <li key={p.slug} className="shop-grid-cell">
            <ProductCard product={p} variant="editorial" />
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="px-4 pb-20 text-sm text-[var(--mist)] md:px-10">
          No products in this view.{" "}
          <Link href="/shop" className="underline">
            View all
          </Link>
        </p>
      ) : null}
    </div>
  );
}
