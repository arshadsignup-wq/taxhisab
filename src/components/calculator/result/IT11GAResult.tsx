'use client';

import { forwardRef } from 'react';
import type { TaxCalculationResult, CalculatorFormData } from '@/types/tax';
import Part1PersonalInfo from './Part1PersonalInfo';
import Part2IncomeStatement from './Part2IncomeStatement';
import Part3TaxComputation from './Part3TaxComputation';
import Part4TaxPayments from './Part4TaxPayments';
import Part5IT10B from './Part5IT10B';

interface IT11GAResultProps {
  result: TaxCalculationResult;
  formData: CalculatorFormData;
}

const IT11GAResult = forwardRef<HTMLDivElement, IT11GAResultProps>(
  function IT11GAResult({ result, formData }, ref) {
    return (
      <div ref={ref} className="space-y-6">
        <Part1PersonalInfo personalInfo={formData.personalInfo} />
        <Part2IncomeStatement result={result} formData={formData} />
        <Part3TaxComputation result={result} />
        <Part4TaxPayments
          result={result}
          taxPayments={formData.taxPayments}
        />
        <Part5IT10B result={result} />
      </div>
    );
  }
);

export default IT11GAResult;
