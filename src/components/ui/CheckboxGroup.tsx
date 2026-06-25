'use client';

interface CheckboxOption {
  key: string;
  label: string;
  description?: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
}

export default function CheckboxGroup({
  options,
  selected,
  onChange,
}: CheckboxGroupProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <label
          key={option.key}
          className="flex items-start gap-3 p-3 border border-rule rounded-lg cursor-pointer hover:bg-surface-sunken transition-colors has-[:checked]:border-cta has-[:checked]:bg-cta-light"
        >
          <input
            type="checkbox"
            checked={selected[option.key] ?? false}
            onChange={(e) => onChange(option.key, e.target.checked)}
            className="w-4 h-4 mt-0.5 text-cta rounded focus:ring-cta"
          />
          <div>
            <span className="text-sm font-medium text-ink">
              {option.label}
            </span>
            {option.description && (
              <p className="text-xs text-ink-muted mt-0.5">{option.description}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
