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
  if (!c) return { title: "Collection" };
  return { title: c.title, description: c.tagline };
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
      <section className="relative min-h-[78svh] overflow-hidden md:min-h-[85svh]">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-scrim)" }}
        />
        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-[1400px] flex-col items-center justify-end px-5 pb-14 text-center text-white md:min-h-[85svh] md:pb-16">
          <p className="text-[0.7rem] tracking-[0.18em] uppercase opacity-90">
            {campaign.season} collection
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,8vw,5rem)] leading-[0.95]">
            {campaign.title}
          </h1>
          <p className="mt-4 max-w-md text-sm opacity-85">{campaign.tagline}</p>
        </div>
      </section>

      <ChapterScrubber activeSlug={campaign.slug} sticky />

      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <p className="eyebrow">Story</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--fg-soft)] md:text-lg">
            {campaign.story}
          </p>
        </Reveal>
        {campaign.stills.length > 0 ? (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {campaign.stills.map((src, i) => (
              <Reveal key={src} delay={i * 0.04}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-muted)]">
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
        <section className="border-t border-[var(--line)] bg-[var(--bg-elevated)]">
          <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="eyebrow">Shop the look</p>
              <h2 className="font-display mt-3 text-3xl md:text-4xl">
                Looks from this collection
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {looks.map((look, i) => {
                const pieces = look.productSlugs
                  .map((s) => getProduct(s))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p));
                return (
                  <Reveal key={look.slug} delay={i * 0.05}>
                    <LookAssemble look={look} pieces={pieces} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <RadioDropPairing campaign={campaign} episodes={episodes} />

      <section className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
        <Reveal>
          <p className="eyebrow">Pieces</p>
          <h2 className="font-display mt-3 text-3xl">From this collection</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.03}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-[var(--line)] bg-[var(--bg-muted)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="eyebrow">Shop</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">
              Shop {campaign.title}
            </h2>
          </div>
          <Link
            href={`/shop?chapter=${campaign.shopFilter}`}
            className="cta cta-filled"
          >
            Shop this collection
          </Link>
        </div>
      </section>
    </div>
  );
}
