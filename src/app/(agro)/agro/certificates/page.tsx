import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, FileText, CheckCircle2, ArrowUpRight, Globe2, FileSignature, Leaf, TestTube } from "lucide-react";
import dynamic from "next/dynamic";

const ProductEnquiry = dynamic(() => import("@/components/ProductEnquiry"), {
  ssr: false,
});

export default function CertificatesPage() {
  const certificates = [
    {
      icon: <Award className="w-10 h-10 text-brand-blue" />,
      title: "APEDA Registration",
      subtitle: "Agricultural & Processed Food Products Export Development Authority",
      purpose: "Mandatory licensing issued by the Ministry of Commerce & Industry, Government of India, to regulate and certify export parameters for Indian fresh fruits, vegetables, grains, and agricultural goods.",
      benefits: [
        "Quality standardization audits",
        "Pesticide residual inspection limits tracking",
        "Financial export promotion subsidies access",
        "International trace-net database verification"
      ]
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-brand-green" />,
      title: "FSSAI License",
      subtitle: "Food Safety and Standards Authority of India",
      purpose: "Statutory food security registration ensuring that all processed food, grains, fruits, and edible items handled in our sorting and packaging facilities align with hygienic and toxicity safety matrices.",
      benefits: [
        "Rigorous sanitation audits",
        "Contaminant-free processing facility checks",
        "Standard packaging shelf life compliance",
        "Hygienic sorting standards alignment"
      ]
    },
    {
      icon: <FileText className="w-10 h-10 text-brand-blue" />,
      title: "Import Export Code (IEC)",
      subtitle: "Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry",
      number: "AAVCM0809P",
      issueDate: "14/07/2026",
      pdfUrl: "/certificates/certificateOfIEC.pdf",
      fileName: "certificateOfIEC.pdf",
      purpose: "Official merchant exporter registration issued by DGFT (Indore Authority), certifying MAG7 GLOBAL PRIVATE LIMITED for cross-border trade and customs clearance.",
      benefits: [
        "IEC Code: AAVCM0809P (Verified by DGFT)",
        "Legal export clearance at JNPT Port & Air Cargo gates",
        "Central Board of Indirect Taxes & Customs alignment",
        "Seamless global banking & UAE customs integration"
      ]
    },
    {
      icon: <Globe2 className="w-10 h-10 text-brand-green" />,
      title: "FIEO Registration",
      subtitle: "Federation of Indian Export Organisations",
      purpose: "Recognized by the Ministry of Commerce as a reliable exporter. It validates our global trading operations and ensures compliance with international trade frameworks.",
      benefits: [
        "Government-recognized export house status",
        "Global trade credibility and trust",
        "Streamlined international banking",
        "Direct access to global trade updates"
      ]
    },
    {
      icon: <FileSignature className="w-10 h-10 text-brand-blue" />,
      title: "GST Registration",
      subtitle: "Goods and Services Tax (Form GST REG-06)",
      number: "23AAVCM0809P1ZX",
      issueDate: "02/07/2026",
      pdfUrl: "/certificates/AA230626050525C_RC02072026.pdf",
      fileName: "AA230626050525C_RC02072026.pdf",
      purpose: "Official tax registration issued by the Government of India & MP State Tax Department to MAG7 GLOBAL PRIVATE LIMITED for transparent commercial trade.",
      benefits: [
        "GSTIN: 23AAVCM0809P1ZX (Verified Registration)",
        "Transparent supply chain tax compliance",
        "Input tax credit optimization for competitive export pricing",
        "Legally validated commercial export invoices"
      ]
    },
    {
      icon: <Leaf className="w-10 h-10 text-brand-green" />,
      title: "Spices Board of India",
      subtitle: "Certificate of Registration as Exporter of Spices",
      purpose: "Mandatory certification for exporting Indian spices. It guarantees that our spice exports meet strict quality, grading, and packaging standards.",
      benefits: [
        "Verified spice exporter status",
        "Adherence to global spice quality standards",
        "Access to advanced testing laboratories",
        "Mandatory for high-quality spice shipments"
      ]
    },
    {
      icon: <TestTube className="w-10 h-10 text-brand-blue" />,
      title: "Phytosanitary Certification",
      subtitle: "Plant Quarantine (Regulation of Import into India) Order",
      purpose: "Issued for each shipment after rigorous inspection by the Directorate of Plant Protection, Quarantine & Storage, confirming goods are free from pests and diseases.",
      benefits: [
        "Disease and pest-free agricultural produce",
        "Mandatory for international customs clearance",
        "Compliant with importing country's regulations",
        "Guarantees freshness and sanitary safety"
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><Link href="/agro" className="hover:text-brand-green">Agro Home</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-brand-blue-dark">Certificates</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">Certificates & Licenses</h1>
        </div>
      </section>

      {/* Intro Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-extrabold text-brand-blue-dark">Regulated Export Operations</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            At Mag7 Global, we ensure absolute compliance with global phytosanitary, tax, and trading frameworks. Our facilities and sourcing channels undergo routine inspections by the respective authorities to guarantee safety, safety validation, and organic authenticity.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {certificates.map((cert, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Icon block */}
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                  {cert.icon}
                </div>
              </div>

              {/* Text block */}
              <div className="md:col-span-10 space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-brand-blue-dark">{cert.title}</h3>
                    {cert.number && (
                      <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-brand-blue/20">
                        {cert.number}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-green font-semibold">{cert.subtitle}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{cert.purpose}</p>
                
                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {cert.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4.5 h-4.5 text-brand-green shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* PDF Certificate Action Bar */}
                {cert.pdfUrl && (
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 font-semibold">
                      <span>Issued: <strong className="text-slate-700">{cert.issueDate}</strong></span>
                      <span className="mx-2">•</span>
                      <span>File: <code className="text-brand-blue font-bold">{cert.fileName}</code></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Official PDF</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={cert.pdfUrl}
                        download
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Request Certification Documentation</h3>
            <p className="text-slate-400 text-sm">Need actual physical verification documents for customs or wholesale clearances?</p>
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
