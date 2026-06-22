'use client';

import { useCalculatorStore } from '@/store/calculator-store';

export default function OtherIncomeStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const otherIncome = formData.otherIncome;

  const toggleEnabled = () => {
    updateFormData('otherIncome', { enabled: !otherIncome.enabled });
  };

  const updateField = (field: keyof typeof otherIncome, value: number) => {
    updateFormData('otherIncome', { [field]: value });
  };

  const fields: { key: keyof typeof otherIncome; label: string }[] = [
    { key: 'bankInterest', label: 'Interest on Bank Deposits / Savings' },
    { key: 'dividends', label: 'Dividends' },
    { key: 'remittance', label: 'Foreign Remittance' },
    { key: 'otherSources', label: 'Other Sources' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Other Income
        </h2>
        <p className="text-sm text-muted">
          Enter income from interest, dividends, remittance, and other sources.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            otherIncome.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={toggleEnabled}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              otherIncome.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">I have other income</span>
      </label>

      {!otherIncome.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No other income &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-foreground mb-1">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={(otherIncome[key] as number) || ''}
                  onChange={(e) =>
                    updateField(key, parseFloat(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          type="button"
          onClick={prevStep}
          className="border border-border hover:bg-gray-50 text-foreground px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
