"use client";

import BgImageCard, { BgImageParam } from "@/components/cards/bg-image-card";
import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";
import projects from "@/domain/projects";

export default function ProjectsBlock({ className }: { className?: string }) {
  const infoBlocks = projects.map((project) => {
    return new BgImageParam(
      project.image,
      project.title,
      "Logo, Product branding",
    )
  });
  return (
    <section className={`${className} fluid-container`}>
      <SectionHeader>Projects</SectionHeader>
      <div className="grid xs:grid-cols-2 grid-cols-1 xs:gap-2.5 gap-1.5 xs:mt-7.5 mt-2.5">
        {infoBlocks.map((item, i) => (
          <div
            custom-cursor="hover"
            key={i}
            className={`transition-all duration-700 ease-out 
              group-[.revealed]/scroll-reveal:opacity-100 group-[.revealed]/scroll-reveal:translate-y-0
              group-[.unrevealed]/scroll-reveal:opacity-0 group-[.unrevealed]/scroll-reveal:translate-y-10`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <BgImageCard className="w-full " data={item} />
          </div>
        ))}
      </div>
      <ProjectLinkButton></ProjectLinkButton>
    </section>
  );
}
