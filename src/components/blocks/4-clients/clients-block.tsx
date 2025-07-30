import React from "react";
import Image from "next/image";

import yandex from "@/../public/clients/yandex.svg";
import jti from "@/../public/clients/jti.svg";
import bat from "@/../public/clients/bat.svg";
import sber from "@/../public/clients/sber.svg";
import techonicol from "@/../public/clients/techonicol.svg";
import badoo from "@/../public/clients/badoo.svg";
import denso from "@/../public/clients/denso.svg";
import jll from "@/../public/clients/jll.svg";
import x5 from "@/../public/clients/x5.svg";
import who from "@/../public/clients/who.svg";
import mitsubishi from "@/../public/clients/Mitsubishi.svg";
import hyundai from "@/../public/clients/Hyundai.svg";
import SectionHeader from "@/components/common/section-header";

const companies = [
  { name: "Hyundai", src: hyundai },
  { name: "Mitsubishi", src: mitsubishi },
  { name: "Яндекс", src: yandex },
  { name: "JTI", src: jti },
  { name: "BAT", src: bat },
  { name: "Сбер", src: sber },
  { name: "WHO", src: who },
  { name: "X5 Group", src: x5 },
  { name: "JLL", src: jll },
  { name: "Denso", src: denso },
  { name: "Badoo", src: badoo },
  { name: "ТехноНИКОЛЬ", src: techonicol },
];

export default function ClientsBlock({ className }: { className?: string }) {
  return (
    <section className={`${className} w-full fluid-container`}>
      <SectionHeader className="text-[#727272] text-[2.8125rem] leading-[1em] font-medium">Clients</SectionHeader>
      <ul className="mt-7.5 grid grid-cols-[repeat(auto-fit,minmax(8.125rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(13.5625rem,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(1fr,9rem))] gap-x-2.5 gap-y-5 xs:gap-x-1.75 xs:gap-y-8.75 md:gap-x-5 md:gap-y-5">
      {companies.map((c, i) => (
        <li key={i} className="transition-transform duration-300 ease-in-out hover:scale-110">
          <Image className="object-center object-contain w-full h-full" src={c.src} alt={c.name} />
        </li>
      ))}
      </ul>
    </section>
  )
}

