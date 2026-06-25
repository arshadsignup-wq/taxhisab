import React from "react";

type CardVariant = "default" | "bordered" | "elevated";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-rule",
  bordered: "bg-white border-2 border-rule",
  elevated: "bg-white border border-rule/50 elevation-2",
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
        <div className="px-6 py-4 border-b border-rule">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
