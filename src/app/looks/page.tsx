import type { Metadata } from "next";
import { LookAssemble } from "@/components/LookAssemble";
import { Reveal } from "@/components/Reveal";
import { getProduct, looks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Named GTTW outfits built from real shop SKUs.",
};

export default function LooksPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <Reveal>
        <p className="eyebrow">Lookbook</p>
        <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05]">
          Shop the look
        </h1>
        <p className="mt-4 max-w-xl text-sm text-[var(--fg-soft)]">
          Named outfits from real GTTW pieces. Hover for pieces — click to open
          the shop strip.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {looks.map((look, i) => {
          const pieces = look.productSlugs
            .map((s) => getProduct(s))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <Reveal key={look.slug} delay={(i % 4) * 0.04}>
              <LookAssemble look={look} pieces={pieces} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
