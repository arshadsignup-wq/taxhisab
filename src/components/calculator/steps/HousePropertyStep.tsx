'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { HouseProperty, PropertyType } from '@/types/tax';

const PROPERTY_TYPES: PropertyType[] = ['self_occupied', 'let_out'];

const LET_OUT_FIELD_KEYS: (keyof HouseProperty)[] = [
  'annualRent',
  'municipalTax',
  'insurancePremium',
  'vacancyAllowance',
  'loanInterest',
];

export default function HousePropertyStep() {
  const t = useTranslation();
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
          {t.calculator.houseProperty.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.houseProperty.subtitle}
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.houseProperty.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.houseProperty.infoText}
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
                {t.calculator.houseProperty.propertyLabel} {index + 1}
              </h3>
              {houseProperty.properties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="text-sm text-error hover:text-error/80 font-medium transition-colors"
                >
                  {t.calculator.houseProperty.removeProperty}
                </button>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                {t.calculator.houseProperty.fields.description.label}
              </label>
              <p className="text-xs text-ink-muted mb-1">{t.calculator.houseProperty.fields.description.hint}</p>
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
                {t.calculator.houseProperty.typeLabel}
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
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t.calculator.houseProperty.typeOptions[type]}
                  </option>
                ))}
              </select>
            </div>

            {property.type === 'let_out' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LET_OUT_FIELD_KEYS.map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-ink mb-1">
                      {t.calculator.houseProperty.fields[key].label}
                    </label>
                    <p className="text-xs text-ink-muted mb-1">{t.calculator.houseProperty.fields[key].hint}</p>
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
          {t.calculator.houseProperty.addProperty}
        </button>
      </div>

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
