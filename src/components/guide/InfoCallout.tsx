import { Info, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

type CalloutVariant = 'info' | 'tip' | 'warning' | 'success';

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
    bg: 'bg-info-light',
    border: 'border-l-info',
    icon: <Info className="w-5 h-5 text-info" />,
    defaultTitle: 'Information',
  },
  tip: {
    bg: 'bg-primary-light',
    border: 'border-l-primary',
    icon: <Lightbulb className="w-5 h-5 text-primary" />,
    defaultTitle: 'Tip',
  },
  warning: {
    bg: 'bg-warning-light',
    border: 'border-l-warning',
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    defaultTitle: 'Important',
  },
  success: {
    bg: 'bg-success-light',
    border: 'border-l-success',
    icon: <CheckCircle className="w-5 h-5 text-success" />,
    defaultTitle: 'Done',
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
      className={`${styles.bg} ${styles.border} border-l-4 rounded-xl p-4 my-4`}
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
