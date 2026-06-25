'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { AssetsLiabilities } from '@/types/tax';
import { formatBDT } from '@/lib/formatters';

const ASSET_FIELDS: { key: keyof AssetsLiabilities; label: string; hint: string }[] = [
  { key: 'businessCapital', label: 'Business Capital', hint: 'Total capital invested in your business(es) as of June 30. Use your balance sheet if available.' },
  { key: 'directorsShares', label: "Director's Shares in Companies", hint: 'Value of shares you hold as a director in any company (at cost or face value).' },
  { key: 'nonAgriculturalProperty', label: 'Non-Agricultural Property', hint: 'Current market value of all land, flats, buildings you own (excluding agricultural land).' },
  { key: 'agriculturalProperty', label: 'Agricultural Property', hint: 'Current market value of agricultural land you own.' },
  { key: 'investmentsAssets', label: 'Investments (FDR, Savings Certificates, Shares, etc.)', hint: 'Total value of FDRs, savings certificates, shares, bonds, mutual funds, and other investments.' },
  { key: 'motorVehicles', label: 'Motor Vehicles (Value)', hint: 'Current market value of all cars, motorcycles, and other vehicles you own.' },
  { key: 'jewellery', label: 'Gold / Jewellery / Ornaments', hint: 'Estimated value of gold, silver, diamonds, and ornaments owned by you.' },
  { key: 'furnitureElectronics', label: 'Furniture & Electronic Items', hint: 'Estimated value of furniture, appliances, computers, phones, and other electronics.' },
  { key: 'cashAndBankBalance', label: 'Cash & Bank Balance', hint: 'Total cash in hand plus balances in all bank accounts as of June 30.' },
  { key: 'assetsOutsideBangladesh', label: 'Assets Outside Bangladesh', hint: 'Value of any assets (property, bank accounts, investments) held outside Bangladesh.' },
  { key: 'otherAssets', label: 'Other Assets', hint: 'Any other assets not covered above (e.g., receivables, livestock, artwork).' },
];

const LIABILITY_FIELDS: { key: keyof AssetsLiabilities; label: string; hint: string }[] = [
  { key: 'mortgageLoans', label: 'Mortgage / Secured Loans', hint: 'Outstanding balance of home loans, property loans, or other loans secured by assets.' },
  { key: 'unsecuredLoans', label: 'Unsecured Loans', hint: 'Outstanding personal loans, credit card debt, or loans from family/friends.' },
  { key: 'bankLoans', label: 'Bank Loans', hint: 'Outstanding balance of any other bank loans (car loan, education loan, etc.).' },
  { key: 'otherLiabilities', label: 'Other Liabilities', hint: 'Any other amounts you owe (trade payables, pending bills, etc.).' },
];

export default function AssetsLiabilitiesStep() {
  const { formData, updateFormData, nextStep, prevStep } = useCalculatorStore();
  const al = formData.assetsLiabilities;

  const updateField = (key: keyof AssetsLiabilities, value: number) => {
    updateFormData('assetsLiabilities', { [key]: value });
  };

  const totalAssets = ASSET_FIELDS.reduce(
    (sum, { key }) => sum + (al[key] || 0),
    0
  );
  const totalLiabilities = LIABILITY_FIELDS.reduce(
    (sum, { key }) => sum + (al[key] || 0),
    0
  );
  const netWealth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-ink mb-1">
          Assets & Liabilities (IT-10B)
        </h2>
        <p className="text-sm text-ink-muted">
          IT-10B is a mandatory statement of your assets, liabilities, and lifestyle expenses as of June 30 of the income year. NBR uses this to verify if your declared income supports your wealth and spending.
        </p>
      </div>

      <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-ink font-medium mb-1">Why is this needed?</p>
        <p className="text-xs text-ink-muted">
          NBR compares your net wealth increase + expenses with your declared income. If expenses and wealth growth exceed income, it may trigger scrutiny. Fill this honestly using current market values. If your net wealth exceeds BDT 4 crore, a surcharge will apply.
        </p>
      </div>

      {/* Assets */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">
          Assets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ASSET_FIELDS.map(({ key, label, hint }) => (
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
          Number of Motor Vehicles
        </label>
        <p className="text-xs text-ink-muted mb-1">
          How many motor vehicles (car, motorcycle, etc.) do you own? An environmental surcharge of BDT 25,000 applies for each vehicle beyond the first.
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
          Liabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LIABILITY_FIELDS.map(({ key, label, hint }) => (
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
          Annual Family Expenses
        </label>
        <p className="text-xs text-ink-muted mb-1">Your total household spending during the year: food, rent, utilities, education, medical, transport, clothing, and other living costs.</p>
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
          <span className="text-ink-muted">Total Assets</span>
          <span className="font-medium">{formatBDT(totalAssets)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">Total Liabilities</span>
          <span className="font-medium">-{formatBDT(totalLiabilities)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-primary/20 pt-2">
          <span>Net Wealth</span>
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
