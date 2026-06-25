'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { FinancialAssetsIncome } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const FIELDS: { key: keyof FinancialAssetsIncome; label: string; hint: string }[] = [
  { key: 'bankInterest', label: 'Interest on Bank Deposits', hint: 'Interest earned on savings accounts, fixed deposits (FDR), and other bank deposits during the year.' },
  { key: 'savingsCertificateInterest', label: 'Interest on Savings Certificates', hint: 'Interest or profit from Sanchayapatra (National Savings Certificates) like 5-year, Family, Pensioner\'s, etc.' },
  { key: 'securitiesInterest', label: 'Interest on Securities', hint: 'Interest from government securities, treasury bills/bonds, or debentures.' },
  { key: 'listedDividends', label: 'Dividends (Listed Companies)', hint: 'Dividend income from companies listed on DSE/CSE stock exchanges.' },
  { key: 'unlistedDividends', label: 'Dividends (Unlisted Companies)', hint: 'Dividend income from private or unlisted companies.' },
  { key: 'otherFinancialIncome', label: 'Other Financial Income', hint: 'Any other income from financial assets not covered above (e.g., mutual fund gains).' },
];

export default function FinancialAssetsStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const financialAssets = formData.financialAssets;

  const updateField = (key: keyof FinancialAssetsIncome, value: number) => {
    updateFormData('financialAssets', { [key]: value });
  };

  const total = FIELDS.reduce(
    (sum, { key }) => sum + (financialAssets[key] || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Income from Financial Assets
        </h2>
        <p className="text-sm text-ink-muted">
          IT-11GA Serial 6 &mdash; Income earned from your savings, investments, and financial instruments. This is a separate income head from other sources.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">About TDS on financial income</p>
        <p className="text-xs text-ink-muted">
          Banks and financial institutions deduct TDS (Tax Deducted at Source) on interest and dividends. Enter the gross amount here (before TDS deduction). You can claim the TDS credit in the Tax Payments step later.
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
