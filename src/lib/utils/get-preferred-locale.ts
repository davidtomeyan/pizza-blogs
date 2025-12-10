import { canUseDom } from '@/lib/utils/can-use-dom';

export function getPreferredLocale(fallback: string = 'en-US'): string {
  if (canUseDom) {
    if (navigator.languages && navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    if (navigator.language) {
      return navigator.language;
    }
  }
  return fallback;
}
