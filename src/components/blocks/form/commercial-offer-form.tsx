"use client";
import { cn } from "@/lib/utils";
import ChipRow from "@/components/common/chip-row";
import { InputField } from "@/components/common/input-field";
import React, { useState, useRef } from "react";
import SubmitForm from "./submit-form";
import { IFormViewModel } from "@/domain/form-view-model.interface";
import { useThemeColors } from "@/components/common/use-theme-colors";
import formatPhoneNumber from "@/lib/phone-format";

export default function CommercialOfferForm({
  viewModel,
  className,
}: {
  viewModel: IFormViewModel;
  onSubmit?: () => void;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const colors = useThemeColors();
  
  // Простое форматирование телефона
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
  };

  // Создаем экземпляр view model
  const [selectedBranding, setSelectedBranding] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSecondRowVisible, setIsSecondRowVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Функция валидации email с использованием встроенной HTML5 валидации
  const isValidEmail = (): boolean => {
    if (!emailRef.current) return false;
    return emailRef.current.validity.valid;
  };

  // Обработчик изменения email
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

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

  return (
    <div
      className={cn(
        "flex flex-col xs:flex-row justify-start items-start",
        className
      )}
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
      <div className="w-7.5 shrink-0 grow-0"></div>
      {/* Right container */}
      <div className="flex flex-col items-center grow-1">
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
            <div className="xs:hidden w-9 shrink-0 grow-1"></div>
            <div>
              <InputField
                value={name}
                onChange={setName}
                placeholder="Full Name"
                className="md:mb-12.5 mb-7.5"
              />
              <InputField
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Phone"
                type="tel"
                className="md:mb-12.5 mb-7.5"
              />
              <InputField
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                type="email"
                className="md:mb-12.5 mb-7.5"
                required={true}
              />
              <SubmitForm
                className=""
                disabled={!email.trim() || !isValidEmail()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
