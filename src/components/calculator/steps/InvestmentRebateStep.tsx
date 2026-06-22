'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { formatBDT } from '@/lib/formatters';

export default function InvestmentRebateStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const investment = formData.investment;

  const toggleEnabled = () => {
    updateFormData('investment', { enabled: !investment.enabled });
  };

  const updateField = (field: keyof typeof investment, value: number) => {
    updateFormData('investment', { [field]: value });
  };

  const fields: { key: keyof typeof investment; label: string }[] = [
    { key: 'lifeInsurance', label: 'Life Insurance Premium' },
    { key: 'depositPensionScheme', label: 'Deposit Pension Scheme (DPS)' },
    { key: 'providentFund', label: 'Provident Fund Contribution' },
    { key: 'savingsCertificates', label: 'Savings Certificates (Sanchayapatra)' },
    { key: 'stockInvestment', label: 'Stock Market Investment' },
    { key: 'donations', label: 'Donations' },
    { key: 'otherInvestments', label: 'Other Eligible Investments' },
  ];

  // Calculate total eligible amount
  const totalEligible = fields.reduce(
    (sum, { key }) => sum + ((investment[key] as number) || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Investment & Tax Rebate
        </h2>
        <p className="text-sm text-muted">
          Enter your qualifying investments for tax rebate under Section 44(2)(b).
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            investment.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={toggleEnabled}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              investment.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">I have eligible investments</span>
      </label>

      {!investment.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No eligible investments &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={(investment[key] as number) || ''}
                    onChange={(e) =>
                      updateField(key, parseFloat(e.target.value) || 0)
                    }
                    min={0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total Eligible */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <span className="font-medium">Total Eligible Investment:</span>{' '}
              <span className="text-primary font-bold text-lg">
                {formatBDT(totalEligible)}
              </span>
            </p>
            <p className="text-xs text-muted mt-1">
              Tax rebate is 15% of the allowable investment amount (subject to
              limits).
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
