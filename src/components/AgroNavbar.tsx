"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldCheck, Award, Headphones } from "lucide-react";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("./EnquiryModal"), { ssr: false });

interface NavbarProps {
  config?: {
    complianceTitle?: string;
    complianceItems?: Array<{ name: string; icon: string }>;
    supportTitle?: string;
    supportPhone?: string;
    navLinks?: Array<{ name: string; href: string }>;
    ctaText?: string;
  };
}

export default function AgroNavbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const finalNavLinks = config?.navLinks?.length
    ? config.navLinks
    : [
        { name: "Agro Home", href: "/agro" },
        { name: "About Us", href: "/agro/about-us" },
        { name: "Products", href: "/agro/products" },
        { name: "Certificates", href: "/agro/certificates" },
        { name: "Gallery", href: "/gallery" },
        { name: "Request Quote", href: "/agro/rfq" },
        { name: "Mag7 Group", href: "/" },
      ];

  const finalComplianceTitle = config?.complianceTitle || "Compliance & Quality:";
  
  const defaultComplianceItems = [
    { name: "FSSAI Standards", icon: "shield" },
    { name: "APEDA Exporter", icon: "award" },
    { name: "JNPT Logistics", icon: "shield" },
  ];
  const finalComplianceItems = config?.complianceItems?.length
    ? config.complianceItems
    : defaultComplianceItems;

  const finalSupportTitle = config?.supportTitle || "24/7 Desk:";
  const finalSupportPhone = config?.supportPhone || "+91 91117 77045";
  const finalCtaText = config?.ctaText || "Request Quote";

  const renderIcon = (iconName: string) => {
    if (iconName === "award") {
      return <Award className="w-3.5 h-3.5 text-[#06b6d4]" />;
    }
    return <ShieldCheck className="w-3.5 h-3.5 text-[#06b6d4]" />;
  };

  return (
    <>
      <header 
        className="w-full bg-white border-b border-slate-100 sticky top-0 z-40 transition-all duration-300"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      >
        
        {/* Sub-Header (Utility top row) */}
        <div className="hidden md:flex items-center justify-between px-6 py-2 bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-extrabold">{finalComplianceTitle}</span>
            <div className="flex items-center gap-3.5">
              {finalComplianceItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1 text-slate-600 bg-white border border-slate-100 px-2.5 py-0.5 rounded-full">
                  {renderIcon(item.icon)} {item.name}
                </span>
              ))}
            </div>
          </div>
          <div className="text-slate-400 font-extrabold">
            {finalSupportTitle} <span className="text-[#0d1f3c] font-black">{finalSupportPhone}</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            
            {/* Branding Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/agro" className="hover:opacity-95 transition-opacity flex items-center gap-2.5">
                <div className="relative w-11 h-11 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded-xl shadow-md flex items-center justify-center p-1 border-2 border-white overflow-hidden shrink-0">
                  <Image
                    src="/logo/image.png"
                    alt="Mag7 Global Logo"
                    width={32}
                    height={32}
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-black text-[#0d1f3c] text-sm tracking-tight">MAG7 AGRO</span>
                  <span className="text-[8px] text-[#06b6d4] font-extrabold uppercase tracking-[0.2em]">Agri Divisions</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-7">
              {finalNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] font-black uppercase tracking-wider transition-colors duration-300 relative py-1 ${
                      isActive 
                        ? "text-[#06b6d4] border-b-2 border-[#06b6d4]" 
                        : "text-[#0d1f3c] hover:text-[#06b6d4]"
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
                className="bg-[#06b6d4] hover:bg-[#0891b2] text-white font-extrabold px-5 py-2.5 text-[11px] uppercase tracking-wider rounded-full shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{finalCtaText}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#06b6d4] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm"
              >
                RFQ
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#0d1f3c] p-2 hover:bg-slate-55 rounded-full transition-all duration-300"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-200">
            <div className="px-5 py-4 space-y-3">
              {finalNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-black transition-colors ${
                      isActive ? "bg-[#06b6d4]/8 text-[#06b6d4]" : "text-slate-700 hover:bg-slate-55"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white py-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  <span>{finalCtaText}</span>
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
