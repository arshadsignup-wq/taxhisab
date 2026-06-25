'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { IncomeSection, TaxpayerCategory, LocationType, AssessmentYear } from '@/types/tax';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import { getTaxFreeThresholds } from '@/lib/tax-engine/constants';
import { formatBDT } from '@/lib/formatters';

const INCOME_SECTION_KEYS: IncomeSection[] = [
  'salary',
  'business',
  'house-property',
  'capital-gains',
  'agricultural',
  'financial-assets',
  'other-income',
  'tax-exempted',
  'investment',
  'assets-liabilities',
];

export default function ProfileStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep } = useCalculatorStore();
  const { profile, personalInfo } = formData;
  const { category, location, assessmentYear } = personalInfo;

  const taxFreeThreshold = getTaxFreeThresholds(assessmentYear)[category];

  const CATEGORIES = Object.keys(t.labels.categories) as TaxpayerCategory[];
  const LOCATIONS = Object.keys(t.labels.locations) as LocationType[];
  const ASSESSMENT_YEARS = Object.keys(t.labels.assessmentYears) as AssessmentYear[];

  const INCOME_OPTIONS = INCOME_SECTION_KEYS.map((key) => ({
    key,
    label: t.calculator.profile.incomeOptions[key].label,
    description: t.calculator.profile.incomeOptions[key].description,
  }));

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
          {t.calculator.profile.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.profile.subtitle}
        </p>
      </div>

      {/* Taxpayer Category */}
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-1">
          {t.calculator.profile.categoryLabel}
        </legend>
        <p className="text-xs text-ink-muted mb-3">
          {t.calculator.profile.categoryHint}
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
                {t.labels.categories[cat]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-1">
          {t.calculator.profile.locationLabel}
        </legend>
        <p className="text-xs text-ink-muted mb-3">
          {t.calculator.profile.locationHint}
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
                {t.labels.locations[loc]}
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
          {t.calculator.profile.assessmentYearLabel}
        </label>
        <p className="text-xs text-ink-muted mb-1">
          {t.calculator.profile.assessmentYearHint}
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
              {t.labels.assessmentYears[year]}
            </option>
          ))}
        </select>
      </div>

      {/* Tax-Free Threshold Info */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-ink">
          <span className="font-medium">{t.calculator.profile.taxFreeThresholdLabel}</span>{' '}
          <span className="text-primary font-bold text-lg">
            {formatBDT(taxFreeThreshold)}
          </span>
        </p>
        <p className="text-xs text-ink-muted mt-1">
          {t.calculator.profile.taxFreeThresholdHint}{' '}
          {t.labels.categories[category].toLowerCase()} category.
        </p>
      </div>

      {/* Income Type Selection */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">
          {t.calculator.profile.incomeTypesLabel}
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
          {t.common.next}
        </button>
      </div>
    </div>
  );
}
