import { getPreferredLocale } from '@/lib/utils/get-preferred-locale';
import { isNumber } from '@/lib/utils/is-number';

export type Currency = 'USD' | 'EUR';

export const getFormatedPrice = (
  value?: number | string | null,
  currency?: Currency | null,
) => {
  const preferredLocale = getPreferredLocale();
  if (!currency) {
    return String(value);
  }

  const n = Number(value);

  if (!isNumber(n)) return null;
  const numberFormat = new Intl.NumberFormat(preferredLocale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
  });

  return numberFormat.format(n);
};
