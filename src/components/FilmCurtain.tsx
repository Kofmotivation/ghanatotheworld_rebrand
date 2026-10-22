"use client";

import Image from "next/image";
import { useState } from "react";
import { filmStills } from "@/lib/content";

export function FilmCurtain() {
  const [open, setOpen] = useState(false);
  const lead = filmStills[0];

  return (
    <div>
      <button
        type="button"
        className="relative block min-h-[65svh] w-full overflow-hidden text-left"
        onClick={() => setOpen(true)}
        aria-label="Open film stills"
      >
        <Image
          src={lead.src}
          alt={lead.caption}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {!open ? (
          <div className="absolute inset-0 flex items-end bg-black/25 p-8 text-white md:p-12">
            <div>
              <p className="text-[0.7rem] tracking-[0.16em] uppercase opacity-90">
                Film
              </p>
              <p className="font-display mt-2 text-4xl md:text-5xl">
                Click to open
              </p>
            </div>
          </div>
        ) : null}
      </button>

      {open ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2 md:grid-cols-4 md:p-5">
          {filmStills.map((s) => (
            <figure
              key={s.src}
              className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-muted)]"
            >
              <Image
                src={s.src}
                alt={s.caption}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white/80">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
