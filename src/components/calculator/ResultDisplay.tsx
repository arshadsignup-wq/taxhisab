'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import IT11GAResult from '@/components/calculator/result/IT11GAResult';

export default function ResultDisplay() {
  const { result, formData, resetFormData } = useCalculatorStore();

  const handlePrint = () => {
    window.print();
  };

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-rule elevation-2 p-12">
          <div className="w-16 h-16 rounded-2xl bg-cta-light flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-cta"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">
            Your results will appear here
          </h2>
          <p className="text-ink-muted mb-2">
            Complete the calculator steps to see your full income tax computation with slab-wise breakdown.
          </p>
          <p className="text-xs text-ink-subtle mb-6">
            It only takes a few minutes. Your data stays on your device.
          </p>
          <button
            type="button"
            onClick={resetFormData}
            className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Start Calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:px-0 print:py-0">
      {/* Header */}
      <div className="text-center mb-6 print:mb-4">
        <h1 className="font-display text-2xl font-bold text-ink">
          Income Tax Computation
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          IT-11GA &mdash; Bangladesh Income Tax Return
        </p>
      </div>

      <IT11GAResult result={result} formData={formData} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 print:hidden">
        <button
          type="button"
          onClick={resetFormData}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Start Over
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Print Results
        </button>
      </div>
    </div>
  );
}
