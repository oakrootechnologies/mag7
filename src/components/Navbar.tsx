"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldCheck, Award } from "lucide-react";
import dynamic from "next/dynamic";
const EnquiryModal = dynamic(() => import("./EnquiryModal"), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/export-products" },
    { name: "Certificates", href: "/certificates" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        
        {/* Sub-Header (Certifications & CTA on desktop) */}
        <div className="hidden md:flex items-center justify-between px-6 py-2 bg-slate-50 border-b border-gray-100 text-xs">
          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-medium">Registrations & Compliance:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                <ShieldCheck className="w-3 h-3 text-brand-green" /> FSSAI
              </span>
              <span className="flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                <Award className="w-3 h-3 text-brand-blue" /> APEDA
              </span>
              <span className="flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                <ShieldCheck className="w-3 h-3 text-brand-green-light" /> CBD
              </span>
            </div>
          </div>
          <div className="text-gray-500">
            Support: <span className="font-semibold text-brand-blue-dark">+91 963 777 0010</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding Logo - Using Standard Hori Logo Image */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/logo/hori logo.png"
                  alt="Mag7 Global Logo"
                  width={150}
                  height={38}
                  priority
                  className="object-contain h-9 w-auto"
                />
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
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      isActive ? "text-brand-green" : "text-brand-blue-dark hover:text-brand-green"
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
                className="btn-primary flex items-center gap-1 px-5 py-2 text-sm rounded-xl"
              >
                Make An Enquiry <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-green text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-blue-dark p-2 hover:bg-slate-55 rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slideIn">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-bold ${
                      isActive ? "bg-brand-green/10 text-brand-green" : "text-brand-blue-dark hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-around text-xs text-gray-500 font-bold px-2">
                  <span className="border border-gray-200 px-1.5 py-0.5 rounded">FSSAI</span>
                  <span className="border border-gray-200 px-1.5 py-0.5 rounded">APEDA</span>
                  <span className="border border-gray-200 px-1.5 py-0.5 rounded">CBD</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full btn-primary py-2.5 text-center text-sm font-bold flex items-center justify-center gap-1"
                >
                  Make An Enquiry <ArrowUpRight className="w-4 h-4" />
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
