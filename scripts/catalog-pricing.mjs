// Supplier exports already contain USD costs. Round in integer cents, once.
export function referencePriceUsd(costUsd, markupPercent) {
  if (!Number.isFinite(costUsd) || costUsd <= 0) throw new Error('USD cost must be positive');
  if (!Number.isInteger(markupPercent) || markupPercent < 0 || markupPercent > 1000) throw new Error('Invalid markup percent');
  const costCents = Math.round(costUsd * 100);
  if (costCents < 1 || !Number.isSafeInteger(costCents * (100 + markupPercent))) throw new Error('USD cost outside supported range');
  return Math.floor((costCents * (100 + markupPercent) + 50) / 100) / 100;
}
