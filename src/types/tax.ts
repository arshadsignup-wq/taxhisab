// ─── Core Enums ─────────────────────────────────────────────────

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

// ─── Profile (income-type selection) ────────────────────────────

export type IncomeSection =
  | 'salary'
  | 'house-property'
  | 'agricultural'
  | 'business'
  | 'capital-gains'
  | 'financial-assets'
  | 'other-income'
  | 'tax-exempted'
  | 'investment'
  | 'assets-liabilities';

export interface TaxProfile {
  enabledSections: Record<IncomeSection, boolean>;
}

// ─── Personal Info (IT-11GA Part 1) ─────────────────────────────

export interface PersonalInfo {
  category: TaxpayerCategory;
  location: LocationType;
  assessmentYear: AssessmentYear;
  name: string;
  tin: string;
  nid: string;
  circle: string;
  zone: string;
  spouseName: string;
  spouseTin: string;
  employerName: string;
}

// ─── Salary Income (Schedule 24A) ───────────────────────────────

export interface SalaryIncome {
  basicSalary: number;
  specialPay: number;
  houseRentAllowance: number;
  medicalAllowance: number;
  conveyanceAllowance: number;
  festivalBonus: number;
  otherAllowances: number;
  employerProvidentFund: number;
  employeeShareScheme: number;
  otherEmploymentIncome: number;
  perquisites: number;
}

// ─── Business Income (Schedule 24C) ─────────────────────────────

export interface BusinessIncome {
  isFreelancer: boolean;
  grossReceipts: number;
  expenses: number;
  netProfit: number;
}

// ─── House Property Income (Schedule 24B) ───────────────────────

export interface HouseProperty {
  description: string;
  type: PropertyType;
  annualRent: number;
  municipalTax: number;
  repairDeduction: number;
  insurancePremium: number;
  vacancyAllowance: number;
  loanInterest: number;
}

export interface HousePropertyIncome {
  properties: HouseProperty[];
}

// ─── Capital Gains ──────────────────────────────────────────────

export interface CapitalGain {
  description: string;
  assetType: CapitalAssetType;
  dateOfTransfer: string;
  salePrice: number;
  costOfAcquisition: number;
  costOfImprovement: number;
  gain: number;
}

export interface CapitalGainsIncome {
  gains: CapitalGain[];
}

// ─── Agricultural Income ────────────────────────────────────────

export interface AgriculturalIncome {
  grossIncome: number;
  expenseMethod: AgriculturalExpenseMethod;
  actualExpenses: number;
}

// ─── Financial Assets Income (IT-11GA Serial 6) ─────────────────

export interface FinancialAssetsIncome {
  bankInterest: number;
  savingsCertificateInterest: number;
  securitiesInterest: number;
  listedDividends: number;
  unlistedDividends: number;
  otherFinancialIncome: number;
}

// ─── Other Income (IT-11GA Serial 7) ────────────────────────────

export interface OtherIncome {
  foreignRemittance: number;
  royaltyIncome: number;
  otherSources: number;
}

// ─── Tax-Exempted Income ────────────────────────────────────────

export interface TaxExemptedIncome {
  exemptedAgriculturalIncome: number;
  exemptedDividends: number;
  exemptedInterest: number;
  exemptedOther: number;
}

// ─── Investment & Rebate (Schedule 24D, Section 78) ─────────────

export interface InvestmentRebate {
  lifeInsurance: number;
  depositPensionScheme: number;
  providentFund: number;
  savingsCertificates: number;
  stockInvestment: number;
  donations: number;
  otherInvestments: number;
}

// ─── Tax Payments (IT-11GA Part C) ──────────────────────────────

export interface TdsEntry {
  source: string;
  amount: number;
}

export interface AdvanceTaxEntry {
  date: string;
  amount: number;
}

export interface TaxPayments {
  tdsEntries: TdsEntry[];
  advanceTaxEntries: AdvanceTaxEntry[];
  taxRefundAdjustment: number;
  taxPaidWithReturn: number;
}

// ─── Assets & Liabilities (IT-10B) ─────────────────────────────

export interface AssetsLiabilities {
  businessCapital: number;
  directorsShares: number;
  nonAgriculturalProperty: number;
  agriculturalProperty: number;
  investmentsAssets: number;
  motorVehicles: number;
  motorVehicleCount: number;
  jewellery: number;
  furnitureElectronics: number;
  cashAndBankBalance: number;
  assetsOutsideBangladesh: number;
  otherAssets: number;
  mortgageLoans: number;
  unsecuredLoans: number;
  bankLoans: number;
  otherLiabilities: number;
  familyExpenses: number;
}

// ─── Complete Calculator State ──────────────────────────────────

export interface CalculatorFormData {
  profile: TaxProfile;
  personalInfo: PersonalInfo;
  salary: SalaryIncome;
  business: BusinessIncome;
  houseProperty: HousePropertyIncome;
  capitalGains: CapitalGainsIncome;
  agricultural: AgriculturalIncome;
  financialAssets: FinancialAssetsIncome;
  otherIncome: OtherIncome;
  taxExempted: TaxExemptedIncome;
  investment: InvestmentRebate;
  taxPayments: TaxPayments;
  assetsLiabilities: AssetsLiabilities;
}

// ─── Tax Slab ──────────────────────────────────────────────────

export interface TaxSlab {
  lowerLimit: number;
  upperLimit: number | null;
  rate: number;
}

// ─── Slab Breakdown (for result display) ────────────────────────

export interface SlabBreakdown {
  slabRange: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

// ─── Income Head Breakdown ─────────────────────────────────────

export interface IncomeHeadBreakdown {
  salary: number;
  business: number;
  houseProperty: number;
  capitalGains: number;
  agricultural: number;
  financialAssets: number;
  otherIncome: number;
}

// ─── Surcharge Details ─────────────────────────────────────────

export interface SurchargeDetails {
  netWealth: number;
  surchargeRate: number;
  surchargeAmount: number;
  environmentalSurcharge: number;
}

// ─── Salary Breakdown (for Schedule 24A display) ────────────────

export interface SalaryBreakdownItem {
  label: string;
  gross: number;
  exempt: number;
  taxable: number;
}

export interface SalaryBreakdownResult {
  items: SalaryBreakdownItem[];
  totalGross: number;
  totalExempt: number;
  totalTaxable: number;
}

// ─── House Property Breakdown ───────────────────────────────────

export interface HousePropertyBreakdownItem {
  description: string;
  type: PropertyType;
  annualValue: number;
  deductions: number;
  netIncome: number;
}

// ─── Complete Tax Calculation Result ────────────────────────────

export interface TaxCalculationResult {
  // Income breakdown
  incomeBreakdown: IncomeHeadBreakdown;
  totalIncome: number;
  taxExemptedTotal: number;
  grossTotalIncome: number;
  taxFreeThreshold: number;
  taxableIncome: number;

  // Schedule breakdowns
  salaryBreakdown: SalaryBreakdownResult | null;
  housePropertyBreakdown: HousePropertyBreakdownItem[];

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
  netTaxPayable: number;

  // IT-10B summary
  totalAssets: number;
  totalLiabilities: number;
  netWealth: number;
}

// ─── Wizard State ──────────────────────────────────────────────

export type WizardStepId =
  | 'profile'
  | 'personal-info'
  | 'salary'
  | 'house-property'
  | 'agricultural'
  | 'business'
  | 'capital-gains'
  | 'financial-assets'
  | 'other-income'
  | 'tax-exempted'
  | 'investment'
  | 'tax-payments'
  | 'assets-liabilities'
  | 'review';

export interface WizardStep {
  id: WizardStepId;
  label: string;
  shortLabel: string;
}

// Static full list -- used by getActiveSteps() to filter
export const ALL_WIZARD_STEPS: WizardStep[] = [
  { id: 'profile', label: 'Income Profile', shortLabel: 'Profile' },
  { id: 'personal-info', label: 'Personal Information', shortLabel: 'Personal' },
  { id: 'salary', label: 'Salary Income', shortLabel: 'Salary' },
  { id: 'house-property', label: 'House Property', shortLabel: 'Property' },
  { id: 'agricultural', label: 'Agricultural Income', shortLabel: 'Agricultural' },
  { id: 'business', label: 'Business Income', shortLabel: 'Business' },
  { id: 'capital-gains', label: 'Capital Gains', shortLabel: 'Capital' },
  { id: 'financial-assets', label: 'Financial Assets', shortLabel: 'Financial' },
  { id: 'other-income', label: 'Other Income', shortLabel: 'Other' },
  { id: 'tax-exempted', label: 'Tax-Exempted Income', shortLabel: 'Exempted' },
  { id: 'investment', label: 'Investment & Rebate', shortLabel: 'Investment' },
  { id: 'tax-payments', label: 'Tax Payments', shortLabel: 'Tax Paid' },
  { id: 'assets-liabilities', label: 'Assets & Liabilities', shortLabel: 'IT-10B' },
  { id: 'review', label: 'Review & Calculate', shortLabel: 'Review' },
];
