import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Rules',
  description:
    'Bangladesh income tax slabs, exemptions, thresholds, and surcharge rules for AY 2024-2025 through 2026-2027.',
};

export default function TaxRulesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Bangladesh Tax Rules at a Glance</h1>
      <p className="text-muted mb-10 max-w-2xl">
        Tax rates and thresholds change every assessment year. Here are the
        current rules you need to know, organized by topic so you can find
        what you&apos;re looking for quickly.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <RuleCard
          href="/tax-rules/slabs"
          title="Tax Slabs & Rates"
          description="Progressive slab rates and tax-free thresholds for general, female, senior, disabled, and freedom fighter taxpayers. Includes worked examples."
        />
        <RuleCard
          href="/tax-rules/exemptions"
          title="Exemptions & Thresholds"
          description="Salary exemption limits for HRA, medical, and conveyance. Investment rebate calculation. Minimum tax amounts by location."
        />
        <RuleCard
          href="/tax-rules/surcharge"
          title="Surcharge Rules"
          description="Net wealth surcharge rates (starting at BDT 4 crore) and environmental surcharge for multiple vehicle owners."
        />
      </div>
    </div>
  );
}

function RuleCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
    >
      <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="text-muted text-sm mb-4">{description}</p>
      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
        View details <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
