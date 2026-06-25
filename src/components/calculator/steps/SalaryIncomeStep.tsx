'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { SalaryIncome } from '@/types/tax';
import { calculateSalaryBreakdown } from '@/lib/tax-engine/salary';
import { formatBDT } from '@/lib/formatters';

const FIELDS: { key: keyof SalaryIncome; label: string; hint: string }[] = [
  { key: 'basicSalary', label: 'Basic Salary (Annual)', hint: 'Your annual basic salary before any allowances. Check your salary slip or appointment letter.' },
  { key: 'specialPay', label: 'Special Pay', hint: 'Any special pay or personal pay added to your basic salary.' },
  { key: 'houseRentAllowance', label: 'House Rent Allowance', hint: 'Total HRA received in the year. Exemption: up to 50% of basic or BDT 3,00,000 (whichever is lower).' },
  { key: 'medicalAllowance', label: 'Medical Allowance', hint: 'Total medical allowance received. Exemption: up to 10% of basic or BDT 1,20,000 (whichever is lower).' },
  { key: 'conveyanceAllowance', label: 'Conveyance Allowance', hint: 'Transport/conveyance allowance received. Exemption: up to BDT 30,000 per year.' },
  { key: 'festivalBonus', label: 'Festival Bonus', hint: 'Total festival bonuses (Eid, Puja, etc.) received during the year. Fully taxable.' },
  { key: 'otherAllowances', label: 'Other Allowances', hint: 'Any other allowances like entertainment, LFA, washing, etc. Fully taxable.' },
  { key: 'employerProvidentFund', label: 'Employer Provident Fund', hint: 'Employer\'s contribution to your provident fund. Shown in your salary slip.' },
  { key: 'employeeShareScheme', label: 'Employee Share Scheme', hint: 'Value of any shares or stock options received from your employer.' },
  { key: 'otherEmploymentIncome', label: 'Other Employment Income', hint: 'Any other income from employment not covered above.' },
  { key: 'perquisites', label: 'Perquisites', hint: 'Value of non-cash benefits: company car, free housing, etc. as determined by employer.' },
];

export default function SalaryIncomeStep() {
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
          Salary Income
        </h2>
        <p className="text-sm text-ink-muted">
          Schedule 24A &mdash; Enter your annual salary components. Use figures from your salary certificate or salary slips.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">How to fill this section</p>
        <p className="text-xs text-ink-muted">
          Enter annual amounts (total for the income year, not monthly). If you have your salary certificate from your employer, use the figures from there. Exemptions for HRA, Medical, and Conveyance are auto-calculated in the summary below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{hint}</p>
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
            <span className="text-ink-muted">Total Gross Salary</span>
            <span className="font-medium">{formatBDT(breakdown.totalGross)}</span>
          </div>
          {breakdown.totalExempt > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Less: Exemptions (HRA, Medical, Conveyance)</span>
              <span className="font-medium text-success">
                -{formatBDT(breakdown.totalExempt)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold border-t border-primary/20 pt-2">
            <span>Taxable Salary</span>
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
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
