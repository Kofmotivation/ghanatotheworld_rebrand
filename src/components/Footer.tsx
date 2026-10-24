import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { brand, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--bg-muted)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:grid-cols-4 md:px-8 md:py-16">
        <div className="md:col-span-1">
          <BrandLogo size="footer" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--fg-soft)]">
            Cultural expression through design, fashion & film.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-[var(--fg-soft)]">
            <li>
              <Link href="/shop" className="hover:text-[var(--fg)]">
                All products
              </Link>
            </li>
            <li>
              <Link href="/campaigns" className="hover:text-[var(--fg)]">
                Campaigns
              </Link>
            </li>
            <li>
              <Link href="/looks" className="hover:text-[var(--fg)]">
                Looks
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm text-[var(--fg-soft)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--fg)]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/journal" className="hover:text-[var(--fg)]">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--fg)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Follow</p>
          <ul className="space-y-2.5 text-sm text-[var(--fg-soft)]">
            <li>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={brand.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)]"
              >
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-[var(--line)] px-5 py-5 text-[0.65rem] tracking-[0.12em] text-[var(--mist)] uppercase sm:flex-row sm:justify-between md:px-8">
        <span>{brand.policy}</span>
        <span>{brand.copyright}</span>
      </div>
    </footer>
  );
}
