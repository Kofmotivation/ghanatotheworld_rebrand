import Image from "next/image";
import type { RadioEpisode } from "@/lib/content";

type Props = {
  mix: RadioEpisode;
  /** Larger featured presentation */
  size?: "card" | "featured";
  priority?: boolean;
};

/**
 * Editorial vinyl sleeve with CSS 3D flip.
 * Desktop / keyboard focus: hover or :focus-within flips to the disc face.
 * Mobile tap is handled by the parent Link (navigate to episode).
 */
export function VinylCover({ mix, size = "card", priority }: Props) {
  const featured = size === "featured";

  return (
    <div
      className={`vinyl-scene${featured ? " vinyl-scene--featured" : ""}`}
      aria-hidden="true"
    >
      {/* Idle vinyl edge peeking behind sleeve */}
      <div className="vinyl-peek" />

      <div className="vinyl-flip">
        {/* Sleeve front */}
        <div className="vinyl-face vinyl-face--front">
          <Image
            src={mix.artwork}
            alt=""
            fill
            priority={priority}
            sizes={
              featured
                ? "(max-width:768px) 100vw, 50vw"
                : "(max-width:768px) 50vw, 25vw"
            }
            className="object-cover"
          />
          <div className="vinyl-sleeve-sheen" />
          {mix.isPlaceholder ? (
            <span className="vinyl-badge">Placeholder</span>
          ) : null}
        </div>

        {/* Disc / sleeve back */}
        <div className="vinyl-face vinyl-face--back">
          <div className="vinyl-disc">
            <div className="vinyl-grooves" />
            <div className="vinyl-label">
              <p className="vinyl-label-ep">Ep {mix.ep}</p>
              <p className="vinyl-label-title">{mix.title}</p>
              <p className="vinyl-label-artist">{mix.artist}</p>
            </div>
            <div className="vinyl-spindle" />
          </div>
        </div>
      </div>
    </div>
  );
}
