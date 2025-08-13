"use client"

import { animate, onScroll, stagger } from "animejs";
import ServicesLinks from "../../../components/blocks/3-services/services-links";
import { useEffect, useRef } from "react";
import FormModal from "../../../components/blocks/form/form-modal";

export default function ServicesPage() {

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

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
    <main className="md:pt-25.75 xs:pt-18.25 pt-17 pb-25.75 md:pb-18.25 xs:pb-18.25 ">
      <section ref={sectionRef} className="fluid-container relative @container">
        <div
          ref={headerRef}
          className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap xs:pl-0"
        >
          Services —
        </div>
        <ServicesLinks ref={paragraphRef} className="-mt-[1.6em]" showArrowCursor={true} focusColor="#fff" />
      </section>
      <section>
        <FormModal />
      </section>
    </main>
  )
}
