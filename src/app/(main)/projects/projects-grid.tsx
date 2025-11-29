"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard, {
  ProjectCardParams,
} from "../../../components/cards/project-card";
import { animate } from "animejs";
import { cn } from "@/lib/utils";
import Image from "../../../domain/image";
import { getStaticProjects, filterProjects, StaticProject } from "@/lib/static-data";

//["Corporate identity", "corporate-identity"],
// ["Product identity", "product-identity"],
// ["Campaign Identity", "campaign-identity"],
// ["Personal identity", "personal-identity"],
const tags: Record<string, string> =
{
  "corporate-identity": "Corporate identity",
  "product-identity": "Product identity",
  "key-visual": "Key Visual",
  "brand-guidelines": "Brand Guidelines",
  "social-media-branding": "Social Media Branding",
  "naming": "Naming",
  "logo": "Logo",
  "campaign-identity": "Campaign Identity",
  "personal-identity": "Personal identity",
  "packaging": "Packaging",
}


export default function ProjectsGrid({
  className,
  tag,
  allowDefault = false,
  limit,
  skip
}: {
  animated?: boolean;
  tag?: string | undefined;
  className?: string;
  allowDefault?: boolean;
  limit?: number;
  skip?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projectCardsParams, setProjectCardsParams] = useState<ProjectCardParams[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const allProjects = await getStaticProjects();
        let projects = filterProjects(allProjects, tag, limit, skip);

        if (projects.length === 0 && allowDefault) {
          projects = filterProjects(allProjects, undefined, limit, skip);
        }

        const cardParams = projects.map((project: StaticProject) => {
          const image = new Image({
            url: project.image.url,
            width: project.image.width,
            height: project.image.height,
            formats: {},
          } as never, "");

          return new ProjectCardParams(
            image,
            project.title,
            project.tags.map(tag => (tags[tag] ?? tag)).join(", ")
          );
        });

        setProjectCardsParams(cardParams);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [tag, limit, skip, allowDefault]);

  useEffect(() => {
    console.log(isLoading)
    if (!isLoading) {
      animate(".projects-grid-card", {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(5)"
      })
    } else {
      animate(".projects-grid-card", {
        opacity: [1, 0],
        duration: 1000
      })
    }
  }, [isLoading]);

  return (
    <div
      ref={sectionRef}
      className={cn("grid xs:grid-cols-2 grid-cols-1 md:gap-5 gap-2.5", className)}
    >
      {projectCardsParams.map((item) => (
        <ProjectCard
          key={item.title}
          custom-cursor="hover"
          className="w-full projects-grid-card opacity-0"
          data={item}
        />
      ))}
    </div>
  );
}
