"use client";
import React, { useState } from "react";

interface ChipProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function Chip({ text, onClick, className }: ChipProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) onClick();
  };

  return (
    <button
      className={`inline-flex items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full transition-colors 
        ${isSelected ? "bg-[#151516] text-white" : "bg-[#C8C8C8] text-white"} 
        hover:bg-[#FF3F1A] hover:text-black ${className || ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
