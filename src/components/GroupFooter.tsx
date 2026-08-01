"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin, Facebook, Instagram, MessageCircle, Mail, Phone, Globe2,
  Bookmark, ArrowUp, ShieldCheck, Award
} from "lucide-react";

export default function GroupFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative overflow-visible bg-transparent text-slate-300" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}>
      
      {/* ── WAVE TOP BOUNDARY WITH FLOATING GLOBE ── */}
      <div className="relative w-full h-20 overflow-visible bg-transparent">
        {/* Globe emerging directly behind the curve */}
        <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center overflow-visible z-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 opacity-60">
            <defs>
              <radialGradient id="globe-grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="60%" stop-color="#f1f5f9" />
                <stop offset="90%" stop-color="#cbd5e1" />
                <stop offset="100%" stop-color="#94a3b8" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#globe-grad)" opacity="0.85" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 2,50 L 98,50" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 50,2 L 50,98" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 15,25 Q 50,35 85,25" fill="none" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 15,75 Q 50,65 85,75" fill="none" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 25,15 Q 35,50 25,85" fill="none" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 75,15 Q 65,50 75,85" fill="none" stroke="#64748b" stroke-width="0.4" opacity="0.25" />
            <path d="M 28,30 Q 34,26 40,32 T 48,28 T 46,45 T 32,48 Z" fill="#64748b" opacity="0.25" />
            <path d="M 55,20 Q 65,22 75,30 T 70,55 T 60,65 T 52,40 Z" fill="#64748b" opacity="0.25" />
            <path d="M 35,58 Q 42,65 40,82 T 28,75 Z" fill="#64748b" opacity="0.25" />
            <path d="M 18,45 Q 22,48 24,54 T 16,56 Z" fill="#64748b" opacity="0.25" />
          </svg>
        </div>

        {/* Custom U-curve SVG Wave with exact gradient matching 2nd image */}
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footer-wave-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#132237" />
              <stop offset="35%" stop-color="#132237" />
              <stop offset="50%" stop-color="#1c435a" />
              <stop offset="65%" stop-color="#132237" />
              <stop offset="100%" stop-color="#132237" />
            </linearGradient>
          </defs>
          <path
            d="M0,12 L560,12 C625,12 645,72 720,72 C795,72 815,12 880,12 L1440,12 L1440,80 L0,80 Z"
            fill="url(#footer-wave-grad)"
          />
        </svg>
      </div>

      {/* ── MAIN FOOTER CONTAINER ── */}
      <div className="bg-[#132237] pb-8 -mt-px relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* 1. TOP ROW: Contact & Bookmark Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between py-5 border-b border-slate-700/30 text-xs font-bold text-slate-400 gap-4">
            {/* Bookmark link */}
            <button
              onClick={() => alert("Press Ctrl+D to bookmark this page")}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-[#06b6d4]" />
              <span>Add to Bookmarks</span>
            </button>

            {/* Contact details row */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#06b6d4]" />
                <span>+91 91117 77045</span>
              </div>
              <div className="hidden sm:block text-slate-600">|</div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#06b6d4]" />
                <span>info@mag7global.com</span>
              </div>
              <div className="hidden sm:block text-slate-600">|</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#06b6d4]" />
                <span>Treasure Fantasy, Indore, India</span>
              </div>
            </div>
          </div>

          {/* 2. MIDDLE ROW: Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-16 border-b border-slate-700/30 items-stretch">
            
            {/* Col 1 (Span 3): Brand Info */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <h4 className="font-black text-white text-base tracking-tight uppercase">MAG7 GLOBAL</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Mag7 Global is a diversified multi-industry holding company. We coordinate global trading operations in agricultural exports, hand-built crafts, and heavy industrial machinery.
                </p>
              </div>
              {/* Social icons */}
              <div className="flex gap-3 pt-2">
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
            </div>

            {/* Col 2 (Span 2): Certification Badges */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-4">
              {/* APEDA Badge */}
              <div className="bg-white text-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm flex items-center gap-2 max-w-[170px] select-none">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-black uppercase text-emerald-700">APEDA</div>
                  <div className="text-[8px] text-slate-500 font-bold">Certified Exporter</div>
                </div>
              </div>
              {/* ISO Badge */}
              <div className="bg-white text-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm flex items-center gap-2 max-w-[170px] select-none">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-black uppercase text-cyan-700">ISO 9001</div>
                  <div className="text-[8px] text-slate-500 font-bold">Quality Assured</div>
                </div>
              </div>
            </div>

            {/* Col 3 (Span 2): Customer Services Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#06b6d4]">Compliance &amp; QA</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li><Link href="/" className="hover:text-white transition-colors">Corporate Home</Link></li>
                <li><Link href="/about-us" className="hover:text-white transition-colors">About MAG7 Global</Link></li>
                <li><Link href="/gallery" className="hover:text-[#06b6d4] transition-colors font-bold">Media & Event Gallery ↗</Link></li>
                <li><Link href="/agro/certificates" className="hover:text-[#06b6d4] transition-colors font-bold">Licensing &amp; Certificates ↗</Link></li>
                <li><Link href="/rfq" className="hover:text-white transition-colors">Enquire / Contact Us</Link></li>
              </ul>
            </div>

            {/* Col 4 (Span 2): Business Divisions */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#06b6d4]">Business Divisions</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li><Link href="/agro" className="hover:text-white transition-colors">Agro Division</Link></li>
                <li><Link href="/handicrafts" className="hover:text-white transition-colors">Heritage Handicrafts</Link></li>
                <li><Link href="/industrial-equipments" className="hover:text-white transition-colors">Industrial Division</Link></li>
              </ul>
            </div>

            {/* Col 5 (Span 3): Vertical Brand text */}
            <div className="lg:col-span-3 flex items-center justify-end pr-4 select-none">
              <div className="flex items-center gap-3">
                {/* Large Vertical text */}
                <div
                  className="font-black text-slate-500/30 text-2xl tracking-widest uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  MAG7 GLOBAL
                </div>
              </div>
            </div>

          </div>

          {/* 3. BOTTOM ROW: Copyright & Back To Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-semibold">
            {/* Copyright block */}
            <div className="text-center sm:text-left text-slate-500 leading-relaxed">
              © {new Date().getFullYear()} Mag7 Global Group LLP. All rights reserved.
              <br className="hidden sm:block" />
              <span className="text-[10px] text-slate-600 font-medium">Design &amp; Development by Priyanshu Pethari.</span>
            </div>

            {/* Back to top circle button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
            >
              <span className="text-[10px] uppercase font-black tracking-wider">Back to Top</span>
              <div className="w-8 h-8 rounded-full border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
