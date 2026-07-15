import React from "react";
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
      subtitle: "Directorate General of Foreign Trade (DGFT) & CBD",
      purpose: "Registered merchant exporter license issued by the Ministry of Foreign Trade. Required for standard custom clearance at JNPT Port, Mumbai, and air cargo custom gates.",
      benefits: [
        "Legal export validation for customs clearance",
        "Central Board of Indirect Taxes and Customs verification",
        "Seamless international banking transaction settlements",
        "Integration with Dubai customs systems"
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
      subtitle: "Goods and Services Tax",
      purpose: "Mandatory taxation compliance under the Government of India, ensuring all sourcing and trading operations are transparent, legal, and fully documented.",
      benefits: [
        "Transparent supply chain taxation",
        "Input tax credit for competitive pricing",
        "Inter-state agricultural sourcing compliance",
        "Legally validated commercial invoices"
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
            <li><a href="/" className="hover:text-brand-green">Home</a></li>
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
                  <h3 className="text-xl font-bold text-brand-blue-dark">{cert.title}</h3>
                  <p className="text-xs text-brand-green font-semibold">{cert.subtitle}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{cert.purpose}</p>
                
                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {cert.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4.5 h-4.5 text-brand-green shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
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
