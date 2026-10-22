import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { campaigns, categories, getProduct, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description: "GTTW collections — S/S ‘21, Essentials, Autumn/Winter ‘22.",
};

type Props = { searchParams: Promise<{ chapter?: string }> };

export default async function ShopPage({ searchParams }: Props) {
  const { chapter } = await searchParams;
  const activeCampaign = campaigns.find((c) => c.shopFilter === chapter);

  const filtered = activeCampaign
    ? activeCampaign.productSlugs
        .map((s) => getProduct(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : products;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">Shop</p>
        <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-wide">
          {activeCampaign ? activeCampaign.title : "Collections"}
        </h1>
        <p className="mt-5 max-w-xl text-[var(--mist)]">
          {activeCampaign
            ? `Chapter filter — ${activeCampaign.season}.`
            : "Autumn/Winter ‘22 · Essentials · S/S ‘21 — product names from the live GTTW shop."}
        </p>
        {activeCampaign ? (
          <Link
            href="/shop"
            className="nav-link mt-4 inline-block !text-[var(--bone)]"
          >
            Clear filter
          </Link>
        ) : null}
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-4 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
        {campaigns.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?chapter=${c.shopFilter}`}
            className={`transition-colors hover:text-[var(--bone)] ${
              chapter === c.shopFilter ? "text-[var(--bone)]" : ""
            }`}
          >
            {c.title}
          </Link>
        ))}
        <span className="text-[var(--indigo)]">·</span>
        {categories.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.04}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
        ALL SALES FINAL · Prices not published on gttw.net crawl
      </Reveal>
    </div>
  );
}
