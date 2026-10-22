"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Look, Product } from "@/lib/content";

export function LookAssemble({
  look,
  pieces,
}: {
  look: Look;
  pieces: Product[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="look-tile group">
      <button
        type="button"
        className="relative block w-full overflow-hidden bg-[var(--ink-soft)] text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={look.image}
            alt={look.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,12,0.85)] via-transparent to-transparent opacity-80" />
          {/* Silhouette outlines on hover — piece labels */}
          <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs tracking-[0.16em] text-[var(--indigo)] uppercase">
              {look.season}
            </p>
            <p className="font-display mt-1 text-2xl tracking-wide md:text-3xl">
              {look.name}
            </p>
            <ul className="mt-3 space-y-1 border-t border-[var(--line)] pt-3">
              {pieces.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center gap-2 text-xs tracking-[0.06em] text-[var(--bone)]"
                >
                  <span className="inline-block h-3 w-3 border border-[var(--indigo)]" />
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>

      {open ? (
        <div className="mt-3 border border-[var(--line)] bg-[var(--ink-soft)] p-4">
          <p className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
            Shop this look
          </p>
          <ul className="mt-3 space-y-2">
            {pieces.map((p) => (
              <li key={p.slug}>
                <Link
                  href="/shop"
                  className="flex items-center justify-between gap-3 text-sm transition-colors hover:text-[var(--indigo)]"
                >
                  <span>{p.name}</span>
                  <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[var(--mist)]">
                    {p.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop" className="cta cta-indigo mt-4 inline-flex">
            Open shop
          </Link>
        </div>
      ) : null}

      <div className="mt-3 md:hidden">
        <p className="font-display text-xl tracking-wide">{look.name}</p>
        <p className="mt-1 text-xs text-[var(--mist)]">{look.blurb}</p>
      </div>
    </div>
  );
}
