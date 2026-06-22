import Link from "next/link";

const quickLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Guide", href: "/guide" },
  { label: "Tax Rules", href: "/tax-rules" },
  { label: "FAQ", href: "/faq" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#002E22] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold mb-3">
              Tax Solution BD
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

          {/* Column 3: Important Notice */}
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
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/40">
          <span>&copy; {new Date().getFullYear()} Tax Solution BD. All rights reserved.</span>
          <span>Built for Bangladesh taxpayers</span>
        </div>
      </div>
    </footer>
  );
}
