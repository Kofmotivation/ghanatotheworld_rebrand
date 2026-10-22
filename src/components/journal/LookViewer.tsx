"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { JournalLook } from "./types";

type Props = {
  looks: JournalLook[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  city: string;
};

export function LookViewer({
  looks,
  index,
  onIndexChange,
  onClose,
  city,
}: Props) {
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const look = looks[index];
  const total = looks.length;

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      const i = ((next % total) + total) % total;
      onIndexChange(i);
    },
    [onIndexChange, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [go, index, onClose]);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  if (!look) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#050506] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${city} look ${index + 1} of ${total}`}
    >
      <header className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-5">
        <div className="min-w-0">
          <p className="text-[0.65rem] tracking-[0.16em] text-white/45 uppercase">
            {city}
          </p>
          <p className="font-display mt-1 truncate text-xl md:text-2xl">
            {look.caption}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="text-[0.7rem] tracking-[0.14em] text-white/50 tabular-nums uppercase">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="border border-white/25 px-3 py-2 text-[0.65rem] tracking-[0.14em] uppercase transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-16">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 border border-white/20 px-3 py-4 text-[0.65rem] tracking-[0.14em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white md:block"
          aria-label="Previous look"
        >
          Prev
        </button>

        <figure className="relative h-full w-full max-w-5xl">
          <Image
            key={look.imageUrl}
            src={look.imageUrl}
            alt={look.caption}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </figure>

        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 border border-white/20 px-3 py-4 text-[0.65rem] tracking-[0.14em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white md:block"
          aria-label="Next look"
        >
          Next
        </button>
      </div>

      {/* Mobile prev/next */}
      <div className="flex shrink-0 justify-between gap-3 px-4 pb-2 md:hidden">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="border border-white/20 px-4 py-2 text-[0.65rem] tracking-[0.14em] uppercase"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="border border-white/20 px-4 py-2 text-[0.65rem] tracking-[0.14em] uppercase"
        >
          Next
        </button>
      </div>

      <nav
        className="shrink-0 border-t border-white/10 px-3 py-3 md:px-6 md:py-4"
        aria-label="Look index"
      >
        <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {looks.map((item, i) => {
            const active = i === index;
            return (
              <li key={`${item.imageUrl}-${i}`} className="shrink-0">
                <button
                  type="button"
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  onClick={() => onIndexChange(i)}
                  aria-current={active ? "true" : undefined}
                  aria-label={`View look ${i + 1}: ${item.caption}`}
                  className={`relative block h-16 w-12 overflow-hidden border transition-colors md:h-20 md:w-14 ${
                    active
                      ? "border-white/80 opacity-100"
                      : "border-white/15 opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
