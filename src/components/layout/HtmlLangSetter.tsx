'use client';

import { useEffect } from 'react';
import { useLocaleStore } from '@/i18n';

export function HtmlLangSetter() {
  const { locale } = useLocaleStore();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
