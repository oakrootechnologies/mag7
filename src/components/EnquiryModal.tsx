"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import { products } from "@/data/products";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: string;
}

export default function EnquiryModal({ isOpen, onClose, selectedProduct = "" }: EnquiryModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    // Find product category and normalized product ID
    const prodObj = products.find(
      (p) =>
        p.name.toLowerCase() === product.toLowerCase() ||
        p.slug === product.toLowerCase() ||
        p.id === product
    );
    const categoryVal = prodObj ? prodObj.category : "fruits";
    const prodIdVal = prodObj ? prodObj.id : product || "general";

    const newLead = {
      id: "RFQ-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: "Pending" as const,
      fullName: `${firstName} ${lastName}`.trim(),
      designation: "Product Enquiry",
      companyName: "Web Enquiry",
      businessType: "Importer / Wholesaler",
      destinationCountry: "N/A",
      destinationPort: "N/A",
      whatsappCode: "",
      whatsappNumber: phone,
      email: email || "N/A",
      category: categoryVal,
      productId: prodIdVal,
      qualitySpecs: requirement || "No specific requirements provided.",
      packaging: "Standard Export Box",
      quantity: 1,
      quantityUnit: "Air Freight Trial Shipment",
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
      console.error("Failed to save lead in EnquiryModal:", err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setProduct("");
      setRequirement("");
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl animate-scaleIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-brand-blue-dark text-white">
          <h3 className="text-xl font-bold">Make An Enquiry</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-brand-blue-dark mb-2">Thank You!</h4>
              <p className="text-gray-600">Your requirement has been sent successfully. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
                </div>
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Interests</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="">Select Product</option>
                  <optgroup label="Export Fruits">
                    <option value="Alphonso Mango">Alphonso Mango</option>
                    <option value="Papaya">Papaya</option>
                    <option value="Grapes">Grapes</option>
                    <option value="Pomegranate">Pomegranate</option>
                    <option value="Coconut">Coconut</option>
                    <option value="Cavendish Banana">Cavendish Banana</option>
                  </optgroup>
                  <optgroup label="Export Vegetables">
                    <option value="Drumstick">Drumstick</option>
                    <option value="Garlic">Garlic</option>
                    <option value="Ginger">Ginger</option>
                    <option value="Lemon">Lemon</option>
                    <option value="Chilli">Chilli</option>
                    <option value="Onion">Onion</option>
                  </optgroup>
                  <optgroup label="Export Commodities">
                    <option value="Chickpeas">Chickpeas</option>
                    <option value="Green Millet">Green Millet</option>
                    <option value="Maize">Maize</option>
                    <option value="Rice Sona Masuri Non Basmati">Rice Sona Masuri Non Basmati</option>
                    <option value="Rice IR 64 Non Basmati">Rice IR 64 Non Basmati</option>
                    <option value="Rice 1121 Basmati">Rice 1121 Basmati</option>
                  </optgroup>
                  <optgroup label="Export Spices">
                    <option value="Coriander Seeds">Coriander Seeds</option>
                    <option value="Cumin Seeds">Cumin Seeds</option>
                    <option value="Turmeric">Turmeric</option>
                    <option value="Red Chilli">Red Chilli</option>
                    <option value="Black Pepper">Black Pepper</option>
                    <option value="Green Cardamom">Green Cardamom</option>
                  </optgroup>
                  <optgroup label="Import Products">
                    <option value="Apple">Apple</option>
                    <option value="Avocado">Avocado</option>
                    <option value="Dates">Dates</option>
                    <option value="Valencia Orange">Valencia Orange</option>
                    <option value="Dragon Fruit">Dragon Fruit</option>
                    <option value="Cashew Nuts">Cashew Nuts</option>
                  </optgroup>
                </select>
              </div>

              {/* Requirement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirement Details</label>
                <textarea
                  placeholder="Tell us about your quantity, packing specifications, or destination port..."
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full btn-primary py-2.5 mt-2 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Requirement
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
