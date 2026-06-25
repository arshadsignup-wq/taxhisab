'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  label: string;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    label: 'Filing Basics',
    items: [
      {
        question: 'Do I need to file a tax return?',
        answer:
          'If you have a Taxpayer Identification Number (TIN), yes. You must file a return every year, even if your income is below the taxable threshold and you owe nothing. TIN is mandatory for opening bank accounts above certain thresholds, registering property, obtaining a trade license, getting a credit card, and many other services.',
      },
      {
        question: 'When is the filing deadline?',
        answer:
          'November 30 of the assessment year. For income earned during July 2024 to June 2025, the assessment year is 2025-2026, so the deadline is November 30, 2025. NBR occasionally grants extensions, but you should not count on one.',
      },
      {
        question: 'Can I file my return online?',
        answer:
          'Yes. The NBR e-Return portal at etaxnbr.gov.bd lets you file entirely online. You register once, then fill in and submit your return each year through the website. Our filing guide walks you through every step of the process.',
      },
      {
        question: 'What happens if I file late?',
        answer:
          'Late filing carries penalties: 2% monthly interest on any unpaid tax (simple interest), plus a penalty of up to 10% of the last assessed tax. In serious cases, prosecution is possible. Even if you owe nothing, file on time to avoid complications.',
      },
    ],
  },
  {
    label: 'Tax Concepts',
    items: [
      {
        question: 'What is the difference between e-TIN and e-Return?',
        answer:
          'e-TIN is your 12-digit taxpayer identification number, essentially your tax ID. e-Return is the online form where you report your income and submit your annual return. You need the e-TIN first, then you use it to register on the e-Return portal at etaxnbr.gov.bd.',
      },
      {
        question: 'I earn less than BDT 3,75,000. Do I still pay tax?',
        answer:
          'You won\'t owe income tax on that amount. But if you hold a TIN, you must still file a return, and a minimum tax of BDT 5,000 applies regardless (for AY 2026-2027). Think of it as the cost of maintaining your TIN.',
      },
      {
        question: 'What is the minimum tax and who pays it?',
        answer:
          'Every TIN holder owes at least BDT 5,000 in tax for AY 2026-2027, even if their calculated tax is zero. In earlier years the amount varied by location (BDT 5,000 for Dhaka/Chattogram, BDT 4,000 for other city corporations, BDT 3,000 elsewhere), but from AY 2026-2027 it is a flat BDT 5,000 everywhere.',
      },
      {
        question: 'How does the investment rebate work?',
        answer:
          'You get a 15% tax rebate on eligible investments: DPS, life insurance, provident fund, savings certificates, listed stocks, and approved donations. The rebate applies to the lowest of your total eligible investment, 20% of your taxable income, or BDT 10 lakh. For example, if you invest BDT 2 lakh and your taxable income is BDT 8 lakh, the admissible amount is BDT 1.6 lakh (20% of 8 lakh), and your rebate is BDT 24,000.',
      },
    ],
  },
  {
    label: 'Documents & Forms',
    items: [
      {
        question: 'What documents do I need?',
        answer:
          'It depends on your income sources. Most salaried employees need: their salary certificate, bank statements (for interest income), investment receipts (DPS, insurance, savings certificates), TDS certificates from employer or bank, and NID card. Business owners also need profit/loss records.',
      },
      {
        question: 'What is the IT-10B form?',
        answer:
          'A statement of your assets and liabilities. You must submit it if any of these apply: gross wealth exceeds BDT 40 lakh, you own a motor vehicle, you own property, you live in a city corporation area, or your income exceeds BDT 4 lakh. It lists everything you own and everything you owe.',
      },
    ],
  },
  {
    label: 'About TaxHisab',
    items: [
      {
        question: 'Is TaxHisab affiliated with the government?',
        answer:
          'No. This is an independent, free tool. We are not affiliated with NBR or any government body. The calculator provides estimates based on published tax rules. For complex situations or legal advice, consult a registered tax professional.',
      },
      {
        question: 'Is my financial data safe here?',
        answer:
          'Your data never leaves your device. Every calculation runs in your browser using JavaScript. Nothing is sent to a server. There is no account, no login, and no database. You can verify this yourself by checking your browser\'s network tab.',
      },
    ],
  },
];

export default function FAQPage() {
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
      <h1 className="text-3xl font-bold mb-4 text-ink">Common Questions</h1>
      <p className="text-ink-muted mb-10">
        Straight answers about Bangladesh income tax, filing requirements, and
        how this calculator works.
      </p>

      <div className="space-y-8">
        {FAQ_CATEGORIES.map((category) => (
          <div key={category.label}>
            <h2 className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-3">
              {category.label}
            </h2>
            <div className="space-y-3">
              {category.items.map((item, index) => {
                const key = `${category.label}-${index}`;
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
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-ink-muted flex-shrink-0 transition-transform duration-200 ${
                          openItems.has(key) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openItems.has(key) && (
                      <div className="px-6 pb-4 text-ink-muted leading-relaxed border-t border-rule pt-3">
                        {item.answer}
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
