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
        <div className="relative w-full mb-12 xs:mb-8 md:mb-7.5">
          <Image
            ref={pushIfNotNull(elementsRef.current)}
            src={fedorImage}
            alt="Fedor Beltugov"
            className="object-cover object-center w-full xs:w-[42.25cqw] rounded-[0.313rem] grayscale hover:grayscale-0 transition-[filter] duration-350 ease-in px-4 xs:pl-18.25 xs:px-0"
            layout="cover"
          />

          {/* Overlaid title */}
          <h1
            className="text-white font-cera font-bold md:text-[11.81cqw] xs:text-[11.5cqw] text-[11.63cqw] md:leading-[9.03cqw] leading-none tracking-[-3%] mt-[-0.5em] xs:mt-[-0.82em] xs:ml-2.5 relative z-10 text-left "
          > Behind the&nbsp;Studio
          </h1>
        </div>

        {/* Content section below image */}
        <div className="mb-2 xs:mb-4">
          {/* Description */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="mb-8 xs:mb-7.5"
          >
            <p className="font-cera font-normal not-italic md:text-[2.08cqw] xs:text-[2.60cqw] text-[3.26cqw] md:leading-[2.71cqw] xs:leading-[3.39cqw] leading-[4.42cqw] tracking-[0%] text-[#F0EDE8] text-left px-4 xs:pl-2.5 xs:pr-34">
            Fedor Beltyugov, the founder of Function Design Studio, is an art director, designer, and strategist. Since 2008, I’ve been crafting brand identities that drive business goals and elevate brand value. I personally oversee every project from concept to completion. My experience spans working with global corporations, local businesses, and personal brands.
            </p>
          </div>

          {/* CTA Links */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="flex flex-col xs:flex-row gap-3 xs:gap-2 justify-left items-left px-4 xs:pl-2.5"
          >
            <button
              onClick={openModal}
              className="w-fit items-left text-white hover:text-[#FF3F1A] underline decoration-white hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] font-medium md:leading-[4.58cqw] leading-none"
            >
              Get Price
            </button>
            <span className="text-white md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] md:leading-[4.58cqw] leading-none">or</span>
            <Link
              href="/projects"
              className="w-fit items-left text-white hover:text-[#FF3F1A] underline decoration-white hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[3.75cqw] xs:text-[4.69cqw] text-[4.65cqw] font-medium md:leading-[4.58cqw] leading-none"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
