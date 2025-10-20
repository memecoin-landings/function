"use client";

import Image from "next/image";
import fedorImage from "../../../../public/ava_1.jpg";
import TelegramIcon from "@/components/common/icons/telegram-icon";
import WhatsappIcon from "@/components/common/icons/whatsapp-icon";
import LinkedinIcon from "@/components/common/icons/linkedin-icon";
import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";
import pushIfNotNull from "@/lib/push-if-not-null";
import Link from "next/link";
import { useContacts } from "@/hooks/use-contacts";

export default function FedorBlock({ className }: { className?: string }) {
  const contacts = useContacts();
  const elementsRef = useRef<HTMLElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(elementsRef.current, {
      opacity: [0, 1],
      scale: [0.8, 1],
      translateX: { from: stagger(["-25vw", "25vw"]), to: "0" },
      duration: 1000,
      easing: "easeInOutQuad",
      delay: 0,
      debug: true,
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${className} w-full overflow-hidden`}
    >
      <div className="fluid-container @container">
        <div className="w-full flex relative items-center justify-end mb-7.5 md:mb-11.5 xl:mb-18.25">
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="
            w-full absolute top-1/2 left-0 transform -translate-y-1/2 z-20 pr-4
            pointer-events-none @container
            text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[19cqw] md:text[18.7cqw] xl:text-[19.2cqw] whitespace-nowrap
            "
          >
            Fëdor <br />
            Beltugov —
          </div>
          <Image
            ref={pushIfNotNull(elementsRef.current)}
            src={fedorImage}
            alt="Fedor Beltugov"
            className="object-cover object-center w-[38cqw] rounded-[0.313rem] grayscale hover:grayscale-0 transition-[filter] duration-350 ease-in"
            layout="cover"
          />
        </div>
        <div className="text-[#F0EDE8] px-[10cqw] xl:px-[8.2cqw]">
          <div className=" mb-3.75 md:mb-7.5 xl:mb-12.5 max-w-[27rem] md:max-w-[50.5rem] md:min-w-[27rem] md:w-[57.7cqw] @container">
            <p
              className="text-[clamp(0.875rem,4cqw,1.25rem)] md:text-[clamp(1.25rem,4.6cqw,1.875rem)] leading-[clamp(1.188rem,5.6cqw,1.625rem)] md:leading-[clamp(1.625rem,6cqw,2.688rem)]"
            >
              Founder and owner of Function Design Studio. Multidisciplinary
              designer & art director, focused on brand identity & UI / UX design.
              Working in the field since 2008
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="text-[#F0EDE8] text-[0.75rem] tracking-[-3%] md:text-[0.875rem] lg:text-[1.25rem]">
              Get in touch with me through:
            </div>
            <div className="flex flex-row space-x-3.75 ml-3.75 lg:space-x-5 lg:ml-5 *:transition-colors duration-300">
              <Link target="_blank" href={contacts.socialLinks.whatsapp}>
                <WhatsappIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75 transition-colors duration-150 " />
              </Link>
              <Link target="_blank" href={contacts.socialLinks.telegram}>
                <TelegramIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75 transition-colors duration-150 " />
              </Link>
              <Link target="_blank" href={contacts.socialLinks.linkedin}>
                <LinkedinIcon className="fill-[#F0EDE8] hover:fill-[#FF3F1A] w-6.25 lg:w-8.75 transition-colors duration-150 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
