import Link from "next/link";
import { VinylCover } from "@/components/radio/VinylCover";
import type { RadioEpisode } from "@/lib/content";

export function RadioMixCard({ mix }: { mix: RadioEpisode }) {
  return (
    <Link
      href={`/radio/${mix.slug}`}
      className="radio-mix-card group block"
      aria-label={`Open GTTW Radio Ep ${mix.ep} — ${mix.title}`}
    >
      <VinylCover mix={mix} size="card" />
      <div className="mt-3 space-y-1">
        <p className="text-[0.62rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          Ep {mix.ep} · {mix.series.replace("-", " ")}
        </p>
        <h3 className="font-display text-xl leading-tight md:text-2xl">
          {mix.title}
        </h3>
        <p className="text-sm text-[var(--fg-soft)]">{mix.artist}</p>
        <p className="mt-1 hidden text-[0.6rem] tracking-[0.1em] text-[var(--mist)] uppercase md:block md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
          Hover to flip · click to open
        </p>
      </div>
    </Link>
  );
}
