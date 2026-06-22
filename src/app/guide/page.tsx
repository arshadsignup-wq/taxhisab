import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'e-Return Filing Guide | TaxHisab',
  description:
    'Step-by-step guide to filing your Bangladesh income tax return online. Covers TIN registration, the NBR e-Return portal, income entry, deductions, and submission.',
};

const guideSections = [
  {
    number: 1,
    title: 'Registration',
    description:
      'Get your e-TIN and set up your account on the NBR e-Return portal. This is a one-time step. You only do it your first year.',
    href: '/guide/registration',
  },
  {
    number: 2,
    title: 'e-Return Filing',
    description:
      'A screen-by-screen walkthrough of the online return form: selecting your assessment year, entering personal details, and navigating the portal.',
    href: '/guide/ereturn-filing',
  },
  {
    number: 3,
    title: 'Income Entry',
    description:
      'How to correctly report salary, business income, rental income, capital gains, and other sources. Only fill in what applies to you.',
    href: '/guide/income-entry',
  },
  {
    number: 4,
    title: 'Deductions & Rebate',
    description:
      'Which investments qualify for the 15% tax rebate and how the admissible amount is calculated. DPS, insurance, provident fund, and more.',
    href: '/guide/deductions-rebate',
  },
  {
    number: 5,
    title: 'Assets & Liabilities',
    description:
      'When you need to submit the IT-10B form and what to include: property, vehicles, investments, loans, and bank balances.',
    href: '/guide/assets-liabilities',
  },
  {
    number: 6,
    title: 'Submission',
    description:
      'Final review checklist, tax payment options, how to submit, and how to download your acknowledgment receipt as proof of filing.',
    href: '/guide/submission',
  },
];

export default function GuidePage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          File Your Own e-Return
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          First time filing? This guide covers every step, from getting your
          TIN to downloading your acknowledgment receipt. Follow the sections in
          order, or jump to the one you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {guideSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block border border-border rounded-lg p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {section.number}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {section.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
