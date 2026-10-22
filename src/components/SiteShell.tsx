"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/journal";

  return (
    <div className={`site-shell${hideFooter ? " site-shell--journal" : ""}`}>
      <Header />
      <main>{children}</main>
      {hideFooter ? null : <Footer />}
    </div>
  );
}
