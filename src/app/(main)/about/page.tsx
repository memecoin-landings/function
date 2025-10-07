"use client";

import ServicesBlock from "@/components/blocks/3-services/services-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";
import StrategicIdentityBlock from "@/components/blocks/1-strategic-identity/block";
import FedorAboutBlock from "@/components/blocks/2-fedor-about/fedor-about-block";
import { useState, useRef } from "react";
import FormModal from "@/components/blocks/form/form-modal";
import { FormViewModel } from "@/domain/form-view-model";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formViewModel] = useState(() => new FormViewModel());

  const openModal = () => {
    setIsModalOpen(true);
    formRef.current?.focus();
  };
  return (
    <main className="flex flex-col items-start ">
      <StrategicIdentityBlock className="md:mt-50 xs:mt-27 mt-17.5" />
      <FedorAboutBlock className="md:mt-50 xs:mt-25 mt-17.5" openModal={openModal} />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />

      <button
        onClick={openModal}
        className="sm:pl-5 w-fit md:mb-50 xs:mb-25 md:mt-12.5 xs:mt-7.5 mt-5 ml-2.5 mb-17.5 items-left"
      >
        <span className="text-white hover:text-[#FF3F1A] underline decoration-white hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[4.125rem] xs:text-[2.25rem] text-[1.25rem] font-medium leading-[6vw] sm:leading-[3.875cqw]">
          Let&apos;s Build Your Brand
        </span>
      </button>

      {/* Form Modal */}
      <FormModal
        ref={formRef}
        className={cn(
          "fixed inset-0 z-500 transition-all duration-600 max-h-screen",
          isModalOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClose={() => setIsModalOpen(false)}
        viewModel={formViewModel}
      />
    </main>
  );
}
