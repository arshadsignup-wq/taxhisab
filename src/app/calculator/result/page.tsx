'use client';

import ResultDisplay from '@/components/calculator/ResultDisplay';

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-ink">
            Your Tax Breakdown
          </h1>
          <p className="text-ink-muted mt-2">
            Here is your complete IT-11GA income tax computation. Print this
            page and use it as a reference when filling the e-Return portal.
          </p>
        </div>
        <ResultDisplay />
      </div>
    </div>
  );
}
