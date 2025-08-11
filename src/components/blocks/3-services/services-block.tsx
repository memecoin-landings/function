import SectionHeader from "@/components/common/section-header";
import { cn } from "@/lib/utils";
import React from "react";
import ServicesLinks from "./services-links";

export default function ServicesBlock({ className }: { className?: string }) {

  return (
    <section
      id="services"
      className={cn("relative w-full overflow-hidden fluid-container", className)}
    >
      <SectionHeader>Services</SectionHeader>
      <ServicesLinks className="md:mt-7.5 mt-2.5 " />
    </section>
  );
}
