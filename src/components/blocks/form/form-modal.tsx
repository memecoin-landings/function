"use client";
import { cn } from "@/lib/utils";
import ChipRow from "@/components/common/chip-row";
import { InputField } from "@/components/common/input-field";
import { Ref, useState } from "react";
import FormHeader from "./form-header";
import SubmitForm from "./submit-form";
import { FormViewModel } from "@/domain/form-view-model";
import { useThemeColors } from "@/components/common/use-theme-colors";

export default function FormModal({
  className,
  ref,
  onClose,
}: {
  className?: string;
  ref?: Ref<HTMLDivElement> | undefined;
  onClose?: () => void;
}) {
  const colors = useThemeColors();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Создаем экземпляр view model
  const [viewModel] = useState(() => new FormViewModel());
  const [selectedBranding, setSelectedBranding] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSecondRowVisible, setIsSecondRowVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBrandingSelect = async (brandingId: string) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (isSecondRowVisible) {
      setIsSecondRowVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    viewModel.selectBranding(brandingId);
    setSelectedBranding(viewModel.selectedBranding);
    setSelectedServices([...viewModel.selectedServices]);
    setIsSecondRowVisible(viewModel.isSecondRowVisible);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleServiceToggle = (serviceId: string) => {
    viewModel.toggleService(serviceId);
    setSelectedServices([...viewModel.selectedServices]);
  };

  // Обработчик закрытия с очисткой состояния
  const handleClose = () => {
    // Очищаем view model
    viewModel.clearSelection();

    // Очищаем локальное состояние
    setSelectedBranding(null);
    setSelectedServices([]);
    setIsSecondRowVisible(false);
    setIsAnimating(false);

    // Очищаем поля формы
    setName("");
    setPhone("");
    setEmail("");

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
        <div
          className="flex flex-col xs:flex-row justify-center items-start 
          md:pt-16 xs:pt-13.5 pt-12"
        >
          {/* Left container */}
          <div className="grow-0 items-start text-black justify-start">
            <p
              className={cn(
                "font-cera-pro font-medium md:text-[2.5rem] xs:text-[1.625rem] text-[1.5625rem] md:leading-[3.125rem] xs:leading-8 leading-7.5 tracking-normal text-nowrap",
                colors.textPrimary
              )}
            >
              Request for <br />a commercial <br className="hidden xs:block" />
              offer
            </p>
          </div>
          {/* Spacer between containers */}
          <div className="w-29.75 min-w-5"></div>
          {/* Right container */}
          <div className="grow-1 max-w-[485px] flex-col pt-3">
            <div>
              <h3
                className={cn(
                  "font-cera-pro font-medium text-[1.125rem] md:text-[1.875rem] mb-5 text-nowrap",
                  colors.textPrimary
                )}
              >
                What&apos;s Your Branding?
              </h3>
              <ChipRow
                chipOptions={viewModel.brandingOptions}
                selectedIds={selectedBranding ? [selectedBranding] : []}
                onChipClick={handleBrandingSelect}
                singleSelection={true}
              />
            </div>

            {/* Второй ряд с услугами - улучшенная анимация */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isSecondRowVisible
                  ? "opacity-100 translate-y-0 max-h-96"
                  : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
              }`}
            >
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <h3
                  className={cn(
                    "pt-7.5 font-cera-pro font-medium text-[1.125rem] md:text-[1.875rem] mb-5 text-nowrap",
                    colors.textPrimary
                  )}
                >
                  What We Offer
                </h3>
                <ChipRow
                  chipOptions={viewModel.currentServiceOptions}
                  selectedIds={selectedServices}
                  onChipClick={handleServiceToggle}
                  singleSelection={false}
                />
              </div>
            </div>

            <div className="h-12.5"></div>
            <div className="flex flex-row justify-center items-start">
              <div className="grow-0 items-start text-black justify-start">
                <p
                  className={cn(
                    "xs:hidden font-cera-pro font-medium md:text-[2.5rem] xs:text-[1.625rem] text-[1.5625rem] md:leading-[3.125rem] xs:leading-8 leading-7.5 tracking-normal text-nowrap",
                    colors.textPrimary
                  )}
                >
                  Order
                  <br />a service
                </p>
              </div>
              {/* Spacer between containers */}
              <div className="xs:hidden max-w-9"></div>
              <div>
                <InputField
                  value={name}
                  onChange={setName}
                  placeholder="Full Name"
                  className="mb-13"
                />
                <InputField
                  value={phone}
                  onChange={setPhone}
                  placeholder="Phone"
                  type="tel"
                  className="mb-13"
                />
                <InputField
                  value={email}
                  onChange={setEmail}
                  placeholder="Email"
                  type="email"
                  className="mb-12.5"
                  required={true}
                />
                <SubmitForm className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
