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
      className={`border-y border-[var(--line)] bg-[rgba(11,11,12,0.92)] backdrop-blur-md ${
        sticky ? "sticky top-[3.5rem] z-30 md:top-[4rem]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <nav className="scrubber" aria-label="Campaign chapters">
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              href={`/campaigns/${c.slug}`}
              data-active={activeSlug === c.slug || undefined}
            >
              {c.number} {c.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
