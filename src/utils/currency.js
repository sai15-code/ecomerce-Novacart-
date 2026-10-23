export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

/**
 * Format a numeric amount in Indian Rupees (₹) with standard Indian comma grouping (en-IN).
 * e.g. 31990 -> ₹31,990
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }
  return `${CURRENCY_SYMBOL}${Math.round(amount).toLocaleString('en-IN')}`;
}

export function formatPriceDecimals(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0.00';
  }
  return `${CURRENCY_SYMBOL}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
