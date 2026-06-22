'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import WizardStepIndicator from '@/components/calculator/WizardStepIndicator';
import PersonalInfoStep from '@/components/calculator/steps/PersonalInfoStep';
import SalaryIncomeStep from '@/components/calculator/steps/SalaryIncomeStep';
import BusinessIncomeStep from '@/components/calculator/steps/BusinessIncomeStep';
import HousePropertyStep from '@/components/calculator/steps/HousePropertyStep';
import CapitalGainsStep from '@/components/calculator/steps/CapitalGainsStep';
import AgriculturalIncomeStep from '@/components/calculator/steps/AgriculturalIncomeStep';
import OtherIncomeStep from '@/components/calculator/steps/OtherIncomeStep';
import InvestmentRebateStep from '@/components/calculator/steps/InvestmentRebateStep';
import ReviewStep from '@/components/calculator/steps/ReviewStep';
import type { WizardStep } from '@/types/tax';

const STEP_COMPONENTS: Record<WizardStep, React.ComponentType> = {
  'personal-info': PersonalInfoStep,
  salary: SalaryIncomeStep,
  business: BusinessIncomeStep,
  'house-property': HousePropertyStep,
  'capital-gains': CapitalGainsStep,
  agricultural: AgriculturalIncomeStep,
  'other-income': OtherIncomeStep,
  investment: InvestmentRebateStep,
  review: ReviewStep,
};

export default function CalculatorWizard() {
  const { currentStep } = useCalculatorStore();
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <WizardStepIndicator />
      <div className="bg-white rounded-xl border border-rule card-elevated p-6 sm:p-8">
        <StepComponent />
      </div>
    </div>
  );
}
