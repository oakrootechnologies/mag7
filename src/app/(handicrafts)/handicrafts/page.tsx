"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, ArrowUpRight, Award } from "lucide-react";
import { handicraftsProducts } from "@/data/handicrafts";

export default function HandicraftsHomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "wooden" | "brass" | "pottery" | "textiles" | "stone">("all");

  const filteredCrafts = handicraftsProducts
    .filter(p => activeTab === "all" || p.category === activeTab)
    .slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[600px] w-full overflow-hidden bg-[#18110b] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
          alt="Premium Hand-carved Brassware Sourcing"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[#18110b]/60" />
        
        <div className="absolute inset-0 flex items-end md:items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-0">
          <div className="max-w-3xl space-y-6 text-white text-left animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight text-amber-100">
              India's Rich Heritage Handicrafts Sourced Directly for Global Markets
            </h1>
            <p className="text-xs md:text-sm font-medium text-slate-350 max-w-2xl leading-relaxed">
              We connect global importers with verified Indian artisan clusters, supplying premium Sheesham wood carved items, hammered brassware, blue pottery, and natural textiles with professional export logistics.
            </p>
            <div className="flex gap-4">
              <Link href="/handicrafts/products" className="py-3 px-6 bg-[#b45309] hover:bg-[#854d0e] text-white font-extrabold text-xs tracking-wider uppercase rounded-none transition-all duration-300">
                Browse Collections
              </Link>
              <Link href="/handicrafts/rfq" className="border border-white/60 bg-white/10 hover:bg-white text-white hover:text-[#b45309] py-3 px-6 rounded-none transition-all duration-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-sm">
                Get Quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fdfbf7] border border-amber-100/50 shadow-sm p-8 md:p-12 rounded-2xl">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Compass className="w-16 h-16 text-[#b45309] bg-[#f9f5eb] p-3 rounded-2xl border border-amber-100" />
            <h2 className="text-xl font-extrabold text-brand-blue-dark leading-tight">Artisan Direct Sourcing</h2>
          </div>
          
          <div className="md:col-span-8 space-y-4 text-slate-600 text-sm leading-relaxed">
            <h3 className="text-2xl font-extrabold text-brand-blue-dark tracking-tight leading-snug">
              Bridging the gap between <span className="text-[#b45309] font-black">master artisans</span> and global retail networks.
            </h3>
            <p className="font-medium text-slate-500">
              Our Handicrafts Division operates sourcing pipelines in Saharanpur (seasoned Sheesham wood), Moradabad & Jaipur (embossed brass & blue pottery), and Bhadohi (hand-loom jute rugs). By bypassing intermediate brokers, we ensure <strong>fair payouts to rural craftsmen</strong> and <strong>highly competitive FOB/CIF rates</strong> for our wholesale buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing Pipelines Strengths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="text-center mb-16">
          <h2 className="inline-block bg-[#f9f5eb] text-[#b45309] font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-4">Core Competency</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-blue-dark tracking-tight mb-4">Why Source <span className="text-[#b45309]">With Us</span></h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Standardized trade audits applied to heritage art production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              icon: <HeartHandshake className="w-8 h-8 text-[#b45309]" />,
              title: "Ethical Procurement",
              desc: "Direct coordination with registered artisan cooperatives, safeguarding intellectual heritage and organic incomes."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
              title: "Quality Inspection",
              desc: "Checking moisture contents in seasoned wood (<12%), thickness dimensions in brass sheets, and paint alignment in glazes."
            },
            {
              icon: <Compass className="w-8 h-8 text-indigo-600" />,
              title: "Premium Logistics",
              desc: "Transit packing utilizing custom-molded styrofoam (EPS) boxes, tissue lining, and moisture silica gel packs."
            },
            {
              icon: <Award className="w-8 h-8 text-amber-500" />,
              title: "Export Auditing",
              desc: "Complete documentation, Certificate of Origin, fumigation reports for wood, and prompt customs clearing at Mundra & JNPT."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#fdfbf7] flex items-center justify-center mb-6 shadow-inner border border-amber-100/50">
                {item.icon}
              </div>
              <h4 className="font-extrabold text-brand-blue-dark text-base leading-tight mb-3">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Featured Craft Catalog</h2>
        <div className="section-subtitle text-[#b45309] font-black uppercase tracking-widest text-center text-xs mb-10">Hand-Picked Artisanal Sourcing</div>
        
        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-2 bg-[#f9f5eb] p-2 rounded-none text-xs font-bold text-amber-800 shadow-inner border border-amber-100/40">
            {([
              { id: "all", name: "ALL" },
              { id: "wooden", name: "WOODEN" },
              { id: "brass", name: "BRASS" },
              { id: "pottery", name: "POTTERY" },
              { id: "textiles", name: "TEXTILES" },
              { id: "stone", name: "STONE" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-none transition-all duration-300 uppercase tracking-wider font-extrabold cursor-pointer ${
                  activeTab === tab.id ? "bg-[#b45309] text-white shadow-md" : "text-amber-800 hover:bg-amber-100"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredCrafts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-tight truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-450 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                <Link
                  href={`/handicrafts/products/${product.slug}`}
                  className="text-[#b45309] font-extrabold hover:underline flex items-center gap-0.5"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/handicrafts/rfq"
                  className="text-emerald-600 hover:text-emerald-700 font-black tracking-wide uppercase hover:underline"
                >
                  Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/handicrafts/products" className="btn-outline inline-flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider border-amber-200 text-amber-900 hover:bg-amber-50">
            View Complete Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#18110b] text-[#fdfbf7] p-8 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-900/40 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full translate-x-12 -translate-y-12"></div>
          
          <div className="space-y-3 text-center md:text-left z-10">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-amber-100">
              Need custom artisanal designs or custom packaging parameters?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              We process custom laser engraving, size dimensions, and customized packaging boxes for large wholesale runs.
            </p>
          </div>
          <Link
            href="/handicrafts/rfq"
            className="bg-[#b45309] hover:bg-[#854d0e] text-white font-extrabold px-8 py-4 rounded-none shadow-md hover:-translate-y-0.5 transition-all duration-300 shrink-0 text-xs uppercase tracking-wider cursor-pointer z-10"
          >
            Submit Custom Inquiry
          </Link>
        </div>
      </section>

    </div>
  );
}
