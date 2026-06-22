import React from "react";

type CardVariant = "default" | "bordered" | "elevated";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-slate-200",
  bordered: "bg-white border-2 border-slate-300",
  elevated: "bg-white border border-slate-100 shadow-lg shadow-slate-200/50",
};

export default function Card({
  title,
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl overflow-hidden",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
