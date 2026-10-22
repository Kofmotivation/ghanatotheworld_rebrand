import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Ghana To The World.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="nav-link !text-[var(--indigo)]">Contact</p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] tracking-wide">
            Reach GTTW
          </h1>
          <p className="mt-6 max-w-md text-[var(--mist)]">
            No public email on gttw.net. Connect on social, or leave a note —
            inbox wiring awaits brand input.
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
              <Link href="/campaigns" className="nav-link !text-[var(--bone)]">
                Campaigns
              </Link>
            </li>
          </ul>
          <p className="mt-12 text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
            {brand.policy}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
