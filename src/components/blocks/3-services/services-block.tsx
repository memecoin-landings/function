import SectionHeader from "@/components/common/section-header";
import services from "@/domain/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ServicesBlock({ className }: { className?: string }) {
  return (
    <section id="services" className={cn("relative w-full overflow-hidden lg:pt-35 pt-10 md:pt-20 fluid-container", className)}>
      <SectionHeader>Services</SectionHeader>
      {/* <div className="mt-7.5 w-full flex justify-between flex-wrap"> */}
      <div className="text-justify lg:mt-7.5 mt-2.5 w-full font-medium font-cera break-keep break-words leading-[1.25] @container">
        {/* Corporate identity, Product identity, Campaign identity, Personal identity, Brand support, Naming, Logo, Packaging, Brand guidelines, UI/⁠UX, Key Visual, Content design */}
        {
          services.map((service, index) => (
            <Link href={`#services`} key={index} className="text-[5.71cqw] font-medium font-cera inline not-last:after:[content:',_']">
              <span className="hover:text-[#FF3F1A] hover:underline inline-block text-left">{service.title}</span>
            </Link>
          ))
        }
      </div>
    </section>
  )
}
