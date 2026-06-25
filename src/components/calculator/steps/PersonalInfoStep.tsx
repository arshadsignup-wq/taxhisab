'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';

const FIELD_KEYS = ['name', 'tin', 'nid', 'circle', 'zone', 'employerName', 'spouseName', 'spouseTin'] as const;

export default function PersonalInfoStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const pi = formData.personalInfo;

  const updateField = (field: keyof typeof pi, value: string) => {
    updateFormData('personalInfo', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.personalInfo.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.personalInfo.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">How to find your Tax Zone, Tax Circle, and TIN</p>
        <p className="text-xs text-ink-muted">
          All three are printed on your TIN certificate. You can download your TIN certificate by logging into{' '}
          <a href="https://secure.incometax.gov.bd" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-dark">
            secure.incometax.gov.bd
          </a>. If you don&apos;t have a TIN yet, you can register for one on the same website.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELD_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {t.calculator.personalInfo.fields[key].label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{t.calculator.personalInfo.fields[key].hint}</p>
            <input
              type="text"
              className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
              value={(pi[key] as string) || ''}
              onChange={(e) => updateField(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-ink-muted">
        All fields on this page are optional. They do not affect your tax
        calculation but will be printed on your result page for reference when
        filling the e-Return portal.
      </p>

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
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.next}
        </button>
      </div>
    </div>
  );
}
