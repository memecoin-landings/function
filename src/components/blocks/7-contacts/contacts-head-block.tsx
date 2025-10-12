import Link from "next/link";
import Contacts from "../../../domain/contacts";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";

export default function ContactsHeadBlock() {
  return (
    <div className="relative fluid-container @container text-[#FF3F1A] fill-[#FF3F1A] ">
      <Link
        href={"mailto:" + Contacts.email}
        target="_blank"
        // было 7.495cqw, но на хроме из-за этого вылезал, не понятно в чем дело
        className="mx-auto block duration-150 whitespace-nowrap md:text-[7cqw] text-[7.32cqw] tracking-[-3%] underline-offset-[1.9cqw] underline font-medium decoration-solid text-center  hover:text-black"
      >
        {Contacts.email}
      </Link>
      <div className="flex flex-row items-center space-x-5 justify-center text-[0.75rem] xs:text-[0.875rem] tracking-[-3%] mt-4.25 xs:mt-7.75 md:mt-12.5 ">
        <div className="text-[3cqw] xs:text-[1.9cqw] md:text-[1.25rem] text-nowrap">
          Contact via Messenger:
        </div>
        <Link
          className="flex flex-row duration-150  font-mediummd:text-[1.25rem] items-center space-x-2.5  hover:text-black hover:fill-black"
          href={Contacts.socialLinks.whatsapp}
          target="_blank"
        >
          <WhatsappCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
          WhatsApp
        </Link>
        <Link
          className="flex flex-row duration-150  font-medium md:text-[1.25rem] items-center space-x-2.5  hover:text-black hover:fill-black"
          href={Contacts.socialLinks.telegram}
          target="_blank"
        >
          <TelegramCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
          Telegram
        </Link>
      </div>
    </div>
  );
}
