import type { Metadata } from "next";
import { Bebas_Neue, Public_Sans } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "GTTW — Ghana To The World",
    template: "%s — GTTW",
  },
  description:
    "“Ghana To The World” is a gift of love that arose from the founders’ enthusiasm towards cultural expression, specifically through design, fashion & film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
