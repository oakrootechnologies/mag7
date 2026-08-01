"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target, Eye, ShieldCheck, Award, Briefcase, Mail, CheckCircle2,
  MessageCircle, ArrowRight
} from "lucide-react";

export default function GroupAboutUsPage() {
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const leaders = [
    {
      name: "Mrs. Amrita Kumari",
      role: "Director",
      bio: "Director on the Executive Board of MAG7 Global. Directs corporate governance, strategic board operations, and financial compliance oversight across MAG7 Global divisions.",
      image: "/images/founders/amrita.jpeg",
      isDirector: true
    },
    {
      name: "Mrs. Somvati Rajawat",
      role: "Director",
      bio: "Director on the Executive Board of MAG7 Global. Oversees strategic board initiatives, regulatory compliance frameworks, and community alignment for MAG7 Global.",
      image: "/images/founders/amrita.jpeg",
      isDirector: true
    },
    {
      name: "Mr. Kumar Gauraw",
      role: "International Trade Consultant (IIC)",
      bio: "Leads international trade consultancy and EXIM compliance strategies at MAG7 Global. With deep expertise in cross-border trade frameworks, customs tariffs, and global partner alignments, he directs our export-import operations across UAE, European, and Asian markets.",
      image: "/images/founders/gaurav.jpeg",
      phone: "+91 80024 16161",
      whatsapp: "https://wa.me/918002416161",
      email: "gaurav@mag7global.com",
      isDirector: false
    },
    {
      name: "Mr. Manoj Rajawat",
      role: "Market Research Manager",
      bio: "Manages global market intelligence, commodity demand forecasting, and buyer profiling. He tracks real-time international trade tickers, price trends, and buyer personas to ensure MAG7 Global delivers targeted, high-margin export-import solutions.",
      image: "/images/founders/Manoj.jpeg",
      phone: "+91 91117 77045",
      whatsapp: "https://wa.me/919111777045",
      email: "manoj@mag7global.com",
      isDirector: false
    }
  ];

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}>
      {/* ── ABOUT US HERO ── */}
      <section className="relative bg-gradient-to-br from-[#060e1e] to-[#0d1f3c] min-h-[52vh] flex items-end overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060e1e]/80" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 relative z-10 w-full space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full backdrop-blur-md">
            Corporate Profile & Executive Leadership
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl leading-[1.1]">
            Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-cyan-300">Global Trade Excellence</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
            Mag7 Global is a multi-sector conglomerate directing high-volume agricultural exports, artisanal handicrafts, and heavy industrial machinery across global trade corridors.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leaders" className="max-w-7xl mx-auto px-6 lg:px-10 py-8 border-t border-b border-slate-100 scroll-mt-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="inline-block bg-[#06b6d4]/5 text-[#06b6d4] font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full">Executive Board</h2>
          <h3 className="text-3xl md:text-4.5xl font-black text-[#0d1f3c] tracking-tight">Driven by <span className="text-[#06b6d4]">Visionary Leadership</span></h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Meet the Directors and Executives shaping the international trade footprint of the Mag7 Group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-slate-150 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-slate-200 transition-all duration-300"
            >
              <div>
                {/* Executive Headshot / Portrait Photo Header (4x+ size, torso & head focused) */}
                <div className="relative w-full h-80 sm:h-96 bg-slate-900 overflow-hidden group">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c] via-[#0d1f3c]/25 to-transparent flex items-end p-6 md:p-8">
                    <div className="space-y-1.5">
                      <span className="inline-block bg-[#06b6d4] text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                        {leader.role}
                      </span>
                      <h3 className="font-black text-white text-2xl tracking-tight drop-shadow-md">{leader.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Content Below Photo */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Biography */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {leader.bio}
                  </p>

                  {/* Direct Contact Details on Card (non-directors only) */}
                  {!leader.isDirector && leader.phone && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs font-semibold">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-400 font-bold">Connect Mobile:</span>
                        <a href={`tel:${leader.phone.replace(/\s+/g, '')}`} className="font-black text-[#0d1f3c] hover:text-[#06b6d4] transition-colors">
                          {leader.phone}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-400 font-bold">Email Direct:</span>
                        <a href={`mailto:${leader.email}`} className="font-black text-[#06b6d4] hover:underline">
                          {leader.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons (non-directors only) */}
              {!leader.isDirector && leader.phone && (
                <div className="p-6 md:p-8 pt-0 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedContact(leader)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white text-xs font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Details</span>
                  </button>

                  <a
                    href={leader.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT DETAILS MODAL POPUP ── */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-3xl p-8 space-y-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-[#06b6d4] shrink-0 shadow-md">
                <Image
                  src={selectedContact.image}
                  alt={selectedContact.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0d1f3c] text-base">{selectedContact.name}</h3>
                <p className="text-xs text-[#06b6d4] font-extrabold uppercase mt-0.5">{selectedContact.role}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-3 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Mobile Number</span>
                  <div className="text-slate-900 font-extrabold text-sm flex items-center justify-between">
                    <span>{selectedContact.phone}</span>
                    <a href={`tel:${selectedContact.phone.replace(/\s+/g, '')}`} className="text-[#06b6d4] hover:underline font-bold text-xs">
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Email Address</span>
                  <div className="text-[#06b6d4] font-extrabold text-xs">
                    <a href={`mailto:${selectedContact.email}`} className="hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={selectedContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({selectedContact.phone})</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Vision, Mission, and Values */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 relative py-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-[#06b6d4]/5 to-slate-50/0 rounded-[3rem] -z-10"></div>
        <div className="text-center mb-16 space-y-4">
          <h2 className="inline-block bg-[#06b6d4]/5 text-[#06b6d4] font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full">Core Principles</h2>
          <h3 className="text-3xl md:text-4.5xl font-black text-[#0d1f3c] tracking-tight">Our Conglomerate <span className="text-[#06b6d4]">Vision</span></h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Mission */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#06b6d4]/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-2xl flex items-center justify-center text-[#06b6d4] transform transition-all duration-500 shadow-inner border border-[#06b6d4]/10">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-[#0d1f3c] mb-3">Group Mission</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  To establish highly reliable, audited supply chains exporting premium Indian agricultural items, legacy handicrafts, and industrial machinery, assuring client delight.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden md:mt-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#06b6d4]/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-2xl flex items-center justify-center text-[#06b6d4] transform transition-all duration-500 shadow-inner border border-[#06b6d4]/10">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-[#0d1f3c] mb-3">Group Vision</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  To be recognized globally as the preferred trading house representing India's high-standard agricultural producers, skilled artisans, and manufacturers.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden md:mt-24">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#06b6d4]/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-2xl flex items-center justify-center text-[#06b6d4] transform transition-all duration-500 shadow-inner border border-[#06b6d4]/10">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-[#0d1f3c] mb-3">Group Values</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold font-sans">
                  Built on transparency, rigorous quality checks, fast response matrix, and continuous audit trails to secure reliable international commodities trade.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Compliance & Registration Credentials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#06b6d4]/20">
                Government Verified Status
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#0d1f3c]">Official Legal &amp; Licensing Credentials</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-xl">
                MAG7 GLOBAL PRIVATE LIMITED operates under full compliance with the Ministry of Commerce &amp; Industry, DGFT, and the Government of India.
              </p>
            </div>
            <Link
              href="/agro/certificates"
              className="inline-flex items-center gap-2 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white text-xs font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>View All Licensing Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IEC Credential */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#06b6d4] uppercase tracking-wider">DGFT EXPORTER CODE</span>
                  <h4 className="font-black text-[#0d1f3c] text-base">Importer-Exporter Code (IEC)</h4>
                </div>
                <span className="text-xs font-extrabold text-slate-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                  AAVCM0809P
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Issued by Directorate General of Foreign Trade (DGFT Indore), validating cross-border export-import authority for MAG7 GLOBAL PRIVATE LIMITED.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-slate-400 font-semibold">Date of Issue: <strong className="text-slate-700">14/07/2026</strong></span>
                <a
                  href="/certificates/certificateOfIEC.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#06b6d4] hover:text-[#0d1f3c] font-black underline flex items-center gap-1"
                >
                  View Official PDF ↗
                </a>
              </div>
            </div>

            {/* GST Credential */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">TAX REGISTRATION</span>
                  <h4 className="font-black text-[#0d1f3c] text-base">GST Registration (Form GST REG-06)</h4>
                </div>
                <span className="text-xs font-extrabold text-slate-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  23AAVCM0809P1ZX
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Issued by the Government of India and Madhya Pradesh State Tax Department for commercial taxation, inter-state sourcing, and invoicing.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-slate-400 font-semibold">Date of Issue: <strong className="text-slate-700">02/07/2026</strong></span>
                <a
                  href="/certificates/AA230626050525C_RC02072026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#06b6d4] hover:text-[#0d1f3c] font-black underline flex items-center gap-1"
                >
                  View Official PDF ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
