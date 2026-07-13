"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Building2, 
  Globe2, 
  Phone, 
  Mail, 
  FileText, 
  Layers, 
  Package, 
  Scale, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Send, 
  MessageCircle, 
  CheckCircle,
  HelpCircle,
  Clock
} from "lucide-react";
import { products } from "@/data/products";

// Standard Trade Country Codes
const COUNTRY_CODES = [
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
];

const BUSINESS_TYPES = [
  "Importer / Wholesaler",
  "Supermarket / Retail Chain",
  "Food Processor",
  "Broker / Agent"
];

const PACKAGING_PREFERENCES = [
  "13.5 kg Telescopic Carton",
  "25 kg PP Bag",
  "Bulk Container",
  "Custom Private Label"
];

const INCOTERMS = [
  { value: "FOB", label: "FOB - Free on Board (Load Port)" },
  { value: "CIF", label: "CIF - Cost, Insurance & Freight (Discharge Port)" },
  { value: "CFR", label: "CFR - Cost and Freight (Discharge Port)" },
  { value: "EXW", label: "EXW - Ex Works (Factory Pick-up)" }
];

const QUANTITY_UNITS = [
  "Metric Tons (MT)",
  "40ft Reefer Containers",
  "20ft Reefer Containers",
  "20ft Dry Containers",
  "Kilograms (KG)",
  "Air Freight Trial Shipment"
];

const TIMELINE_PREFERENCES = [
  "Immediate / Spot Order",
  "Within 30 Days",
  "Long-term Contract Inquiry"
];

const CATEGORY_LABELS: Record<string, string> = {
  fruits: "Export Fruits",
  vegetables: "Export Vegetables",
  commodities: "Export Commodities & Grains",
  spices: "Export Spices",
  imports: "Imported Fruits & Nuts"
};

export default function RFQPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+971");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("fruits");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qualitySpecs, setQualitySpecs] = useState("");

  const [error, setError] = useState("");

  // Filter products by selected category
  const filteredProducts = products.filter(p => p.category === category);

  // Auto-select first product when category changes
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setSelectedProductId(filteredProducts[0].id);
    } else {
      setSelectedProductId("");
    }
  }, [category]);

  const getProductName = (id: string) => {
    const prod = products.find(p => p.id === id || p.name.toLowerCase() === id.toLowerCase());
    return prod ? prod.name : id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !whatsappNumber || !qualitySpecs) {
      setError("Please fill in all required fields.");
      return;
    }

    if (email && !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const newLead = {
      id: "RFQ-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: "Pending" as const, // Pending, Quoted, Closed
      fullName,
      designation: "Product Sourcing Inquiry",
      companyName: "N/A",
      businessType: "Importer / Wholesaler",
      destinationCountry: "N/A",
      destinationPort: "N/A",
      whatsappCode,
      whatsappNumber,
      email: email || "N/A",
      category,
      productId: selectedProductId,
      qualitySpecs,
      packaging: "Standard",
      quantity: 1,
      quantityUnit: "Trial",
      incoterm: "CIF",
      timeline: "Immediate / Spot Order"
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

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setWhatsappNumber("");
    setEmail("");
    setCategory("fruits");
    setSelectedProductId(products[0]?.id || "");
    setQualitySpecs("");
  };

  const generateWhatsAppMessage = () => {
    const prodName = getProductName(selectedProductId);
    const catLabel = CATEGORY_LABELS[category] || category;

    const message = `*RFQ - REQUEST FOR QUOTATION*
---------------------------------------
• *Buyer Name:* ${fullName}
• *WhatsApp:* ${whatsappCode} ${whatsappNumber}
• *Email:* ${email || "N/A"}
• *Category:* ${catLabel}
• *Product:* ${prodName}
• *Requirement:* ${qualitySpecs}
---------------------------------------
Sent via mag7global.com RFQ portal`;

    return `https://wa.me/917987384443?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><a href="/" className="hover:text-brand-green">Home</a></li>
            <li className="text-slate-400">/</li>
            <li className="text-brand-blue-dark">Request for Quotation</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Request for Quotation (RFQ)
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Get exact pricing, packaging customisation, and shipping schedules tailored for your destination port.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8">
            
            {isSubmitted ? (
              // Success Screen
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue-dark">RFQ Submitted Successfully!</h2>
                  <p className="text-slate-500 text-xs max-w-md mx-auto">
                    Your trade inquiry has been logged. Our export team is currently analyzing prices for your request.
                  </p>
                </div>

                {/* Structured Overview Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4 max-w-xl mx-auto text-xs">
                  <h3 className="font-extrabold text-brand-blue-dark border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-blue" /> Summary of Your Request
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-slate-400">Buyer Identity</p>
                      <p className="font-bold text-slate-700">{fullName}</p>
                      <p className="text-slate-500">{whatsappCode} {whatsappNumber}</p>
                      <p className="text-slate-500">{email || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">Product & Sourcing</p>
                      <p className="font-bold text-brand-green">{getProductName(selectedProductId)}</p>
                      <p className="text-slate-500 truncate">Details: {qualitySpecs}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-slate-400 font-medium">Estimated Reply Time</p>
                      <p className="font-bold text-brand-blue-dark flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-blue" /> 12 - 24 Hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" /> Speed Up via WhatsApp
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 text-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              // Simplified Single-step Form
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-brand-blue-dark flex items-center gap-2 border-b border-slate-100 pb-2">
                      <User className="w-4 h-4 text-brand-blue" /> Section A: Buyer Contact Info
                    </h3>
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {/* WhatsApp & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={whatsappCode}
                            onChange={(e) => setWhatsappCode(e.target.value)}
                            className="border border-gray-300 rounded-lg px-2 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-700 font-semibold"
                          >
                            {COUNTRY_CODES.map(item => (
                              <option key={item.code} value={item.code}>
                                {item.flag} {item.code} ({item.country})
                              </option>
                            ))}
                          </select>
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              placeholder="Phone (without country code)"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value)}
                              className="w-full pl-9 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Corporate Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-brand-blue-dark flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Layers className="w-4 h-4 text-brand-blue" /> Section B: Sourcing Requirements
                    </h3>

                    {/* Category & Product */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-700 font-semibold"
                        >
                          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Select Product
                        </label>
                        <select
                          value={selectedProductId}
                          onChange={(e) => setSelectedProductId(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-700 font-semibold"
                        >
                          {filteredProducts.map(prod => (
                            <option key={prod.id} value={prod.id}>{prod.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sourcing details */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Sourcing Details (Quantity, discharge port, target pricing, sizing, etc.) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        placeholder="Please write quantity (MT/Containers), target destination port (e.g. Rotterdam, Jebel Ali), and quality requirements..."
                        value={qualitySpecs}
                        onChange={(e) => setQualitySpecs(e.target.value)}
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                        required
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Submit Sourcing RFQ
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

          {/* Right Column: Support Definitions Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Trade Support info */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-brand-blue-dark text-sm flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-blue" /> Why use structured RFQ?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Import-Export (EXIM) trade requires precise parameters to construct standard freight pricing.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-slate-600">
                    <strong>Port-level Pricing:</strong> Direct ocean freight rates from JNPT (India) or Port of Rotterdam.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-slate-600">
                    <strong>WhatsApp Fast-track:</strong> Get direct alerts on price updates when sourcing seasons start.
                  </p>
                </div>
              </div>
            </div>

            {/* Incoterms Quick Guide */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-brand-blue-dark text-sm">
                Incoterms Quick Guide
              </h3>
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-bold text-brand-blue">FOB (Free on Board):</span>
                  <p className="text-slate-500 mt-0.5">Sellers load cargo on the ship. Buyer handles ocean freight, insurance, and discharge.</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <span className="font-bold text-brand-blue">CIF (Cost, Insurance & Freight):</span>
                  <p className="text-slate-500 mt-0.5">Seller pays freight and basic cargo insurance to transport goods to discharge port.</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <span className="font-bold text-brand-blue">CFR (Cost & Freight):</span>
                  <p className="text-slate-500 mt-0.5">Seller pays cargo shipping costs to port of destination, buyer pays insurance.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
