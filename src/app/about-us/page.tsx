"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Phone, 
  ArrowUpRight 
} from "lucide-react";
import dynamic from "next/dynamic";

const ProductEnquiry = dynamic(() => import("@/components/ProductEnquiry"), {
  ssr: false,
});

export default function AboutUsPage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Page Title Header */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><a href="/" className="hover:text-brand-green">Home</a></li>
            <li className="text-slate-400">/</li>
            <li className="text-brand-blue-dark">About Us</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">About Us</h1>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue-dark tracking-tight">
              Bridging the Gap Between India's Farmers & Global Markets
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At <strong>Mag7 Global</strong>, we represent a dedicated team of supply chain experts, agriculturalists, and trade compliance officers. Established with the vision to deliver fresh, residue-free agricultural commodities internationally, we operate at the intersection of farmers and global logistics.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We source directly from individual farms, cooperative societies, and Farmer Producer Companies (FPCs) across core hubs like Nashik (onions, grapes), Pollachi (coconut), and Satara (ginger, yam). By establishing standard quality checks right at the farm gate, we ensure that only premium, export-grade items enter our packaging houses.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our packaging and sorting units operate under strict sanitary conditions complying with global food safety standards. With our presence in both India (Pune and Mumbai APMC) and Dubai (Al Aweer Fruit & Vegetable Market), we manage the entire export-import value chain seamlessly.
            </p>
          </div>
          
          <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
              alt="Indian agricultural fields and sourcing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12 md:py-20 my-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-brand-blue/5 to-slate-50/0 rounded-[3rem] -z-10"></div>
        <div className="text-center mb-16 space-y-4">
          <h2 className="inline-block bg-brand-green/10 text-brand-green font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full">Our Core Principles</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-blue-dark tracking-tight">Driven by <span className="text-brand-green">Excellence</span></h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Mission */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-brand-green/10 hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-green/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-green/20 to-brand-green/5 rounded-2xl flex items-center justify-center text-brand-green transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-inner border border-brand-green/10">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-blue-dark mb-3 group-hover:text-brand-green transition-colors">Our Mission</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  To supply standard quality agricultural produce to global markets with zero logistics delays, ensuring fair payouts to Indian farmers.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-2 hover:border-brand-blue/30 transition-all duration-500 overflow-hidden md:mt-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-blue/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue transform transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 shadow-inner border border-brand-blue/10">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-blue-dark mb-3 group-hover:text-brand-blue transition-colors">Our Vision</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  To become the most reliable and transparent global agriculture supply network linking Asian producers with worldwide wholesale networks.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 hover:border-amber-500/30 transition-all duration-500 overflow-hidden md:mt-24">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12"></div>
            
            <div className="relative space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-2xl flex items-center justify-center text-amber-500 transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-inner border border-amber-500/10">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-blue-dark mb-3 group-hover:text-amber-500 transition-colors">Our Values</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  Uncompromising quality control, customer-first service speed, trade transparency, and eco-friendly farming practices.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sourcing and Quality Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 py-20 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-green/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-blue/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-white/10 text-brand-green-light font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full backdrop-blur-md border border-white/5"
          >
            Our Quality Pipeline
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight"
          >
            How We Maintain <span className="text-brand-green-light">Premium Standards</span>
          </motion.h3>
        </div>

        <div className="relative max-w-6xl mx-auto z-10 px-0 md:px-8">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-12 right-12 h-1 bg-gradient-to-r from-brand-green/0 via-brand-green to-brand-blue/0 rounded-full opacity-30 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {[
              { step: "01", title: "Direct Farm Procurement", desc: "Sourcing directly from Nashik, Satara, and Pollachi farms under fair margin terms." },
              { step: "02", title: "Sorting & Grading", desc: "Sorting for shape, size, maturity index (e.g. 90% for mangoes), and structural defects." },
              { step: "03", title: "Sanitary Cleaning", desc: "Cleaned thoroughly (alum washing for bananas, drying for onions) to eliminate mold and rot." },
              { step: "04", title: "Cold Chain Transport", desc: "Shipped in refrigerated reefer containers or fast air cargo under exact temperature conditions." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", bounce: 0.3 }}
                className="group bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-brand-green/50 hover:bg-white/10 transition-all duration-500 relative flex flex-col items-center text-center overflow-hidden hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-green/20 transition-colors duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-brand-green text-white font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-green/30 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10 border border-white/20">
                  {item.step}
                </div>
                
                <h4 className="font-extrabold text-white text-lg leading-tight mb-4 relative z-10">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10 font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Offices Presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Office & Presence</h2>
        <div className="section-subtitle">Delivering global quality from the heart of India</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              office: "Mag7 Global (India HQ)",
              address: "Treasure Fantasy, Indore, Madhya Pradesh, India",
              contact: "+91 79873 84443",
              email: "info@mag7global.com",
              gstin: "23AABCM8734P1ZX (Applied)",
              iec: "0326094443 (Applied)"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0 flex items-center justify-center bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 150" className="w-full h-full object-cover">
                    <rect width="225" height="50" fill="#FF9933"/>
                    <rect y="50" width="225" height="50" fill="#ffffff"/>
                    <rect y="100" width="225" height="50" fill="#138808"/>
                    <circle cx="112.5" cy="75" r="15" fill="none" stroke="#000080" stroke-width="2"/>
                    <circle cx="112.5" cy="75" r="3" fill="#000080"/>
                    <line x1="112.5" y1="60" x2="112.5" y2="90" stroke="#000080" stroke-width="1"/>
                    <line x1="97.5" y1="75" x2="127.5" y2="75" stroke="#000080" stroke-width="1"/>
                    <line x1="101.9" y1="64.4" x2="123.1" y2="85.6" stroke="#000080" stroke-width="1"/>
                    <line x1="101.9" y1="85.6" x2="123.1" y2="64.4" stroke="#000080" stroke-width="1"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-blue-dark text-sm sm:text-base">{item.office}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Headquarters</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.address}</p>
              <div className="flex flex-col gap-1.5 pt-3 text-xs text-brand-blue-dark font-bold border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-green" /> {item.contact}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold text-xs">✉</span> {item.email}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 space-y-0.5 pt-1.5 border-t border-slate-50">
                  <div><span className="text-brand-blue font-bold">GSTIN:</span> {item.gstin}</div>
                  <div><span className="text-brand-blue font-bold">IEC:</span> {item.iec}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Require verified trade documentation or registration data?</h3>
            <p className="text-slate-400 text-sm">We provide APEDA certifications, FSSAI licenses, and test-reports upon trade inquiries.</p>
          </div>
          <ProductEnquiry 
            className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-8 py-3.5 rounded-none shadow-sm transition-all shrink-0 text-sm flex items-center gap-1.5"
            buttonText="Contact Sales Team"
          >
            Contact Sales Team <ArrowUpRight className="w-4 h-4" />
          </ProductEnquiry>
        </div>
      </section>

    </div>
  );
}
