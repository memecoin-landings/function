"use client";

import { animate, onScroll, stagger } from "animejs";
import ServicesLinks from "../../../components/blocks/3-services/services-links";
import { useEffect, useRef, useState } from "react";
import { FormViewModel } from "@/domain/form-view-model";
import CommercialOfferForm from "../../../components/blocks/form/commercial-offer-form";
import { ThemeProvider } from "../../../components/common/theme-context";

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [formViewModel] = useState(() => new FormViewModel());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [headerRef.current, paragraphRef.current].filter(
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
    <main className="md:pt-25.75 xs:pt-18.25 pt-32 md:pb-50 sm:pb-25 pb-20">
      <section ref={sectionRef} className="relative @container">
        <div
          ref={headerRef}
          className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap xs:pl-0"
        >
          Services —
        </div>
        <ServicesLinks
          ref={paragraphRef}
          className="-mt-[1.345em] fluid-container "
          showArrowCursor={true}
          focusColor="#fff"
        />
      </section>
      <section className="px-8.75 md:px-[7.6cqw] md:mt-37 sm:mt-23 mt-17.5">
        <ThemeProvider theme="dark">
          <CommercialOfferForm viewModel={formViewModel} />
        </ThemeProvider>
      </section>
    </main>
  );
}
