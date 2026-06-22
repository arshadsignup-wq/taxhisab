/**
 * Format a number as Bangladeshi Taka (BDT) currency.
 * Uses the Bangladeshi numbering system: 1,00,00,000
 */
export function formatBDT(amount: number): string {
  if (amount === 0) return '৳0';

  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();

  if (str.length <= 3) {
    return `${isNegative ? '-' : ''}৳${str}`;
  }

  // Last 3 digits
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);

  // Group remaining digits in pairs (Bangladeshi system)
  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    remaining = remaining.slice(0, -2);
    result = chunk + ',' + result;
  }

  return `${isNegative ? '-' : ''}৳${result}`;
}

/**
 * Format number with Bangladeshi comma grouping (without currency symbol)
 */
export function formatNumber(amount: number): string {
  if (amount === 0) return '0';

  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();

  if (str.length <= 3) {
    return `${isNegative ? '-' : ''}${str}`;
  }

  let result = str.slice(-3);
  let remaining = str.slice(0, -3);

  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    remaining = remaining.slice(0, -2);
    result = chunk + ',' + result;
  }

  return `${isNegative ? '-' : ''}${result}`;
}

/**
 * Parse a formatted currency string back to a number
 */
export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[৳,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format percentage for display
 */
export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}

/**
 * Format a slab range for display
 */
export function formatSlabRange(lower: number, upper: number | null): string {
  if (upper === null) {
    return `Above ${formatBDT(lower)}`;
  }
  return `${formatBDT(lower)} – ${formatBDT(upper)}`;
}
