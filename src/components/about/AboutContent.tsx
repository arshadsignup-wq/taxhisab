'use client';

import Link from 'next/link';
import { Shield, Calculator, BookOpen, Scale } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function AboutContent() {
  const t = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-ink">
        {t.about.title}
      </h1>
      <p className="text-ink-muted mb-8 text-lg leading-relaxed">
        {t.about.subtitle}
      </p>

      {t.about.sections.map((section) => (
        <section key={section.heading} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-ink">{section.heading}</h2>
          <p className="text-ink-muted leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-ink">What You Get</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border border-rule rounded-xl elevation-1-interactive">
            <Calculator className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1 text-ink">Tax Calculator</h3>
            <p className="text-sm text-ink-muted">
              Covers all six income heads, investment rebates, minimum tax, and
              surcharge. Get your exact net payable in minutes.
            </p>
          </div>
          <div className="p-4 border border-rule rounded-xl elevation-1-interactive">
            <BookOpen className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1 text-ink">Filing Guide</h3>
            <p className="text-sm text-ink-muted">
              Screen-by-screen walkthrough of the NBR e-Return portal, from
              creating your account to downloading your acknowledgment receipt.
            </p>
          </div>
          <div className="p-4 border border-rule rounded-xl elevation-1-interactive">
            <Scale className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1 text-ink">Tax Rules Reference</h3>
            <p className="text-sm text-ink-muted">
              Current and past-year slabs, exemption limits, and surcharge
              rates in plain language. No legal jargon.
            </p>
          </div>
          <div className="p-4 border border-rule rounded-xl elevation-1-interactive">
            <Shield className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1 text-ink">Complete Privacy</h3>
            <p className="text-sm text-ink-muted">
              No server, no account, no tracking. Every calculation runs in
              your browser. Your data stays on your device.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-ink">Disclaimer</h2>
        <div className="bg-warning-light border border-warning/20 rounded-xl p-4">
          <p className="text-sm text-ink leading-relaxed">
            TaxHisab provides tax estimates based on the information you
            enter and current published tax rules. This tool is for
            informational purposes only and does not constitute professional tax
            advice. We are not affiliated with the National Board of Revenue
            (NBR) or any government body. For complex tax situations, please
            consult a registered tax professional.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-ink">Ready to Try It?</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 bg-cta text-white font-medium px-6 py-3 rounded-lg hover:bg-cta-dark transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Tax
          </Link>
          <Link
            href="/guide"
            className="inline-flex items-center justify-center gap-2 border border-rule text-ink font-medium px-6 py-3 rounded-lg hover:bg-surface-sunken transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Read the Filing Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
