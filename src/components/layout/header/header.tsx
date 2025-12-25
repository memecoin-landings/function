"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import FunctionLogo from "@/components/icons/logo";
import BurgerIcon from "@/components/icons/burger";
import MobileMenu from "./mobile-menu";
import menuItems from "./menu-items";
import FormModal from "@/components/blocks/form/form-modal";
import { FormViewModel } from "@/domain/form-view-model";
import { usePathname } from "next/dist/client/components/navigation";

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formViewModel] = useState(() => new FormViewModel());

  // Scroll tracking states
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
    formRef.current?.focus();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  // Анимация появления при первой загрузке
  useEffect(() => {
    // Небольшая задержка для плавного появления
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show header when scrolling up, hide when scrolling down
          // Always show header at the very top
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else if (currentScrollY < lastScrollY - 10) {
            // Scrolling up (with 10px threshold for smoother detection)
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY + 10 && currentScrollY > 200) {
            // Scrolling down and past 200px (with 10px threshold for smoother behavior)
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Permanent gradient blur overlay - always visible at top */}
      <div 
        className="fixed top-0 left-0 w-full h-[300px] pointer-events-none z-90"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 10%, transparent 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 10%, transparent 70%, transparent 100%)',
          willChange: 'backdrop-filter',
          transform: 'translateZ(0)',
        }}
      />

      {/* Render header with scroll behavior */}
      <header
        className={cn(
          "w-full fixed top-0 left-0 right-0 z-100",
          "transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "will-change-transform [backface-visibility:hidden]",
          // Show/hide based on scroll and initial load
          (isVisible && !isInitialLoad) ? "translate-y-0" : "-translate-y-full",
          // Text colors based on pathname
          pathname == "/contacts" ? "text-[#FF3F1A] fill-[#F0EDE8]" : "text-[#F0EDE8]",
          className
        )}
      >
        <div className={cn(
          "mx-auto px-5 flex items-center xs:py-7 py-5"
        )}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <FunctionLogo className={`origin-left sm:scale-100 scale-119 ${pathname == "/contacts" ? "fill-[#FF3F1A]" : "fill-[#F0EDE8]"} group-hover:fill-[#FF3F1A] transition-colors ease-in-out duration-300`} />
          </Link>
          <div className="grow-1"></div>
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex shrink-0 items-baseline md:space-x-15 space-x-7.5 flex-nowrap">
            {menuItems.map((item) => (
              <HeaderItem
                className="shrink-0"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </HeaderItem>
            ))}
            {/* Get Price Button */}
            <button
              {...(pathname === "/contacts" ? { "custom-cursor": "black" } : {})}
              className={`hidden xs:block ${pathname == "/contacts" ? "bg-[#FF3F1A] text-[#F0EDE8] hover:bg-[#151516]" : "bg-[#F0EDE8] text-[#151516] hover:bg-[#FF3F1A] "}  transition-colors duration-200 py-0.5 rounded-full leading-8.5 px-5 text-sm font-medium text-nowrap`}
              onClick={openModal}
            >
              Get Price
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              isMenuOpen ? "rotate-90" : "",
              " transition-transform duration-300 sm:hidden inline-flex items-center justify-center p-2 group",
            )}
          >
            <BurgerIcon className={cn(
              pathname == "/contacts" ? "fill-[#FF3F1A] group-hover:fill-[#151516]" : "fill-[#F0EDE8] group-hover:fill-[#FF3F1A]",
              "transition-colors duration-300 ")} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu
          openModal={openModal}
          onClose={() => setIsMenuOpen(false)}
          className={cn(isMenuOpen ? "translate-x-0" : "translate-x-[200vw]")}
        />
      </header>

      {/* Render modal independently */}
      <FormModal
        ref={formRef}
        className={cn(
          "fixed inset-0 z-500 transition-all duration-600 max-h-screen",
          isModalOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClose={() => setIsModalOpen(false)}
        viewModel={formViewModel}
      />
    </>
  );
}

function HeaderItem({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        className,
        "hover:text-[#FF3F1A] font-cera transition-colors duration-200 my-2.5 text-sm font-medium text-nowrap relative",
        "after:[content:''] after:scale-x-0 after:w-full after:h-0.25 after:bg-[#FF3F1A] after:transition-transform after:duration-350 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out",
        "hover:after:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
}
