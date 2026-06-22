"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const guideSections = [
  { number: 1, label: "Registration", href: "/guide/registration" },
  { number: 2, label: "e-Return Filing", href: "/guide/ereturn-filing" },
  { number: 3, label: "Income Entry", href: "/guide/income-entry" },
  { number: 4, label: "Deductions & Rebate", href: "/guide/deductions-rebate" },
  {
    number: 5,
    label: "Assets & Liabilities",
    href: "/guide/assets-liabilities",
  },
  { number: 6, label: "Submission", href: "/guide/submission" },
] as const;

export default function GuideSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (href: string) => pathname === href;

  const activeSection = guideSections.find((s) => isActive(s.href));

  return (
    <>
      {/* Mobile: Collapsible dropdown */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>
            {activeSection
              ? `${activeSection.number}. ${activeSection.label}`
              : "Guide Sections"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <nav className="py-1">
              {guideSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive(section.href)
                      ? "text-[#006A4E] bg-[#006A4E]/5 font-medium"
                      : "text-gray-600 hover:text-[#006A4E] hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 ${
                      isActive(section.href)
                        ? "bg-[#006A4E] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {section.number}
                  </span>
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop: Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Guide Sections
            </h3>
          </div>
          <nav className="py-1">
            {guideSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2 ${
                  isActive(section.href)
                    ? "text-[#006A4E] bg-[#006A4E]/5 font-medium border-l-[#006A4E]"
                    : "text-gray-600 hover:text-[#006A4E] hover:bg-gray-50 border-l-transparent"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 ${
                    isActive(section.href)
                      ? "bg-[#006A4E] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {section.number}
                </span>
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
