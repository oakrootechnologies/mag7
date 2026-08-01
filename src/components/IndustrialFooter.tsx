"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export default function IndustrialFooter() {
  const categories = [
    { name: "Centrifugal Pumps", href: "/industrial-equipments/products?cat=pumps" },
    { name: "Industrial Valves", href: "/industrial-equipments/products?cat=valves" },
    { name: "Electric Motors", href: "/industrial-equipments/products?cat=motors" },
    { name: "Silent Generators", href: "/industrial-equipments/products?cat=generators" },
    { name: "Air Compressors", href: "/industrial-equipments/products?cat=compressors" },
  ];

  const featured = [
    { name: "Heavy Duty Centrifugal Pump", href: "/industrial-equipments/products/centrifugal-water-pump" },
    { name: "Flanged Gate Valve", href: "/industrial-equipments/products/cast-steel-gate-valve" },
    { name: "3-Phase Induction Motor", href: "/industrial-equipments/products/three-phase-electric-motor" },
    { name: "Silent Diesel Generator Set", href: "/industrial-equipments/products/silent-diesel-generator" },
    { name: "Rotary Screw Air Compressor", href: "/industrial-equipments/products/rotary-screw-air-compressor" }
  ];

  return (
    <footer className="bg-[#0f172a] text-slate-100 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-slate-800">
          
          {/* Brand & Presence */}
          <div className="space-y-5">
            <Link href="/industrial-equipments" className="inline-block transition-transform hover:scale-[1.02]">
              <Image
                src="/logo/image.png"
                alt="Mag7 Global Logo"
                width={80}
                height={80}
                className="object-contain bg-white p-2 rounded-none shadow-md shadow-black/10 h-16 w-16"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Mag7 Industrial supplies premium centrifugal pumps, API gate valves, IE3 electric induction motors, diesel generators, and plant compressors to infrastructure projects and distributors worldwide.
            </p>
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-[#ea580c]">Sourcing Network</h5>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                  <span>ISO-Certified Manufacturer OEM hubs, Gujarat & Maharashtra, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#ea580c] mb-6">Machinery Categories</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-200 hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Products */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#ea580c] mb-6">Featured Machinery</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {featured.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-200 hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          {/* Socials */}
          <div className="flex gap-5">
            <a href="https://wa.me/919111777045" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-green text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><MessageCircle className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/mag7.global/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-blue text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><Instagram className="w-4 h-4" /></a>
          </div>

          {/* Copyright */}
          <div className="font-semibold text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} All rights reserved at Mag7 Global Industrial.
          </div>

          {/* Quick Legal */}
          <div className="flex gap-6 font-bold text-slate-400">
            <Link href="/" className="hover:text-slate-200 transition-colors">Mag7 Group Home</Link>
            <Link href="/about-us" className="hover:text-slate-200 transition-colors">Terms & Conditions</Link>
            <Link href="/about-us" className="hover:text-slate-200 transition-colors">Disclaimer</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
