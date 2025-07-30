"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/../public/logo.svg";
import React, { useState } from "react";
import Link from "next/link";
import FunctionLogo from "@/components/icons/logo";
import BurgerIcon from "@/components/icons/burger";

const menuItems = [
  { href: "#", label: "Projects" },
  { href: "#", label: "Services" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact Us" },
];

export default function Header({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("w-full  text-white", className)} >
      <div className="mx-auto px-5 flex items-center">
        {/* Logo */}
        <Link href="/#home" className="flex-shrink-0 flex items-center group">
          <FunctionLogo className="sm:scale-100 scale-119 fill-white group-hover:fill-[#FF3F1A] transition-colors ease-in-out duration-300" />
        </Link>
        <div className="grow-1"></div>
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex shrink-0 items-baseline md:space-x-15 space-x-7.5 flex-nowrap">
          {menuItems.map((item) => (
            <HeaderItem className="shrink-0" key={item.href} href={item.href}>
              {item.label}
            </HeaderItem>
          ))}
          {/* Get Price Button */}
          <button className="hidden sm:block
          bg-[#F0EDE8] text-[#151516] hover:bg-[#FF3F1A] transition-colors duration-200 py-0.5 rounded-full leading-8.5 px-5 text-sm font-medium text-nowrap">
            Get Price
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md group focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        ><BurgerIcon className="fill-[#F0EDE8] transition-colors duration-300 group-hover:fill-[#FF3F1A]" />
        </button>

      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800">
            <a
              href="#"
              className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
            <button className="w-full text-left bg-white text-slate-900 hover:bg-gray-100 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium mt-2">
              Get Price
            </button>
          </div>
        </div>
      )}
    </header>
  )
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
      className={cn(className, "hover:text-[#FF3F1A] font-cera transition-colors duration-200 my-2.5  text-sm font-medium text-nowrap relative",
        "after:[content:''] after:scale-x-0 after:w-full after:h-0.25 after:bg-[#FF3F1A] after:transition-transform after:duration-350 after:origin-left after:absolute after:bottom-0 after:left-0 ease-in-out",
        "hover:after:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
}
