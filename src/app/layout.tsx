import type { Metadata } from "next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "TaxHisab | Free Bangladesh Income Tax Calculator & Filing Guide",
    template: "%s | TaxHisab",
  },
  description:
    "Know your exact Bangladesh income tax in minutes. Free calculator covering all six income heads, investment rebates, and slab-wise breakdowns, plus a step-by-step NBR e-Return filing guide. No sign-up. No server. 100% private.",
  keywords: [
    "Bangladesh income tax calculator",
    "e-Return filing guide",
    "NBR tax calculator",
    "income tax Bangladesh 2026",
    "tax slab calculator BD",
    "taxhisab",
    "আয়কর ক্যালকুলেটর",
  ],
  authors: [{ name: "TaxHisab" }],
  openGraph: {
    title: "TaxHisab | Free Bangladesh Income Tax Calculator",
    description:
      "Calculate your exact Bangladesh income tax in minutes. Free, private, no sign-up required.",
    type: "website",
    locale: "en_BD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-cta focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
