"use client";

// import { animate, onScroll, stagger } from "animejs";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import WebGLBlurEffect from "../../../components/blur/webgl-blur-component";

export default function HomeBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  
  const [blurParams, setBlurParams] = useState({
    blurRadius: 20.0,
    blurOffset: 0.8,
    mouseRadius: 0.75,
    effectPower: 0.82,
    centerPoint: 0.5
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // const elements = [headerRef.current, paragraphRef.current].filter(
    //   (el) => el !== null
    // );
    //
    // animate(elements, {
    //   opacity: [0, 1],
    //   translateX: ["-10vw", 0],
    //   duration: 800,
    //   easing: "easeOutQuad",
    //   delay: stagger(200), // Staggered delay of 200ms between header and paragraph
    //   autoplay: onScroll({
    //     target: section,
    //     container: document.body,
    //   }),
    // });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "w-full flex flex-col @container fluid-container max-w-screen overflow-hidden",
      )}
    >
      <WebGLBlurEffect 
        className="w-full bg-[#151516] pt-[1em]" 
        {...blurParams}
      >
        <div
          id="home-hero"
          ref={headerRef}
          className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap xs:pl-0"
        >
          Unique
          <br />
          Solutions —
        </div>
      </WebGLBlurEffect>
      <p
        ref={paragraphRef}
        className="text-5xl pointer-events-none @container text-[3.75cqw] leading-[4.5cqw] mt-[-1.51em] relative z-10 font-medium md:pr-[9.58cqw]"
      >
        Functionally and strategically refined design by a brand identity studio that solves business challenges, drives growth, and is based on in‑depth analysis
      </p>
      
      {/* Blur Controls */}
      <div className="fixed top-4 right-4 bg-black/80 p-4 rounded-lg z-50 min-w-[300px] backdrop-blur-sm">
        <h3 className="text-white font-bold mb-4">Blur Parameters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">
              Blur Radius: {blurParams.blurRadius.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={blurParams.blurRadius}
              onChange={(e) => setBlurParams(prev => ({ ...prev, blurRadius: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">
              Blur Offset: {blurParams.blurOffset.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={blurParams.blurOffset}
              onChange={(e) => setBlurParams(prev => ({ ...prev, blurOffset: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">
              Mouse Radius: {blurParams.mouseRadius.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={blurParams.mouseRadius}
              onChange={(e) => setBlurParams(prev => ({ ...prev, mouseRadius: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">
              Effect Power: {blurParams.effectPower.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.02"
              value={blurParams.effectPower}
              onChange={(e) => setBlurParams(prev => ({ ...prev, effectPower: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">
              Center Point: {blurParams.centerPoint.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={blurParams.centerPoint}
              onChange={(e) => setBlurParams(prev => ({ ...prev, centerPoint: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => setBlurParams({
              blurRadius: 20.0,
              blurOffset: 0.8,
              mouseRadius: 0.75,
              effectPower: 0.82,
              centerPoint: 0.5
            })}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Reset
          </button>
          <button 
            onClick={() => setBlurParams({
              blurRadius: Math.random() * 40 + 5, // 5-45
              blurOffset: Math.random() * 1.5, // 0-1.5
              mouseRadius: Math.random() * 1.5 + 0.2, // 0.2-1.7
              effectPower: Math.random() * 1.5 + 0.3, // 0.3-1.8
              centerPoint: Math.random() * 0.8 + 0.1 // 0.1-0.9
            })}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Random
          </button>
        </div>
      </div>
    </section>
  );
}
