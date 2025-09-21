import SectionHeader from "@/components/common/section-header";
import { cn } from "@/lib/utils";
import React from "react";
import ServicesLinks from "./services-links";

export default function ServicesBlock({
  className,
  title = "Services",
  currentService,
}: {
  title?: string;
  className?: string;
  currentService?: string | undefined;
}) {
  return (
    <section
      id="services"
      className={cn(
        "relative w-full overflow-hidden fluid-container",
        className
      )}
    >
      {title !== "" && <SectionHeader className="md:mb-7.5 mb-2.5 ">{title}</SectionHeader>}
      <ServicesLinks
        currentService={currentService}
      />
    </section>
  );
}
