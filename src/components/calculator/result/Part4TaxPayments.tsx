'use client';

import type { TaxCalculationResult, TaxPayments } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';
import { useTranslation } from '@/i18n';

interface Part4Props {
  result: TaxCalculationResult;
  taxPayments: TaxPayments;
}

export default function Part4TaxPayments({ result, taxPayments }: Part4Props) {
  const t = useTranslation();
  const { totalTaxLiability, taxAlreadyPaid, netTaxPayable } = result;
  const isRefund = netTaxPayable < 0;

  const tdsTotalAmount = taxPayments.tdsEntries.reduce(
    (s, e) => s + e.amount,
    0
  );
  const advanceTotalAmount = taxPayments.advanceTaxEntries.reduce(
    (s, e) => s + e.amount,
    0
  );

  return (
    <div className="pdf-section bg-white rounded-xl border-2 border-gold/40 elevation-2 overflow-hidden">
      <div className="bg-gold-light px-6 py-3 border-b border-gold/20">
        <h2 className="font-semibold text-ink">
          {t.result.part4Title}
        </h2>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">{t.result.totalTaxPayable}</span>
          <span className="font-bold">{formatBDT(totalTaxLiability)}</span>
        </div>

        {tdsTotalAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">{t.result.tdsDeducted}</span>
            <span className="font-medium text-primary">
              -{formatBDT(tdsTotalAmount)}
            </span>
          </div>
        )}

        {advanceTotalAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">{t.result.advanceTaxPaid}</span>
            <span className="font-medium text-primary">
              -{formatBDT(advanceTotalAmount)}
            </span>
          </div>
        )}

        {taxPayments.taxRefundAdjustment > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">{t.result.taxRefundAdj}</span>
            <span className="font-medium text-primary">
              -{formatBDT(taxPayments.taxRefundAdjustment)}
            </span>
          </div>
        )}

        {taxPayments.taxPaidWithReturn > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">{t.result.taxPaidWithReturn}</span>
            <span className="font-medium text-primary">
              -{formatBDT(taxPayments.taxPaidWithReturn)}
            </span>
          </div>
        )}

        {taxAlreadyPaid > 0 && (
          <div className="flex justify-between border-t border-rule pt-2">
            <span className="text-ink-muted">{t.result.totalTaxPaid}</span>
            <span className="font-medium">{formatBDT(taxAlreadyPaid)}</span>
          </div>
        )}

        <div
          className={`flex justify-between items-center pt-4 border-t-2 border-rule ${
            isRefund
              ? 'text-primary'
              : netTaxPayable > 0
              ? 'text-error'
              : 'text-ink'
          }`}
        >
          <span className="text-lg font-bold">
            {isRefund ? t.result.taxRefund : t.result.netTaxPayable}
          </span>
          <span className="font-display text-3xl font-extrabold">
            {formatBDT(Math.abs(netTaxPayable))}
          </span>
        </div>
        {isRefund && (
          <p className="text-xs text-primary text-right">
            {t.result.overpaidRefund}
          </p>
        )}
      </div>
    </div>
  );
}
