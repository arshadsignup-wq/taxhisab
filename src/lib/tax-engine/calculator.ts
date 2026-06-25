import type {
  CalculatorFormData,
  TaxCalculationResult,
  IncomeHeadBreakdown,
  AssetsLiabilities,
} from '@/types/tax';
import { getTaxFreeThresholds } from '@/lib/tax-engine/constants';
import { calculateSlabTax } from '@/lib/tax-engine/slabs';
import {
  calculateSalaryIncome,
  calculateSalaryBreakdown,
} from '@/lib/tax-engine/salary';
import {
  calculateHousePropertyIncome,
  calculateHousePropertyBreakdown,
} from '@/lib/tax-engine/house-property';
import { calculateAgriculturalIncome } from '@/lib/tax-engine/agricultural';
import { calculateFinancialAssetsIncome } from '@/lib/tax-engine/financial-assets';
import { calculateInvestmentRebate } from '@/lib/tax-engine/rebate';
import { calculateSurcharge } from '@/lib/tax-engine/surcharge';
import { calculateMinimumTax } from '@/lib/tax-engine/minimum-tax';

// ─── IT-10B Helpers ─────────────────────────────────────────────

function computeAssetsTotals(al: AssetsLiabilities) {
  const totalAssets =
    al.businessCapital +
    al.directorsShares +
    al.nonAgriculturalProperty +
    al.agriculturalProperty +
    al.investmentsAssets +
    al.motorVehicles +
    al.jewellery +
    al.furnitureElectronics +
    al.cashAndBankBalance +
    al.assetsOutsideBangladesh +
    al.otherAssets;

  const totalLiabilities =
    al.mortgageLoans +
    al.unsecuredLoans +
    al.bankLoans +
    al.otherLiabilities;

  return { totalAssets, totalLiabilities, netWealth: totalAssets - totalLiabilities };
}

/**
 * Main tax calculation orchestrator (IT-11GA aligned).
 *
 * Steps:
 *   1. Calculate income from each of 7 heads
 *   2. Sum total income
 *   3. Subtract tax-exempted income
 *   4. Apply progressive slab tax (year-specific)
 *   5. Calculate investment rebate (year-specific)
 *   6. Tax after rebate = grossTax - rebate (min 0)
 *   7. Apply surcharge (IT-10B net wealth + vehicle count)
 *   8. Total liability = max(taxAfterRebate + surcharge, minimumTax)
 *   9. Net payable = totalLiability - taxAlreadyPaid
 */
export function calculateTax(
  formData: CalculatorFormData
): TaxCalculationResult {
  const {
    profile,
    personalInfo,
    salary,
    business,
    houseProperty,
    capitalGains,
    agricultural,
    financialAssets,
    otherIncome,
    taxExempted,
    investment,
    taxPayments,
    assetsLiabilities,
  } = formData;

  const es = profile.enabledSections;
  const category = personalInfo.category;
  const location = personalInfo.location;
  const assessmentYear = personalInfo.assessmentYear;

  // ── Step 1: Calculate income from each head ──────────────────
  const incomeBreakdown: IncomeHeadBreakdown = {
    salary: 0,
    business: 0,
    houseProperty: 0,
    capitalGains: 0,
    agricultural: 0,
    financialAssets: 0,
    otherIncome: 0,
  };

  // Salary (Schedule 24A)
  let salaryBreakdown = null;
  if (es.salary) {
    salaryBreakdown = calculateSalaryBreakdown(salary);
    incomeBreakdown.salary = salaryBreakdown.totalTaxable;
  }

  // Business / Profession (Schedule 24C)
  if (es.business) {
    incomeBreakdown.business = Math.max(0, business.netProfit);
  }

  // House Property (Schedule 24B)
  const housePropertyBreakdown = es['house-property']
    ? calculateHousePropertyBreakdown(houseProperty)
    : [];
  if (es['house-property']) {
    incomeBreakdown.houseProperty =
      calculateHousePropertyIncome(houseProperty);
  }

  // Capital Gains
  if (es['capital-gains']) {
    let totalGains = 0;
    for (const gain of capitalGains.gains) {
      totalGains += gain.gain;
    }
    incomeBreakdown.capitalGains = Math.max(0, totalGains);
  }

  // Agricultural
  if (es.agricultural) {
    incomeBreakdown.agricultural = calculateAgriculturalIncome(agricultural);
  }

  // Financial Assets (Serial 6)
  if (es['financial-assets']) {
    incomeBreakdown.financialAssets =
      calculateFinancialAssetsIncome(financialAssets);
  }

  // Other Income (Serial 7)
  if (es['other-income']) {
    incomeBreakdown.otherIncome =
      otherIncome.foreignRemittance +
      otherIncome.royaltyIncome +
      otherIncome.otherSources;
  }

  // ── Step 2: Sum total income ────────────────────────────────
  const totalIncome =
    incomeBreakdown.salary +
    incomeBreakdown.business +
    incomeBreakdown.houseProperty +
    incomeBreakdown.capitalGains +
    incomeBreakdown.agricultural +
    incomeBreakdown.financialAssets +
    incomeBreakdown.otherIncome;

  // ── Step 3: Subtract tax-exempted income ─────────────────────
  let taxExemptedTotal = 0;
  if (es['tax-exempted']) {
    taxExemptedTotal =
      taxExempted.exemptedAgriculturalIncome +
      taxExempted.exemptedDividends +
      taxExempted.exemptedInterest +
      taxExempted.exemptedOther;
  }

  const grossTotalIncome = totalIncome;
  const taxableIncome = Math.max(0, totalIncome - taxExemptedTotal);

  const thresholds = getTaxFreeThresholds(assessmentYear);
  const taxFreeThreshold = thresholds[category];

  // ── Step 4: Apply progressive slab tax ──────────────────────
  const { slabBreakdown, totalTax: grossTaxOnIncome } = calculateSlabTax(
    taxableIncome,
    category,
    assessmentYear
  );

  // ── Step 5: Calculate investment rebate ─────────────────────
  let totalEligibleInvestment = 0;
  let admissibleInvestment = 0;
  let investmentRebate = 0;

  if (es.investment) {
    const rebateResult = calculateInvestmentRebate(
      investment,
      taxableIncome,
      assessmentYear
    );
    totalEligibleInvestment = rebateResult.totalEligible;
    admissibleInvestment = rebateResult.admissible;
    investmentRebate = rebateResult.rebate;
  }

  // ── Step 6: Tax after rebate ────────────────────────────────
  const taxAfterRebate = Math.max(0, grossTaxOnIncome - investmentRebate);

  // ── Step 7: Apply surcharge (IT-10B data) ───────────────────
  const { totalAssets, totalLiabilities, netWealth } = es['assets-liabilities']
    ? computeAssetsTotals(assetsLiabilities)
    : { totalAssets: 0, totalLiabilities: 0, netWealth: 0 };

  const vehicleCount = es['assets-liabilities']
    ? assetsLiabilities.motorVehicleCount
    : 0;

  const surcharge = calculateSurcharge(netWealth, taxAfterRebate, vehicleCount);
  const totalSurcharge =
    surcharge.surchargeAmount + surcharge.environmentalSurcharge;

  // ── Step 8: Total liability vs minimum tax ──────────────────
  const minimumTax = calculateMinimumTax(location, assessmentYear);
  const computedLiability = taxAfterRebate + totalSurcharge;

  const isMinimumTaxApplied =
    taxableIncome > taxFreeThreshold && computedLiability < minimumTax;

  const totalTaxLiability = isMinimumTaxApplied
    ? minimumTax
    : computedLiability;

  // ── Step 9: Net payable ─────────────────────────────────────
  const totalTds = taxPayments.tdsEntries.reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const totalAdvanceTax = taxPayments.advanceTaxEntries.reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const taxAlreadyPaid =
    totalTds +
    totalAdvanceTax +
    taxPayments.taxRefundAdjustment +
    taxPayments.taxPaidWithReturn;

  const netTaxPayable = totalTaxLiability - taxAlreadyPaid;

  // ── Return complete result ──────────────────────────────────
  return {
    incomeBreakdown,
    totalIncome,
    taxExemptedTotal,
    grossTotalIncome,
    taxFreeThreshold,
    taxableIncome,

    salaryBreakdown,
    housePropertyBreakdown,

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

    totalAssets,
    totalLiabilities,
    netWealth,
  };
}
