"use client";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/common/use-theme-colors";

interface SubmitFormProps {
  onSend?: () => void;
  className?: string;
}

export default function SubmitForm({ onSend, className }: SubmitFormProps) {
  const colors = useThemeColors();
  const handleClick = () => {
    if (onSend) onSend();
  };

  return (
    <div className={cn("flex flex-row items-center justify-center", className)}>
      <button
        className={cn(
          "inline-flex items-center justify-center md:px-7.5 md:py-2.5 px-5 py-0.5 text-sm leading-8.5 md:text-[1.375rem] font-normal text-nowrap tracking-[0%] rounded-full transition-colors",
          colors.buttonBg,
          colors.buttonText,
          colors.conditional(
            "hover:bg-[#FF3F1A] hover:text-black",
            "hover:bg-[#FF3F1A] hover:text-black"
          ),
          className || ""
        )}
        onClick={handleClick}
      >
        Send
      </button>
      <p
        className={cn(
          "pl-5 md:pl-7.5 md:text-sm xs:text-[0.5625rem] text-[0.4375rem] md:leading-5 xs:leading-3.25 leading-2.5",
          colors.textPrimary
        )}
      >
        By clicking on the «Send» button, I consent to the processing
        of personal data
      </p>
    </div>
  );
}
