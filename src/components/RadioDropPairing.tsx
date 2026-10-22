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
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <p className="nav-link !text-[var(--indigo)]">Radio × Drop</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">
          Soundtrack · {campaign.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--mist)]">
          GTTW Radio mixes from gttw.net, paired to this chapter. Official
          soundtrack credits were not published — pairing is editorial from the
          available episode list. Play inline without leaving the campaign.
        </p>
      </Reveal>

      {episodes.length === 0 ? (
        <Reveal className="mt-10 border border-[var(--line)] p-6 text-sm text-[var(--mist)]">
          No radio mixes paired to this chapter yet. See the full{" "}
          <a href="/radio" className="text-[var(--bone)] underline">
            Radio archive
          </a>
          .
        </Reveal>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {episodes.map((ep, i) => (
            <Reveal key={ep.ep} delay={i * 0.06}>
              <RadioPlayer episode={ep} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
