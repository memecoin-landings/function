"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";

export default function TopicList({
  topics,
  selectedTopic,
  onTopicSelect,
}: {
  topics: string[];
  selectedTopic: number;
  onTopicSelect: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    animate(topicsRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: "easeOutQuad",
      delay: stagger(200),
      autoplay: onScroll({
        sync: true,
        enter: "bottom-=15% top",
        leave: "bottom-=15% bottom",
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col">
      <div className="text-[#F0EDE8] font-cera font-normal lg:text-[1.375rem] text-[1rem] leading-[100%] tracking-[0%]">
        Choose a Category
      </div>
      <div className="flex xl:flex-col flex-row flex-wrap lg:items-start items-center md:gap-y-4 gap-y-2 gap-x-2 md:mt-7.5 mt-2.5">
        {topics.map((topic, index) => (
          <button
            key={index}
            ref={(el) => {
              if (el) topicsRef.current.push(el);
            }}
            onClick={() => onTopicSelect(index)}
            style={{ "--focusColor": "#FF3F1A" } as React.CSSProperties}
            className="group groupfont-cera font-medium lg:text-[1.875rem] text-[1.5rem] tracking-[0%] inline-block text-left relative transition-colors duration-500"
          >
            <span
              className={`inline-block relative
                after:[content:''] after:scale-x-0 after:w-full after:h-[0.125rem] after:bg-[var(--focusColor)] after:transition-transform after:duration-750 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out
                ${
                  index === selectedTopic
                    ? "text-[#FF3F1A] after:scale-x-100"
                    : "hover:text-[var(--focusColor)] hover:after:scale-x-100"
                }
              `}
            >
              {topic}
            </span>
            <span className="lg:hidden group-last:hidden text-[#F0EDE8]">
              ,{" "}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
