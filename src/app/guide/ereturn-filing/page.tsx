import type { Metadata } from 'next';
import StepCard from '@/components/guide/StepCard';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'e-Return Filing: Step-by-Step | TaxHisab',
  description:
    'Step-by-step walkthrough of the NBR e-Return filing process on etaxnbr.gov.bd for Bangladesh income tax.',
};

export default function EReturnFilingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-2">
        Filing Your e-Return: Every Screen Explained
      </h1>
      <p className="text-ink-muted mb-8 leading-relaxed">
        Here is exactly what you will see when you log into the NBR portal and
        start your return. Each step below matches a section of the online form.
        Go through them in order.
      </p>

      <StepCard stepNumber={1} title="Log In and Select e-Return">
        <p className="mb-3">
          Go to{' '}
          <a
            href="https://etaxnbr.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-dark"
          >
            etaxnbr.gov.bd
          </a>{' '}
          and log in with your registered credentials. From the dashboard, click
          on &ldquo;e-Return&rdquo; to begin preparing your tax return.
        </p>
        <InfoCallout variant="tip">
          <p>
            Bookmark the portal URL and save your login credentials securely.
            You may need to access it multiple times before finalizing your
            return.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={2} title="Select Assessment Year and Return Type">
        <p className="mb-3">
          Choose the correct assessment year for which you are filing. The
          assessment year is the year <em>after</em> the income year. For
          example, if you earned income during July 2023 to June 2024, your
          assessment year is 2024&ndash;2025.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Assessment Year:</strong> Select from the dropdown (e.g.,
            2024&ndash;2025)
          </li>
          <li>
            <strong>Return Type:</strong> Choose &ldquo;Individual&rdquo; for personal tax returns
          </li>
          <li>
            <strong>Residential Status:</strong> Select &ldquo;Resident&rdquo; if you lived in
            Bangladesh for 182 days or more during the income year
          </li>
        </ul>
        <InfoCallout variant="warning" title="Double-Check the Year">
          <p>
            Selecting the wrong assessment year is a common mistake. Once you
            submit, changing the assessment year requires contacting your tax
            circle office.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={3} title="Fill Personal Information Section">
        <p className="mb-3">
          This section is usually pre-populated from your profile. Review and
          confirm the following details:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Full name, date of birth, NID number</li>
          <li>TIN and tax circle/zone</li>
          <li>Present and permanent address</li>
          <li>Contact information (phone, email)</li>
          <li>Employer name and address (for salaried individuals)</li>
          <li>Spouse TIN (if applicable)</li>
        </ul>
        <InfoCallout variant="tip">
          <p>
            If any pre-filled information is incorrect, update it in your
            profile settings before proceeding. Changes made here may not
            persist for future filings.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={4} title="Enter Income Details">
        <p className="mb-3">
          This is the most detailed section of your return. You will enter
          income under the applicable heads. Detailed guidance for each income
          type is covered in the next section of this guide.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Salary income</li>
          <li>Income from business or profession</li>
          <li>Income from house property</li>
          <li>Capital gains</li>
          <li>Agricultural income</li>
          <li>Income from other sources</li>
        </ul>
        <p className="mt-3">
          You only need to fill in the sections relevant to your income
          sources. Leave other sections empty or at zero.
        </p>
      </StepCard>

      <StepCard stepNumber={5} title="Enter Tax, Payments & Deductions">
        <p className="mb-3">
          After entering your income, the system calculates your gross tax
          liability. In this section, you record:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Tax Deducted at Source (TDS):</strong> Any tax already
            deducted by your employer or bank
          </li>
          <li>
            <strong>Advance Tax:</strong> Any tax you have already paid in
            advance during the income year
          </li>
          <li>
            <strong>Tax Paid with Return:</strong> The remaining amount you owe
          </li>
          <li>
            <strong>Investment Rebate:</strong> Rebate on eligible investments
            (covered in the Deductions section)
          </li>
        </ul>
        <InfoCallout variant="info">
          <p>
            Keep your salary certificate, bank TDS certificates, and advance
            tax challans ready. You will need the exact amounts from these
            documents.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={6} title="Enter Assets & Liabilities (If Applicable)">
        <p className="mb-3">
          The IT-10B (assets and liabilities statement) is required in certain
          situations. If applicable to you, fill in the details of your assets
          and liabilities at the end of the income year.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Details of all owned assets (property, investments, vehicles, etc.)</li>
          <li>Details of all liabilities (loans, mortgages)</li>
          <li>Family expenses during the year</li>
          <li>Source of funds for any asset acquired during the year</li>
        </ul>
        <p className="mt-3 text-sm">
          See the{' '}
          <a
            href="/guide/assets-liabilities"
            className="text-primary underline hover:text-primary-dark"
          >
            Assets &amp; Liabilities
          </a>{' '}
          section for detailed guidance on when IT-10B is required and how to
          fill it out.
        </p>
      </StepCard>

      <StepCard stepNumber={7} title="Verify and Submit">
        <p className="mb-3">
          Before final submission, carefully review every section of your
          return:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Check that all income figures match your supporting documents</li>
          <li>Verify TDS and advance tax amounts</li>
          <li>Review the calculated tax liability and ensure it is correct</li>
          <li>Confirm your personal details one last time</li>
          <li>Click &ldquo;Submit&rdquo; when everything is accurate</li>
        </ul>
        <InfoCallout variant="warning" title="Before You Submit">
          <p>
            Once submitted, you cannot edit your return for that assessment
            year through the portal. If you discover an error after submission,
            you will need to file a revised return through your tax circle
            office.
          </p>
        </InfoCallout>
      </StepCard>

      <GuideNavigation
        prevHref="/guide/registration"
        prevLabel="Registration"
        nextHref="/guide/income-entry"
        nextLabel="Income Entry"
      />
    </div>
  );
}
