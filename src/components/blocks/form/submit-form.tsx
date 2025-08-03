"use client";
import { cn } from "@/lib/utils";

interface SubmitFormProps {
  onSend?: () => void;
  className?: string;
}

export default function SubmitForm({ onSend, className }: SubmitFormProps) {
  const handleClick = () => {
    if (onSend) onSend();
  };

  return (
    <div className={cn("flex flex-row", className)}>
      <button
        className={`inline-flex h-9.5 items-center px-5 text-sm py-0.5 font-normal leading-[2.125rem] text-nowrap tracking-[0%] rounded-full transition-colors 
        bg-[#151516] text-white     
        hover:bg-[#FF3F1A] hover:text-black ${className || ""}`}
        onClick={handleClick}
      >
        Send
      </button>
      <p
        className="text-black pl-5 
        md:pl-7.5 md:text-sm xs:text-[0.5625rem] text-[0.4375rem]
        md:leading-5 xs:leading-3.25 leading-2.5"
      >
        By clicking on the «Send» button, I consent to the processing
        of personal data
      </p>
    </div>
  );
}
