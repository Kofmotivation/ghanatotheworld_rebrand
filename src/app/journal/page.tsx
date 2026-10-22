import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "GTTW journal — numbered campaign notes.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">Folio</p>
        <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-wide">
          Journal
        </h1>
        <p className="mt-5 max-w-xl text-[var(--mist)]">
          Numbered inserts from the brand page. Bodies stay sparse until more
          essays publish on gttw.net.
        </p>
      </Reveal>

      <div className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {journalEntries.map((entry, i) => (
          <Reveal key={entry.number} delay={i * 0.06}>
            <Link
              href={entry.href}
              className="grid gap-4 py-10 transition-colors hover:bg-[rgba(58,79,140,0.06)] md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-8 md:px-2"
            >
              <span className="font-display text-6xl tracking-wide text-[var(--indigo)] md:text-7xl">
                {entry.number}
              </span>
              <div>
                <h2 className="font-display text-3xl tracking-wide md:text-4xl">
                  {entry.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--mist)]">
                  {entry.line}
                </p>
              </div>
              <span className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
                {entry.date}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
