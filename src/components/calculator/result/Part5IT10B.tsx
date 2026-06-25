'use client';

import type { TaxCalculationResult } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

interface Part5Props {
  result: TaxCalculationResult;
}

export default function Part5IT10B({ result }: Part5Props) {
  const { totalAssets, totalLiabilities, netWealth } = result;

  // Don't render if no assets data
  if (totalAssets === 0 && totalLiabilities === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">
          Part 5: Assets & Liabilities Summary (IT-10B)
        </h2>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">Total Assets</span>
          <span className="font-medium">{formatBDT(totalAssets)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">Total Liabilities</span>
          <span className="font-medium">-{formatBDT(totalLiabilities)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-rule pt-3">
          <span>Net Wealth</span>
          <span
            className={
              netWealth >= 40000000 ? 'text-error' : 'text-primary'
            }
          >
            {formatBDT(netWealth)}
          </span>
        </div>
        {netWealth >= 40000000 && (
          <p className="text-xs text-error">
            Net wealth exceeds BDT 4 crore &mdash; surcharge has been applied
            to your tax computation above.
          </p>
        )}
      </div>
    </div>
  );
}
