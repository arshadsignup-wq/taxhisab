import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Calculator, BookOpen, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'TaxHisab is a free, private income tax calculator and e-Return filing guide built for Bangladesh taxpayers.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">
        Why Does Filing Your Taxes Feel So Hard?
      </h1>
      <p className="text-muted mb-8 text-lg leading-relaxed">
        It shouldn&apos;t. For most salaried workers in Bangladesh, calculating
        income tax is basic arithmetic: add your income, subtract the threshold,
        apply the slab rates. But the NBR portal is confusing, the rules change
        yearly, and the jargon makes it feel like you need a professional. So
        people pay BDT 5,000-15,000 to consultants for a return they could file
        themselves.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">What TaxHisab Does</h2>
        <p className="text-muted leading-relaxed mb-4">
          We built this tool to remove the middleman. TaxHisab walks you
          through the exact same calculation your consultant does, but for free,
          in your browser, without sharing your financial data with anyone.
        </p>
        <p className="text-muted leading-relaxed">
          Every tax slab, every exemption limit, every surcharge rule is sourced
          directly from published NBR regulations. When the rules change for a
          new assessment year, we update the tool. You always get the current
          numbers.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">What You Get</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <Calculator className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Tax Calculator</h3>
            <p className="text-sm text-muted">
              Covers all six income heads, investment rebates, minimum tax, and
              surcharge. Get your exact net payable in minutes.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <BookOpen className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Filing Guide</h3>
            <p className="text-sm text-muted">
              Screen-by-screen walkthrough of the NBR e-Return portal, from
              creating your account to downloading your acknowledgment receipt.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <Scale className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Tax Rules Reference</h3>
            <p className="text-sm text-muted">
              Current and past-year slabs, exemption limits, and surcharge
              rates in plain language. No legal jargon.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <Shield className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Complete Privacy</h3>
            <p className="text-sm text-muted">
              No server, no account, no tracking. Every calculation runs in
              your browser. Your data stays on your device.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Who This Is For</h2>
        <p className="text-muted leading-relaxed">
          Salaried employees filing for the first time. Small business owners
          who want to understand their own liability before talking to a
          professional. Anyone with a TIN who needs to file a return and wants
          to do it without paying for help. If your tax situation involves
          complex corporate structures or international income, you should
          consult a registered tax professional. But for straightforward
          returns, this tool is all you need.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900 leading-relaxed">
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
        <h2 className="text-xl font-semibold mb-4">Ready to Try It?</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Tax
          </Link>
          <Link
            href="/guide"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Read the Filing Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
