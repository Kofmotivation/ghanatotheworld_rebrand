import type { Metadata } from "next";
import { LookAssemble } from "@/components/LookAssemble";
import { Reveal } from "@/components/Reveal";
import { getProduct, looks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Looks",
  description: "Named GTTW outfits built from real shop SKUs.",
};

export default function LooksPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">Wardrobe</p>
        <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-wide">
          Looks
        </h1>
        <p className="mt-5 max-w-xl text-[var(--mist)]">
          Named outfits from real GTTW pieces. Hover for silhouettes — click to
          assemble the shop strip.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {looks.map((look, i) => {
          const pieces = look.productSlugs
            .map((s) => getProduct(s))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <Reveal key={look.slug} delay={(i % 4) * 0.05}>
              <LookAssemble look={look} pieces={pieces} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
