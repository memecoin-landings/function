"use client";

import ContactsHeadBlock from "@/components/blocks/7-contacts/contacts-head-block";
import CommercialOfferForm from "@/components/blocks/form/commercial-offer-form";
import WebGLBlurEffect from "@/components/blur/webgl-blur-component";
import BehanceIcon from "@/components/common/behance-icon";
import InstagramIcon from "@/components/common/instagram-icon";
import { ThemeProvider } from "@/components/common/theme-context";
import DribbleIcon from "@/components/common/unknown-cw";
import { FormViewModel } from "@/domain/form-view-model";
import Link from "next/link";
import { useState } from "react";
import { useContacts } from "@/hooks/use-contacts";

// export const dynamic = "force-dynamic";

export default function ContactsPage() {
  const [formViewModel] = useState(() => new FormViewModel());
  const contacts = useContacts();
  return (
    <main className="bg-[#F0EDE8] pt-32 xs:pt-17.5 md:pt-25 pb-5 md:pb-15 xl:pb-20">
      <ContactsHeadBlock />
      <WebGLBlurEffect className="xl:mt-51 xs:mt-25 mt-16.25 pb-8.5 md:pb-14 xl:pb-27 bg-[#F0EDE8]">
        <div className="max-xs:px-2.5 font-bold xs:text-[18.23cqw] text-[17.44cqw]  md:text-[18.75cqw] text-[#FF3F1A]  leading-[14.65cqw] xs:leading-[15.36cqw] md:leading-[15.28cqw] tracking-mid capitalize">
          Start your <br /> project
        </div>
      </WebGLBlurEffect>
      <section className="fluid-container pl-11 px-8.75 xs:px-18.25 md:px-[7.6cqw]">
        <ThemeProvider theme="orange">
          <CommercialOfferForm viewModel={formViewModel} />
        </ThemeProvider>
        <div className="flex flex-row w-full items-start md:items-center md:mt-20 xs:mt-17 mt-12.5 space-x-6">
          <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center md:space-x-5 space-x-2.5 pr-[6.3cqw] md:pr-0 tracking-mid ">
            <p className="text-[2.7cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,2.4cqw,1.25rem)] mb-2.5 xs:mb-0 whitespace-nowrap tracking-mid text-[#FF3F1A]">
              Discover our work on:
            </p>
            <div className="flex flex-row space-x-2.5 md:space-x-5">
              <Link
                href={contacts.socialLinks.instagram}
                target="_blank"
                custom-cursor="black"
              >
                <InstagramIcon className="w-6.25 md:w-8.75 md:h-8.75 fill-[#FF3F1A] transition-colors duration-150 hover:fill-[#151516]" />
              </Link>
              <Link
                href={contacts.socialLinks.behance}
                target="_blank"
                custom-cursor="black"
              >
                <BehanceIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#FF3F1A] transition-colors duration-150 hover:fill-[#151516]" />
              </Link>
              <Link
                href={contacts.socialLinks.dribbble}
                target="_blank"
                custom-cursor="black"
              >
                <DribbleIcon className="w-6.25 md:w-8.75 md:h-8.75   fill-[#FF3F1A] transition-colors duration-150 hover:fill-[#151516]" />
              </Link>
            </div>
          </div>
          <div className="flex flex-row w-[58cqw] xs:w-1/2 xs:items-center pt-1 text-[#FF3F1A] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem]">
            © Functional Design Studio. All rights reserved
          </div>
        </div>
      </section>
    </main>
  );
}
