'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { AgriculturalExpenseMethod } from '@/types/tax';
import { AGRICULTURAL_FLAT_EXPENSE_RATE } from '@/lib/tax-engine/constants';
import { formatBDT } from '@/lib/formatters';

export default function AgriculturalIncomeStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const agricultural = formData.agricultural;

  const toggleEnabled = () => {
    updateFormData('agricultural', { enabled: !agricultural.enabled });
  };

  const updateField = (
    field: keyof typeof agricultural,
    value: number | boolean | AgriculturalExpenseMethod
  ) => {
    updateFormData('agricultural', { [field]: value });
  };

  // Compute net income
  const flatExpenses = agricultural.grossIncome * AGRICULTURAL_FLAT_EXPENSE_RATE;
  const expenses =
    agricultural.expenseMethod === 'flat_rate'
      ? flatExpenses
      : agricultural.actualExpenses;
  const netIncome = Math.max(0, agricultural.grossIncome - expenses);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Agricultural Income
        </h2>
        <p className="text-sm text-muted">
          Enter your agricultural income details.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            agricultural.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={toggleEnabled}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              agricultural.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">I have agricultural income</span>
      </label>

      {!agricultural.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No agricultural income &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Gross Income */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Gross Agricultural Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={agricultural.grossIncome || ''}
                onChange={(e) =>
                  updateField('grossIncome', parseFloat(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>

          {/* Expense Method */}
          <fieldset>
            <legend className="block text-sm font-medium text-foreground mb-3">
              Expense Deduction Method
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="radio"
                  name="expenseMethod"
                  value="flat_rate"
                  checked={agricultural.expenseMethod === 'flat_rate'}
                  onChange={() => updateField('expenseMethod', 'flat_rate')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    Flat Rate (60%)
                  </span>
                  <p className="text-xs text-muted">
                    Standard deduction of 60% of gross income
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="radio"
                  name="expenseMethod"
                  value="actual"
                  checked={agricultural.expenseMethod === 'actual'}
                  onChange={() => updateField('expenseMethod', 'actual')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    Actual Expenses
                  </span>
                  <p className="text-xs text-muted">
                    Deduct actual expenses incurred
                  </p>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Actual Expenses (only if actual method) */}
          {agricultural.expenseMethod === 'actual' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Actual Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

          {/* Computed Net Income */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">Expenses:</span>{' '}
                <span className="text-muted">{formatBDT(expenses)}</span>
                {agricultural.expenseMethod === 'flat_rate' && (
                  <span className="text-xs text-muted ml-1">(60% flat rate)</span>
                )}
              </p>
              <p className="text-sm text-foreground">
                <span className="font-medium">Net Agricultural Income:</span>{' '}
                <span className="text-primary font-bold text-lg">
                  {formatBDT(netIncome)}
                </span>
              </p>
            </div>
          </div>
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
