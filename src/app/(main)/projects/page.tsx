"use client";

import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import ProjectsGrid from "./projects-grid";
import TopicList from "./topic-list";
import AnimeTextSplit from "@/components/animation/animate-text";

const labels = [
  "Innovation",
  "Strategy",
  "Identity",
  "Branding",
  "Design",
  "Creation",
  "Solutions",
];
const topics = [
  "All projects",
  "Corporate identity",
  "Product identity",
  "Campaign Identity",
  "Personal identity",
];


export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const handleTopicSelect = (index: number) => {
    setSelectedTopic(index);
  };

  const getSelectedTopicTag = (): string | undefined => {
    if (selectedTopic === 0) return "all"; // "All projects" - показываем все
    return topics[selectedTopic]; // Возвращаем название топика как tag
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const elements = [headerRef.current, paragraphRef.current].filter(
      (el) => el !== null
    );

    animate(elements, {
      opacity: [0, 1],
      translateX: ["-10vw", 0],
      duration: 1000,
      easing: "easeOutQuad",
      delay: stagger(200),
      autoplay: onScroll({
        target: section!,
        container: document.body,
      }),
    });
  }, []);

  return (
    <main className="lg:pt-25.75 xs:pt-18.25 pt-17 w-full pb-5">
      <section
        ref={sectionRef}
        className="fluid-container relative lg:pb-21.75 pb-18.25 pl-5 pr-23"
      >
        <div className="flex flex-col lg:flex-row">
          <div
            ref={headerRef}
            className="font-bold lg:leading-[9cqw] tracking-[-3%] lg:text-[11.8cqw] text-[16cqw] leading-[12cqw] xs:pl-0 flex-4"
          >
            OurCreative Approach
            <div className="flex flex-row">
              to&nbsp;
              <span className={`inline-block w-[60cqw] overflow-visible z-20`}>
                <span
                  className="text-[#FF3F1A] z-20"
                >
                  <AnimeTextSplit texts={labels} />
                </span>
              </span>
            </div>
          </div>
          <div className="flex-1 lg:pt-0 pt-10">
            <TopicList
              topics={topics}
              selectedTopic={selectedTopic}
              onTopicSelect={handleTopicSelect}
            />
          </div>
        </div>
      </section>
      <section className="pl-5 pr-5">
        {getSelectedTopicTag() && <ProjectsGrid tag={getSelectedTopicTag()!} />}
        {!getSelectedTopicTag() && <ProjectsGrid />}
      </section>
    </main>
  );
}
