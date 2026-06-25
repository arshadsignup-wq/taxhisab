'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { TaxExemptedIncome } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const FIELD_KEYS: (keyof TaxExemptedIncome)[] = [
  'exemptedAgriculturalIncome',
  'exemptedDividends',
  'exemptedInterest',
  'exemptedOther',
];

export default function TaxExemptedStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const taxExempted = formData.taxExempted;

  const updateField = (key: keyof TaxExemptedIncome, value: number) => {
    updateFormData('taxExempted', { [key]: value });
  };

  const total = FIELD_KEYS.reduce(
    (sum, key) => sum + (taxExempted[key] || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.taxExempted.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.taxExempted.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.taxExempted.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.taxExempted.infoText}
        </p>
      </div>

      <div className="space-y-4">
        {FIELD_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.taxExempted.fields[key].label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.taxExempted.fields[key].hint}</p>
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
            <span className="font-medium">{t.calculator.taxExempted.totalExempted}</span>{' '}
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
          {t.common.previous}
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.next}
        </button>
      </div>
    </div>
  );
}
