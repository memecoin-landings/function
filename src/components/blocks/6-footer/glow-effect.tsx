"use client";

import React from "react";

import { useEffect, useRef, useCallback } from "react";
import { AnimatableObject, createAnimatable } from "animejs";

type TouchTargetWithStartY = EventTarget & { touchStartY?: number };

const RESET_TIMEOUT = 300;
const TRANSITION_DURATION = 800;
const WHEEL_SENSITIVITY = 0.01;
const TOUCH_SENSITIVITY = 0.01;
const SCROLL_SENSITIVITY = 0.1;

export default function GlowEffect() {
  const glowEffect = useRef<HTMLDivElement>(null);
  const animatableInstance = useRef<AnimatableObject>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  // Проверяем, находимся ли в самом низу страницы
  const checkIfAtBottom = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 10;

    return scrollTop + windowHeight >= documentHeight - threshold;
  }, []);

  const resetToZero = useCallback(() => {
    if (!animatableInstance.current?.["--progress"]) return;
    animatableInstance.current["--progress"](0);
  }, [animatableInstance]);

  const updateResetTimeout = useCallback(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(resetToZero, RESET_TIMEOUT);
  }, [resetToZero]);

  const changeProgress = useCallback((delta: number, autoReset = true) => {
    const progress = animatableInstance.current?.["--progress"];
    if (!progress) return;
    progress(progress() as number + delta / Math.log(progress() as number + 2));
    if (autoReset) updateResetTimeout()
  }, [updateResetTimeout]);

  // Обработка wheel событий для мыши и тачпада
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!checkIfAtBottom() || e.deltaY <= 0) return;
      changeProgress(e.deltaY * WHEEL_SENSITIVITY);
      e.preventDefault();
    },
    [checkIfAtBottom, changeProgress]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!checkIfAtBottom() || !e.touches[0] || !e.target) return;
      (e.target as { touchStartY?: number }).touchStartY = e.touches[0].clientY;
    },
    [checkIfAtBottom]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      const target = e.target as TouchTargetWithStartY;
      if (!checkIfAtBottom() || !touch || !target?.touchStartY) return;

      const deltaY = target.touchStartY - touch.clientY;
      changeProgress(deltaY * TOUCH_SENSITIVITY, false);
      if (deltaY > 0) e.preventDefault();
    },
    [checkIfAtBottom, changeProgress]
  );

  const handleTouchEnd = useCallback(() => { updateResetTimeout() }, [updateResetTimeout]);

  // Обработка scroll событий для мобильных устройств
  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const velocity = currentScrollY - lastScrollY.current;
    if (checkIfAtBottom() && velocity > 0) {
      changeProgress(Math.abs(velocity) * SCROLL_SENSITIVITY);
    }
    lastScrollY.current = currentScrollY;
  }, [checkIfAtBottom, changeProgress]);

  useEffect(() => {
    if (!glowEffect.current) return;

    // Создаем animatable объект
    animatableInstance.current = createAnimatable(glowEffect.current, {
      "--progress": 0,
      duration: TRANSITION_DURATION,
      easing: "easeOutCubic",
      ease: "outCubic",
    });

    // Добавляем слушатели событий
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
  ]);

  return (
    <div
      ref={glowEffect}
      className="z-1 absolute left-1/2 w-[110vw] will-change-[opacity,_transform] border-red-900 md:blur-[15vw] blur-[40px] md:w-[85vw] h-[85.7cqw] bottom-0 bg-cover rounded-[50%] bg-[radial-gradient(circle_at_0%_100%,#FF3F1A_0%,#FF5921_100%)]"
      style={{
        opacity: "var(--progress, 0)",
        transform: "translate(-50%, 100%) scaleY(min(calc(1 + var(--progress, 0) * 0.2),2))  ",
      }}
    />
  )
}
