import type { Metadata } from 'next';
import StepCard from '@/components/guide/StepCard';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'Submission & Acknowledgment',
};

export default function SubmissionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Review, Pay, and Submit Your Return
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        You are almost done. These final steps cover checking your numbers one
        last time, making your tax payment, hitting Submit, and downloading your
        acknowledgment receipt as proof of filing.
      </p>

      <StepCard stepNumber={1} title="Final Review Before Submission">
        <p className="mb-3">
          Before clicking Submit, carefully review every section of your return:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Personal information is correct and up-to-date</li>
          <li>
            All income figures match your salary certificates, bank statements,
            and other documents
          </li>
          <li>Investment amounts match your receipts and certificates</li>
          <li>TDS and advance tax amounts are correctly entered</li>
          <li>
            Assets and liabilities statement (IT-10B) is complete if required
          </li>
          <li>Calculated tax liability looks reasonable</li>
        </ul>
        <InfoCallout variant="warning">
          <p>
            Once submitted, you cannot modify your return through the portal.
            Any corrections require filing a revised return through your tax
            circle office. Double-check everything now.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={2} title="Tax Payment Options">
        <p className="mb-3">
          If you have a net tax payable amount, you must pay before or along
          with your return submission. Available payment methods:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Bank Challan (TR-6):</strong> Pay at any designated bank
            branch using a tax deposit challan. Keep the challan receipt.
          </li>
          <li>
            <strong>Online Banking:</strong> Some banks support direct online
            tax payment through their internet banking portals.
          </li>
          <li>
            <strong>Mobile Banking:</strong> Selected mobile financial services
            may allow tax payments.
          </li>
        </ul>
        <InfoCallout variant="info">
          <p>
            When paying via bank challan, ensure the challan mentions your TIN,
            the correct assessment year, and the tax amount. Get the bank seal
            and receipt as proof of payment.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={3} title="Submit Your e-Return">
        <p className="mb-3">
          After completing all sections and making any required tax payments:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Click the &ldquo;Submit&rdquo; button on the final review page</li>
          <li>
            The system will validate your return and check for any missing
            fields
          </li>
          <li>
            If there are validation errors, fix them and try again
          </li>
          <li>
            Once successfully submitted, you will see a confirmation screen
          </li>
        </ul>
      </StepCard>

      <StepCard stepNumber={4} title="Download Acknowledgment Receipt">
        <p className="mb-3">
          After successful submission, an acknowledgment receipt is generated.
          This is your proof of filing.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            Download the acknowledgment receipt as a <strong>PDF</strong>
          </li>
          <li>Save it securely. You may need it for various purposes</li>
          <li>
            The receipt contains your TIN, assessment year, submission date, and
            a unique acknowledgment number
          </li>
          <li>
            You can also access this receipt later by logging into the e-Return
            portal
          </li>
        </ul>
      </StepCard>

      <StepCard stepNumber={5} title="Keep Records for Future Reference">
        <p className="mb-3">
          Maintain the following records for at least 6 years after the
          assessment year:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Acknowledgment receipt (printed and digital copy)</li>
          <li>All supporting documents (salary certificates, TDS certificates)</li>
          <li>Investment proof and receipts</li>
          <li>Bank statements</li>
          <li>Property documents</li>
          <li>Tax payment challans</li>
        </ul>
        <InfoCallout variant="tip">
          <p>
            Create a dedicated folder (physical and digital) for each assessment
            year&apos;s tax documents. This makes future filings and any
            queries from the tax office much easier to handle.
          </p>
        </InfoCallout>
      </StepCard>

      <InfoCallout variant="warning" title="Filing Deadline">
        <p>
          The standard deadline for filing your return is <strong>November
          30</strong> of the assessment year. Filing after the deadline may
          result in penalties including interest charges of 2% per month on
          unpaid tax.
        </p>
      </InfoCallout>

      <GuideNavigation
        prevHref="/guide/assets-liabilities"
        prevLabel="Assets & Liabilities"
      />
    </div>
  );
}
