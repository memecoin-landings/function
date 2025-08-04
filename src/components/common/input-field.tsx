"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "tel" | "password";
  className?: string;
}

export function InputField({
  label,
  hint,
  required = false,
  placeholder,
  value,
  onChange,
  type = "text",
  className,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const hasValue = internalValue.length > 0;

  return (
    <div className={cn("relative mb-6", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 bg-transparent border-0 border-b-2 px-0 py-3 md:text-2xl xs:text-[1.0625rem] text-[0.875rem] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-200",
            isFocused || hasValue ? "border-gray-900" : "border-gray-300"
          )}
          required={required}
        />

        {required && !hasValue && (
          <span className="absolute right-0 top-3 text-xs text-red-500">
            ! Required field
          </span>
        )}
      </div>

      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
