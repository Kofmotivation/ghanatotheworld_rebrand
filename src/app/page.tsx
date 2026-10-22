import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  brand,
  campaigns,
  homeCategories,
  products,
  radio,
} from "@/lib/content";

export default function HomePage() {
  const lead = campaigns[0];
  const featured = products.slice(0, 8);

  return (
    <>
      {/* Full-bleed collection hero — DP resort-collection rhythm */}
      <section className="relative min-h-[88svh] w-full overflow-hidden md:min-h-[92svh]">
        <Image
          src={lead.image}
          alt={lead.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_18%]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-scrim)" }}
        />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1400px] flex-col items-center justify-end px-5 pb-16 text-center text-white md:min-h-[92svh] md:pb-20">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase opacity-90">
            {lead.season} collection
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-wide">
            {lead.title}
          </h1>
          <p className="mt-4 max-w-md text-sm opacity-85 md:text-base">
            {lead.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/campaigns/${lead.slug}`}
              className="cta border-white text-white hover:bg-white hover:text-[#141414]"
            >
              Shop the collection
            </Link>
            <Link
              href="/looks"
              className="cta border-white/70 text-white hover:bg-white hover:text-[#141414]"
            >
              Shop the lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop by</p>
              <h2 className="font-display mt-2 text-3xl md:text-4xl">
                Categories
              </h2>
            </div>
            <Link href="/shop" className="nav-link hidden sm:inline">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {homeCategories.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.05}>
              <Link href={cat.href} className="category-tile group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-muted)]">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-center text-xs tracking-[0.14em] uppercase">
                  {cat.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-elevated)]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">New arrivals</p>
              <h2 className="font-display mt-2 text-3xl md:text-4xl">
                From the drop
              </h2>
            </div>
            <Link href="/shop" className="cta">
              Shop all
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.04}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collection band */}
      <section className="relative min-h-[60svh] overflow-hidden">
        <Image
          src={campaigns[1].image}
          alt={campaigns[1].title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-scrim)" }}
        />
        <div className="relative z-10 mx-auto flex min-h-[60svh] max-w-[1400px] items-end px-5 py-14 text-white md:px-8">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.18em] uppercase opacity-90">
              Collection
            </p>
            <h2 className="font-display mt-2 text-4xl md:text-6xl">
              {campaigns[1].title}
            </h2>
            <p className="mt-3 max-w-md text-sm opacity-85">
              {campaigns[1].tagline}
            </p>
            <Link
              href={`/campaigns/${campaigns[1].slug}`}
              className="cta mt-8 inline-flex border-white text-white hover:bg-white hover:text-[#141414]"
            >
              Explore
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Brand + Radio strip */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="font-display mt-3 text-3xl md:text-4xl">
            {brand.name}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--fg-soft)] md:text-base">
            {brand.statement}
          </p>
          <Link href="/about" className="cta mt-8 inline-flex">
            Read more
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">GTTW Radio</p>
          <h2 className="font-display mt-3 text-3xl md:text-4xl">
            Mix archive
          </h2>
          <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {radio.map((r) => (
              <li
                key={r.ep}
                className="flex items-baseline justify-between gap-4 py-3.5 text-sm"
              >
                <span>
                  Ep {r.ep} — {r.title}
                </span>
                <Link href="/radio" className="text-[var(--mist)] hover:text-[var(--fg)]">
                  Listen
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
