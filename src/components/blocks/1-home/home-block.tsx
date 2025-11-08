
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
        "w-full flex flex-col @container fluid-container max-w-screen md:-mt-20 overflow-hidden",
        className
      )}
    >
      <WebGLBlurEffect className="w-[calc(100%+5rem)] bg-[#151516] md:pt-20 px-10 -mx-10">
        <div
          id="home-hero"
          ref={headerRef}
          className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-mid text-[18.7cqw] whitespace-nowrap xs:pl-0"
        >
          Unique
          <br />
          Solutions —
        </div>
      </WebGLBlurEffect>
      <p
        ref={paragraphRef}
        className="pointer-events-none @container md:text-[3.75cqw] md:leading-[4.5cqw] xs:text-[4.6875cqw] xs:leading-[5.72cqw] text-2xl leading-[1.9375rem] -mt-[7.55cqw] xs:-mt-[6.65cqw] md:mt-[-1.51em] relative z-10 font-medium md:pr-[9.58cqw]"
      >
        Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
      </p>
    </section>
  );
}
