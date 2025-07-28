"use client"
import { useRef, useEffect } from 'react';

export function useParallax({ strength = 0.05, maxShift = 50, disableOnMobile = true } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout | null;

  useEffect(() => {
    //  ─────── if (disableOnMobile && window.innerWidth < 768) return; ───────

    const handleScroll = () => {
      if (timeout) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeout = setTimeout(() => {
        if (ref.current) {
          const section = ref.current.parentElement;
          if (!section) return;
          const sectionTop = section?.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const scrollOffset = sectionTop / windowHeight;
          const translateY = Math.min(scrollOffset * windowHeight * strength, maxShift);
          ref.current.style.transform = `translateY(${translateY}px)`;
        }
        timeout = null;
      }, 16);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [strength, maxShift, disableOnMobile]);

  return { ref, style: { willChange: 'transform', transition: 'transform 0.3s ease-out' } };
}
