"use client";
import FunctionLogo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useThemeColors } from "@/components/common/use-theme-colors";

interface FormHeaderProps {
  onClose?: (() => void) | undefined;
  className?: string;
}

export default function FormHeader({ onClose, className }: FormHeaderProps) {
  const colors = useThemeColors();

  return (
    <div
      className={cn("flex flex-row justify-between items-stretch", className)}
    >
      <Link href="/#home" className="flex-shrink-0 flex items-center group">
        <FunctionLogo
          className={cn(
            "origin-left sm:scale-100 scale-119 group-hover:fill-[#FF3F1A] transition-colors ease-in-out duration-300",
            colors.conditional("fill-black", "fill-white")
          )}
        />
      </Link>

      <div className="flex items-center gap-3">
        <button
          className={cn(
            "inline-flex items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full transition-colors",
            colors.buttonBg,
            colors.buttonText,
            colors.conditional(
              "hover:bg-[#FF3F1A] hover:text-black",
              "hover:bg-[#FF3F1A] hover:text-black"
            ),
            className
          )}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
