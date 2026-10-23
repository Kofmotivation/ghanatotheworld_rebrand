import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RadioPlayer } from "@/components/RadioPlayer";
import {
  getCampaign,
  getRadioEpisode,
  radio,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return radio.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = getRadioEpisode(slug);
  if (!ep) return { title: "Radio" };
  return {
    title: `${ep.title} — Radio`,
    description: ep.description,
  };
}

export default async function RadioEpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = getRadioEpisode(slug);
  if (!ep) notFound();

  const campaign = ep.campaignSlug ? getCampaign(ep.campaignSlug) : null;
  const others = radio.filter((r) => r.slug !== ep.slug).slice(0, 4);

  return (
    <div className="bg-[var(--bg)]">
      <div className="border-b border-[var(--line)] px-4 py-5 md:px-8">
        <p className="text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
          <Link href="/radio" className="hover:text-[var(--fg)]">
            Radio
          </Link>
          <span className="mx-2">/</span>
          Ep {ep.ep}
        </p>
      </div>

      <div className="grid gap-10 px-4 py-10 md:grid-cols-2 md:items-start md:gap-14 md:px-8 md:py-14">
        <div className="relative aspect-square overflow-hidden bg-[var(--bg-muted)]">
          <Image
            src={ep.artwork}
            alt={ep.title}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
            {ep.series.replace("-", " ")} · {ep.dateLabel}
            {ep.isPlaceholder ? " · Placeholder" : ""}
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] leading-none">
            {ep.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--fg-soft)]">{ep.artist}</p>
          <p className="mt-2 text-[0.7rem] tracking-[0.1em] text-[var(--mist)] uppercase">
            Duration {ep.duration}
          </p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--fg-soft)]">
            {ep.description}
          </p>

          <div className="mt-8 max-w-xl">
            <RadioPlayer episode={ep} />
          </div>

          {campaign ? (
            <p className="mt-8 text-sm text-[var(--fg-soft)]">
              Paired collection:{" "}
              <Link
                href={`/campaigns/${campaign.slug}`}
                className="text-[var(--fg)] underline underline-offset-2"
              >
                {campaign.title}
              </Link>
            </p>
          ) : null}

          <Link href="/radio" className="nav-link mt-8 inline-flex">
            ← All radio
          </Link>
        </div>
      </div>

      <section className="border-t border-[var(--line)] px-4 py-12 md:px-8">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--mist)] uppercase">
          More mixes
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {others.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/radio/${r.slug}`}
                className="font-display text-xl hover:opacity-60 md:text-2xl"
              >
                Ep {r.ep} · {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
