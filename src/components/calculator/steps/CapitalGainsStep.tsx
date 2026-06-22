'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { CapitalGain, CapitalAssetType } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const ASSET_TYPE_LABELS: Record<CapitalAssetType, string> = {
  property: 'Property / Real Estate',
  shares: 'Shares / Securities',
  other: 'Other Assets',
};

export default function CapitalGainsStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const capitalGains = formData.capitalGains;

  const toggleEnabled = () => {
    updateFormData('capitalGains', { enabled: !capitalGains.enabled });
  };

  const updateGain = (
    index: number,
    field: keyof CapitalGain,
    value: number | CapitalAssetType
  ) => {
    const updated = [...capitalGains.gains];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-calculate gain
    if (field === 'salePrice' || field === 'costOfAcquisition') {
      const salePrice =
        field === 'salePrice' ? (value as number) : updated[index].salePrice;
      const cost =
        field === 'costOfAcquisition'
          ? (value as number)
          : updated[index].costOfAcquisition;
      updated[index].gain = salePrice - cost;
    }

    updateFormData('capitalGains', { gains: updated });
  };

  const addGain = () => {
    const newGain: CapitalGain = {
      assetType: 'property',
      salePrice: 0,
      costOfAcquisition: 0,
      gain: 0,
    };
    updateFormData('capitalGains', {
      gains: [...capitalGains.gains, newGain],
    });
  };

  const removeGain = (index: number) => {
    const updated = capitalGains.gains.filter((_, i) => i !== index);
    updateFormData('capitalGains', {
      gains: updated.length > 0
        ? updated
        : [{ assetType: 'property' as CapitalAssetType, salePrice: 0, costOfAcquisition: 0, gain: 0 }],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Capital Gains
        </h2>
        <p className="text-sm text-muted">
          Enter details of capital assets sold during the income year.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            capitalGains.enabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          onClick={toggleEnabled}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              capitalGains.enabled ? 'translate-x-5' : ''
            }`}
          />
        </div>
        <span className="font-medium">I have capital gains</span>
      </label>

      {!capitalGains.enabled ? (
        <div className="bg-gray-50 border border-border rounded-lg p-6 text-center">
          <p className="text-muted">
            No capital gains &mdash; click Next to continue.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {capitalGains.gains.map((gain, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Asset {index + 1}
                </h3>
                {capitalGains.gains.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGain(index)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Asset Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Asset Type
                </label>
                <select
                  value={gain.assetType}
                  onChange={(e) =>
                    updateGain(
                      index,
                      'assetType',
                      e.target.value as CapitalAssetType
                    )
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  {(
                    Object.keys(ASSET_TYPE_LABELS) as CapitalAssetType[]
                  ).map((type) => (
                    <option key={type} value={type}>
                      {ASSET_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sale Price */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      ৳
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={gain.salePrice || ''}
                      onChange={(e) =>
                        updateGain(
                          index,
                          'salePrice',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>

                {/* Cost of Acquisition */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cost of Acquisition
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      ৳
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={gain.costOfAcquisition || ''}
                      onChange={(e) =>
                        updateGain(
                          index,
                          'costOfAcquisition',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Gain (auto-calculated) */}
              <div className="bg-gray-50 border border-border rounded-lg p-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Capital Gain:</span>{' '}
                  <span
                    className={`font-bold ${
                      gain.gain >= 0 ? 'text-primary' : 'text-red-600'
                    }`}
                  >
                    {formatBDT(gain.gain)}
                  </span>
                </p>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addGain}
            className="w-full border-2 border-dashed border-border hover:border-primary text-muted hover:text-primary py-3 rounded-lg font-medium transition-colors"
          >
            + Add Another Asset
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
