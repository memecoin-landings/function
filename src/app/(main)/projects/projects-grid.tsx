"use client";

import { useEffect, useRef } from "react";
import ProjectPojoRepository from "../../../infrastructure/project.pojo-repository";
import ProjectCard, {
  ProjectCardParams,
} from "../../../components/cards/project-card";
import { animate, onScroll } from "animejs";

export default function ProjectsGrid({ tag }: { tag?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement[]>([]);
  const repo = ProjectPojoRepository.getInstance();
  const projects = repo.list(tag).map((project) => {
    return new ProjectCardParams(
      project.image,
      project.title,
      project.topics.join(", ")
    );
  });
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Анимация только при первом рендере (без tag)
    if (!tag) {
      animate(projectsRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        translateY: [20, 0],
        duration: 300,
        easing: "easeOutQuad",
        delay: (_, i) => {
          // Группируем карточки попарно (каждая пара появляется одновременно)
          const pairIndex = Math.floor(i / 2);
          return pairIndex * 200; // Задержка между парами
        },
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
    }
  }, [tag]);

  // Анимация при смене топика (tag)
  useEffect(() => {
    if (!tag) return; // Пропускаем первый рендер

    // Сначала устанавливаем начальное состояние
    projectsRef.current.forEach((el) => {
      if (el) {
        el.classList.remove("animate-in");
        el.classList.add("flash-initial-state");
      }
    });

    // Небольшая задержка для обновления DOM
    const timer = setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Анимация смены проектов через CSS классы
      projectsRef.current.forEach((el) => {
        if (el) {
          setTimeout(() => {
            el.classList.remove("flash-initial-state");
            el.classList.add("flash-animate-in");
          }, 200);
        }
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [tag]);

  return (
    <div
      ref={sectionRef}
      className="grid xs:grid-cols-2 grid-cols-1 xl:gap-5 gap-2.5"
    >
      {projects.map((item, index) => (
        <ProjectCard
          ref={(el) => {
            if (el) {
              // Обновляем refs при каждом рендере
              projectsRef.current[index] = el;
              // Добавляем базовый класс для анимации
              el.classList.add("projects-grid-item");
              // Если это первый рендер без tag, добавляем класс для анимации
              if (!tag) {
                el.classList.add("animate-in");
              }
            }
          }}
          key={item.title}
          custom-cursor="hover"
          className="w-full"
          data={item}
        />
      ))}
    </div>
  );
}
