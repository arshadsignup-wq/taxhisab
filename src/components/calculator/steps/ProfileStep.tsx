'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { IncomeSection, TaxpayerCategory, LocationType, AssessmentYear } from '@/types/tax';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import {
  CATEGORY_LABELS,
  LOCATION_LABELS,
  ASSESSMENT_YEAR_LABELS,
  getTaxFreeThresholds,
} from '@/lib/tax-engine/constants';
import { formatBDT } from '@/lib/formatters';

const INCOME_OPTIONS: { key: IncomeSection; label: string; description: string }[] = [
  { key: 'salary', label: 'Salary / Employment', description: 'If you receive a salary, wages, or bonuses from an employer. This maps to Schedule 24A of the IT-11GA form.' },
  { key: 'business', label: 'Business / Profession', description: 'If you earn from your own business, trade, profession, or freelancing. This maps to Schedule 24C.' },
  { key: 'house-property', label: 'House Property / Rent', description: 'If you receive rent from a property you own, or own a self-occupied home with a mortgage. Maps to Schedule 24B.' },
  { key: 'capital-gains', label: 'Capital Gains', description: 'If you sold land, buildings, shares, or other assets at a profit during the income year.' },
  { key: 'agricultural', label: 'Agricultural Income', description: 'If you earn from farming, fisheries, poultry, dairy, or selling agricultural produce from your own land.' },
  { key: 'financial-assets', label: 'Financial Assets', description: 'If you earn bank interest, FDR profits, savings certificate (Sanchayapatra) interest, or share dividends.' },
  { key: 'other-income', label: 'Other Income', description: 'Any other income like foreign remittance, royalty, lottery winnings, or gifts above the exemption limit.' },
  { key: 'tax-exempted', label: 'Tax-Exempted Income', description: 'Income that is legally exempt from tax (e.g., exempt agricultural income, exempt dividends up to BDT 50,000).' },
  { key: 'investment', label: 'Investments (Tax Rebate)', description: 'If you invested in life insurance, DPS, provident fund, savings certificates, or stocks — you get a 15% tax rebate. Maps to Schedule 24D.' },
  { key: 'assets-liabilities', label: 'Assets & Liabilities (IT-10B)', description: 'A mandatory statement of what you own, owe, and spend. NBR uses this to check if your income supports your lifestyle.' },
];

const CATEGORIES = Object.keys(CATEGORY_LABELS) as TaxpayerCategory[];
const LOCATIONS = Object.keys(LOCATION_LABELS) as LocationType[];
const ASSESSMENT_YEARS = Object.keys(ASSESSMENT_YEAR_LABELS) as AssessmentYear[];

export default function ProfileStep() {
  const { formData, updateFormData, nextStep } = useCalculatorStore();
  const { profile, personalInfo } = formData;
  const { category, location, assessmentYear } = personalInfo;

  const taxFreeThreshold = getTaxFreeThresholds(assessmentYear)[category];

  const handleSectionToggle = (key: string, checked: boolean) => {
    updateFormData('profile', {
      enabledSections: {
        ...profile.enabledSections,
        [key]: checked,
      },
    });
  };

  const hasAnySelection = Object.values(profile.enabledSections).some(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Tax Return Profile
        </h2>
        <p className="text-sm text-ink-muted">
          Select your taxpayer details and the income types that apply to you.
          Only the relevant steps will appear. This information determines your tax-free threshold and minimum tax amount.
        </p>
      </div>

      {/* Taxpayer Category */}
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-1">
          Taxpayer Category
        </legend>
        <p className="text-xs text-ink-muted mb-3">
          Your category determines the tax-free income threshold. Most people should select &quot;Normal Individual.&quot; Women and senior citizens (65+) get a higher tax-free limit (BDT 4,00,000). Freedom fighters and disabled persons get the highest limit (BDT 5,00,000).
        </p>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 p-3 border border-rule rounded-lg cursor-pointer hover:bg-surface-sunken transition-colors has-[:checked]:border-cta has-[:checked]:bg-cta-light"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() =>
                  updateFormData('personalInfo', { category: cat })
                }
                className="w-4 h-4 text-cta focus:ring-cta"
              />
              <span className="text-sm font-medium text-ink">
                {CATEGORY_LABELS[cat]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-1">
          Location
        </legend>
        <p className="text-xs text-ink-muted mb-3">
          Where you live affects your minimum tax. Dhaka / Chittagong city corporation area: BDT 5,000. Other city corporation area: BDT 4,000. Elsewhere in Bangladesh: BDT 3,000.
        </p>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-3 p-3 border border-rule rounded-lg cursor-pointer hover:bg-surface-sunken transition-colors has-[:checked]:border-cta has-[:checked]:bg-cta-light"
            >
              <input
                type="radio"
                name="location"
                value={loc}
                checked={location === loc}
                onChange={() =>
                  updateFormData('personalInfo', { location: loc })
                }
                className="w-4 h-4 text-cta focus:ring-cta"
              />
              <span className="text-sm font-medium text-ink">
                {LOCATION_LABELS[loc]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Assessment Year */}
      <div>
        <label
          htmlFor="assessmentYear"
          className="block text-sm font-medium text-ink mb-1"
        >
          Assessment Year
        </label>
        <p className="text-xs text-ink-muted mb-1">
          The year you file your return. If your income year is July 2024 &ndash; June 2025, your assessment year is 2025-2026. If your income year is July 2025 &ndash; June 2026, your assessment year is 2026-2027.
        </p>
        <select
          id="assessmentYear"
          value={assessmentYear}
          onChange={(e) =>
            updateFormData('personalInfo', {
              assessmentYear: e.target.value as AssessmentYear,
            })
          }
          className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta bg-white"
        >
          {ASSESSMENT_YEARS.map((year) => (
            <option key={year} value={year}>
              {ASSESSMENT_YEAR_LABELS[year]}
            </option>
          ))}
        </select>
      </div>

      {/* Tax-Free Threshold Info */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-ink">
          <span className="font-medium">Tax-free threshold:</span>{' '}
          <span className="text-primary font-bold text-lg">
            {formatBDT(taxFreeThreshold)}
          </span>
        </p>
        <p className="text-xs text-ink-muted mt-1">
          Income up to this amount is exempt from tax for the{' '}
          {CATEGORY_LABELS[category].toLowerCase()} category.
        </p>
      </div>

      {/* Income Type Selection */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">
          What income and sections apply to you?
        </h3>
        <CheckboxGroup
          options={INCOME_OPTIONS}
          selected={profile.enabledSections}
          onChange={handleSectionToggle}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4 border-t border-rule">
        <button
          type="button"
          onClick={nextStep}
          disabled={!hasAnySelection}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:bg-ink-subtle disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
