"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Chip } from "./chip";
import { ChipOption } from "@/domain/form-view-model.interface";

export default function ChipRow({
  className,
  chipOptions,
  selectedIds,
  onChipClick,
  singleSelection = false,
}: {
  className?: string;
  chipOptions: ChipOption[];
  selectedIds: string[];
  onChipClick: (id: string) => void;
  singleSelection?: boolean;
}) {
  const handleChipClick = (id: string) => {
    if (singleSelection) {
      // Для одиночного выбора - заменяем текущий выбор
      onChipClick(id);
    } else {
      // Для множественного выбора - переключаем состояние
      onChipClick(id);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-5", className)}>
      {chipOptions.map((option) => (
        <Chip
          key={option.id}
          text={option.text}
          onClick={() => handleChipClick(option.id)}
          isSelected={selectedIds.includes(option.id)}
        />
      ))}
    </div>
  );
}
