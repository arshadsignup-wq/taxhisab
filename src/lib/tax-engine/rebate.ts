import type { InvestmentRebate, AssessmentYear } from '@/types/tax';
import {
  INVESTMENT_REBATE_RATE,
  INVESTMENT_MAX_AMOUNT,
  getInvestmentIncomePercentage,
} from '@/lib/tax-engine/constants';

/**
 * Calculates investment rebate under Bangladesh income tax rules.
 *
 * Steps:
 *   1. Total eligible = sum of all investment fields
 *   2. Admissible = min(totalEligible, BDT 10,00,000, X% of taxable income)
 *      where X = 20% for AY 2024-2025 & 2025-2026, 3% for AY 2026-2027
 *   3. Rebate = 15% of admissible amount
 */
export function calculateInvestmentRebate(
  investment: InvestmentRebate,
  taxableIncome: number,
  assessmentYear: AssessmentYear
): { totalEligible: number; admissible: number; rebate: number } {
  const incomePercentage = getInvestmentIncomePercentage(assessmentYear);

  const totalEligible =
    investment.lifeInsurance +
    investment.depositPensionScheme +
    investment.providentFund +
    investment.savingsCertificates +
    investment.stockInvestment +
    investment.donations +
    investment.otherInvestments;

  const admissible = Math.min(
    totalEligible,
    INVESTMENT_MAX_AMOUNT,
    taxableIncome * incomePercentage
  );

  const rebate = admissible * INVESTMENT_REBATE_RATE;

  return { totalEligible, admissible, rebate };
}
