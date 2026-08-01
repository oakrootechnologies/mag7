"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Building2, 
  Globe2, 
  Phone, 
  Mail, 
  FileText, 
  Package, 
  Send, 
  MessageCircle, 
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { handicraftsProducts } from "@/data/handicrafts";

const COUNTRY_CODES = [
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
];

const CATEGORY_LABELS: Record<string, string> = {
  wooden: "Wooden Handicrafts",
  brass: "Brass & Metal Ware",
  pottery: "Jaipur Blue Pottery",
  textiles: "Handwoven Textiles",
  stone: "Inlaid Stone Craft"
};

function HandicraftsRFQContent() {
  const searchParams = useSearchParams();
  const prodSlug = searchParams?.get("prod") || "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+971");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("United Arab Emirates");
  const [category, setCategory] = useState("wooden");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qualitySpecs, setQualitySpecs] = useState("");
  const [error, setError] = useState("");

  const filteredProducts = handicraftsProducts.filter(p => p.category === category);

  // Sync state if slug parameter exists
  useEffect(() => {
    if (prodSlug) {
      const selected = handicraftsProducts.find(p => p.slug === prodSlug);
      if (selected) {
        setCategory(selected.category);
        setSelectedProductId(selected.id);
      }
    }
  }, [prodSlug]);

  useEffect(() => {
    if (!prodSlug && filteredProducts.length > 0) {
      setSelectedProductId(filteredProducts[0].id);
    }
  }, [category]);

  const getProductName = (id: string) => {
    const prod = handicraftsProducts.find(p => p.id === id);
    return prod ? prod.name : id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !whatsappNumber || !qualitySpecs) {
      setError("Please fill in all required fields.");
      return;
    }

    const newLead = {
      id: "RFQ-H-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: "Pending",
      fullName,
      designation: "Handicrafts Sourcing Inquiry",
      companyName: "N/A",
      businessType: "Importer / Distributor",
      destinationCountry: destinationCountry || "United Arab Emirates",
      whatsappCode,
      whatsappNumber,
      email: email || "N/A",
      category,
      productId: selectedProductId,
      qualitySpecs,
      packaging: "Artisanal Secure",
      quantity: 1,
      quantityUnit: "Wholesale MOQ",
      incoterm: "FOB",
      timeline: "Standard Sourcing"
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    }

    setIsSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const prodName = getProductName(selectedProductId);
    const catLabel = CATEGORY_LABELS[category] || category;

    const message = `*RFQ - HANDICRAFTS SOURCE*
---------------------------------------
• *Buyer Name:* ${fullName}
• *WhatsApp:* ${whatsappCode} ${whatsappNumber}
• *Email:* ${email || "N/A"}
• *Category:* ${catLabel}
• *Product:* ${prodName}
• *Specifications:* ${qualitySpecs}
---------------------------------------
Sent via mag7global.com Handicrafts Portal`;

    return `https://wa.me/919111777045?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#f9f5eb] py-12 border-b border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><Link href="/handicrafts" className="hover:text-[#b45309]">Handicrafts Home</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-[#b45309]">Inquiry (RFQ)</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Handicrafts Trade Inquiry
          </h1>
          <p className="text-xs text-slate-500 mt-2 max-w-xl font-semibold">
            Specify customized packaging, custom dimensions, or custom logos for your wholesale orders.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4">
        {isSubmitted ? (
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-brand-blue-dark">RFQ Logged Successfully!</h2>
              <p className="text-slate-500 text-xs font-semibold max-w-md mx-auto">
                Your custom craft requirements have been registered. To expedite processing, click the button below to connect with our sourcing head directly on WhatsApp.
              </p>
            </div>
            <div className="flex justify-center pt-2">
              <a 
                href={generateWhatsAppMessage()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-8 py-4 rounded-none shadow-md flex items-center gap-2 text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" /> Expedite on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-150 p-6 md:p-10 rounded-3xl shadow-sm space-y-8">
            <h3 className="font-extrabold text-brand-blue-dark text-base sm:text-lg border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#b45309]" /> Custom Sourcing Sheet
            </h3>

            {error && (
              <div className="bg-red-55/10 border border-red-200 text-red-600 p-4 text-xs font-bold rounded-none">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Buyer Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#b45309]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. purchaser@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#b45309]"
                  />
                </div>
              </div>

              {/* Destination Country */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Destination Country <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    placeholder="e.g. United Arab Emirates, UK, USA, Germany"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#b45309]"
                  />
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">WhatsApp Contact Number <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <select
                    value={whatsappCode}
                    onChange={(e) => setWhatsappCode(e.target.value)}
                    className="py-3 px-3 border border-slate-200 rounded-none text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#b45309]"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <div className="relative flex-grow">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. 501234567"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#b45309]"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Craft Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-none text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#b45309]"
                >
                  <option value="wooden">Wooden Handicrafts</option>
                  <option value="brass">Brass & Metal Ware</option>
                  <option value="pottery">Jaipur Blue Pottery</option>
                  <option value="textiles">Handwoven Textiles</option>
                  <option value="stone">Inlaid Stone Craft</option>
                </select>
              </div>

              {/* Product */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Select Craft Item</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-none text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#b45309]"
                >
                  {filteredProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Requirements */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase text-slate-450 tracking-wider">Custom Sourcing Specifications <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  value={qualitySpecs}
                  onChange={(e) => setQualitySpecs(e.target.value)}
                  placeholder="Specify custom sizing dimensions, packaging preferences, design patterns, or target order quantity (MOQs apply)."
                  className="w-full p-4 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#b45309]"
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-[#b45309] hover:bg-[#854d0e] text-white py-4 text-xs font-black uppercase tracking-wider rounded-none shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Submit RFQ Sheet
            </button>
          </form>
        )}
      </section>

    </div>
  );
}

export default function HandicraftsRFQPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-bold text-slate-400">Loading form...</div>}>
      <HandicraftsRFQContent />
    </Suspense>
  );
}
