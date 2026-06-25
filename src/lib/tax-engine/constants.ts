import { TaxpayerCategory, LocationType, TaxSlab, AssessmentYear } from '@/types/tax';

// ─── Year-Specific Tax Configuration ─────────────────────────────
interface YearTaxConfig {
  thresholds: Record<TaxpayerCategory, number>;
  slabs: TaxSlab[];
  minimumTax: Record<LocationType, number>;
  investmentIncomePercentage: number;
}

const TAX_CONFIGS: Record<AssessmentYear, YearTaxConfig> = {
  // AY 2024-2025 (Income Year 2023-2024) — Finance Act 2023
  '2024-2025': {
    thresholds: {
      male: 350000,
      female: 400000,
      senior: 400000,
      disabled: 475000,
      freedom_fighter: 500000,
    },
    slabs: [
      { lowerLimit: 0, upperLimit: 100000, rate: 0.05 },       // Next 1 lakh @ 5%
      { lowerLimit: 100000, upperLimit: 500000, rate: 0.10 },  // Next 4 lakh @ 10%
      { lowerLimit: 500000, upperLimit: 1000000, rate: 0.15 }, // Next 5 lakh @ 15%
      { lowerLimit: 1000000, upperLimit: 1500000, rate: 0.20 },// Next 5 lakh @ 20%
      { lowerLimit: 1500000, upperLimit: null, rate: 0.25 },   // Remaining @ 25%
    ],
    minimumTax: {
      dhaka_chattogram: 5000,
      other_city_corp: 4000,
      other: 3000,
    },
    investmentIncomePercentage: 0.20,
  },

  // AY 2025-2026 (Income Year 2024-2025) — Finance Act 2024
  '2025-2026': {
    thresholds: {
      male: 350000,
      female: 400000,
      senior: 400000,
      disabled: 475000,
      freedom_fighter: 500000,
    },
    slabs: [
      { lowerLimit: 0, upperLimit: 100000, rate: 0.05 },          // Next 1 lakh @ 5%
      { lowerLimit: 100000, upperLimit: 500000, rate: 0.10 },     // Next 4 lakh @ 10%
      { lowerLimit: 500000, upperLimit: 1000000, rate: 0.15 },    // Next 5 lakh @ 15%
      { lowerLimit: 1000000, upperLimit: 1500000, rate: 0.20 },   // Next 5 lakh @ 20%
      { lowerLimit: 1500000, upperLimit: 3500000, rate: 0.25 },   // Next 20 lakh @ 25%
      { lowerLimit: 3500000, upperLimit: null, rate: 0.30 },      // Remaining @ 30%
    ],
    minimumTax: {
      dhaka_chattogram: 5000,
      other_city_corp: 4000,
      other: 3000,
    },
    investmentIncomePercentage: 0.20,
  },

  // AY 2026-2027 (Income Year 2025-2026) — Finance Ordinance 2025
  '2026-2027': {
    thresholds: {
      male: 375000,
      female: 425000,
      senior: 425000,
      disabled: 500000,
      freedom_fighter: 525000,
    },
    slabs: [
      { lowerLimit: 0, upperLimit: 300000, rate: 0.10 },          // Next 3 lakh @ 10%
      { lowerLimit: 300000, upperLimit: 700000, rate: 0.15 },     // Next 4 lakh @ 15%
      { lowerLimit: 700000, upperLimit: 1200000, rate: 0.20 },    // Next 5 lakh @ 20%
      { lowerLimit: 1200000, upperLimit: 3200000, rate: 0.25 },   // Next 20 lakh @ 25%
      { lowerLimit: 3200000, upperLimit: null, rate: 0.30 },      // Remaining @ 30%
    ],
    minimumTax: {
      dhaka_chattogram: 5000,
      other_city_corp: 5000,
      other: 5000,
    },
    investmentIncomePercentage: 0.03, // 3% of total income per Finance Ordinance 2025
  },
};

// ─── Getter Functions ─────────────────────────────────────────────
export function getTaxConfig(assessmentYear: AssessmentYear): YearTaxConfig {
  return TAX_CONFIGS[assessmentYear];
}

export function getTaxFreeThresholds(
  assessmentYear: AssessmentYear
): Record<TaxpayerCategory, number> {
  return getTaxConfig(assessmentYear).thresholds;
}

export function getTaxSlabs(assessmentYear: AssessmentYear): TaxSlab[] {
  return getTaxConfig(assessmentYear).slabs;
}

export function getMinimumTax(
  assessmentYear: AssessmentYear
): Record<LocationType, number> {
  return getTaxConfig(assessmentYear).minimumTax;
}

export function getInvestmentIncomePercentage(
  assessmentYear: AssessmentYear
): number {
  return getTaxConfig(assessmentYear).investmentIncomePercentage;
}

// ─── Surcharge on Net Wealth ─────────────────────────────────────
export interface SurchargeSlab {
  lowerLimit: number;
  upperLimit: number | null;
  rate: number;
}

export const SURCHARGE_SLABS: SurchargeSlab[] = [
  { lowerLimit: 0, upperLimit: 40000000, rate: 0 }, // Up to 4 crore: no surcharge
  { lowerLimit: 40000000, upperLimit: 100000000, rate: 0.1 }, // 4-10 crore: 10%
  { lowerLimit: 100000000, upperLimit: 200000000, rate: 0.2 }, // 10-20 crore: 20%
  { lowerLimit: 200000000, upperLimit: 500000000, rate: 0.25 }, // 20-50 crore: 25%
  { lowerLimit: 500000000, upperLimit: null, rate: 0.35 }, // Above 50 crore: 35%
];

// Minimum surcharge if net wealth exceeds 4 crore
export const MINIMUM_SURCHARGE = 5000;

// ─── Environmental Surcharge (Multiple Vehicles) ─────────────────
export const ENVIRONMENTAL_SURCHARGE_PER_VEHICLE = 25000;
export const ENVIRONMENTAL_SURCHARGE_FREE_VEHICLES = 1;

// ─── Salary Exemptions ──────────────────────────────────────────
export const HRA_EXEMPTION_LIMIT = 300000; // BDT 3 lakh or 50% of basic
export const HRA_BASIC_PERCENTAGE = 0.5;
export const MEDICAL_EXEMPTION_LIMIT = 120000; // BDT 1.2 lakh or 10% of basic
export const MEDICAL_BASIC_PERCENTAGE = 0.1;
export const CONVEYANCE_EXEMPTION = 30000; // BDT 30,000 fixed

// ─── Investment Rebate ───────────────────────────────────────────
export const INVESTMENT_REBATE_RATE = 0.15; // 15% of eligible investment
export const INVESTMENT_MAX_AMOUNT = 1000000; // BDT 10 lakh cap

// ─── House Property ──────────────────────────────────────────────
export const HOUSE_PROPERTY_REPAIR_DEDUCTION = 0.3; // 30% of annual value

// ─── Agricultural Income ─────────────────────────────────────────
export const AGRICULTURAL_FLAT_EXPENSE_RATE = 0.6; // 60% of gross income

// ─── Display Labels ──────────────────────────────────────────────
export const CATEGORY_LABELS: Record<TaxpayerCategory, string> = {
  male: 'Male (General)',
  female: 'Female',
  senior: 'Senior Citizen (65+)',
  disabled: 'Person with Disability',
  freedom_fighter: 'War-wounded Freedom Fighter',
};

export const LOCATION_LABELS: Record<LocationType, string> = {
  dhaka_chattogram: 'Dhaka / Chattogram City Corporation',
  other_city_corp: 'Other City Corporation',
  other: 'Other Areas',
};

export const ASSESSMENT_YEAR_LABELS: Record<AssessmentYear, string> = {
  '2026-2027': '2026-2027 (Income Year 2025-2026)',
  '2025-2026': '2025-2026 (Income Year 2024-2025)',
  '2024-2025': '2024-2025 (Income Year 2023-2024)',
};
