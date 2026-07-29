"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldCheck, Settings } from "lucide-react";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("./EnquiryModal"), { ssr: false });

export default function IndustrialNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Industrial Home", href: "/industrial-equipments" },
    { name: "Products", href: "/industrial-equipments/products" },
    { name: "Request Quote", href: "/industrial-equipments/rfq" },
    { name: "Mag7 Group", href: "/" }
  ];

  return (
    <>
      <header className="w-full bg-[#f8fafc] shadow-sm border-b border-slate-200 sticky top-0 z-40 transition-all duration-300">
        
        {/* Sub-Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-2 bg-slate-900 border-b border-slate-800 text-[10px] tracking-wider uppercase font-bold text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Settings className="w-3.5 h-3.5 text-[#ea580c]" /> High-Performance Industrial Machinery & Spares Sourcing</span>
          </div>
          <div>
            Support Desk: <span className="font-bold text-white">+91 79873 84443</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/industrial-equipments" className="hover:opacity-90 transition-opacity flex items-center gap-2">
                <Image
                  src="/logo/image.png"
                  alt="Mag7 Global Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain h-14 w-auto py-1"
                />
                <div className="flex flex-col text-left">
                  <span className="font-black text-[#ea580c] text-sm tracking-tight leading-none">MAG7 INDUSTRIAL</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Machinery Division</span>
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
                        ? "text-[#ea580c] border-b-2 border-[#ea580c]" 
                        : "text-slate-700 hover:text-[#ea580c] hover:-translate-y-[1px]"
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
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-5 py-2.5 text-xs rounded-none shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                Request Quote <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-3.5 py-2 rounded-none text-xs font-black shadow-sm"
              >
                Quote
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-800 p-2 hover:bg-slate-100 rounded-none transition-all duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md animate-slideIn">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-none text-sm font-black transition-colors ${
                      isActive ? "bg-orange-500/10 text-[#ea580c]" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  Request Quote <ArrowUpRight className="w-4.5 h-4.5" />
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
