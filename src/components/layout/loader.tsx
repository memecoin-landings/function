"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, createAnimatable } from "animejs";
import Cookies from "js-cookie";
import { usePageLoadingStatus } from "@/hooks/usePageLoadingStatus";

export default function Loader() {
  const loaderBgRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const progressRef = useRef<any>(null);

  const { shouldShow, domReady, imagesLoaded, fontsLoaded, isComplete } =
    usePageLoadingStatus();

  // const hasCookie = Cookies.get("showedLoaderOnce") === "true" && false;

  // Initialize animatable
  useEffect(() => {
    if (!shouldShow) return;

    const loaderBar = loaderBarRef.current;
    if (!loaderBar) return;

    progressRef.current = createAnimatable(loaderBar, {
      value: 0,
      ease: "out(2)",
      duration: 1000,
    });

    progressRef.current.animations.value.onRender = () => {
      const progress = progressRef.current.value();
      const valueSpan = loaderBar.querySelector(".value");
      if (valueSpan) {
        valueSpan.textContent = Math.round(progress).toString();
      }
      loaderBar.style.transform = `translateX(${progress}vw)`;
    };
  }, [shouldShow]);

  // Initial fade-in
  useEffect(() => {
    if (!shouldShow) return;

    const loaderBg = loaderBgRef.current;
    if (!loaderBg) return;

    console.log("[Loader] Showing loader");
    animate(loaderBg, {
      opacity: [0, 1],
      duration: 10,
      easing: "easeOutQuad",
    });
  }, [shouldShow]);

  // Update progress when loading states change
  useEffect(() => {
    if (!shouldShow || !progressRef.current) return;

    let targetProgress = 0;
    if (domReady) targetProgress += 50;
    if (imagesLoaded) targetProgress += 25;
    if (fontsLoaded) targetProgress += 25;

    console.log("[Loader] Updating progress to:", targetProgress);

    progressRef.current.value(targetProgress);

    // If not complete, slowly creep forward to avoid feeling stuck
    if (targetProgress < 100) {
      const creepInterval = setInterval(() => {
        const current = progressRef.current.value();
        // Slowly add progress but don't exceed the next threshold
        const nextThreshold = targetProgress + 10;
        if (current < nextThreshold) {
          if (Math.random() > 0.2)
            progressRef.current.value(current + Math.random() * 5);
        }
      }, 750);

      return () => clearInterval(creepInterval);
    }
  }, [domReady, imagesLoaded, fontsLoaded, shouldShow]);

  // Exit animation when complete
  useEffect(() => {
    if (!shouldShow || !isComplete) return;

    const loaderBg = loaderBgRef.current;
    const loaderBar = loaderBarRef.current;
    if (!loaderBg || !loaderBar) return;

    console.log("[Loader] Starting exit animation");

    const exitAnim = animate(loaderBar, {
      x: `100vw`,
      easing: "easeInOut",
      duration: 1000,
    });

    createTimeline()
      .sync(exitAnim)
      .add(loaderBg, {
        opacity: [1, 0],
        duration: 1000,
        delay: 300,
      })
      .then(() => {
        console.log("[Loader] Exit complete");
        loaderBg.hidden = true;
        Cookies.set("showedLoaderOnce", "true", { expires: 7, path: "/" });
      });
  }, [isComplete, shouldShow]);

  if (!shouldShow) return null;

  return (
    <div
      ref={loaderBgRef}
      id="loader"
      className="opacity-0 z-500 fixed flex items-center justify-center inset-0 bg-black"
    >
      <div
        ref={loaderBarRef}
        id="loader-bar"
        className="fixed transform translate-x-[-100vw] w-screen bg-[#FF3F1A] h-screen font-bold text-[2.5rem] xs:text-[3.75rem] md:text-[6.25rem] px-2.5 md:px-5 flex items-center justify-end"
      >
        ƒ (<span className="value">0</span>%)
      </div>
    </div>
  );
}
