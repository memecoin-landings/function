"use client";
import { cn } from "@/lib/utils";
import ChipRow from "@/components/common/chip-row";
import { InputField } from "@/components/common/input-field";
import { useState, useEffect } from "react";
import FormHeader from "./form-header";
import SubmitForm from "./submit-form";

export default function FormModal({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enable transition on mount
    setIsVisible(true);

    // Disable scroll on body
    document.body.style.overflow = "hidden";

    // Cleanup: Restore original overflow style
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <section
        className={cn(
          "relative bg-white shadow-xl w-full h-full p-6 overflow-y-auto transition-all duration-300 ease-in-out",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
      >
        <FormHeader onClose={onClose} />
        <div
          className="flex flex-col xs:flex-row justify-start items-start 
          md:px-34.5 xs:px-18 px-11
          md:pt-16 xs:pt-13.5 pt-12"
        >
          {/* Left container */}
          <div className="grow-0 items-start text-black justify-start">
            <p
              className="font-cera-pro font-medium 
              md:text-[2.5rem] xs:text-[1.625rem] text-[1.5625rem] 
              md:leading-[3.125rem] xs:leading-8 leading-7.5 
              tracking-normal text-nowrap"
            >
              Request for <br />a commercial <br className="hidden xs:block" />
              offer
            </p>
          </div>
          {/* Spacer between containers */}
          <div className="w-29.75"></div>
          {/* Right container */}
          <div className="grow-1 max-w-[453px] flex-col pt-3">
            <div>
              <h3 className="font-cera-pro font-medium text-[1.5rem] leading-[2rem] mb-4 text-black text-nowrap">
                What's Your Branding?
              </h3>
              <ChipRow
                chipTexts={[
                  "Corporate",
                  "Product",
                  "Campaign",
                  "Personal",
                  "Support",
                ]}
              />
            </div>
            <div>
              <h3 className="font-cera-pro font-medium text-[1.5rem] leading-[2rem] mb-4 text-black pt-7.5 text-nowrap">
                What We Offer
              </h3>
              <ChipRow
                chipTexts={[
                  "Naming",
                  "Logo",
                  "Brand Guidelines",
                  "UI/UX",
                  "Content Design",
                ]}
              />
            </div>
            <div className="h-12.5"></div>
            <InputField
              value={name}
              onChange={setName}
              placeholder="Full Name"
            />
            <InputField
              value={phone}
              onChange={setPhone}
              placeholder="Phone"
              type="tel"
            />
            <InputField
              value={email}
              onChange={setEmail}
              placeholder="Email"
              type="email"
              required={true}
            />
            <SubmitForm />
          </div>
        </div>
      </section>
    </div>
  );
}
