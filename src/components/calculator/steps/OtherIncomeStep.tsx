'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { OtherIncome } from '@/types/tax';

const FIELD_KEYS: (keyof OtherIncome)[] = [
  'foreignRemittance',
  'royaltyIncome',
  'otherSources',
];

export default function OtherIncomeStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const otherIncome = formData.otherIncome;

  const updateField = (key: keyof OtherIncome, value: number) => {
    updateFormData('otherIncome', { [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.otherIncome.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.otherIncome.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELD_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.otherIncome.fields[key].label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.otherIncome.fields[key].hint}</p>
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
