'use client';

import { useCalculatorStore } from '@/store/calculator-store';

export default function PersonalInfoStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const pi = formData.personalInfo;

  const updateField = (field: keyof typeof pi, value: string) => {
    updateFormData('personalInfo', { [field]: value });
  };

  const textFields: { key: keyof typeof pi; label: string; placeholder: string; hint: string }[] = [
    { key: 'name', label: 'Full Name', placeholder: 'As per NID', hint: 'Enter your full name exactly as it appears on your National ID card.' },
    { key: 'tin', label: 'TIN (Taxpayer ID Number)', placeholder: '12-digit TIN', hint: 'Your 12-digit Taxpayer Identification Number. Find it on your TIN certificate.' },
    { key: 'nid', label: 'National ID Number', placeholder: 'NID or Passport No.', hint: 'Your National ID (NID) number or Smart Card number. You can also use your passport number.' },
    { key: 'circle', label: 'Tax Circle', placeholder: 'e.g., Circle-301', hint: 'Your assigned tax circle (e.g., Circle-301). This is printed on your TIN certificate.' },
    { key: 'zone', label: 'Taxes Zone', placeholder: 'e.g., Dhaka-6', hint: 'Your assigned taxes zone (e.g., Dhaka-6). This is printed on your TIN certificate.' },
    { key: 'employerName', label: 'Employer / Business Name', placeholder: 'Name and address', hint: 'Name and address of your employer or business. Leave blank if not applicable.' },
    { key: 'spouseName', label: 'Spouse Name', placeholder: 'If applicable', hint: 'Enter your spouse\'s name if married. Leave blank if not applicable.' },
    { key: 'spouseTin', label: 'Spouse TIN', placeholder: 'If spouse is a taxpayer', hint: 'Your spouse\'s 12-digit TIN, if they are also a taxpayer. This helps NBR cross-verify.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-ink-muted">
          IT-11GA Part 1 &mdash; These fields are optional for calculation but
          will appear on your printed result for easy portal transfer.
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
        {textFields.map(({ key, label, placeholder, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {label}
            </label>
            <p className="text-xs text-ink-muted mb-1">{hint}</p>
            <input
              type="text"
              className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
              value={(pi[key] as string) || ''}
              onChange={(e) => updateField(key, e.target.value)}
              placeholder={placeholder}
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
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
