"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SectionHeader from "@/components/common/section-header";
import ArrowSVG from "@/components/common/arrow";
import { useScrollReveal } from "@/components/common/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Dmitry Plushevsky",
    title: "CEO & Co-Founder",
    company: "GOLDEX",
    text: "The identity work for GOLDEX was handled professionally and smoothly. The result is precise, memorable, and fully aligned with the company’s vision. Strongly recommended.",
    linkedinUrl: "#",
  },
  {
    name: "Andrew Kormysh",
    title: "Marketing Director",
    company: "AIM Property Development",
    text: "AIM Property Development and OZ Mall received clear, well-structured branding, with Fedor bringing creative direction and strategic insight to the process. His work was reliable, effective, and easy to collaborate on.",
    linkedinUrl: "#",
  },
  {
    name: "Nick Morozov",
    title: "CEO",
    company: "Atelier Morozov",
    text: "Fedor created the corporate identity and website for my menswear brand Morozov, delivering strong, precise branding and managing the full process professionally. Highly recommended.",
    linkedinUrl: "#",
  },
  {
    name: "Daniel Iurev",
    title: "CEO & Founder",
    company: "IVA endo",
    text: "Fedor created a clear, trustworthy identity for IVA endo, immersing himself in our AI-driven medtech field and delivering precise, thoughtful work that supports our mission.",
    linkedinUrl: "#",
  },
  {
    name: "Kirill Tishchenko",
    title: "Founder",
    company: "MyCouture",
    text: "The MyCouture project was delivered thoughtfully and with a clear creative approach. The branding and website gave the brand individuality and helped it connect with its audience. Highly recommended.",
    linkedinUrl: "#",
  },
  {
    name: "Alexander Cherny",
    title: "Head of Marketing",
    company: "Belagra Group",
    text: "My company ordered a rebranding from Fedor, and he delivered the project professionally, efficiently, and on time. He listens carefully to client needs and implements them fully. I confidently recommend him.",
    linkedinUrl: "#",
  },
  {
    name: "Denis Makhalov",
    title: "Entrepreneur & Founder",
    company: "",
    text: "Over many years of collaboration, Fedor has delivered strong, reliable work across multiple branding projects. He quickly understands business needs, offers thoughtful solutions, and remains a trusted partner I can fully rely on.",
    linkedinUrl: "#",
  },
];

export default function TestimonialsBlock({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef } = useScrollReveal({ threshold: 0.1 });

  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const updateSliderPosition = useCallback(() => {
    if (sliderRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Get computed gap value from the slider element
      const computedStyle = window.getComputedStyle(sliderRef.current);
      const gap = parseFloat(computedStyle.gap) || 0;
      const totalGap = gap * (itemsPerView - 1);
      const cardWidth = (containerWidth - totalGap) / itemsPerView;
      sliderRef.current.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    updateSliderPosition();
  }, [updateSliderPosition]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      updateSliderPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSliderPosition]);

  return (
    <section ref={sectionRef} className={cn("w-full fluid-container", className)}>
      <SectionHeader>Testimonials</SectionHeader>
      
      <div ref={containerRef} className="relative mt-7.5 xs:mt-5 overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out gap-5 xs:gap-2.5"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc((100% - ${itemsPerView - 1} * 1.25rem) / ${itemsPerView})` }}
            >
              <div className=" text-[#F0EDE8] pr-5 xs:pr-2.5 lg:text-[1.375rem] text-base lg:leading-8.5 leading-6.5 tracking-[-3%]">
                <h3 className="font-medium lg:text-3xl text-2xl mb-1 leading-[100%]">
                  {testimonial.name}
                </h3>
                <p className="mb-3 xs:mb-2">
                  {testimonial.title}
                </p>
                <p className="font-medium ">
                  {testimonial.company}
                </p>
                {testimonial.text && (
                  <p className=" mb-3 xs:mb-2">
                    {testimonial.text}
                  </p>
                )}
                {testimonial.linkedinUrl && (
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF3F1A] underline decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] hover:opacity-80 transition-opacity duration-200 md:text-sm text-xs xs:text-sm"
                  >
                    Full review on LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 xs:gap-2 mt-7.5 xs:mt-5">
        <button
          onClick={goToNext}
          className="flex items-center gap-2 xs:gap-1.5 group cursor-pointer"
        >
          <span className="text-[#FF3F1A] md:text-base text-sm xs:text-sm font-medium group-hover:opacity-80 transition-opacity duration-200">
            Next Testimonials
          </span>
          <ArrowSVG className="fill-[#FF3F1A] group-hover:translate-x-1 transition-transform duration-300 w-20! md:w-28.5!" />
        </button>
        <div className="flex gap-1.5 xs:gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-2 h-2 bg-[#FF3F1A]"
                  : "w-1.5 h-1.5 bg-[#727272]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

