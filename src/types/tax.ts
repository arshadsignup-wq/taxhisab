// Taxpayer categories with different tax-free thresholds
export type TaxpayerCategory =
  | 'male'
  | 'female'
  | 'senior'
  | 'disabled'
  | 'freedom_fighter';

export type LocationType = 'dhaka_chattogram' | 'other_city_corp' | 'other';

export type AssessmentYear = '2026-2027' | '2025-2026' | '2024-2025';

export type PropertyType = 'self_occupied' | 'let_out';

export type CapitalAssetType = 'property' | 'shares' | 'other';

export type AgriculturalExpenseMethod = 'flat_rate' | 'actual';

// ─── Personal Info ───────────────────────────────────────────────
export interface PersonalInfo {
  category: TaxpayerCategory;
  location: LocationType;
  assessmentYear: AssessmentYear;
}

// ─── Salary Income ───────────────────────────────────────────────
export interface SalaryIncome {
  enabled: boolean;
  basicSalary: number;
  houseRentAllowance: number;
  medicalAllowance: number;
  conveyanceAllowance: number;
  festivalBonus: number;
  otherAllowances: number;
  employerProvidentFund: number;
  perquisites: number;
}

// ─── Business Income ─────────────────────────────────────────────
export interface BusinessIncome {
  enabled: boolean;
  isFreelancer: boolean;
  grossReceipts: number;
  expenses: number;
  netProfit: number;
}

// ─── House Property Income ───────────────────────────────────────
export interface HouseProperty {
  type: PropertyType;
  annualRent: number;
  municipalTax: number;
  repairDeduction: number; // auto-calculated as 30% of annual value
  loanInterest: number;
}

export interface HousePropertyIncome {
  enabled: boolean;
  properties: HouseProperty[];
}

// ─── Capital Gains ───────────────────────────────────────────────
export interface CapitalGain {
  assetType: CapitalAssetType;
  salePrice: number;
  costOfAcquisition: number;
  gain: number;
}

export interface CapitalGainsIncome {
  enabled: boolean;
  gains: CapitalGain[];
}

// ─── Agricultural Income ─────────────────────────────────────────
export interface AgriculturalIncome {
  enabled: boolean;
  grossIncome: number;
  expenseMethod: AgriculturalExpenseMethod;
  actualExpenses: number;
}

// ─── Other Income ────────────────────────────────────────────────
export interface OtherIncome {
  enabled: boolean;
  bankInterest: number;
  dividends: number;
  remittance: number;
  otherSources: number;
}

// ─── Investment & Rebate ─────────────────────────────────────────
export interface InvestmentRebate {
  enabled: boolean;
  lifeInsurance: number;
  depositPensionScheme: number;
  providentFund: number;
  savingsCertificates: number;
  stockInvestment: number;
  donations: number;
  otherInvestments: number;
}

// ─── Tax Deducted / Advance Tax ──────────────────────────────────
export interface TaxPaid {
  tdsOnSalary: number;
  tdsOnOther: number;
  advanceTax: number;
}

// ─── Complete Calculator State ───────────────────────────────────
export interface CalculatorFormData {
  personalInfo: PersonalInfo;
  salary: SalaryIncome;
  business: BusinessIncome;
  houseProperty: HousePropertyIncome;
  capitalGains: CapitalGainsIncome;
  agricultural: AgriculturalIncome;
  otherIncome: OtherIncome;
  investment: InvestmentRebate;
  taxPaid: TaxPaid;
}

// ─── Tax Slab ────────────────────────────────────────────────────
export interface TaxSlab {
  lowerLimit: number;
  upperLimit: number | null; // null = no upper limit
  rate: number; // as decimal, e.g. 0.05 for 5%
}

// ─── Slab Breakdown (for result display) ─────────────────────────
export interface SlabBreakdown {
  slabRange: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

// ─── Income Head Breakdown ───────────────────────────────────────
export interface IncomeHeadBreakdown {
  salary: number;
  business: number;
  houseProperty: number;
  capitalGains: number;
  agricultural: number;
  otherIncome: number;
}

// ─── Surcharge Details ───────────────────────────────────────────
export interface SurchargeDetails {
  netWealth: number;
  surchargeRate: number;
  surchargeAmount: number;
  environmentalSurcharge: number;
}

// ─── Complete Tax Calculation Result ─────────────────────────────
export interface TaxCalculationResult {
  // Income breakdown
  incomeBreakdown: IncomeHeadBreakdown;
  totalIncome: number;
  taxFreeThreshold: number;
  taxableIncome: number;

  // Slab-wise tax
  slabBreakdown: SlabBreakdown[];
  grossTaxOnIncome: number;

  // Investment rebate
  totalEligibleInvestment: number;
  admissibleInvestment: number;
  investmentRebate: number;

  // After rebate
  taxAfterRebate: number;

  // Surcharge
  surcharge: SurchargeDetails;

  // Minimum tax
  minimumTax: number;
  isMinimumTaxApplied: boolean;

  // Final
  totalTaxLiability: number;
  taxAlreadyPaid: number;
  netTaxPayable: number; // positive = pay, negative = refund
}

// ─── Wizard State ────────────────────────────────────────────────
export type WizardStep =
  | 'personal-info'
  | 'salary'
  | 'business'
  | 'house-property'
  | 'capital-gains'
  | 'agricultural'
  | 'other-income'
  | 'investment'
  | 'review';

export const WIZARD_STEPS: WizardStep[] = [
  'personal-info',
  'salary',
  'business',
  'house-property',
  'capital-gains',
  'agricultural',
  'other-income',
  'investment',
  'review',
];

export const WIZARD_STEP_LABELS: Record<WizardStep, string> = {
  'personal-info': 'Personal Info',
  salary: 'Salary Income',
  business: 'Business Income',
  'house-property': 'House Property',
  'capital-gains': 'Capital Gains',
  agricultural: 'Agricultural',
  'other-income': 'Other Income',
  investment: 'Investment & Rebate',
  review: 'Review & Calculate',
};
