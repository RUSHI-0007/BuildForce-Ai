/**
 * @file dates.js
 * Timezone-aware date helpers standardized on Asia/Kolkata (IST).
 */

const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Returns today's date in YYYY-MM-DD in Asia/Kolkata.
 * @returns {string}
 */
export function getTodayIST() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: IST_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

/**
 * Formats ISO date string into Indian readable format (e.g. 18 Oct 2026).
 * @param {string|Date} date 
 * @returns {string}
 */
export function formatIndianDate(date) {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: IST_TIMEZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(d);
}
