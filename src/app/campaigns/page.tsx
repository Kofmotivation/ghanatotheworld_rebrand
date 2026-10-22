import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChapterScrubber } from "@/components/ChapterScrubber";
import { Reveal } from "@/components/Reveal";
import { campaigns } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collections",
  description: "GTTW collections — Touch The Sky, Fisherman, Essentials, A/W ‘22.",
};

export default function CampaignsIndexPage() {
  return (
    <div className="pt-6 md:pt-8">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">Collections</p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.8rem)] leading-[1.05]">
            Season archive
          </h1>
          <p className="mt-4 max-w-xl text-sm text-[var(--fg-soft)]">
            Named drops from gttw.net — shop the lookbook, then the pieces.
          </p>
        </Reveal>
      </div>

      <div className="mt-8">
        <ChapterScrubber />
      </div>

      <div className="mx-auto mt-10 grid max-w-[1400px] gap-5 px-5 pb-20 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {campaigns.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.04}>
            <Link href={`/campaigns/${c.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-muted)]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3">
                <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
                  {c.number} · {c.season}
                </p>
                <h2 className="font-display mt-1 text-2xl">{c.title}</h2>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
