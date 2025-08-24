"use client";
import BehanceIcon from "@/components/common/behance-icon";
import FooterForm from "@/components/common/footer-form/footer-form";
import InstagramIcon from "@/components/common/instagram-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";
import DribbleIcon from "@/components/common/unknown-cw";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

import Contacts from "../../../domain/contacts";
import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";

export default function Footer({
  className,
}: {
  className: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowEffect = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const glowElement = glowEffect.current;
    if (!glowElement) return;

    // Создаем анимацию, но не запускаем её автоматически
    animate(glowElement, {
      opacity: [0, 1],
      scale: [0.8, 1],
      y: [100, 0], // Анимация снизу вверх
      duration: 1200,
      easing: "easeOutCubic",
      autoplay: onScroll({
        container: document.body,
        sync: true,
        debug: false,
        enter: "bottom 70%",
        leave: "bottom 95%",
        target: section,
      }),
    });
  }, []);

  return (
    <footer ref={sectionRef} className={cn(className, "w-full bg-black md:pt-25 pt-12.5 relative @container overflow-hidden **:transition-colors")}>
      <div className="z-5 relative fluid-container @container">
        <div className="@container mb-5 md:mb-16.5 w-full text-center ">
          <Link
            href={"mailto:" + Contacts.email}
            // было 7.495cqw, но на хроме из-за этого вылезал, не понятно в чем дело
            className="text-[#F0EDE8] duration-150 hover:text-[#FF3F1A] whitespace-nowrap text-[7cqw] tracking-[-3%] underline-offset-[1.9cqw] underline font-medium decoration-solid"
          >
            {Contacts.email}
          </Link>
        </div>
        <div className="px-11.25 pb-12.5 md:pb-25">
          <div className="flex flex-row space-x-5 xs:justify-center text-[0.75rem] xs:text-[0.875rem] tracking-[-3%]   @container">
            <div className="flex items-center">
              <p className="flex items-center text-[3.5cqw] xs:text-[clamp(0.75rem,3.5cqw,0.875rem)] md:text-[1.25rem] text-nowrap">
                Contact via Messenger:
              </p>
            </div>

            <Link href={Contacts.socialLinks.whatsapp}>
              <div className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A]  md:text-[1.25rem] items-center space-x-2.5">
                <WhatsappCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
                <p>WhatsApp</p>
              </div>
            </Link>
            <Link href={Contacts.socialLinks.telegram}>
              <div className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A] md:text-[1.25rem] items-center space-x-2.5">
                <TelegramCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
                <p>Telegram</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col px-8.75 md:px-[7.6cqw]">
          <div className="flex flex-row w-full @container pb-12.5">
            <div className="flex w-[42cqw] xs:w-1/2 ">
              <p className="text-[1.563rem] font-medium leading-[1.938rem] tracking-[0%] xs:text-[5.8cqw] xs:leading-[7cqw] md:text-[clamp(2.25rem,4.6cqw,3.375rem)] md:leading-[4.7cqw]">
                Order <br /> a service
              </p>
            </div>

            <div className="flex flex-row w-[58cqw] xs:w-1/2 xs:max-w-[98cqw] ">
              <div className="w-full md:w-38cqw md:max-w-[28.313rem]">
                <FooterForm />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full @container items-center pb-12.5">
            <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center space-x-5 @container pr-[6.3cqw] md:pr-0">
              <p className="text-[8.6cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,2.4cqw,1.25rem)] tracking-[-3%] mb-2.5 md:mb-0 whitespace-nowrap">
                Discover our work on:
              </p>
              <div className="flex flex-row space-x-2.5 md:space-x-5">
                <Link href={Contacts.socialLinks.instagram}>
                  <InstagramIcon className="w-6.25 md:w-8.75 md:h-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
                <Link href={Contacts.socialLinks.behance}>
                  <BehanceIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
                <Link href={Contacts.socialLinks.dribbble}>
                  <DribbleIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                </Link>
              </div>
            </div>
            <div className="flex flex-row w-[58cqw] xs:w-1/2 items-center pt-1">
              <div className="text-[#727272] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem]">
                © Functional Design Studio. All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={glowEffect} className="z-0 absolute left-1/2 transform -translate-x-1/2 top-[60%] w-[85.7%] h-[85.7cqw] border rounded-[50%]  bg-[radial-gradient(circle_at_0%_100%,#FF3F1A_0%,#FF5921_100%)] [filter:blur(400px)]"></div>
    </footer>
  );
}


