'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { InvestmentRebate } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';
import { getInvestmentIncomePercentage } from '@/lib/tax-engine/constants';

const FIELD_KEYS: (keyof InvestmentRebate)[] = [
  'lifeInsurance',
  'depositPensionScheme',
  'providentFund',
  'savingsCertificates',
  'stockInvestment',
  'donations',
  'otherInvestments',
];

export default function InvestmentRebateStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const investment = formData.investment;
  const assessmentYear = formData.personalInfo.assessmentYear;

  const updateField = (key: keyof InvestmentRebate, value: number) => {
    updateFormData('investment', { [key]: value });
  };

  const totalEligible = FIELD_KEYS.reduce(
    (sum, key) => sum + (investment[key] || 0),
    0
  );

  const incomePercentage = getInvestmentIncomePercentage(assessmentYear);
  const pctLabel = `${(incomePercentage * 100).toFixed(0)}%`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.investment.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.investment.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELD_KEYS.map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">
                {t.calculator.investment.fields[key].label}
              </label>
              <p className="text-xs text-ink-muted mb-1">{t.calculator.investment.fields[key].hint}</p>
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
            <span className="font-medium">{t.calculator.investment.totalInvestment}</span>{' '}
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
