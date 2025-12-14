"use client";

import { useRef } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef } = useScrollReveal({ threshold: 0.1 });

  const goToNext = () => {
    if (sliderRef.current) {
      const firstCard = sliderRef.current.querySelector('div');
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const marginRight = parseFloat(window.getComputedStyle(firstCard).marginRight) || 0;
        const scrollAmount = cardWidth + marginRight;
        
        // Check if we can scroll one more card, or if we're at/near the end
        const currentScroll = sliderRef.current.scrollLeft;
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const willReachEnd = currentScroll + scrollAmount >= maxScroll - 1; // 1px threshold
        
        if (willReachEnd) {
          // Return to start
          sliderRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // Scroll by one card
          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <section ref={sectionRef} className={cn("w-full fluid-container", className)}>
      <SectionHeader>Testimonials</SectionHeader>
      
      <div className="relative mt-7.5 xs:mt-5">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar -mr-5 xs:-mr-2.5"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 flex flex-col h-full pt-5 lg:pt-13.5 lg:pr-34 xs:pr-2.5 pr-11 min-h-[28.75rem] justify-between md:w-1/3 w-2/3"
              >

              <div className="flex flex-col h-full text-[#F0EDE8] lg:text-[1.375rem] text-base lg:leading-8.5 leading-6.5 tracking-[-3%]">
                <h3 className="font-medium lg:text-3xl text-2xl mb-1 leading-[100%]">
                  {testimonial.name}
                </h3>
                <p className="mb-1">
                  {testimonial.title}
                </p>
                <p className="font-medium mb-5">
                  {testimonial.company}
                </p>
                {testimonial.text && (
                  <p className="">
                    {testimonial.text}
                  </p>
                )}
              </div>

              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-[#FF3F1A] underline decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] hover:opacity-80 transition-opacity duration-200 md:text-sm text-xs xs:text-sm"
              >
                Full review on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center mt-7.5 lg:mt-10">
        <button
          onClick={goToNext}
          className="flex items-center gap-2 xs:gap-1.5 lg:gap-5 group cursor-pointer"
        >
          <span className="group-hover:text-[#FF3F1A] text-[#F0EDE8] md:text-lg text-sm font-medium mr-5 transition-colors duration-300">
            Next Testimonials
          </span>
          <ArrowSVG className="fill-[#F0EDE8] group-hover:fill-[#FF3F1A] group-hover:translate-x-1 transition-all duration-300 w-20! md:w-28.5!" />
        </button>
      </div>
    </section>
  );
}

