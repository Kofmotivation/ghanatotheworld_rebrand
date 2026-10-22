import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "GTTW journal — campaign notes.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <Reveal>
        <p className="eyebrow">Journal</p>
        <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05]">
          Notes
        </h1>
        <p className="mt-4 max-w-xl text-sm text-[var(--fg-soft)]">
          Sparse inserts from the brand page until more essays publish on
          gttw.net.
        </p>
      </Reveal>

      <div className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {journalEntries.map((entry, i) => (
          <Reveal key={entry.number} delay={i * 0.05}>
            <Link
              href={entry.href}
              className="grid gap-3 py-10 transition-colors hover:bg-[var(--bg-muted)] md:grid-cols-[6rem_1fr_auto] md:items-baseline md:gap-8 md:px-2"
            >
              <span className="font-display text-5xl text-[var(--mist)]">
                {entry.number}
              </span>
              <div>
                <h2 className="font-display text-3xl">{entry.title}</h2>
                <p className="mt-3 max-w-xl text-sm text-[var(--fg-soft)]">
                  {entry.line}
                </p>
              </div>
              <span className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
                {entry.date}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
