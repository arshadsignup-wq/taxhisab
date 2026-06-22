'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CalculatorFormData,
  WizardStep,
  WIZARD_STEPS,
  TaxCalculationResult,
} from '@/types/tax';

const DEFAULT_FORM_DATA: CalculatorFormData = {
  personalInfo: {
    category: 'male',
    location: 'dhaka_chattogram',
    assessmentYear: '2026-2027',
  },
  salary: {
    enabled: false,
    basicSalary: 0,
    houseRentAllowance: 0,
    medicalAllowance: 0,
    conveyanceAllowance: 0,
    festivalBonus: 0,
    otherAllowances: 0,
    employerProvidentFund: 0,
    perquisites: 0,
  },
  business: {
    enabled: false,
    isFreelancer: false,
    grossReceipts: 0,
    expenses: 0,
    netProfit: 0,
  },
  houseProperty: {
    enabled: false,
    properties: [
      {
        type: 'let_out',
        annualRent: 0,
        municipalTax: 0,
        repairDeduction: 0,
        loanInterest: 0,
      },
    ],
  },
  capitalGains: {
    enabled: false,
    gains: [
      {
        assetType: 'property',
        salePrice: 0,
        costOfAcquisition: 0,
        gain: 0,
      },
    ],
  },
  agricultural: {
    enabled: false,
    grossIncome: 0,
    expenseMethod: 'flat_rate',
    actualExpenses: 0,
  },
  otherIncome: {
    enabled: false,
    bankInterest: 0,
    dividends: 0,
    remittance: 0,
    otherSources: 0,
  },
  investment: {
    enabled: false,
    lifeInsurance: 0,
    depositPensionScheme: 0,
    providentFund: 0,
    savingsCertificates: 0,
    stockInvestment: 0,
    donations: 0,
    otherInvestments: 0,
  },
  taxPaid: {
    tdsOnSalary: 0,
    tdsOnOther: 0,
    advanceTax: 0,
  },
};

interface CalculatorStore {
  // Wizard navigation
  currentStep: WizardStep;
  setCurrentStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: WizardStep) => void;

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
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  getCurrentStepIndex: () => number;
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      currentStep: 'personal-info',

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        const currentIndex = WIZARD_STEPS.indexOf(currentStep);
        if (currentIndex < WIZARD_STEPS.length - 1) {
          set({ currentStep: WIZARD_STEPS[currentIndex + 1] });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        const currentIndex = WIZARD_STEPS.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ currentStep: WIZARD_STEPS[currentIndex - 1] });
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
          currentStep: 'personal-info',
          result: null,
        }),

      result: null,
      setResult: (result) => set({ result }),

      isFirstStep: () => get().currentStep === WIZARD_STEPS[0],
      isLastStep: () =>
        get().currentStep === WIZARD_STEPS[WIZARD_STEPS.length - 1],
      getCurrentStepIndex: () => WIZARD_STEPS.indexOf(get().currentStep),
    }),
    {
      name: 'tax-calculator-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);
