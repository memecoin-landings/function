"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full  text-white pt-11">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">f{"{function}"}</h1>
          </div>
          <div className="flex w-full"></div>
          {/* Desktop Navigation */}
          <nav className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Services
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-200 px-3 py-2 text-sm font-medium text-nowrap"
              >
                Contact Us
              </a>
            </div>
          </nav>

          {/* Get Price Button */}
          <div className="hidden md:block">
            <button className="bg-white text-slate-900 hover:bg-gray-100 transition-colors duration-200 px-6 py-2 rounded-md text-sm font-medium text-nowrap ml-14">
              Get Price
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {/* {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )} */}
            </button>
          </div>
        </div>
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
  );
}
