"use client";

import BgImageCard, { BgImageParam } from "@/components/cards/bg-image-card";
import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";
import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef } from "react";
import ProjectPojoRepository from "../../../infrastructure/project.pojo-repository";


export default function ProjectsBlock({ className }: { className?: string }) {
  const repo = ProjectPojoRepository.getInstance();
  const infoBlocks = repo.list().map((project) => {
    return new BgImageParam(
      project.image,
      project.title,
      "Logo, Product branding",
    )
  });
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    console.log(section)
    if (!section) return;

    animate(projectsRef.current, {
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [20, 0],
      duration: 300,
      easing: "easeOutQuad",
      delay: stagger(200),
      debug: true,
      autoplay: onScroll({
        target: section,
        enter: "50%",
        container: document.body,
      }),
    });
  }, []);

  return (
    <section ref={sectionRef} className={`${className} fluid-container`}>
      <SectionHeader>Projects</SectionHeader>
      <div className="grid xs:grid-cols-2 grid-cols-1 xs:gap-2.5 gap-1.5 xs:mt-7.5 mt-2.5">
        {infoBlocks.map((item) => (
          <BgImageCard ref={(el) => { if (el) projectsRef.current.push(el) }} key={item.title} custom-cursor="hover"
            className="w-full " data={item} />
        ))}
      </div>
      <ProjectLinkButton />
    </section>
  );
}
