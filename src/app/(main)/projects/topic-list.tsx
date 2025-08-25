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
    <div ref={sectionRef} className="flex flex-col md:gap-7.5 xs:gap-5 gap-3">
      <div className="text-[#F0EDE8] font-cera font-normal text-[1.53cqw] leading-[100%] tracking-[0%]">
        Choose a Category
      </div>
      <div className="flex flex-col items-start">
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
font-cera font-medium text-[2.08cqw] tracking-[0%] inline-block text-left relative transition-colors duration-500
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
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
