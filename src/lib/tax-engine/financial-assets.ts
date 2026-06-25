import type { FinancialAssetsIncome } from '@/types/tax';

/**
 * Calculates total income from financial assets (IT-11GA Serial 6).
 * Covers bank interest, savings certificate interest, securities,
 * dividends (listed and unlisted), and other financial income.
 */
export function calculateFinancialAssetsIncome(
  financialAssets: FinancialAssetsIncome
): number {
  return (
    financialAssets.bankInterest +
    financialAssets.savingsCertificateInterest +
    financialAssets.securitiesInterest +
    financialAssets.listedDividends +
    financialAssets.unlistedDividends +
    financialAssets.otherFinancialIncome
  );
}
