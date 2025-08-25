"use client";
import BehanceIcon from "@/components/common/behance-icon";
import FooterForm from "@/components/common/footer-form/footer-form";
import InstagramIcon from "@/components/common/instagram-icon";
import TelegramCircleIcon from "@/components/common/telegram-circle-icon";
import DribbleIcon from "@/components/common/unknown-cw";
import WhatsappCircleIcon from "@/components/common/whatsapp-circle-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

import Contacts from "../../../domain/contacts";
import { useEffect, useRef, useCallback } from "react";
import { createAnimatable } from "animejs";

const MAX_DELTA = 1000; // Increase this to make the animation "last longer" (require more scroll)
const SENSITIVITY_DIVIDER = 4; // Increase this (e.g., 3) to decrease sensitivity (slower accumulation per event)

export default function Footer({
  className,
}: {
  className: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowEffect = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const isOverscrolling = useRef(false);
  const animatableInstance = useRef<ReturnType<typeof createAnimatable> | null>(null);
  const overscrollProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // Проверяем, находимся ли в самом низу страницы
  const checkIfAtBottom = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 10;
    
    return scrollTop + windowHeight >= documentHeight - threshold;
  }, []);

  // RAF loop for smoothing progress with lerp
  const animateLoop = useCallback(() => {
    if (!animatableInstance.current) return;

    // Lerp current progress toward target (0.1 is damping factor; adjust for faster/slower smoothing, e.g., 0.2 for quicker)
    overscrollProgress.current += (targetProgress.current - overscrollProgress.current) * 0.1;

    const intensity = overscrollProgress.current;
    
    // Update styles based on smoothed progress
    animatableInstance.current.targets[0]!.style.opacity = intensity.toString();
    animatableInstance.current.targets[0]!.style.transform = `translate(-50%, 0) scale(0.8) translateY(${100 - (intensity * 100)}px)`;

    // Stop loop if settled (close to target and not overscrolling)
    if (Math.abs(targetProgress.current - overscrollProgress.current) > 0.001 || isOverscrolling.current) {
      rafId.current = requestAnimationFrame(animateLoop);
    } else {
      rafId.current = null;
    }
  }, []);

  // Обработка wheel событий для мыши и тачпада
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!checkIfAtBottom()) return;
    
    if (e.deltaY > 0) {
      e.preventDefault();
      isOverscrolling.current = true;
      accumulatedDelta.current = Math.min(accumulatedDelta.current + (e.deltaY / SENSITIVITY_DIVIDER), MAX_DELTA); // Adjusted with divider and new max
      targetProgress.current = Math.min(accumulatedDelta.current / MAX_DELTA, 1);

      // Start/restart the smoothing loop if not running
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animateLoop);
      }
    }
  }, [checkIfAtBottom, animateLoop]);

  // Обработка touch событий (similar updates: set target and start loop)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!checkIfAtBottom()) return;
    
    const touch = e.touches[0];
    if (touch && e.target) {
      isOverscrolling.current = true;
      (e.target as HTMLElement & { touchStartY?: number }).touchStartY = touch.clientY;
      accumulatedDelta.current = 0;
    }
  }, [checkIfAtBottom]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!checkIfAtBottom()) return;
    
    const touch = e.touches[0];
    const target = e.target as HTMLElement & { touchStartY?: number };
    
    if (touch && target.touchStartY) {
      const deltaY = target.touchStartY - touch.clientY;
      if (deltaY > 0) {
        e.preventDefault();
        accumulatedDelta.current = Math.min(deltaY / SENSITIVITY_DIVIDER, MAX_DELTA); // Adjusted with divider and new max
        targetProgress.current = Math.min(accumulatedDelta.current / MAX_DELTA, 1);

        // Start/restart the smoothing loop if not running
        if (rafId.current === null) {
          rafId.current = requestAnimationFrame(animateLoop);
        }
      }
    }
  }, [checkIfAtBottom, animateLoop]);

  const handleTouchEnd = useCallback(() => {
    isOverscrolling.current = false;
    accumulatedDelta.current = 0;
    targetProgress.current = 0; // Smooth back to 0
  }, []);

  // Плавное возвращение при отпускании wheel (updated to set target=0 and let loop handle smoothing)
  useEffect(() => {
    const resetOverscroll = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        if (!isOverscrolling.current) {
          accumulatedDelta.current = 0;
          targetProgress.current = 0; // Set target to 0; loop will lerp down smoothly
          // Ensure loop is running to handle the reset
          if (rafId.current === null) {
            rafId.current = requestAnimationFrame(animateLoop);
          }
        }
      }, 150);
    };
    
    if (targetProgress.current > 0 && isOverscrolling.current) {
      resetOverscroll();
    }

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [targetProgress.current, animateLoop]); // Depend on targetProgress.current (but since ref, it's ok)

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const glowElement = glowEffect.current;
    if (!glowElement) return;

    // Создаем animatable объект (unchanged)
    const animatable = createAnimatable(glowElement, {
      opacity: 0,
      scale: 0.8,
      y: 100,
      duration: 1200,
      easing: "easeOutCubic",
      ease: "outCubic"
    });
    
    animatableInstance.current = animatable;

    // Добавляем слушатели событий (unchanged)
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, animateLoop]);

  return (
    <>
      <footer ref={sectionRef} className={cn(className, "w-full bg-black md:pt-25 pt-12.5 relative @container overflow-hidden **:transition-colors")}>
        <div className="z-5 relative fluid-container @container">
          <div className="@container mb-5 md:mb-16.5 w-full text-center ">
            <Link
              href={"mailto:" + Contacts.email}
              // было 7.495cqw, но на хроме из-за этого вылезал, не понятно в чем дело
              className="text-[#F0EDE8] duration-150 hover:text-[#FF3F1A] whitespace-nowrap text-[7cqw] tracking-[-3%] underline-offset-[1.9cqw] underline font-medium decoration-solid"
            >
              {Contacts.email}
            </Link>
          </div>
          <div className="px-11.25 pb-12.5 md:pb-25">
            <div className="flex flex-row space-x-5 xs:justify-center text-[0.75rem] xs:text-[0.875rem] tracking-[-3%]   @container">
              <div className="flex items-center">
                <p className="flex items-center text-[3.5cqw] xs:text-[clamp(0.75rem,3.5cqw,0.875rem)] md:text-[1.25rem] text-nowrap">
                  Contact via Messenger:
                </p>
              </div>

              <Link href={Contacts.socialLinks.whatsapp}>
                <div className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A]  md:text-[1.25rem] items-center space-x-2.5">
                  <WhatsappCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
                  <p>WhatsApp</p>
                </div>
              </Link>
              <Link href={Contacts.socialLinks.telegram}>
                <div className="flex flex-row duration-150  font-medium fill-[#F0EDE8] hover:fill-[#FF3F1A] hover:text-[#FF3F1A] md:text-[1.25rem] items-center space-x-2.5">
                  <TelegramCircleIcon className="overflow-visible w-6.25 h-6.25 md:w-8.75 md:h-8.75 mr-2.5" />
                  <p>Telegram</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col px-8.75 md:px-[7.6cqw]">
            <div className="flex flex-row w-full @container pb-12.5">
              <div className="flex w-[42cqw] xs:w-1/2 ">
                <p className="text-[1.563rem] font-medium leading-[1.938rem] tracking-[0%] xs:text-[5.8cqw] xs:leading-[7cqw] md:text-[clamp(2.25rem,4.6cqw,3.375rem)] md:leading-[4.7cqw]">
                  Order <br /> a service
                </p>
              </div>

              <div className="flex flex-row w-[58cqw] xs:w-1/2 xs:max-w-[98cqw] ">
                <div className="w-full md:w-38cqw md:max-w-[28.313rem]">
                  <FooterForm />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full @container items-center pb-12.5">
              <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center space-x-5 @container pr-[6.3cqw] md:pr-0">
                <p className="text-[8.6cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,2.4cqw,1.25rem)] tracking-[-3%] mb-2.5 md:mb-0 whitespace-nowrap">
                  Discover our work on:
                </p>
                <div className="flex flex-row space-x-2.5 md:space-x-5">
                  <Link href={Contacts.socialLinks.instagram}>
                    <InstagramIcon className="w-6.25 md:w-8.75 md:h-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                  </Link>
                  <Link href={Contacts.socialLinks.behance}>
                    <BehanceIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                  </Link>
                  <Link href={Contacts.socialLinks.dribbble}>
                    <DribbleIcon className="w-6.25 md:w-8.75 md:h-8.75  fill-[#F0EDE8] hover:fill-[#FF3F1A] transition-colors duration-150 " />
                  </Link>
                </div>
              </div>
              <div className="flex flex-row w-[58cqw] xs:w-1/2 items-center pt-1">
                <div className="text-[#727272] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem]">
                  © Functional Design Studio. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          ref={glowEffect} 
          className="z-0 absolute left-1/2 top-[60%] w-[85.7%] h-[85.7cqw] border rounded-[50%] bg-[radial-gradient(circle_at_0%_100%,#FF3F1A_0%,#FF5921_100%)] [filter:blur(400px)]"
          style={{
            opacity: 0,
            transform: 'translate(-50%, 0) scale(0.8) translateY(100px)',
          }}
        ></div>
      </footer>
    </>
  );
}