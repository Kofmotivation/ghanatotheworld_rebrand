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
  radioSoundcloud,
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
          GTTW Radio soundtracks the brand’s drops and diaspora nights. Guest
          mixes stream from{" "}
          <a
            href={radioSoundcloud.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--fg)] underline underline-offset-2"
          >
            SoundCloud
          </a>
          — vinyl covers flip on hover; open an episode to play the official
          embed.
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
            {radioSoundcloud.trackCount} mixes · SoundCloud
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
            <h2 className="font-display text-2xl md:text-3xl">The catalogue</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-soft)]">
              All {radioSoundcloud.trackCount} public tracks from the GTTW RADIO
              SoundCloud profile play via the official widget. Last releases hold
              the newest uploads; Sessions hold earlier guest mixes. Archives
              stay empty until more sets publish.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
