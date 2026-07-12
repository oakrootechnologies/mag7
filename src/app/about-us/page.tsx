import React from "react";
import Image from "next/image";
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-brand-blue-dark">Our Mission</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To supply standard quality agricultural produce to global markets with zero logistics delays, ensuring fair payouts to Indian farmers.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto text-brand-blue">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-brand-blue-dark">Our Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To become the most reliable and transparent global agriculture supply network linking Asian producers with worldwide wholesale networks.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-brand-blue-dark">Our Values</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Uncompromising quality control, customer-first service speed, trade transparency, and eco-friendly farming practices.
            </p>
          </div>

        </div>
      </section>

      {/* Sourcing and Quality Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 py-16 rounded-3xl border border-slate-100">
        <h2 className="section-title">Our Quality Pipeline</h2>
        <div className="section-subtitle">How We Maintain Premium Sourcing Standards</div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-12">
          {[
            { step: "01", title: "Direct Farm Procurement", desc: "Sourcing directly from Nashik, Satara, and Pollachi farms under fair margin terms." },
            { step: "02", title: "Sorting & Grading", desc: "Sorting for shape, size, maturity index (e.g. 90% for mangoes), and structural defects." },
            { step: "03", title: "Sanitary Cleaning", desc: "Cleaned thoroughly (alum washing for bananas, drying for onions) to eliminate mold and rot." },
            { step: "04", title: "Cold Chain Transport", desc: "Shipped in refrigerated reefer containers or fast air cargo under exact temperature conditions." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-3 relative shadow-sm">
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-slate-100 select-none">
                {item.step}
              </span>
              <h4 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
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
            className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-8 py-3.5 rounded-xl shadow-sm transition-all shrink-0 text-sm flex items-center gap-1.5"
            buttonText="Contact Sales Team"
          >
            Contact Sales Team <ArrowUpRight className="w-4 h-4" />
          </ProductEnquiry>
        </div>
      </section>

    </div>
  );
}
