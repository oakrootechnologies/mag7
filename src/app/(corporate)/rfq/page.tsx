"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Building2, 
  Package, 
  Phone, 
  Mail, 
  FileText, 
  Send, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Headphones
} from "lucide-react";

export default function CorporateRFQPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [desiredProduct, setDesiredProduct] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !companyName || !desiredProduct || !phone || !email) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const leadData = {
      id: "RFQ-CORP-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: "Pending",
      fullName,
      companyName,
      destinationCountry: destinationCountry || "United Arab Emirates",
      product: desiredProduct,
      whatsappNumber: phone,
      email,
      qualitySpecs: message || "Corporate General RFQ",
      division: "MAG7 Group Corporate"
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit RFQ. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#fafbfc] py-12 md:py-20 font-sans text-slate-800"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-12">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#0891b2] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            <Globe2 className="w-3.5 h-3.5" />
            MAG7 Global Corporate RFQ
          </div>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black text-[#0d1f3c] tracking-tight leading-tight">
            Request a Custom Trade Quote
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
            Fill out the details below. Our trade specialists will analyze your requirement and respond with a competitive quotation within 24 hours.
          </p>
        </div>

        {/* RFQ Form Container */}
        <div className="bg-white border border-slate-100/90 rounded-[28px] shadow-xl shadow-slate-200/50 p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#06b6d4]/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0d1f3c]">RFQ Submitted Successfully!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
                  Thank you, <span className="font-bold text-[#0d1f3c]">{fullName}</span>. We have received your inquiry for <span className="font-bold text-[#06b6d4]">{desiredProduct}</span>.
                </p>
                <p className="text-xs text-slate-400 font-semibold pt-1">
                  Our trade officer will review your requirements and reach out to <span className="text-slate-600 font-bold">{email}</span> shortly.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
                >
                  Return to Home
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priyansh Vyas"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Company Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Global Trading Co."
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Destination Country */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Destination Country</span>
                  </label>
                  <input
                    type="text"
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    placeholder="e.g. United Arab Emirates, UK, USA, Netherlands"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Desired Product */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Desired Product / Equipment *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={desiredProduct}
                    onChange={(e) => setDesiredProduct(e.target.value)}
                    placeholder="e.g. Cavendish Bananas / Sheesham Wood Handicrafts / Centrifugal Water Pumps"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 91117 77045"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="purchasing@company.com"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all"
                  />
                </div>

                {/* Message / Additional Details */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0d1f3c] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Additional Requirements / Quantity / Notes (Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify volume, target port, packaging specifications, or custom requirements..."
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#06b6d4] focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all resize-none"
                  />
                </div>

              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Data Privacy & Direct OEM Guarantee</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black text-xs uppercase tracking-wider px-10 py-4 rounded-full shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit RFQ</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <Headphones className="w-6 h-6 text-[#06b6d4] mx-auto mb-2" />
            <h4 className="font-black text-[#0d1f3c] text-xs uppercase tracking-wider mb-1">24h Response Time</h4>
            <p className="text-slate-500 text-xs font-semibold">Our trade Desk processes RFQs within 1 business day.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <Globe2 className="w-6 h-6 text-[#06b6d4] mx-auto mb-2" />
            <h4 className="font-black text-[#0d1f3c] text-xs uppercase tracking-wider mb-1">Global Delivery</h4>
            <p className="text-slate-500 text-xs font-semibold">Seamless export clearance at JNPT, Mundra & Delhi Cargo.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#06b6d4] mx-auto mb-2" />
            <h4 className="font-black text-[#0d1f3c] text-xs uppercase tracking-wider mb-1">APEDA / ISO Certified</h4>
            <p className="text-slate-500 text-xs font-semibold">Full trade documentation & compliance assured.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
