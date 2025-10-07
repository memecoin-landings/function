import { animate, stagger } from "animejs";
import { onScroll } from "animejs";

import Service from "@/domain/service/service";
import { useEffect, useRef } from "react";

export default function ServiceStepsBlock({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(stepsRef.current, {
      opacity: [0, 0.2, 1],
      scale: [0.8, 1],
      translateY: [20, 0],
      duration: 300,
      easing: "easeOutQuad",
      delay: stagger(200),
      debug: true,
      autoplay: onScroll({
        sync: true,
        debug: false,
        target: section,
        enter: "bottom top",
        leave: "bottom bottom",
        container: document.body,
      }),
    });
  }, []);

  const steps = service?.steps;
  return (
    <section
      ref={sectionRef}
      className={`w-full fluid-container @container flex flex-col space-y-10 md:space-y-12.5 ${className}`}
    >
      {steps?.map((step, index) => (
        <div
          ref={(el) => {
            if (el) stepsRef.current.push(el);
          }}
          key={index}
          className="flex flex-col w-full group"
        >
          <div className="flex flex-row space-x-11.5  xs:space-x-0 @container">
            <div className="text-[1.5rem] leading-[1.875rem] tracking-[-3%] md:text-[1.875rem] md:leading-[100%] md:tracking-[-3%] font-medium text-[#FF3F1A] xs:pr-[5.2cqw]">
              {`0${index + 1}`}
            </div>
            <div className="flex flex-col xs:flex-row md:justify-between w-full">
              <h4 className="xs:w-[20cqw] text-[1.5rem] leading-[1.875rem] tracking-[-3%] md:text-[clamp(1.5rem,3.2cqw,1.875rem)] md:leading-[100%] md:tracking-[-3%] font-medium text-[#F0EDE8] mb-5.5 xs:pr-[6.1cqw] ">
                {step.name?.map((name, index) => (
                  <span key={index} className="lg:whitespace-nowrap">
                    {name}
                    {index < (step.name?.length ?? 0) - 1 && (
                      <br className="" />
                    )}
                  </span>
                ))}
              </h4>
              <div className="xs:ml-[15cqw] md:ml-0 xs:w-[50.2cqw] md:w-[58.2cqw] flex flex-col space-y-0.5 text-[1rem] leading-[1.625rem] tracking-[-3%] md:text-[clamp(1rem,2.2cqw,1.375rem)] md:leading-[clamp(1.625rem,3.2cqw,2.1875rem)] text-[#727272]">
                <p
                  dangerouslySetInnerHTML={{ __html: step.description ?? "" }}
                  className="text-[#F0EDE8] mb-2.75"
                />
                <div className="flex flex-row flex-wrap space-x-16.75">
                  <span className="text-[#727272]">{step.duration}</span>
                  {step.revisions && (
                    <span className="text-[#727272]">{step.revisions}</span>
                  )}
                </div>
                {step.nextStages && (
                  <p
                    dangerouslySetInnerHTML={{ __html: step.nextStages ?? "" }}
                    className="text-[#F0EDE8] pt-2.75 md:pt-7.5"
                  />
                )}
              </div>
            </div>
          </div>
          <hr className="opacity-90 group-not-last:mt-10 group-not-last:md:mt-12.5 h-0 group-not-last:border-b-1 border-0 border-[#454545]" />
        </div>
      ))}
    </section>
  );
}
