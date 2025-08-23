"use client";

import Service from "@/domain/service/service";
import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef } from "react";

export default function ServiceMainBlock({ service }: { service: Service }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [
      headerRef.current,
      paragraphRef.current,
      buttonRef.current,
    ].filter((el) => el !== null);

    animate(elements, {
      opacity: [0, 1],
      translateX: ["-10vw", 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: stagger(200), // Staggered delay of 200ms between header and paragraph
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);
  return (
    <section
      ref={sectionRef}
      className="max-w-495 w-full fluid-container flex flex-row pt-12.5 pb-17.5 md:pb-37.5 @container"
    >
      <div className="flex flex-col xl:px-[8.4cqw]">
        <div ref={headerRef}>
          <h2 className="text-[1.875rem] leading-[2.375rem] tracking-[0rem] md:text-[1.875rem] md:leading-[100%] md:tracking-[0%] text-[#727272] font-medium">
            Services
          </h2>
          <h1 className="text-[2.75rem] leading-[100%] tracking-[0%] xs:text-[3.125rem] xs:leading-[100%] md:text-[clamp(3.125rem,6.6cqw,5rem)] font-medium mb-7.5">
            {service.title}
          </h1>
        </div>
        <p
          ref={paragraphRef}
          className="max-w-231.75 text-[1.5rem] leading-[2rem] tracking-[-3%] md:text-[clamp(1.5rem,3.2cqw,1.875rem)] md:leading-[clamp(2rem,4.2cqw,2.8125rem)] mb-7.5 font-medium"
        >
          {service.description}
        </p>
        <div ref={buttonRef} className="max-w-23.25">
          <button className="text-[#151516] bg-[#F0EDE8] hover:bg-[#FF3F1A] rounded-full px-5 py-0.5 md:px-7.5 md:py-2.5 text-[0.875rem] md:text-[clamp(1.063rem,4.7cqw,1.375rem)] leading-[2.125rem]  transition-colors duration-150  ">
            Request
          </button>
        </div>
      </div>
    </section>
  );
}
