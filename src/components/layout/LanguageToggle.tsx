'use client';

import { useLocaleStore } from '@/i18n';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLocaleStore();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border border-rule hover:bg-surface-sunken transition-colors"
      aria-label={locale === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    >
      <span className={locale === 'en' ? 'text-primary font-bold' : 'text-ink-muted'}>EN</span>
      <span className="text-ink-subtle">|</span>
      <span className={locale === 'bn' ? 'text-primary font-bold' : 'text-ink-muted'}>বা</span>
    </button>
  );
}
