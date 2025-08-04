"use client"

import { cn } from '@/lib/utils';
import { animate, createScope } from 'animejs';
import React, { useEffect, useRef, useState } from 'react';

// Replace this with your actual SVG arrow component or string
const ArrowSVG: React.FC = () => (
  <svg
    className="cursor-svg"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      pointerEvents: 'none',
    }}
  >
    <path
      d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72Z"
      fill="#FF3F1A"
    />
    <path
      d="M31.387 25.4375V28.3292H41.6253L25.4375 44.517L27.4793 46.5588L43.6671 30.371V40.6093H46.5588V25.4375H31.387Z"
      fill="#F0EDE8"
    />
  </svg>
);

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // const isSmallScreen = window.innerWidth <= 768;
      // setIsMobile(isTouchDevice || isSmallScreen);
      setIsMobile(isTouchDevice);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    // Don't initialize cursor functionality on mobile
    if (isMobile) {
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Initialize Anime.js scope
    scopeRef.current = createScope({ root: document.body }).add(() => {
      // Animate cursor to follow mouse
      const moveCursor = (e: MouseEvent) => {
        if (cursorRef.current) {
          cursorRef.current.hidden = isMobile;
          animate(cursorRef.current, {
            left: e.clientX,
            top: e.clientY,
            duration: 0,
          });
        }
      };

      // Handle hover on interactive elements
      const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('[custom-cursor="hover"]')) {
          setIsHovering(true);
          animate(cursorRef.current!, {
            scale: 4.3,
            ease: 'out(3)',
            duration: 200,
          });
        } else {
          setIsHovering(false);
          animate(cursorRef.current!, {
            scale: 1,
            ease: 'out(3)',
            duration: 200,
          });
        }
      };

      // Add event listeners
      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseover', handleHover);

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleHover);
      };
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scopeRef.current?.revert();
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      // shadow-[0px_0px_4px_1px_rgba(230,57,23,0.49)]
      className={cn("fixed w-4 h-4 bg-[#FF3F1A] rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ")}
    >
      {isHovering && <ArrowSVG />}
    </div>
  );
}

export default CustomCursor;
