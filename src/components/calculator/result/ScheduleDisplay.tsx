'use client';

import { formatBDT } from '@/lib/formatters';

interface ScheduleRow {
  serial?: string;
  label: string;
  amount: number;
  isBold?: boolean;
  isSubtotal?: boolean;
}

interface ScheduleDisplayProps {
  title: string;
  rows: ScheduleRow[];
  columns?: { label: string; key: 'amount' }[];
}

export default function ScheduleDisplay({ title, rows }: ScheduleDisplayProps) {
  return (
    <div className="border border-rule rounded-lg overflow-hidden">
      <div className="bg-surface-sunken px-4 py-2 border-b border-rule">
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-rule/50 ${
                row.isSubtotal ? 'bg-surface-sunken' : ''
              }`}
            >
              <td className="py-2 px-4 text-ink-muted w-10">{row.serial || ''}</td>
              <td
                className={`py-2 px-2 ${
                  row.isBold || row.isSubtotal
                    ? 'font-semibold text-ink'
                    : 'text-ink'
                }`}
              >
                {row.label}
              </td>
              <td
                className={`py-2 px-4 text-right ${
                  row.isBold || row.isSubtotal
                    ? 'font-bold text-ink'
                    : row.amount > 0
                    ? 'text-ink'
                    : 'text-ink-muted'
                }`}
              >
                {formatBDT(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
