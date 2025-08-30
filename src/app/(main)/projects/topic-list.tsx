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
    <div ref={sectionRef} className="flex flex-col lg:gap-7.5 gap-2.5">
      <div className="text-[#F0EDE8] lg:mt-6.5 font-cera font-normal lg:text-[1.375rem] text-[1rem] leading-[100%] tracking-[0%]">
        Choose a Category
      </div>
      <div className="flex lg:flex-col flex-row flex-wrap lg:items-start items-center lg:gap-0 gap-2">
        {topics.map((topic, index) => (
          <div key={index} className="md:pt-4 xs:pt-2 pt-1">
            <button
              onClick={() => onTopicSelect(index)}
              className="inline group"
            >
              <span
                key={index}
                ref={(el) => {
                  if (el) topicsRef.current.push(el);
                }}
                style={{ "--focusColor": "#FF3F1A" } as React.CSSProperties}
                className={`
font-cera font-medium lg:text-[1.875rem] text-[1.5rem] tracking-[0%] inline-block text-left relative transition-colors duration-500
after:[content:''] after:scale-x-0 after:w-full after:h-[0.125rem] after:bg-[var(--focusColor)] after:transition-transform after:duration-750 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out
${
  index === selectedTopic
    ? "text-[#FF3F1A] after:scale-x-100"
    : "hover:text-[var(--focusColor)] hover:after:scale-x-100"
}
`}
              >
                {topic}
                {/* Добавляем запятую для экранов меньше md, кроме последнего элемента */}
                {index < topics.length - 1 && (
                  <span
                    className="md:hidden text-[#F0EDE8] font-cera font-medium 
                  md:text-[1.875rem] text-[1.5rem] tracking-[0%]"
                  >
                    ,
                  </span>
                )}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
