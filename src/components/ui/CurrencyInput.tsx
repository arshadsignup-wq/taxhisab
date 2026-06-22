"use client";

import React, { forwardRef, useState, useCallback } from "react";

interface CurrencyInputProps {
  label?: string;
  error?: string;
  helpText?: string;
  id?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Formats a number in the Bangladeshi numbering system.
 * Example: 1000000 -> "10,00,000"
 *
 * The pattern is: last 3 digits, then groups of 2 from the left.
 */
function formatBangladeshiNumber(num: number): string {
  if (num === 0) return "0";
  if (isNaN(num)) return "";

  const isNegative = num < 0;
  const absStr = Math.abs(Math.floor(num)).toString();

  if (absStr.length <= 3) {
    return (isNegative ? "-" : "") + absStr;
  }

  // Last 3 digits
  const lastThree = absStr.slice(-3);
  const remaining = absStr.slice(0, -3);

  // Group remaining digits in pairs from the right
  const pairs: string[] = [];
  for (let i = remaining.length; i > 0; i -= 2) {
    const start = Math.max(0, i - 2);
    pairs.unshift(remaining.slice(start, i));
  }

  return (isNegative ? "-" : "") + pairs.join(",") + "," + lastThree;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      label,
      error,
      helpText,
      id,
      value,
      onChange,
      className = "",
      disabled = false,
      placeholder = "0",
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const [isFocused, setIsFocused] = useState(false);

    // When focused, show raw number for editing; when blurred, show formatted
    const displayValue = isFocused
      ? value === 0
        ? ""
        : value.toString()
      : value === 0
        ? ""
        : formatBangladeshiNumber(value);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Allow empty string (treat as 0)
        if (raw === "") {
          onChange(0);
          return;
        }

        // Only allow digits (strip any non-digit characters)
        const digitsOnly = raw.replace(/[^0-9]/g, "");
        if (digitsOnly === "") {
          onChange(0);
          return;
        }

        const parsed = parseInt(digitsOnly, 10);
        if (!isNaN(parsed)) {
          onChange(parsed);
        }
      },
      [onChange]
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* BDT symbol prefix */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 text-sm font-medium select-none">&#x09F3;</span>
          </div>

          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={[
              "block w-full rounded-lg border pl-8 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                : "border-slate-300 focus:border-[#006A4E] focus:ring-[#006A4E]/30",
              "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helpText
                  ? `${inputId}-help`
                  : undefined
            }
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && helpText && (
          <p id={`${inputId}-help`} className="mt-1.5 text-sm text-slate-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
