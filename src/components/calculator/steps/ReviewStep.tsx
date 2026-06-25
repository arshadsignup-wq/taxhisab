'use client';

import { useRouter } from 'next/navigation';
import { useCalculatorStore } from '@/store/calculator-store';
import { calculateTax } from '@/lib/tax-engine/calculator';
import { formatBDT } from '@/lib/formatters';
import {
  CATEGORY_LABELS,
  LOCATION_LABELS,
  ASSESSMENT_YEAR_LABELS,
} from '@/lib/tax-engine/constants';
import type { WizardStepId } from '@/types/tax';

export default function ReviewStep() {
  const router = useRouter();
  const { formData, prevStep, goToStep, setResult } = useCalculatorStore();
  const {
    profile,
    personalInfo,
    salary,
    business,
    houseProperty,
    capitalGains,
    agricultural,
    financialAssets,
    otherIncome,
    taxExempted,
    investment,
    taxPayments,
    assetsLiabilities,
  } = formData;

  const es = profile.enabledSections;

  const navigateToStep = (step: WizardStepId) => {
    goToStep(step);
  };

  const handleCalculate = () => {
    const result = calculateTax(formData);
    setResult(result);
    router.push('/calculator/result');
  };

  // Quick totals for display
  const salaryTotal = es.salary
    ? salary.basicSalary +
      salary.specialPay +
      salary.houseRentAllowance +
      salary.medicalAllowance +
      salary.conveyanceAllowance +
      salary.festivalBonus +
      salary.otherAllowances +
      salary.employerProvidentFund +
      salary.employeeShareScheme +
      salary.otherEmploymentIncome +
      salary.perquisites
    : 0;

  const businessTotal = es.business ? business.netProfit : 0;

  const housePropertyTotal = es['house-property']
    ? houseProperty.properties.reduce((sum, p) => sum + p.annualRent, 0)
    : 0;

  const capitalGainsTotal = es['capital-gains']
    ? capitalGains.gains.reduce((sum, g) => sum + g.gain, 0)
    : 0;

  const agriculturalTotal = es.agricultural ? agricultural.grossIncome : 0;

  const financialAssetsTotal = es['financial-assets']
    ? financialAssets.bankInterest +
      financialAssets.savingsCertificateInterest +
      financialAssets.securitiesInterest +
      financialAssets.listedDividends +
      financialAssets.unlistedDividends +
      financialAssets.otherFinancialIncome
    : 0;

  const otherIncomeTotal = es['other-income']
    ? otherIncome.foreignRemittance +
      otherIncome.royaltyIncome +
      otherIncome.otherSources
    : 0;

  const taxExemptedTotal = es['tax-exempted']
    ? taxExempted.exemptedAgriculturalIncome +
      taxExempted.exemptedDividends +
      taxExempted.exemptedInterest +
      taxExempted.exemptedOther
    : 0;

  const investmentTotal = es.investment
    ? investment.lifeInsurance +
      investment.depositPensionScheme +
      investment.providentFund +
      investment.savingsCertificates +
      investment.stockInvestment +
      investment.donations +
      investment.otherInvestments
    : 0;

  const tdsTotalAmount = taxPayments.tdsEntries.reduce(
    (s, e) => s + e.amount,
    0
  );
  const advanceTotalAmount = taxPayments.advanceTaxEntries.reduce(
    (s, e) => s + e.amount,
    0
  );
  const taxPaidTotal =
    tdsTotalAmount +
    advanceTotalAmount +
    taxPayments.taxRefundAdjustment +
    taxPayments.taxPaidWithReturn;

  const sections: {
    label: string;
    enabled: boolean;
    step: WizardStepId;
    total: number;
  }[] = [
    { label: 'Salary Income', enabled: es.salary, step: 'salary', total: salaryTotal },
    { label: 'Business Income', enabled: es.business, step: 'business', total: businessTotal },
    { label: 'House Property', enabled: es['house-property'], step: 'house-property', total: housePropertyTotal },
    { label: 'Capital Gains', enabled: es['capital-gains'], step: 'capital-gains', total: capitalGainsTotal },
    { label: 'Agricultural Income', enabled: es.agricultural, step: 'agricultural', total: agriculturalTotal },
    { label: 'Financial Assets', enabled: es['financial-assets'], step: 'financial-assets', total: financialAssetsTotal },
    { label: 'Other Income', enabled: es['other-income'], step: 'other-income', total: otherIncomeTotal },
    { label: 'Tax-Exempted Income', enabled: es['tax-exempted'], step: 'tax-exempted', total: taxExemptedTotal },
    { label: 'Investment & Rebate', enabled: es.investment, step: 'investment', total: investmentTotal },
    { label: 'Assets & Liabilities (IT-10B)', enabled: es['assets-liabilities'], step: 'assets-liabilities', total: 0 },
  ];

  const enabledSections = sections.filter((s) => s.enabled);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Review & Calculate
        </h2>
        <p className="text-sm text-ink-muted">
          Review your information before calculating tax. Click Edit to make changes.
        </p>
      </div>

      {/* Personal Info */}
      <div className="border border-rule rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-ink">Personal Information</h3>
          <button
            type="button"
            onClick={() => navigateToStep('profile')}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-ink-muted">Category:</span>{' '}
            <span className="font-medium">{CATEGORY_LABELS[personalInfo.category]}</span>
          </div>
          <div>
            <span className="text-ink-muted">Location:</span>{' '}
            <span className="font-medium">{LOCATION_LABELS[personalInfo.location]}</span>
          </div>
          <div>
            <span className="text-ink-muted">Year:</span>{' '}
            <span className="font-medium">{ASSESSMENT_YEAR_LABELS[personalInfo.assessmentYear]}</span>
          </div>
          {personalInfo.name && (
            <div>
              <span className="text-ink-muted">Name:</span>{' '}
              <span className="font-medium">{personalInfo.name}</span>
            </div>
          )}
          {personalInfo.tin && (
            <div>
              <span className="text-ink-muted">TIN:</span>{' '}
              <span className="font-medium">{personalInfo.tin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Income & Other Sections */}
      {enabledSections.map((section) => (
        <div key={section.step} className="border border-rule rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-ink">{section.label}</h3>
            <button
              type="button"
              onClick={() => navigateToStep(section.step)}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Edit
            </button>
          </div>
          {section.step === 'tax-exempted' ? (
            <div className="flex justify-between text-sm font-medium">
              <span>Total Exempted</span>
              <span className="text-success">-{formatBDT(section.total)}</span>
            </div>
          ) : section.step === 'assets-liabilities' ? (
            <p className="text-sm text-ink-muted italic">IT-10B data entered</p>
          ) : (
            <div className="flex justify-between text-sm font-medium">
              <span>Total</span>
              <span className="text-primary">{formatBDT(section.total)}</span>
            </div>
          )}
        </div>
      ))}

      {/* Tax Payments Summary */}
      <div className="border border-rule rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-ink">Tax Already Paid</h3>
          <button
            type="button"
            onClick={() => navigateToStep('tax-payments')}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span>Total</span>
          <span className="text-primary">{formatBDT(taxPaidTotal)}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-rule">
        <button
          type="button"
          onClick={prevStep}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-cta hover:bg-cta-dark text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-cta/20"
        >
          Calculate Tax
        </button>
      </div>
    </div>
  );
}
