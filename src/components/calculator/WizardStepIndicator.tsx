'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import type { WizardStep, WizardStepId } from '@/types/tax';
import { useTranslation } from '@/i18n';

interface WizardStepIndicatorProps {
  activeSteps: WizardStep[];
  currentStep: WizardStepId;
}

export default function WizardStepIndicator({
  activeSteps,
  currentStep,
}: WizardStepIndicatorProps) {
  const t = useTranslation();
  const { goToStep } = useCalculatorStore();
  const currentIndex = activeSteps.findIndex((s) => s.id === currentStep);

  const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (step: WizardStep, index: number) => {
    if (index <= currentIndex) {
      goToStep(step.id);
    }
  };

  return (
    <nav aria-label="Progress" className="w-full mb-8">
      {/* Desktop horizontal layout */}
      <ol className="hidden md:flex items-center w-full">
        {activeSteps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === activeSteps.length - 1;

          return (
            <li
              key={step.id}
              className={`flex items-center ${isLast ? '' : 'flex-1'}`}
            >
              <button
                type="button"
                onClick={() => handleStepClick(step, index)}
                disabled={status === 'upcoming'}
                className={`flex flex-col items-center gap-1.5 group ${
                  status === 'upcoming' ? 'cursor-default' : 'cursor-pointer'
                }`}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <div
                  className={`flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : status === 'current'
                      ? 'bg-cta text-white ring-4 ring-cta/20'
                      : 'bg-surface text-ink-muted border border-rule'
                  }`}
                >
                  {status === 'completed' ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-[10px] text-center max-w-[80px] leading-tight ${
                    status === 'current'
                      ? 'text-cta font-semibold'
                      : status === 'completed'
                      ? 'text-success/70'
                      : 'text-ink-muted/60'
                  }`}
                >
                  {t.wizard.steps[step.id]?.shortLabel ?? step.shortLabel}
                </span>
              </button>

              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-16px] rounded-full ${
                    index < currentIndex ? 'bg-cta' : 'bg-rule'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile compact layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink">
            {t.wizard.stepOf.replace('{current}', String(currentIndex + 1)).replace('{total}', String(activeSteps.length))}
          </span>
          <span className="text-sm font-semibold text-cta">
            {t.wizard.steps[activeSteps[currentIndex]?.id]?.label ?? activeSteps[currentIndex]?.label ?? ''}
          </span>
        </div>
        <div className="w-full bg-rule rounded-full h-2">
          <div
            className="bg-cta h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / activeSteps.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {activeSteps.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step, index)}
                disabled={status === 'upcoming'}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  status === 'completed'
                    ? 'bg-success'
                    : status === 'current'
                    ? 'bg-cta'
                    : 'bg-rule'
                } ${status !== 'upcoming' ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={`Go to ${t.wizard.steps[step.id]?.label ?? step.label}`}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
