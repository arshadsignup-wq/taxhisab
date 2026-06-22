'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import {
  TaxpayerCategory,
  LocationType,
  AssessmentYear,
} from '@/types/tax';
import {
  CATEGORY_LABELS,
  LOCATION_LABELS,
  ASSESSMENT_YEAR_LABELS,
  getTaxFreeThresholds,
} from '@/lib/tax-engine/constants';
import { formatBDT } from '@/lib/formatters';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as TaxpayerCategory[];
const LOCATIONS = Object.keys(LOCATION_LABELS) as LocationType[];
const ASSESSMENT_YEARS = Object.keys(ASSESSMENT_YEAR_LABELS) as AssessmentYear[];

export default function PersonalInfoStep() {
  const { formData, updateFormData, nextStep } = useCalculatorStore();
  const { category, location, assessmentYear } = formData.personalInfo;

  const taxFreeThreshold = getTaxFreeThresholds(assessmentYear)[category];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-muted">
          Select your taxpayer category, location, and assessment year.
        </p>
      </div>

      {/* Taxpayer Category */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          Taxpayer Category
        </legend>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() =>
                  updateFormData('personalInfo', { category: cat })
                }
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">
                {CATEGORY_LABELS[cat]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          Location
        </legend>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                name="location"
                value={loc}
                checked={location === loc}
                onChange={() =>
                  updateFormData('personalInfo', { location: loc })
                }
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">
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
          className="block text-sm font-medium text-foreground mb-1"
        >
          Assessment Year
        </label>
        <select
          id="assessmentYear"
          value={assessmentYear}
          onChange={(e) =>
            updateFormData('personalInfo', {
              assessmentYear: e.target.value as AssessmentYear,
            })
          }
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          {ASSESSMENT_YEARS.map((year) => (
            <option key={year} value={year}>
              {ASSESSMENT_YEAR_LABELS[year]}
            </option>
          ))}
        </select>
      </div>

      {/* Tax-Free Threshold Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          <span className="font-medium">Tax-free threshold:</span>{' '}
          <span className="text-primary font-bold text-lg">
            {formatBDT(taxFreeThreshold)}
          </span>
        </p>
        <p className="text-xs text-muted mt-1">
          Income up to this amount is exempt from tax for the{' '}
          {CATEGORY_LABELS[category].toLowerCase()} category.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4 border-t border-border">
        <button
          type="button"
          onClick={nextStep}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
