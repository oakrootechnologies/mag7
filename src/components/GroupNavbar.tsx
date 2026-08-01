"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ArrowUpRight, ChevronDown, Search, LayoutGrid, Shield, Award, Headphones
} from "lucide-react";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("./EnquiryModal"), { ssr: false });

const divisions = [
  { name: "Agro Division", href: "/agro" },
  { name: "Handicrafts Division", href: "/handicrafts" },
  { name: "Industrial Division", href: "/industrial-equipments" },
];

export default function GroupNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 bg-white font-sans ${
          scrolled ? "shadow-md border-b border-slate-100" : "border-b border-slate-100"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
          
          {/* Left Side: Mag7 Brand Logo (No blue ring, increased size to 40px) */}
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo/image.png"
                  alt="Mag7 Global Logo"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-[#0d1f3c] text-sm tracking-tight">MAG7 GLOBAL</span>
                <span className="text-[8px] text-[#06b6d4] font-extrabold uppercase tracking-[0.18em]">CONNECT | GROW | SUCCEED</span>
              </div>
            </Link>
          </div>

          {/* Right Side: Main Links */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-[11px] font-bold">
              <Link href="/" className="text-slate-600 hover:text-[#06b6d4] transition-colors">
                Home
              </Link>
              
              {/* Divisions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDivisionsOpen(true)}
                onMouseLeave={() => setDivisionsOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-600 hover:text-[#06b6d4] transition-colors cursor-pointer text-[11px] font-bold uppercase">
                  <span>Divisions</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${divisionsOpen ? "rotate-180" : ""}`} />
                </button>
                {divisionsOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-slate-100 py-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {divisions.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:text-[#06b6d4] hover:bg-slate-50 transition-colors"
                      >
                        <ChevronDown className="w-3 h-3 rotate-[-90deg] text-[#06b6d4]" />
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Compliance */}
              <Link href="/about-us" className="text-slate-600 hover:text-[#06b6d4] transition-colors">
                Compliance
              </Link>

              {/* Certifications */}
              <Link href="/agro/certificates" className="text-slate-600 hover:text-[#06b6d4] transition-colors">
                Certifications
              </Link>

              {/* Gallery */}
              <Link href="/gallery" className="text-slate-600 hover:text-[#06b6d4] transition-colors">
                Gallery
              </Link>

              <Link href="/about-us" className="text-slate-600 hover:text-[#06b6d4] transition-colors">
                About Us
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-slate-600 hover:text-[#06b6d4] transition-colors font-bold cursor-pointer text-[11px]"
              >
                Contact Us
              </button>
            </nav>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 transition-colors ml-auto"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* ── MOBILE MENU DRAWER ── */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white shadow-inner animate-in slide-in-from-top duration-200">
            <div className="px-5 py-4 space-y-4">
              {/* Primary Links */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 pb-1">Divisions</div>
                {divisions.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-700 hover:text-[#06b6d4] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4 text-cyan-500" />
                    <span>{d.name}</span>
                  </Link>
                ))}
              </div>

              <div className="h-px bg-slate-100" />

              {/* Utility Links */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold px-3">
                <Link href="/" onClick={() => setIsOpen(false)} className="py-2 text-slate-600 hover:text-[#06b6d4]">Home</Link>
                <Link href="/about-us" onClick={() => setIsOpen(false)} className="py-2 text-slate-600 hover:text-[#06b6d4]">Compliance</Link>
                <Link href="/agro/certificates" onClick={() => setIsOpen(false)} className="py-2 text-slate-600 hover:text-[#06b6d4]">Certifications</Link>
                <Link href="/about-us" onClick={() => setIsOpen(false)} className="py-2 text-slate-600 hover:text-[#06b6d4]">About Us</Link>
                <button
                  onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                  className="py-2 text-slate-600 hover:text-[#06b6d4] text-left font-bold"
                >
                  Contact Us
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                  className="w-full bg-[#06b6d4] text-white py-3 font-black text-sm rounded-full flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <span>Submit Request</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
