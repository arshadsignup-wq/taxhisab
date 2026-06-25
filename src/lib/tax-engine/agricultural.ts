import type { AgriculturalIncome } from '@/types/tax';
import { AGRICULTURAL_FLAT_EXPENSE_RATE } from '@/lib/tax-engine/constants';

/**
 * Calculates net agricultural income.
 *
 * Two expense methods are supported:
 *   - flat_rate: net = grossIncome * (1 - 0.6) i.e., 40% of gross is taxable
 *   - actual:    net = grossIncome - actualExpenses
 *
 * The result is never negative (clamped to 0).
 */
export function calculateAgriculturalIncome(
  agricultural: AgriculturalIncome
): number {
  const gross = agricultural.grossIncome;

  let netIncome: number;

  if (agricultural.expenseMethod === 'flat_rate') {
    netIncome = gross * (1 - AGRICULTURAL_FLAT_EXPENSE_RATE);
  } else {
    netIncome = gross - agricultural.actualExpenses;
  }

  return Math.max(0, netIncome);
}
