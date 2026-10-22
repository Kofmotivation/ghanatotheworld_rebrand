import Image from "next/image";
import Link from "next/link";
import type { RadioEpisode } from "@/lib/content";

export function RadioMixCard({ mix }: { mix: RadioEpisode }) {
  return (
    <Link href={`/radio/${mix.slug}`} className="radio-mix-card group block">
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-muted)]">
        <Image
          src={mix.artwork}
          alt=""
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {mix.isPlaceholder ? (
          <span className="absolute top-2 left-2 bg-[var(--bg)]/85 px-2 py-1 text-[0.58rem] tracking-[0.12em] uppercase">
            Placeholder
          </span>
        ) : null}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[0.62rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          Ep {mix.ep} · {mix.series.replace("-", " ")}
        </p>
        <h3 className="font-display text-xl leading-tight md:text-2xl">
          {mix.title}
        </h3>
        <p className="text-sm text-[var(--fg-soft)]">{mix.artist}</p>
      </div>
    </Link>
  );
}
