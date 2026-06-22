import type { TaxpayerCategory, AssessmentYear, SlabBreakdown } from '@/types/tax';
import { getTaxFreeThresholds, getTaxSlabs } from '@/lib/tax-engine/constants';

/**
 * Calculates progressive slab tax on taxable income for a given taxpayer
 * category and assessment year.
 *
 * The tax-free threshold is subtracted first. The remaining income is then
 * distributed across the progressive slabs defined for that assessment year.
 */
export function calculateSlabTax(
  taxableIncome: number,
  category: TaxpayerCategory,
  assessmentYear: AssessmentYear
): { slabBreakdown: SlabBreakdown[]; totalTax: number } {
  const thresholds = getTaxFreeThresholds(assessmentYear);
  const slabs = getTaxSlabs(assessmentYear);
  const threshold = thresholds[category];
  const incomeAboveThreshold = Math.max(0, taxableIncome - threshold);

  const slabBreakdown: SlabBreakdown[] = [];
  let remainingIncome = incomeAboveThreshold;
  let totalTax = 0;

  // First entry: tax-free threshold slab
  slabBreakdown.push({
    slabRange: `First BDT ${threshold.toLocaleString('en-BD')}`,
    rate: 0,
    taxableAmount: Math.min(taxableIncome, threshold),
    tax: 0,
  });

  for (const slab of slabs) {
    if (remainingIncome <= 0) {
      break;
    }

    const slabWidth =
      slab.upperLimit !== null ? slab.upperLimit - slab.lowerLimit : Infinity;

    const taxableInSlab = Math.min(remainingIncome, slabWidth);
    const taxForSlab = taxableInSlab * slab.rate;

    const lowerDisplay = (threshold + slab.lowerLimit).toLocaleString('en-BD');
    const upperDisplay =
      slab.upperLimit !== null
        ? (threshold + slab.upperLimit).toLocaleString('en-BD')
        : 'Above';

    const slabRange =
      slab.upperLimit !== null
        ? `BDT ${lowerDisplay} - ${upperDisplay}`
        : `Above BDT ${lowerDisplay}`;

    slabBreakdown.push({
      slabRange,
      rate: slab.rate,
      taxableAmount: taxableInSlab,
      tax: taxForSlab,
    });

    totalTax += taxForSlab;
    remainingIncome -= taxableInSlab;
  }

  return { slabBreakdown, totalTax };
}
