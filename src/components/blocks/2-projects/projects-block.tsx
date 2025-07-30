"use client";
import arshaluysPic from "@/../public/cover_project-arshaluys.jpg";
import cancerPic from "@/../public/cover_project-cancer.jpg";
import caspianGoldPic from "@/../public/cover_project-caspian-gold.jpg";
import fffPic from "@/../public/cover_project-fff.jpg";
import smartStoryPic from "@/../public/cover_project-smart-stroy.jpg";
import spilePic from "@/../public/cover_project-spile.jpg";

import BgImageCard, { BgImageParam } from "@/components/cards/bg-image-card";
import SectionHeader from "@/components/common/section-header";
import type React from "react";
import ProjectLinkButton from "./projects-link-button";


const projects = [
  {
    title: "Feel Full Free",
    image: fffPic,

  },
  {
    title: "Spile",
    image: spilePic,
  },
  {
    title: "Caspian Gold",
    image: caspianGoldPic,
  },
  {
    title: "Cancer screening campaign in Moscow",
    image: cancerPic,
  },
  {
    title: "Arshaluys",
    image: arshaluysPic,
    description: "Logo, Product branding",
  },
  {
    title: "Smartstroy",
    image: smartStoryPic,
  },
]

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
            key={i}
            className={`transition-all duration-700 ease-out 
              group-[.revealed]/scroll-reveal:opacity-100 group-[.revealed]/scroll-reveal:translate-y-0
              group-[.unrevealed]/scroll-reveal:opacity-0 group-[.unrevealed]/scroll-reveal:translate-y-10`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <BgImageCard className="w-full" data={item} />
          </div>
        ))}
      </div>
      <ProjectLinkButton></ProjectLinkButton>
    </section>
  );
}
