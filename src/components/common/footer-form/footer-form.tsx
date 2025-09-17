"use client";
import Form from "next/form";
import formatPhoneNumber from "@/lib/phone-format";
import { InputField } from "../input-field";


export default function FooterForm({ className }: { className?: string }) {

  return (
    <div className={`${className} w-full @container`}>
      <Form action="#">
        <div className="xs:pr-[20%] md:pr-0 pr-0">
          {/* Name */}
          <InputField
            type="text"
            name="name"
            placeholder="Name"
          />
          <InputField
            type="text"
            name="phone"
            className="mt-7.5 md:mt-10"
            formatFn={formatPhoneNumber}
            placeholder="Phone"
          />
          <InputField
            type="text"
            name="email"
            className="mt-7.5 md:mt-10 "
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-row space-x-5 items-center mt-7.5 md:mt-12.5">
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
