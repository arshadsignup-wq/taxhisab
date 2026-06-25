import Link from "next/link";
import { Shield } from "lucide-react";

const quickLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Guide", href: "/guide" },
  { label: "Tax Rules", href: "/tax-rules" },
  { label: "FAQ", href: "/faq" },
] as const;

const getStartedLinks = [
  { label: "Tax Calculator", href: "/calculator" },
  { label: "Filing Guide", href: "/guide" },
  { label: "Tax Slabs", href: "/tax-rules/slabs" },
  { label: "About TaxHisab", href: "/about" },
] as const;

export default function Footer() {
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
              Free income tax calculator and e-Return filing guide for
              Bangladesh taxpayers.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              Quick Links
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
              Get Started
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
              Important
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              This tool provides estimates only. Consult a tax professional for
              complex situations. Not affiliated with NBR.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <span>&copy; {new Date().getFullYear()} TaxHisab. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Your data never leaves your browser
          </span>
        </div>
      </div>
    </footer>
  );
}
