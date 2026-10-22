import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
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

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <Reveal>
        <p className="eyebrow">Shop</p>
        <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05]">
          {activeCampaign ? activeCampaign.title : "All products"}
        </h1>
        <p className="mt-4 max-w-xl text-sm text-[var(--fg-soft)]">
          {activeCampaign
            ? `${activeCampaign.season} — full GTTW Cargo inventory for this chapter.`
            : `${products.length} pieces from gttw.net — S/S ‘21, Essentials, and more.`}
        </p>
        {activeCampaign || category ? (
          <Link href="/shop" className="nav-link mt-4 inline-block">
            Clear filters
          </Link>
        ) : null}
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-4 text-[0.68rem] tracking-[0.12em] text-[var(--mist)] uppercase">
        {campaigns.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?chapter=${c.shopFilter}`}
            className={`hover:text-[var(--fg)] ${
              chapter === c.shopFilter ? "text-[var(--fg)]" : ""
            }`}
          >
            {c.title}
          </Link>
        ))}
        <span className="text-[var(--line)]">|</span>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/shop?category=${encodeURIComponent(c)}`}
            className={`hover:text-[var(--fg)] ${
              category?.toLowerCase() === c.toLowerCase() ? "text-[var(--fg)]" : ""
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.03}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      <p className="mt-16 text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
        ALL SALES FINAL · Checkout on gttw.net Cargo shop
      </p>
    </div>
  );
}
