import Image from "next/image";
import Link from "next/link";
import { ChapterScrubber } from "@/components/ChapterScrubber";
import { Reveal } from "@/components/Reveal";
import { brand, campaigns } from "@/lib/content";

export default function HomePage() {
  const lead = campaigns[0];

  return (
    <>
      {/* Chapter 01 full-bleed */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <Image
          src={lead.image}
          alt={lead.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.5)_0%,rgba(11,11,12,0.2)_40%,rgba(11,11,12,0.88)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="chapter-num text-sm tracking-[0.2em]">
            {lead.number} / {campaigns.length.toString().padStart(2, "0")}
          </p>
          <h1 className="font-display mt-3 text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-wide">
            {brand.name}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-[var(--bone)] md:text-xl">
            {lead.tagline}
          </p>
          <p className="mt-3 max-w-md text-sm text-[var(--mist)]">
            Seasons as cinema — walk the chapter, then shop the look.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/campaigns/${lead.slug}`} className="cta cta-indigo">
              Enter campaign
            </Link>
            <Link href="/looks" className="cta">
              View looks
            </Link>
          </div>
        </div>
      </section>

      <ChapterScrubber sticky />

      {/* Stacked campaign chapters */}
      {campaigns.slice(0, 4).map((c, i) => (
        <section
          key={c.slug}
          id={c.slug}
          className="relative min-h-[85svh] overflow-hidden border-t border-[var(--line)]"
        >
          <Image
            src={c.image}
            alt={c.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              i % 2 === 0
                ? "bg-[linear-gradient(90deg,rgba(11,11,12,0.88),rgba(11,11,12,0.25))]"
                : "bg-[linear-gradient(270deg,rgba(11,11,12,0.88),rgba(11,11,12,0.25))]"
            }`}
          />
          <div
            className={`relative z-10 mx-auto flex min-h-[85svh] max-w-[1440px] items-end px-5 py-16 md:px-8 ${
              i % 2 === 0 ? "" : "md:justify-end"
            }`}
          >
            <Reveal className="max-w-lg">
              <p className="chapter-num text-sm tracking-[0.2em]">
                Chapter {c.number}
              </p>
              <h2 className="font-display mt-2 text-5xl tracking-wide md:text-7xl">
                {c.title}
              </h2>
              <p className="mt-2 text-xs tracking-[0.16em] text-[var(--mist)] uppercase">
                {c.season}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--mist)]">
                {c.tagline}
              </p>
              <Link
                href={`/campaigns/${c.slug}`}
                className="cta cta-indigo mt-8 inline-flex"
              >
                Open chapter
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">The brand</p>
          <h2 className="font-display mt-4 max-w-4xl text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-wide normal-case !text-transform-none">
            <span className="font-display tracking-wide uppercase">
              Mission
            </span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--bone)] md:text-lg">
            {brand.statement}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/campaigns" className="cta cta-indigo">
              All campaigns
            </Link>
            <Link href="/about" className="cta">
              Brand story
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
