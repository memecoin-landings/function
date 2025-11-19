"use client";
import { cn } from "@/lib/utils";
import ChipRow from "@/components/common/chip-row";
import { InputField } from "@/components/common/input-field";
import React, { useState, useRef } from "react";
import SubmitForm from "./submit-form";
import { IFormViewModel } from "@/domain/form-view-model.interface";
import { useThemeColors } from "@/components/common/use-theme-colors";
import formatPhoneNumber from "@/lib/phone-format";
import submitCommercialOfferAction, { CommercialOfferFormData } from "@/server/actions/commercialOfferAction";
import useToast from "@/components/common/use-toast";

export default function CommercialOfferForm({
  viewModel,
  className,
}: {
  viewModel: IFormViewModel;
  onSubmit?: () => void;
  className?: string;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const colors = useThemeColors();
  const formRef = useRef<HTMLFormElement>(null);

  // Создаем экземпляр view model
  const [selectedBranding, setSelectedBranding] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSecondRowVisible, setIsSecondRowVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [invalidSend, setInvalidSend] = useState(false);

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

  const handleSubmit = async () => {
    if (isSubmitting || !formRef.current) return;

    setIsSubmitting(true);
    if (!(nameValid && phoneValid && emailValid)) {
      setInvalidSend(true);
      showToast(
        "Some fields are missing or invalid. Please check and try again.",
        true
      );
      setIsSubmitting(false);
      return;
    }
    setInvalidSend(false);

    try {
      const formData = Object.fromEntries(new FormData(formRef.current).entries()) as unknown as CommercialOfferFormData;
      const result = await submitCommercialOfferAction(formData);

      showToast(result.message, !result.success);
      if (result.success) {
        formRef.current.reset();
        setName("");
        setPhone("");
        setEmail("");
        setSelectedBranding(null);
        setSelectedServices([]);
        setIsSecondRowVisible(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "Failed to submit the form. Please try again later.",
        true
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row justify-start items-start",
        className
      )}
    >
      {/* Left container */}
      <div className="grow-0 items-start text-[#151516] justify-start">
        <p
          className={cn(
            "font-cera-pro font-medium md:text-[2.5rem] sm:text-[1.625rem] text-[1.5625rem] md:leading-[3.125rem] sm:leading-8 leading-7.5 tracking-normal text-nowrap",
            colors.textPrimary
          )}
        >
          Request for <br />a commercial <br className="hidden sm:block" />
          offer
        </p>
      </div>
      <div className="w-7.5 shrink-0 grow-0"></div>
      {/* Right container */}
      <div className="flex flex-col items-center grow-1">
        <form noValidate ref={formRef} className="grow-1 max-w-[30.3125rem] flex-col md:pt-2.25 sm:pt-1.25 pt-7.5" action={() => { }}>
          <div>
            <h3
              className={cn(
                "font-cera-pro font-medium text-[1.125rem] md:text-[1.875rem] md:mb-5 mb-5 sm:mb-4.5 text-nowrap",
                colors.textPrimary
              )}
            >
              What&apos;s Your Branding?
            </h3>
            <ChipRow
              name="branding"
              chipOptions={viewModel.brandingOptions}
              selectedIds={selectedBranding ? [selectedBranding] : []}
              onChipClick={handleBrandingSelect}
              singleSelection={true}
            />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${isSecondRowVisible
              ? "opacity-100 translate-y-0 max-h-96"
              : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
              }`}
          >
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <h3
                className={cn(
                  "sm:pt-7 pt-7 font-cera-pro font-medium text-[1.125rem] md:text-[1.875rem] sm:mb-4.5 mb-4.25 text-nowrap",
                  colors.textPrimary
                )}
              >
                What We Offer
              </h3>
              <ChipRow
                name="services"
                chipOptions={viewModel.currentServiceOptions}
                selectedIds={selectedServices}
                onChipClick={handleServiceToggle}
                singleSelection={false}
              />
            </div>
          </div>

          <div className="sm:h-10 h-12.5"></div>
          <div className="flex flex-row justify-start items-start">
            {/* Spacer between containers */}
            <div>
              <InputField
                name="name"
                value={name}
                onChange={setName}
                onValidChange={setNameValid}
                showRequiredHint={invalidSend}
                placeholder="Full Name"
                className="md:mb-12.5 mb-5.5"
                required={true}
              />
              <InputField
                name="phone"
                value={phone}
                onChange={setPhone}
                formatFn={formatPhoneNumber}
                onValidChange={setPhoneValid}
                showRequiredHint={invalidSend}
                pattern="\+[0-9\s]{10,17}"
                placeholder="Phone"
                type="tel"
                className="md:mb-12.5 mb-5.5"
                required={true}
              />
              <InputField
                name="email"
                value={email}
                onChange={setEmail}
                ref={emailRef}
                onValidChange={setEmailValid}
                showRequiredHint={invalidSend}
                placeholder="Email"
                type="email"
                className="md:mb-12.5 mb-7.5"
                required={true}
              />
              <SubmitForm
                className=""
                disabled={
                  !(nameValid && phoneValid && emailValid) || isSubmitting
                }
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
