import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { aboutImage, brand, radio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Brand",
  description: brand.statement,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="nav-link !text-[var(--gold)]">Brand</p>
            <h1 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.95]">
              {brand.name}
            </h1>
            <p className="mt-6 text-lg text-[var(--mist)] md:text-xl">
              {brand.headline}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <p className="text-base leading-relaxed text-[var(--bone)] md:text-lg md:leading-relaxed">
              {brand.statement}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="cta cta-gold">
              Shop collections
            </Link>
            <Link href="/contact" className="cta">
              Get in touch
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ink-soft)]">
            <Image
              src={aboutImage}
              alt="GTTW brand portrait"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="section-rule my-20" />

      <Reveal>
        <p className="nav-link !text-[var(--gold)]">GTTW Radio</p>
        <h2 className="font-display mt-3 text-3xl md:text-4xl">Sound of the culture</h2>
        <p className="mt-4 max-w-xl text-sm text-[var(--mist)]">
          Mixes published on the live site — Ep 01 through Ep 04.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {radio.map((r, i) => (
          <Reveal key={r.ep} delay={i * 0.06}>
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-[var(--gold)] uppercase">
                Episode {r.ep}
              </p>
              <p className="font-display mt-3 text-xl">{r.title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
