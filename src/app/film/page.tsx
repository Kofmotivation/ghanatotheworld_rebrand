import type { Metadata } from "next";
import { FilmCurtain } from "@/components/FilmCurtain";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Film",
  description: "GTTW film & stills — design, fashion, film pillar.",
};

export default function FilmPage() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 md:px-8">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">Design · Fashion · Film</p>
          <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-wide">
            Film
          </h1>
          <p className="mt-4 max-w-lg text-sm text-[var(--mist)]">
            Sparse on purpose — campaign stills from the brand archive. Full
            motion reels can land here when published.
          </p>
        </Reveal>
      </div>
      <FilmCurtain />
    </div>
  );
}
