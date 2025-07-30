import Image from "next/image";
import fedorImage from "../../../../public/ava_1.jpg";
import TelegramIcon from "@/components/common/icons/telegram-icon";
import WhatsappIcon from "@/components/common/icons/whatsapp-icon";
import LinkedinIcon from "@/components/common/icons/linkedin-icon";

export default function FedorBlock({ className }: { className?: string }) {
  return (
    <section
      className={`${className} w-full bg-[#151516] pt-[4.375rem] pb-17.5 md:pb-25 lg:pb-50 fluid-container @container`}
    >
      <div className="w-full flex relative items-center justify-end mb-7.5 md:mb-11.5 xl:mb-18.25">
        <div className="w-full absolute top-1/2 left-0 transform -translate-y-1/2 z-20 pr-4">
          <div className="@container">
            <div className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[19cqw] md:text[18.7cqw] xl:text-[19.2cqw] whitespace-nowrap">
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
      <div className="text-[#F0EDE8] px-[10cqw] xl:px-[8.2cqw]">
        <div className=" mb-3.75 md:mb-7.5 xl:mb-12.5 max-w-[27rem] md:max-w-[50.5rem] md:min-w-[27rem] md:w-[57.7cqw] @container">
          <p className="text-[clamp(0.875rem,4cqw,1.25rem)] md:text-[clamp(1.25rem,4.6cqw,1.875rem)] leading-[clamp(1.188rem,5.6cqw,1.625rem)] md:leading-[clamp(1.625rem,6cqw,2.438rem)]">
          Founder and owner of Function Design Studio. Multidisciplinary
          designer & art director, focused on brand identity & UI / UX design.
          Working in the field since 2008
          </p>
        </div>
      <div className="flex flex-row items-center">
        <div className="text-[#F0EDE8] text-[0.75rem] tracking-[-3%] md:text-[0.875rem] lg:text-[1.25rem]">
          Get in touch with me through:
        </div>
        <div className="flex flex-row space-x-3.75 ml-3.75 lg:space-x-5 lg:ml-5">
          <TelegramIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75" />
          <WhatsappIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75" />
          <LinkedinIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75" />
        </div>
      </div>
      </div>
    </section>
  );
}
