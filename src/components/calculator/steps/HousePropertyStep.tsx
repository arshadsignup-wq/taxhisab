'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { HouseProperty, PropertyType } from '@/types/tax';

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  self_occupied: 'Self-Occupied',
  let_out: 'Let Out (Rented)',
};

export default function HousePropertyStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const houseProperty = formData.houseProperty;

  const toggleEnabled = () => {
    updateFormData('houseProperty', { enabled: !houseProperty.enabled });
  };

  const updateProperty = (
    index: number,
    field: keyof HouseProperty,
    value: number | PropertyType
  ) => {
    const updated = [...houseProperty.properties];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('houseProperty', { properties: updated });
  };

  const addProperty = () => {
    const newProperty: HouseProperty = {
      type: 'let_out',
      annualRent: 0,
      municipalTax: 0,
      repairDeduction: 0,
      loanInterest: 0,
    };
    updateFormData('houseProperty', {
      properties: [...houseProperty.properties, newProperty],
    });
  };

  const removeProperty = (index: number) => {
    const updated = houseProperty.properties.filter((_, i) => i !== index);
    updateFormData('houseProperty', {
      properties: updated.length > 0 ? updated : [{ type: 'let_out', annualRent: 0, municipalTax: 0, repairDeduction: 0, loanInterest: 0 }],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          House Property Income
        </h2>
        <p className="text-sm text-muted">
          Enter income from house property. You can add multiple properties.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            houseProperty.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={toggleEnabled}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              houseProperty.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">I have house property income</span>
      </label>

      {!houseProperty.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No house property income &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {houseProperty.properties.map((property, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Property {index + 1}
                </h3>
                {houseProperty.properties.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Property Type
                </label>
                <select
                  value={property.type}
                  onChange={(e) =>
                    updateProperty(
                      index,
                      'type',
                      e.target.value as PropertyType
                    )
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Annual Rent */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Annual Rent / Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      ৳
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={property.annualRent || ''}
                      onChange={(e) =>
                        updateProperty(
                          index,
                          'annualRent',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>

                {/* Municipal Tax */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Municipal Tax Paid
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      ৳
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={property.municipalTax || ''}
                      onChange={(e) =>
                        updateProperty(
                          index,
                          'municipalTax',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>

                {/* Loan Interest */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Home Loan Interest
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      ৳
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={property.loanInterest || ''}
                      onChange={(e) =>
                        updateProperty(
                          index,
                          'loanInterest',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProperty}
            className="w-full border-2 border-dashed border-border hover:border-primary text-muted hover:text-primary py-3 rounded-lg font-medium transition-colors"
          >
            + Add Another Property
          </button>
        </div>
      )}

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
          onClick={nextStep}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
