"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Facebook, Instagram, Youtube, MessageCircle, ArrowUp } from "lucide-react";

export default function AgroFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportPortfolio = [
    { name: "Fruits", href: "/agro/products?cat=fruits" },
    { name: "Vegetables", href: "/agro/products?cat=vegetables" },
    { name: "Commodities", href: "/agro/products?cat=commodities" },
    { name: "Spices", href: "/agro/products?cat=spices" },
    { name: "All Products", href: "/agro/products" },
  ];

  const exportProducts = [
    { name: "Cavendish Banana", href: "/agro/products/banana" },
    { name: "Semi-Husked Coconut", href: "/agro/products/coconut" },
    { name: "Green Chilli", href: "/agro/products/chilli" },
    { name: "Indian Onion", href: "/agro/products/onion" },
    { name: "Sona Masuri Rice", href: "/agro/products/rice-sona-masuri-non-basmati" },
    { name: "Alphonso Mango", href: "/agro/products/alphonso-mango" },
    { name: "Pomegranate", href: "/agro/products/pomegranate" },
  ];

  const importProducts = [
    { name: "Dragon Fruit", href: "/agro/products?cat=imports" },
    { name: "Dates", href: "/agro/products?cat=imports" },
    { name: "Apple", href: "/agro/products?cat=imports" },
    { name: "Valencia Orange", href: "/agro/products?cat=imports" },
    { name: "Cashew Nuts", href: "/agro/products?cat=imports" },
  ];

  return (
    <footer 
      className="bg-[#132237] text-slate-300 pt-20 pb-10 border-t border-slate-700/30"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-slate-700/30">
          
          {/* Brand & Presence */}
          <div className="space-y-6">
            <Link href="/agro" className="inline-block transition-transform hover:scale-[1.02]">
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded-2xl shadow-lg flex items-center justify-center p-1 border-2 border-white/85 overflow-hidden shrink-0">
                <Image
                  src="/logo/image.png"
                  alt="Mag7 Global Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Reliable agricultural supply delivering fresh fruits, vegetables, grains, and spices from India to importers worldwide.
            </p>
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-[#06b6d4]">Our Office</h5>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2 font-semibold leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#06b6d4] shrink-0 mt-0.5" />
                  <span>Treasure Fantasy, Indore, Madhya Pradesh, India</span>
                </li>
              </ul>
              <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-bold tracking-wide">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400">GSTIN:</span>
                  <a 
                    href="/certificates/AA230626050525C_RC02072026.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#06b6d4] hover:underline flex items-center gap-1 font-extrabold"
                  >
                    23AAVCM0809P1ZX
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-emerald-500/30">Verified</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400">IEC Code:</span>
                  <a 
                    href="/certificates/certificateOfIEC.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#06b6d4] hover:underline flex items-center gap-1 font-extrabold"
                  >
                    AAVCM0809P
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-emerald-500/30">Verified</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Export Portfolio */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#06b6d4] mb-6">Export Portfolio</h4>
            <ul className="space-y-3 text-xs text-slate-400 font-semibold">
              {exportPortfolio.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Export Items */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#06b6d4] mb-6">Top Exports</h4>
            <ul className="space-y-3 text-xs text-slate-400 font-semibold">
              {exportProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Import Items */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#06b6d4] mb-6">Top Imports</h4>
            <ul className="space-y-3 text-xs text-slate-400 font-semibold">
              {importProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-semibold">
          
          {/* Socials */}
          <div className="flex gap-3">
            {[
              { icon: <MessageCircle className="w-4 h-4" />, href: "https://wa.me/919111777045" },
              { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/mag7.global/" },
              { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/people/MAG-7-Global/61590522377321/#" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/40 hover:bg-[#06b6d4] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-700/30"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left text-slate-500 font-medium">
            © {new Date().getFullYear()} Mag7 Global Group LLP. All rights reserved.
            <br />
            <span className="text-[10px] text-slate-600">Mag7 Agro Sourcing Division</span>
          </div>

          {/* Quick Legal */}
          <div className="flex items-center gap-6 font-bold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Mag7 Group Home</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
