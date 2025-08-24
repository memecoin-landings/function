"use client";

import { animate, onScroll, stagger } from "animejs";
// import ServicesLinks from "../../../components/blocks/3-services/services-links";
import { useEffect, useRef, useState } from "react";
import ProjectsGrid from "./projects-grid";
import TopicList from "./topic-list";
// import ProjectPojoRepository from "@/infrastructure/project.pojo-repository";

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
  "Brand support",
];

export default function ServicesPage() {
  // const repo = ProjectPojoRepository.getInstance();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // const tags = repo.list().map((project) => project.tags).flat();
  // const [selectedTag, setSelectedTag] = useState();

  const handleTopicSelect = (index: number) => {
    setSelectedTopic(index);
  };

  // Получаем tag выбранного топика для фильтрации проектов
  const getSelectedTopicTag = (): string | undefined => {
    if (selectedTopic === 0) return "all"; // "All projects" - показываем все
    return topics[selectedTopic]; // Возвращаем название топика как tag
  };

  // Автоматическая смена labels в цикле
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentLabelIndex((prevIndex) => (prevIndex + 1) % labels.length);

      // Сброс анимации через 500ms
      setTimeout(() => setIsAnimating(false), 500);
    }, 2500); // Смена каждые 2.5 секунды

    return () => clearInterval(interval);
  }, [labels.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [headerRef.current, paragraphRef.current].filter(
      (el) => el !== null
    );

    animate(elements, {
      opacity: [0, 1],
      translateX: ["-10vw", 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: stagger(200), // Staggered delay of 200ms between header and paragraph
      autoplay: onScroll({
        target: section,
        container: document.body,
      }),
    });
  }, []);

  return (
    <main className="md:pt-25.75 xs:pt-18.25 pt-17 w-full pb-5">
      <section
        ref={sectionRef}
        className="fluid-container relative md:pb-21.75 pb-18.25 pl-5 pr-23"
      >
        <div className="flex flex-row">
          <div
            ref={headerRef}
            className="font-bold leading-[9cqw] tracking-[-3%] text-[11.8cqw] xs:pl-0 flex-4"
          >
            OurCreative Approach
            <div className="flex flex-row">
              to&nbsp;
              <span className={`inline-block w-[60cqw] overflow-visible`}>
                <span
                  key={`${currentLabelIndex}-${isAnimating}`}
                  className={` text-[#FF3F1A] z-10 ${
                    isAnimating ? "animate-fadeInOut" : ""
                  }`}
                >
                  {labels[currentLabelIndex]}
                </span>
              </span>
            </div>
          </div>
          <div className="flex-1">
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
