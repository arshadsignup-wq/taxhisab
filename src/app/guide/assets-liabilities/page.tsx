import type { Metadata } from 'next';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'Assets & Liabilities Statement (IT-10B)',
};

export default function AssetsLiabilitiesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Do You Need to File IT-10B?
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        The IT-10B is a one-page summary of everything you own and everything
        you owe. Not everyone needs to submit it. Check the conditions below
        to see if it applies to you.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          When Is IT-10B Required?
        </h2>
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="mb-3">
            You must submit the IT-10B statement if <strong>any</strong> of
            the following conditions apply:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Your <strong>gross wealth</strong> (total assets before
              liabilities) exceeds <strong>BDT 40 lakh</strong>
            </li>
            <li>
              You own a <strong>motor vehicle</strong> (car, jeep, microbus, or
              similar)
            </li>
            <li>
              You have invested in <strong>house property</strong> or apartment
            </li>
            <li>
              You live within a <strong>city corporation</strong> area
            </li>
            <li>
              Your total income exceeds <strong>BDT 4 lakh</strong> during the
              income year
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What to Include in Assets
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <AssetCategory
            title="Immovable Property"
            items={[
              'Land (with location and area)',
              'Buildings and apartments',
              'Non-agricultural property',
            ]}
          />
          <AssetCategory
            title="Investments"
            items={[
              'Savings certificates',
              'Fixed deposits',
              'Shares and securities',
              'DPS and insurance policies',
              'Mutual fund units',
            ]}
          />
          <AssetCategory
            title="Motor Vehicles"
            items={[
              'Cars, jeeps, microbuses',
              'Motorcycles',
              'Details: make, model, year, registration',
            ]}
          />
          <AssetCategory
            title="Other Assets"
            items={[
              'Cash in hand and bank balances',
              'Gold and jewelry',
              'Furniture and electronics',
              'Loans given to others',
              'Business assets',
            ]}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Liabilities Section
        </h2>
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="mb-3">
            List all outstanding liabilities as of June 30 of the income year:
          </p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Mortgage loans on property</li>
            <li>Personal loans from banks or financial institutions</li>
            <li>Car loans</li>
            <li>Credit card outstanding balance</li>
            <li>Loans from relatives or other individuals</li>
            <li>Any other outstanding debts</li>
          </ul>
          <p className="mt-3 text-sm text-muted">
            <strong>Net Wealth</strong> = Total Assets - Total Liabilities. If
            your net wealth exceeds BDT 4 crore, a surcharge applies on your
            income tax.
          </p>
        </div>
      </section>

      <InfoCallout variant="tip" title="Tips for Accurate Reporting">
        <p>
          Report assets at their original cost of acquisition (not current
          market value). For inherited property, use the value at which it was
          received. Maintain a consistent record year over year. The tax
          authority compares your IT-10B across years to detect discrepancies.
        </p>
      </InfoCallout>

      <InfoCallout variant="warning" title="Source of Funds">
        <p>
          For any new asset acquired during the income year, you must be able
          to explain the source of funds. If the acquisition value cannot be
          justified by your declared income, the tax authority may treat it as
          unexplained income.
        </p>
      </InfoCallout>

      <GuideNavigation
        prevHref="/guide/deductions-rebate"
        prevLabel="Deductions & Rebate"
        nextHref="/guide/submission"
        nextLabel="Submission"
      />
    </div>
  );
}

function AssetCategory({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
