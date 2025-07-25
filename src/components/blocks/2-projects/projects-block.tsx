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

import pic from "@/../public/assets/test.jpg";
import BgImageCard, { BgImageParam } from "@/components/cards/bg-image-card";
import type React from "react";
import { ScalableWrapper } from "../scalaible-wrapper";

export default function ProjectsBlock({ className }: { className?: string }) {
  const infoBlocks = [
    new BgImageParam(pic),
    new BgImageParam(pic, "Arshaluys", "Logo, Product branding"),
    new BgImageParam(pic),
    new BgImageParam(pic),
  ];
  return (
    <section className={`${className} fluid-container`}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2.5">
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
    </section>
  );
}
