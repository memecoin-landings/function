"use client";

import Image from "next/image";
import fedorImage from "../../../../public/ava_1.jpg";
import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";
import pushIfNotNull from "@/lib/push-if-not-null";
import Link from "next/link";

export default function FedorAboutBlock({ className, openModal }: { className?: string; openModal?: () => void }) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(elementsRef.current, {
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: { from: stagger(["50px", "-50px"]), to: "0" },
      duration: 1000,
      easing: "easeInOutQuad",
      delay: 0,
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
      <div className="@container">
        {/* Image with overlaid title */}
        <div className="relative w-full mb-2.5 xs:mb-8 md:mb-7.5">
          <Image
            ref={pushIfNotNull(elementsRef.current)}
            src={fedorImage}
            alt="Fedor Beltugov"
            className="object-cover object-center xs:w-[42.25cqw] w-[38.37cqw] h-full rounded-[0.313rem] grayscale hover:grayscale-0 transition-[filter] duration-350 ease-in ml-11.25 xs:ml-18.25"
            layout="cover"
          />

          {/* Overlaid title */}
          <h1
            className="text-[#F0EDE8] font-cera font-bold md:text-[11.81cqw] xs:text-[11.5cqw] text-[10.5cqw] md:leading-[9.03cqw] leading-none tracking-[-3%] md:mt-[-0.69em] xs:mt-[-0.82em] mt-[-0.81em] md:ml-0 xs:ml-2.5 ml-2.5 xs:mr-0 mr-5.25 relative z-10 text-left"
          > Behind the&nbsp;Studio
          </h1>
        </div>

        {/* Content section below image */}
        <div className="mb-2 xs:mb-4">
          {/* Description */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="mb-2.5 xs:mb-7.5"
          >
            <p className="font-cera font-normal not-italic md:text-[2.08cqw] xs:text-[2.60cqw] text-[3.26cqw] md:leading-[2.71cqw] xs:leading-[3.39cqw] leading-[4.42cqw] tracking-[0%] text-[#F0EDE8] text-left md:pl-5 xs:pl-2.5 pl-2.5 md:pr-[23.4375rem] xs:pr-34 pr-11.25">
              Fedor Beltyugov, the founder of Function Design Studio, is an art director, designer, and strategist. Since 2008, I’ve been crafting brand identities that drive business goals and elevate brand value. I personally oversee every project from concept to completion. My experience spans working with global corporations, local businesses, and personal brands.
            </p>
          </div>

          {/* CTA Links */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="flex flex-row xs:flex-row gap-1.5 xs:gap-2 justify-left items-left md:pl-5 xs:pl-2.5 pl-2.5 md:pr-0 xs:pr-0 pr-2.5"
          >
            <button
              onClick={openModal}
              className="w-fit items-left text-[#F0EDE8] hover:text-[#FF3F1A] underline decoration-[#F0EDE8] hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] font-medium md:leading-[4.58cqw] leading-none"
            >
              Get Price
            </button>
            <span className="text-[#F0EDE8] md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] md:leading-[4.58cqw] leading-none">or</span>
            <Link
              href="/projects"
              className="w-fit items-left text-[#F0EDE8] hover:text-[#FF3F1A] underline decoration-[#F0EDE8] hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] font-medium md:leading-[4.58cqw] leading-none"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
