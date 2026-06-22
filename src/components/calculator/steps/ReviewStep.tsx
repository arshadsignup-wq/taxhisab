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
import { WIZARD_STEPS, WizardStep } from '@/types/tax';

export default function ReviewStep() {
  const router = useRouter();
  const { formData, updateFormData, prevStep, goToStep, setResult } =
    useCalculatorStore();
  const {
    personalInfo,
    salary,
    business,
    houseProperty,
    capitalGains,
    agricultural,
    otherIncome,
    investment,
    taxPaid,
  } = formData;

  const navigateToStep = (step: WizardStep) => {
    goToStep(step);
  };

  const handleCalculate = () => {
    const result = calculateTax(formData);
    setResult(result);
    router.push('/calculator/result');
  };

  // Helper to compute totals for display
  const salaryTotal = salary.enabled
    ? salary.basicSalary +
      salary.houseRentAllowance +
      salary.medicalAllowance +
      salary.conveyanceAllowance +
      salary.festivalBonus +
      salary.otherAllowances +
      salary.employerProvidentFund +
      salary.perquisites
    : 0;

  const businessTotal = business.enabled ? business.netProfit : 0;

  const housePropertyTotal = houseProperty.enabled
    ? houseProperty.properties.reduce((sum, p) => sum + p.annualRent, 0)
    : 0;

  const capitalGainsTotal = capitalGains.enabled
    ? capitalGains.gains.reduce((sum, g) => sum + g.gain, 0)
    : 0;

  const agriculturalTotal = agricultural.enabled ? agricultural.grossIncome : 0;

  const otherIncomeTotal = otherIncome.enabled
    ? otherIncome.bankInterest +
      otherIncome.dividends +
      otherIncome.remittance +
      otherIncome.otherSources
    : 0;

  const investmentTotal = investment.enabled
    ? investment.lifeInsurance +
      investment.depositPensionScheme +
      investment.providentFund +
      investment.savingsCertificates +
      investment.stockInvestment +
      investment.donations +
      investment.otherInvestments
    : 0;

  const sections: {
    label: string;
    enabled: boolean;
    step: WizardStep;
    total: number;
    details?: { label: string; value: number }[];
  }[] = [
    {
      label: 'Salary Income',
      enabled: salary.enabled,
      step: 'salary',
      total: salaryTotal,
      details: salary.enabled
        ? [
            { label: 'Basic Salary', value: salary.basicSalary },
            { label: 'House Rent Allowance', value: salary.houseRentAllowance },
            { label: 'Medical Allowance', value: salary.medicalAllowance },
            { label: 'Festival Bonus', value: salary.festivalBonus },
            { label: 'Other Components', value: salary.conveyanceAllowance + salary.otherAllowances + salary.employerProvidentFund + salary.perquisites },
          ].filter((d) => d.value > 0)
        : undefined,
    },
    {
      label: 'Business Income',
      enabled: business.enabled,
      step: 'business',
      total: businessTotal,
      details: business.enabled
        ? [
            { label: 'Gross Receipts', value: business.grossReceipts },
            { label: 'Expenses', value: business.expenses },
            { label: 'Net Profit', value: business.netProfit },
          ]
        : undefined,
    },
    {
      label: 'House Property Income',
      enabled: houseProperty.enabled,
      step: 'house-property',
      total: housePropertyTotal,
      details: houseProperty.enabled
        ? houseProperty.properties.map((p, i) => ({
            label: `Property ${i + 1} (${p.type === 'self_occupied' ? 'Self' : 'Rented'})`,
            value: p.annualRent,
          }))
        : undefined,
    },
    {
      label: 'Capital Gains',
      enabled: capitalGains.enabled,
      step: 'capital-gains',
      total: capitalGainsTotal,
      details: capitalGains.enabled
        ? capitalGains.gains.map((g, i) => ({
            label: `Asset ${i + 1} (${g.assetType})`,
            value: g.gain,
          }))
        : undefined,
    },
    {
      label: 'Agricultural Income',
      enabled: agricultural.enabled,
      step: 'agricultural',
      total: agriculturalTotal,
    },
    {
      label: 'Other Income',
      enabled: otherIncome.enabled,
      step: 'other-income',
      total: otherIncomeTotal,
    },
    {
      label: 'Investment & Rebate',
      enabled: investment.enabled,
      step: 'investment',
      total: investmentTotal,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Review & Calculate
        </h2>
        <p className="text-sm text-muted">
          Review your information before calculating tax. Click Edit to make changes.
        </p>
      </div>

      {/* Personal Info */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Personal Information</h3>
          <button
            type="button"
            onClick={() => navigateToStep('personal-info')}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-muted">Category:</span>{' '}
            <span className="font-medium">{CATEGORY_LABELS[personalInfo.category]}</span>
          </div>
          <div>
            <span className="text-muted">Location:</span>{' '}
            <span className="font-medium">{LOCATION_LABELS[personalInfo.location]}</span>
          </div>
          <div>
            <span className="text-muted">Year:</span>{' '}
            <span className="font-medium">{ASSESSMENT_YEAR_LABELS[personalInfo.assessmentYear]}</span>
          </div>
        </div>
      </div>

      {/* Income Sections */}
      {sections.map((section) => (
        <div key={section.step} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{section.label}</h3>
            <button
              type="button"
              onClick={() => navigateToStep(section.step)}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Edit
            </button>
          </div>
          {section.enabled ? (
            <div>
              {section.details && section.details.length > 0 && (
                <div className="space-y-1 mb-2">
                  {section.details.map((d, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-muted"
                    >
                      <span>{d.label}</span>
                      <span>{formatBDT(d.value)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between text-sm font-medium border-t border-border pt-2">
                <span>Total</span>
                <span className="text-primary">{formatBDT(section.total)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted italic">Not applicable</p>
          )}
        </div>
      ))}

      {/* Tax Already Paid */}
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Tax Already Paid</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              TDS on Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={taxPaid.tdsOnSalary || ''}
                onChange={(e) =>
                  updateFormData('taxPaid', {
                    tdsOnSalary: parseFloat(e.target.value) || 0,
                  })
                }
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              TDS on Other Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={taxPaid.tdsOnOther || ''}
                onChange={(e) =>
                  updateFormData('taxPaid', {
                    tdsOnOther: parseFloat(e.target.value) || 0,
                  })
                }
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Advance Tax Paid
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                ৳
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={taxPaid.advanceTax || ''}
                onChange={(e) =>
                  updateFormData('taxPaid', {
                    advanceTax: parseFloat(e.target.value) || 0,
                  })
                }
                min={0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          type="button"
          onClick={prevStep}
          className="border border-border hover:bg-gray-50 text-foreground px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-primary/20"
        >
          Calculate Tax
        </button>
      </div>
    </div>
  );
}
