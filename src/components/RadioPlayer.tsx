"use client";

import { useState } from "react";
import type { RadioEpisode } from "@/lib/content";

/**
 * Inline radio UX — no audio files published on gttw.net crawl.
 * Play toggles a visual "playing" state honestly labeled as preview / mix listing.
 */
export function RadioPlayer({
  episode,
  compact,
}: {
  episode: RadioEpisode;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="radio-player"
      data-active={playing || undefined}
      style={compact ? { padding: "0.75rem 1rem" } : undefined}
    >
      <button
        type="button"
        data-playing={playing || undefined}
        aria-label={
          playing
            ? `Pause GTTW Radio Ep ${episode.ep}`
            : `Play GTTW Radio Ep ${episode.ep}`
        }
        onClick={() => setPlaying((v) => !v)}
      >
        {playing ? "II" : "▶"}
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-xs tracking-[0.14em] text-[var(--indigo)] uppercase">
          GTTW Radio · Ep {episode.ep}
        </p>
        <p className={`truncate ${compact ? "text-sm" : "text-base"} mt-1`}>
          {episode.title}
        </p>
        <div className="wave mt-3" aria-hidden />
        {playing ? (
          <p className="mt-2 text-[0.65rem] tracking-[0.08em] text-[var(--mist)] uppercase">
            Mix listed on gttw.net — audio file not published in crawl
          </p>
        ) : null}
      </div>
    </div>
  );
}
