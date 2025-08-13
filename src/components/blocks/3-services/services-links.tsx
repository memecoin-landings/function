/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, onScroll, stagger } from "animejs";
import ServicePojoRepository from "../../../infrastructure/service.pojo-repository";
import { cn } from "../../../lib/utils";

export default function ServicesLinks({ ref, focusColor = "#FF3F1A", showArrowCursor = false, className }: { focusColor?: string, showArrowCursor?: boolean, className?: string, ref?: React.RefObject<HTMLDivElement | null> | undefined }) {
  const repo = ServicePojoRepository.getInstance();
  const sectionRef = useRef<HTMLDivElement>(null) ?? ref;
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
        sync: true,
        enter: "bottom-=15% top",
        leave: "bottom-=15% bottom",
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (<div ref={ref ?? sectionRef} className={cn("text-[clamp(1px,5.71cqw,3.8rem)] text-justify w-full font-medium font-cera break-keep break-words leading-[1.25] @container", className)}>
    {repo.list().map((service, index) => (
      <Link
        href="#services"
        key={index}
        className=" font-medium font-cera inline group"
      >
        <span custom-cursor={showArrowCursor ? "hover" : ""} style={{ "--focusColor": focusColor } as any} className="inline-block" ref={(el) => { if (el) linksRef.current.push(el) }}>
          <span
            className={`
hover:text-[var(--focusColor)] inline-block text-left relative transition-colors duration-500
after:[content:''] after:scale-x-0 after:w-full md:after:h-1.5 after:h-0.5 xs:after:h-1 after:bg-[var(--focusColor)] after:transition-transform after:duration-750 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out
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
  </div>)

}
