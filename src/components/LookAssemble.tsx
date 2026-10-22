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
        className="relative block w-full overflow-hidden bg-[var(--bg-muted)] text-left"
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
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-[0.65rem] tracking-[0.14em] uppercase opacity-80">
              {look.season}
            </p>
            <p className="font-display mt-1 text-2xl">{look.name}</p>
            <ul className="mt-2 space-y-1 border-t border-white/25 pt-2 text-xs">
              {pieces.map((p) => (
                <li key={p.slug}>{p.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>

      {open ? (
        <div className="mt-3 border border-[var(--line)] bg-[var(--bg-elevated)] p-4">
          <p className="eyebrow">Shop this look</p>
          <ul className="mt-3 space-y-2">
            {pieces.map((p) => (
              <li key={p.slug}>
                <Link
                  href="/shop"
                  className="flex justify-between gap-3 text-sm hover:text-[var(--accent)]"
                >
                  <span>{p.name}</span>
                  <span className="text-[var(--mist)]">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop" className="cta mt-4 inline-flex">
            Open shop
          </Link>
        </div>
      ) : null}

      <div className="mt-3">
        <p className="font-display text-xl">{look.name}</p>
        <p className="mt-1 text-xs text-[var(--mist)]">{look.blurb}</p>
      </div>
    </div>
  );
}
