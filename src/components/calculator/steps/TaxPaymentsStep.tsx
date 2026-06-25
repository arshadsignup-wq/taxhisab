'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { TdsEntry, AdvanceTaxEntry } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

export default function TaxPaymentsStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const taxPayments = formData.taxPayments;

  // ─── TDS Entries ──────────────────────────────────────────────

  const updateTds = (index: number, field: keyof TdsEntry, value: string | number) => {
    const updated = [...taxPayments.tdsEntries];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('taxPayments', { tdsEntries: updated });
  };

  const addTds = () => {
    updateFormData('taxPayments', {
      tdsEntries: [...taxPayments.tdsEntries, { source: '', amount: 0 }],
    });
  };

  const removeTds = (index: number) => {
    const updated = taxPayments.tdsEntries.filter((_, i) => i !== index);
    updateFormData('taxPayments', {
      tdsEntries: updated.length > 0 ? updated : [{ source: '', amount: 0 }],
    });
  };

  // ─── Advance Tax Entries ──────────────────────────────────────

  const updateAdvanceTax = (
    index: number,
    field: keyof AdvanceTaxEntry,
    value: string | number
  ) => {
    const updated = [...taxPayments.advanceTaxEntries];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('taxPayments', { advanceTaxEntries: updated });
  };

  const addAdvanceTax = () => {
    updateFormData('taxPayments', {
      advanceTaxEntries: [
        ...taxPayments.advanceTaxEntries,
        { date: '', amount: 0 },
      ],
    });
  };

  const removeAdvanceTax = (index: number) => {
    const updated = taxPayments.advanceTaxEntries.filter((_, i) => i !== index);
    updateFormData('taxPayments', {
      advanceTaxEntries:
        updated.length > 0 ? updated : [{ date: '', amount: 0 }],
    });
  };

  const totalTds = taxPayments.tdsEntries.reduce((s, e) => s + e.amount, 0);
  const totalAdvance = taxPayments.advanceTaxEntries.reduce(
    (s, e) => s + e.amount,
    0
  );
  const grandTotal =
    totalTds +
    totalAdvance +
    taxPayments.taxRefundAdjustment +
    taxPayments.taxPaidWithReturn;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Tax Payments
        </h2>
        <p className="text-sm text-ink-muted">
          IT-11GA Part C &mdash; Enter taxes you have already paid during the year. This includes TDS deducted by your employer or bank, advance tax you paid yourself, and any other tax payments. These amounts will be credited against your final tax liability.
        </p>
      </div>

      {/* TDS Entries */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-1">
          Tax Deducted at Source (TDS)
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          Your employer, bank, or other payers may have already deducted tax from your income. Check your salary certificate or bank statements for TDS amounts.
        </p>
        <div className="space-y-3">
          {taxPayments.tdsEntries.map((entry, index) => (
            <div key={index} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs text-ink-muted mb-1">Source</label>
                <input
                  type="text"
                  placeholder="e.g., Salary, Bank Interest"
                  className="w-full px-3 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta text-sm"
                  value={entry.source}
                  onChange={(e) => updateTds(index, 'source', e.target.value)}
                />
              </div>
              <div className="w-40">
                <label className="block text-xs text-ink-muted mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-3 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta text-sm"
                    value={entry.amount || ''}
                    onChange={(e) =>
                      updateTds(index, 'amount', parseFloat(e.target.value) || 0)
                    }
                    min={0}
                  />
                </div>
              </div>
              {taxPayments.tdsEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTds(index)}
                  className="text-error hover:text-error text-sm pb-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTds}
          className="mt-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          + Add TDS Entry
        </button>
      </div>

      {/* Advance Tax Entries */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-1">
          Advance Tax Paid
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          If you paid tax in advance during the income year (quarterly payments), enter each payment with its date.
        </p>
        <div className="space-y-3">
          {taxPayments.advanceTaxEntries.map((entry, index) => (
            <div key={index} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs text-ink-muted mb-1">Date</label>
                <input
                  type="text"
                  placeholder="e.g., 15 Sep 2025"
                  className="w-full px-3 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta text-sm"
                  value={entry.date}
                  onChange={(e) =>
                    updateAdvanceTax(index, 'date', e.target.value)
                  }
                />
              </div>
              <div className="w-40">
                <label className="block text-xs text-ink-muted mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-3 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta text-sm"
                    value={entry.amount || ''}
                    onChange={(e) =>
                      updateAdvanceTax(
                        index,
                        'amount',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    min={0}
                  />
                </div>
              </div>
              {taxPayments.advanceTaxEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAdvanceTax(index)}
                  className="text-error hover:text-error text-sm pb-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAdvanceTax}
          className="mt-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          + Add Advance Tax Entry
        </button>
      </div>

      {/* Other payments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Tax Refund Adjustment
          </label>
          <p className="text-xs text-ink-muted mb-1">If you have a tax refund from a previous year that NBR adjusted against this year&apos;s liability, enter that amount here.</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
              ৳
            </span>
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
              value={taxPayments.taxRefundAdjustment || ''}
              onChange={(e) =>
                updateFormData('taxPayments', {
                  taxRefundAdjustment: parseFloat(e.target.value) || 0,
                })
              }
              min={0}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Tax Paid with This Return
          </label>
          <p className="text-xs text-ink-muted mb-1">The amount of tax you are paying now along with this return (e.g., via bank challan at the time of filing).</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
              ৳
            </span>
            <input
              type="number"
              className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
              value={taxPayments.taxPaidWithReturn || ''}
              onChange={(e) =>
                updateFormData('taxPayments', {
                  taxPaidWithReturn: parseFloat(e.target.value) || 0,
                })
              }
              min={0}
            />
          </div>
        </div>
      </div>

      {grandTotal > 0 && (
        <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Total Tax Already Paid:</span>{' '}
            <span className="text-primary font-bold text-lg">
              {formatBDT(grandTotal)}
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
