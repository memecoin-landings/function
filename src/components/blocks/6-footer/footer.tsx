import BehanceIcon from "@/components/common/behance-icon";
import InstagramIcon from "@/components/common/instagram-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";
import UnknownIcon from "@/components/common/unknown-cw";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";

export default function Footer({ emailAddress }: { emailAddress: string }) {
  return (
    <footer className="w-full bg-black pt-12.5"><div className="fluid-container">
      <div className="@container px-3.75 xs:p-9.25 mb-5 max-w-[120rem]">
        <div className="text-[#FF3F1A] whitespace-nowrap text-[7.49cqw] tracking-[-3%] ">
          {emailAddress}
        </div>
      </div>
      <div className="px-11.25">
        <div className="flex flex-row space-x-5 xs:justify-center text-[0.75rem] xs:text-[0.875rem] tracking-[-3%] pb-12.5 @container">
          <div className="flex items-center">
            <p className="flex items-center text-[3.5cqw] xs:text-[clamp(0.75rem,3.5cqw,0.875rem)] text-nowrap">
              Contact via Messenger:
            </p>
          </div>

          <div className="flex flex-row font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A] items-center">
            <WhatsappCircleIcon className="w-6.25 pr-2.5" />
            <p>WhatsApp</p>
          </div>
          <div className="flex flex-row font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A] items-center">
            <TelegramCircleIcon className="w-6.25 pr-2.5" />
            <p>Telegram</p>
          </div>

        </div>
      </div>
      <div className="flex flex-col px-11.25">
        <div className="flex flex-row w-full @container pb-12.5">
          <div className="flex w-[42cqw] xs:w-1/2 ">
            <p className="text-[1.563rem] leading-[1.938rem] tracking-[0%]">
              Order <br /> a service
            </p>
          </div>
          <div className="flex flex-row w-[58cqw] xs:w-1/2 xs:max-w-[98cqw]">
            <div className="w-full h-[10rem] bg-[#FF3F1A]">Form</div>
          </div>
        </div>
        <div className="flex flex-row w-full @container items-center pb-12.5">
          <div className="flex flex-row w-[42cqw] xs:w-1/2 items-center space-x-5">
            <p className="text-[0.75rem] tracking-[-3%]">
              Discover our work on:
            </p>
            <InstagramIcon className="w-6.25   fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
            <BehanceIcon className="w-6.25  fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
            <UnknownIcon className="w-6.25  fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
          </div>
          <div className="flex flex-row w-[58cqw] xs:w-1/2 items-center pt-1">
            <div className="text-[#727272] text-[0.438rem]">
              © Functional Design Studio. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div></footer>
  );
}
