import { RadioPlayer } from "@/components/RadioPlayer";
import { Reveal } from "@/components/Reveal";
import type { Campaign, RadioEpisode } from "@/lib/content";

export function RadioDropPairing({
  campaign,
  episodes,
}: {
  campaign: Campaign;
  episodes: RadioEpisode[];
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <p className="eyebrow">Radio × Collection</p>
        <h2 className="font-display mt-3 text-3xl md:text-4xl">
          Soundtrack · {campaign.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-soft)]">
          GTTW Radio mixes from gttw.net, paired to this collection. Official
          soundtrack credits were not published — pairing is editorial from the
          available episode list.
        </p>
      </Reveal>

      {episodes.length === 0 ? (
        <Reveal className="mt-10 border border-[var(--line)] bg-[var(--bg-elevated)] p-6 text-sm text-[var(--fg-soft)]">
          No radio mixes paired yet. See the{" "}
          <a href="/radio" className="underline">
            Radio archive
          </a>
          .
        </Reveal>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {episodes.map((ep, i) => (
            <Reveal key={ep.ep} delay={i * 0.05}>
              <RadioPlayer episode={ep} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
