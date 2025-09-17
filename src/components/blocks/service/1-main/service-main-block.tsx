"use client";

import { FormViewModel } from "@/domain/form-view-model";
import Service from "@/domain/service/service";
import { cn } from "@/lib/utils";
import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import FormModal from "../../form/form-modal";

export default function ServiceMainBlock({
  className,
  service,
}: {
  service: Service;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formViewModel] = useState(() => new FormViewModel());

  const openModal = () => {
    setIsModalOpen(true);
    formRef.current?.focus();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

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
    <>
      <section
        ref={sectionRef}
        className={cn(`w-full fluid-container flex flex-row @container`, className)}
      >
        <div className="flex flex-col w-full">
          <div ref={headerRef}>
            <h2 className="text-[1.875rem] leading-[2.375rem] tracking-[0rem] md:text-[1.875rem] md:leading-[1] md:tracking-[0%] text-[#727272] pb-2 mdpb-3.5 font-medium">
              Services
            </h2>
            <h1 className="text-[2.75rem] leading-[1] tracking-[0%] xs:text-[3.125rem] md:text-[clamp(3.125rem,6.6cqw,5rem)] font-medium mb-7.5">
              {service.title}
            </h1>
          </div>
          <p
            ref={paragraphRef}
            className="md:max-w-[79.5cqw] text-[1.5rem] leading-[2rem] tracking-[-3%] md:text-[clamp(1.5rem,3.2cqw,1.875rem)] md:leading-[clamp(2rem,4.2cqw,2.8125rem)] mb-7.5 font-medium"
          >
            {service.description}
          </p>
          <div ref={buttonRef} className="max-w-23.25">
            <button
              className="text-[#151516] bg-[#F0EDE8] hover:bg-[#FF3F1A] rounded-full px-5 py-0.5 md:px-7.5 md:py-2.5 text-[0.875rem] md:text-[clamp(1.063rem,4.7cqw,1.375rem)] leading-[2.125rem]  transition-colors duration-150  "
              onClick={openModal}
            >
              Request
            </button>
          </div>
        </div>
      </section>
      <FormModal
        ref={formRef}
        className={cn(
          "fixed inset-0 z-500 transition-all duration-300 max-h-screen",
          isModalOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClose={() => setIsModalOpen(false)}
        viewModel={formViewModel}
      />
    </>
  );
}
