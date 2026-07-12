"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldCheck, Award } from "lucide-react";
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

export default function Navbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const finalNavLinks = config?.navLinks?.length
    ? config.navLinks
    : [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Products", href: "/export-products" },
        { name: "Certificates", href: "/certificates" },
        { name: "Request Quote", href: "/rfq" },
      ];

  const finalComplianceTitle = config?.complianceTitle || "Registrations & Compliance:";
  
  const defaultComplianceItems = [
    { name: "FSSAI", icon: "shield" },
    { name: "APEDA", icon: "award" },
    { name: "CBD", icon: "shield" },
  ];
  const finalComplianceItems = config?.complianceItems?.length
    ? config.complianceItems
    : defaultComplianceItems;

  const finalSupportTitle = config?.supportTitle || "Support:";
  const finalSupportPhone = config?.supportPhone || "+91 79873 84443";
  const finalCtaText = config?.ctaText || "Make An Enquiry";

  const renderIcon = (iconName: string) => {
    if (iconName === "award") {
      return <Award className="w-3 h-3 text-brand-blue" />;
    }
    return <ShieldCheck className="w-3 h-3 text-brand-green" />;
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-40 transition-all duration-300">
        
        {/* Sub-Header (Certifications & CTA on desktop) */}
        <div className="hidden md:flex items-center justify-between px-6 py-2 bg-white border-b border-slate-100 text-xs">
          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-medium">{finalComplianceTitle}</span>
            <div className="flex items-center gap-3">
              {finalComplianceItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                  {renderIcon(item.icon)} {item.name}
                </span>
              ))}
            </div>
          </div>
          <div className="text-gray-500">
            {finalSupportTitle} <span className="font-semibold text-brand-blue-dark">{finalSupportPhone}</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="hover:opacity-90 transition-opacity">
                <Image
                  src="/logo/image.png"
                  alt="Mag7 Global Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain h-14 w-auto py-1"
                />
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8">
              {finalNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-bold tracking-wider uppercase transition-all duration-300 relative py-1 ${
                      isActive 
                        ? "text-brand-green border-b-2 border-brand-green" 
                        : "text-brand-blue-dark hover:text-brand-green hover:-translate-y-[1px]"
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
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-5 py-2.5 text-xs rounded-2xl shadow-md shadow-brand-blue/15 hover:shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                {finalCtaText} <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-sm"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-blue-dark p-2 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-slideIn">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {finalNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-black transition-colors ${
                      isActive ? "bg-brand-green/10 text-brand-green" : "text-brand-blue-dark hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-around text-[10px] text-gray-500 font-bold px-2">
                  {finalComplianceItems.map((item, idx) => (
                    <span key={idx} className="border border-slate-200 px-1.5 py-0.5 rounded-lg bg-slate-50">{item.name}</span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full btn-primary py-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {finalCtaText} <ArrowUpRight className="w-4 h-4" />
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
