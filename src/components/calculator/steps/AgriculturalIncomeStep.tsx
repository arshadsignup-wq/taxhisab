'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { AgriculturalExpenseMethod } from '@/types/tax';
import { AGRICULTURAL_FLAT_EXPENSE_RATE } from '@/lib/tax-engine/constants';
import { formatBDT } from '@/lib/formatters';

export default function AgriculturalIncomeStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const agricultural = formData.agricultural;

  const updateField = (
    field: keyof typeof agricultural,
    value: number | AgriculturalExpenseMethod
  ) => {
    updateFormData('agricultural', { [field]: value });
  };

  const flatExpenses = agricultural.grossIncome * AGRICULTURAL_FLAT_EXPENSE_RATE;
  const expenses =
    agricultural.expenseMethod === 'flat_rate'
      ? flatExpenses
      : agricultural.actualExpenses;
  const netIncome = Math.max(0, agricultural.grossIncome - expenses);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Agricultural Income
        </h2>
        <p className="text-sm text-ink-muted">
          Income from farming, fisheries, poultry, dairy, or sale of agricultural produce from your own land.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">About agricultural income</p>
        <p className="text-xs text-ink-muted">
          Agricultural income up to BDT 2,00,000 is generally exempt from tax. The net income calculated here is added to your total income for slab-rate purposes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Gross Agricultural Income
          </label>
          <p className="text-xs text-ink-muted mb-1">Total income from all agricultural activities during the year, before deducting expenses.</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
              ৳
            </span>
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
              value={agricultural.grossIncome || ''}
              onChange={(e) =>
                updateField('grossIncome', parseFloat(e.target.value) || 0)
              }
              min={0}
            />
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-ink mb-3">
            Expense Deduction Method
          </legend>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-rule rounded-lg cursor-pointer hover:bg-surface-sunken transition-colors has-[:checked]:border-cta has-[:checked]:bg-cta-light">
              <input
                type="radio"
                name="expenseMethod"
                value="flat_rate"
                checked={agricultural.expenseMethod === 'flat_rate'}
                onChange={() => updateField('expenseMethod', 'flat_rate')}
                className="w-4 h-4 text-cta focus:ring-cta"
              />
              <div>
                <span className="text-sm font-medium text-ink">
                  Flat Rate (60%)
                </span>
                <p className="text-xs text-ink-muted">
                  NBR allows a standard 60% deduction without needing receipts.
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-rule rounded-lg cursor-pointer hover:bg-surface-sunken transition-colors has-[:checked]:border-cta has-[:checked]:bg-cta-light">
              <input
                type="radio"
                name="expenseMethod"
                value="actual"
                checked={agricultural.expenseMethod === 'actual'}
                onChange={() => updateField('expenseMethod', 'actual')}
                className="w-4 h-4 text-cta focus:ring-cta"
              />
              <div>
                <span className="text-sm font-medium text-ink">
                  Actual Expenses
                </span>
                <p className="text-xs text-ink-muted">
                  Deduct your actual farming expenses (seeds, fertilizer, labor, etc.). Keep receipts as proof.
                </p>
              </div>
            </label>
          </div>
        </fieldset>

        {agricultural.expenseMethod === 'actual' && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Actual Expenses
            </label>
            <p className="text-xs text-ink-muted mb-1">Total amount spent on agricultural activities during the year.</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={agricultural.actualExpenses || ''}
                onChange={(e) =>
                  updateField(
                    'actualExpenses',
                    parseFloat(e.target.value) || 0
                  )
                }
                min={0}
              />
            </div>
          </div>
        )}

        {agricultural.grossIncome > 0 && (
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-ink">
                <span className="font-medium">Expenses:</span>{' '}
                <span className="text-ink-muted">{formatBDT(expenses)}</span>
                {agricultural.expenseMethod === 'flat_rate' && (
                  <span className="text-xs text-ink-muted ml-1">(60% flat rate)</span>
                )}
              </p>
              <p className="text-sm text-ink">
                <span className="font-medium">Net Agricultural Income:</span>{' '}
                <span className="text-primary font-bold text-lg">
                  {formatBDT(netIncome)}
                </span>
              </p>
            </div>
          </div>
        )}
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
