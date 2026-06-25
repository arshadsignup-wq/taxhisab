'use client';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  id?: string;
}

export default function Toggle({ enabled, onChange, label, id }: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        id={id}
        onClick={() => onChange(!enabled)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!enabled);
          }
        }}
        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 ${
          enabled ? 'bg-cta' : 'bg-ink-subtle'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
            enabled ? 'translate-x-5' : ''
          }`}
        />
      </button>
      <span className="font-medium text-ink">{label}</span>
    </div>
  );
}
