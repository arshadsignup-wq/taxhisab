'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { CapitalGain, CapitalAssetType } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const ASSET_TYPE_LABELS: Record<CapitalAssetType, string> = {
  property: 'Property / Real Estate',
  shares: 'Shares / Securities',
  other: 'Other Assets',
};

export default function CapitalGainsStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const capitalGains = formData.capitalGains;

  const updateGain = (
    index: number,
    field: keyof CapitalGain,
    value: number | string | CapitalAssetType
  ) => {
    const updated = [...capitalGains.gains];
    updated[index] = { ...updated[index], [field]: value };

    if (
      field === 'salePrice' ||
      field === 'costOfAcquisition' ||
      field === 'costOfImprovement'
    ) {
      const salePrice =
        field === 'salePrice' ? (value as number) : updated[index].salePrice;
      const cost =
        field === 'costOfAcquisition'
          ? (value as number)
          : updated[index].costOfAcquisition;
      const improvement =
        field === 'costOfImprovement'
          ? (value as number)
          : updated[index].costOfImprovement;
      updated[index].gain = salePrice - cost - improvement;
    }

    updateFormData('capitalGains', { gains: updated });
  };

  const addGain = () => {
    const newGain: CapitalGain = {
      description: '',
      assetType: 'property',
      dateOfTransfer: '',
      salePrice: 0,
      costOfAcquisition: 0,
      costOfImprovement: 0,
      gain: 0,
    };
    updateFormData('capitalGains', {
      gains: [...capitalGains.gains, newGain],
    });
  };

  const removeGain = (index: number) => {
    const updated = capitalGains.gains.filter((_, i) => i !== index);
    updateFormData('capitalGains', {
      gains:
        updated.length > 0
          ? updated
          : [
              {
                description: '',
                assetType: 'property' as CapitalAssetType,
                dateOfTransfer: '',
                salePrice: 0,
                costOfAcquisition: 0,
                costOfImprovement: 0,
                gain: 0,
              },
            ],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Capital Gains
        </h2>
        <p className="text-sm text-ink-muted">
          Profit from selling capital assets like land, buildings, shares, or other valuables during the income year. Each asset sold should be entered separately.
        </p>
      </div>

      <div className="bg-info-light border border-info/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">How capital gains are calculated</p>
        <p className="text-xs text-ink-muted">
          Capital Gain = Sale Price minus Cost of Acquisition minus Cost of Improvement. Gains from transfer of land/building are subject to a flat rate of 15% or the applicable slab rate, whichever is lower.
        </p>
      </div>

      <div className="space-y-6">
        {capitalGains.gains.map((gain, index) => (
          <div
            key={index}
            className="border border-rule rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">
                Asset {index + 1}
              </h3>
              {capitalGains.gains.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGain(index)}
                  className="text-sm text-error hover:text-error/80 font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Description
                </label>
                <p className="text-xs text-ink-muted mb-1">Describe the asset sold, e.g., &quot;Plot at Uttara Sector 10&quot; or &quot;500 shares of BRAC Bank.&quot;</p>
                <input
                  type="text"
                  placeholder="e.g., Plot at Uttara"
                  className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                  value={gain.description}
                  onChange={(e) =>
                    updateGain(index, 'description', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Asset Type
                </label>
                <p className="text-xs text-ink-muted mb-1">Property: land, flat, building. Shares: listed/unlisted company stocks. Other: jewelry, artwork, etc.</p>
                <select
                  value={gain.assetType}
                  onChange={(e) =>
                    updateGain(
                      index,
                      'assetType',
                      e.target.value as CapitalAssetType
                    )
                  }
                  className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta bg-white"
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

              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Date of Transfer
                </label>
                <p className="text-xs text-ink-muted mb-1">The date you sold or transferred the asset.</p>
                <input
                  type="text"
                  placeholder="e.g., 15 Jan 2025"
                  className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                  value={gain.dateOfTransfer}
                  onChange={(e) =>
                    updateGain(index, 'dateOfTransfer', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Sale Price
                </label>
                <p className="text-xs text-ink-muted mb-1">The amount you received (or the fair market value) for selling the asset.</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
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

              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Cost of Acquisition
                </label>
                <p className="text-xs text-ink-muted mb-1">The price you originally paid to buy or acquire the asset.</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
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

              <div>
                <label className="block text-sm font-medium text-ink mb-1">
                  Cost of Improvement
                </label>
                <p className="text-xs text-ink-muted mb-1">Any additional money spent to improve or develop the asset after purchase (renovation, construction, etc.).</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                    ৳
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                    value={gain.costOfImprovement || ''}
                    onChange={(e) =>
                      updateGain(
                        index,
                        'costOfImprovement',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    min={0}
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-sunken border border-rule rounded-lg p-3">
              <p className="text-sm text-ink">
                <span className="font-medium">Capital Gain:</span>{' '}
                <span
                  className={`font-bold ${
                    gain.gain >= 0 ? 'text-primary' : 'text-error'
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
          className="w-full border-2 border-dashed border-rule hover:border-primary text-ink-muted hover:text-primary py-3 rounded-lg font-medium transition-colors"
        >
          + Add Another Asset
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
