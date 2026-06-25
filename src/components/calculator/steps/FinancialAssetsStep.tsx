'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { FinancialAssetsIncome } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const FIELD_KEYS: (keyof FinancialAssetsIncome)[] = [
  'bankInterest',
  'savingsCertificateInterest',
  'securitiesInterest',
  'listedDividends',
  'unlistedDividends',
  'otherFinancialIncome',
];

export default function FinancialAssetsStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const financialAssets = formData.financialAssets;

  const updateField = (key: keyof FinancialAssetsIncome, value: number) => {
    updateFormData('financialAssets', { [key]: value });
  };

  const total = FIELD_KEYS.reduce(
    (sum, key) => sum + (financialAssets[key] || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.financialAssets.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.financialAssets.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.financialAssets.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.financialAssets.infoText}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELD_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.financialAssets.fields[key].label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.financialAssets.fields[key].hint}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={financialAssets[key] || ''}
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
        <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Total Financial Assets Income:</span>{' '}
            <span className="text-primary font-bold text-lg">
              {formatBDT(total)}
            </span>
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
