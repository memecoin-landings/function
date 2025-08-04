"use client";

import SectionHeader from "@/components/common/section-header";
import services from "@/domain/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";

export default function ServicesBlock({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(linksRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: "easeOutQuad",
      delay: stagger(200),
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden fluid-container", className)}
    >
      <SectionHeader>Services</SectionHeader>
      <div className="text-justify md:mt-7.5 mt-2.5 w-full font-medium font-cera break-keep break-words leading-[1.25] @container">
        {services.map((service, index) => (
          <Link
            href="#services"
            key={index}
            className="text-[5.71cqw] font-medium font-cera inline group"
          >
            <span className="inline-block" ref={(el) => { if (el) linksRef.current.push(el) }}>
              <span
                className={`
                hover:text-[#FF3F1A] inline-block text-left relative transition-colors duration-500
                after:[content:''] after:scale-x-0 after:w-full md:after:h-1.5 after:h-0.5 xs:after:h-1 after:bg-[#FF3F1A] after:transition-transform after:duration-750 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out
                hover:after:scale-x-100
                `}
              >
                {service.title}
              </span>
              <span className="group-last:hidden">,</span>
            </span>
            {" "}
          </Link>
        ))}
      </div>
    </section>
  );
}
