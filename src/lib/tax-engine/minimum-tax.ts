import type { LocationType, AssessmentYear } from '@/types/tax';
import { getMinimumTax } from '@/lib/tax-engine/constants';

/**
 * Returns the minimum tax amount based on the taxpayer's location and
 * assessment year.
 *
 * AY 2024-2025 & 2025-2026:
 *   - Dhaka / Chattogram City Corporation: BDT 5,000
 *   - Other City Corporation:              BDT 4,000
 *   - Other Areas:                         BDT 3,000
 *
 * AY 2026-2027:
 *   - All locations:                       BDT 5,000
 */
export function calculateMinimumTax(
  location: LocationType,
  assessmentYear: AssessmentYear
): number {
  const minimumTaxMap = getMinimumTax(assessmentYear);
  return minimumTaxMap[location];
}
