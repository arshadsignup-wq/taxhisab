'use client';

import Link from "next/link";
import { Shield } from "lucide-react";
import { useTranslation } from "@/i18n";

export default function Footer() {
  const t = useTranslation();

  const quickLinks = [
    { label: t.nav.calculator, href: "/calculator" },
    { label: t.nav.guide, href: "/guide" },
    { label: t.nav.taxRules, href: "/tax-rules" },
    { label: t.nav.faq, href: "/faq" },
  ];

  const getStartedLinks = [
    { label: t.footer.taxCalculator, href: "/calculator" },
    { label: t.footer.filingGuide, href: "/guide" },
    { label: t.footer.taxSlabs, href: "/tax-rules/slabs" },
    { label: t.footer.aboutTaxHisab, href: "/about" },
  ];

  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-display text-xl font-extrabold mb-3">
              TaxHisab
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Started */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              {t.footer.getStarted}
            </h4>
            <ul className="space-y-3">
              {getStartedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Important Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              {t.footer.important}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              {t.footer.importantText}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <span>&copy; {new Date().getFullYear()} {t.footer.copyright}</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {t.footer.privacyNote}
          </span>
        </div>
      </div>
    </footer>
  );
}
