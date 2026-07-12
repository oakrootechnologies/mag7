"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  User, 
  LogOut, 
  Trash2, 
  Eye, 
  FileSpreadsheet, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  X, 
  MessageCircle, 
  ChevronDown, 
  Search,
  Building,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Package,
  Scale
} from "lucide-react";
import { products } from "@/data/products";

interface RFQLead {
  id: string;
  date: string;
  status: "Pending" | "Quoted" | "Closed";
  fullName: string;
  designation: string;
  companyName: string;
  businessType: string;
  destinationCountry: string;
  destinationPort: string;
  whatsappCode: string;
  whatsappNumber: string;
  email: string;
  category: string;
  productId: string;
  qualitySpecs: string;
  packaging: string;
  quantity: number;
  quantityUnit: string;
  incoterm: string;
  timeline: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  fruits: "Fruits",
  vegetables: "Vegetables",
  commodities: "Commodities & Grains",
  spices: "Spices",
  imports: "Imported Fruits & Nuts"
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Leads state
  const [leads, setLeads] = useState<RFQLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<RFQLead | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("All");

  useEffect(() => {
    setMounted(true);
    // Check if session login is stored
    const authSession = sessionStorage.getItem("admin_authenticated");
    if (authSession === "true") {
      setIsLoggedIn(true);
    }
    // Load leads
    loadLeads();
  }, []);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("rfq_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error("Failed to load leads from localStorage:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    // Default credentials
    if (username === "Admin@Mag7global" && password === "Mag7#Secured$Complex%Admin@2026!") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_authenticated", "true");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_authenticated");
    setUsername("");
    setPassword("");
  };

  const updateLeadStatus = (leadId: string, newStatus: "Pending" | "Quoted" | "Closed") => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem("rfq_leads", JSON.stringify(updated));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm("Are you sure you want to delete this RFQ lead permanently?")) {
      const filtered = leads.filter(l => l.id !== leadId);
      setLeads(filtered);
      localStorage.setItem("rfq_leads", JSON.stringify(filtered));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

  const getProductName = (id: string) => {
    const prod = products.find(p => p.id === id || p.name.toLowerCase() === id.toLowerCase());
    return prod ? prod.name : id;
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.whatsappNumber.includes(searchQuery) ||
      lead.destinationPort.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || lead.category === categoryFilter;
    const matchesBusinessType = businessTypeFilter === "All" || lead.businessType === businessTypeFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesBusinessType;
  });

  // Calculate statistics
  const totalCount = leads.length;
  const pendingCount = leads.filter(l => l.status === "Pending").length;
  const quotedCount = leads.filter(l => l.status === "Quoted").length;
  const closedCount = leads.filter(l => l.status === "Closed").length;

  // CSV Export logic
  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      "Lead ID", "Date", "Status", "Full Name", "Designation", "Company", "Business Type", 
      "WhatsApp Number", "Email", "Category", "Product", "Quality Specs", "Packaging", 
      "Quantity", "Unit", "Incoterm", "Timeline", "Destination Port", "Destination Country"
    ];

    const rows = filteredLeads.map(lead => [
      lead.id,
      new Date(lead.date).toLocaleDateString(),
      lead.status,
      `"${lead.fullName.replace(/"/g, '""')}"`,
      `"${lead.designation.replace(/"/g, '""')}"`,
      `"${lead.companyName.replace(/"/g, '""')}"`,
      lead.businessType,
      `"${lead.whatsappCode} ${lead.whatsappNumber}"`,
      lead.email,
      CATEGORY_LABELS[lead.category] || lead.category,
      getProductName(lead.productId),
      `"${lead.qualitySpecs.replace(/"/g, '""')}"`,
      lead.packaging,
      lead.quantity,
      lead.quantityUnit,
      lead.incoterm,
      lead.timeline,
      `"${lead.destinationPort.replace(/"/g, '""')}"`,
      `"${lead.destinationCountry.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mag7_rfq_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {!isLoggedIn ? (
        // Login View
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 mt-12 animate-scaleIn">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-brand-blue-dark">Mag7 Admin Portal</h1>
            <p className="text-xs text-slate-400">Please enter credentials to access RFQ trade leads.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold text-center border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 mt-2 text-sm font-bold shadow-lg"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      ) : (
        // Dashboard View
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div>
              <h1 className="text-2xl font-black text-brand-blue-dark">RFQ Lead Dashboard</h1>
              <p className="text-xs text-slate-500">Manage and follow up on global sourcing quote queries.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={loadLeads}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-xl transition-colors w-full md:w-auto shrink-0 shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Total Leads */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
                <h3 className="text-2xl font-extrabold text-brand-blue-dark mt-1">{totalCount}</h3>
              </div>
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
            </div>

            {/* Pending Leads */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Quotes</p>
                <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</h3>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Quoted Leads */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quoted</p>
                <h3 className="text-2xl font-extrabold text-brand-green mt-1">{quotedCount}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>

            {/* Closed Leads */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Closed / Ordered</p>
                <h3 className="text-2xl font-extrabold text-slate-500 mt-1">{closedCount}</h3>
              </div>
              <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Filters & Actions Panel */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full lg:max-w-xs">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search buyer/company/port..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-700"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-600"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-600"
                  >
                    <option value="All">All Categories</option>
                    {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>

                {/* Business Type Filter */}
                <div>
                  <select
                    value={businessTypeFilter}
                    onChange={(e) => setBusinessTypeFilter(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-600"
                  >
                    <option value="All">All Businesses</option>
                    <option value="Importer / Wholesaler">Importer / Wholesaler</option>
                    <option value="Supermarket / Retail Chain">Supermarket / Retail Chain</option>
                    <option value="Food Processor">Food Processor</option>
                    <option value="Broker / Agent">Broker / Agent</option>
                  </select>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={exportToCSV}
                disabled={filteredLeads.length === 0}
                className="w-full lg:w-auto bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4" /> Export CSV ({filteredLeads.length})
              </button>

            </div>
          </div>

          {/* Datatable Card */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">ID / Date</th>
                    <th className="px-6 py-4">Buyer & Company</th>
                    <th className="px-6 py-4">Product & Specs</th>
                    <th className="px-6 py-4">Quantity / Incoterm</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-bold text-sm">
                        No RFQ leads found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800">{lead.id}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {new Date(lead.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-brand-blue-dark block">{lead.fullName}</span>
                          <span className="text-[10px] text-slate-400 block">{lead.designation}</span>
                          <span className="text-slate-600 block">{lead.companyName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-brand-green block">{getProductName(lead.productId)}</span>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">{lead.qualitySpecs}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800">{lead.quantity} {lead.quantityUnit}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                            {lead.incoterm}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800 block">{lead.destinationPort}</span>
                          <span className="text-[10px] text-slate-400 block">{lead.destinationCountry}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block border ${
                            lead.status === "Pending" 
                              ? "bg-amber-50 text-amber-700 border-amber-100" 
                              : lead.status === "Quoted"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="bg-slate-100 text-slate-600 hover:bg-slate-200 p-2 rounded-lg transition-colors inline-flex items-center justify-center"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors inline-flex items-center justify-center"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Details Modal */}
          {selectedLead && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden animate-scaleIn">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-brand-blue-dark text-white">
                  <div>
                    <h3 className="text-lg font-bold">RFQ Details: {selectedLead.id}</h3>
                    <p className="text-[10px] text-white/70">Received on {new Date(selectedLead.date).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                  
                  {/* Status update banner */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs">
                    <span className="font-bold text-slate-500">Current Lead Status:</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as any)}
                        className="border border-slate-200 rounded-lg px-2 py-1 bg-white font-bold text-slate-700"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Section A */}
                    <div className="space-y-3.5 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                      <h4 className="font-bold text-brand-blue-dark flex items-center gap-1.5 text-xs border-b border-slate-200/60 pb-1.5">
                        <User className="w-3.5 h-3.5 text-brand-blue" /> Section A: Buyer & Company
                      </h4>
                      <div className="text-xs space-y-2">
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Name:</span>
                          <span className="text-slate-700 font-bold">{selectedLead.fullName}</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Designation:</span>
                          <span className="text-slate-600">{selectedLead.designation}</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Company:</span>
                          <span className="text-slate-700 font-bold">{selectedLead.companyName} ({selectedLead.businessType})</span>
                        </p>
                        <p className="flex gap-2 items-center">
                          <span className="text-slate-400 font-bold w-20 shrink-0">WhatsApp:</span>
                          <span className="text-slate-700 font-bold flex items-center gap-1">
                            {selectedLead.whatsappCode} {selectedLead.whatsappNumber}
                            <a
                              href={`https://wa.me/${selectedLead.whatsappCode.replace("+", "")}${selectedLead.whatsappNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#25D366] hover:scale-110 transition-transform"
                            >
                              <MessageCircle className="w-4 h-4 fill-current" />
                            </a>
                          </span>
                        </p>
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Email:</span>
                          <a href={`mailto:${selectedLead.email}`} className="text-brand-blue hover:underline font-bold">{selectedLead.email}</a>
                        </p>
                      </div>
                    </div>

                    {/* Section B */}
                    <div className="space-y-3.5 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                      <h4 className="font-bold text-brand-blue-dark flex items-center gap-1.5 text-xs border-b border-slate-200/60 pb-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-blue" /> Section B: Specifications
                      </h4>
                      <div className="text-xs space-y-2">
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Category:</span>
                          <span className="text-slate-700 font-bold">{CATEGORY_LABELS[selectedLead.category] || selectedLead.category}</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Product:</span>
                          <span className="text-brand-green font-bold">{getProductName(selectedLead.productId)}</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="text-slate-400 font-bold w-20 shrink-0">Packaging:</span>
                          <span className="text-slate-600 font-bold">{selectedLead.packaging}</span>
                        </p>
                        <div className="flex flex-col gap-1 border-t border-slate-200/40 pt-2 mt-2">
                          <span className="text-slate-400 font-bold">Quality Grade / Specs:</span>
                          <span className="bg-white border border-slate-150 p-2.5 rounded-lg text-slate-600 block whitespace-pre-wrap font-semibold leading-relaxed">
                            {selectedLead.qualitySpecs}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Section C */}
                  <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                    <h4 className="font-bold text-brand-blue-dark flex items-center gap-1.5 text-xs border-b border-slate-200/60 pb-1.5 mb-3.5">
                      <Scale className="w-3.5 h-3.5 text-brand-blue" /> Section C: Commercial & Logistics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150 text-center">
                        <p className="text-slate-400 font-bold">Quantity Required</p>
                        <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedLead.quantity} {selectedLead.quantityUnit}</p>
                      </div>
                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150 text-center">
                        <p className="text-slate-400 font-bold">Preferred Incoterm</p>
                        <p className="font-bold text-brand-blue text-sm mt-0.5">{selectedLead.incoterm}</p>
                      </div>
                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150 text-center">
                        <p className="text-slate-400 font-bold">Delivery Urgency</p>
                        <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedLead.timeline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Discharge Port detail */}
                  <div className="bg-brand-blue/5 border border-brand-blue/10 p-4 rounded-2xl flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-brand-blue shrink-0" />
                    <div className="text-xs">
                      <p className="text-slate-400 font-bold">Port of Discharge / Destination</p>
                      <p className="font-bold text-brand-blue-dark text-sm mt-0.5">{selectedLead.destinationPort}, {selectedLead.destinationCountry}</p>
                    </div>
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete permanently
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${selectedLead.email}?subject=Mag7%20Global%20RFQ%20Inquiry%20%5B${selectedLead.id}%5D&body=Hello%20${encodeURIComponent(selectedLead.fullName)}%2C%0A%0AThank%20you%20for%20submitting%20your%20RFQ%20for%20${encodeURIComponent(getProductName(selectedLead.productId))}.%20Our%20trade%20department%20has%20reviewed%20your%20commercial%20terms.`}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Reply by Email
                    </a>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
