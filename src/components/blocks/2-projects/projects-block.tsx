"use client";

import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";

export default function ProjectsBlock({ className }: { className?: string }) {

  return (
    <section className={`${className} fluid-container`}>
      <SectionHeader>Projects</SectionHeader>
      <ProjectLinkButton />
    </section>
  );
}
