"use client"

import { ReactNode, RefObject } from "react";
import { useScrollReveal } from "../../app/animation/use-scroll-reveal";

export default function ScrollRevealWrapper({
  children,
  className
}: { children: ReactNode[] | ReactNode, className?: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={`group group/scroll-reveal ${isInView ? "opacity-100 revealed" : "opacity-0 unrevealed"} ${className}`} >
      {children}
    </div >
  );
};
