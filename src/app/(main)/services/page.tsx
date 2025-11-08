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
    <main className="md:pt-5 xs:pt-14.25 pt-29.5 md:pb-50 xs:pb-25 pb-20">
      <section ref={sectionRef} className="relative @container">
        <WebGLBlurEffect className="md:pt-20 bg-[#151516] ">
          <div
            ref={headerRef}
            className="text-[#FF3F1A] font-bold md:leading-[15.22cqw] xs:leading-[15.36cqw] leading-[15.37cqw] tracking-mid xs:text-[18.229cqw] md:text-[18.75cqw] text-[18.29cqw] whitespace-nowrap xs:pl-0 pl-2.5"
          >
            Brand that
            <br />
            Works —
          </div>
        </WebGLBlurEffect>
        <ServicesLinks
          ref={paragraphRef}
          className="md:-mt-[1.224em] -mt-[1.265em] fluid-container leading-[1.15]! "
          showArrowCursor={true}
          focusColor="#F0EDE8"
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
