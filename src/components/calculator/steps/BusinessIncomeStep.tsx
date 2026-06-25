'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import { formatBDT } from '@/lib/formatters';

export default function BusinessIncomeStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const business = formData.business;

  const updateField = (
    field: keyof typeof business,
    value: number | boolean
  ) => {
    const updates: Partial<typeof business> = { [field]: value };

    if (field === 'grossReceipts' || field === 'expenses') {
      const gross =
        field === 'grossReceipts'
          ? (value as number)
          : business.grossReceipts;
      const expenses =
        field === 'expenses' ? (value as number) : business.expenses;
      updates.netProfit = gross - expenses;
    }

    updateFormData('business', updates);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.business.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.business.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.business.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.business.infoText}
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={business.isFreelancer}
            onChange={(e) => updateField('isFreelancer', e.target.checked)}
            className="w-4 h-4 text-cta rounded focus:ring-cta"
          />
          <div>
            <span className="text-sm font-medium text-ink">
              {t.calculator.business.freelancerLabel}
            </span>
            <p className="text-xs text-ink-muted">{t.calculator.business.freelancerHint}</p>
          </div>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.business.fields.grossReceipts.label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.business.fields.grossReceipts.hint}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={business.grossReceipts || ''}
                onChange={(e) =>
                  updateField(
                    'grossReceipts',
                    parseFloat(e.target.value) || 0
                  )
                }
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.business.fields.expenses.label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.business.fields.expenses.hint}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={business.expenses || ''}
                onChange={(e) =>
                  updateField('expenses', parseFloat(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Net Profit:</span>{' '}
            <span
              className={`font-bold text-lg ${
                business.netProfit >= 0 ? 'text-primary' : 'text-error'
              }`}
            >
              {formatBDT(business.netProfit)}
            </span>
          </p>
          <p className="text-xs text-ink-muted mt-1">
            Auto-calculated as Gross Receipts minus Expenses.
          </p>
        </div>
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
