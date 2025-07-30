import SectionHeader from "@/components/common/section-header";
import services from "@/domain/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ServicesBlock({ className }: { className?: string }) {
  return (
    <section id="services" className={cn("relative w-full overflow-hidden fluid-container", className)}>
      <SectionHeader>Services</SectionHeader>
      <div className="text-justify md:mt-7.5 mt-2.5 w-full font-medium font-cera break-keep break-words leading-[1.25] @container">
        {
          services.map((service, index) => (
            <Link href={`#services`} key={index} className="text-[5.71cqw] font-medium font-cera inline not-last:after:[content:',_']">
              <span className="
                hover:text-[#FF3F1A] inline-block text-left relative transition-colors duration-500
                after:[content:''] after:scale-x-0 after:w-full md:after:h-1.5 after:h-0.5 xs:after:h-1 after:bg-[#FF3F1A] after:transition-transform after:duration-750 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out
                hover:after:scale-x-100
              ">{service.title}</span>
            </Link>
          ))
        }
      </div>
    </section>
  )
}
