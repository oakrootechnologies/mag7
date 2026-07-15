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
  ArrowUpRight
} from "lucide-react";
import { products } from "@/data/products";
import dynamic from "next/dynamic";
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), { ssr: false });

// Hero slides data
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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "fruits" | "vegetables" | "commodities" | "spices">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Slide loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter exports
  const filteredExports = products
    .filter(p => p.category !== "imports")
    .filter(p => activeTab === "all" || p.category === activeTab)
    .slice(0, 8); // Top 8 items for homepage

  // Imports list
  const importProducts = products.filter(p => p.category === "imports").slice(0, 6);

  const openEnquiry = (productName: string = "") => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Hero Slide Section */}
      <section className="relative h-[480px] md:h-[600px] w-full overflow-hidden bg-slate-900">
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
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
            <div className="absolute inset-0 flex items-end md:items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-0">
              <div className="max-w-3xl space-y-6 text-white text-left animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                  {slide.text}
                </h1>
                <div className="flex gap-4">
                  <Link href={`/export-products/${slide.product}`} className="btn-primary text-xs tracking-wider uppercase font-extrabold">
                    View Details
                  </Link>
                  <button onClick={() => openEnquiry(slide.text)} className="border border-white/60 bg-white/10 hover:bg-white text-white hover:text-brand-blue-dark py-3 px-6 rounded-xl transition-all duration-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-sm cursor-pointer">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-brand-green scale-125" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-slate-100 shadow-md shadow-slate-100/50 p-8 md:p-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Image
              src="/logo/image.png"
              alt="Mag7 Global Logo"
              width={100}
              height={100}
              className="object-contain bg-white p-2 rounded-xl shadow-sm border border-slate-100 h-24 w-24"
            />
          </div>
          
          <div className="md:col-span-8 space-y-6 text-slate-600 text-sm leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue-dark tracking-tight">
              Mag7 Global <span className="text-gradient-green font-black">“Reliable Agri Supply for Exporters and Importers Worldwide”</span>
            </h2>
            <p className="font-medium">
              At <strong>Mag7 Global LLP</strong>, we are one of <strong>India’s most reliable suppliers of agricultural products</strong>, delivering <strong>fruits, vegetables, spices, grains, frozen and processed foods</strong> to markets worldwide. With a strong farmer network, modern grading and packaging, and efficient logistics, we ensure <strong>quality and timely delivery</strong> every time.
            </p>
            <p className="font-medium">
              Trusted across the <strong>UAE, Gulf, Europe, UK, USA, Canada, and Australia</strong>, we are the preferred partner for <strong>Indian exporters</strong> and <strong>global importers</strong> seeking authentic, top-quality agricultural products.
            </p>
          </div>
        </div>
      </section>

      {/* 3. We Are Experts Of Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="inline-block bg-brand-blue/5 text-brand-blue-dark font-extrabold text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-4">Our Core Strengths</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-blue-dark tracking-tight mb-4">Our <span className="text-brand-blue">Expertise</span>...</h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Leveraging standardized pipelines to ensure agricultural produce reaches foreign markets in peak quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              icon: <Users className="w-8 h-8 text-brand-blue" />,
              title: "Sourcing",
              desc: "Direct procurement from farmers and FPCs across Maharashtra, Gujarat, and South India, eliminating middlemen."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-brand-green" />,
              title: "Packaging",
              desc: "Hygienic sorting, sizing, and packaging in export-grade corrugated boxes or mesh bags tailored to product transit times."
            },
            {
              icon: <Compass className="w-8 h-8 text-amber-500" />,
              title: "Logistics",
              desc: "Complete cold chain control with reefer container shipments (13C for bananas, 1C for apples) ensuring pristine delivery."
            },
            {
              icon: <Globe2 className="w-8 h-8 text-brand-blue-dark" />,
              title: "Export Compliance",
              desc: "End-to-end documentation, custom clearance at JNPT Port, and compliance with APEDA, FSSAI, and importing customs."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative bg-white border border-slate-100 p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 overflow-hidden ${idx % 2 === 1 ? 'lg:mt-12' : ''}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-brand-blue/5"></div>
              
              <div className="relative z-10 w-16 h-16 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="relative z-10 text-xl font-extrabold text-brand-blue-dark mb-3 group-hover:text-brand-blue transition-colors">{item.title}</h3>
              <p className="relative z-10 text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Our Portfolio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Portfolio</h2>
        <div className="section-subtitle">Explore Our Product Range</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Fruits",
              img: "/images/products/alphonso-mango.png",
              link: "/export-products?cat=fruits"
            },
            {
              title: "Vegetables",
              img: "/images/products/onion.png",
              link: "/export-products?cat=vegetables"
            },
            {
              title: "Commodities & Grains",
              img: "/images/products/sona-masuri-rice.png",
              link: "/export-products?cat=commodities"
            },
            {
              title: "Spices",
              img: "/images/products/red-chilli.png",
              link: "/export-products?cat=spices"
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative h-48 overflow-hidden rounded-xl shadow-sm flex items-end p-4 cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/35" />
              <div className="relative z-10 flex items-center justify-between w-full bg-brand-blue-dark/85 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 text-white">
                <span className="font-extrabold text-xs uppercase tracking-wider">{item.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-green-light" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. One-Stop Partner Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-extrabold text-brand-blue-dark tracking-tight">
              Mag7 Global – Your One-Stop Import-Export Partner
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Navigating global trade can be challenging with complex regulations, unreliable networks, and delayed shipments. Mag7 Global simplifies your journey with complete transparency, swift response times, and a strong global network.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              With our office in <strong>Indore, Madhya Pradesh</strong>, we provide seamless trade solutions for <strong>exporters, importers, local traders, wholesalers, and distributors.</strong> As an <strong>Integrated Service Provider</strong>, we handle everything from sourcing and documentation to logistics and compliance—ensuring a <strong>hassle-free, cost-effective, and efficient trade experience.</strong>
            </p>
          </div>
 
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Complete EXIM EcoSystem", desc: "Covers all trade requirements from documentation, logistics, custom clearance, and quality audits." },
              { title: "Direct Buying from Farmers & FPCs", desc: "Bypasses intermediary commissions ensuring competitive rates and farmers' fair payouts." },
              { title: "Global Network", desc: "Based out of Indore with established distributors and trade connections across UAE, UK, USA, Canada, and Australia." },
              { title: "Trade Barrier Knowledge", desc: "Expertise in specific import protocols, pesticide residuals, MRL limits, and cold temperature standards." },
              { title: "Fair Margin Policy", desc: "Transparent markup rates with standard costs verified for exporters and importers alike." },
              { title: "Win - Win Trade", desc: "Fostering long-term agricultural trade relationship built on trust, consistency, and product purity." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-5 rounded-xl space-y-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-extrabold text-brand-blue-dark text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" /> {item.title}
                </h4>
                <p className="text-xs text-slate-550 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
 
        </div>
      </section>

      {/* 6. Top Export Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Top Export Products</h2>
        <div className="section-subtitle">Our Highest Quality Agricultural Deliveries</div>
 
        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-xl text-xs font-bold text-slate-600 shadow-inner">
            {(["all", "fruits", "vegetables", "commodities", "spices"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 uppercase tracking-wider font-extrabold cursor-pointer ${
                  activeTab === tab ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15" : "text-slate-600 hover:bg-slate-200"
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
              className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
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
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-tight truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                <Link
                  href={`/export-products/${product.slug}`}
                  className="text-brand-blue font-extrabold hover:underline flex items-center gap-0.5"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openEnquiry(product.name)}
                  className="text-brand-green hover:text-brand-green-dark font-black tracking-wide uppercase hover:underline cursor-pointer"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
 
        <div className="text-center mt-12">
          <Link href="/export-products" className="btn-outline inline-flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider">
            Check All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. Top Import Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-100 shadow-md shadow-slate-100/50 py-16 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/30">
        <h2 className="section-title">Top Import Products</h2>
        <div className="section-subtitle">Delivering International Produce</div>
 
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-6">
          {importProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col justify-between"
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
                  <h3 className="font-extrabold text-brand-blue-dark text-xs sm:text-sm truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="pb-4 pt-1">
                <button
                  onClick={() => openEnquiry(`Import: ${product.name}`)}
                  className="text-brand-green hover:text-brand-green-dark text-xs font-black tracking-wide uppercase hover:underline cursor-pointer"
                >
                  Make Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-blue-dark text-white p-8 md:p-14 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-md shadow-brand-blue/15 border border-brand-blue/30 relative overflow-hidden">
          {/* Subtle flat yellow accent badge in the background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full translate-x-12 -translate-y-12"></div>
          
          <div className="space-y-3 text-center md:text-left z-10">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-tight">
              Looking for a trusted agricultural supply & export partner?
            </h3>
            <p className="text-slate-355 text-xs sm:text-sm font-medium">
              Let's grow your import-export operations together with premium Nashik and Pollachi produce.
            </p>
          </div>
          <button
            onClick={() => openEnquiry("General Requirement")}
            className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-8 py-4 rounded-xl shadow-md shadow-brand-green/20 hover:shadow-brand-green/35 hover:-translate-y-0.5 transition-all duration-300 shrink-0 text-xs uppercase tracking-wider cursor-pointer z-10"
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
