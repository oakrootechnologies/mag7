"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Award, Compass } from "lucide-react";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("./EnquiryModal"), { ssr: false });

export default function HandicraftsNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Handicrafts Home", href: "/handicrafts" },
    { name: "Products", href: "/handicrafts/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Request Quote", href: "/handicrafts/rfq" },
    { name: "Mag7 Group", href: "/" }
  ];

  return (
    <>
      <header className="w-full bg-[#fdfbf7] shadow-sm border-b border-amber-100 sticky top-0 z-40 transition-all duration-300">
        
        {/* Sub-Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-2 bg-[#f9f5eb] border-b border-amber-100/60 text-xs text-amber-800">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 font-bold"><Compass className="w-3.5 h-3.5" /> Traditional Indian Handicrafts & Decor Sourcing</span>
          </div>
          <div>
            Support Desk: <span className="font-bold text-[#b45309]">+91 91117 77045</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/handicrafts" className="hover:opacity-90 transition-opacity flex items-center gap-2">
                <Image
                  src="/logo/image.png"
                  alt="Mag7 Global Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain h-14 w-auto py-1"
                />
                <div className="flex flex-col text-left">
                  <span className="font-black text-[#b45309] text-sm tracking-tight leading-none">MAG7 HANDICRAFTS</span>
                  <span className="text-[8px] text-amber-600 font-bold uppercase tracking-widest">Heritage Division</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-bold tracking-wider uppercase transition-all duration-300 relative py-1 ${
                      isActive 
                        ? "text-[#b45309] border-b-2 border-[#b45309]" 
                        : "text-slate-700 hover:text-[#b45309] hover:-translate-y-[1px]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#b45309] hover:bg-[#854d0e] text-white font-bold px-5 py-2.5 text-xs rounded-none shadow-sm shadow-amber-700/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                Inquire Crafts <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#b45309] hover:bg-[#854d0e] text-white px-3.5 py-2 rounded-none text-xs font-black shadow-sm"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-800 p-2 hover:bg-amber-50 rounded-none transition-all duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-amber-100 bg-[#fdfbf7]/95 backdrop-blur-md animate-slideIn">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-none text-sm font-black transition-colors ${
                      isActive ? "bg-amber-500/10 text-[#b45309]" : "text-slate-700 hover:bg-amber-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-amber-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#b45309] hover:bg-[#854d0e] text-white py-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  Inquire Crafts <ArrowUpRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Shared Inquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
