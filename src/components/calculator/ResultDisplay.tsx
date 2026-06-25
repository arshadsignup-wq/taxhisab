'use client';

import { useRef, useState } from 'react';
import { useCalculatorStore } from '@/store/calculator-store';
import IT11GAResult from '@/components/calculator/result/IT11GAResult';
import { generatePDF } from '@/lib/generate-pdf';
import { useTranslation } from '@/i18n';

export default function ResultDisplay() {
  const t = useTranslation();
  const { result, formData, resetFormData } = useCalculatorStore();
  const resultRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    setPdfLoading(true);
    try {
      await generatePDF(
        resultRef.current,
        formData.personalInfo.name,
        formData.personalInfo.assessmentYear
      );
    } finally {
      setPdfLoading(false);
    }
  };

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-rule elevation-2 p-12">
          <div className="w-16 h-16 rounded-2xl bg-cta-light flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-cta"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">
            {t.result.noResultTitle}
          </h2>
          <p className="text-ink-muted mb-2">
            {t.result.noResultText}
          </p>
          <p className="text-xs text-ink-subtle mb-6">
            {t.result.noResultHint}
          </p>
          <button
            type="button"
            onClick={resetFormData}
            className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            {t.common.startCalculator}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:px-0 print:py-0">
      {/* Header */}
      <div className="text-center mb-6 print:mb-4">
        <h1 className="font-display text-2xl font-bold text-ink">
          {t.result.title}
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          {t.result.subtitle}
        </p>
      </div>

      <IT11GAResult ref={resultRef} result={result} formData={formData} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 print:hidden">
        <button
          type="button"
          onClick={resetFormData}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.startOver}
        </button>
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="bg-cta hover:bg-cta-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pdfLoading ? t.common.generatingPdf : t.common.downloadPdf}
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="border border-rule hover:bg-surface-sunken text-ink px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t.common.printResults}
        </button>
      </div>
    </div>
  );
}
