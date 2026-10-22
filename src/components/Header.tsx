"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { brand, nav } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="announcement">ALL SALES FINAL · © 2022 GTTW</div>
      <header
        className={`sticky top-0 z-40 border-b transition-[background,border-color] duration-300 ${
          scrolled || open
            ? "border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md"
            : "border-transparent bg-[var(--header-bg)] backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 md:px-8 md:py-4">
          <nav className="flex flex-1 items-center gap-6">
            <div className="hidden items-center gap-6 lg:flex">
              {nav.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`) ||
                    undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <Link
            href="/"
            className="font-display shrink-0 text-center text-[1.65rem] leading-none tracking-[0.04em] md:text-[1.85rem]"
          >
            {brand.short}
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4 lg:gap-6">
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`) ||
                    undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
              <Link href="/cart" className="nav-link" data-active={pathname === "/cart" || undefined}>
                Cart{count > 0 ? ` (${count})` : ""}
              </Link>
            </nav>
            <Link
              href="/cart"
              className="nav-link lg:hidden"
              data-active={pathname === "/cart" || undefined}
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </Link>
            <ThemeToggle />
            <button
              type="button"
              className="nav-link lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[var(--line)] lg:hidden"
            >
              <div className="flex flex-col gap-4 px-5 py-6">
                {[
                  ...nav,
                  { href: "/contact", label: "Contact" },
                  { href: "/cart", label: count > 0 ? `Cart (${count})` : "Cart" },
                  { href: "/journal", label: "Journal" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display text-2xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
