'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { HouseProperty, PropertyType } from '@/types/tax';

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  self_occupied: 'Self-Occupied',
  let_out: 'Let Out (Rented)',
};

export default function HousePropertyStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const houseProperty = formData.houseProperty;

  const updateProperty = (
    index: number,
    field: keyof HouseProperty,
    value: string | number | PropertyType
  ) => {
    const updated = [...houseProperty.properties];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('houseProperty', { properties: updated });
  };

  const addProperty = () => {
    const newProperty: HouseProperty = {
      description: '',
      type: 'let_out',
      annualRent: 0,
      municipalTax: 0,
      repairDeduction: 0,
      insurancePremium: 0,
      vacancyAllowance: 0,
      loanInterest: 0,
    };
    updateFormData('houseProperty', {
      properties: [...houseProperty.properties, newProperty],
    });
  };

  const removeProperty = (index: number) => {
    const updated = houseProperty.properties.filter((_, i) => i !== index);
    updateFormData('houseProperty', {
      properties:
        updated.length > 0
          ? updated
          : [
              {
                description: '',
                type: 'let_out' as PropertyType,
                annualRent: 0,
                municipalTax: 0,
                repairDeduction: 0,
                insurancePremium: 0,
                vacancyAllowance: 0,
                loanInterest: 0,
              },
            ],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          House Property Income
        </h2>
        <p className="text-sm text-ink-muted">
          Schedule 24B &mdash; If you receive rent from property you own, or own a self-occupied home, enter the details here. Each property should be entered separately.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">How deductions work</p>
        <p className="text-xs text-ink-muted">
          For let-out property, NBR allows a standard repair deduction of 25% of annual value, plus actual municipal tax, insurance premium, and loan interest. For self-occupied property, only loan interest (max BDT 2,00,000) is deductible.
        </p>
      </div>

      <div className="space-y-6">
        {houseProperty.properties.map((property, index) => (
          <div
            key={index}
            className="border border-rule rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">
                Property {index + 1}
              </h3>
              {houseProperty.properties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="text-sm text-error hover:text-error/80 font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Property Description
              </label>
              <p className="text-xs text-ink-muted mb-1">A short description to identify this property, e.g., &quot;Flat at Dhanmondi&quot; or &quot;2nd Floor, Mirpur.&quot;</p>
              <input
                type="text"
                placeholder="e.g., Flat at Dhanmondi"
                className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                value={property.description}
                onChange={(e) =>
                  updateProperty(index, 'description', e.target.value)
                }
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Property Type
              </label>
              <p className="text-xs text-ink-muted mb-1">Self-Occupied: a home you live in (no rental income). Let Out: a property you rent to others.</p>
              <select
                value={property.type}
                onChange={(e) =>
                  updateProperty(
                    index,
                    'type',
                    e.target.value as PropertyType
                  )
                }
                className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta bg-white"
              >
                {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map(
                  (type) => (
                    <option key={type} value={type}>
                      {PROPERTY_TYPE_LABELS[type]}
                    </option>
                  )
                )}
              </select>
            </div>

            {property.type === 'let_out' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  ['annualRent', 'Annual Rent / Value', 'Total rent received (or receivable) during the income year for this property.'],
                  ['municipalTax', 'Municipal Tax Paid', 'City corporation / municipality holding tax or property tax paid during the year.'],
                  ['insurancePremium', 'Insurance Premium', 'Fire or property insurance premium paid for this property, if any.'],
                  ['vacancyAllowance', 'Vacancy Allowance', 'Deduction for period the property was vacant and no rent was received.'],
                  ['loanInterest', 'Home Loan Interest', 'Interest paid on loan taken to purchase or construct this property.'],
                ] as [keyof HouseProperty, string, string][]).map(([key, label, hint]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-ink mb-1">
                      {label}
                    </label>
                    <p className="text-xs text-ink-muted mb-1">{hint}</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                        ৳
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                        value={(property[key] as number) || ''}
                        onChange={(e) =>
                          updateProperty(
                            index,
                            key,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min={0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addProperty}
          className="w-full border-2 border-dashed border-rule hover:border-primary text-ink-muted hover:text-primary py-3 rounded-lg font-medium transition-colors"
        >
          + Add Another Property
        </button>
      </div>

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
