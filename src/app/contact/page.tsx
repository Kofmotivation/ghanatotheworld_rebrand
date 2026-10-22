import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Ghana To The World on Instagram and Twitter.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="nav-link !text-[var(--gold)]">Contact</p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.95]">
            Reach GTTW
          </h1>
          <p className="mt-6 max-w-md text-[var(--mist)]">
            No public email is listed on gttw.net. Connect on social, or leave a
            note below — inbox wiring is an open decision for launch.
          </p>

          <ul className="mt-10 space-y-4 text-sm">
            <li>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="nav-link !text-[var(--bone)]"
              >
                Instagram @ghanatotheworld
              </a>
            </li>
            <li>
              <a
                href={brand.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="nav-link !text-[var(--bone)]"
              >
                Twitter / X @ghanatotheworld
              </a>
            </li>
            <li>
              <Link href="/shop" className="nav-link !text-[var(--bone)]">
                Shop collections
              </Link>
            </li>
          </ul>

          <p className="mt-12 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
            {brand.policy}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
