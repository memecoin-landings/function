import Image from "next/image";
import fedorImage from "../../../../public/ava_1.jpg";
import TelegramIcon from "@/components/common/icons/telegram-icon";
import WhatsappIcon from "@/components/common/icons/whatsapp-icon";
import LinkedinIcon from "@/components/common/icons/linkedin-icon";

export default function FedorBlock({ className }: { className?: string }) {
  return (
    <section
      className={`${className} w-full bg-[#151516] pt-[4.375rem] fluid-container`}
    >
      <div className="w-full flex relative items-center justify-end mb-7.5">
        <div className="w-full absolute top-1/2 left-0 transform -translate-y-1/2 z-20 pr-4">
          <div className="@container">
            <div className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[19cqw] whitespace-nowrap">
              Fëdor <br />
              Beltugov —
            </div>
          </div>
        </div>
        <Image
          src={fedorImage}
          alt=""
          className="object-cover object-center w-[38cqw] rounded-[0.313rem] grayscale hover:filter-none"
          layout="cover"
        />
      </div>
      <div className="text-[#F0EDE8] px-8.75 @container ">
        <div className="text-[4cqw] leading-[5.6cqw] mb-3.75">
          Founder and owner of Function Design Studio. Multidisciplinary
          designer & art director, focused on brand identity & UI / UX design.
          Working in the field since 2008
        </div>
      <div className="flex flex-row items-center">
        <div className="text-[#F0EDE8] text-[0.75rem]">
          Get in touch with me through:
        </div>
        <div className="flex flex-row space-x-3.75 ml-3.75">
          <TelegramIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25" />
          <WhatsappIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25" />
          <LinkedinIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25" />
        </div>
      </div>
      </div>
    </section>
  );
}
