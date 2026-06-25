'use client';

import CalculatorWizard from '@/components/calculator/CalculatorWizard';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-surface py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink">
            Income Tax Calculator
          </h1>
          <p className="text-ink-muted mt-2">
            Select your income types, fill in the relevant details, and get your
            complete IT-11GA tax computation with serial numbers matching the
            official NBR form.
          </p>
        </div>
        <CalculatorWizard />
      </div>
    </div>
  );
}
