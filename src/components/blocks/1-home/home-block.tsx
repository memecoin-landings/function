"use client";

import { animate, onScroll, stagger } from "animejs";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export default function HomeBlock({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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
      className={cn(
        "relative w-full flex flex-col @container fluid-container",
        className
      )}
    >
      <div
        ref={headerRef}
        className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap xs:pl-0 opacity-0"
      >
        Unique
        <br />
        Solutions —
      </div>
      <p
        ref={paragraphRef}
        className="text-5xl @container text-[3.75cqw] leading-[4.5cqw] mt-[-1.51em] relative z-10 font-medium md:pr-[9.58cqw] opacity-0"
      >
        Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
      </p>
    </section>
  );
}
