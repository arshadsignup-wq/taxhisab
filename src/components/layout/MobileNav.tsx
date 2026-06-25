"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Calculator } from "lucide-react";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Focus management: trap focus inside panel when open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the close button when panel opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Return focus to the element that opened the menu
      previousFocusRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white elevation-3 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-rule">
          <span className="font-display text-lg font-bold text-primary">
            TaxHisab
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-ink-muted hover:text-primary hover:bg-surface-sunken"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-2 py-4 flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary-light font-semibold"
                    : "text-ink-muted hover:text-primary hover:bg-surface-sunken"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA button at bottom */}
          <div className="px-2 pb-4">
            <Link
              href="/calculator"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-cta text-white font-semibold px-4 py-3 rounded-lg hover:bg-cta-dark text-sm"
            >
              <Calculator className="w-4 h-4" />
              Calculate Tax
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
