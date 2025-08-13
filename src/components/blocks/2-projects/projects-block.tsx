"use client";

import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";
import ProjectsGrid from "../../../app/(main)/projects/projects-grid";

export default function ProjectsBlock({ className }: { className?: string }) {

  return (
    <section className={`${className} fluid-container`}>
      <SectionHeader>Projects</SectionHeader>
      <ProjectLinkButton />
      <ProjectsGrid />
    </section>
  );
}
