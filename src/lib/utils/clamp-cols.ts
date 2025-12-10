export const clampCols = (v: unknown, min=1, max=4, fallback=2) => {
  const n = Number(v);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
};