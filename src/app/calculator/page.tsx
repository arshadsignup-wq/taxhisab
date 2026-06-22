'use client';

import CalculatorWizard from '@/components/calculator/CalculatorWizard';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Income Tax Calculator
          </h1>
          <p className="text-muted mt-2">
            Answer a few questions about your income and investments. Get your
            exact tax liability with a full slab-wise breakdown.
          </p>
        </div>
        <CalculatorWizard />
      </div>
    </div>
  );
}
