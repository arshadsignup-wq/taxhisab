'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { formatBDT, formatPercentage } from '@/lib/formatters';

export default function ResultDisplay() {
  const { result, resetFormData } = useCalculatorStore();

  const handlePrint = () => {
    window.print();
  };

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl border border-rule card-elevated p-12">
          <svg
            className="w-16 h-16 text-rule mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-bold text-ink mb-2">
            No Calculation Results
          </h2>
          <p className="text-ink-muted mb-6">
            Please complete the calculator wizard to see your tax computation.
          </p>
          <button
            type="button"
            onClick={resetFormData}
            className="bg-green-deep hover:bg-green-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Go to Calculator
          </button>
        </div>
      </div>
    );
  }

  const {
    incomeBreakdown,
    totalIncome,
    taxFreeThreshold,
    taxableIncome,
    slabBreakdown,
    grossTaxOnIncome,
    totalEligibleInvestment,
    admissibleInvestment,
    investmentRebate,
    taxAfterRebate,
    minimumTax,
    isMinimumTaxApplied,
    totalTaxLiability,
    taxAlreadyPaid,
    netTaxPayable,
  } = result;

  const isRefund = netTaxPayable < 0;

  const incomeHeads: { label: string; value: number }[] = [
    { label: 'Salary Income', value: incomeBreakdown.salary },
    { label: 'Business / Professional Income', value: incomeBreakdown.business },
    { label: 'House Property Income', value: incomeBreakdown.houseProperty },
    { label: 'Capital Gains', value: incomeBreakdown.capitalGains },
    { label: 'Agricultural Income', value: incomeBreakdown.agricultural },
    { label: 'Other Income', value: incomeBreakdown.otherIncome },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 print:px-0 print:py-0">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Tax Calculation Result
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Bangladesh Income Tax Computation
        </p>
      </div>

      {/* Section 1: Income Breakdown */}
      <div className="bg-white rounded-xl border border-rule card-elevated overflow-hidden">
        <div className="bg-surface px-6 py-3 border-b border-rule">
          <h2 className="font-semibold text-ink">Income Breakdown</h2>
        </div>
        <div className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule">
                <th className="text-left pb-2 font-medium text-ink-muted">
                  Head of Income
                </th>
                <th className="text-right pb-2 font-medium text-ink-muted">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {incomeHeads.map((head) => (
                <tr key={head.label} className="border-b border-rule/50">
                  <td className="py-2 text-ink">{head.label}</td>
                  <td
                    className={`py-2 text-right font-medium ${
                      head.value > 0 ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {formatBDT(head.value)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="py-3 text-ink">Total Income</td>
                <td className="py-3 text-right text-green-deep">
                  {formatBDT(totalIncome)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Tax Computation */}
      <div className="bg-white rounded-xl border border-rule card-elevated overflow-hidden">
        <div className="bg-surface px-6 py-3 border-b border-rule">
          <h2 className="font-semibold text-ink">Tax Computation</h2>
        </div>
        <div className="p-6 space-y-4">
          {/* Threshold & Taxable */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Tax-Free Threshold</span>
              <span className="font-medium">{formatBDT(taxFreeThreshold)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Taxable Income</span>
              <span className="font-medium">{formatBDT(taxableIncome)}</span>
            </div>
          </div>

          {/* Slab Breakdown Table */}
          {slabBreakdown.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-ink mb-2">
                Slab-wise Tax Breakdown
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-rule bg-surface">
                    <th className="text-left py-2 px-2 font-medium text-ink-muted">
                      Slab Range
                    </th>
                    <th className="text-center py-2 px-2 font-medium text-ink-muted">
                      Rate
                    </th>
                    <th className="text-right py-2 px-2 font-medium text-ink-muted">
                      Taxable Amount
                    </th>
                    <th className="text-right py-2 px-2 font-medium text-ink-muted">
                      Tax
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {slabBreakdown.map((slab, index) => (
                    <tr
                      key={index}
                      className="border-b border-rule/50"
                    >
                      <td className="py-2 px-2 text-ink">
                        {slab.slabRange}
                      </td>
                      <td className="py-2 px-2 text-center text-ink">
                        {formatPercentage(slab.rate)}
                      </td>
                      <td className="py-2 px-2 text-right text-ink">
                        {formatBDT(slab.taxableAmount)}
                      </td>
                      <td className="py-2 px-2 text-right font-medium text-ink">
                        {formatBDT(slab.tax)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Gross Tax */}
          <div className="flex justify-between text-sm font-bold border-t border-rule pt-3">
            <span>Gross Tax on Income</span>
            <span className="text-ink">{formatBDT(grossTaxOnIncome)}</span>
          </div>
        </div>
      </div>

      {/* Section 3: Investment Rebate & After Rebate */}
      <div className="bg-white rounded-xl border border-rule card-elevated overflow-hidden">
        <div className="bg-surface px-6 py-3 border-b border-rule">
          <h2 className="font-semibold text-ink">
            Investment Rebate & Adjustments
          </h2>
        </div>
        <div className="p-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-muted">Total Eligible Investment</span>
            <span className="font-medium">{formatBDT(totalEligibleInvestment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Admissible Investment</span>
            <span className="font-medium">{formatBDT(admissibleInvestment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Investment Rebate (15%)</span>
            <span className="font-medium text-green-deep">
              -{formatBDT(investmentRebate)}
            </span>
          </div>
          <div className="flex justify-between font-bold border-t border-rule pt-3">
            <span>Tax After Rebate</span>
            <span>{formatBDT(taxAfterRebate)}</span>
          </div>
        </div>
      </div>

      {/* Section 4: Minimum Tax Note */}
      {isMinimumTaxApplied && (
        <div className="bg-gold-light border border-gold/30 rounded-xl p-4">
          <p className="text-sm text-ink">
            <span className="font-bold">Minimum Tax Applied:</span> Your
            computed tax ({formatBDT(taxAfterRebate)}) is less than the minimum
            tax ({formatBDT(minimumTax)}) for your location. The minimum tax of{' '}
            <span className="font-bold">{formatBDT(minimumTax)}</span> has been
            applied as your total liability.
          </p>
        </div>
      )}

      {/* Section 5: Final Summary */}
      <div className="bg-white rounded-xl border-2 border-gold/40 card-elevated overflow-hidden">
        <div className="bg-gold-light px-6 py-3 border-b border-gold/20">
          <h2 className="font-semibold text-ink">Final Summary</h2>
        </div>
        <div className="p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-muted">Total Tax Liability</span>
            <span className="font-bold">{formatBDT(totalTaxLiability)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Tax Already Paid (TDS + Advance)</span>
            <span className="font-medium text-green-deep">
              -{formatBDT(taxAlreadyPaid)}
            </span>
          </div>
          <div
            className={`flex justify-between items-center pt-4 border-t-2 border-rule ${
              isRefund ? 'text-green-deep' : netTaxPayable > 0 ? 'text-red-700' : 'text-ink'
            }`}
          >
            <span className="text-lg font-bold">
              {isRefund ? 'TAX REFUND' : 'NET TAX PAYABLE'}
            </span>
            <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold">
              {formatBDT(Math.abs(netTaxPayable))}
            </span>
          </div>
          {isRefund && (
            <p className="text-xs text-green-deep text-right">
              You have overpaid tax and are eligible for a refund.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 print:hidden">
        <button
          type="button"
          onClick={resetFormData}
          className="border border-rule hover:bg-surface text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Start Over
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-green-deep hover:bg-green-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Print Results
        </button>
      </div>
    </div>
  );
}
