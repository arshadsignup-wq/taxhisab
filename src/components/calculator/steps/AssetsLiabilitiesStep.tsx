'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { useTranslation } from '@/i18n';
import type { AssetsLiabilities } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const ASSET_FIELD_KEYS: (keyof AssetsLiabilities)[] = [
  'businessCapital',
  'directorsShares',
  'nonAgriculturalProperty',
  'agriculturalProperty',
  'investmentsAssets',
  'motorVehicles',
  'jewellery',
  'furnitureElectronics',
  'cashAndBankBalance',
  'assetsOutsideBangladesh',
  'otherAssets',
];

const LIABILITY_FIELD_KEYS: (keyof AssetsLiabilities)[] = [
  'mortgageLoans',
  'unsecuredLoans',
  'bankLoans',
  'otherLiabilities',
];

export default function AssetsLiabilitiesStep() {
  const t = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const al = formData.assetsLiabilities;

  const updateField = (key: keyof AssetsLiabilities, value: number) => {
    updateFormData('assetsLiabilities', { [key]: value });
  };

  const totalAssets = ASSET_FIELD_KEYS.reduce(
    (sum, key) => sum + (al[key] || 0),
    0
  );
  const totalLiabilities = LIABILITY_FIELD_KEYS.reduce(
    (sum, key) => sum + (al[key] || 0),
    0
  );
  const netWealth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          {t.calculator.assetsLiabilities.title}
        </h2>
        <p className="text-sm text-ink-muted">
          {t.calculator.assetsLiabilities.subtitle}
        </p>
      </div>

      <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">{t.calculator.assetsLiabilities.infoTitle}</p>
        <p className="text-xs text-ink-muted">
          {t.calculator.assetsLiabilities.infoText}
        </p>
      </div>

      {/* Assets */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">
          {t.calculator.assetsLiabilities.assetsTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ASSET_FIELD_KEYS.map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">
                {t.calculator.assetsLiabilities.fields[key].label}
              </label>
              <p className="text-xs text-ink-muted mb-1">{t.calculator.assetsLiabilities.fields[key].hint}</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                  value={(al[key] as number) || ''}
                  onChange={(e) =>
                    updateField(key, parseFloat(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Number of Motor Vehicles */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          {t.calculator.assetsLiabilities.fields.motorVehicleCount.label}
        </label>
        <p className="text-xs text-ink-muted mb-1">
          {t.calculator.assetsLiabilities.fields.motorVehicleCount.hint}
        </p>
        <input
          type="number"
          className="w-32 px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
          value={al.motorVehicleCount || ''}
          onChange={(e) =>
            updateField('motorVehicleCount', parseInt(e.target.value) || 0)
          }
          min={0}
        />
      </div>

      {/* Liabilities */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">
          {t.calculator.assetsLiabilities.liabilitiesTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LIABILITY_FIELD_KEYS.map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">
                {t.calculator.assetsLiabilities.fields[key].label}
              </label>
              <p className="text-xs text-ink-muted mb-1">{t.calculator.assetsLiabilities.fields[key].hint}</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                  ৳
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                  value={(al[key] as number) || ''}
                  onChange={(e) =>
                    updateField(key, parseFloat(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Expenses */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          {t.calculator.assetsLiabilities.fields.familyExpenses.label}
        </label>
        <p className="text-xs text-ink-muted mb-1">{t.calculator.assetsLiabilities.fields.familyExpenses.hint}</p>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
            ৳
          </span>
          <input
            type="number"
            className="w-full pl-8 pr-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
            value={al.familyExpenses || ''}
            onChange={(e) =>
              updateField('familyExpenses', parseFloat(e.target.value) || 0)
            }
            min={0}
          />
        </div>
      </div>

      {/* Net Wealth Summary */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">{t.calculator.assetsLiabilities.totalAssets}</span>
          <span className="font-medium">{formatBDT(totalAssets)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">{t.calculator.assetsLiabilities.totalLiabilities}</span>
          <span className="font-medium">-{formatBDT(totalLiabilities)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-primary/20 pt-2">
          <span>{t.calculator.assetsLiabilities.netWealth}</span>
          <span className={netWealth >= 40000000 ? 'text-error' : 'text-primary'}>
            {formatBDT(netWealth)}
          </span>
        </div>
        {netWealth >= 40000000 && (
          <p className="text-xs text-error mt-1">
            Net wealth exceeds BDT 4 crore. Surcharge will apply.
          </p>
        )}
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
