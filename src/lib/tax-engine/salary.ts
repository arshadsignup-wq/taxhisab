import type { SalaryIncome } from '@/types/tax';
import {
  HRA_EXEMPTION_LIMIT,
  HRA_BASIC_PERCENTAGE,
  MEDICAL_EXEMPTION_LIMIT,
  MEDICAL_BASIC_PERCENTAGE,
  CONVEYANCE_EXEMPTION,
} from '@/lib/tax-engine/constants';

/**
 * Calculates net taxable salary income after applying allowance exemptions.
 *
 * Exemption rules:
 *   - HRA:         min(actual HRA, BDT 3,00,000, 50% of basic)
 *   - Medical:     min(actual medical, BDT 1,20,000, 10% of basic)
 *   - Conveyance:  min(actual conveyance, BDT 30,000)
 *
 * Taxable salary = basic + (HRA - exemption) + (medical - exemption)
 *                + (conveyance - exemption) + bonus + other
 *                + employer PF + perquisites
 */
export function calculateSalaryIncome(salary: SalaryIncome): number {
  const basic = salary.basicSalary;

  // HRA exemption: lesser of actual HRA, BDT 3 lakh, or 50% of basic
  const hraExemption = Math.min(
    salary.houseRentAllowance,
    HRA_EXEMPTION_LIMIT,
    basic * HRA_BASIC_PERCENTAGE
  );

  // Medical exemption: lesser of actual medical, BDT 1.2 lakh, or 10% of basic
  const medicalExemption = Math.min(
    salary.medicalAllowance,
    MEDICAL_EXEMPTION_LIMIT,
    basic * MEDICAL_BASIC_PERCENTAGE
  );

  // Conveyance exemption: lesser of actual conveyance or BDT 30,000
  const conveyanceExemption = Math.min(
    salary.conveyanceAllowance,
    CONVEYANCE_EXEMPTION
  );

  const taxableSalary =
    basic +
    (salary.houseRentAllowance - hraExemption) +
    (salary.medicalAllowance - medicalExemption) +
    (salary.conveyanceAllowance - conveyanceExemption) +
    salary.festivalBonus +
    salary.otherAllowances +
    salary.employerProvidentFund +
    salary.perquisites;

  return Math.max(0, taxableSalary);
}
