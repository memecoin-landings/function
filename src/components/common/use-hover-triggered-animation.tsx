"use client"
import { useEffect, useState, RefObject } from "react";

export function useHoverTriggeredAnimation({
  el,
  animationRule,
  animationClass
}: { el: RefObject<HTMLElement>, animationRule?: string, animationClass?: string }): void {
  const [playing, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleHover = () => {
      if (playing || !el.current) return;
      setIsPlaying(true);
      el.current.onanimationend = () => {
        if (animationRule) el.current.style.animation = "";
        if (animationClass) el.current.classList.remove(animationClass);
        setIsPlaying(false);
      }
      if (animationRule) el.current.style.animation = animationRule;
      if (animationClass) el.current.classList.add(animationClass);
    };

    // Добавляем слушатель скролла
    const elementCopy = el.current;
    elementCopy?.addEventListener('mouseover', handleHover);

    // Очистка
    return () => {
      elementCopy?.removeEventListener('mouseover', handleHover);
    };
  }, [el, animationRule, animationClass, playing]);
}
