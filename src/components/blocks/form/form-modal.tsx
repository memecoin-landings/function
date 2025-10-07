"use client";
import { cn } from "@/lib/utils";
import { Ref, useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);

  // Обработчик закрытия с очисткой состояния
  const handleClose = () => {
    // Очищаем view model
    viewModel.clearSelection();

    // Вызываем оригинальный onClose
    if (onClose) {
      onClose();
    }
  };

  // Перехватываем скролл в модальном окне
  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      modalElement.scrollTop += delta;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Разрешаем touch события для скролла внутри модального окна
      e.stopPropagation();
    };

    modalElement.addEventListener("wheel", handleWheel, { passive: false });
    modalElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      modalElement.removeEventListener("wheel", handleWheel);
      modalElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={(node) => {
          modalRef.current = node;
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
        }}
        className={cn(
          "relative shadow-xl w-full h-full overflow-y-auto overscroll-contain",
          colors.bgPrimary
        )}
      >
        <div className="md:p-8 xs:p-4 p-3 max-w-7xl mx-auto">
          <FormHeader onClose={handleClose} />
          <CommercialOfferForm
            className="md:pt-16 xs:pt-13.5 pt-12 md:px-[4cqw] xs:px-[3cqw] px-[2cqw]"
            viewModel={viewModel}
          />
        </div>
      </div>
    </div>
  );
}
