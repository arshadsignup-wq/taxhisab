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
});

export const salaryIncomeSchema = z.object({
  enabled: z.boolean(),
  basicSalary: nonNegativeNumber,
  houseRentAllowance: nonNegativeNumber,
  medicalAllowance: nonNegativeNumber,
  conveyanceAllowance: nonNegativeNumber,
  festivalBonus: nonNegativeNumber,
  otherAllowances: nonNegativeNumber,
  employerProvidentFund: nonNegativeNumber,
  perquisites: nonNegativeNumber,
});

export const businessIncomeSchema = z.object({
  enabled: z.boolean(),
  isFreelancer: z.boolean(),
  grossReceipts: nonNegativeNumber,
  expenses: nonNegativeNumber,
  netProfit: nonNegativeNumber,
});

export const housePropertySchema = z.object({
  type: z.enum(['self_occupied', 'let_out']),
  annualRent: nonNegativeNumber,
  municipalTax: nonNegativeNumber,
  repairDeduction: nonNegativeNumber,
  loanInterest: nonNegativeNumber,
});

export const housePropertyIncomeSchema = z.object({
  enabled: z.boolean(),
  properties: z.array(housePropertySchema),
});

export const capitalGainSchema = z.object({
  assetType: z.enum(['property', 'shares', 'other']),
  salePrice: nonNegativeNumber,
  costOfAcquisition: nonNegativeNumber,
  gain: nonNegativeNumber,
});

export const capitalGainsIncomeSchema = z.object({
  enabled: z.boolean(),
  gains: z.array(capitalGainSchema),
});

export const agriculturalIncomeSchema = z.object({
  enabled: z.boolean(),
  grossIncome: nonNegativeNumber,
  expenseMethod: z.enum(['flat_rate', 'actual']),
  actualExpenses: nonNegativeNumber,
});

export const otherIncomeSchema = z.object({
  enabled: z.boolean(),
  bankInterest: nonNegativeNumber,
  dividends: nonNegativeNumber,
  remittance: nonNegativeNumber,
  otherSources: nonNegativeNumber,
});

export const investmentRebateSchema = z.object({
  enabled: z.boolean(),
  lifeInsurance: nonNegativeNumber,
  depositPensionScheme: nonNegativeNumber,
  providentFund: nonNegativeNumber,
  savingsCertificates: nonNegativeNumber,
  stockInvestment: nonNegativeNumber,
  donations: nonNegativeNumber,
  otherInvestments: nonNegativeNumber,
});

export const taxPaidSchema = z.object({
  tdsOnSalary: nonNegativeNumber,
  tdsOnOther: nonNegativeNumber,
  advanceTax: nonNegativeNumber,
});

export const calculatorFormSchema = z.object({
  personalInfo: personalInfoSchema,
  salary: salaryIncomeSchema,
  business: businessIncomeSchema,
  houseProperty: housePropertyIncomeSchema,
  capitalGains: capitalGainsIncomeSchema,
  agricultural: agriculturalIncomeSchema,
  otherIncome: otherIncomeSchema,
  investment: investmentRebateSchema,
  taxPaid: taxPaidSchema,
});

export type CalculatorFormSchema = z.infer<typeof calculatorFormSchema>;
