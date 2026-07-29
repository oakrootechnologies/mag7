"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target, Eye, ShieldCheck, Award, Briefcase, Mail, CheckCircle2,
  Facebook, Instagram, MessageCircle, Globe2, Link2, ArrowRight
} from "lucide-react";

export default function GroupAboutUsPage() {
  const leaders = [
    {
      name: "Mr. Priyansh Vyas",
      role: "Founder & Managing Director",
      bio: "Priyansh is the visionary behind Mag7 Global Group. With over a decade of expertise in international commodity trade, trade compliance, and cross-border logistics, he directs corporate strategy, global partnerships, and oversees the holding company's diversified divisions. His dedication to transparency and quality auditing forms the bedrock of the group.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      email: "priyansh@mag7global.com"
    },
    {
      name: "Mr. Rajesh K. Sharma",
      role: "Co-Director & Head of Global Sourcing",
      bio: "Rajesh coordinates supply networks across all divisions. He spends extensive time on the ground building relations with farmer producer groups (FPCs) in Maharashtra for agro sourcing, artisanal cooperatives in Rajasthan for handicrafts, and leading heavy machinery manufacturers in Gujarat to inspect quality standards at origin.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      email: "rajesh.sharma@mag7global.com"
    },
    {
      name: "Ms. Sunita Patil",
      role: "Director of Quality Compliance & Logistics",
      bio: "Sunita manages international trade operations and compliance structures. She ensures all shipments adhere to rigorous phytosanitary matrices, API certifications, customs standards, and export-import regulations for the UAE, European Union, USA, and Australian ports.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      email: "compliance@mag7global.com"
    }
  ];

  return (
    <div className="space-y-24 pb-20 bg-white" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}>
      
      {/* ── HERO SECTION (MATCHES PHG STYLE) ── */}
      <section className="relative pt-16 lg:pt-24 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Text content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center justify-center bg-slate-50 border border-slate-200/80 rounded-full px-5 py-1.5 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase select-none">
              Trusted Partner
            </div>
            
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#0d1f3c] leading-[1.08] tracking-tight">
              At <span className="text-[#06b6d4]">MAG7</span> We Are <br />
              Committed <span className="inline-block text-[#06b6d4] translate-y-1">↩</span>
            </h1>

            <p className="text-slate-500 text-sm leading-relaxed font-semibold max-w-xl">
              to redefining the concepts of global trade, compliance, and custom clearances by leveraging our experienced team and esteemed partners.
            </p>

            {/* Link feature card */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-100/80 max-w-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
                <Link2 className="w-4 h-4" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed font-bold">
                We are dedicated to connecting the strongest companies, markets, solutions, and services worldwide to achieve greater success.
              </p>
            </div>

            <p className="text-xs text-slate-400 font-semibold italic">
              <span className="text-[#06b6d4] font-black not-italic">Imagine</span> the profound impact that this commitment can bring.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#leaders"
                className="inline-flex items-center gap-2 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg shadow-slate-200 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://wa.me/917987384443"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>+91 - 7987384443</span>
              </a>
            </div>
          </div>

          {/* Right Column (Handshake Image Container) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[3/4] z-10">
              <div className="relative w-full h-full rounded-[44px] overflow-hidden shadow-2xl border-4 border-slate-100/50">
                <Image
                  src="/images/business_partners_handshake.png"
                  alt="Mag7 Global Commitment"
                  fill
                  priority
                  className="object-cover object-center"
                />
                
                {/* Floating Social Icons Bar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/25 z-20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <Facebook className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Instagram className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <MessageCircle className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Mail className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Globe2 className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating Circular Trusted Partner Emblem */}
                <div className="absolute bottom-6 right-6 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 z-20 hover:scale-105 transition-transform duration-300">
                  <div className="text-center flex flex-col items-center justify-center leading-none">
                    <span className="text-[8px] font-black text-[#0d1f3c] tracking-widest uppercase">TRUSTED</span>
                    <span className="text-[9px] font-bold text-[#06b6d4] uppercase mt-0.5">PARTNER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section id="leaders" className="max-w-7xl mx-auto px-6 lg:px-10 py-8 border-t border-b border-slate-100 scroll-mt-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="inline-block bg-[#06b6d4]/5 text-[#06b6d4] font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full">Executive Board</h2>
          <h3 className="text-3xl md:text-4.5xl font-black text-[#0d1f3c] tracking-tight">Our <span className="text-[#06b6d4]">Leadership</span></h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Meet the Directors and Executives shaping the international trade footprint of the Mag7 Group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-slate-150 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Photo & Role */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#06b6d4] shrink-0 shadow-sm">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0d1f3c] text-base">{leader.name}</h3>
                    <p className="text-xs text-slate-400 font-bold tracking-wide">{leader.role}</p>
                  </div>
                </div>
                {/* Biography */}
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  {leader.bio}
                </p>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#06b6d4]" /> Executive Officer</span>
                <a href={`mailto:${leader.email}`} className="text-[#06b6d4] hover:text-[#0d1f3c] flex items-center gap-1 font-bold">
                  <Mail className="w-4 h-4" /> Contact
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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

    </div>
  );
}
