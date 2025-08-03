"use client";
import { useState, ChangeEvent } from "react";

export const useFormattedInput = (
  initValue: string,
  formatInput?: (value: string) => string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
) => {
  const [prettyValue, setPrettyValue] = useState(initValue);

  const onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let formattedValue = rawValue;
    if (formatInput) formattedValue = formatInput(rawValue);
    setPrettyValue(formattedValue);
    if (onChange) onChange(e);
  };

  return { onUpdate, prettyValue };
};
