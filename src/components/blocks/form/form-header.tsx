"use client";
import FunctionLogo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface FormHeaderProps {
  onClose?: (() => void) | undefined;
  className?: string;
}

export default function FormHeader({ onClose, className }: FormHeaderProps) {
  return (
    <div
      className={cn("flex flex-row justify-between items-stretch", className)}
    >
      <Link href="/#home" className="flex-shrink-0 flex items-center group">
        <FunctionLogo className="origin-left sm:scale-100 scale-119 fill-black group-hover:fill-[#FF3F1A] transition-colors ease-in-out duration-300" />
      </Link>
      <button
        className={cn(
          "inline-flex items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full transition-colors bg-[#151516] text-white hover:bg-[#FF3F1A] hover:text-black",
          className
        )}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
