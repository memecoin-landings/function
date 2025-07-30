import React from "react";

export default function SectionHeader({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <h2 className={`${className} font-cera md:text-3xl font-medium xs:text-base text-xl text-[#727272]`}>
      {children}
    </h2>
  )
}
