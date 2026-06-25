'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { SalaryIncome } from '@/types/tax';
import { calculateSalaryBreakdown } from '@/lib/tax-engine/salary';
import { formatBDT } from '@/lib/formatters';

const FIELD_KEYS: (keyof SalaryIncome)[] = [
  'basicSalary',
  'specialPay',
  'houseRentAllowance',
  'medicalAllowance',
  'conveyanceAllowance',
  'festivalBonus',
  'otherAllowances',
  'employerProvidentFund',
  'employeeShareScheme',
  'otherEmploymentIncome',
  'perquisites',
];

export default function SalaryIncomeStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const salary = formData.salary;

  const updateField = (field: keyof SalaryIncome, value: number) => {
    updateFormData('salary', { [field]: value });
  };

  const breakdown = calculateSalaryBreakdown(salary);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.salary.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.salary.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.salary.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.salary.infoText}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELD_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.salary.fields[key].label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.salary.fields[key].hint}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={salary[key] || ''}
                onChange={(e) =>
                  updateField(key, parseFloat(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Exemption Summary */}
      {breakdown.totalGross > 0 && (
        <div className="bg-primary-light border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ink-muted">{t.calculator.salary.totalGross}</span>
            <span className="font-medium">{formatBDT(breakdown.totalGross)}</span>
          </div>
          {breakdown.totalExempt > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">{t.calculator.salary.lessExemptions}</span>
              <span className="font-medium text-success">
                -{formatBDT(breakdown.totalExempt)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold border-t border-primary/20 pt-2">
            <span>{t.calculator.salary.taxableSalary}</span>
            <span className="text-primary">
              {formatBDT(breakdown.totalTaxable)}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t border-rule">
        <button
          type="button"
          onClick={prevStep}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.previous}
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.next}
        </button>
      </div>
    </div>
  );
}
