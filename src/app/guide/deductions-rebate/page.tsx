import type { Metadata } from 'next';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'Deductions & Investment Rebate',
};

export default function DeductionsRebatePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Cut Your Tax Bill with Investment Rebates
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        Bangladesh gives you a 15% tax rebate on qualifying investments: DPS,
        insurance, provident fund, and more. Here is how to calculate your
        rebate and which investments count.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          How the Rebate Works
        </h2>
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="mb-4">
            Bangladesh offers a <strong>15% tax rebate</strong> on eligible
            investments. The rebate is calculated as follows:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Add up all your eligible investments</li>
            <li>
              Determine the <strong>admissible amount</strong>, which is the lowest of:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Your total eligible investments</li>
                <li>20% of your total taxable income</li>
                <li>BDT 10,00,000 (ten lakh)</li>
              </ul>
            </li>
            <li>
              Your rebate = <strong>15% of the admissible amount</strong>
            </li>
          </ol>
          <div className="bg-primary-light rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Example:</p>
            <p className="text-sm text-muted">
              If your taxable income is BDT 8,00,000 and total investment is BDT
              2,50,000:
              <br />
              Admissible = min(2,50,000, 20% of 8,00,000 = 1,60,000, 10,00,000)
              = <strong>BDT 1,60,000</strong>
              <br />
              Rebate = 15% of 1,60,000 = <strong>BDT 24,000</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Eligible Investments
        </h2>
        <div className="space-y-4">
          <InvestmentItem
            title="Life Insurance Premium"
            description="Premium paid for life insurance policies. The admissible amount is limited to 10% of the policy value or the actual premium paid, whichever is lower."
          />
          <InvestmentItem
            title="Deposit Pension Scheme (DPS)"
            description="Monthly installments paid to bank DPS accounts. The full amount deposited during the income year qualifies."
          />
          <InvestmentItem
            title="Provident Fund Contribution"
            description="Your own contribution to an employer-managed provident fund (GPF, CPF, or approved private PF)."
          />
          <InvestmentItem
            title="National Savings Certificates"
            description="Investments in Sanchayapatra or other government savings instruments. The amount invested during the income year qualifies."
          />
          <InvestmentItem
            title="Stock Market Investment"
            description="Investment in shares of listed companies on the Dhaka or Chattogram stock exchanges. Only the net purchase amount during the year counts."
          />
          <InvestmentItem
            title="Donations"
            description="Donations to government-approved charitable institutions, national-level funds, or educational institutions. Ensure the institution has tax-exempt status."
          />
          <InvestmentItem
            title="Other Eligible Investments"
            description="Includes contributions to benevolent funds, zakat funds, mutual funds, debentures, and other approved investment instruments."
          />
        </div>
      </section>

      <InfoCallout variant="warning" title="Keep Your Receipts">
        <p>
          Always maintain receipts, certificates, and bank statements as proof
          of your investments. The tax authority may require documentation
          during assessment. Without proof, your claimed rebate may be
          disallowed.
        </p>
      </InfoCallout>

      <InfoCallout variant="tip" title="Maximize Your Rebate">
        <p>
          To maximize your tax savings, try to invest at least 20% of your
          taxable income in eligible instruments. But remember, the cap is BDT
          10 lakh. Investments beyond that amount will not provide additional
          rebate.
        </p>
      </InfoCallout>

      <GuideNavigation
        prevHref="/guide/income-entry"
        prevLabel="Income Entry"
        nextHref="/guide/assets-liabilities"
        nextLabel="Assets & Liabilities"
      />
    </div>
  );
}

function InvestmentItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}
