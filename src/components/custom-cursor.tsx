'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: mousePosition.y,
        left: mousePosition.x,
        width: '1rem',
        height: '1rem',
        background: '#FF3F1A',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease',
        boxShadow: '0 0 2px #FF3F1A, 0 0 2px #FF3F1A, 0 0 2px #FF3F1A',
      }}
    />
  );
} 