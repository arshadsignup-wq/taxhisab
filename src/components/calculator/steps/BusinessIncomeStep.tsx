'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { formatBDT } from '@/lib/formatters';

export default function BusinessIncomeStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const business = formData.business;

  const updateField = (
    field: keyof typeof business,
    value: number | boolean
  ) => {
    const updates: Partial<typeof business> = { [field]: value };

    // Auto-calculate net profit when gross or expenses change
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
        <h2 className="text-xl font-bold text-foreground mb-1">
          Business / Professional Income
        </h2>
        <p className="text-sm text-muted">
          Enter your business or professional income details.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            business.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={() => updateField('enabled', !business.enabled)}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              business.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">
          I have business / professional income
        </span>
      </label>

      {!business.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No business income &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Freelancer Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={business.isFreelancer}
              onChange={(e) => updateField('isFreelancer', e.target.checked)}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              I am a freelancer / IT professional
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gross Receipts */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Gross Receipts / Turnover
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

            {/* Expenses */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Allowable Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={business.expenses || ''}
                  onChange={(e) =>
                    updateField('expenses', parseFloat(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Net Profit (auto-calculated) */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <span className="font-medium">Net Profit:</span>{' '}
              <span
                className={`font-bold text-lg ${
                  business.netProfit >= 0 ? 'text-primary' : 'text-red-600'
                }`}
              >
                {formatBDT(business.netProfit)}
              </span>
            </p>
            <p className="text-xs text-muted mt-1">
              Auto-calculated as Gross Receipts minus Expenses.
            </p>
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
