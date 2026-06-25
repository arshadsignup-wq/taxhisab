'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/store/calculator-store';
import { calculateTax } from '@/lib/tax-engine/calculator';
import { formatBDT } from '@/lib/formatters';

export default function RunningTotalBanner() {
  const { formData } = useCalculatorStore();

  const estimate = useMemo(() => {
    try {
      const result = calculateTax(formData);
      return result;
    } catch {
      return null;
    }
  }, [formData]);

  // Only show when there's some income entered
  if (!estimate || estimate.totalIncome === 0) return null;

  return (
    <div className="sticky bottom-0 z-10 mt-4 print:hidden">
      <div className="bg-white/98 backdrop-blur-md border border-rule elevation-3 rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4 text-ink-muted">
            <span>
              Income: <span className="font-medium text-ink">{formatBDT(estimate.totalIncome)}</span>
            </span>
            <span className="hidden sm:inline">
              Tax: <span className="font-medium text-ink">{formatBDT(estimate.grossTaxOnIncome)}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-ink-muted block sm:inline sm:mr-2">
              Estimated Payable
            </span>
            <span
              className={`font-bold text-lg ${
                estimate.netTaxPayable > 0
                  ? 'text-error'
                  : estimate.netTaxPayable < 0
                  ? 'text-success'
                  : 'text-ink'
              }`}
            >
              {formatBDT(Math.abs(estimate.netTaxPayable))}
            </span>
            {estimate.netTaxPayable < 0 && (
              <span className="text-xs text-success ml-1">refund</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
