import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getLookbookGallery,
  getProduct,
  lookbookGalleries,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lookbookGalleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getLookbookGallery(slug);
  if (!gallery) return { title: "Gallery" };
  return {
    title: `${gallery.title} — Gallery`,
    description: gallery.tagline,
  };
}

export default async function LookbookGalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getLookbookGallery(slug);
  if (!gallery) notFound();

  const pieces = gallery.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const others = lookbookGalleries.filter((g) => g.slug !== gallery.slug);

  return (
    <div className="bg-[var(--bg)]">
      <div className="border-b border-[var(--gridline)] px-4 py-5 md:px-6">
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          <Link href="/looks" className="hover:text-[var(--fg)]">
            Gallery
          </Link>
          <span className="mx-2">/</span>
          {gallery.season}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] leading-[0.95] tracking-[0.02em]">
              {gallery.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-[var(--fg-soft)] md:text-[0.95rem]">
              {gallery.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/shop?chapter=${gallery.shopFilter}`}
              className="cta"
            >
              Shop the collection
            </Link>
            <Link href="/looks" className="nav-link self-center">
              All galleries
            </Link>
          </div>
        </div>
      </div>

      {/* Dedicated masonry-style gallery grid */}
      <ul className="lookbook-masonry">
        {gallery.images.map((img, i) => {
          const span =
            i % 5 === 0 ? "wide" : i % 3 === 0 ? "tall" : "standard";
          return (
            <li
              key={`${img.src}-${i}`}
              className={`lookbook-masonry-cell lookbook-masonry-cell--${span}`}
            >
              <figure className="relative h-full w-full overflow-hidden bg-[var(--bg-muted)]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    span === "wide"
                      ? "(max-width:768px) 100vw, 66vw"
                      : "(max-width:768px) 100vw, 33vw"
                  }
                  className="object-cover"
                  priority={i < 2}
                />
              </figure>
            </li>
          );
        })}
      </ul>

      {pieces.length ? (
        <section className="border-t border-[var(--gridline)]">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--gridline)] px-4 py-5 md:px-6">
            <div>
              <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
                Shop this gallery
              </p>
              <h2 className="font-display mt-2 text-2xl md:text-3xl">
                Pieces from {gallery.title}
              </h2>
            </div>
            <Link
              href={`/shop?chapter=${gallery.shopFilter}`}
              className="nav-link"
            >
              View in shop →
            </Link>
          </div>
          <ul className="collection-grid">
            {pieces.map((p) => (
              <li key={p.slug} className="collection-grid-cell">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <p className="sr-only">
            {pieces.map((p) => `${p.name} ${formatPrice(p.price)}`).join(", ")}
          </p>
        </section>
      ) : null}

      <nav className="border-t border-[var(--gridline)] px-4 py-8 md:px-6">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          More galleries
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/looks/${g.slug}`}
                className="font-display text-xl hover:opacity-60 md:text-2xl"
              >
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
