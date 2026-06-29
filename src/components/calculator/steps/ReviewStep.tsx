'use client';

import { useRouter } from 'next/navigation';
import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import { calculateTax } from '@/lib/tax-engine/calculator';
import { formatBDT } from '@/lib/formatters';
import type { WizardStepId } from '@/types/tax';

export default function ReviewStep() {
  const t = useTranslation();
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

    // Increment localStorage calculation counter
    try {
      const count = parseInt(localStorage.getItem('taxhisab_calc_count') || '0', 10);
      localStorage.setItem('taxhisab_calc_count', String(count + 1));
    } catch {
      // localStorage may be unavailable
    }

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

  const SECTION_KEYS: { key: string; step: WizardStepId; enabled: boolean; total: number }[] = [
    { key: 'salary', step: 'salary', enabled: es.salary, total: salaryTotal },
    { key: 'business', step: 'business', enabled: es.business, total: businessTotal },
    { key: 'house-property', step: 'house-property', enabled: es['house-property'], total: housePropertyTotal },
    { key: 'capital-gains', step: 'capital-gains', enabled: es['capital-gains'], total: capitalGainsTotal },
    { key: 'agricultural', step: 'agricultural', enabled: es.agricultural, total: agriculturalTotal },
    { key: 'financial-assets', step: 'financial-assets', enabled: es['financial-assets'], total: financialAssetsTotal },
    { key: 'other-income', step: 'other-income', enabled: es['other-income'], total: otherIncomeTotal },
    { key: 'tax-exempted', step: 'tax-exempted', enabled: es['tax-exempted'], total: taxExemptedTotal },
    { key: 'investment', step: 'investment', enabled: es.investment, total: investmentTotal },
    { key: 'assets-liabilities', step: 'assets-liabilities', enabled: es['assets-liabilities'], total: 0 },
  ];

  const enabledSections = SECTION_KEYS.filter((s) => s.enabled);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.review.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.review.subtitle}
        </p>
      </div>

      {/* Personal Info */}
      <div className="border border-rule rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-ink">{t.calculator.review.personalInfo}</h3>
          <button
            type="button"
            onClick={() => navigateToStep('profile')}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            {t.common.edit}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-ink-muted">Category:</span>{' '}
            <span className="font-medium">{t.labels.categories[personalInfo.category]}</span>
          </div>
          <div>
            <span className="text-ink-muted">Location:</span>{' '}
            <span className="font-medium">{t.labels.locations[personalInfo.location]}</span>
          </div>
          <div>
            <span className="text-ink-muted">Year:</span>{' '}
            <span className="font-medium">{t.labels.assessmentYears[personalInfo.assessmentYear]}</span>
          </div>
        </div>
      </div>

      {/* Income & Other Sections */}
      {enabledSections.map((section) => (
        <div key={section.step} className="border border-rule rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-ink">{t.calculator.review.sectionLabels[section.key]}</h3>
            <button
              type="button"
              onClick={() => navigateToStep(section.step)}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {t.common.edit}
            </button>
          </div>
          {section.step === 'tax-exempted' ? (
            <div className="flex justify-between text-sm font-medium">
              <span>{t.calculator.review.totalExempted}</span>
              <span className="text-success">-{formatBDT(section.total)}</span>
            </div>
          ) : section.step === 'assets-liabilities' ? (
            <p className="text-sm text-ink-muted italic">{t.calculator.review.it10bEntered}</p>
          ) : (
            <div className="flex justify-between text-sm font-medium">
              <span>{t.common.total}</span>
              <span className="text-primary">{formatBDT(section.total)}</span>
            </div>
          )}
        </div>
      ))}

      {/* Tax Payments Summary */}
      <div className="border border-rule rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-ink">{t.calculator.review.taxAlreadyPaid}</h3>
          <button
            type="button"
            onClick={() => navigateToStep('tax-payments')}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            {t.common.edit}
          </button>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span>{t.common.total}</span>
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
          {t.common.previous}
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-cta hover:bg-cta-dark text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-cta/20"
        >
          {t.calculator.review.calculateTax}
        </button>
      </div>
    </div>
  );
}
