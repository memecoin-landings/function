"use client";
import { cn } from "@/lib/utils";
import { Ref, useState } from "react";
import FormHeader from "./form-header";
import CommercialOfferForm from "./commercial-offer-form";
import { IFormViewModel } from "@/domain/form-view-model.interface";
import { useThemeColors } from "@/components/common/use-theme-colors";

export default function FormModal({
  className,
  ref,
  onClose,
  viewModel,
}: {
  className?: string;
  ref?: Ref<HTMLDivElement> | undefined;
  onClose?: () => void;
  viewModel: IFormViewModel;
}) {
  const colors = useThemeColors();

  // Обработчик закрытия с очисткой состояния
  const handleClose = () => {
    // Очищаем view model
    viewModel.clearSelection();

    // Вызываем оригинальный onClose
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={className}>
      <div
        ref={ref}
        className={cn(
          "relative shadow-xl w-full h-full max-h-full p-6 overflow-scroll",
          colors.bgPrimary
        )}
      >
        <FormHeader onClose={handleClose} />
        <CommercialOfferForm className="md:pt-16 xs:pt-13.5 pt-12 md:px-40 sm:px-13 px-6.25" viewModel={viewModel} />
      </div>
    </div>
  );
}
