"use client";

import Lenis from 'lenis';
import { useEffect, } from 'react';

function SmoothScroll() {
  // Инициализация Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Запуск анимации Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Очистка при размонтировании
    return () => {
      lenis.destroy();
    };
  }, []);
}

export default SmoothScroll;
