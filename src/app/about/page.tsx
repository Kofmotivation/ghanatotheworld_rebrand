import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { brand, campaigns, heroImage, radio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: brand.statement,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="font-display mt-3 text-[clamp(2.6rem,6vw,4.2rem)] leading-[1.05]">
              Our story
            </h1>
            <p className="mt-5 text-lg text-[var(--fg-soft)]">{brand.headline}</p>
          </Reveal>
          <Reveal delay={0.06} className="mt-8">
            <p className="text-base leading-relaxed text-[var(--fg-soft)] md:text-lg">
              {brand.statement}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="cta cta-filled">
              Shop
            </Link>
            <Link href="/contact" className="cta">
              Contact
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-muted)]">
            <Image
              src={heroImage}
              alt="GTTW"
              fill
              sizes="45vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {campaigns.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.03}>
            <Link
              href={`/campaigns/${c.slug}`}
              className="block border border-[var(--line)] bg-[var(--bg-elevated)] p-4 transition-colors hover:border-[var(--fg-soft)]"
            >
              <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
                {c.number}
              </p>
              <p className="font-display mt-2 text-xl">{c.title}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="eyebrow">GTTW Radio</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {radio.map((r) => (
            <div
              key={r.ep}
              className="border border-[var(--line)] bg-[var(--bg-elevated)] p-4"
            >
              <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
                Ep {r.ep}
              </p>
              <p className="font-display mt-2 text-xl">{r.title}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
