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

  return (
    <>
      {/* Render header only if modal is not open */}
      <header
        className={cn(`w-full ${pathname == "/contacts" ? "text-[#FF3F1A] fill-[#F0EDE8]" : "text-[#F0EDE8]"}  sm:relative fixed z-100`, className)}
      >
        <div className={cn("mx-auto px-5 flex items-center")}>
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
              " transition-transform duration-300 sm:hidden inline-flex items-center justify-center p-2 rounded-md group focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F0EDE8]",
            )}
          >
            <BurgerIcon className="fill-[#F0EDE8] transition-colors duration-300 group-hover:fill-[#FF3F1A]" />
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
