import type { Metadata } from "next";
import { FilmCurtain } from "@/components/FilmCurtain";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Film",
  description: "GTTW film & stills.",
};

export default function FilmPage() {
  return (
    <div className="pt-6 md:pt-8">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
        <Reveal>
          <p className="eyebrow">Film</p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05]">
            Stills
          </h1>
          <p className="mt-4 max-w-lg text-sm text-[var(--fg-soft)]">
            Campaign stills from the brand archive. Motion reels when published.
          </p>
        </Reveal>
      </div>
      <FilmCurtain />
    </div>
  );
}
