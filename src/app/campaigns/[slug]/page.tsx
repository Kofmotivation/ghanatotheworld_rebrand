import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterScrubber } from "@/components/ChapterScrubber";
import { LookAssemble } from "@/components/LookAssemble";
import { ProductCard } from "@/components/ProductCard";
import { RadioDropPairing } from "@/components/RadioDropPairing";
import { Reveal } from "@/components/Reveal";
import {
  campaigns,
  getCampaign,
  getProduct,
  looksForCampaign,
  productsForCampaign,
  radioForCampaign,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Campaign" };
  return {
    title: `${c.number} ${c.title}`,
    description: c.tagline,
  };
}

export default async function CampaignDetailPage({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const products = productsForCampaign(slug);
  const looks = looksForCampaign(slug);
  const episodes = radioForCampaign(slug);

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.45)_0%,rgba(11,11,12,0.25)_45%,rgba(11,11,12,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:px-8">
          <p className="chapter-num text-sm tracking-[0.2em]">
            Chapter {campaign.number}
          </p>
          <h1 className="font-display mt-2 text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] tracking-wide">
            {campaign.title}
          </h1>
          <p className="mt-3 text-xs tracking-[0.16em] text-[var(--mist)] uppercase">
            {campaign.season}
          </p>
          <p className="mt-5 max-w-lg text-lg text-[var(--bone)]">
            {campaign.tagline}
          </p>
        </div>
      </section>

      <ChapterScrubber activeSlug={campaign.slug} sticky />

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">Story</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            {campaign.story}
          </p>
        </Reveal>

        {campaign.stills.length > 0 ? (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {campaign.stills.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--ink-soft)]">
                  <Image
                    src={src}
                    alt={`${campaign.title} still ${i + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      {looks.length > 0 ? (
        <section className="border-t border-[var(--line)] bg-[var(--ink-soft)]">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <p className="nav-link !text-[var(--indigo)]">Shoppable looks</p>
              <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">
                Assemble the wardrobe
              </h2>
              <p className="mt-3 max-w-lg text-sm text-[var(--mist)]">
                Hover a look for piece outlines. Click to open the mini strip —
                real GTTW SKUs only.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {looks.map((look, i) => {
                const pieces = look.productSlugs
                  .map((s) => getProduct(s))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p));
                return (
                  <Reveal key={look.slug} delay={i * 0.06}>
                    <LookAssemble look={look} pieces={pieces} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <RadioDropPairing campaign={campaign} episodes={episodes} />

      <section className="mx-auto max-w-[1440px] px-5 pb-10 md:px-8">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">From this chapter</p>
          <h2 className="font-display mt-3 text-4xl tracking-wide">Pieces</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.04}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="chapter-num text-sm">End of chapter {campaign.number}</p>
            <h2 className="font-display mt-2 text-4xl tracking-wide md:text-5xl">
              Shop this chapter
            </h2>
            <p className="mt-2 text-sm text-[var(--mist)]">
              Filtered to {campaign.season} pieces — not a generic shop dump.
            </p>
          </div>
          <Link
            href={`/shop?chapter=${campaign.shopFilter}`}
            className="cta cta-indigo"
          >
            Shop {campaign.title}
          </Link>
        </div>
      </section>
    </div>
  );
}
