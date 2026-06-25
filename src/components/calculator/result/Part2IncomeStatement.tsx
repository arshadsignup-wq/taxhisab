'use client';

import { useState } from 'react';
import type {
  TaxCalculationResult,
  CalculatorFormData,
} from '@/types/tax';
import { formatBDT } from '@/lib/formatters';
import ScheduleDisplay from './ScheduleDisplay';
import { useTranslation } from '@/i18n';

interface Part2Props {
  result: TaxCalculationResult;
  formData: CalculatorFormData;
}

export default function Part2IncomeStatement({ result, formData }: Part2Props) {
  const t = useTranslation();
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const es = formData.profile.enabledSections;

  const toggleSchedule = (key: string) => {
    setExpandedSchedule(expandedSchedule === key ? null : key);
  };

  const incomeRows: {
    serial: string;
    label: string;
    value: number;
    scheduleKey?: string;
  }[] = [];

  if (es.salary) {
    incomeRows.push({
      serial: '1',
      label: t.result.incomeLabels.salary,
      value: result.incomeBreakdown.salary,
      scheduleKey: 'salary',
    });
  }

  if (es['house-property']) {
    incomeRows.push({
      serial: '2',
      label: t.result.incomeLabels.houseProperty,
      value: result.incomeBreakdown.houseProperty,
      scheduleKey: 'house-property',
    });
  }

  if (es.agricultural) {
    incomeRows.push({
      serial: '3',
      label: t.result.incomeLabels.agricultural,
      value: result.incomeBreakdown.agricultural,
    });
  }

  if (es.business) {
    incomeRows.push({
      serial: '4',
      label: t.result.incomeLabels.business,
      value: result.incomeBreakdown.business,
    });
  }

  if (es['capital-gains']) {
    incomeRows.push({
      serial: '5',
      label: t.result.incomeLabels.capitalGains,
      value: result.incomeBreakdown.capitalGains,
    });
  }

  if (es['financial-assets']) {
    incomeRows.push({
      serial: '6',
      label: t.result.incomeLabels.financialAssets,
      value: result.incomeBreakdown.financialAssets,
    });
  }

  if (es['other-income']) {
    incomeRows.push({
      serial: '7',
      label: t.result.incomeLabels.otherIncome,
      value: result.incomeBreakdown.otherIncome,
    });
  }

  return (
    <div className="pdf-section bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">
          {t.result.part2Title}
        </h2>
      </div>
      <div className="p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rule">
              <th className="text-left pb-2 font-medium text-ink-muted w-8">
                {t.result.sl}
              </th>
              <th className="text-left pb-2 font-medium text-ink-muted">
                {t.result.headOfIncome}
              </th>
              <th className="text-right pb-2 font-medium text-ink-muted">
                {t.result.amountBdt}
              </th>
            </tr>
          </thead>
          <tbody>
            {incomeRows.map((row) => (
              <tr key={row.serial}>
                <td colSpan={3} className="p-0">
                  <div>
                    <div
                      className={`flex items-center border-b border-rule/50 ${
                        row.scheduleKey ? 'cursor-pointer hover:bg-surface-sunken' : ''
                      }`}
                      onClick={() =>
                        row.scheduleKey && toggleSchedule(row.scheduleKey)
                      }
                    >
                      <span className="py-2.5 px-0 text-ink-muted w-8">
                        {row.serial}
                      </span>
                      <span className="py-2.5 flex-1 text-ink">
                        {row.label}
                        {row.scheduleKey && (
                          <span className="text-xs text-primary ml-2">
                            {expandedSchedule === row.scheduleKey
                              ? t.common.hideDetails
                              : t.common.showDetails}
                          </span>
                        )}
                      </span>
                      <span
                        className={`py-2.5 text-right font-medium ${
                          row.value > 0 ? 'text-ink' : 'text-ink-muted'
                        }`}
                      >
                        {formatBDT(row.value)}
                      </span>
                    </div>

                    {/* Expandable Schedule */}
                    {row.scheduleKey === 'salary' &&
                      expandedSchedule === 'salary' &&
                      result.salaryBreakdown && (
                        <div className="px-4 py-3 bg-surface-sunken border-b border-rule/50">
                          <ScheduleDisplay
                            title={t.result.schedule24A}
                            rows={result.salaryBreakdown.items
                              .filter((i) => i.gross > 0)
                              .map((item, idx) => ({
                                serial: String(idx + 1),
                                label: `${item.label}${
                                  item.exempt > 0
                                    ? ` (Exempt: ${formatBDT(item.exempt)})`
                                    : ''
                                }`,
                                amount: item.taxable,
                              }))
                              .concat([
                                {
                                  serial: '',
                                  label: t.result.totalTaxableSalary,
                                  amount: result.salaryBreakdown.totalTaxable,
                                  isBold: true,
                                  isSubtotal: true,
                                } as { serial: string; label: string; amount: number; isBold?: boolean; isSubtotal?: boolean },
                              ])}
                          />
                        </div>
                      )}

                    {row.scheduleKey === 'house-property' &&
                      expandedSchedule === 'house-property' &&
                      result.housePropertyBreakdown.length > 0 && (
                        <div className="px-4 py-3 bg-surface-sunken border-b border-rule/50">
                          <ScheduleDisplay
                            title={t.result.schedule24B}
                            rows={result.housePropertyBreakdown.map(
                              (item, idx) => ({
                                serial: String(idx + 1),
                                label: `${item.description} (${
                                  item.type === 'self_occupied'
                                    ? t.result.selfOccupied
                                    : `Rent: ${formatBDT(item.annualValue)}, Deductions: ${formatBDT(item.deductions)}`
                                })`,
                                amount: item.netIncome,
                              })
                            )}
                          />
                        </div>
                      )}
                  </div>
                </td>
              </tr>
            ))}

            {/* Total Income */}
            <tr className="font-bold border-t border-rule">
              <td className="py-3 text-ink-muted">8</td>
              <td className="py-3 text-ink">{t.result.totalIncome}</td>
              <td className="py-3 text-right text-primary">
                {formatBDT(result.totalIncome)}
              </td>
            </tr>

            {/* Tax Exempted */}
            {result.taxExemptedTotal > 0 && (
              <tr className="border-b border-rule/50">
                <td className="py-2 text-ink-muted">9</td>
                <td className="py-2 text-ink">{t.result.lessTaxExempted}</td>
                <td className="py-2 text-right font-medium text-success">
                  -{formatBDT(result.taxExemptedTotal)}
                </td>
              </tr>
            )}

            {/* Taxable Income */}
            <tr className="font-bold border-t-2 border-rule">
              <td className="py-3 text-ink-muted">
                {result.taxExemptedTotal > 0 ? '10' : '9'}
              </td>
              <td className="py-3 text-ink">{t.result.totalTaxableIncome}</td>
              <td className="py-3 text-right text-primary text-lg">
                {formatBDT(result.taxableIncome)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
