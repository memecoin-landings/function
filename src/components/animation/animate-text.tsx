"use client";

import { useEffect, useRef, useState } from "react";
import { animate, text, stagger } from "animejs";

interface AnimeTextSplitProps {
  texts: string[];
  className?: string;
  switchDelay?: number;
}

export default function AnimeTextSplit({
  texts,
  className = "",
  switchDelay = 3000,
}: AnimeTextSplitProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateText = (textContent: string) => {
    if (!textRef.current) return;

    // Clear previous content
    textRef.current.innerHTML = "";

    // Create new text content
    const textElement = document.createElement("span");
    textElement.textContent = textContent;
    textRef.current.appendChild(textElement);

    const { chars } = text.split(textElement, {
      chars: { wrap: "visible" },
    });

    // Set initial state for fade in
    animate(chars, {
      opacity: [0, 1],
      y: [20, 0],
      duration: 1200,
      ease: "out(3)",
      delay: stagger(25),
      complete: () => {
        setIsAnimating(false);
      },
    });
  };

  const fadeOutAndChange = () => {
    if (!textRef.current || isAnimating) return;

    setIsAnimating(true);

    // Fade out current text
    animate(textRef.current.children, {
      opacity: [1, 0],
      y: [0, -20],
      duration: 400,
      ease: "out(2)",
      delay: stagger(30),
      complete: () => {
        // Change to next text after fade out
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
      },
    });
  };

  useEffect(() => {
    if (texts.length > 0) {
      animateText(texts[currentIndex]!);
    }
  }, [currentIndex, texts]);

  // Start the cycle when component mounts
  useEffect(() => {
    if (texts.length > 1) {
      // Initial delay before starting the cycle
      const timer = setTimeout(() => {
        fadeOutAndChange();
      }, switchDelay);

      return () => clearTimeout(timer);
    }
  }, [texts.length, switchDelay]);

  // Schedule next fade out after current text is shown
  useEffect(() => {
    if (texts.length > 1 && !isAnimating) {
      const timer = setTimeout(() => {
        fadeOutAndChange();
      }, switchDelay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isAnimating, texts.length, switchDelay]);

  return (
    <p
      ref={textRef}
      className={`${className} whitespace-nowrap`}
    />
  );
}
