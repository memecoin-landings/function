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
        <div className="relative w-full mb-12 sm:mb-8 md:mb-7.5">
        <Image
            ref={pushIfNotNull(elementsRef.current)}
            src={fedorImage}
            alt="Fedor Beltugov"
            className="object-cover object-center w-full sm:w-[42.25cqw] rounded-[0.313rem] grayscale hover:grayscale-0 transition-[filter] duration-350 ease-in px-4 sm:pl-34.5 sm:px-0"
            layout="cover"
          />
          
          {/* Overlaid title */}
            <h1
              className="text-white font-cera font-bold text-[8vw] sm:text-[11.75cqw] leading-[7vw] sm:leading-[10cqw] tracking-[-3%] mt-[-0.5em] sm:mt-[-0.725em] relative z-10 text-left px-4 sm:px-0"
              > Behind the&nbsp;Studio
            </h1>
        </div>

        {/* Content section below image */}
        <div className="mb-2 sm:mb-4">
          {/* Description */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="mb-8 sm:mb-12.5"
          >
            <p className="font-cera font-normal not-italic text-[4vw] sm:text-[2.1cqw] leading-[5.5cqw] sm:leading-[2.78cqw] tracking-[0%] text-[#F0EDE8] text-left px-4 sm:pl-5 sm:pr-[23.4375rem]">
            Fedor Beltyugov, the founder of Function Design Studio, is an art director, designer, and strategist. Since 2008, I’ve been crafting brand identities that drive business goals and elevate brand value. I personally oversee every project from concept to completion. My experience spans working with global corporations, local businesses, and personal brands.
            </p>
          </div>

          {/* CTA Links */}
          <div
            ref={pushIfNotNull(elementsRef.current)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-left items-left px-4 sm:pl-5"
          >
            <button
              onClick={openModal}
              className="w-fit items-left text-white hover:text-[#FF3F1A] underline decoration-white hover:decoration-[#FF3F1A] decoration-2 sm:decoration-4 lg:underline-offset-14 sm:underline-offset-10 underline-offset-5 transition-colors duration-200 text-[5vw] sm:text-[3.125cqw] font-medium leading-[6vw] sm:leading-[3.875cqw]"
            >
              Get Price
            </button>
            <span className="text-white text-[5vw] sm:text-[3.125cqw] leading-[6vw] sm:leading-[3.875cqw]">or</span>
            <Link
              href="/projects"
              className="w-fit items-left text-white hover:text-[#FF3F1A] underline decoration-white hover:decoration-[#FF3F1A] decoration-2 sm:decoration-4 lg:underline-offset-14 sm:underline-offset-10 underline-offset-5 transition-colors duration-200 text-[5vw] sm:text-[3.125cqw] font-medium leading-[6vw] sm:leading-[3.875cqw]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}