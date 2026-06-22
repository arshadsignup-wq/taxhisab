'use client';

import { useCalculatorStore } from '@/store/calculator-store';
import { WIZARD_STEPS, WIZARD_STEP_LABELS, WizardStep } from '@/types/tax';

export default function WizardStepIndicator() {
  const { currentStep, goToStep, getCurrentStepIndex } = useCalculatorStore();
  const currentIndex = getCurrentStepIndex();

  const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (step: WizardStep, index: number) => {
    if (index <= currentIndex) {
      goToStep(step);
    }
  };

  return (
    <nav aria-label="Progress" className="w-full mb-8">
      {/* Desktop horizontal layout */}
      <ol className="hidden md:flex items-center w-full">
        {WIZARD_STEPS.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === WIZARD_STEPS.length - 1;

          return (
            <li
              key={step}
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
                      ? 'bg-green-deep text-white'
                      : status === 'current'
                      ? 'bg-gold text-ink ring-4 ring-gold/20'
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
                      ? 'text-gold font-semibold'
                      : status === 'completed'
                      ? 'text-green-deep/70'
                      : 'text-ink-muted/60'
                  }`}
                >
                  {WIZARD_STEP_LABELS[step]}
                </span>
              </button>

              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-16px] rounded-full ${
                    index < currentIndex ? 'bg-green-deep' : 'bg-rule'
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
            Step {currentIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="text-sm font-semibold text-gold">
            {WIZARD_STEP_LABELS[currentStep]}
          </span>
        </div>
        <div className="w-full bg-rule rounded-full h-2">
          <div
            className="bg-gold h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / WIZARD_STEPS.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {WIZARD_STEPS.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <button
                key={step}
                type="button"
                onClick={() => handleStepClick(step, index)}
                disabled={status === 'upcoming'}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  status === 'completed'
                    ? 'bg-green-deep'
                    : status === 'current'
                    ? 'bg-gold'
                    : 'bg-rule'
                } ${status !== 'upcoming' ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={`Go to ${WIZARD_STEP_LABELS[step]}`}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
