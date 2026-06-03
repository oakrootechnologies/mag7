"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Presence */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/hori logo.png"
                alt="Mag7 Global Logo"
                width={150}
                height={38}
                className="object-contain bg-white p-2 rounded-xl shadow-sm"
              />
            </Link>
            <p className="text-xs text-slate-400">
              Reliable agricultural supply delivering fresh fruits, vegetables, grains, and spices from India to importers worldwide.
            </p>
            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-green-light">Our Office Presence</h5>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue-light shrink-0" /> Pune, Maharashtra
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue-light shrink-0" /> Vashi, Navi Mumbai
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue-light shrink-0" /> Al Aweer, Dubai, UAE
                </li>
              </ul>
            </div>
          </div>

          {/* Export Portfolio */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green-light mb-4">Export Portfolio</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {exportPortfolio.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Export Items */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green-light mb-4">Top Exports</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {exportProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Import Items */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green-light mb-4">Top Imports</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {importProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-blue-light transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-blue-light transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-blue-light transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-blue-light transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-blue-light transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} All rights reserved at Mag7 Global Import Export LLP & Mag7 LLC-FZ.
          </div>

          {/* Quick Legal */}
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-blue-light transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-blue-light transition-colors">Disclaimer</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
