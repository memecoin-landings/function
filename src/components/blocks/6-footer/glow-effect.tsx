"use client";

import React from "react";

import { useEffect, useRef, useCallback } from "react";
import { createAnimatable } from "animejs";

const MAX_DELTA = 100; // Increase this to make the animation "last longer" (require more scroll)
const SENSITIVITY_DIVIDER = 2; // Increase this (e.g., 3) to decrease sensitivity (slower accumulation per event)
const RESET_TIMEOUT = 200;
const DAMPING_FACTOR = 0.05; // Lower values = slower, smoother fade out (0.1 was original)


export default function GlowEffect() {
  const glowEffect = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const isOverscrolling = useRef(false);
  const animatableInstance = useRef<ReturnType<typeof createAnimatable> | null>(
    null
  );

  const overscrollProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Проверяем, находимся ли в самом низу страницы
  const checkIfAtBottom = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 10;

    return scrollTop + windowHeight >= documentHeight - threshold;
  }, []);

  // RAF loop for smoothing progress with lerp
  const animateLoop = useCallback(() => {
    if (!animatableInstance.current) return;

    // Lerp current progress toward target using damping factor
    overscrollProgress.current +=
      (targetProgress.current - overscrollProgress.current) * DAMPING_FACTOR;

    const intensity = overscrollProgress.current;

    // Update styles based on smoothed progress
    animatableInstance.current.targets[0]!.style.opacity = intensity.toString();
    animatableInstance.current.targets[0]!.style.transform = `translate(-50%, 0) scale(0.8) translateY(${100 - intensity * 100
      }px)`;

    // Stop loop if settled (close to target and not overscrolling)
    if (
      Math.abs(targetProgress.current - overscrollProgress.current) > 0.001 ||
      isOverscrolling.current
    ) {
      rafId.current = requestAnimationFrame(animateLoop);
    } else {
      rafId.current = null;
    }
  }, []);

  // Обработка wheel событий для мыши и тачпада
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!checkIfAtBottom()) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        isOverscrolling.current = true;
        accumulatedDelta.current = Math.min(
          accumulatedDelta.current + e.deltaY / SENSITIVITY_DIVIDER,
          MAX_DELTA
        ); // Adjusted with divider and new max
        targetProgress.current = Math.min(
          accumulatedDelta.current / MAX_DELTA,
          1
        );

        // Start/restart the smoothing loop if not running
        if (rafId.current === null) {
          rafId.current = requestAnimationFrame(animateLoop);
        }

        // Reset the timeout for wheel release
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(resetToZero, RESET_TIMEOUT);
      }
    },
    [checkIfAtBottom, animateLoop]
  );

  // Обработка touch событий (similar updates: set target and start loop)
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!checkIfAtBottom()) return;

      const touch = e.touches[0];
      if (touch && e.target) {
        isOverscrolling.current = true;
        (e.target as HTMLElement & { touchStartY?: number }).touchStartY =
          touch.clientY;
        // Don't reset accumulated delta on touch start to allow continuous overscroll
      }
    },
    [checkIfAtBottom]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!checkIfAtBottom()) return;

      const touch = e.touches[0];
      const target = e.target as HTMLElement & { touchStartY?: number };

      if (touch && target.touchStartY) {
        const deltaY = target.touchStartY - touch.clientY;
        if (deltaY > 0) {
          e.preventDefault();
          // Accumulate delta like wheel events for smooth animation
          accumulatedDelta.current = Math.min(
            accumulatedDelta.current + deltaY / SENSITIVITY_DIVIDER,
            MAX_DELTA
          );
          targetProgress.current = Math.min(
            accumulatedDelta.current / MAX_DELTA,
            1
          );

          // Start/restart the smoothing loop if not running
          if (rafId.current === null) {
            rafId.current = requestAnimationFrame(animateLoop);
          }

          // Update touch start position for next move calculation
          target.touchStartY = touch.clientY;
        }
      }
    },
    [checkIfAtBottom, animateLoop]
  );

  const handleTouchEnd = useCallback(() => {
    // Use timeout like wheel events for smooth fade out
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(resetToZero, RESET_TIMEOUT);
  }, []);

  // Обработка scroll событий для мобильных устройств
  const handleScroll = useCallback(() => {
    if (!checkIfAtBottom()) {
      lastScrollY.current =
        window.pageYOffset || document.documentElement.scrollTop;
      return;
    }

    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;
    const velocity = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;
    scrollVelocity.current = velocity;

    // Обнаруживаем попытку скролла вниз когда уже внизу
    if (velocity > 0) {
      isOverscrolling.current = true;
      // Увеличиваем накопленную дельту более агрессивно для scroll событий
      const scrollDelta = Math.abs(velocity) * 100;
      accumulatedDelta.current = Math.min(
        accumulatedDelta.current + scrollDelta,
        MAX_DELTA
      );
      targetProgress.current = Math.min(
        accumulatedDelta.current / MAX_DELTA,
        1
      );

      // Start/restart the smoothing loop if not running
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animateLoop);
      }

      // Reset the timeout for scroll release
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(resetToZero, RESET_TIMEOUT);
    }
  }, [checkIfAtBottom, animateLoop]);

  // New: Function to smoothly reset to zero
  const resetToZero = useCallback(() => {
    isOverscrolling.current = false;
    accumulatedDelta.current = 0;
    targetProgress.current = 0;
    // Remove instant set - let it smooth animate back to 0

    // Start/restart the smoothing loop if not running to animate back to 0
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animateLoop);
    }
  }, [animateLoop]);

  useEffect(() => {
    const glowElement = glowEffect.current;
    if (!glowElement) return;

    // Создаем animatable объект
    const animatable = createAnimatable(glowElement, {
      opacity: 0,
      scale: 0.8,
      y: 10000,
      duration: 1200,
      easing: "easeOutCubic",
      ease: "outCubic",
    });

    animatableInstance.current = animatable;

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
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
    animateLoop,
  ]);

  return (
    <div
      ref={glowEffect}
      className="z-0 absolute left-1/2 w-[110vw] border-5 will-change-[opacity,_transform] backface-hidden border-red-900 md:blur-[15vw] blur-[400px] md:w-[85vw] h-[85.7cqw] top-[80%] md:top-[70%] bg-cover rounded-[50%] bg-[radial-gradient(circle_at_0%_100%,#FF3F1A_0%,#FF5921_100%)]"
      style={{
        opacity: 0,
        transform: "translate(-50%, 0)",
      }}
    />
  )
}
