"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  const exportPortfolio = [
    { name: "Fruits", href: "/export-products?cat=fruits" },
    { name: "Vegetables", href: "/export-products?cat=vegetables" },
    { name: "Commodities", href: "/export-products?cat=commodities" },
    { name: "Spices", href: "/export-products?cat=spices" },
    { name: "All Products", href: "/export-products" },
  ];

  const exportProducts = [
    { name: "Cavendish Banana", href: "/export-products/banana" },
    { name: "Semi-Husked Coconut", href: "/export-products/coconut" },
    { name: "Green Chilli", href: "/export-products/chilli" },
    { name: "Indian Onion", href: "/export-products/onion" },
    { name: "Sona Masuri Rice", href: "/export-products/rice-sona-masuri-non-basmati" },
    { name: "Alphonso Mango", href: "/export-products/alphonso-mango" },
    { name: "Pomegranate", href: "/export-products/pomegranate" },
  ];

  const importProducts = [
    { name: "Dragon Fruit", href: "/export-products?cat=imports" },
    { name: "Dates", href: "/export-products?cat=imports" },
    { name: "Apple", href: "/export-products?cat=imports" },
    { name: "Valencia Orange", href: "/export-products?cat=imports" },
    { name: "Cashew Nuts", href: "/export-products?cat=imports" },
  ];

  return (
    <footer className="bg-[#0b1224] text-white pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-slate-800/60">
          
          {/* Brand & Presence */}
          <div className="space-y-5">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <Image
                src="/logo/image.png"
                alt="Mag7 Global Logo"
                width={80}
                height={80}
                className="object-contain bg-white p-2 rounded-none shadow-md shadow-black/10 h-16 w-16"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Reliable agricultural supply delivering fresh fruits, vegetables, grains, and spices from India to importers worldwide.
            </p>
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-brand-green-light">Our Office</h5>
              <ul className="text-xs text-slate-350 space-y-2">
                <li className="flex items-start gap-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue-light shrink-0 mt-0.5" />
                  <span>Treasure Fantasy, Indore, Madhya Pradesh, India</span>
                </li>
              </ul>
              <div className="text-[10px] text-slate-400 space-y-0.5 pt-1 font-semibold tracking-wide">
                <div className="flex items-center gap-1"><span className="text-brand-green-light font-bold">GSTIN:</span> 23AABCM8734P1ZX (Applied)</div>
                <div className="flex items-center gap-1"><span className="text-brand-green-light font-bold">IEC:</span> 0326094443 (Applied)</div>
              </div>
            </div>
          </div>

          {/* Export Portfolio */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-green-light mb-6">Export Portfolio</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {exportPortfolio.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Export Items */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-green-light mb-6">Top Exports</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {exportProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Import Items */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-green-light mb-6">Top Imports</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {importProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light hover:translate-x-1 block transition-all duration-300 font-medium">
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
            <a href="https://wa.me/917987384443" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-green text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><MessageCircle className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/mag7.global/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-blue text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><Instagram className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/people/MAG-7-Global/61590522377321/#" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-blue text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="bg-slate-800 hover:bg-brand-blue text-slate-300 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><Youtube className="w-4 h-4" /></a>
          </div>

          {/* Copyright */}
          <div className="font-semibold text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} All rights reserved at Mag7 Global.
          </div>

          {/* Quick Legal */}
          <div className="flex gap-6 font-bold text-slate-400">
            <a href="#" className="hover:text-brand-blue-light transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-blue-light transition-colors">Disclaimer</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
