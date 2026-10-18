/**
 * @file cashPlan.js
 * Pure cash planning and wage protection simulation engine.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Simulates 12-week day-by-day cashflow runway with configurable wage priority.
 * @param {import('./snapshot').ProjectSnapshot} snapshot 
 * @param {Object} [options]
 * @param {number} [options.weeks=12]
 * @param {number} [options.reserveWeeks=2]
 * @param {number} [options.wageWeekday] - Configurable weekday for wage disbursements (0=Sun, 1=Mon, ..., 6=Sat)
 * @returns {Object} Cash runway analysis
 */
export function calculateCashRunway(snapshot, options = {}) {
  const weeks = options.weeks || 12;
  const reserveWeeks = options.reserveWeeks ?? (snapshot?.cashSettings?.wageReserveWeeks ?? 2);
  const openingBalance = Number(snapshot?.cashSettings?.openingBalance || 0);
  
  // Wage weekday configurable (default: Saturday = 6)
  const wageWeekday = options.wageWeekday ?? (snapshot?.cashSettings?.wagePayWeekday ?? 6);

  // Compute total received income and paid expenses to date
  const totalInflows = (snapshot?.payments || [])
    .filter(p => p.type === 'INCOME' && p.status === 'Received')
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const totalOutflows = (snapshot?.payments || [])
    .filter(p => p.type === 'EXPENSE' && (p.status === 'Paid' || p.status === 'PAID'))
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const currentCash = openingBalance + totalInflows - totalOutflows;

  // Average weekly wages based on registered active labour
  const estimatedWeeklyWages = (snapshot?.labour || [])
    .filter(l => l.status === 'Active' || l.status === 'ACTIVE' || !l.status)
    .reduce((sum, l) => sum + (Number(l.daily_wage || 0) * 6), 0); // 6 working days/wk

  const weeklyOverhead = Number(snapshot?.cashSettings?.overheadPerWeek || 15000);
  const totalWeeklyObligation = estimatedWeeklyWages + weeklyOverhead;

  // Required wage safety reserve
  const wageSafetyReserve = estimatedWeeklyWages * reserveWeeks;
  const availableForVendors = Math.max(0, currentCash - wageSafetyReserve);

  // 12-Week Projections
  const weeklyForecast = [];
  let rollingBalance = currentCash;

  for (let w = 1; w <= weeks; w++) {
    const projectedWages = estimatedWeeklyWages;
    const projectedOverhead = weeklyOverhead;
    const totalCommitted = projectedWages + projectedOverhead;
    rollingBalance -= totalCommitted;

    weeklyForecast.push({
      weekNumber: w,
      projectedWages,
      projectedOverhead,
      closingBalance: rollingBalance,
      isDeficit: rollingBalance < wageSafetyReserve
    });
  }

  const isOverdrawn = currentCash < 0;
  const runwayWeeks = isOverdrawn
    ? 0
    : (totalWeeklyObligation > 0
      ? Math.floor(currentCash / totalWeeklyObligation)
      : 99);

  let status;
  if (isOverdrawn) {
    status = 'OVERDRAWN';
  } else if (runwayWeeks >= 4) {
    status = 'HEALTHY';
  } else {
    status = 'WARNING';
  }

  return {
    currentCash,
    openingBalance,
    totalInflows,
    totalOutflows,
    estimatedWeeklyWages,
    weeklyOverhead,
    totalWeeklyObligation,
    wageSafetyReserve,
    availableForVendors,
    runwayWeeks,
    wageWeekday,
    isOverdrawn,
    status,
    isHealthy: !isOverdrawn && runwayWeeks >= 4,
    weeklyForecast
  };
}
