"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Chip } from "./chip";

export default function ChipRow({
  className,
  chipTexts,
}: {
  className?: string;
  chipTexts: string[];
}) {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);

  const handleChipClick = (index: number) => {
    setSelectedChip(index);
  };

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {chipTexts.map((text, index) => (
        <Chip
          key={index}
          text={text}
          onClick={() => handleChipClick(index)}
          className={selectedChip === index ? "bg-[#151516]" : ""}
        />
      ))}
    </div>
  );
}
