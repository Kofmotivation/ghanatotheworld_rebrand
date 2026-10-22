import Link from "next/link";
import { brand, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-4xl tracking-wide md:text-5xl">
            {brand.name}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--mist)]">
            Cultural expression through design, fashion & film.
          </p>
        </div>
        <div>
          <p className="nav-link mb-4 !text-[var(--indigo)]">Navigate</p>
          <ul className="space-y-3 text-sm text-[var(--mist)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--bone)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/journal" className="transition-colors hover:text-[var(--bone)]">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-[var(--bone)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="nav-link mb-4 !text-[var(--indigo)]">Connect</p>
          <ul className="space-y-3 text-sm text-[var(--mist)]">
            <li>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--bone)]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={brand.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--bone)]"
              >
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-[var(--line)] px-5 py-6 text-xs tracking-[0.12em] text-[var(--mist)] uppercase sm:flex-row sm:justify-between md:px-8">
        <span>{brand.policy}</span>
        <span>{brand.copyright}</span>
      </div>
    </footer>
  );
}
