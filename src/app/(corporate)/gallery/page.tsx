"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Tag, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Ship,
  Globe2,
  FileCheck2
} from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  orientation: "portrait" | "landscape";
  category: "JNPT Visit";
}

const JNPT_EVENT_IMAGES: GalleryImage[] = [
  {
    id: "jnpt-1",
    src: "/images/gallery/jnpt-1.jpeg",
    title: "JNPT Visit Photo 1",
    orientation: "portrait",
    category: "JNPT Visit"
  },
  {
    id: "jnpt-2",
    src: "/images/gallery/jnpt-2.jpeg",
    title: "JNPT Visit Photo 2",
    orientation: "portrait",
    category: "JNPT Visit"
  },
  {
    id: "jnpt-3",
    src: "/images/gallery/jnpt-3.jpeg",
    title: "JNPT Visit Photo 3",
    orientation: "portrait",
    category: "JNPT Visit"
  },
  {
    id: "jnpt-4",
    src: "/images/gallery/jnpt-4.jpeg",
    title: "JNPT Visit Photo 4",
    orientation: "portrait",
    category: "JNPT Visit"
  },
  {
    id: "jnpt-5",
    src: "/images/gallery/jnpt-5.jpeg",
    title: "JNPT Visit Photo 5",
    orientation: "landscape",
    category: "JNPT Visit"
  }
];

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "JNPT Visit"];

  const filteredImages = activeCategory === "All"
    ? JNPT_EVENT_IMAGES
    : JNPT_EVENT_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#fafbfc] py-12 md:py-20 font-sans text-slate-800"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        
        {/* Hero Banner Header */}
        <div className="bg-gradient-to-br from-[#060e1e] via-[#0d1f3c] to-[#06b6d4]/20 rounded-[32px] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#06b6d4]/20 border border-[#06b6d4]/40 text-[#06b6d4] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              <Camera className="w-3.5 h-3.5" />
              Official Media & Event Gallery
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight leading-tight">
              MAG7 Global Event Gallery
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
              Real-time visual records of our JNPT port inspection visits, logistics operations, and company events.
            </p>
          </div>
        </div>

        {/* Featured Event Card — JNPT Site Visit */}
        <div className="bg-white border border-slate-100 rounded-[28px] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#06b6d4] tracking-wider">
                <Ship className="w-4 h-4" />
                <span>Featured Event</span>
              </div>
              <h2 className="text-2xl font-black text-[#0d1f3c]">
                JNPT Site Visit — Navi Mumbai
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-150">
                <MapPin className="w-4 h-4 text-[#06b6d4]" />
                JNPT Port, Navi Mumbai
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-150">
                <Calendar className="w-4 h-4 text-emerald-500" />
                July 2026
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0d1f3c] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clean Image Grid preserving natural orientation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with natural aspect ratio */}
                <div className={`relative w-full ${img.orientation === "portrait" ? "h-96 sm:h-[420px]" : "h-64 sm:h-72"} bg-slate-900`}>
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Clean hover icon only */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 text-[#0d1f3c] p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Events Announcement Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#06b6d4]/10 text-[#06b6d4] rounded-2xl flex items-center justify-center shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-[#0d1f3c] text-base">More Event Photos Coming Soon</h3>
              <p className="text-xs text-slate-500 font-semibold">Additional field visits and trade exhibition media will be added here.</p>
            </div>
          </div>
          <Link
            href="/rfq"
            className="inline-flex items-center gap-2 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md shrink-0"
          >
            <span>Request Trade Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ── CLEAN LIGHTBOX POPUP MODAL ── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 font-bold"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center p-2 space-y-4">
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="text-white text-xs font-bold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              Image {selectedImageIndex + 1} of {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}