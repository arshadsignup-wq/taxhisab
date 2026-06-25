'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function FAQPage() {
  const t = useTranslation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-4 text-ink">{t.faq.title}</h1>
      <p className="text-ink-muted mb-10">
        {t.faq.subtitle}
      </p>

      <div className="space-y-8">
        {t.faq.categories.map((category) => (
          <div key={category.name}>
            <h2 className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-3">
              {category.name}
            </h2>
            <div className="space-y-3">
              {category.questions.map((item, index) => {
                const key = `${category.name}-${index}`;
                return (
                  <div
                    key={key}
                    className="bg-white border border-rule rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-sunken transition-colors cursor-pointer"
                      aria-expanded={openItems.has(key)}
                    >
                      <span className="font-medium text-ink pr-4">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-ink-muted flex-shrink-0 transition-transform duration-200 ${
                          openItems.has(key) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openItems.has(key) && (
                      <div className="px-6 pb-4 text-ink-muted leading-relaxed border-t border-rule pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
