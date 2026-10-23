"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RadioMixCard } from "@/components/radio/RadioMixCard";
import { VinylCover } from "@/components/radio/VinylCover";
import { RadioPlayer } from "@/components/RadioPlayer";
import {
  featuredRadio,
  radio,
  radioBySeries,
  radioSeriesNav,
  type RadioSeries,
} from "@/lib/content";

type Filter = "all" | RadioSeries;

export function RadioHub() {
  const [filter, setFilter] = useState<Filter>("all");
  const featured = featuredRadio();
  const mixes = useMemo(() => radioBySeries(filter), [filter]);

  return (
    <div className="radio-hub bg-[var(--bg)]">
      {/* Section sub-nav — Kitsune-style completeness */}
      <nav
        className="radio-subnav border-b border-[var(--line)] px-4 md:px-8"
        aria-label="GTTW Radio sections"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 py-3">
          {radioSeriesNav.map((item) => {
            const active = filter === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`text-[0.68rem] tracking-[0.14em] uppercase transition-colors ${
                    active
                      ? "text-[var(--fg)] underline underline-offset-[0.35em]"
                      : "text-[var(--mist)] hover:text-[var(--fg)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Manifesto */}
      <section className="border-b border-[var(--line)] px-4 py-12 text-center md:px-8 md:py-16">
        <p className="text-[0.65rem] tracking-[0.16em] text-[var(--mist)] uppercase">
          GTTW Radio
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] tracking-[0.02em]">
          Ghana to the world — on frequency
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--fg-soft)] md:text-[0.95rem]">
          GTTW Radio soundtracks the brand’s drops and diaspora nights. Episodes
          01–04 are listed on gttw.net; later slots are honest placeholders until
          new mixes publish. Stub play keeps the system complete — no invented
          audio.
        </p>
      </section>

      {/* Featured release */}
      {filter === "all" || featured.series === filter ? (
        <section className="border-b border-[var(--line)] px-4 py-12 md:px-8 md:py-16">
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
            Featured
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <Link
              href={`/radio/${featured.slug}`}
              className="group block max-w-md justify-self-center md:max-w-none md:justify-self-stretch"
              aria-label={`Open GTTW Radio Ep ${featured.ep} — ${featured.title}`}
            >
              <VinylCover mix={featured} size="featured" priority />
            </Link>
            <div>
              <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
                Ep {featured.ep} · {featured.dateLabel}
              </p>
              <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] leading-none">
                {featured.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--fg-soft)]">
                {featured.artist}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--fg-soft)]">
                {featured.description}
              </p>
              <div className="mt-8 max-w-md">
                <RadioPlayer episode={featured} />
              </div>
              <Link
                href={`/radio/${featured.slug}`}
                className="cta mt-6 inline-flex"
              >
                Open episode
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Catalogue grid */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
              {filter === "all" ? "Catalogue" : radioSeriesNav.find((n) => n.id === filter)?.label}
            </p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">
              {mixes.length} mix{mixes.length === 1 ? "" : "es"}
            </h2>
          </div>
          <p className="text-[0.65rem] tracking-[0.1em] text-[var(--mist)] uppercase">
            {radio.filter((r) => r.isPlaceholder).length} placeholders ·{" "}
            {radio.filter((r) => !r.isPlaceholder).length} from gttw.net
          </p>
        </div>

        <ul className="radio-mix-grid mt-10">
          {mixes.map((mix) => (
            <li key={mix.slug}>
              <RadioMixCard mix={mix} />
            </li>
          ))}
        </ul>
      </section>

      {/* About the frequency */}
      <section className="border-t border-[var(--line)] px-4 py-12 md:px-8 md:py-16">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          About GTTW Radio
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">The signal</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-soft)]">
              Radio sits beside fashion and film in the GTTW gift of love —
              selectors who carry Accra energy into diaspora nights. Episodes
              pair editorially with collections when a soundtrack fits.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Honest gaps</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-soft)]">
              Mix titles for Ep 01–04 come from the live gttw.net Radio page.
              Audio files were not available in crawl, so play controls are stub
              UX. Placeholder episodes hold archive slots until new mixes land.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
