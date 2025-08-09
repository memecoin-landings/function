"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { useScrollReveal } from "@/components/common/use-scroll-reveal";

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
  const containerRef = useRef<HTMLUListElement>(null);
  const { ref: sectionRef, isInView } = useScrollReveal({ 
    threshold: 0.2,
  });

  useEffect(() => {
    if (isInView && containerRef.current) {
      
      const listItems = containerRef.current.querySelectorAll('li');
      
      listItems.forEach(item => {
        (item as HTMLElement).style.opacity = '0';
        (item as HTMLElement).style.transform = 'scale(0.8) translateY(30px)';
      });

      listItems.forEach((item, index) => {
        setTimeout(() => {
          animate(item, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [30, 0],
            easing: 'easeOutExpo',
            duration: 800
          });
        }, 200 + (index * 100));
      });
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className={`${className} w-full fluid-container`}>
      <SectionHeader>Clients</SectionHeader>
      <ul 
        ref={containerRef}
        className="sm:mt-7.5 mt-5 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2.5 gap-y-5 xs:gap-x-1.75 xs:gap-y-8.75 md:gap-x-5 md:gap-y-5"
      >
        {companies.map((c, i) => (
          <li key={i} className="transition-transform duration-300 ease-in-out hover:scale-110">
            <Image className="object-center object-contain w-full h-full" src={c.src} alt={c.name} />
          </li>
        ))}
      </ul>
    </section>
  )
}

