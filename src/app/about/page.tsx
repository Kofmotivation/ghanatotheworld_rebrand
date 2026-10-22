import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { brand, campaigns, heroImage, radio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Brand",
  description: brand.statement,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="nav-link !text-[var(--indigo)]">Brand</p>
            <h1 className="font-display mt-3 text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] tracking-wide">
              {brand.name}
            </h1>
            <p className="mt-6 text-lg text-[var(--mist)] md:text-xl">
              {brand.headline}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <p className="text-base leading-relaxed md:text-lg">
              {brand.statement}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
            <Link href="/campaigns" className="cta cta-indigo">
              Enter campaigns
            </Link>
            <Link href="/contact" className="cta">
              Contact
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ink-soft)]">
            <Image
              src={heroImage}
              alt="GTTW brand"
              fill
              sizes="45vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="section-rule my-20" />

      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">Campaign House</p>
        <h2 className="font-display mt-3 text-3xl tracking-wide md:text-4xl">
          Chapters
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {campaigns.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.04}>
            <Link
              href={`/campaigns/${c.slug}`}
              className="block border border-[var(--line)] p-4 transition-colors hover:border-[var(--indigo)]"
            >
              <p className="chapter-num text-xs">{c.number}</p>
              <p className="font-display mt-2 text-xl tracking-wide">{c.title}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="nav-link !text-[var(--indigo)]">GTTW Radio</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {radio.map((r) => (
            <div key={r.ep} className="border border-[var(--line)] p-4">
              <p className="text-xs tracking-[0.14em] text-[var(--indigo)] uppercase">
                Ep {r.ep}
              </p>
              <p className="font-display mt-2 text-xl tracking-wide">{r.title}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
