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
      d="M31.387 25.4375V28.3292H41.6253L25.4375 44.517L27.4793 46.5588L43.6671 30.371V40.6093H46.5588V25.4375H31.387Z"
      fill="#F0EDE8"
    />
  </svg>
);

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {

    scopeRef.current = createScope({ root: document.body }).add(() => {
      const moveCursor = (e: MouseEvent) => {
        if (cursorRef.current) {
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
            width: 72,
            height: 72,
            ease: 'out(3)',
            duration: 200,
          });
        } else {
          setIsHovering(false);
          animate(cursorRef.current!, {
            width: 16,
            height: 16,
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
      scopeRef.current?.revert();
    };
  })

  return (
    <div
      ref={cursorRef}
      style={{ top: -100, left: -100 }}
      className={cn("fixed w-4 h-4 bg-[#FF3F1A] rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center")}
    >
      {isHovering && (
        <div style={{ 
          width: '100%', 
          height: '100%',
          imageRendering: 'crisp-edges',
          transform: 'translateZ(0)'
        }}>
          <ArrowSVG />
        </div>
      )}
    </div>
  );
}

export default CustomCursor;
