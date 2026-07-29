"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Users,
  Compass,
  ArrowUpRight,
  Star,
  Sparkles
} from "lucide-react";
import { products } from "@/data/products";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), { ssr: false });

const heroSlides = [
  {
    image: "/images/hero/banana.png",
    text: "Leading Exporters of High Quality Cavendish Banana",
    product: "banana"
  },
  {
    image: "/images/hero/onion.png",
    text: "Leading Exporters of High Quality Indian Onion",
    product: "onion"
  },
  {
    image: "/images/hero/chilli.png",
    text: "Leading Exporters of High Quality Green Chilli",
    product: "chilli"
  },
  {
    image: "/images/hero/coconut.png",
    text: "Leading Exporters of High Quality Semi-Husked Coconut",
    product: "coconut"
  },
  {
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Nashik Grapes",
    product: "grapes"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12 } }),
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "fruits" | "vegetables" | "commodities" | "spices">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredExports = products
    .filter(p => p.category !== "imports")
    .filter(p => activeTab === "all" || p.category === activeTab)
    .slice(0, 8);

  const importProducts = products.filter(p => p.category === "imports").slice(0, 6);

  const openEnquiry = (productName: string = "") => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  return (
    <div 
      className="space-y-24 pb-20 bg-slate-50/30"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      
      {/* ── 1. HERO SLIDER SECTION ── */}
      <section className="relative h-[82vh] min-h-[500px] w-full overflow-hidden bg-slate-950">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.text}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center scale-105 transition-transform duration-[6000ms]"
              style={{ transform: idx === currentSlide ? "scale(1)" : "scale(1.05)" }}
            />
            {/* Overlay gradients for high-end cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/85 via-[#0d1f3c]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e] via-transparent to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex items-center px-6 lg:px-10 max-w-7xl mx-auto">
              <div className="max-w-3xl space-y-6 text-white text-left">
                
                {/* Accent Tag */}
                <div className="inline-flex items-center gap-2 bg-[#06b6d4]/20 border border-[#06b6d4]/50 text-[#a5f3fc] text-[10px] font-black uppercase tracking-[0.22em] px-4 py-2 rounded-full backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
                  Premium Indian Agricultural Export
                </div>

                <h1 className="text-[clamp(1.8rem,5vw,3.6rem)] font-black tracking-tight leading-[1.1] drop-shadow-md max-w-2xl">
                  {slide.text}
                </h1>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => openEnquiry(slide.text)} 
                    className="inline-flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link 
                    href={`/agro/products/${slide.product}`} 
                    className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#0d1f3c] py-3.5 px-7 rounded-full transition-all duration-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-md cursor-pointer hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-8 left-6 lg:left-10 flex gap-2.5 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "bg-[#06b6d4] w-7" : "bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── 2. LOGO INTRO DETAIL STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-slate-100 shadow-xl shadow-slate-200/60 p-8 lg:p-12 rounded-[28px]">
          {/* Logo container */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8 shrink-0">
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded-2xl shadow-lg flex items-center justify-center p-1 border-2 border-slate-50 overflow-hidden">
              <Image
                src="/logo/image.png"
                alt="Mag7 Global Logo"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="mt-3">
              <div className="font-black text-[#0d1f3c] text-sm tracking-tight">MAG7 AGRO</div>
              <div className="text-[8px] text-[#06b6d4] font-extrabold uppercase tracking-widest mt-0.5">Sourcing Excellence</div>
            </div>
          </div>
          
          {/* Intro Description */}
          <div className="lg:col-span-9 space-y-5 text-slate-600 text-sm leading-relaxed lg:pl-4 flex flex-col justify-center">
            <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
              Mag7 Global —{" "}
              <span className="text-[#06b6d4]">“Reliable Agri Supply for Exporters and Importers Worldwide”</span>
            </h2>
            <p className="font-semibold text-slate-500 leading-relaxed text-sm">
              At <strong className="text-[#0d1f3c]">Mag7 Global LLP</strong>, we are one of <strong className="text-[#0d1f3c]">India’s most reliable suppliers of agricultural products</strong>, delivering fruits, vegetables, spices, grains, frozen and processed foods to markets worldwide. With a strong farmer network, modern grading and packaging, and efficient logistics, we ensure quality and timely delivery every time.
            </p>
            <p className="font-semibold text-slate-500 leading-relaxed text-sm">
              Trusted across the <strong className="text-[#0d1f3c]">UAE, Gulf, Europe, UK, USA, Canada, and Australia</strong>, we are the preferred partner for Indian exporters and global importers seeking authentic, top-quality agricultural products.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. WE ARE EXPERTS OF SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 relative overflow-hidden">
        
        {/* Title */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/25 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            Our Core Strengths
          </div>
          <h3 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-[#0d1f3c] tracking-tight">
            Our <span className="text-[#06b6d4]">Expertise</span>
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-semibold">
            Leveraging standardized pipelines to ensure agricultural produce reaches foreign markets in peak quality.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              icon: <Users className="w-6 h-6 text-[#06b6d4]" />,
              title: "Sourcing",
              desc: "Direct procurement from farmers and FPCs across Maharashtra, Gujarat, and South India, eliminating middlemen."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#06b6d4]" />,
              title: "Packaging",
              desc: "Hygieny sorting, sizing, and packaging in export-grade corrugated boxes or mesh bags tailored to product transit times."
            },
            {
              icon: <Compass className="w-6 h-6 text-[#06b6d4]" />,
              title: "Logistics",
              desc: "Complete cold chain control with reefer container shipments (13C for bananas, 1C for apples) ensuring pristine delivery."
            },
            {
              icon: <Globe2 className="w-6 h-6 text-[#06b6d4]" />,
              title: "Export Compliance",
              desc: "End-to-end documentation, custom clearance at JNPT Port, and compliance with APEDA, FSSAI, and importing customs."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white border border-slate-100/80 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/8 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-[#0d1f3c]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. OUR PORTFOLIO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/25 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            Divisions Catalog
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-[#0d1f3c] tracking-tight">Our Portfolio</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Fruits",
              img: "/images/products/alphonso-mango.png",
              link: "/agro/products?cat=fruits"
            },
            {
              title: "Vegetables",
              img: "/images/products/onion.png",
              link: "/agro/products?cat=vegetables"
            },
            {
              title: "Commodities & Grains",
              img: "/images/products/sona-masuri-rice.png",
              link: "/agro/products?cat=commodities"
            },
            {
              title: "Spices",
              img: "/images/products/red-chilli.png",
              link: "/agro/products?cat=spices"
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative h-56 overflow-hidden rounded-2xl shadow-md flex items-end p-4 cursor-pointer border border-slate-100"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0d1f3c]/40 group-hover:bg-[#0d1f3c]/50 transition-colors duration-300" />
              <div className="relative z-10 flex items-center justify-between w-full bg-[#0d1f3c]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white shadow-lg">
                <span className="font-extrabold text-[10px] uppercase tracking-widest">{item.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#06b6d4]" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. ONE-STOP PARTNER MAP SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/25 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              Sourcing Value Matrix
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
              Mag7 Global – Your One-Stop Import-Export Partner
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              Navigating global trade can be challenging with complex regulations, unreliable networks, and delayed shipments. Mag7 Global simplifies your journey with complete transparency, swift response times, and a strong global network.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              With our office in <strong className="text-[#0d1f3c]">Indore, Madhya Pradesh</strong>, we provide seamless trade solutions for exporters, importers, local traders, wholesalers, and distributors. As an Integrated Service Provider, we handle everything from sourcing and documentation to logistics and compliance—ensuring a hassle-free, cost-effective, and efficient trade experience.
            </p>
          </div>
  
          {/* Right grid list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Complete EXIM EcoSystem", desc: "Covers all trade requirements from documentation, logistics, custom clearance, and quality audits." },
              { title: "Direct Buying from Farmers & FPCs", desc: "Bypasses intermediary commissions ensuring competitive rates and farmers' fair payouts." },
              { title: "Global Network", desc: "Based out of Indore with established distributors and trade connections across UAE, UK, USA, Canada, and Australia." },
              { title: "Trade Barrier Knowledge", desc: "Expertise in specific import protocols, pesticide residuals, MRL limits, and cold temperature standards." },
              { title: "Fair Margin Policy", desc: "Transparent markup rates with standard costs verified for exporters and importers alike." },
              { title: "Win - Win Trade", desc: "Fostering long-term agricultural trade relationship built on trust, consistency, and product purity." }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100/80 p-6 rounded-2xl space-y-2 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-extrabold text-[#0d1f3c] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06b6d4] shrink-0" /> 
                  <span>{item.title}</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
  
        </div>
      </section>

      {/* ── 6. TOP EXPORT PRODUCTS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/25 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            Ready to Export
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-[#0d1f3c] tracking-tight">Top Export Products</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-semibold">
            Our Highest Quality Agricultural Deliveries
          </p>
        </div>
  
        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-full text-xs font-bold text-slate-600 shadow-inner">
            {(["all", "fruits", "vegetables", "commodities", "spices"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 uppercase tracking-wider font-extrabold cursor-pointer ${
                  activeTab === tab 
                    ? "bg-[#06b6d4] text-white shadow-md shadow-cyan-500/25" 
                    : "text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredExports.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-[#0d1f3c] text-sm sm:text-base leading-tight truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                <Link
                  href={`/agro/products/${product.slug}`}
                  className="text-[#06b6d4] hover:underline flex items-center gap-0.5"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openEnquiry(product.name)}
                  className="text-slate-500 hover:text-[#06b6d4] tracking-wide uppercase cursor-pointer"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="text-center mt-12">
          <Link 
            href="/agro/products" 
            className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#06b6d4] text-slate-700 hover:text-[#06b6d4] font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
          >
            Check All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 7. TOP IMPORT PRODUCTS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 py-16 rounded-[28px] text-center">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/25 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            Inbound Sourcing
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-[#0d1f3c] tracking-tight">Top Import Products</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-semibold">
            Delivering International Produce
          </p>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-4">
          {importProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold text-[#0d1f3c] text-xs sm:text-sm truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="pb-4 pt-1">
                <button
                  onClick={() => openEnquiry(`Import: ${product.name}`)}
                  className="text-[#06b6d4] hover:text-[#0891b2] text-xs font-black tracking-wide uppercase hover:underline cursor-pointer"
                >
                  Make Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA RIBBON ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-[#0d1f3c] text-white p-8 md:p-14 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#06b6d4]/10 rounded-full translate-x-12 -translate-y-12"></div>
          
          <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
            <h3 className="text-xl md:text-3xl font-black tracking-tight">
              Looking for a trusted agricultural supply & export partner?
            </h3>
            <p className="text-slate-350 text-xs sm:text-sm font-semibold">
              Let's grow your import-export operations together with premium Indian produce.
            </p>
          </div>
          <button
            onClick={() => openEnquiry("General Requirement")}
            className="bg-[#06b6d4] hover:bg-[#0891b2] text-white font-extrabold px-8 py-4 rounded-full shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 shrink-0 text-xs uppercase tracking-wider cursor-pointer z-10"
          >
            Share Your Requirement Today
          </button>
        </div>
      </section>

      {/* Share Inquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedProduct={selectedProduct} 
      />

    </div>
  );
}
