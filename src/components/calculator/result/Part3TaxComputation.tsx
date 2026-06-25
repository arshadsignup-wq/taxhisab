'use client';

import type { TaxCalculationResult } from '@/types/tax';
import { formatBDT, formatPercentage } from '@/lib/formatters';

interface Part3Props {
  result: TaxCalculationResult;
}

export default function Part3TaxComputation({ result }: Part3Props) {
  const {
    taxFreeThreshold,
    taxableIncome,
    slabBreakdown,
    grossTaxOnIncome,
    totalEligibleInvestment,
    admissibleInvestment,
    investmentRebate,
    taxAfterRebate,
    surcharge,
    minimumTax,
    isMinimumTaxApplied,
    totalTaxLiability,
  } = result;

  const totalSurcharge =
    surcharge.surchargeAmount + surcharge.environmentalSurcharge;

  return (
    <div className="bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">Part 3: Tax Computation</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Slab Breakdown */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink-muted">Tax-Free Threshold</span>
            <span className="font-medium">{formatBDT(taxFreeThreshold)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-ink-muted">Taxable Income</span>
            <span className="font-medium">{formatBDT(taxableIncome)}</span>
          </div>

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
                  Amount
                </th>
                <th className="text-right py-2 px-2 font-medium text-ink-muted">
                  Tax
                </th>
              </tr>
            </thead>
            <tbody>
              {slabBreakdown.map((slab, index) => (
                <tr key={index} className="border-b border-rule/50">
                  <td className="py-2 px-2 text-ink">{slab.slabRange}</td>
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

          <div className="flex justify-between text-sm font-bold border-t border-rule pt-3 mt-1">
            <span>14. Gross Tax on Income</span>
            <span>{formatBDT(grossTaxOnIncome)}</span>
          </div>
        </div>

        {/* Rebate */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-muted">
              Total Eligible Investment
            </span>
            <span className="font-medium">{formatBDT(totalEligibleInvestment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Admissible Investment</span>
            <span className="font-medium">{formatBDT(admissibleInvestment)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>15. Tax Rebate (15% of admissible)</span>
            <span className="text-primary">-{formatBDT(investmentRebate)}</span>
          </div>
          <div className="flex justify-between font-bold border-t border-rule pt-2">
            <span>16. Net Tax After Rebate</span>
            <span>{formatBDT(taxAfterRebate)}</span>
          </div>
        </div>

        {/* Minimum Tax */}
        {isMinimumTaxApplied && (
          <div className="bg-gold-light border border-gold/30 rounded-lg p-3 text-sm">
            <p>
              <span className="font-bold">17. Minimum Tax Applied:</span> Computed
              tax ({formatBDT(taxAfterRebate)}) is less than minimum tax (
              {formatBDT(minimumTax)}). Minimum tax of{' '}
              <span className="font-bold">{formatBDT(minimumTax)}</span> applies.
            </p>
          </div>
        )}

        {/* Surcharge */}
        {totalSurcharge > 0 && (
          <div className="space-y-1 text-sm">
            {surcharge.surchargeAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-ink-muted">
                  19. Surcharge on Net Wealth (Rate:{' '}
                  {formatPercentage(surcharge.surchargeRate)})
                </span>
                <span className="font-medium">
                  {formatBDT(surcharge.surchargeAmount)}
                </span>
              </div>
            )}
            {surcharge.environmentalSurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-ink-muted">
                  Environmental Surcharge (Vehicles)
                </span>
                <span className="font-medium">
                  {formatBDT(surcharge.environmentalSurcharge)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Total Liability */}
        <div className="flex justify-between font-bold text-base border-t-2 border-rule pt-3">
          <span>20. Total Tax Payable</span>
          <span className="text-primary">{formatBDT(totalTaxLiability)}</span>
        </div>
      </div>
    </div>
  );
}
