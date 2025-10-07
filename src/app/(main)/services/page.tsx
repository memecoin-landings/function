"use client";

import { animate, onScroll, stagger } from "animejs";
import ServicesLinks from "../../../components/blocks/3-services/services-links";
import { useEffect, useRef, useState } from "react";
import { FormViewModel } from "@/domain/form-view-model";
import CommercialOfferForm from "../../../components/blocks/form/commercial-offer-form";
import { ThemeProvider } from "../../../components/common/theme-context";
import WebGLBlurEffect from "@/components/blur/webgl-blur-component";

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [formViewModel] = useState(() => new FormViewModel());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [paragraphRef.current].filter(
      (el) => el !== null
    );

    animate(elements, {
      opacity: [0, 1],
      translateX: ["-10vw", 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: stagger(200),
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <main className="md:pt-23.75 xs:pt-14.25 pt-29.5 md:pb-50 xs:pb-25 pb-20">
      <section ref={sectionRef} className="relative @container">
        <WebGLBlurEffect className="pt-2 bg-[#151516] ">
          <div
            ref={headerRef}
            className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] xs:text-[18.25cqw] md:text-[18.7cqw] text-[17.6cqw] whitespace-nowrap xs:pl-0 pl-2.5"
          >
            Services —
          </div>
        </WebGLBlurEffect>
        <ServicesLinks
          ref={paragraphRef}
          className="-mt-[1.345em] fluid-container leading-[1.15]! "
          showArrowCursor={true}
          focusColor="#fff"
        />
      </section>
      <section className="pl-11 px-8.75 xs:px-18.25 md:px-[7.6cqw] md:mt-37 xs:mt-24.5 mt-17.5">
        <ThemeProvider theme="dark">
          <CommercialOfferForm viewModel={formViewModel} />
        </ThemeProvider>
      </section>
    </main>
  );
}
