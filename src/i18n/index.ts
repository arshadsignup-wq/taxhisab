'use client';

import { useLocaleStore } from './use-locale';
import { en } from './en';
import { bn } from './bn';
import type { Translations } from './types';

const translations: Record<string, Translations> = { en, bn };

export function useTranslation(): Translations {
  const { locale } = useLocaleStore();
  return translations[locale] ?? en;
}

export { useLocaleStore } from './use-locale';
export type { Locale, Translations } from './types';
