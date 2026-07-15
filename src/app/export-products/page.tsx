"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowUpRight, Filter, AlertCircle } from "lucide-react";
import { products } from "@/data/products";
import dynamic from "next/dynamic";

const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), { ssr: false });

function ProductsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("cat") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Sync state with URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (cat: string) => {
    setActiveCategory(cat);
    router.replace(`/export-products?cat=${cat}`);
  };

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "fruits" && product.category === "fruits") ||
      (activeCategory === "vegetables" && product.category === "vegetables") ||
      (activeCategory === "commodities" && product.category === "commodities") ||
      (activeCategory === "spices" && product.category === "spices") ||
      (activeCategory === "imports" && product.category === "imports");

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categoriesList = [
    { id: "all", name: "All Products" },
    { id: "fruits", name: "Export Fruits" },
    { id: "vegetables", name: "Export Vegetables" },
    { id: "commodities", name: "Export Commodities" },
    { id: "spices", name: "Export Spices" },
    { id: "imports", name: "Import Products" },
  ];

  const openEnquiry = (name: string) => {
    setSelectedProduct(name);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><Link href="/" className="hover:text-brand-green">Home</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-brand-blue-dark font-semibold">Products</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">Our Portfolio</h1>
        </div>
      </section>

      {/* Main Browse Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
              <h3 className="font-extrabold text-brand-blue-dark text-base flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-brand-green" /> Filter Categories
              </h3>
              <nav className="flex flex-col gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`text-left px-3.5 py-2.5 rounded-none text-xs font-bold transition-colors ${
                      activeCategory === cat.id
                        ? "bg-brand-blue text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-brand-blue-dark"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Search Bar & Products Grid */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Search and Mobile Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name or details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Mobile Filter Dropdown */}
              <div className="lg:hidden w-full sm:w-auto">
                <select
                  value={activeCategory}
                  onChange={(e) => handleTabChange(e.target.value)}
                  className="w-full sm:w-56 border border-gray-300 px-3 py-2.5 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue font-bold text-slate-700"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-brand-blue-dark/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-snug group-hover:text-brand-green transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                      <Link
                        href={`/export-products/${product.slug}`}
                        className="text-brand-blue font-bold hover:underline flex items-center gap-0.5"
                      >
                        More Info <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openEnquiry(product.name)}
                        className="bg-slate-50 text-brand-blue-dark hover:bg-brand-green hover:text-white px-3 py-1 rounded-none font-bold transition-colors"
                      >
                        Enquire
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-center space-y-3">
                <AlertCircle className="w-12 h-12" />
                <h4 className="font-extrabold text-lg text-slate-700">No Products Found</h4>
                <p className="text-xs max-w-sm">No products match your search query "{searchQuery}". Try selecting another category or check your spelling.</p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
      />

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3 text-slate-500">
        <div className="w-8 h-8 rounded-full border-4 border-brand-green border-t-transparent animate-spin"></div>
        <p className="text-sm font-semibold">Loading product catalog...</p>
      </div>
    }>
      <ProductsList />
    </Suspense>
  );
}
