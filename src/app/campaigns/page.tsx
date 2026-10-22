import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChapterScrubber } from "@/components/ChapterScrubber";
import { Reveal } from "@/components/Reveal";
import { campaigns } from "@/lib/content";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "GTTW campaign chapters — Touch The Sky, Fisherman, Essentials, A/W ‘22.",
};

export default function CampaignsIndexPage() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">Campaign House</p>
          <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-wide">
            Campaigns
          </h1>
          <p className="mt-5 max-w-xl text-[var(--mist)]">
            Named seasons as cinema. Walk the chapter — then shop the look.
          </p>
        </Reveal>
      </div>

      <div className="mt-10">
        <ChapterScrubber />
      </div>

      <div className="mx-auto mt-12 grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {campaigns.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.05}>
            <Link href={`/campaigns/${c.slug}`} className="campaign-card group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--ink-soft)]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,12,0.9)] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="chapter-num text-xs tracking-[0.2em]">
                    {c.number}
                  </p>
                  <h2 className="font-display mt-1 text-3xl tracking-wide md:text-4xl">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
                    {c.season}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
