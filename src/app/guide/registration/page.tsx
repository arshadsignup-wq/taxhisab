import type { Metadata } from 'next';
import StepCard from '@/components/guide/StepCard';
import InfoCallout from '@/components/guide/InfoCallout';
import GuideNavigation from '@/components/guide/GuideNavigation';

export const metadata: Metadata = {
  title: 'Registration: TIN & e-Return Account | TaxHisab',
  description:
    'How to get your e-TIN certificate and register on the NBR e-Return portal for online income tax filing in Bangladesh.',
};

export default function RegistrationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-2">
        Set Up Your TIN &amp; e-Return Account
      </h1>
      <p className="text-ink-muted mb-8 leading-relaxed">
        Before you file anything, you need two things: a 12-digit e-TIN (your
        tax ID) and an account on the NBR e-Return portal. This is a one-time
        process. Once registered, you use the same account every year.
      </p>

      <StepCard stepNumber={1} title="Get Your e-TIN from NBR">
        <p className="mb-3">
          Visit the National Board of Revenue (NBR) TIN registration website at{' '}
          <a
            href="https://incometax.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-dark"
          >
            incometax.gov.bd
          </a>{' '}
          and apply for your electronic Taxpayer Identification Number.
        </p>
        <p className="mb-3 font-medium text-ink">
          Documents and information you will need:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>National ID (NID) card number</li>
          <li>Active mobile phone number registered in your name</li>
          <li>Valid email address</li>
          <li>Passport-size photograph (digital copy)</li>
          <li>
            Your zone, circle, and tax office information (based on your
            address)
          </li>
        </ul>
        <InfoCallout variant="tip" title="Quick Tip">
          <p>
            If you already have a 12-digit TIN, you can convert it to an e-TIN
            on the same portal. Your old TIN number will remain the same.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={2} title="Register on the e-Tax NBR Portal">
        <p className="mb-3">
          Once you have your e-TIN, go to the e-Return filing portal at{' '}
          <a
            href="https://etaxnbr.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-dark"
          >
            etaxnbr.gov.bd
          </a>{' '}
          and create your e-Return account.
        </p>
        <p className="mb-3 font-medium text-ink">
          Registration process:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Click on the &ldquo;Registration&rdquo; or &ldquo;Sign Up&rdquo; button</li>
          <li>Enter your 12-digit e-TIN number</li>
          <li>Provide your mobile number and email address</li>
          <li>
            Create a strong password (use a mix of letters, numbers, and
            symbols)
          </li>
          <li>
            An OTP will be sent to your mobile and/or email for verification
          </li>
        </ul>
        <InfoCallout variant="warning" title="Important">
          <p>
            Use the same mobile number and email address that you used during
            e-TIN registration. Mismatched information may cause verification
            failures.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={3} title="Set Up Your Profile">
        <p className="mb-3">
          After successful registration, log in and complete your taxpayer
          profile. This information will auto-populate your e-Return form.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Full name (as it appears on your NID)</li>
          <li>Date of birth</li>
          <li>Father&apos;s and mother&apos;s name</li>
          <li>Present and permanent address</li>
          <li>TIN number and tax circle information</li>
          <li>Employer details (if salaried)</li>
          <li>Bank account information for refund (if applicable)</li>
        </ul>
        <InfoCallout variant="tip" title="Save Time Later">
          <p>
            Fill out your profile completely now. This information will be
            pre-filled in your e-Return form each year, saving you significant
            time during filing.
          </p>
        </InfoCallout>
      </StepCard>

      <StepCard stepNumber={4} title="Verify Your Email and Phone Number">
        <p className="mb-3">
          Complete the verification process to activate your account fully.
          NBR sends a verification code to both your registered email and
          mobile number.
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Check your email inbox (and spam folder) for the verification link or OTP</li>
          <li>Enter the OTP received on your mobile phone</li>
          <li>Once both are verified, your account is fully activated</li>
          <li>You can now proceed to file your e-Return</li>
        </ul>
        <InfoCallout variant="warning" title="Verification Required">
          <p>
            You will not be able to submit your e-Return until both your email
            and phone number are verified. If you do not receive the OTP within
            a few minutes, try the &ldquo;Resend OTP&rdquo; option.
          </p>
        </InfoCallout>
      </StepCard>

      <GuideNavigation
        nextHref="/guide/ereturn-filing"
        nextLabel="e-Return Filing Steps"
      />
    </div>
  );
}
