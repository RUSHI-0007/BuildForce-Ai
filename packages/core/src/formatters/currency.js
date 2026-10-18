/**
 * @file currency.js
 * Indian numbering system currency formatters.
 */

/**
 * Format rupees into Indian currency string (e.g. ₹12,50,000).
 * @param {number} amountInRupees 
 * @param {boolean} [includeSymbol=true] 
 * @returns {string}
 */
export function formatINR(amountInRupees, includeSymbol = true) {
  const num = Number(amountInRupees) || 0;
  const formatted = num.toLocaleString('en-IN');
  return includeSymbol ? `₹${formatted}` : formatted;
}

/**
 * Format rupees to compact representation (e.g. ₹45.5 Lakhs, ₹1.2 Cr).
 * @param {number} amountInRupees 
 * @returns {string}
 */
export function formatCompactINR(amountInRupees) {
  const num = Math.abs(Number(amountInRupees) || 0);
  const sign = Number(amountInRupees) < 0 ? '-' : '';

  if (num >= 10000000) {
    return `${sign}₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `${sign}₹${(num / 100000).toFixed(2)} Lakhs`;
  }
  if (num >= 1000) {
    return `${sign}₹${(num / 1000).toFixed(1)}k`;
  }
  return `${sign}₹${num.toLocaleString('en-IN')}`;
}
