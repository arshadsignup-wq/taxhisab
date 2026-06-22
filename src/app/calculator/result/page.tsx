'use client';

import ResultDisplay from '@/components/calculator/ResultDisplay';

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Your Tax Breakdown
          </h1>
          <p className="text-muted mt-2">
            Here is your complete income tax computation. Print this page or save
            it for reference when filing your e-Return.
          </p>
        </div>
        <ResultDisplay />
      </div>
    </div>
  );
}
