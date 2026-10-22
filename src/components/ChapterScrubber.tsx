"use client";

import Link from "next/link";
import { campaigns } from "@/lib/content";

export function ChapterScrubber({
  activeSlug,
  sticky,
}: {
  activeSlug?: string;
  sticky?: boolean;
}) {
  return (
    <div
      className={`border-y border-[var(--line)] bg-[var(--bg)] ${
        sticky ? "sticky top-[7.5rem] z-30 md:top-[6.5rem]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1400px] overflow-x-auto px-5 md:px-8">
        <nav
          className="flex min-w-max gap-6 py-3.5 md:gap-8"
          aria-label="Collections"
        >
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              href={`/campaigns/${c.slug}`}
              className={`whitespace-nowrap text-[0.68rem] tracking-[0.12em] uppercase transition-colors ${
                activeSlug === c.slug
                  ? "text-[var(--fg)] underline underline-offset-4"
                  : "text-[var(--mist)] hover:text-[var(--fg)]"
              }`}
            >
              {c.number} {c.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
