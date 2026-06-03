"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactUsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsSubmitted(true);
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setProduct("");
      setRequirement("");
      setIsSubmitted(false);
    }, 4000);
  };

  const offices = [
    {
      flag: "🇮🇳",
      title: "Mag7 Global LLP (Pune Sourcing)",
      address: "Prabhat Rd, Pune, India",
      contact: "+91 963 777 0010",
      email: "info@mag7global.com"
    },
    {
      flag: "🇮🇳",
      title: "Mag7 Global LLP (Navi Mumbai)",
      address: "511 A, 5th Flr, Groma House, Sector 19 – APMC Market, Vashi Navi Mumbai 400703",
      contact: "+91 9226 279 066",
      email: "vashi@mag7global.com"
    },
    {
      flag: "🇦🇪",
      title: "Mag7 LLC-FZ (Dubai Office)",
      address: "Office no-2, Unique time business center, 1st floor union coop market, Al Aweer market Dubai UAE",
      contact: "+971 582 648 383",
      email: "dubai@mag7global.com"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><a href="/" className="hover:text-brand-green">Home</a></li>
            <li className="text-slate-400">/</li>
            <li className="text-brand-blue-dark">Contact Us</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">Contact Us</h1>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-brand-blue-dark">Requirement Form</h2>
              <p className="text-xs text-slate-500">Provide your product and shipping preferences to receive a formal quotation.</p>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                <h3 className="text-2xl font-bold text-brand-blue-dark">Enquiry Submitted!</h3>
                <p className="text-xs text-slate-500 max-w-sm">Thank you for sharing your requirements. One of our sales experts will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </div>
                </div>

                {/* Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </div>
                </div>

                {/* Product Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Product interest</label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-700 font-semibold"
                  >
                    <option value="">Choose a product</option>
                    <option value="Banana">Export : Cavendish Banana</option>
                    <option value="Onion">Export : Nashik Onion</option>
                    <option value="Chilli">Export : Green Chilli</option>
                    <option value="Coconut">Export : Semi-Husked Coconut</option>
                    <option value="Alphonso Mango">Export : Alphonso Mango</option>
                    <option value="Grapes">Export : Nashik Grapes</option>
                    <option value="Pomegranate">Export : Bhagwa Pomegranate</option>
                    <option value="Yam">Export : Elephant Foot Yam</option>
                    <option value="Garlic">Export : Garlic</option>
                    <option value="Ginger">Export : Ginger</option>
                    <option value="Rice Sona Masuri">Export : Sona Masuri Rice</option>
                    <option value="Rice IR 64">Export : IR 64 parboiled</option>
                    <option value="Rice 1121">Export : 1121 Basmati</option>
                    <option value="Spices">Export : Coriander/Cumin/Turmeric</option>
                    <option value="Imported Fruits">Import : Apple/Avocado/Dates/Orange/Dragon Fruit</option>
                  </select>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement Details</label>
                  <textarea
                    placeholder="Provide details about expected loading port (FOB / CIF), target quantity, packaging box design, or delivery timeline..."
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Requirement
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-brand-blue-dark text-base flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-brand-green" /> Response Timeline
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our sales managers are present at Vashi APMC market (Mumbai) and Al Aweer market (Dubai) to answer pricing queries. Quotes for standard port delivery are generally provided within 12-24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{office.flag}</span>
                    <h4 className="font-extrabold text-brand-blue-dark text-sm">{office.title}</h4>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-bold text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                      <span>{office.contact}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      <span>{office.email}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
