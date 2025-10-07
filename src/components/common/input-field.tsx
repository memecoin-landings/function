"use client";

import type React from "react";
import { useState, forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useThemeColors } from "./use-theme-colors";

interface InputFieldProps {
  name?: string;
  label?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  formatFn?: (value: string) => string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "tel" | "password";
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      hint,
      formatFn,
      required = false,
      placeholder,
      value,
      onChange,
      type = "text",
      className,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");
    const colors = useThemeColors();
    const [hasValue, setHasValue] = useState(!!value);

    useEffect(() => {
      setHasValue(internalValue.length > 0);
    }, [internalValue]);

    // Синхронизируем внутреннее состояние с внешним значением
    useEffect(() => {
      setInternalValue(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (formatFn) newValue = formatFn(newValue);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    return (
      <>
        {label && (
          <label
            className={cn(
              "block text-sm font-medium mb-1",
              colors.textSecondary
            )}
          >
            {label}
          </label>
        )}

        <div className={cn("relative", className)}>
          <input
            name={name}
            ref={ref}
            type={type}
            value={internalValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "md:px-5 xs:px-3.75 px-2.5 py-1.75 md:text-[1.57rem] xs:text-[1.0625rem] text-[0.875rem] tracking-[-3%]",
              "focus:outline-none transition-colors duration-150 w-full bg-transparent border-0 border-b-1",
              colors.inputText,
              colors.inputPlaceholder,
              isFocused || hasValue
                ? colors.inputBorderFocus
                : colors.inputBorder
            )}
            required={required}
          />

          {required && !hasValue && (
            <span className="absolute right-0 bottom-3.5 tracking-[-3%] md:text-[0.875rem] xs:text-[0.5625rem] text-[0.4375rem] text-red-500 md:pr-5 xs:pr-3.75 pr-2.5">
              ! Required field
            </span>
          )}
        </div>

        {hint && (
          <p className={cn("mt-2 text-4xl", colors.textMuted)}>{hint}</p>
        )}
      </>
    );
  }
);

InputField.displayName = "InputField";
