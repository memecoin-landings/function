"use client";
// import { ScalableText } from "@/components/text/scalabie-text";
// import { ScalableWrapper } from "../scalaible-wrapper";

// export default function ProjectsBlock() {
//   return (
//     <section className="relative w-full overflow-hidden lg:pt-35 pt-10 md:pt-20">
//       <ScalableWrapper className="bg-black">
//         <div>

//         </div>
//       </ScalableWrapper>
//     </section>
//   );
// }

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

export default function ProjectsBlock({ className }: { className?: string }) {
  const infoBlocks = [
    new BgImageParam(fffPic),
    new BgImageParam(spilePic),
    new BgImageParam(caspianGoldPic),
    new BgImageParam(cancerPic),
    new BgImageParam(arshaluysPic, "Arshaluys", "Logo, Product branding"),
    new BgImageParam(smartStoryPic),
  ];
  return (
    <section className={`${className} fluid-container`}>
      <SectionHeader>Projects</SectionHeader>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2.5 mt-7.5">
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
