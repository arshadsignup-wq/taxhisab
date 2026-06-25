import type { SalaryIncome, SalaryBreakdownResult } from '@/types/tax';
import {
  HRA_EXEMPTION_LIMIT,
  HRA_BASIC_PERCENTAGE,
  MEDICAL_EXEMPTION_LIMIT,
  MEDICAL_BASIC_PERCENTAGE,
  CONVEYANCE_EXEMPTION,
} from '@/lib/tax-engine/constants';

/**
 * Calculates net taxable salary income after applying allowance exemptions
 * and returns a detailed Schedule 24A breakdown.
 *
 * Exemption rules:
 *   - HRA:         min(actual HRA, BDT 3,00,000, 50% of basic)
 *   - Medical:     min(actual medical, BDT 1,20,000, 10% of basic)
 *   - Conveyance:  min(actual conveyance, BDT 30,000)
 */
export function calculateSalaryIncome(salary: SalaryIncome): number {
  return calculateSalaryBreakdown(salary).totalTaxable;
}

export function calculateSalaryBreakdown(
  salary: SalaryIncome
): SalaryBreakdownResult {
  const basic = salary.basicSalary;

  const hraExemption = Math.min(
    salary.houseRentAllowance,
    HRA_EXEMPTION_LIMIT,
    basic * HRA_BASIC_PERCENTAGE
  );

  const medicalExemption = Math.min(
    salary.medicalAllowance,
    MEDICAL_EXEMPTION_LIMIT,
    basic * MEDICAL_BASIC_PERCENTAGE
  );

  const conveyanceExemption = Math.min(
    salary.conveyanceAllowance,
    CONVEYANCE_EXEMPTION
  );

  const items = [
    {
      label: 'Basic Salary',
      gross: salary.basicSalary,
      exempt: 0,
      taxable: salary.basicSalary,
    },
    {
      label: 'Special Pay',
      gross: salary.specialPay,
      exempt: 0,
      taxable: salary.specialPay,
    },
    {
      label: 'House Rent Allowance',
      gross: salary.houseRentAllowance,
      exempt: hraExemption,
      taxable: salary.houseRentAllowance - hraExemption,
    },
    {
      label: 'Medical Allowance',
      gross: salary.medicalAllowance,
      exempt: medicalExemption,
      taxable: salary.medicalAllowance - medicalExemption,
    },
    {
      label: 'Conveyance Allowance',
      gross: salary.conveyanceAllowance,
      exempt: conveyanceExemption,
      taxable: salary.conveyanceAllowance - conveyanceExemption,
    },
    {
      label: 'Festival Bonus',
      gross: salary.festivalBonus,
      exempt: 0,
      taxable: salary.festivalBonus,
    },
    {
      label: 'Other Allowances',
      gross: salary.otherAllowances,
      exempt: 0,
      taxable: salary.otherAllowances,
    },
    {
      label: 'Employer Provident Fund',
      gross: salary.employerProvidentFund,
      exempt: 0,
      taxable: salary.employerProvidentFund,
    },
    {
      label: 'Employee Share Scheme',
      gross: salary.employeeShareScheme,
      exempt: 0,
      taxable: salary.employeeShareScheme,
    },
    {
      label: 'Other Employment Income',
      gross: salary.otherEmploymentIncome,
      exempt: 0,
      taxable: salary.otherEmploymentIncome,
    },
    {
      label: 'Perquisites',
      gross: salary.perquisites,
      exempt: 0,
      taxable: salary.perquisites,
    },
  ];

  const totalGross = items.reduce((sum, i) => sum + i.gross, 0);
  const totalExempt = items.reduce((sum, i) => sum + i.exempt, 0);
  const totalTaxable = Math.max(
    0,
    items.reduce((sum, i) => sum + i.taxable, 0)
  );

  return { items, totalGross, totalExempt, totalTaxable };
}
