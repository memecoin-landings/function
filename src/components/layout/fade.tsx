"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function FadeTransitionProvider({ children }: { children: React.ReactNode }) {

  const variants = {
    hidden: { opacity: 0, y: 0, brightness: 0.8 },
    enter: { opacity: 1, y: 0, brightness: 1 },
    exit: { opacity: 0, y: 0, brightness: 0.8 },
  };

  const pathname = usePathname();

  return (
    <motion.div
      key={pathname} // Ключ для триггера на роуте
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>

  )
  {/* asdf */ }
}
