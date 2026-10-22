import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { lookbook } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "GTTW editorial lookbook — Touch The Sky and campaign frames.",
};

export default function LookbookPage() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="nav-link !text-[var(--gold)]">Editorial</p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
            Lookbook
          </h1>
          <p className="mt-5 max-w-lg text-[var(--mist)]">
            “Ghana To The World” Touch The Sky — campaign stills and culture frames
            from the brand archive.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 columns-1 gap-3 px-3 sm:columns-2 md:mt-16 md:columns-3 md:gap-4 md:px-5 lg:px-8">
        {lookbook.map((shot, i) => (
          <Reveal key={shot.src} delay={(i % 3) * 0.06} className="mb-3 break-inside-avoid md:mb-4">
            <figure className="look-tile relative overflow-hidden bg-[var(--ink-soft)]">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={900}
                height={1200}
                sizes="(max-width:768px) 100vw, 33vw"
                className="h-auto w-full object-cover"
              />
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] justify-center px-5 pb-20 md:px-8">
        <Link href="/shop" className="cta cta-gold">
          Shop the pieces
        </Link>
      </div>
    </div>
  );
}
