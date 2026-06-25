import type { TaxProfile, WizardStep, WizardStepId } from '@/types/tax';
import { ALL_WIZARD_STEPS } from '@/types/tax';

/**
 * Returns the active wizard steps based on the user's profile selections.
 *
 * Steps that always appear: profile, personal-info, tax-payments, review
 * Conditional steps appear only when the corresponding income section is enabled.
 */
export function getActiveSteps(profile: TaxProfile): WizardStep[] {
  const alwaysShown: WizardStepId[] = [
    'profile',
    'personal-info',
    'tax-payments',
    'review',
  ];

  const sectionToStep: Record<string, WizardStepId> = {
    salary: 'salary',
    'house-property': 'house-property',
    agricultural: 'agricultural',
    business: 'business',
    'capital-gains': 'capital-gains',
    'financial-assets': 'financial-assets',
    'other-income': 'other-income',
    'tax-exempted': 'tax-exempted',
    investment: 'investment',
    'assets-liabilities': 'assets-liabilities',
  };

  const enabledStepIds = new Set<WizardStepId>(alwaysShown);

  for (const [section, stepId] of Object.entries(sectionToStep)) {
    if (profile.enabledSections[section as keyof typeof profile.enabledSections]) {
      enabledStepIds.add(stepId);
    }
  }

  // Return steps in the canonical order defined by ALL_WIZARD_STEPS
  return ALL_WIZARD_STEPS.filter((step) => enabledStepIds.has(step.id));
}

/**
 * Get step label by ID.
 */
export function getStepLabel(stepId: WizardStepId): string {
  const step = ALL_WIZARD_STEPS.find((s) => s.id === stepId);
  return step?.label ?? stepId;
}

/**
 * Get step short label by ID (for mobile).
 */
export function getStepShortLabel(stepId: WizardStepId): string {
  const step = ALL_WIZARD_STEPS.find((s) => s.id === stepId);
  return step?.shortLabel ?? stepId;
}
