"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export default function HandicraftsFooter() {
  const craftCategories = [
    { name: "Wooden Handicrafts", href: "/handicrafts/products?cat=wooden" },
    { name: "Brass & Metal Ware", href: "/handicrafts/products?cat=brass" },
    { name: "Jaipur Blue Pottery", href: "/handicrafts/products?cat=pottery" },
    { name: "Handwoven Textiles", href: "/handicrafts/products?cat=textiles" },
    { name: "Inlaid Stone Craft", href: "/handicrafts/products?cat=stone" },
  ];

  const topCrafts = [
    { name: "Sheesham Jewelry Box", href: "/handicrafts/products/sheesham-wood-carved-box" },
    { name: "Embossed Brass Planter", href: "/handicrafts/products/antique-brass-planter" },
    { name: "Jaipur Blue Pottery Vase", href: "/handicrafts/products/blue-pottery-ceramic-vase" },
    { name: "Natural Handwoven Rug", href: "/handicrafts/products/jute-handwoven-rug" },
    { name: "White Marble Inlay Coasters", href: "/handicrafts/products/marble-inlay-coasters" }
  ];

  return (
    <footer className="bg-[#18110b] text-[#f7f2eb] pt-20 pb-10 border-t border-[#3a2212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-amber-900/20">
          
          {/* Brand & Presence */}
          <div className="space-y-5">
            <Link href="/handicrafts" className="inline-block transition-transform hover:scale-[1.02]">
              <Image
                src="/logo/image.png"
                alt="Mag7 Global Logo"
                width={80}
                height={80}
                className="object-contain bg-white p-2 rounded-none shadow-md shadow-black/10 h-16 w-16"
              />
            </Link>
            <p className="text-xs text-amber-200/60 leading-relaxed font-medium">
              Mag7 Handicrafts supplies hand-carved wood products, metalware, pottery, and organic home accents crafted by master Indian artisans directly to global distributors.
            </p>
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-amber-500">Sourcing Hub</h5>
              <ul className="text-xs space-y-2 text-amber-100/60">
                <li className="flex items-start gap-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Rajasthan, Saharanpur & Bhadohi Artisan Sourcing Gates, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-6">Craft Categories</h4>
            <ul className="space-y-3 text-xs text-amber-100/60">
              {craftCategories.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-amber-400 hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Craft Items */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-6">Featured Crafts</h4>
            <ul className="space-y-3 text-xs text-amber-100/60">
              {topCrafts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-amber-400 hover:translate-x-1 block transition-all duration-300 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-amber-200/60">
          
          {/* Socials */}
          <div className="flex gap-5">
            <a href="https://wa.me/917987384443" target="_blank" rel="noopener noreferrer" className="bg-amber-900/35 hover:bg-brand-green text-amber-100 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><MessageCircle className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/mag7.global/" target="_blank" rel="noopener noreferrer" className="bg-amber-900/35 hover:bg-brand-blue text-amber-100 hover:text-white p-2 rounded-none transition-all duration-300 shadow-sm"><Instagram className="w-4 h-4" /></a>
          </div>

          {/* Copyright */}
          <div className="font-semibold text-amber-200/40 text-center md:text-left">
            © {new Date().getFullYear()} All rights reserved at Mag7 Global Handicrafts.
          </div>

          {/* Quick Legal */}
          <div className="flex gap-6 font-bold text-amber-200/50">
            <Link href="/" className="hover:text-amber-400 transition-colors">Mag7 Group Home</Link>
            <Link href="/about-us" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
            <Link href="/about-us" className="hover:text-amber-400 transition-colors">Disclaimer</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
