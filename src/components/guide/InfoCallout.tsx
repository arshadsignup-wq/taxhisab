import { Info, Lightbulb, AlertTriangle } from 'lucide-react';

type CalloutVariant = 'info' | 'tip' | 'warning';

interface InfoCalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<
  CalloutVariant,
  { bg: string; border: string; icon: React.ReactNode; defaultTitle: string }
> = {
  info: {
    bg: 'bg-gold-light',
    border: 'border-l-gold',
    icon: <Info className="w-5 h-5 text-gold" />,
    defaultTitle: 'Information',
  },
  tip: {
    bg: 'bg-green-mist',
    border: 'border-l-green-deep',
    icon: <Lightbulb className="w-5 h-5 text-green-deep" />,
    defaultTitle: 'Tip',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-l-amber-500',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    defaultTitle: 'Important',
  },
};

export default function InfoCallout({
  variant = 'info',
  title,
  children,
}: InfoCalloutProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={`${styles.bg} ${styles.border} border-l-4 rounded-lg p-4 my-4`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div>
          <p className="font-semibold text-ink text-sm mb-1">
            {title || styles.defaultTitle}
          </p>
          <div className="text-sm text-ink-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
