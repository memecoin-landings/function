import { useEffect, useState, RefObject } from "react";

interface UseScrollAnimationProps {
  containerRef: RefObject<HTMLElement>;
  stickyElementRef: RefObject<HTMLElement>;
}

interface UseScrollAnimationReturn {
  animationProgress: number | undefined;
}

export function useScrollAnimation({
  containerRef, stickyElementRef
}: UseScrollAnimationProps): UseScrollAnimationReturn {
  const [animationProgress, setAnimationProgress] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyElementRef.current;
    let stickyRect = sticky.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height;
    const stickyHeight = sticky.offsetHeight;
    const trackLength = containerHeight - stickyHeight;

    const handleScroll = () => {
      stickyRect = sticky.getBoundingClientRect();
      containerRect = container.getBoundingClientRect();
      const progress = (stickyRect.top - containerRect.top) / trackLength;
      setAnimationProgress(progress);
    };

    // Добавляем слушатель скролла
    window.addEventListener('scroll', handleScroll);

    // Очистка
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, stickyElementRef]);

  return { animationProgress };
}
