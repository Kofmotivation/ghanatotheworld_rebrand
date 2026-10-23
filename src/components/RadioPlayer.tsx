"use client";

import type { RadioEpisode } from "@/lib/content";
import { soundcloudEmbedSrc } from "@/lib/content";

export function RadioPlayer({
  episode,
  compact = false,
}: {
  episode: RadioEpisode;
  compact?: boolean;
}) {
  const trackId = episode.soundcloudTrackId;
  const canEmbed = Boolean(trackId && episode.audioAvailable);

  if (!canEmbed || !trackId) {
    return (
      <div
        className={`radio-player${compact ? " radio-player--compact" : ""}`}
      >
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          GTTW Radio · Ep {episode.ep}
          {episode.isPlaceholder ? " · Placeholder" : ""}
        </p>
        <p className="mt-2 text-sm text-[var(--fg-soft)]">
          Audio not wired yet — no invented stream.
        </p>
      </div>
    );
  }

  const height = compact ? 120 : 166;
  const src = soundcloudEmbedSrc(trackId, { visual: false });

  return (
    <div
      className={`radio-player radio-player--embed${compact ? " radio-player--compact" : ""}`}
    >
      <p className="mb-3 text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
        GTTW Radio · Ep {episode.ep} · SoundCloud
      </p>
      <iframe
        title={`Play GTTW Radio Ep ${episode.ep} — ${episode.title} on SoundCloud`}
        width="100%"
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={src}
        loading="lazy"
        className="radio-sc-iframe"
      />
      {episode.soundcloudUrl ? (
        <a
          href={episode.soundcloudUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[0.65rem] tracking-[0.1em] text-[var(--mist)] uppercase underline-offset-2 hover:text-[var(--fg)] hover:underline"
        >
          Open on SoundCloud
        </a>
      ) : null}
    </div>
  );
}
