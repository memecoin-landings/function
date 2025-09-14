"use client";
import Form from "next/form";
import { useFormattedInput } from "../use-formatted-input";
import formatPhoneNumber from "@/lib/phone-format";

const inputStyle =
  "w-full px-5 py-2.5 border-b-[0.039rem] md:border-b-1 border-[#F0EDE8] focus:outline-none transition-colors duration-150 focus:border-[#FF3F1A] placeholder-[#727272] text-[0.875rem] xs:text-[clamp(0.875rem,7cqw,1.063rem)] md:text-[clamp(1.063rem,5.5cqw,1.563rem)]";

export default function FooterForm({ className }: { className?: string }) {
  const { prettyValue: prettyPN, onUpdate: onPNUpdate } = useFormattedInput(
    "",
    formatPhoneNumber
  );
  return (
    <div className={`${className} w-full @container`}>
      <Form action="#">
        {/* Name */}
        <input
          type="text"
          id="name"
          //   onChange={(e) => console.log(e.target.value)}
          className={`${inputStyle} mb-7.5 sm:mb-12.5 `}
          placeholder="Name"
          required
        />
        <input
          type="text"
          id="phone"
          className={`${inputStyle} mb-7.5 sm:mb-12.5`}
          onChange={onPNUpdate}
          value={prettyPN}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          id="email"
          className={`${inputStyle} mb-7.5 sm:mb-12.5`}
          placeholder="Email"
          required
        />
        <div className="flex flex-row space-x-5 items-center">
          <button className="text-[#151516] bg-[#F0EDE8] hover:bg-[#FF3F1A] rounded-full px-5 py-0.5 md:px-7.5 md:py-2.5 text-[0.875rem] md:text-[clamp(1.063rem,4.7cqw,1.375rem)] leading-[2.125rem]  transition-colors duration-150  ">
            Send
          </button>
          <p className="text-[#B6BAAF] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem] tracking-[3%] overflow-visible">
            By clicking on the «Send» button, I consent to the processing
            of personal data
          </p>
        </div>
      </Form>
    </div>
  );
}
