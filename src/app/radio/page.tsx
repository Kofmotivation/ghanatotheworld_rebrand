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
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <Reveal>
        <p className="eyebrow">GTTW Radio</p>
        <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05]">
          Mix archive
        </h1>
        <p className="mt-4 max-w-xl text-sm text-[var(--fg-soft)]">
          Mixes published on the live site. Also paired on collection pages.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:max-w-2xl">
        {radio.map((ep, i) => (
          <Reveal key={ep.ep} delay={i * 0.04}>
            <RadioPlayer episode={ep} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="eyebrow">Paired collections</p>
        <ul className="mt-6 space-y-3 text-sm">
          {campaigns
            .filter((c) => c.radioEps.length > 0)
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/campaigns/${c.slug}`}
                  className="hover:text-[var(--accent)]"
                >
                  <span className="font-display text-xl">{c.title}</span>
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
