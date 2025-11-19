
"use client";
// import { animate, onScroll, stagger } from "animejs";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import WebGLBlurEffect from "../../blur/webgl-blur-component";

export default function HomeBlock({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // const elements = [headerRef.current, paragraphRef.current].filter(
    //   (el) => el !== null
    // );
    //
    // animate(elements, {
    //   opacity: [0, 1],
    //   translateX: ["-10vw", 0],
    //   duration: 800,
    //   easing: "easeOutQuad",
    //   delay: stagger(200), // Staggered delay of 200ms between header and paragraph
    //   autoplay: onScroll({
    //     target: section,
    //     container: document.body,
    //   }),
    // });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "w-full flex flex-col @container max-w-screen overflow-hidden -mt-20 ",
        className
      )}
    >
      <WebGLBlurEffect className="bg-[#151516] pt-20">
        <div
          id="home-hero"
          ref={headerRef}
          className="text-[#FF3F1A] font-bold md:leading-[15.22cqw] xs:leading-[15.36cqw] leading-[15.37cqw] tracking-mid xs:text-[18.229cqw] md:text-[18.75cqw] text-[18.29cqw] whitespace-nowrap xs:pl-0 pl-2.5"
        >
          {/* Strategic */}
          Unique
          <br />
          {/* Identity */}
          Solutions —
        </div>
      </WebGLBlurEffect>
      <p
        ref={paragraphRef}
        className={cn(
          "-mt-[7.55cqw] xs:-mt-[6.65cqw] md:mt-[-1.405em]",
          "pl-[1.39cqw] pointer-events-none @container md:text-[3.75cqw] md:leading-[4.5cqw] xs:text-[4.6875cqw] xs:leading-[5.72cqw] text-2xl leading-[1.9375rem] relative z-10 font-medium md:pr-[9.58cqw]")}
      >
        Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
      </p>
    </section>
  );
}
