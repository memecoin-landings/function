'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovered(target.closest('[custom-cursor="hover"]') !== null);
    };

    document.addEventListener('mouseover', handleHover);
    return () => document.removeEventListener('mouseover', handleHover);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: mousePosition.y,
        left: mousePosition.x,
        width: hovered ? '72px' : '1rem',
        height: hovered ? '72px' : '1rem',
        background: hovered ? 'url(/hover-cursor.svg) no-repeat center' : '#FF3F1A',
        borderRadius: hovered ? '0' : '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: hovered ? 'translate(-50%, -50%) ' : 'translate(-50%, -50%)',
        transition: 'transform 0.5s ease',
        boxShadow: hovered ? 'none' : '0 0 2px #FF3F1A, 0 0 2px #FF3F1A, 0 0 2px #FF3F1A',
      }}
    />
  );
} 