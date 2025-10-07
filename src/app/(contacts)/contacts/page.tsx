"use client";

import ContactsHeadBlock from "@/components/blocks/7-contacts/contacts-head-block";
import CommercialOfferForm from "@/components/blocks/form/commercial-offer-form";
import BehanceIcon from "@/components/common/behance-icon";
import InstagramIcon from "@/components/common/instagram-icon";
import { ThemeProvider } from "@/components/common/theme-context";
import DribbleIcon from "@/components/common/unknown-cw";
import Contacts from "@/domain/contacts";
import { FormViewModel } from "@/domain/form-view-model";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactsPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = 'white';
    return () => {
      document.documentElement.style.backgroundColor = "";
    };
  }, []);
  const [formViewModel] = useState(() => new FormViewModel());
  return (
    <main className="fluid-container bg-white pt-[8.063rem] xl:pt-[12.75rem] fl">
      <ContactsHeadBlock />
      <div className="md:mt-37 sm:mt-24.5 mt-17.5 font-bold text-[4.688rem] text-[#FF3F1A] xl:text-[16.875rem] leading-[3.938rem] xl:leading-[13.75rem] tracking-[-3%]">
        Start your <br /> project
      </div>

      <section className="pl-11 px-8.75 xs:px-18.25 md:px-[7.6cqw] md:mt-37 sm:mt-24.5 mt-17.5">
        <ThemeProvider theme="orange">
          <CommercialOfferForm viewModel={formViewModel} />
        </ThemeProvider>
        <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center md:space-x-5 space-x-2.5 pr-[6.3cqw] md:pr-0 tracking-[-3%] ">
          <p className="text-[2.7cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,2.4cqw,1.25rem)] mb-2.5 sm:mb-0 whitespace-nowrap tracking-[-3%] text-[#FF3F1A]">
            Discover our work on:
          </p>
          <div className="flex flex-row space-x-2.5 md:space-x-5">
            <Link href={Contacts.socialLinks.instagram} target="_blank">
              <InstagramIcon className="w-6.25 md:w-8.75 md:h-8.75 fill-[#FF3F1A] transition-colors duration-150 " />
            </Link>
            <Link href={Contacts.socialLinks.behance} target="_blank">
              <BehanceIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#FF3F1A] transition-colors duration-150 " />
            </Link>
            <Link href={Contacts.socialLinks.dribbble} target="_blank">
              <DribbleIcon className="w-6.25 md:w-8.75 md:h-8.75   fill-[#FF3F1A] transition-colors duration-150 " />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
