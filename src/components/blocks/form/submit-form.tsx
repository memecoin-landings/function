"use client";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/common/use-theme-colors";

interface SubmitFormProps {
  onSend?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function SubmitForm({
  onSend,
  className,
  disabled = false,
}: SubmitFormProps) {
  const colors = useThemeColors();
  const handleClick = () => {
    if (onSend && !disabled) onSend();
  };

  return (
    <div className={cn("flex flex-row items-center justify-center", className)}>
      <button
        {...colors.buttonProps}
        className={cn(
          "inline-flex items-center justify-center md:px-7.5 md:py-2.5 px-5 py-0.5 text-sm leading-8.5 md:text-[1.375rem] font-normal text-nowrap tracking-[0%] rounded-full transition-colors",
          disabled ? colors.buttonDisabledBg : colors.buttonBg,
          // disabled ? colors.buttonDisabledText : colors.buttonText,
          colors.buttonText,
          colors.conditional(
            "hover:bg-[#FF3F1A] hover:text-[#151516]",
            "hover:bg-[#FF3F1A] hover:text-[#151516]",
            "hover:bg-[#151516] hover:text-[#F0EDE8]"
          ),
          disabled ? "cursor-not-allowed" : "",
          className
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        Send
      </button>
      <p
        className={cn(
          "ml-5 md:ml-7.5 md:text-sm xs:text-[0.5625rem] text-[0.4375rem] md:leading-5 xs:leading-3.25 leading-2.5 tracking-[-3%]",
          colors.textPrimary
        )}
      >
        By clicking on the «Send» button, I consent to the processing
        of personal data{" "}
      </p>
    </div>
  );
}
