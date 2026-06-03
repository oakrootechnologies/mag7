"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Cavendish Banana",
    product: "banana"
  },
  {
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Indian Onion",
    product: "onion"
  },
  {
    image: "https://images.unsplash.com/photo-1588252399650-db747a83d735?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Green Chilli",
    product: "chilli"
  },
  {
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Semi-Husked Coconut",
    product: "coconut"
  },
  {
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=80",
    text: "Leading Exporters of High Quality Suran / Elephant Foot Yam",
    product: "elephant-foot-yam-suran"
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
              <div className="max-w-3xl space-y-6 text-white text-left">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
                  {slide.text}
                </h1>
                <div className="flex gap-4">
                  <Link href={`/export-products/${slide.product}`} className="btn-primary">
                    View Details
                  </Link>
                  <button onClick={() => openEnquiry(slide.text)} className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue-dark">
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

      {/* 2. Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 p-6 md:p-12 rounded-3xl border border-slate-100">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Image
              src="/logo/hori logo.png"
              alt="Mag7 Global Logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </div>
          
          <div className="md:col-span-8 space-y-6 text-slate-700 text-base leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue-dark tracking-tight">
              Mag7 Global <span className="text-brand-green">“Reliable Agri Supply for Exporters and Importers Worldwide”</span>
            </h2>
            <p>
              At <strong>Mag7 Global LLP</strong>, we are one of <strong>India’s most reliable suppliers of agricultural products</strong>, delivering <strong>fruits, vegetables, spices, grains, frozen and processed foods</strong> to markets worldwide. With a strong farmer network, modern grading and packaging, and efficient logistics, we ensure <strong>quality and timely delivery</strong> every time.
            </p>
            <p>
              Trusted across the <strong>UAE, Gulf, Europe, UK, USA, Canada, and Australia</strong>, we are the preferred partner for <strong>Indian exporters</strong> and <strong>global importers</strong> seeking authentic, top-quality agricultural products.
            </p>
          </div>
        </div>
      </section>

      {/* 3. We Are Experts Of Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">We Are Experts Of...</h2>
        <p className="text-center text-slate-500 text-sm max-w-xl mx-auto mb-12">
          Leveraging standardized pipelines to ensure agricultural produce reaches foreign markets in peak quality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              icon: <Compass className="w-8 h-8 text-brand-blue" />,
              title: "Logistics",
              desc: "Complete cold chain control with reefer container shipments (13C for bananas, 1C for apples) ensuring pristine delivery."
            },
            {
              icon: <Globe2 className="w-8 h-8 text-brand-green" />,
              title: "Export Compliance",
              desc: "End-to-end documentation, custom clearance at JNPT Port, and compliance with APEDA, FSSAI, and importing customs."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-blue-dark mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
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
              img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80",
              link: "/export-products?cat=fruits"
            },
            {
              title: "Vegetables",
              img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
              link: "/export-products?cat=vegetables"
            },
            {
              title: "Commodities & Grains",
              img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
              link: "/export-products?cat=commodities"
            },
            {
              title: "Spices",
              img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
              link: "/export-products?cat=spices"
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative h-48 overflow-hidden rounded-2xl shadow-sm flex items-end p-4 cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/35" />
              <div className="relative z-10 flex items-center justify-between w-full bg-brand-blue-dark/85 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-white">
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
            <p className="text-slate-600 text-sm leading-relaxed">
              Navigating global trade can be challenging with complex regulations, unreliable networks, and delayed shipments. Mag7 Global simplifies your journey with complete transparency, swift response times, and a strong global network.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              With offices in <strong>Pune, Mumbai (Vashi Market), and Dubai</strong>, we provide seamless trade solutions for <strong>exporters, importers, local traders, wholesalers, and distributors.</strong> As an <strong>Integrated Service Provider</strong>, we handle everything from sourcing and documentation to logistics and compliance—ensuring a <strong>hassle-free, cost-effective, and efficient trade experience.</strong>
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Complete EXIM EcoSystem", desc: "Covers all trade requirements from documentation, logistics, custom clearance, and quality audits." },
              { title: "Direct Buying from Farmers & FPCs", desc: "Bypasses intermediary commissions ensuring competitive rates and farmers' fair payouts." },
              { title: "Global Network", desc: "Offices in India and Dubai with established distributors in USA, UK, UAE, Canada, and Australia." },
              { title: "Trade Barrier Knowledge", desc: "Expertise in specific import protocols, pesticide residuals, MRL limits, and cold temperature standards." },
              { title: "Fair Margin Policy", desc: "Transparent markup rates with standard costs verified for exporters and importers alike." },
              { title: "Win - Win Trade", desc: "Fostering long-term agricultural trade relationship built on trust, consistency, and product purity." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-2">
                <h4 className="font-extrabold text-brand-blue-dark text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" /> {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
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
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold text-slate-600">
            {(["all", "fruits", "vegetables", "commodities", "spices"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors uppercase ${
                  activeTab === tab ? "bg-brand-blue text-white" : "text-slate-600 hover:bg-slate-200"
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
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-tight truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2.5 border-t border-slate-50 flex items-center justify-between text-xs">
                <Link
                  href={`/export-products/${product.slug}`}
                  className="text-brand-blue font-bold hover:underline flex items-center gap-0.5"
                >
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openEnquiry(product.name)}
                  className="text-brand-green hover:text-brand-green-dark font-extrabold"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/export-products" className="btn-outline inline-flex items-center gap-2">
            Check All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. Top Import Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 py-16 rounded-3xl border border-slate-100">
        <h2 className="section-title">Top Import Products</h2>
        <div className="section-subtitle">Delivering International Produce</div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-4">
          {importProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group text-center flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-extrabold text-brand-blue-dark text-xs sm:text-sm truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="pb-3 pt-1">
                <button
                  onClick={() => openEnquiry(`Import: ${product.name}`)}
                  className="text-brand-green hover:text-brand-green-dark text-xs font-bold hover:underline block mx-auto"
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
        <div className="bg-brand-blue-dark text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-brand-green/20 relative overflow-hidden">
          {/* Subtle flat yellow accent badge in the background */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full translate-x-12 -translate-y-12"></div>
          
          <div className="space-y-2 text-center md:text-left z-10">
            <h3 className="text-xl md:text-2xl font-black">
              Looking for a trusted agricultural supply & export partner?
            </h3>
            <p className="text-slate-300 text-sm">
              Let's grow your import-export operations together with premium Nashik and Pollachi produce.
            </p>
          </div>
          <button
            onClick={() => openEnquiry("General Requirement")}
            className="bg-brand-green text-white hover:bg-brand-green-dark font-extrabold px-8 py-3.5 rounded-xl shadow-sm transition-all shrink-0 text-sm z-10"
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
