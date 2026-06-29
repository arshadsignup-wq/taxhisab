'use client';

import { useRef, useState } from 'react';
import { useCalculatorStore } from '@/store/calculator-store';
import IT11GAResult from '@/components/calculator/result/IT11GAResult';
import { generatePDF } from '@/lib/generate-pdf';
import { useTranslation } from '@/i18n';

export default function ResultDisplay() {
  const t = useTranslation();
  const { result, formData, updateFormData, resetFormData } = useCalculatorStore();
  const resultRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const PERSONAL_FIELDS = ['name', 'tin', 'nid', 'circle', 'zone', 'employerName', 'spouseName', 'spouseTin'] as const;

  const updatePersonalField = (field: (typeof PERSONAL_FIELDS)[number], value: string) => {
    updateFormData('personalInfo', { [field]: value });
  };

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

      {/* Collapsible personal details form — outside resultRef so it won't appear in PDF */}
      <div className="mt-6 print:hidden">
        <button
          type="button"
          onClick={() => setDetailsOpen((o) => !o)}
          className="w-full flex items-center justify-between bg-white border border-rule rounded-xl px-6 py-4 hover:bg-surface-sunken transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-ink">{t.result.addDetailsToggle}</span>
          </div>
          <svg
            className={`w-5 h-5 text-ink-muted transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {detailsOpen && (
          <div className="bg-white border border-t-0 border-rule rounded-b-xl px-6 py-5 -mt-2 pt-6">
            <p className="text-xs text-ink-muted mb-4">
              {t.result.addDetailsDescription}
            </p>

            <div className="bg-info-light border border-info/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-ink font-medium mb-1">
                {t.calculator.personalInfo.fields.zone?.label && 'How to find your Tax Zone, Tax Circle, and TIN'}
              </p>
              <p className="text-xs text-ink-muted">
                All three are printed on your TIN certificate. You can download your TIN certificate by logging into{' '}
                <a href="https://secure.incometax.gov.bd" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-dark">
                  secure.incometax.gov.bd
                </a>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERSONAL_FIELDS.map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t.calculator.personalInfo.fields[key].label}
                  </label>
                  <p className="text-xs text-ink-muted mb-1">
                    {t.calculator.personalInfo.fields[key].hint}
                  </p>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta"
                    value={(formData.personalInfo[key] as string) || ''}
                    onChange={(e) => updatePersonalField(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
