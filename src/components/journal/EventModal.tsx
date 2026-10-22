"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { JournalEvent } from "./types";

type Props = {
  event: JournalEvent;
  onClose: () => void;
};

export function EventModal({ event, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-event-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
        aria-label="Close event"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[min(92dvh,880px)] w-full max-w-3xl flex-col overflow-hidden border border-white/15 bg-[#0c0c0e]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7 md:py-5">
          <div className="min-w-0">
            <p className="text-[0.65rem] tracking-[0.16em] text-white/55 uppercase">
              {event.city}
            </p>
            <h2
              id="journal-event-title"
              className="font-display mt-2 text-[clamp(1.75rem,4vw,2.6rem)] leading-none tracking-[0.02em]"
            >
              {event.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-[0.95rem]">
              {event.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-white/25 px-3 py-2 text-[0.65rem] tracking-[0.14em] uppercase transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
          <p className="mb-4 text-[0.65rem] tracking-[0.14em] text-white/45 uppercase">
            Looks · {event.looks.length}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
            {event.looks.map((look) => (
              <li key={`${look.imageUrl}-${look.caption}`}>
                <figure className="group relative aspect-[3/4] overflow-hidden bg-white/5">
                  <Image
                    src={look.imageUrl}
                    alt={look.caption}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3 text-[0.7rem] leading-snug text-white/90">
                    {look.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
