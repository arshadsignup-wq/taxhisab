'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CalculatorFormData,
  WizardStepId,
  TaxCalculationResult,
} from '@/types/tax';
import { getActiveSteps } from '@/lib/wizard-steps';

// ─── Default Form Data ──────────────────────────────────────────

export const DEFAULT_FORM_DATA: CalculatorFormData = {
  profile: {
    enabledSections: {
      salary: false,
      'house-property': false,
      agricultural: false,
      business: false,
      'capital-gains': false,
      'financial-assets': false,
      'other-income': false,
      'tax-exempted': false,
      investment: false,
      'assets-liabilities': false,
    },
  },
  personalInfo: {
    category: 'male',
    location: 'dhaka_chattogram',
    assessmentYear: '2026-2027',
    name: '',
    tin: '',
    nid: '',
    circle: '',
    zone: '',
    spouseName: '',
    spouseTin: '',
    employerName: '',
  },
  salary: {
    basicSalary: 0,
    specialPay: 0,
    houseRentAllowance: 0,
    medicalAllowance: 0,
    conveyanceAllowance: 0,
    festivalBonus: 0,
    otherAllowances: 0,
    employerProvidentFund: 0,
    employeeShareScheme: 0,
    otherEmploymentIncome: 0,
    perquisites: 0,
  },
  business: {
    isFreelancer: false,
    grossReceipts: 0,
    expenses: 0,
    netProfit: 0,
  },
  houseProperty: {
    properties: [
      {
        description: '',
        type: 'let_out',
        annualRent: 0,
        municipalTax: 0,
        repairDeduction: 0,
        insurancePremium: 0,
        vacancyAllowance: 0,
        loanInterest: 0,
      },
    ],
  },
  capitalGains: {
    gains: [
      {
        description: '',
        assetType: 'property',
        dateOfTransfer: '',
        salePrice: 0,
        costOfAcquisition: 0,
        costOfImprovement: 0,
        gain: 0,
      },
    ],
  },
  agricultural: {
    grossIncome: 0,
    expenseMethod: 'flat_rate',
    actualExpenses: 0,
  },
  financialAssets: {
    bankInterest: 0,
    savingsCertificateInterest: 0,
    securitiesInterest: 0,
    listedDividends: 0,
    unlistedDividends: 0,
    otherFinancialIncome: 0,
  },
  otherIncome: {
    foreignRemittance: 0,
    royaltyIncome: 0,
    otherSources: 0,
  },
  taxExempted: {
    exemptedAgriculturalIncome: 0,
    exemptedDividends: 0,
    exemptedInterest: 0,
    exemptedOther: 0,
  },
  investment: {
    lifeInsurance: 0,
    depositPensionScheme: 0,
    providentFund: 0,
    savingsCertificates: 0,
    stockInvestment: 0,
    donations: 0,
    otherInvestments: 0,
  },
  taxPayments: {
    tdsEntries: [{ source: 'Salary', amount: 0 }],
    advanceTaxEntries: [{ date: '', amount: 0 }],
    taxRefundAdjustment: 0,
    taxPaidWithReturn: 0,
  },
  assetsLiabilities: {
    businessCapital: 0,
    directorsShares: 0,
    nonAgriculturalProperty: 0,
    agriculturalProperty: 0,
    investmentsAssets: 0,
    motorVehicles: 0,
    motorVehicleCount: 0,
    jewellery: 0,
    furnitureElectronics: 0,
    cashAndBankBalance: 0,
    assetsOutsideBangladesh: 0,
    otherAssets: 0,
    mortgageLoans: 0,
    unsecuredLoans: 0,
    bankLoans: 0,
    otherLiabilities: 0,
    familyExpenses: 0,
  },
};

// ─── Store Interface ────────────────────────────────────────────

interface CalculatorStore {
  // Wizard navigation
  currentStep: WizardStepId;
  setCurrentStep: (step: WizardStepId) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: WizardStepId) => void;

  // Form data
  formData: CalculatorFormData;
  updateFormData: <K extends keyof CalculatorFormData>(
    section: K,
    data: Partial<CalculatorFormData[K]>
  ) => void;
  resetFormData: () => void;

  // Results
  result: TaxCalculationResult | null;
  setResult: (result: TaxCalculationResult | null) => void;

  // Helpers
  getActiveStepIds: () => WizardStepId[];
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  getCurrentStepIndex: () => number;
  getStepCount: () => number;
}

// ─── Store ──────────────────────────────────────────────────────

const STORAGE_VERSION = 3;

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      currentStep: 'profile' as WizardStepId,

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep, formData } = get();
        const activeSteps = getActiveSteps(formData.profile);
        const stepIds = activeSteps.map((s) => s.id);
        const currentIndex = stepIds.indexOf(currentStep);
        if (currentIndex < stepIds.length - 1) {
          set({ currentStep: stepIds[currentIndex + 1] });
        }
      },

      prevStep: () => {
        const { currentStep, formData } = get();
        const activeSteps = getActiveSteps(formData.profile);
        const stepIds = activeSteps.map((s) => s.id);
        const currentIndex = stepIds.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepIds[currentIndex - 1] });
        }
      },

      goToStep: (step) => set({ currentStep: step }),

      formData: DEFAULT_FORM_DATA,

      updateFormData: (section, data) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              ...data,
            },
          },
        }));
      },

      resetFormData: () =>
        set({
          formData: DEFAULT_FORM_DATA,
          currentStep: 'profile',
          result: null,
        }),

      result: null,
      setResult: (result) => set({ result }),

      getActiveStepIds: () => {
        const { formData } = get();
        return getActiveSteps(formData.profile).map((s) => s.id);
      },

      isFirstStep: () => {
        const { currentStep, formData } = get();
        const activeSteps = getActiveSteps(formData.profile);
        return activeSteps.length > 0 && currentStep === activeSteps[0].id;
      },

      isLastStep: () => {
        const { currentStep, formData } = get();
        const activeSteps = getActiveSteps(formData.profile);
        return (
          activeSteps.length > 0 &&
          currentStep === activeSteps[activeSteps.length - 1].id
        );
      },

      getCurrentStepIndex: () => {
        const { currentStep, formData } = get();
        const activeSteps = getActiveSteps(formData.profile);
        return activeSteps.findIndex((s) => s.id === currentStep);
      },

      getStepCount: () => {
        const { formData } = get();
        return getActiveSteps(formData.profile).length;
      },
    }),
    {
      name: 'tax-calculator-storage',
      version: STORAGE_VERSION,
      migrate: (_persisted, version) => {
        // Reset old data from v1 or missing version
        if (version < STORAGE_VERSION) {
          return {
            formData: DEFAULT_FORM_DATA,
            currentStep: 'profile',
          };
        }
        return _persisted as Record<string, unknown>;
      },
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);
