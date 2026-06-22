import type { SurchargeDetails } from '@/types/tax';
import {
  SURCHARGE_SLABS,
  MINIMUM_SURCHARGE,
  ENVIRONMENTAL_SURCHARGE_PER_VEHICLE,
  ENVIRONMENTAL_SURCHARGE_FREE_VEHICLES,
} from '@/lib/tax-engine/constants';

/**
 * Calculates surcharge on net wealth and environmental surcharge for
 * multiple vehicles.
 *
 * Net wealth surcharge:
 *   - If net wealth > BDT 4 crore, determine the applicable slab rate
 *   - Apply that rate to the TAX amount (not the wealth itself)
 *   - Minimum surcharge is BDT 5,000 if any surcharge applies
 *
 * Environmental surcharge:
 *   - For every vehicle beyond the first: BDT 25,000 per extra vehicle
 */
export function calculateSurcharge(
  netWealth: number,
  taxOnIncome: number,
  numberOfVehicles: number
): SurchargeDetails {
  // Determine surcharge rate based on net wealth
  let surchargeRate = 0;

  for (const slab of SURCHARGE_SLABS) {
    const upperLimit = slab.upperLimit ?? Infinity;

    if (netWealth > slab.lowerLimit && netWealth <= upperLimit) {
      surchargeRate = slab.rate;
      break;
    }
  }

  // If net wealth exceeds the last slab's lower limit (open-ended),
  // the loop above handles it via the Infinity fallback.
  // Also handle the case where netWealth exactly exceeds the highest defined lower limit.
  if (netWealth > 0 && surchargeRate === 0) {
    // Check if wealth falls in the no-surcharge slab (0 to 4 crore)
    const firstSlab = SURCHARGE_SLABS[0];
    if (
      firstSlab.upperLimit !== null &&
      netWealth <= firstSlab.upperLimit
    ) {
      surchargeRate = 0;
    }
  }

  // Calculate surcharge amount on the tax
  let surchargeAmount = 0;
  if (surchargeRate > 0) {
    surchargeAmount = Math.max(
      taxOnIncome * surchargeRate,
      MINIMUM_SURCHARGE
    );
  }

  // Environmental surcharge for multiple vehicles
  let environmentalSurcharge = 0;
  if (numberOfVehicles > ENVIRONMENTAL_SURCHARGE_FREE_VEHICLES) {
    environmentalSurcharge =
      (numberOfVehicles - ENVIRONMENTAL_SURCHARGE_FREE_VEHICLES) *
      ENVIRONMENTAL_SURCHARGE_PER_VEHICLE;
  }

  return {
    netWealth,
    surchargeRate,
    surchargeAmount,
    environmentalSurcharge,
  };
}
