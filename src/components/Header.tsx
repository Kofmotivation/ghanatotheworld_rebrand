"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { brand, campaigns, categories, nav } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShopOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopOpen]);

  const utility = [
    { href: "/journal", label: "Journal" },
    { href: "/radio", label: "Radio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const;

  return (
    <>
      <div className="announcement">ALL SALES FINAL · © 2022 GTTW</div>
      <header className="relative sticky top-0 z-40 border-b border-[var(--gridline)] bg-[var(--bg)] text-[var(--fg)]">
        <nav
          className="relative flex items-stretch justify-between px-4 md:px-6"
          aria-label="Primary"
        >
          {/* Left */}
          <div className="flex flex-1 items-stretch gap-5 lg:gap-7">
            <div className="relative hidden items-stretch lg:flex" ref={shopRef}>
              <button
                type="button"
                className="nav-link inline-flex items-center py-4"
                aria-expanded={shopOpen}
                aria-controls="shop-menu"
                onClick={() => setShopOpen((v) => !v)}
              >
                Shop
              </button>
            </div>
            <div className="hidden items-center gap-5 lg:flex">
              {nav
                .filter((i) => i.href !== "/shop")
                .slice(0, 2)
                .map((item) => (
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
          </div>

          {/* Center wordmark */}
          <Link
            href="/"
            className="font-display flex shrink-0 items-center px-2 text-[1.55rem] leading-none tracking-[0.06em] md:text-[1.75rem]"
          >
            {brand.short}
          </Link>

          {/* Right */}
          <div className="flex flex-1 items-center justify-end gap-4 lg:gap-6">
            <div className="hidden items-center gap-5 lg:flex">
              {utility.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={pathname === item.href || undefined}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="nav-link"
                data-active={pathname === "/cart" || undefined}
              >
                Cart{count > 0 ? ` (${count})` : ""}
              </Link>
            </div>
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
              className="nav-link py-4 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>

        {/* Desktop Shop mega panel — HOE-style full-bleed dropdown */}
        <AnimatePresence>
          {shopOpen ? (
            <motion.div
              id="shop-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-30 hidden border-b border-[var(--gridline)] bg-[var(--bg)] lg:block"
            >
              <button
                type="button"
                className="fixed inset-0 z-[-1] cursor-default"
                aria-label="Close shop menu"
                onClick={() => setShopOpen(false)}
              />
              <div className="relative grid gap-10 px-6 py-8 md:grid-cols-3 md:gap-16">
                <div>
                  <p className="mb-3 text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                    Shop
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/shop"
                        className="nav-link !text-[0.8rem]"
                        onClick={() => setShopOpen(false)}
                      >
                        All products
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          href={`/shop?category=${encodeURIComponent(c)}`}
                          className="nav-link !text-[0.8rem]"
                          onClick={() => setShopOpen(false)}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                    Collections
                  </p>
                  <ul className="space-y-2">
                    {campaigns.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/shop?chapter=${c.shopFilter}`}
                          className="nav-link !text-[0.8rem]"
                          onClick={() => setShopOpen(false)}
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                    Explore
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/looks"
                        className="nav-link !text-[0.8rem]"
                        onClick={() => setShopOpen(false)}
                      >
                        Lookbook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/campaigns"
                        className="nav-link !text-[0.8rem]"
                        onClick={() => setShopOpen(false)}
                      >
                        Campaign index
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/film"
                        className="nav-link !text-[0.8rem]"
                        onClick={() => setShopOpen(false)}
                      >
                        Film
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/journal"
                        className="nav-link !text-[0.8rem]"
                        onClick={() => setShopOpen(false)}
                      >
                        Journal
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[var(--gridline)] lg:hidden"
            >
              <div className="grid gap-8 px-4 py-8 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-[0.65rem] tracking-[0.14em] uppercase">
                    Shop
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/shop"
                      className="font-display text-2xl"
                      onClick={() => setMobileOpen(false)}
                    >
                      All products
                    </Link>
                    {categories.map((c) => (
                      <Link
                        key={c}
                        href={`/shop?category=${encodeURIComponent(c)}`}
                        className="nav-link !text-[0.85rem]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[0.65rem] tracking-[0.14em] uppercase">
                    Site
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      ...nav.filter((i) => i.href !== "/shop"),
                      { href: "/contact", label: "Contact" },
                      {
                        href: "/cart",
                        label: count > 0 ? `Cart (${count})` : "Cart",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-display text-2xl"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
