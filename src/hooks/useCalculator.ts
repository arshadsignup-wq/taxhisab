'use client';

import { useCallback } from 'react';
import { useCalculatorStore } from '@/store/calculator-store';
import { calculateTax } from '@/lib/tax-engine/calculator';

export function useCalculator() {
  const { formData, setResult } = useCalculatorStore();

  const calculate = useCallback(() => {
    const result = calculateTax(formData);
    setResult(result);
    return result;
  }, [formData, setResult]);

  return { calculate };
}
