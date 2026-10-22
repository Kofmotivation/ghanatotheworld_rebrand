import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <div className="atmosphere" aria-hidden />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
