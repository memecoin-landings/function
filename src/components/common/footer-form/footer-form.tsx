"use client";
import Form from "next/form";
import formatPhoneNumber from "@/lib/phone-format";
import { InputField } from "../input-field";
import { useEffect, useRef, useState } from "react";
import useToast from "../use-toast";
import submitCommercialOfferAction from "@/server/actions/commercialOfferAction";
import { FormViewModel } from "@/domain/form-view-model";


export default function FooterForm({ className }: { className?: string }) {
  const [viewModel] = useState(() => new FormViewModel());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Создаем экземпляр view model
  const [selectedBranding, setSelectedBranding] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsValid(name.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      isValidEmail());
  }, [name, phone, email]);

  // Функция валидации email с использованием встроенной HTML5 валидации
  const isValidEmail = (): boolean => {
    if (!emailRef.current) return false;
    return emailRef.current.validity.valid;
  };

  // Обработчик изменения email
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!email.trim() || !isValidEmail()) {
      showToast("Пожалуйста, введите корректный email", true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        branding: selectedBranding,
        services: selectedServices,
      };

      setSent(true);
      const result = await submitCommercialOfferAction(formData);

      if (result.success) {
        showToast(result.message, false);

        // Очищаем форму
        setName("");
        setPhone("");
        setEmail("");
        viewModel.clearSelection();
        setSelectedBranding(null);
        setSelectedServices([]);
      } else {
        showToast(result.message, true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "Failed to send. Please try again.",
        true
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className={`${className} w-full @container`}>
      {!sent ?
        (<Form action={handleSubmit} >
          <div className="xs:pr-[20%] md:pr-0 pr-0">
            {/* Name */}
            <InputField
              value={name}
              type="text"
              required
              name="name"
              onChange={setName}
              placeholder="Name"
            />
            <InputField
              value={phone}
              type="tel"
              required
              name="phone"
              className="mt-5 md:mt-9.5"
              onChange={setPhone}
              formatFn={formatPhoneNumber}
              placeholder="Phone"
            />
            <InputField
              value={email}
              ref={emailRef}
              type="email"
              name="email"
              onChange={handleEmailChange}
              className="mt-5 md:mt-9.5 "
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-row space-x-5 md:space-x-7.5 items-center mt-7.5 md:mt-12.5">
            <button disabled={!isValid} className="text-[#151516] disabled:bg-[#727272] bg-[#F0EDE8] not-disabled:hover:bg-[#FF3F1A] rounded-full px-5 py-0.5 md:px-7.5 md:py-2.5 text-[0.875rem] md:text-[4.7cqw] leading-[2.125rem]  transition-colors duration-150  ">
              Send
            </button>
            <p className="text-[#B6BAAF] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem] tracking-[-3%] overflow-visible">
              By clicking on the «Send» button, I consent to the processing
              of personal data
            </p>
          </div>
        </Form>) : (
          <div className="text-[white]  text-2xl font-medium tracking-[-3%]">
            Thank you. <br />
            Your message has been received.
            <br /><br />
            <button className="underline underline-offset-6 font-normal hover:text-[#FF3F1A]" onClick={() => setSent(false)}>New message</button>
          </div>
        )}
    </div>
  );
}
