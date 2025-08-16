"use client"

import { animate, onScroll, stagger } from "animejs";
// import ServicesLinks from "../../../components/blocks/3-services/services-links";
import { useEffect, useRef } from "react";
import ProjectsGrid from "./projects-grid";
// import ProjectPojoRepository from "@/infrastructure/project.pojo-repository";

const labels = "Innovation\nStrategy\nIdentity\nBranding\nDesign\nCreation\nSolutions";

export default function ServicesPage() {
  // const repo = ProjectPojoRepository.getInstance();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  // const tags = repo.list().map((project) => project.tags).flat();
  // const [selectedTag, setSelectedTag] = useState();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [headerRef.current, paragraphRef.current].filter(
      (el) => el !== null
    );

    animate(elements, {
      opacity: [0, 1],
      translateX: ["-10vw", 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: stagger(200), // Staggered delay of 200ms between header and paragraph
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <main className="md:pt-25.75 xs:pt-18.25 pt-17 pb-25.75 md:pb-18.25 xs:pb-18.25 ">
      <section ref={sectionRef} className="fluid-container relative @container">
        <div
          ref={headerRef}
          className="font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] xs:pl-0"
        >
          OurCreative
          Approach
          to
          <span className={`inline-block h-[1em] relative w-[60cqw] overflow-hidden`}>
            <span className="absolute left-0 right-0 top-0">{labels}</span>
          </span>
        </div>
      </section>
      <section>
        <ProjectsGrid />
      </section>
    </main>
  )
}
