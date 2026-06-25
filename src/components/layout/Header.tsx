"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Calculator } from "lucide-react";
import MobileNav from "./MobileNav";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "@/i18n";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslation();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.calculator, href: "/calculator" },
    { label: t.nav.guide, href: "/guide" },
    { label: t.nav.taxRules, href: "/tax-rules" },
    { label: t.nav.faq, href: "/faq" },
    { label: t.nav.about, href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rule/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-lg font-extrabold text-primary">
                TaxHisab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
                    isActive(link.href)
                      ? "text-primary font-semibold bg-primary-light"
                      : "text-ink-muted font-normal hover:text-primary hover:bg-primary-light/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageToggle />
              <Link
                href="/calculator"
                className="ml-3 inline-flex items-center gap-1.5 bg-cta text-white font-semibold px-4 py-2 rounded-lg hover:bg-cta-dark text-sm"
              >
                <Calculator className="w-4 h-4" />
                {t.nav.calculateTax}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-ink-muted hover:text-primary hover:bg-surface-sunken"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
