import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { Reveal } from "@/components/Reveal";
import {
  formatPrice,
  getProduct,
  products,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.collection === product.collection ||
          p.category === product.category),
    )
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <Reveal>
        <p className="text-[0.68rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          <Link href="/shop" className="hover:text-[var(--fg)]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {product.collection}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={product.images} name={product.name} />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{product.category}</p>
            <h1 className="font-display mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-4 text-lg">
              {formatPrice(product.price)}
              {product.soldOut ? (
                <span className="ml-3 text-sm tracking-[0.1em] text-[var(--mist)] uppercase">
                  Sold out
                </span>
              ) : null}
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--fg-soft)]">
              {product.description.replace(/\s*Sold Out\s*$/i, "").trim()}
            </p>
            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>
          </div>
        </Reveal>
      </div>

      {related.length ? (
        <section className="mt-20 border-t border-[var(--line)] pt-14">
          <h2 className="font-display text-2xl md:text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="product-tile group block">
                <div className="product-frame relative aspect-[4/5] overflow-hidden bg-[var(--bg-muted)]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="25vw"
                    className="object-contain object-center p-4"
                  />
                </div>
                <p className="mt-3 text-sm">{p.name}</p>
                <p className="text-xs text-[var(--mist)]">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
