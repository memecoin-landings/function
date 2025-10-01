"use client";
import React from "react";
import { useThemeColors } from "./use-theme-colors";
import { cn } from "@/lib/utils";

interface ChipProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

export function Chip({
  text,
  onClick,
  className,
  isSelected = false,
}: ChipProps) {
  const colors = useThemeColors();

  return (
    <button
      className={cn(
        "inline-flex items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full duration-200 transition-colors",
        isSelected
          ? `${colors.chipSelectedBg} ${colors.chipSelectedText}`
          : `${colors.chipBg} ${colors.chipText}`,
        colors.conditional(
          "hover:bg-[#FF3F1A] hover:text-black",
          "hover:bg-[#FF3F1A] hover:text-black"
        ),
        className || ""
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
