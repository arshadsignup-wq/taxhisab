"use client";

import React, { useState, useCallback } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleFocus = useCallback(() => setIsVisible(true), []);
  const handleBlur = useCallback(() => setIsVisible(false), []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={[
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
            "px-3 py-1.5 text-xs font-medium text-white bg-ink rounded-md",
            "whitespace-nowrap elevation-3",
            "pointer-events-none",
            "animate-in fade-in duration-150",
          ].join(" ")}
        >
          {content}
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
