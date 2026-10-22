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
    <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-3 text-[clamp(2.6rem,6vw,4rem)] leading-[1.05]">
            Get in touch
          </h1>
          <p className="mt-5 max-w-md text-sm text-[var(--fg-soft)]">
            No public email on gttw.net. Connect on social, or leave a note.
          </p>
          <ul className="mt-10 space-y-3 text-sm">
            <li>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)]"
              >
                Instagram @ghanatotheworld
              </a>
            </li>
            <li>
              <a
                href={brand.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)]"
              >
                Twitter / X @ghanatotheworld
              </a>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[var(--accent)]">
                Shop
              </Link>
            </li>
          </ul>
          <p className="mt-12 text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase">
            {brand.policy}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
