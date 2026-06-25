import { z } from 'zod';

const nonNegativeNumber = z.number().min(0, 'Must be 0 or greater');

export const personalInfoSchema = z.object({
  category: z.enum(['male', 'female', 'senior', 'disabled', 'freedom_fighter'], {
    message: 'Please select a category',
  }),
  location: z.enum(['dhaka_chattogram', 'other_city_corp', 'other'], {
    message: 'Please select a location',
  }),
  assessmentYear: z.enum(['2026-2027', '2025-2026', '2024-2025'], {
    message: 'Please select an assessment year',
  }),
  name: z.string(),
  tin: z.string(),
  nid: z.string(),
  circle: z.string(),
  zone: z.string(),
  spouseName: z.string(),
  spouseTin: z.string(),
  employerName: z.string(),
});

export const salaryIncomeSchema = z.object({
  basicSalary: nonNegativeNumber,
  specialPay: nonNegativeNumber,
  houseRentAllowance: nonNegativeNumber,
  medicalAllowance: nonNegativeNumber,
  conveyanceAllowance: nonNegativeNumber,
  festivalBonus: nonNegativeNumber,
  otherAllowances: nonNegativeNumber,
  employerProvidentFund: nonNegativeNumber,
  employeeShareScheme: nonNegativeNumber,
  otherEmploymentIncome: nonNegativeNumber,
  perquisites: nonNegativeNumber,
});

export const businessIncomeSchema = z.object({
  isFreelancer: z.boolean(),
  grossReceipts: nonNegativeNumber,
  expenses: nonNegativeNumber,
  netProfit: z.number(),
});

export const housePropertySchema = z.object({
  description: z.string(),
  type: z.enum(['self_occupied', 'let_out']),
  annualRent: nonNegativeNumber,
  municipalTax: nonNegativeNumber,
  repairDeduction: nonNegativeNumber,
  insurancePremium: nonNegativeNumber,
  vacancyAllowance: nonNegativeNumber,
  loanInterest: nonNegativeNumber,
});

export const housePropertyIncomeSchema = z.object({
  properties: z.array(housePropertySchema),
});

export const capitalGainSchema = z.object({
  description: z.string(),
  assetType: z.enum(['property', 'shares', 'other']),
  dateOfTransfer: z.string(),
  salePrice: nonNegativeNumber,
  costOfAcquisition: nonNegativeNumber,
  costOfImprovement: nonNegativeNumber,
  gain: z.number(),
});

export const capitalGainsIncomeSchema = z.object({
  gains: z.array(capitalGainSchema),
});

export const agriculturalIncomeSchema = z.object({
  grossIncome: nonNegativeNumber,
  expenseMethod: z.enum(['flat_rate', 'actual']),
  actualExpenses: nonNegativeNumber,
});

export const financialAssetsIncomeSchema = z.object({
  bankInterest: nonNegativeNumber,
  savingsCertificateInterest: nonNegativeNumber,
  securitiesInterest: nonNegativeNumber,
  listedDividends: nonNegativeNumber,
  unlistedDividends: nonNegativeNumber,
  otherFinancialIncome: nonNegativeNumber,
});

export const otherIncomeSchema = z.object({
  foreignRemittance: nonNegativeNumber,
  royaltyIncome: nonNegativeNumber,
  otherSources: nonNegativeNumber,
});

export const taxExemptedIncomeSchema = z.object({
  exemptedAgriculturalIncome: nonNegativeNumber,
  exemptedDividends: nonNegativeNumber,
  exemptedInterest: nonNegativeNumber,
  exemptedOther: nonNegativeNumber,
});

export const investmentRebateSchema = z.object({
  lifeInsurance: nonNegativeNumber,
  depositPensionScheme: nonNegativeNumber,
  providentFund: nonNegativeNumber,
  savingsCertificates: nonNegativeNumber,
  stockInvestment: nonNegativeNumber,
  donations: nonNegativeNumber,
  otherInvestments: nonNegativeNumber,
});

export const taxPaymentsSchema = z.object({
  tdsEntries: z.array(
    z.object({
      source: z.string(),
      amount: nonNegativeNumber,
    })
  ),
  advanceTaxEntries: z.array(
    z.object({
      date: z.string(),
      amount: nonNegativeNumber,
    })
  ),
  taxRefundAdjustment: nonNegativeNumber,
  taxPaidWithReturn: nonNegativeNumber,
});

export const assetsLiabilitiesSchema = z.object({
  businessCapital: nonNegativeNumber,
  directorsShares: nonNegativeNumber,
  nonAgriculturalProperty: nonNegativeNumber,
  agriculturalProperty: nonNegativeNumber,
  investmentsAssets: nonNegativeNumber,
  motorVehicles: nonNegativeNumber,
  motorVehicleCount: nonNegativeNumber,
  jewellery: nonNegativeNumber,
  furnitureElectronics: nonNegativeNumber,
  cashAndBankBalance: nonNegativeNumber,
  assetsOutsideBangladesh: nonNegativeNumber,
  otherAssets: nonNegativeNumber,
  mortgageLoans: nonNegativeNumber,
  unsecuredLoans: nonNegativeNumber,
  bankLoans: nonNegativeNumber,
  otherLiabilities: nonNegativeNumber,
  familyExpenses: nonNegativeNumber,
});
