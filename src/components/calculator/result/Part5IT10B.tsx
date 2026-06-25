'use client';

import type { TaxCalculationResult } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';
import { useTranslation } from '@/i18n';

interface Part5Props {
  result: TaxCalculationResult;
}

export default function Part5IT10B({ result }: Part5Props) {
  const t = useTranslation();
  const { totalAssets, totalLiabilities, netWealth } = result;

  // Don't render if no assets data
  if (totalAssets === 0 && totalLiabilities === 0) return null;

  return (
    <div className="pdf-section bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">
          {t.result.part5Title}
        </h2>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">{t.result.totalAssets}</span>
          <span className="font-medium">{formatBDT(totalAssets)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">{t.result.totalLiabilities}</span>
          <span className="font-medium">-{formatBDT(totalLiabilities)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-rule pt-3">
          <span>{t.result.netWealth}</span>
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
            {t.result.netWealthSurchargeNote}
          </p>
        )}
      </div>
    </div>
  );
}
