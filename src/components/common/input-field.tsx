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
  onValidChange?: (isValid: boolean) => void;
  type?: "text" | "email" | "tel" | "password";
  className?: string;
  pattern?: string;
  showRequiredHint: boolean;
  autocomplete?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      hint,
      formatFn,
      required = false,
      pattern,
      onValidChange,
      placeholder,
      showRequiredHint = true,
      value,
      autocomplete,
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
      onValidChange?.(e.target.validity.valid);
      onChange?.(newValue);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      let newValue = target.value;
      if (formatFn) newValue = formatFn(newValue);
      setInternalValue(newValue);
      onValidChange?.(target.validity.valid);
      onChange?.(newValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const target = e.currentTarget;
      onValidChange?.(target.validity.valid);
    };

    return (
      <>
        {label && (
          <label
            className={cn(
              "block text-[1rem] font-medium mb-1",
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
            autoComplete={autocomplete}
            pattern={pattern}
            value={internalValue}
            onChange={handleChange}
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              "md:px-5 xs:px-3.75 px-2.5 py-1.75 md:text-[1.57rem] xs:text-[1.0625rem] text-[1rem] tracking-mid",
              "focus:outline-none transition-colors duration-150 w-full bg-transparent border-0 border-b-1 peer",
              colors.inputText,
              colors.inputPlaceholder,
              isFocused || hasValue
                ? colors.inputBorderFocus
                : colors.inputBorder
            )}
            required={required}
          />
          <span
            className={cn(
              showRequiredHint
                ? "peer-invalid:opacity-100! peer-focus:opacity-0! opacity-0"
                : "opacity-0",
              "transition-opacity! duration-400! absolute right-0 bottom-3.5 tracking-mid md:text-[0.875rem] xs:text-[0.5625rem] text-[0.4375rem] text-red-500 md:pr-5 xs:pr-3.75 pr-2.5"
            )}
          >
            ! Required field
          </span>
        </div>

        {hint && (
          <p className={cn("mt-2 text-4xl", colors.textMuted)}>{hint}</p>
        )}
      </>
    );
  }
);

InputField.displayName = "InputField";
