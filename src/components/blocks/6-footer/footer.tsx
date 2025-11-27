"use client";
import BehanceIcon from "@/components/common/behance-icon";
import FooterForm from "@/components/common/footer-form/footer-form";
import InstagramIcon from "@/components/common/instagram-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";
import DribbleIcon from "@/components/common/unknown-cw";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ThemeProvider } from "@/components/common/theme-context";
import GlowEffect from "./glow-effect";
import { useContacts } from "@/hooks/use-contacts";

export default function Footer({ className }: { className: string }) {
  const contacts = useContacts();
  return (
    <footer
      className={cn(
        className,
        "w-full bg-black md:pt-25 pt-11.5 relative @container overflow-hidden **:transition-colors"
      )}
    >
      <div className="z-5 relative fluid-container @container">
        <Link
          href={"mailto:" + contacts.email}
          target="_blank"
          // было 7.495cqw, но на хроме из-за этого вылезал, не понятно в чем дело
          className="mx-auto block text-center text-[#F0EDE8] duration-150 hover:text-[#FF3F1A] whitespace-nowrap md:text-[7cqw] text-[7.32cqw] tracking-mid underline-offset-[1.9cqw] underline font-medium decoration-solid"
        >
          {contacts.email}
        </Link>
        <div className="flex flex-row items-center space-x-5 justify-center text-[0.75rem] xs:text-[0.875rem] tracking-mid mt-4.25 xs:mt-7.75 md:mt-12.5 ">
          <div className="text-[3cqw] xs:text-[1.9cqw] md:text-[1.25rem] text-nowrap">
            Contact via Messenger:
          </div>
          <Link
            className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A]  md:text-[1.25rem] items-center space-x-2.5"
            href={contacts.socialLinks.whatsapp ?? "#"}
            target="_blank"
          >
            <WhatsappCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
            WhatsApp
          </Link>
          <Link
            className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A] md:text-[1.25rem] items-center space-x-2.5"
            href={contacts.socialLinks.telegram ?? "#"}
            target="_blank"
          >
            <TelegramCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
            Telegram
          </Link>
        </div>
        <div className="flex flex-col px-8.75 xs:px-16 md:px-[8.5cqw] xs:mt-15 mt-12.25 md:mt-25">
          <div className="flex flex-row w-full">
            <p className="w-[42.2cqw] text-[1.563rem] font-medium leading-[1.938rem] xs:text-[4.8cqw] xs:leading-[6.1cqw] md:text-[3.8cqw] md:leading-[4.7cqw]">
              Order
              <br />
              a&nbsp;service
            </p>

            <ThemeProvider theme="dark">
              <FooterForm className="flex flex-row w-[58cqw] max-xs:ml-9.5 xs:w-1/2 xs:max-w-[98cqw] md:w-38cqw md:max-w-[28.313rem] xs:mt-2 md:mt-1" />
            </ThemeProvider>
          </div>
          <div className="flex flex-row w-full md:items-center items-start md:mt-20 xs:mt-17 mt-12.5 pb-12.5">
            <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center md:space-x-5 space-x-2.5 xs:gap-y-3 pr-[6.3cqw] lg:pr-0 tracking-mid ">
              <p className="text-[2.7cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,2.4cqw,1.25rem)] whitespace-nowrap tracking-mid">
                Discover our work on:
              </p>
              <div className="flex flex-row space-x-2.5 sm:space-x-5 ">
                <Link
                  href={contacts.socialLinks.instagram ?? "#"}
                  target="_blank"
                >
                  <InstagramIcon className="w-6.25 md:w-8.75 md:h-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
                <Link
                  href={contacts.socialLinks.behance ?? "#"}
                  target="_blank"
                >
                  <BehanceIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
                <Link
                  href={contacts.socialLinks.dribbble ?? "#"}
                  target="_blank"
                >
                  <DribbleIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
              </div>
            </div>
            <div className="flex flex-row w-[58cqw] xs:w-1/2 xs:items-center pt-1 text-[#727272] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem]">
              © Functional Design Studio. All rights reserved
            </div>
          </div>
        </div>
      </div>
      <GlowEffect />
    </footer>
  );
}
