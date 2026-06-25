'use client';

import type { TaxCalculationResult, TaxPayments } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

interface Part4Props {
  result: TaxCalculationResult;
  taxPayments: TaxPayments;
}

export default function Part4TaxPayments({ result, taxPayments }: Part4Props) {
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
    <div className="bg-white rounded-xl border-2 border-gold/40 elevation-2 overflow-hidden">
      <div className="bg-gold-light px-6 py-3 border-b border-gold/20">
        <h2 className="font-semibold text-ink">
          Part 4: Tax Payments & Balance
        </h2>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">20. Total Tax Payable</span>
          <span className="font-bold">{formatBDT(totalTaxLiability)}</span>
        </div>

        {tdsTotalAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">21. TDS Deducted at Source</span>
            <span className="font-medium text-primary">
              -{formatBDT(tdsTotalAmount)}
            </span>
          </div>
        )}

        {advanceTotalAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">22. Advance Tax Paid</span>
            <span className="font-medium text-primary">
              -{formatBDT(advanceTotalAmount)}
            </span>
          </div>
        )}

        {taxPayments.taxRefundAdjustment > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">23. Tax Refund Adjustment</span>
            <span className="font-medium text-primary">
              -{formatBDT(taxPayments.taxRefundAdjustment)}
            </span>
          </div>
        )}

        {taxPayments.taxPaidWithReturn > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">25. Tax Paid with Return</span>
            <span className="font-medium text-primary">
              -{formatBDT(taxPayments.taxPaidWithReturn)}
            </span>
          </div>
        )}

        {taxAlreadyPaid > 0 && (
          <div className="flex justify-between border-t border-rule pt-2">
            <span className="text-ink-muted">26. Total Tax Paid</span>
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
            {isRefund ? '27. TAX REFUND' : '28. NET TAX PAYABLE'}
          </span>
          <span className="font-display text-3xl font-extrabold">
            {formatBDT(Math.abs(netTaxPayable))}
          </span>
        </div>
        {isRefund && (
          <p className="text-xs text-primary text-right">
            You have overpaid tax and are eligible for a refund.
          </p>
        )}
      </div>
    </div>
  );
}
