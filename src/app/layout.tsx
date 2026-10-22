import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { SiteShell } from "@/components/SiteShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Figtree({
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('gttw-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <ThemeProvider>
          <CartProvider>
            <SiteShell>{children}</SiteShell>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
