import type {
  HousePropertyIncome,
  HousePropertyBreakdownItem,
} from '@/types/tax';
import { HOUSE_PROPERTY_REPAIR_DEDUCTION } from '@/lib/tax-engine/constants';

/**
 * Calculates net income from house property with per-property breakdown.
 *
 * For let_out properties:
 *   1. Annual value = rent received (annualRent)
 *   2. Deduct municipal tax, insurance premium, vacancy allowance
 *   3. Net annual value = annual value - deductions above
 *   4. Deduct 30% of net annual value for repairs/maintenance
 *   5. Deduct interest on housing loan
 *   6. Net income = net annual value - repair deduction - loan interest
 *
 * For self_occupied properties:
 *   Income = 0 (no deemed rental income)
 */
export function calculateHousePropertyIncome(
  houseProperty: HousePropertyIncome
): number {
  return calculateHousePropertyBreakdown(houseProperty).reduce(
    (sum, item) => sum + item.netIncome,
    0
  );
}

export function calculateHousePropertyBreakdown(
  houseProperty: HousePropertyIncome
): HousePropertyBreakdownItem[] {
  return houseProperty.properties.map((property) => {
    if (property.type === 'self_occupied') {
      return {
        description: property.description || 'Self-Occupied',
        type: property.type,
        annualValue: 0,
        deductions: 0,
        netIncome: 0,
      };
    }

    const annualValue = property.annualRent;
    const netAfterTax =
      annualValue -
      property.municipalTax -
      property.insurancePremium -
      property.vacancyAllowance;
    const repairDeduction = netAfterTax * HOUSE_PROPERTY_REPAIR_DEDUCTION;
    const totalDeductions =
      property.municipalTax +
      property.insurancePremium +
      property.vacancyAllowance +
      repairDeduction +
      property.loanInterest;
    const netIncome = netAfterTax - repairDeduction - property.loanInterest;

    return {
      description: property.description || 'Let Out Property',
      type: property.type,
      annualValue,
      deductions: totalDeductions,
      netIncome,
    };
  });
}
