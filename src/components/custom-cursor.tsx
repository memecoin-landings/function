'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovered(!!target.closest('[custom-cursor="hover"]'));
    };
    document.addEventListener('mouseover', onMouseOver);
    return () => document.removeEventListener('mouseover', onMouseOver);
  }, []);

  return (
    <motion.div
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: hovered ? 4 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 1200,
        damping: 60,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 17,
        height: 17,
        borderRadius: '50%',
        background: '#FF3F1A',
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered ? 'none' : '0 0 2px #FF3F1A',
      }}
    >
      <motion.svg
        width={hovered ? 72 : 0}
        height={hovered ? 72 : 0}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
        }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 0.25 : 0.125,
        }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <path
          d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72Z"
          fill="#FF3F1A"
        />
        <path
          d="M31.387 25.4375V28.3292H41.6253L25.4375 44.517L27.4793 46.5588L43.6671 30.371V40.6093H46.5588V25.4375H31.387Z"
          fill="#F0EDE8"
        />
      </motion.svg>
    </motion.div>
  );
}
