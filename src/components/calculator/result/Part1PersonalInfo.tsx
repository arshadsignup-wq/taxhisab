'use client';

import type { PersonalInfo } from '@/types/tax';
import { useTranslation } from '@/i18n';

interface Part1Props {
  personalInfo: PersonalInfo;
}

export default function Part1PersonalInfo({ personalInfo }: Part1Props) {
  const t = useTranslation();
  const rows: { serial: string; label: string; value: string }[] = [
    { serial: '1', label: t.result.personalInfoLabels['1'], value: personalInfo.name },
    { serial: '2', label: t.result.personalInfoLabels['2'], value: personalInfo.nid },
    { serial: '3', label: t.result.personalInfoLabels['3'], value: personalInfo.tin },
    { serial: '4', label: t.result.personalInfoLabels['4'], value: personalInfo.circle },
    { serial: '5', label: t.result.personalInfoLabels['5'], value: personalInfo.zone },
    {
      serial: '6',
      label: t.result.personalInfoLabels['6'],
      value: t.labels.assessmentYears[personalInfo.assessmentYear],
    },
    {
      serial: '7',
      label: t.result.personalInfoLabels['7'],
      value: t.labels.categories[personalInfo.category],
    },
    {
      serial: '8',
      label: t.result.personalInfoLabels['8'],
      value: t.labels.locations[personalInfo.location],
    },
    {
      serial: '9',
      label: t.result.personalInfoLabels['9'],
      value: personalInfo.employerName,
    },
    { serial: '10', label: t.result.personalInfoLabels['10'], value: personalInfo.spouseName },
    { serial: '11', label: t.result.personalInfoLabels['11'], value: personalInfo.spouseTin },
  ];

  // Only show rows that have values, except always show AY, category, location
  const alwaysShow = ['6', '7', '8'];

  return (
    <div className="pdf-section bg-white rounded-xl border border-rule elevation-2 overflow-hidden">
      <div className="bg-surface px-6 py-3 border-b border-rule">
        <h2 className="font-semibold text-ink">
          {t.result.part1Title}
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
