"use client";

import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";
import ProjectsGrid from "../../../app/(main)/projects/projects-grid";

export default function ProjectsBlock({
  className,
  title = "Projects",
  tag,
}: {
  className?: string;
  title?: string;
  tag?: string;
}) {
  return (
    <section className={`${className} fluid-container`}>
      <SectionHeader>{title}</SectionHeader>
      <ProjectsGrid className="mt-2.5 md:mt-7.5" tag={tag} />
      <ProjectLinkButton className="mt-2.5 md:mt-5" />
    </section>
  );
}
