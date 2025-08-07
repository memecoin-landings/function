"use client";
import React from "react";

interface ChipProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

export function Chip({ text, onClick, className, isSelected = false }: ChipProps) {
  return (
    <button
      className={`inline-flex items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full transition-colors 
        ${isSelected ? 'bg-[#151516] text-white' : 'bg-[#C8C8C8] text-white'}
        hover:bg-[#FF3F1A] hover:text-black ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
