"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Calculator", href: "/calculator" },
  { label: "Guide", href: "/guide" },
  { label: "Tax Rules", href: "/tax-rules" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
] as const;

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-rule">
          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-green-deep">
            TaxHisab
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-ink-muted hover:text-green-deep hover:bg-surface transition-colors"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-2 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "text-green-deep bg-green-mist border-l-3 border-gold"
                  : "text-ink-muted hover:text-green-deep hover:bg-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
