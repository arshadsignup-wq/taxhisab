'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { InvestmentRebate } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';
import { getInvestmentIncomePercentage } from '@/lib/tax-engine/constants';

const FIELDS: { key: keyof InvestmentRebate; label: string; hint: string }[] = [
  { key: 'lifeInsurance', label: 'Life Insurance Premium', hint: 'Annual premium paid for life insurance policy. The policy must be in your name or your spouse\'s.' },
  { key: 'depositPensionScheme', label: 'Deposit Pension Scheme (DPS)', hint: 'Monthly deposits into a bank DPS account. Enter the total amount deposited during the year.' },
  { key: 'providentFund', label: 'Provident Fund Contribution', hint: 'Your personal contribution to Provident Fund (GPF/CPF). Employer\'s contribution is not included here.' },
  { key: 'savingsCertificates', label: 'Savings Certificates (Sanchayapatra)', hint: 'Amount invested in National Savings Certificates during the year.' },
  { key: 'stockInvestment', label: 'Stock Market Investment', hint: 'Net investment in shares of listed companies through DSE/CSE during the year.' },
  { key: 'donations', label: 'Donations', hint: 'Donations to government-approved charitable organizations, hospitals, or educational institutions.' },
  { key: 'otherInvestments', label: 'Other Eligible Investments', hint: 'Treasury bonds, mutual funds, or any other investments qualifying for rebate under Section 78.' },
];

export default function InvestmentRebateStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const investment = formData.investment;
  const assessmentYear = formData.personalInfo.assessmentYear;

  const updateField = (key: keyof InvestmentRebate, value: number) => {
    updateFormData('investment', { [key]: value });
  };

  const totalEligible = FIELDS.reduce(
    (sum, { key }) => sum + (investment[key] || 0),
    0
  );

  const incomePercentage = getInvestmentIncomePercentage(assessmentYear);
  const pctLabel = `${(incomePercentage * 100).toFixed(0)}%`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Investment & Tax Rebate
        </h2>
        <p className="text-sm text-ink-muted">
          Schedule 24D (Section 78) &mdash; Qualifying investments that earn you a 15% tax rebate. The more you invest in eligible instruments, the lower your tax.
        </p>
      </div>

      <div className="space-y-4">
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
                  value={investment[key] || ''}
                  onChange={(e) =>
                    updateField(key, parseFloat(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Total Eligible Investment:</span>{' '}
            <span className="text-primary font-bold text-lg">
              {formatBDT(totalEligible)}
            </span>
          </p>
          <p className="text-xs text-ink-muted mt-1">
            Rebate = 15% of the lowest of: (a) your total eligible investments above, (b) BDT 10,00,000, or (c) {pctLabel} of your total income.
          </p>
        </div>
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
