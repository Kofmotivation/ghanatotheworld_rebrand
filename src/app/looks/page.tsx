import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lookbookGalleries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "GTTW lookbook galleries — dedicated stills for each collection.",
};

export default function LooksPage() {
  return (
    <div className="bg-[var(--bg)]">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--gridline)] px-4 py-5 md:px-6">
        <div>
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
            Lookbook
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.2rem,6vw,3.4rem)] leading-none tracking-[0.02em]">
            Gallery
          </h1>
        </div>
        <p className="max-w-xs text-right text-[0.65rem] tracking-[0.1em] text-[var(--mist)] uppercase">
          {lookbookGalleries.length} collections · dedicated stills
        </p>
      </div>

      {/* HOE Gallery index — cover tiles with collection titles */}
      <ul className="gallery-index">
        {lookbookGalleries.map((g) => (
          <li key={g.slug} className="gallery-index-cell">
            <Link href={`/looks/${g.slug}`} className="gallery-cover group">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--bg-muted)] md:aspect-[4/5]">
                <Image
                  src={g.cover}
                  alt={g.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority={g.slug === "touch-the-sky"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
                  <p className="text-[0.65rem] tracking-[0.16em] uppercase opacity-80">
                    {g.season}
                  </p>
                  <h2 className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-[0.02em]">
                    {g.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-[0.75rem] leading-snug opacity-85">
                    {g.tagline}
                  </p>
                  <p className="mt-4 text-[0.65rem] tracking-[0.14em] uppercase opacity-80 transition-opacity group-hover:opacity-100">
                    View gallery →
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
