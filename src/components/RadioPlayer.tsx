"use client";

import { useState } from "react";
import type { RadioEpisode } from "@/lib/content";

export function RadioPlayer({
  episode,
  compact = false,
}: {
  episode: RadioEpisode;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`radio-player${compact ? " radio-player--compact" : ""}`}
      data-active={playing || undefined}
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
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          GTTW Radio · Ep {episode.ep}
          {episode.isPlaceholder ? " · Placeholder" : ""}
        </p>
        <p className="mt-1 text-base">{episode.title}</p>
        <div className="wave mt-3" aria-hidden />
        {playing ? (
          <p className="mt-2 text-[0.65rem] tracking-[0.06em] text-[var(--mist)] uppercase">
            {episode.audioAvailable
              ? "Playing"
              : "Stub play — audio file not published in crawl"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
