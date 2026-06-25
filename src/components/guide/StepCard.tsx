interface StepCardProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

export default function StepCard({ stepNumber, title, children }: StepCardProps) {
  return (
    <div className="bg-white border border-rule rounded-xl p-6 mb-6 elevation-2 border-l-4 border-l-primary">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
          {stepNumber}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-ink mb-3">{title}</h2>
          <div className="text-ink-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
