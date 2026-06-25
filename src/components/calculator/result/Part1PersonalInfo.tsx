'use client';

import type { PersonalInfo } from '@/types/tax';
import {
  CATEGORY_LABELS,
  LOCATION_LABELS,
  ASSESSMENT_YEAR_LABELS,
} from '@/lib/tax-engine/constants';

interface Part1Props {
  personalInfo: PersonalInfo;
}

export default function Part1PersonalInfo({ personalInfo }: Part1Props) {
  const rows: { serial: string; label: string; value: string }[] = [
    { serial: '1', label: 'Name of Taxpayer', value: personalInfo.name },
    { serial: '2', label: 'National ID No.', value: personalInfo.nid },
    { serial: '3', label: 'TIN', value: personalInfo.tin },
    { serial: '4', label: 'Circle', value: personalInfo.circle },
    { serial: '5', label: 'Taxes Zone', value: personalInfo.zone },
    {
      serial: '6',
      label: 'Assessment Year',
      value: ASSESSMENT_YEAR_LABELS[personalInfo.assessmentYear],
    },
    {
      serial: '7',
      label: 'Taxpayer Category',
      value: CATEGORY_LABELS[personalInfo.category],
    },
    {
      serial: '8',
      label: 'Location',
      value: LOCATION_LABELS[personalInfo.location],
    },
    {
      serial: '9',
      label: 'Employer / Business Name',
      value: personalInfo.employerName,
    },
    { serial: '10', label: 'Spouse Name', value: personalInfo.spouseName },
    { serial: '11', label: 'Spouse TIN', value: personalInfo.spouseTin },
  ];

  // Only show rows that have values, except always show AY, category, location
  const alwaysShow = ['6', '7', '8'];

  return (
    <div className="bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">
          Part 1: Personal Information
        </h2>
      </div>
      <div className="p-6">
        <table className="w-full text-sm">
          <tbody>
            {rows
              .filter((r) => alwaysShow.includes(r.serial) || r.value)
              .map((row) => (
                <tr key={row.serial} className="border-b border-rule/50">
                  <td className="py-2 text-ink-muted w-8">{row.serial}</td>
                  <td className="py-2 text-ink">{row.label}</td>
                  <td className="py-2 text-right font-medium text-ink">
                    {row.value || '—'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
