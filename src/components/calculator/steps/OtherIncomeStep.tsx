'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { OtherIncome } from '@/types/tax';

const FIELDS: { key: keyof OtherIncome; label: string; hint: string }[] = [
  { key: 'foreignRemittance', label: 'Foreign Remittance', hint: 'Income received from abroad (wage earner\'s remittance). Note: remittance through legal banking channels may be tax-exempt.' },
  { key: 'royaltyIncome', label: 'Royalty Income', hint: 'Income from royalties, copyrights, patents, or intellectual property.' },
  { key: 'otherSources', label: 'Other Sources', hint: 'Any other taxable income: lottery winnings, gifts above exemption limit, or income not classified elsewhere.' },
];

export default function OtherIncomeStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const otherIncome = formData.otherIncome;

  const updateField = (key: keyof OtherIncome, value: number) => {
    updateFormData('otherIncome', { [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Other Income
        </h2>
        <p className="text-sm text-ink-muted">
          IT-11GA Serial 7 &mdash; Any income that doesn&apos;t fit into the other categories above. This includes foreign remittance, royalty, and other miscellaneous sources.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{hint}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={otherIncome[key] || ''}
                onChange={(e) =>
                  updateField(key, parseFloat(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-rule">
        <button
          type="button"
          onClick={prevStep}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
