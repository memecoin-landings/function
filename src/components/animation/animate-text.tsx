"use client";

import { useEffect, useRef, useState } from "react";
import { animate, text } from "animejs";

interface AnimeTextSplitProps {
  texts: string[];
  className?: string;
  switchDelay?: number;
  typingSpeed?: number;
  erasingSpeed?: number;
}

export default function TypewriterAnimatedLabel({
  texts,
  className = "",
  switchDelay = 3000,
  typingSpeed = 80,
  erasingSpeed = 50,
}: AnimeTextSplitProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create randomized stagger delays for more realistic typing
  const createRandomStagger = (baseDelay: number, variance: number = 0.5) => {
    return (_: unknown, i: number) => {
      const randomFactor = 1 + (Math.random() - 0.3) * variance;
      return baseDelay * i * randomFactor;
    };
  };

  const typeText = async (textContent: string) => {
    if (!textRef.current) return;

    // Clear previous content but keep cursor
    const cursor = cursorRef.current;
    textRef.current.innerHTML = "";

    // Create container for text and cursor
    const textElement = document.createElement("span");
    textElement.textContent = textContent;
    textRef.current.appendChild(textElement);

    if (cursor) {
      textRef.current.appendChild(cursor);
    }

    const { chars } = text.split(textElement, {
      chars: { wrap: "visible" },
    });

    // Initially hide all characters
    chars.forEach((char: HTMLElement) => {
      char.style.display = "none";
    });

    // Type characters one by one with random delays
    return new Promise<void>((resolve) => {
      chars.forEach((char: HTMLElement, index: number) => {
        const delay = createRandomStagger(typingSpeed, 0.6)(char, index);

        setTimeout(() => {
          char.style.display = "inline-block";

          // Check if this is the last character
          if (index === chars.length - 1) {
            resolve();
          }
        }, delay);
      });
    });
  };

  const eraseText = async () => {
    if (!textRef.current) return;

    const textSpan = textRef.current.querySelector('span:not(.typing-cursor)');
    if (!textSpan) return;

    const { chars } = text.split(textSpan as HTMLElement, {
      chars: { wrap: "visible" },
    });

    // Erase characters from right to left with random delays
    return new Promise<void>((resolve) => {
      const reversedChars = chars.reverse();

      reversedChars.forEach((char: HTMLElement, index: number) => {
        const delay = createRandomStagger(erasingSpeed, 0.4)(char, index);

        setTimeout(() => {
          char.style.display = "none";

          // Check if this is the last character to be erased
          if (index === reversedChars.length - 1) {
            resolve();
          }
        }, delay);
      });
    });
  };

  const createCursor = () => {
    if (!textRef.current || cursorRef.current) return;

    // Create new cursor
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "|";
    cursor.style.opacity = "1";
    cursor.style.display = "inline-block";
    textRef.current.appendChild(cursor);
    cursorRef.current = cursor;

    // Animate cursor blinking
    animate(cursor, {
      opacity: [1, 0, 1],
      duration: 1000,
      loop: true,
      ease: "linear",
    });
  };

  const shuffleTexts = () => {
    texts.sort(() => Math.random() - 0.5)
  }

  const animateWordChange = async () => {
    if (!textRef.current || isAnimating) return;
    if (currentIndex === 0) shuffleTexts()

    setIsAnimating(true);

    try {
      await eraseText();

      // Phase 2: Small pause
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

      // Phase 3: Type new text
      const nextIndex = (currentIndex + 1) % texts.length;
      await typeText(texts[nextIndex]!);

      setCurrentIndex(nextIndex);
    } finally {
      setIsAnimating(false);
    }
  };

  // Initialize first text
  useEffect(() => {
    if (texts.length > 0 && !isAnimating) {
      createCursor();
      typeText(texts[currentIndex]!);
    }
  }, [texts]);

  // Schedule word changes
  useEffect(() => {
    if (texts.length > 1 && !isAnimating) {
      const timer = setTimeout(() => {
        animateWordChange();
      }, switchDelay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isAnimating, texts.length, switchDelay]);

  return (
    <p
      ref={textRef}
      className={`${className} whitespace-nowrap inline-flex items-center`}
    />
  );
}
