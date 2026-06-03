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
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
              alt="Fresh ginger and agricultural sourcing"
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
            <h3 className="text-lg font-bold text-brand-blue-dark">Core Values</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Integrity in specifications, absolute transparency in margins, rigorous food-safety compliance, and relationship-driven trade.
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
        <h2 className="section-title">Our Offices & Presence</h2>
        <div className="section-subtitle">Managing logistics locally in three trade hubs</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              flag: "🇮🇳",
              office: "Mag7 Global LLP (Pune Sourcing)",
              address: "Prabhat Rd, Pune, India",
              contact: "+91 963 777 0010"
            },
            {
              flag: "🇮🇳",
              office: "Mag7 Global LLP (Navi Mumbai APMC)",
              address: "511 A, 5th Flr, Groma House, Sector 19 – APMC Market, Vashi Navi Mumbai 400703",
              contact: "+91 9226 279 066"
            },
            {
              flag: "🇦🇪",
              office: "Mag7 LLC-FZ (Dubai Import Office)",
              address: "Office no-2, Unique time business center, 1st floor union coop market, Al Aweer market Dubai UAE",
              contact: "+971 582 648 383"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{item.flag}</span>
                <div>
                  <h4 className="font-extrabold text-brand-blue-dark text-sm sm:text-base">{item.office}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Trading Hub</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.address}</p>
              <div className="flex items-center gap-2 pt-2 text-xs text-brand-blue-dark font-bold border-t border-slate-50">
                <Phone className="w-3.5 h-3.5 text-brand-green" /> {item.contact}
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
