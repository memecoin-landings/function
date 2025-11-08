"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard, {
  ProjectCardParams,
} from "../../../components/cards/project-card";
import { animate } from "animejs";
import { cn } from "@/lib/utils";
import Image from "../../../domain/image";

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
        // console.log("Loading projects with tag:", tag);
        const params = new URLSearchParams();
        if (tag) params.append("tag", tag);
        if (limit !== undefined) params.append("limit", limit.toString());
        if (skip !== undefined) params.append("skip", skip.toString());

        const response = await fetch(`/api/projects?${params.toString()}`);
        // console.log(`/api/projects?${params.toString()}`, "Fetch response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        let projects = await response.json();

        if (projects.length === 0 && allowDefault) {
          const defaultResponse = await fetch("/api/projects");
          if (defaultResponse.ok) {
            projects = await defaultResponse.json();
          }
        }

        const cardParams = projects.map((project: {
          title: string;
          image: { url: string; width: number; height: number };
          tags: string[];
          category: string;
        }) => {
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
