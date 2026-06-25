'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { TaxExemptedIncome } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const FIELDS: { key: keyof TaxExemptedIncome; label: string; hint: string }[] = [
  {
    key: 'exemptedAgriculturalIncome',
    label: 'Exempted Agricultural Income',
    hint: 'Agricultural income up to BDT 2,00,000 per year is exempt. Enter only the exempt portion here.',
  },
  {
    key: 'exemptedDividends',
    label: 'Exempted Dividends',
    hint: 'Dividend income up to BDT 50,000 from listed companies is exempt from tax.',
  },
  {
    key: 'exemptedInterest',
    label: 'Exempted Interest Income',
    hint: 'Interest income that is exempt under law (e.g., certain government securities interest).',
  },
  {
    key: 'exemptedOther',
    label: 'Other Exempt Income',
    hint: 'Any other income exempt under the Income Tax Act, such as certain provident fund receipts or gratuity up to BDT 2.5 crore.',
  },
];

export default function TaxExemptedStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const taxExempted = formData.taxExempted;

  const updateField = (key: keyof TaxExemptedIncome, value: number) => {
    updateFormData('taxExempted', { [key]: value });
  };

  const total = FIELDS.reduce(
    (sum, { key }) => sum + (taxExempted[key] || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Tax-Exempted Income
        </h2>
        <p className="text-sm text-ink-muted">
          Income that is exempt from tax and will be deducted from your total income before applying tax slabs.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">What is tax-exempted income?</p>
        <p className="text-xs text-ink-muted">
          Tax-exempted income is subtracted from your total income before applying tax slabs. Only enter amounts that are legally exempt &mdash; do not double-count income already excluded from other sections.
        </p>
      </div>

      <div className="space-y-4">
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
                value={taxExempted[key] || ''}
                onChange={(e) =>
                  updateField(key, parseFloat(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="bg-success-light border border-success/20 rounded-xl p-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Total Tax-Exempted Income:</span>{' '}
            <span className="text-success font-bold text-lg">
              {formatBDT(total)}
            </span>
          </p>
          <p className="text-xs text-ink-muted mt-1">
            This amount will be subtracted from your total income before tax calculation.
          </p>
        </div>
      )}

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
