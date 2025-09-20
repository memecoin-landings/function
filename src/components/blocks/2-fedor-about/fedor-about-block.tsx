"use client";

import Image from "next/image";
import fedorImage from "../../../../public/ava_1.jpg";
import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";
import pushIfNotNull from "@/lib/push-if-not-null";
import Link from "next/link";

export default function FedorAboutBlock({ className }: { className?: string }) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(elementsRef.current, {
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: { from: stagger(["50px", "-50px"]), to: "0" },
      duration: 1000,
      easing: "easeInOutQuad",
      delay: 0,
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${className} w-full overflow-hidden`}
    >
      <div className="fluid-container @container py-12 md:py-24 xl:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <Image
              ref={pushIfNotNull(elementsRef.current)}
              src={fedorImage}
              alt="Fedor Beltugov"
              className="object-cover object-center w-full max-w-md lg:max-w-lg rounded-lg grayscale hover:grayscale-0 transition-[filter] duration-350 ease-in"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="text-white space-y-8">
            {/* Title */}
            <div
              ref={pushIfNotNull(elementsRef.current)}
              className="space-y-2"
            >
              <h1 className="text-4xl  md:text-6xl xl:text-7xl font-bold leading-tight">
                Behind the studio
              </h1>
            </div>

            {/* Description */}
            <div
              ref={pushIfNotNull(elementsRef.current)}
              className="space-y-6"
            >
              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#F0EDE8] max-w-2xl">
              Fedor Beltyugov, the founder of Function Design Studio, is an art director, designer, and strategist. Since 2008, I’ve been crafting brand identities that drive business goals and elevate brand value. I personally oversee every project from concept to completion. My experience spans working with global corporations, local businesses, and personal brands.
              </p>
            </div>

            {/* CTA Links */}
            <div
              ref={pushIfNotNull(elementsRef.current)}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="#"
                className="inline-flex items-center text-[#FF3F1A] hover:text-white border-b border-[#FF3F1A] hover:border-white transition-colors duration-200 pb-1 text-lg font-medium"
              >
                Get Price
              </Link>
              <span className="text-white text-lg">or</span>
              <Link
                href="/projects"
                className="inline-flex items-center text-white hover:text-[#FF3F1A] border-b border-white hover:border-[#FF3F1A] transition-colors duration-200 pb-1 text-lg font-medium"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}