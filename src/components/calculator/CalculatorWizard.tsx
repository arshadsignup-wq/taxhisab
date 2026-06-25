'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { getActiveSteps } from '@/lib/wizard-steps';
import WizardStepIndicator from '@/components/calculator/WizardStepIndicator';
import RunningTotalBanner from '@/components/calculator/RunningTotalBanner';
import ProfileStep from '@/components/calculator/steps/ProfileStep';
import PersonalInfoStep from '@/components/calculator/steps/PersonalInfoStep';
import SalaryIncomeStep from '@/components/calculator/steps/SalaryIncomeStep';
import BusinessIncomeStep from '@/components/calculator/steps/BusinessIncomeStep';
import HousePropertyStep from '@/components/calculator/steps/HousePropertyStep';
import CapitalGainsStep from '@/components/calculator/steps/CapitalGainsStep';
import AgriculturalIncomeStep from '@/components/calculator/steps/AgriculturalIncomeStep';
import FinancialAssetsStep from '@/components/calculator/steps/FinancialAssetsStep';
import OtherIncomeStep from '@/components/calculator/steps/OtherIncomeStep';
import TaxExemptedStep from '@/components/calculator/steps/TaxExemptedStep';
import InvestmentRebateStep from '@/components/calculator/steps/InvestmentRebateStep';
import TaxPaymentsStep from '@/components/calculator/steps/TaxPaymentsStep';
import AssetsLiabilitiesStep from '@/components/calculator/steps/AssetsLiabilitiesStep';
import ReviewStep from '@/components/calculator/steps/ReviewStep';
import type { WizardStepId } from '@/types/tax';

const STEP_COMPONENTS: Record<WizardStepId, React.ComponentType> = {
  profile: ProfileStep,
  'personal-info': PersonalInfoStep,
  salary: SalaryIncomeStep,
  business: BusinessIncomeStep,
  'house-property': HousePropertyStep,
  'capital-gains': CapitalGainsStep,
  agricultural: AgriculturalIncomeStep,
  'financial-assets': FinancialAssetsStep,
  'other-income': OtherIncomeStep,
  'tax-exempted': TaxExemptedStep,
  investment: InvestmentRebateStep,
  'tax-payments': TaxPaymentsStep,
  'assets-liabilities': AssetsLiabilitiesStep,
  review: ReviewStep,
};

export default function CalculatorWizard() {
  const { currentStep, formData } = useCalculatorStore();
  const activeSteps = getActiveSteps(formData.profile);
  const StepComponent = STEP_COMPONENTS[currentStep];

  // Show running total after the profile step and when at least one income section exists
  const showRunningTotal =
    currentStep !== 'profile' && currentStep !== 'review';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <WizardStepIndicator
        activeSteps={activeSteps}
        currentStep={currentStep}
      />
      <div className="bg-white rounded-2xl border border-rule elevation-2 p-6 sm:p-8">
        <StepComponent />
      </div>
      {showRunningTotal && <RunningTotalBanner />}
    </div>
  );
}
