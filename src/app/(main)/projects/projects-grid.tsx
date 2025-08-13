"use client"

import { useEffect, useRef } from "react";
import ProjectPojoRepository from "../../../infrastructure/project.pojo-repository";
import ProjectCard, { ProjectCardParams } from "../../../components/cards/project-card";
import { animate, onScroll, stagger } from "animejs";

export default function ProjectsGrid({ tag }: { tag?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement[]>([]);
  const repo = ProjectPojoRepository.getInstance();
  const projects = repo.list(tag).map((project) => {
    return new ProjectCardParams(
      project.image,
      project.title,
      project.tags.join(", "),
    )
  });
  useEffect(() => {
    const section = sectionRef.current;
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

  return (<div
    ref={sectionRef}
    className="grid xs:grid-cols-2 grid-cols-1 xs:gap-2.5 gap-1.5 xs:mt-7.5 mt-2.5">
    {projects.map((item) => (
      <ProjectCard ref={(el) => { if (el) projectsRef.current.push(el) }} key={item.title} custom-cursor="hover"
        className="w-full" data={item} />
    ))}
  </div>
  )
}
