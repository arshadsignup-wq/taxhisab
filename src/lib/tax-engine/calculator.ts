import type {
  CalculatorFormData,
  TaxCalculationResult,
  IncomeHeadBreakdown,
} from '@/types/tax';
import { getTaxFreeThresholds } from '@/lib/tax-engine/constants';
import { calculateSlabTax } from '@/lib/tax-engine/slabs';
import { calculateSalaryIncome } from '@/lib/tax-engine/salary';
import { calculateHousePropertyIncome } from '@/lib/tax-engine/house-property';
import { calculateAgriculturalIncome } from '@/lib/tax-engine/agricultural';
import { calculateInvestmentRebate } from '@/lib/tax-engine/rebate';
import { calculateSurcharge } from '@/lib/tax-engine/surcharge';
import { calculateMinimumTax } from '@/lib/tax-engine/minimum-tax';

/**
 * Main tax calculation orchestrator.
 *
 * Steps:
 *   1. Calculate income from each head (only if that section is enabled)
 *   2. Sum total income
 *   3. Apply progressive slab tax (year-specific)
 *   4. Calculate investment rebate (year-specific)
 *   5. Tax after rebate = grossTax - rebate (min 0)
 *   6. Apply surcharge (net wealth and vehicles passed as 0 for this version)
 *   7. Total liability = max(taxAfterRebate + surcharge, minimumTax)
 *   8. Net payable = totalLiability - taxAlreadyPaid
 */
export function calculateTax(
  formData: CalculatorFormData
): TaxCalculationResult {
  const { personalInfo, salary, business, houseProperty, capitalGains, agricultural, otherIncome, investment, taxPaid } = formData;
  const category = personalInfo.category;
  const location = personalInfo.location;
  const assessmentYear = personalInfo.assessmentYear;

  // ── Step 1: Calculate income from each head ──────────────────────
  const incomeBreakdown: IncomeHeadBreakdown = {
    salary: 0,
    business: 0,
    houseProperty: 0,
    capitalGains: 0,
    agricultural: 0,
    otherIncome: 0,
  };

  // Salary
  if (salary.enabled) {
    incomeBreakdown.salary = calculateSalaryIncome(salary);
  }

  // Business / Profession
  if (business.enabled) {
    incomeBreakdown.business = Math.max(0, business.netProfit);
  }

  // House Property
  if (houseProperty.enabled) {
    incomeBreakdown.houseProperty =
      calculateHousePropertyIncome(houseProperty);
  }

  // Capital Gains
  if (capitalGains.enabled) {
    let totalGains = 0;
    for (const gain of capitalGains.gains) {
      totalGains += gain.gain;
    }
    incomeBreakdown.capitalGains = Math.max(0, totalGains);
  }

  // Agricultural
  if (agricultural.enabled) {
    incomeBreakdown.agricultural =
      calculateAgriculturalIncome(agricultural);
  }

  // Other Income
  if (otherIncome.enabled) {
    incomeBreakdown.otherIncome =
      otherIncome.bankInterest +
      otherIncome.dividends +
      otherIncome.remittance +
      otherIncome.otherSources;
  }

  // ── Step 2: Sum total income ─────────────────────────────────────
  const totalIncome =
    incomeBreakdown.salary +
    incomeBreakdown.business +
    incomeBreakdown.houseProperty +
    incomeBreakdown.capitalGains +
    incomeBreakdown.agricultural +
    incomeBreakdown.otherIncome;

  const thresholds = getTaxFreeThresholds(assessmentYear);
  const taxFreeThreshold = thresholds[category];
  const taxableIncome = Math.max(0, totalIncome);

  // ── Step 3: Apply progressive slab tax ───────────────────────────
  const { slabBreakdown, totalTax: grossTaxOnIncome } = calculateSlabTax(
    taxableIncome,
    category,
    assessmentYear
  );

  // ── Step 4: Calculate investment rebate ──────────────────────────
  let totalEligibleInvestment = 0;
  let admissibleInvestment = 0;
  let investmentRebate = 0;

  if (investment.enabled) {
    const rebateResult = calculateInvestmentRebate(
      investment,
      taxableIncome,
      assessmentYear
    );
    totalEligibleInvestment = rebateResult.totalEligible;
    admissibleInvestment = rebateResult.admissible;
    investmentRebate = rebateResult.rebate;
  }

  // ── Step 5: Tax after rebate ─────────────────────────────────────
  const taxAfterRebate = Math.max(0, grossTaxOnIncome - investmentRebate);

  // ── Step 6: Apply surcharge ──────────────────────────────────────
  // In this version, net wealth and vehicle count are not collected
  // from the form, so we pass 0 for both.
  const surcharge = calculateSurcharge(0, taxAfterRebate, 0);
  const totalSurcharge =
    surcharge.surchargeAmount + surcharge.environmentalSurcharge;

  // ── Step 7: Total liability vs minimum tax ───────────────────────
  const minimumTax = calculateMinimumTax(location, assessmentYear);
  const computedLiability = taxAfterRebate + totalSurcharge;

  // Minimum tax applies only if the taxpayer has taxable income
  // above the threshold (i.e., there is a filing obligation).
  const isMinimumTaxApplied =
    taxableIncome > taxFreeThreshold && computedLiability < minimumTax;

  const totalTaxLiability = isMinimumTaxApplied
    ? minimumTax
    : computedLiability;

  // ── Step 8: Net payable ──────────────────────────────────────────
  const taxAlreadyPaid =
    taxPaid.tdsOnSalary + taxPaid.tdsOnOther + taxPaid.advanceTax;

  const netTaxPayable = totalTaxLiability - taxAlreadyPaid;

  // ── Return complete result ───────────────────────────────────────
  return {
    incomeBreakdown,
    totalIncome,
    taxFreeThreshold,
    taxableIncome,

    slabBreakdown,
    grossTaxOnIncome,

    totalEligibleInvestment,
    admissibleInvestment,
    investmentRebate,

    taxAfterRebate,

    surcharge,

    minimumTax,
    isMinimumTaxApplied,

    totalTaxLiability,
    taxAlreadyPaid,
    netTaxPayable,
  };
}
