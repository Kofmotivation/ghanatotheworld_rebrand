import type { Metadata } from "next";
import Link from "next/link";
import { RadioPlayer } from "@/components/RadioPlayer";
import { Reveal } from "@/components/Reveal";
import { campaigns, radio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Radio",
  description: "GTTW Radio mixes — Ep 01–04 from gttw.net.",
};

export default function RadioPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">GTTW Radio</p>
        <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-wide">
          Radio
        </h1>
        <p className="mt-5 max-w-xl text-[var(--mist)]">
          Mixes published on the live site. Episodes also appear on Campaign
          detail pages as Radio × Drop pairings.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:max-w-2xl">
        {radio.map((ep, i) => (
          <Reveal key={ep.ep} delay={i * 0.05}>
            <RadioPlayer episode={ep} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="nav-link !text-[var(--indigo)]">Paired campaigns</p>
        <ul className="mt-6 space-y-3 text-sm">
          {campaigns
            .filter((c) => c.radioEps.length > 0)
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/campaigns/${c.slug}`}
                  className="transition-colors hover:text-[var(--indigo)]"
                >
                  <span className="font-display text-xl tracking-wide">
                    {c.number} {c.title}
                  </span>
                  <span className="ml-3 text-[var(--mist)]">
                    Ep {c.radioEps.join(", ")}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </Reveal>
    </div>
  );
}
