import type { HousePropertyIncome } from '@/types/tax';
import { HOUSE_PROPERTY_REPAIR_DEDUCTION } from '@/lib/tax-engine/constants';

/**
 * Calculates net income from house property.
 *
 * For let_out properties:
 *   1. Annual value = rent received (annualRent)
 *   2. Deduct municipal tax paid
 *   3. Net annual value = annual value - municipal tax
 *   4. Deduct 30% of net annual value for repairs/maintenance
 *   5. Deduct interest on housing loan
 *   6. Net income from this property = net annual value - repair deduction - loan interest
 *
 * For self_occupied properties:
 *   Income = 0 (no deemed rental income for self-occupied property)
 *
 * Returns the sum of income from all properties.
 */
export function calculateHousePropertyIncome(
  houseProperty: HousePropertyIncome
): number {
  let totalIncome = 0;

  for (const property of houseProperty.properties) {
    if (property.type === 'self_occupied') {
      // Self-occupied property has no taxable income
      continue;
    }

    // Let-out property calculation
    const annualValue = property.annualRent;
    const netAnnualValue = annualValue - property.municipalTax;
    const repairDeduction = netAnnualValue * HOUSE_PROPERTY_REPAIR_DEDUCTION;
    const incomeFromProperty =
      netAnnualValue - repairDeduction - property.loanInterest;

    totalIncome += incomeFromProperty;
  }

  return totalIncome;
}
