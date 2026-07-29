"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Settings, ShieldCheck, Factory, ArrowUpRight, Award } from "lucide-react";
import { industrialProducts } from "@/data/industrial";

export default function IndustrialHomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "pumps" | "valves" | "motors" | "generators" | "compressors">("all");

  const filteredProducts = industrialProducts
    .filter(p => activeTab === "all" || p.category === activeTab)
    .slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[600px] w-full overflow-hidden bg-slate-950 flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
          alt="Heavy Industrial Machinery Sourcing"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        
        <div className="absolute inset-0 flex items-end md:items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-0">
          <div className="max-w-3xl space-y-6 text-white text-left animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-100">
              High-Performance Industrial Machinery & Valve Sourcing
            </h1>
            <p className="text-xs md:text-sm font-medium text-slate-350 max-w-2xl leading-relaxed">
              We connect global industries with verified, ISO-certified OEM manufacturers in India. Supplying heavy-duty centrifugal pumps, flanged API gate valves, IE3 induction motors, diesel generator sets, and air compressors.
            </p>
            <div className="flex gap-4">
              <Link href="/industrial-equipments/products" className="py-3 px-6 bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs tracking-wider uppercase rounded-none transition-all duration-300">
                View Equipment
              </Link>
              <Link href="/industrial-equipments/rfq" className="border border-white/60 bg-white/10 hover:bg-white text-white hover:text-[#ea580c] py-3 px-6 rounded-none transition-all duration-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-sm">
                Get RFQ Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-slate-200 shadow-sm p-8 md:p-12 rounded-2xl">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Settings className="w-16 h-16 text-[#ea580c] bg-slate-100 p-3 rounded-2xl border border-slate-200 animate-spin-slow" />
            <h2 className="text-xl font-extrabold text-brand-blue-dark leading-none">Engineering OEM Sourcing</h2>
          </div>
          
          <div className="md:col-span-8 space-y-4 text-slate-650 text-sm leading-relaxed">
            <h3 className="text-2xl font-extrabold text-brand-blue-dark tracking-tight leading-snug">
              Standardized procurement from <span className="text-[#ea580c] font-black">ISO-certified manufacturers</span>.
            </h3>
            <p className="font-medium text-slate-500">
              Our Industrial Division works directly with heavy engineering foundries and assemblies in Gujarat and Maharashtra. By conducting strict pre-shipment inspections (checking casting tolerances, hydro-testing valves, and motor winding resistance), we guarantee that all machinery meets international standards like <strong>API, ASME, CE, and ISO</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-slate-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="text-center mb-16">
          <h2 className="inline-block bg-slate-100 text-[#ea580c] font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-4">Quality Matrix</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-blue-dark tracking-tight mb-4">Heavy Equipment <span className="text-[#ea580c]">Compliance</span></h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Rigorous engineering standards applied from foundry to shipping docks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              icon: <Factory className="w-8 h-8 text-[#ea580c]" />,
              title: "OEM Sourcing",
              desc: "Direct procurement from casting foundries and assembly lines, ensuring complete traceability and genuine spares supply."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
              title: "Hydro & Load Testing",
              desc: "Valves undergo shell and seat hydrostatic pressure checks (API 598). Motors are load-tested for thermal rise indices."
            },
            {
              icon: <Settings className="w-8 h-8 text-indigo-600" />,
              title: "Design Conformity",
              desc: "Products conforming to global codes including ASME B16.34, API 600, IEC electrical frames, and CE marking."
            },
            {
              icon: <Award className="w-8 h-8 text-amber-500" />,
              title: "Fitted Rigging Packages",
              desc: "Heavy-duty timber crate packing, moisture barrier vacuum sealing, and container lashing certification before export."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-150 p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-inner border border-slate-200">
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

      {/* Featured Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Equipment Portfolio</h2>
        <div className="section-subtitle text-[#ea580c] font-black uppercase tracking-widest text-center text-xs mb-10">High-Performance Mechanical Sourcing</div>
        
        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-none text-xs font-bold text-slate-600 shadow-inner border border-slate-200">
            {([
              { id: "all", name: "ALL" },
              { id: "pumps", name: "PUMPS" },
              { id: "valves", name: "VALVES" },
              { id: "motors", name: "MOTORS" },
              { id: "generators", name: "GENERATORS" },
              { id: "compressors", name: "COMPRESSORS" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-none transition-all duration-300 uppercase tracking-wider font-extrabold cursor-pointer ${
                  activeTab === tab.id ? "bg-[#ea580c] text-white shadow-md" : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
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
                  href={`/industrial-equipments/products/${product.slug}`}
                  className="text-[#ea580c] font-extrabold hover:underline flex items-center gap-0.5"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/industrial-equipments/rfq"
                  className="text-emerald-600 hover:text-emerald-700 font-black tracking-wide uppercase hover:underline"
                >
                  Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/industrial-equipments/products" className="btn-outline inline-flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider border-slate-300 text-slate-700 hover:bg-slate-50">
            View Complete Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea580c]/10 rounded-full translate-x-12 -translate-y-12"></div>
          
          <div className="space-y-3 text-center md:text-left z-10">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-100">
              Need custom casting dimensions or customized motor windings?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              We process custom fabrication drawing requests, voltage adaptation options, and third-party inspection reviews (SGS, TUV).
            </p>
          </div>
          <Link
            href="/industrial-equipments/rfq"
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold px-8 py-4 rounded-none shadow-md hover:-translate-y-0.5 transition-all duration-300 shrink-0 text-xs uppercase tracking-wider cursor-pointer z-10"
          >
            Request Custom Quotation
          </Link>
        </div>
      </section>

    </div>
  );
}
