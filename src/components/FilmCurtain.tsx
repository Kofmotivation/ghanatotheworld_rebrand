"use client";

import Image from "next/image";
import { useState } from "react";
import { filmStills } from "@/lib/content";

export function FilmCurtain() {
  const [open, setOpen] = useState(false);
  const lead = filmStills[0];

  return (
    <div className="relative">
      <button
        type="button"
        className="relative block min-h-[70svh] w-full overflow-hidden text-left"
        onClick={() => setOpen(true)}
        aria-label="Open film stills"
      >
        <Image
          src={lead.src}
          alt={lead.caption}
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "scale-105" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-[var(--ink)] transition-opacity duration-700 ${
            open ? "opacity-0 pointer-events-none" : "opacity-40"
          }`}
        />
        {!open ? (
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <div>
              <p className="nav-link !text-[var(--indigo)]">Film curtain</p>
              <p className="font-display mt-2 text-4xl tracking-wide md:text-6xl">
                Click to peel
              </p>
              <p className="mt-2 text-sm text-[var(--mist)]">
                Stills archive — muted loop placeholder (no video files on crawl)
              </p>
            </div>
          </div>
        ) : null}
      </button>

      {open ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2 md:grid-cols-4 md:p-5">
          {filmStills.map((s) => (
            <figure key={s.src} className="relative aspect-[3/4] overflow-hidden bg-[var(--ink-soft)]">
              <Image
                src={s.src}
                alt={s.caption}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-[var(--mist)]">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
