import type { Metadata } from 'next';
import StepCard from '@/components/guide/StepCard';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'How to Enter Income in e-Return',
};

export default function IncomeEntryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Entering Your Income: What Goes Where
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        The e-Return form has six income sections. Most people only need one or
        two. Read the sections that apply to your situation and skip the rest.
      </p>

      <StepCard stepNumber={1} title="Salary Income">
        <p className="mb-3">
          If you are a salaried employee, enter your income from employment in
          the salary section. You will need your salary certificate from your
          employer.
        </p>
        <p className="mb-2 font-medium text-foreground">Key fields:</p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Basic Salary:</strong> Your annual basic pay
          </li>
          <li>
            <strong>House Rent Allowance:</strong> Total HRA received during the
            year
          </li>
          <li>
            <strong>Medical Allowance:</strong> Medical benefits received
          </li>
          <li>
            <strong>Conveyance Allowance:</strong> Transport allowance
          </li>
          <li>
            <strong>Festival Bonus:</strong> Eid bonuses and other festival
            allowances
          </li>
          <li>
            <strong>Employer PF Contribution:</strong> Your employer&apos;s
            contribution to provident fund
          </li>
        </ul>
        <InfoCallout variant="tip" title="Exemptions Are Auto-Calculated">
          <p>
            Certain allowances have exemptions (HRA up to BDT 3 lakh or 50%
            of basic, Medical up to BDT 1.2 lakh or 10% of basic, Conveyance
            up to BDT 30,000). The e-Return system applies these
            automatically.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={2} title="Business / Professional Income">
        <p className="mb-3">
          If you have income from business, freelancing, or professional
          services, report it here.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Gross Receipts:</strong> Total revenue received during the
            year
          </li>
          <li>
            <strong>Admissible Expenses:</strong> Business expenses that can be
            deducted (rent, utilities, supplies, etc.)
          </li>
          <li>
            <strong>Net Profit:</strong> Gross receipts minus expenses
          </li>
        </ul>
        <InfoCallout variant="warning">
          <p>
            Keep receipts and invoices for all claimed expenses. The tax
            authority may ask for documentation during assessment.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={3} title="House Property Income">
        <p className="mb-3">
          If you receive rental income from property you own, report it in this
          section. Self-occupied property does not generate taxable income.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Annual Rental Value:</strong> Total rent received during the
            year
          </li>
          <li>
            <strong>Municipal Tax Paid:</strong> Property tax paid to local
            authority
          </li>
          <li>
            <strong>Repair & Maintenance:</strong> 30% of annual value is
            automatically deducted
          </li>
          <li>
            <strong>Loan Interest:</strong> Interest paid on any loan taken for
            the property
          </li>
        </ul>
      </StepCard>

      <StepCard stepNumber={4} title="Capital Gains">
        <p className="mb-3">
          Report any gains from selling capital assets such as property, shares,
          or other assets.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Sale Price:</strong> The amount you received from the sale
          </li>
          <li>
            <strong>Cost of Acquisition:</strong> Original purchase price of the
            asset
          </li>
          <li>
            <strong>Capital Gain:</strong> Sale price minus cost of acquisition
          </li>
        </ul>
        <InfoCallout variant="info">
          <p>
            Capital gains from share trading on recognized stock exchanges may
            be taxed differently. Gains up to BDT 50,000 from listed company
            shares may be exempt.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={5} title="Agricultural Income">
        <p className="mb-3">
          Agricultural income earned within Bangladesh is exempt from tax up to
          BDT 2 lakh. Report the gross amount and choose an expense deduction
          method.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Gross Income:</strong> Total income from agricultural
            activities
          </li>
          <li>
            <strong>Expenses:</strong> Either a flat 60% deduction or actual
            expenses (whichever you choose)
          </li>
        </ul>
      </StepCard>

      <StepCard stepNumber={6} title="Income from Other Sources">
        <p className="mb-3">
          This covers income that does not fall under any other head.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Bank Interest:</strong> Interest from savings accounts and
            fixed deposits
          </li>
          <li>
            <strong>Dividends:</strong> Dividend income from company shares
          </li>
          <li>
            <strong>Remittance:</strong> Foreign remittance received (generally
            tax-exempt but must be reported)
          </li>
          <li>
            <strong>Other:</strong> Any other taxable income
          </li>
        </ul>
        <InfoCallout variant="tip">
          <p>
            Bank interest income has TDS deducted at source (usually 10-15%).
            Report the gross interest amount and claim credit for the TDS in the
            tax payment section.
          </p>
        </InfoCallout>
      </StepCard>

      <GuideNavigation
        prevHref="/guide/ereturn-filing"
        prevLabel="e-Return Filing"
        nextHref="/guide/deductions-rebate"
        nextLabel="Deductions & Rebate"
      />
    </div>
  );
}
