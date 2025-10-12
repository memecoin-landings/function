import { cn } from "@/lib/utils";
import React from "react";
import menuItems from "./menu-items";
import Link from "next/link";
import Contacts from "@/domain/contacts";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";
import BehanceIcon from "@/components/common/behance-icon";
import InstagramIcon from "@/components/common/instagram-icon";
import DribbleIcon from "@/components/common/unknown-cw";

export default function MobileMenu({ className, openModal, onClose }: { className?: string, openModal: () => void, onClose: () => void }) {
  return (
    <div className={cn(className, "fixed -z-1 top-0 h-screen left-0 w-screen transition-[translate] duration-300 overflow-scroll",
      "pt-[max(10.5vh,5rem)] pl-[calc(max(26.74%,2.5rem))] bg-black flex flex-col pb-20",
    )}
    >
      <div className="flex flex-col items-start space-y-2.75">
        {menuItems.map((item) => (
          <SideMenuItem onClick={onClose} key={item.label} href={item.href}>
            {item.label}
          </SideMenuItem>
        ))}
        <SideMenuItem onClick={openModal}>
          Get Price
        </SideMenuItem>
      </div>
      <Link target="_blank" href={`mailto:${Contacts.email}`} className="mt-18.75 text-[#F0EDE8] underline text-sm tracking-[-3%]">{Contacts.email}</Link>
      <div className="text-[#727272] mt-10 text-sm">Contact via Messenger:</div>
      <div className="mt-3 flex flex-row font-medium fill-[#F0EDE8] items-center text-sm gap-5 tracking-[-3%]
        *:hover:fill-[#FF3F1A] *:hover:text-[#FF3F1A] *:flex *:flex-row *:items-center flex-wrap
        pr-5
        ">
        <div>
          <WhatsappCircleIcon className="w-6.25 mr-2.5" />
          <p>WhatsApp</p>
        </div>
        <div>
          <TelegramCircleIcon className="w-6.25 mr-2.5" />
          <p>Telegram</p>
        </div>
      </div>
      <div className="text-[#727272] mt-8.5 text-sm tracking-[-3%]">Discover our work on:</div>
      <div className="mt-5 flex flex-row *:fill-[#F0EDE8] *:hover:fill-[#FF3F1A] items-center space-x-2.5">
        <InstagramIcon className="w-6.25" />
        <BehanceIcon className="w-6.25" />
        <DribbleIcon className="w-6.25" />
      </div>
    </div>
  )
}

function SideMenuItem({
  href,
  children,
  onClick = () => { }
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      onClick={onClick}
      href={href ?? ""}
      className="hover:text-[#FF3F1A] transition-colors duration-300 text-[#F0EDE8] text-[2.0625rem] font-medium text-nowrap"
    >
      {children}
    </Link>
  );
}

