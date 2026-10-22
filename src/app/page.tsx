import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  brand,
  collections,
  lookbookFeatureImage,
  products,
  radio,
} from "@/lib/content";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="nav-link !text-[var(--gold)]">The brand</p>
          <h2 className="font-display mt-4 max-w-4xl text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.1] tracking-tight">
            {brand.statement}
          </h2>
        </Reveal>
      </section>

      <div className="section-rule mx-auto max-w-[1400px]" />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="nav-link !text-[var(--gold)]">Collections</p>
            <h2 className="font-display mt-3 text-3xl md:text-5xl">Shop capsules</h2>
          </div>
          <Link href="/shop" className="cta w-fit">
            All products
          </Link>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link href="/shop" className="group block border-t border-[var(--line)] pt-6">
                <p className="text-xs tracking-[0.16em] text-[var(--mist)] uppercase">
                  Capsule 0{i + 1}
                </p>
                <h3 className="font-display mt-3 text-2xl transition-colors group-hover:text-[var(--gold)] md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mist)]">
                  {c.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
        <Reveal className="mb-10">
          <p className="nav-link !text-[var(--gold)]">Featured</p>
          <h2 className="font-display mt-3 text-3xl md:text-5xl">From the drop</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mt-16 min-h-[70vh] overflow-hidden md:mt-24">
        <Image
          src={lookbookFeatureImage}
          alt="GTTW lookbook"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.82),rgba(11,12,10,0.25))]" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1400px] items-end px-5 py-16 md:px-8">
          <Reveal>
            <p className="nav-link !text-[var(--gold)]">Lookbook</p>
            <h2 className="font-display mt-3 max-w-lg text-4xl md:text-6xl">
              Touch The Sky
            </h2>
            <p className="mt-4 max-w-md text-sm text-[var(--mist)] md:text-base">
              Editorial frames from Ghana To The World — culture worn, not staged.
            </p>
            <Link href="/lookbook" className="cta mt-8 inline-flex">
              Enter lookbook
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="nav-link !text-[var(--gold)]">GTTW Radio</p>
            <h2 className="font-display mt-3 text-3xl md:text-5xl">Mix archive</h2>
          </div>
        </Reveal>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {radio.map((r, i) => (
            <Reveal key={r.ep} delay={i * 0.05}>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <p className="font-display text-xl md:text-2xl">
                  Ep {r.ep} — {r.title}
                </p>
                <span className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
                  Mix
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
