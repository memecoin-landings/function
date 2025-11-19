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
    <main className="flex flex-col items-start md:pt-25 xs:pt-17.5 pt-32">
      <StrategicIdentityBlock className="" />
      <FedorAboutBlock className="lg:mt-50 xs:mt-25 mt-17.5" openModal={openModal} />
      <ClientsBlock className="lg:mt-42.5 xs:mt-25 mt-17.5" />
      <ServicesBlock className="lg:mt-39 xs:mt-18 mt-10.5" />

      <button
        onClick={openModal}
        className="md:px-5 xs:px-2.5 w-fit md:mb-50 xs:mb-25 md:mt-12.5 xs:mt-7.5 mt-5 mb-17.5 items-left"
      >
        <span className="text-[#F0EDE8] hover:text-[#FF3F1A] underline decoration-[#F0EDE8] hover:decoration-[#FF3F1A] decoration-[0.065em] underline-offset-[0.8cqw] transition-colors duration-200 md:text-[3.675cqw] text-[4.6875cqw] font-medium leading-[6vw] xs:leading-[3.875cqw]">
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
