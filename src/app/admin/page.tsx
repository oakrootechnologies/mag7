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
  Scale,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  FileText,
  DollarSign,
  Truck,
  Globe2,
  PieChart,
  Users,
  Award,
  BarChart3,
  Plus,
  Ban,
  Phone,
  Calculator,
  Send
} from "lucide-react";
import { products } from "@/data/products";
import { 
  INITIAL_SUPPLIERS, 
  INITIAL_FREIGHT_RATES, 
  INITIAL_MARKET_TICKER, 
  INITIAL_TRADE_BARRIERS, 
  INITIAL_CUSTOMERS,
  Supplier,
  FreightForwarder,
  MarketPriceTicker,
  TradeBarrierRule,
  MasterCustomerProfile
} from "@/data/eximAdminData";

interface RFQLead {
  id: string;
  date: string;
  status: "Pending" | "Quoted" | "Closed" | "Failed";
  fullName: string;
  designation?: string;
  companyName: string;
  businessType?: string;
  destinationCountry?: string;
  destinationPort?: string;
  whatsappCode?: string;
  whatsappNumber: string;
  email: string;
  category?: string;
  product?: string;
  productId?: string;
  qualitySpecs?: string;
  packaging?: string;
  quantity?: number;
  quantityUnit?: string;
  incoterm?: string;
  timeline?: string;
  division?: string;
  // Deep CRM & P&L Additions
  customerId?: string;
  buyerPersona?: string;
  churnReason?: string;
  sourcingCostPerUnit?: number;
  quotedPricePerUnit?: number;
  freightCostUSD?: number;
  netMarginPercent?: number;
  riskFlag?: boolean;
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

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"crm" | "suppliers" | "ticker" | "analytics" | "compliance">("crm");

  // Leads & CRM state
  const [leads, setLeads] = useState<RFQLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<RFQLead | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("All");

  // Datasets state
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [freightRates, setFreightRates] = useState<FreightForwarder[]>(INITIAL_FREIGHT_RATES);
  const [marketTicker, setMarketTicker] = useState<MarketPriceTicker[]>(INITIAL_MARKET_TICKER);
  const [tradeBarriers, setTradeBarriers] = useState<TradeBarrierRule[]>(INITIAL_TRADE_BARRIERS);
  const [customers, setCustomers] = useState<MasterCustomerProfile[]>(INITIAL_CUSTOMERS);

  // Modals & P&L states
  const [showCustomerModal, setShowCustomerModal] = useState<MasterCustomerProfile | null>(null);
  const [churnModalLead, setChurnModalLead] = useState<RFQLead | null>(null);
  const [selectedFailureReason, setSelectedFailureReason] = useState<string>("Price Too High");

  // Interactive P&L calculation inputs
  const [calcSourcingCost, setCalcSourcingCost] = useState<number>(0.30); // USD/kg
  const [calcSellingPrice, setCalcSellingPrice] = useState<number>(0.45); // USD/kg
  const [calcFreightUSD, setCalcFreightUSD] = useState<number>(1450); // 20ft reefer
  const [calcQuantityTons, setCalcQuantityTons] = useState<number>(18); // 18 MT

  useEffect(() => {
    setMounted(true);
    const authSession = sessionStorage.getItem("admin_authenticated");
    if (authSession === "true") {
      setIsLoggedIn(true);
    }
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        const formattedLeads = data.map((item: any, idx: number) => ({
          ...item,
          id: item._id || item.id || `RFQ-${idx + 100}`,
          date: item.date || item._createdAt || new Date().toISOString(),
          fullName: item.fullName || item.name || "Anonymous Buyer",
          companyName: item.companyName || "N/A",
          email: item.email || "n/a@company.com",
          whatsappNumber: item.whatsappNumber || item.phone || "N/A",
          status: item.status || "Pending",
          product: item.product || item.productId || "Agro Produce",
          customerId: item.customerId || `MAG_CUST_${1000 + (idx % 5)}`,
          buyerPersona: item.buyerPersona || "Importer / Wholesaler",
          sourcingCostPerUnit: item.sourcingCostPerUnit || 0.32,
          quotedPricePerUnit: item.quotedPricePerUnit || 0.48,
          freightCostUSD: item.freightCostUSD || 1450,
          netMarginPercent: item.netMarginPercent || 18.5,
          riskFlag: item.companyName === "Test Trader Co"
        }));
        setLeads(formattedLeads);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error("Failed to load leads from API:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const isGaurav = username === "gs06152@gmail.com" && password === "Mag7#Secured$Gaurav%Admin@2026!";
    const isManoj = username === "Ms.rajawat1986@gmail.com" && password === "Mag7#Secured$Manoj%Admin@2026!";
    const isPriyansh = username === "priyanshugdscneo@gmail.com" && password === "Mag7#Secured$Priyansh%Admin@2026!";

    if (isGaurav || isManoj || isPriyansh) {
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

  const updateLeadStatus = async (leadId: string, newStatus: "Pending" | "Quoted" | "Closed" | "Failed", churnReason?: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, churnReason })
      });

      if (res.ok || true) { // Local state fallback
        const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus, churnReason } : l);
        setLeads(updated);
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus, churnReason });
        }
      }
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (confirm("Are you sure you want to delete this RFQ lead permanently?")) {
      try {
        const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
        if (res.ok || true) {
          const filtered = leads.filter(l => l.id !== leadId);
          setLeads(filtered);
          if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead(null);
          }
        }
      } catch (error) {
        console.error("Failed to delete lead:", error);
      }
    }
  };

  const toggleCustomerBlacklist = (custEmail: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.email === custEmail) {
        const nextStatus = c.riskStatus === "Blacklisted - Do Not Deal" ? "Clean / Trusted" : "Blacklisted - Do Not Deal";
        return { ...c, riskStatus: nextStatus };
      }
      return c;
    }));
  };

  const getProductName = (id?: string) => {
    if (!id) return "General Produce";
    const prod = products.find(p => p.id === id || p.name.toLowerCase() === id.toLowerCase());
    return prod ? prod.name : id;
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.companyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.whatsappNumber || "").includes(searchQuery) ||
      (lead.destinationPort || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || lead.category === categoryFilter;
    const matchesBusinessType = businessTypeFilter === "All" || (lead.businessType || lead.buyerPersona) === businessTypeFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesBusinessType;
  });

  // Calculate statistics
  const totalCount = leads.length;
  const pendingCount = leads.filter(l => l.status === "Pending").length;
  const quotedCount = leads.filter(l => l.status === "Quoted").length;
  const closedCount = leads.filter(l => l.status === "Closed").length;
  const failedCount = leads.filter(l => l.status === "Failed").length;

  // Real-time P&L calculations
  const totalSourcingUSD = calcSourcingCost * (calcQuantityTons * 1000);
  const totalRevenueUSD = calcSellingPrice * (calcQuantityTons * 1000);
  const grossMarginUSD = totalRevenueUSD - (totalSourcingUSD + calcFreightUSD + 350); // 350 custom inspection
  const marginPercent = totalRevenueUSD > 0 ? (grossMarginUSD / totalRevenueUSD) * 100 : 0;

  // Export CSV
  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      "Lead ID", "Customer ID", "Date", "Status", "Full Name", "Company", "Buyer Persona", 
      "WhatsApp Number", "Email", "Product", "Quality Specs", "Destination Port", "Destination Country"
    ];

    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.customerId || "N/A",
      new Date(lead.date).toLocaleDateString(),
      lead.status,
      `"${(lead.fullName || "").replace(/"/g, '""')}"`,
      `"${(lead.companyName || "").replace(/"/g, '""')}"`,
      lead.buyerPersona || lead.businessType || "Importer",
      `"${lead.whatsappNumber}"`,
      lead.email,
      getProductName(lead.product || lead.productId),
      `"${(lead.qualitySpecs || "").replace(/"/g, '""')}"`,
      `"${(lead.destinationPort || "N/A").replace(/"/g, '""')}"`,
      `"${(lead.destinationCountry || "N/A").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mag7_exim_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen bg-[#fafbfc] py-10 px-4 sm:px-6 lg:px-10 font-sans text-slate-800"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      
      {!isLoggedIn ? (
        /* ── LOGIN VIEW ── */
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 mt-16">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#06b6d4]/10 text-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-[#0d1f3c]">MAG7 Enterprise EXIM Control</h1>
            <p className="text-xs text-slate-400 font-semibold">Authorized Admin Access Only.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold text-center border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1 tracking-wider">Admin Email</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin@mag7global.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-[#06b6d4] font-semibold text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1 tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-[#06b6d4] font-semibold text-slate-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Sign In to EXIM Dashboard
            </button>
          </form>
        </div>
      ) : (
        /* ── ENTERPRISE DASHBOARD ── */
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded-2xl shadow-md flex items-center justify-center text-white shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#0d1f3c] tracking-tight">MAG7 Enterprise Control Center</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Global Sourcing • Deep CRM • P&amp;L Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={loadLeads}
                className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#06b6d4]" /> Sync Data
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-black text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          {/* 5 MASTER NAVIGATION TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
            {[
              { id: "crm", label: "Leads & Deep CRM", icon: <Users className="w-4 h-4" /> },
              { id: "suppliers", label: "Supplier & FPC Network", icon: <Building className="w-4 h-4" /> },
              { id: "ticker", label: "Market Rates & Freight P&L", icon: <TrendingUp className="w-4 h-4" /> },
              { id: "analytics", label: "Market Intelligence & Heatmap", icon: <BarChart3 className="w-4 h-4" /> },
              { id: "compliance", label: "Trade Compliance & Export Docs", icon: <ShieldCheck className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#0d1f3c] text-white shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TAB 1: LEADS & DEEP CRM
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "crm" && (
            <div className="space-y-6">
              
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total RFQs</p>
                    <h3 className="text-2xl font-black text-[#0d1f3c] mt-1">{totalCount}</h3>
                  </div>
                  <div className="w-12 h-12 bg-cyan-50 text-[#06b6d4] rounded-xl flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Quotes</p>
                    <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</h3>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Quoted</p>
                    <h3 className="text-2xl font-black text-emerald-600 mt-1">{quotedCount}</h3>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Closed / Failed</p>
                    <h3 className="text-2xl font-black text-slate-500 mt-1">{closedCount + failedCount}</h3>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Filter Panel */}
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="relative w-full lg:max-w-xs">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search buyer / company / port..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06b6d4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Closed">Closed</option>
                    <option value="Failed">Failed</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"
                  >
                    <option value="All">All Categories</option>
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>

                  <select
                    value={businessTypeFilter}
                    onChange={(e) => setBusinessTypeFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"
                  >
                    <option value="All">All Buyer Personas</option>
                    <option value="Importer / Wholesaler">Importer / Wholesaler</option>
                    <option value="Supermarket Chain">Supermarket Chain</option>
                    <option value="Food Processor">Food Processor</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Commodity Broker">Commodity Broker</option>
                  </select>
                </div>

                <button
                  onClick={exportToCSV}
                  className="w-full lg:w-auto bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black py-2.5 px-5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export CSV ({filteredLeads.length})
                </button>
              </div>

              {/* Master Leads Table */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-4 px-6">Customer &amp; Persona</th>
                        <th className="py-4 px-6">Product / Division</th>
                        <th className="py-4 px-6">Destination</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-slate-400 font-bold">
                            No RFQ leads matched your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => {
                          const cust = customers.find(c => c.email === lead.email) || {
                            customerId: lead.customerId || "MAG_CUST_NEW",
                            riskStatus: lead.riskFlag ? "Blacklisted - Do Not Deal" : "Clean / Trusted",
                            totalRFQs: 1,
                            ordersPlaced: 0
                          };
                          const isBlacklisted = cust.riskStatus === "Blacklisted - Do Not Deal";

                          return (
                            <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-black text-[#0d1f3c] flex items-center gap-2">
                                  <span>{lead.fullName}</span>
                                  {isBlacklisted && (
                                    <span className="bg-red-100 text-red-700 text-[9px] px-2 py-0.5 rounded-full font-black uppercase">
                                      Blacklisted
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-2 mt-0.5">
                                  <span>{lead.companyName}</span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-[#06b6d4] font-bold">{cust.customerId}</span>
                                </div>
                              </td>

                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-800">{getProductName(lead.product || lead.productId)}</div>
                                <div className="text-[10px] text-slate-400 font-semibold">{lead.division || "Agro & EXIM"}</div>
                              </td>

                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-700">{lead.destinationPort || "N/A"}</div>
                                <div className="text-[10px] text-slate-400 font-semibold">{lead.destinationCountry || "India Export"}</div>
                              </td>

                              <td className="py-4 px-6 text-slate-500 font-semibold">
                                {new Date(lead.date).toLocaleDateString()}
                              </td>

                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  lead.status === "Quoted" ? "bg-emerald-100 text-emerald-700" :
                                  lead.status === "Closed" ? "bg-slate-100 text-slate-600" :
                                  lead.status === "Failed" ? "bg-red-100 text-red-600" :
                                  "bg-amber-100 text-amber-700"
                                }`}>
                                  {lead.status}
                                </span>
                              </td>

                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedLead(lead)}
                                    className="p-2 text-slate-600 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-lg transition-colors cursor-pointer"
                                    title="View Full Lead & P&L"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <a
                                    href={`https://wa.me/${lead.whatsappNumber.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    title="WhatsApp Chat"
                                  >
                                    <MessageCircle className="w-4 h-4" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: SUPPLIER & FPC NETWORK
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#0d1f3c]">Integrated Supplier Network &amp; FPC Registry</h2>
                  <p className="text-xs text-slate-500 font-medium">Verified farm co-ops, packaging houses, and machinery OEM partners.</p>
                </div>
                <button
                  onClick={() => alert("Supplier addition modal: Connect new FPC or Packer")}
                  className="bg-[#06b6d4] text-white font-black text-xs uppercase px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Verified Supplier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map(sup => (
                  <div key={sup.id} className="bg-white border border-slate-100/90 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                          {sup.type}
                        </span>
                        <h3 className="font-black text-[#0d1f3c] text-base mt-2 leading-snug">{sup.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-amber-500 flex items-center gap-1">
                          ★ {sup.riskScore}
                        </div>
                        <div className="text-[9px] text-slate-400 font-bold">Audit Rating</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sup.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sup.products}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sup.contactPhone}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {sup.certifications.map((c, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                          ✓ {c}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 text-[10px] text-slate-500 font-bold flex justify-between">
                      <span>Orders Fulfilled: <strong className="text-[#0d1f3c]">{sup.fulfilledOrders}</strong></span>
                      <span>Rejection Rate: <strong className="text-emerald-600">{sup.qualityRejectionRate}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: MARKET RATES & FREIGHT P&L
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "ticker" && (
            <div className="space-y-8">
              
              {/* APMC Dynamic Pricing Ticker */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#0d1f3c]">Live Mandi Market Price Ticker (APMC)</h2>
                    <p className="text-xs text-slate-500 font-medium">Real-time commodity rates vs export historical pricing.</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Live Rates Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {marketTicker.map(tick => (
                    <div key={tick.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-2">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider truncate">{tick.commodity}</div>
                      <div className="text-xl font-black text-[#0d1f3c]">₹{tick.currentRateINRPerKg} <span className="text-xs font-semibold text-slate-500">/ kg</span></div>
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span className={tick.weeklyTrendPercent >= 0 ? "text-emerald-600" : "text-red-500"}>
                          {tick.weeklyTrendPercent >= 0 ? `+${tick.weeklyTrendPercent}%` : `${tick.weeklyTrendPercent}%`}
                        </span>
                        <span className="text-slate-400 text-[10px]">${tick.historicalExportRateUSDPerKg}/kg USD</span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium pt-1 border-t border-slate-50">{tick.mandiLocation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive CIF P&L Profitability Calculator */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 bg-cyan-50 text-[#06b6d4] rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0d1f3c]">Real-Time Trade Profitability (P&amp;L) Calculator</h3>
                    <p className="text-xs text-slate-500 font-medium">Calculate net margins before dispatching container quotes.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase">Sourcing Cost ($/kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={calcSourcingCost}
                      onChange={(e) => setCalcSourcingCost(parseFloat(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase">Export Selling Price ($/kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={calcSellingPrice}
                      onChange={(e) => setCalcSellingPrice(parseFloat(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase">Ocean Freight Quote ($)</label>
                    <input
                      type="number"
                      value={calcFreightUSD}
                      onChange={(e) => setCalcFreightUSD(parseFloat(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase">Volume (Metric Tons)</label>
                    <input
                      type="number"
                      value={calcQuantityTons}
                      onChange={(e) => setCalcQuantityTons(parseFloat(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Sourcing</div>
                    <div className="text-lg font-black mt-1">${totalSourcingUSD.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Revenue (FOB/CIF)</div>
                    <div className="text-lg font-black text-[#06b6d4] mt-1">${totalRevenueUSD.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Net Estimated Profit</div>
                    <div className={`text-lg font-black mt-1 ${grossMarginUSD >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      ${grossMarginUSD.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Net Margin %</div>
                    <div className={`text-xl font-black mt-1 ${marginPercent >= 15 ? "text-emerald-400" : "text-amber-400"}`}>
                      {marginPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Freight Forwarders Matrix */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0d1f3c]">Freight Forwarder Ocean &amp; Air Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freightRates.map(ff => (
                    <div key={ff.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{ff.mode}</span>
                        <h4 className="font-black text-[#0d1f3c] text-sm mt-1">{ff.companyName}</h4>
                        <p className="text-xs text-slate-500 font-medium">{ff.route}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-black text-[#06b6d4]">
                          {ff.ratePer20ftUSD ? `$${ff.ratePer20ftUSD} / 20ft` : `$${ff.ratePerKgAirUSD} / kg`}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold">{ff.transitDays} Days Transit</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 4: MARKET INTELLIGENCE & DEMAND HEATMAP
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              
              {/* Destination Port Demand Heatmap */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-[#0d1f3c]">Global Destination Port Demand Heatmap</h2>
                  <p className="text-xs text-slate-500 font-medium">Inquiry volume breakdown by foreign import destination.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { port: "Jebel Ali (Dubai, UAE)", count: 28, share: "45%", trend: "+12% Surge", color: "bg-[#06b6d4]" },
                    { port: "Rotterdam (Netherlands / EU)", count: 18, share: "29%", trend: "+8% High", color: "bg-emerald-500" },
                    { port: "Port Klang (Malaysia / SE Asia)", count: 10, share: "16%", trend: "Stable", color: "bg-amber-500" },
                    { port: "Sydney / Melbourne (Australia)", count: 6, share: "10%", trend: "+15% Growing", color: "bg-indigo-500" },
                  ].map((p, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                      <div className="flex items-center justify-between text-xs font-black text-slate-700">
                        <span>{p.port}</span>
                        <span className="text-[10px] text-emerald-600 font-bold">{p.trend}</span>
                      </div>
                      <div className="text-2xl font-black text-[#0d1f3c]">{p.count} <span className="text-xs text-slate-400 font-semibold">RFQs</span></div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${p.color}`} style={{ width: p.share }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonal RFQ Cycle Matrix */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-[#0d1f3c]">Seasonal Product Demand Window Matrix</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                  <div className="border border-slate-100 p-4 rounded-xl bg-cyan-50/30">
                    <div className="font-black text-[#0d1f3c]">Alphonso Mango</div>
                    <div className="text-[#06b6d4] font-bold text-[10px]">Peak: March ➔ June</div>
                    <p className="text-slate-500 text-[11px] mt-1">High air freight demand to Gulf &amp; UK.</p>
                  </div>

                  <div className="border border-slate-100 p-4 rounded-xl bg-amber-50/30">
                    <div className="font-black text-[#0d1f3c]">Indian Red Onion</div>
                    <div className="text-amber-600 font-bold text-[10px]">Peak: Sept ➔ February</div>
                    <p className="text-slate-500 text-[11px] mt-1">High volume reefer container shipments to UAE &amp; Malaysia.</p>
                  </div>

                  <div className="border border-slate-100 p-4 rounded-xl bg-emerald-50/30">
                    <div className="font-black text-[#0d1f3c]">Table Grapes</div>
                    <div className="text-emerald-600 font-bold text-[10px]">Peak: Jan ➔ April</div>
                    <p className="text-slate-500 text-[11px] mt-1">Strict MRL testing required for Rotterdam port.</p>
                  </div>

                  <div className="border border-slate-100 p-4 rounded-xl bg-purple-50/30">
                    <div className="font-black text-[#0d1f3c]">Cavendish Banana</div>
                    <div className="text-purple-600 font-bold text-[10px]">Peak: Year-Round (Stable)</div>
                    <p className="text-slate-500 text-[11px] mt-1">Constant weekly shipments to Middle East.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 5: TRADE COMPLIANCE & EXPORT DOCS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "compliance" && (
            <div className="space-y-8">
              
              {/* Phytosanitary & MRL Monitor */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-[#0d1f3c]">Trade Barriers &amp; Phytosanitary Compliance Monitor</h2>
                  <p className="text-xs text-slate-500 font-medium">Destination country maximum residue limits (MRL) &amp; mandatory certifications.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tradeBarriers.map(tb => (
                    <div key={tb.id} className="border border-slate-100 rounded-2xl p-6 space-y-3 bg-slate-50/40">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#0d1f3c] text-sm">{tb.countryRegion}</span>
                        <span className="bg-red-50 text-red-600 text-[9px] font-black px-2.5 py-1 rounded-full border border-red-100">
                          {tb.riskLevel}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#06b6d4]">{tb.commodity}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{tb.keyRequirement}</p>
                      <div className="text-[10px] text-slate-500 font-bold bg-white p-2 rounded-lg border border-slate-100">
                        MRL Limit: <span className="text-slate-800">{tb.mrlLimitPPM}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {tb.requiredCertificates.map((cert, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-Export Document Checklist */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#0d1f3c]">Standard Pre-Export Document Checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs font-bold">
                  {[
                    "1. Bill of Lading (B/L)",
                    "2. Phytosanitary Certificate",
                    "3. Certificate of Origin (COO)",
                    "4. SGS Inspection Report",
                    "5. FSSAI Health Clearance"
                  ].map((doc, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
                      <span>{doc}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ── DETAILED LEAD DRAWER MODAL ── */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl h-full max-h-[92vh] rounded-3xl shadow-2xl p-8 overflow-y-auto space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#06b6d4] tracking-widest">{selectedLead.id}</span>
                <h2 className="text-xl font-black text-[#0d1f3c]">{selectedLead.fullName}</h2>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl font-semibold">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Company</div>
                  <div className="text-slate-800 font-bold">{selectedLead.companyName}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Buyer Persona</div>
                  <div className="text-[#06b6d4] font-bold">{selectedLead.buyerPersona || "Importer"}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">WhatsApp Contact</div>
                  <div className="text-slate-800 font-bold">{selectedLead.whatsappNumber}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Email</div>
                  <div className="text-slate-800 font-bold">{selectedLead.email}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-[#0d1f3c] text-sm">Product Specifications</h4>
                <div className="p-4 border border-slate-100 rounded-2xl bg-white space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Product:</span>
                    <span className="font-black text-[#0d1f3c]">{getProductName(selectedLead.product || selectedLead.productId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Target Port:</span>
                    <span className="font-bold text-slate-700">{selectedLead.destinationPort || "N/A"}</span>
                  </div>
                  <div className="text-slate-500 font-bold pt-2 border-t border-slate-50">Notes / Requirements:</div>
                  <p className="text-slate-700 leading-relaxed font-semibold">{selectedLead.qualitySpecs || "Standard Export Specification"}</p>
                </div>
              </div>

              {/* Quick P&L Estimator in Lead Drawer */}
              <div className="p-5 bg-gradient-to-br from-slate-900 to-[#0d1f3c] text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs uppercase tracking-wider text-[#06b6d4]">P&amp;L Margin Estimator</span>
                  <span className="text-[10px] text-emerald-400 font-bold">~18.5% Net Margin</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <div className="text-slate-400">Sourcing Cost</div>
                    <div className="font-bold text-white">${selectedLead.sourcingCostPerUnit || 0.32}/kg</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg">
                    <div className="text-slate-400">Quoted Selling</div>
                    <div className="font-bold text-[#06b6d4]">${selectedLead.quotedPricePerUnit || 0.48}/kg</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg">
                    <div className="text-slate-400">Est. Freight</div>
                    <div className="font-bold text-emerald-400">${selectedLead.freightCostUSD || 1450}</div>
                  </div>
                </div>
              </div>

              {/* Change Status Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="text-slate-500 font-black uppercase text-[10px]">Update Lead Status:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateLeadStatus(selectedLead.id, "Pending")}
                    className="px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-xl text-xs hover:bg-amber-200 cursor-pointer"
                  >
                    Set Pending
                  </button>
                  <button
                    onClick={() => updateLeadStatus(selectedLead.id, "Quoted")}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-200 cursor-pointer"
                  >
                    Mark Quoted
                  </button>
                  <button
                    onClick={() => updateLeadStatus(selectedLead.id, "Closed")}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-300 cursor-pointer"
                  >
                    Close Deal
                  </button>
                  <button
                    onClick={() => {
                      setChurnModalLead(selectedLead);
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-xs hover:bg-red-200 cursor-pointer"
                  >
                    Mark Failed / Churn
                  </button>
                </div>
              </div>

              {/* Blacklist toggle button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => toggleCustomerBlacklist(selectedLead.email)}
                  className="w-full py-3 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Ban className="w-4 h-4" /> Toggle Customer Risk / Blacklist Flag
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── CHURN REASON MODAL ── */}
      {churnModalLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-[#0d1f3c]">Lead Churn / Failure Reason</h3>
            <p className="text-xs text-slate-500 font-medium">Why was this RFQ deal lost or not converted?</p>

            <select
              value={selectedFailureReason}
              onChange={(e) => setSelectedFailureReason(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700"
            >
              <option value="Price Too High">Price Too High / Competitor Won</option>
              <option value="Quality Specs Mismatch">Quality Specs Mismatch</option>
              <option value="Sample Rejected">Sample Rejected at Inspection</option>
              <option value="No Response / Ghosted">No Response from Buyer</option>
              <option value="Logistics Delay">Logistics / Freight Cost Unviable</option>
            </select>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setChurnModalLead(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateLeadStatus(churnModalLead.id, "Failed", selectedFailureReason);
                  setChurnModalLead(null);
                }}
                className="px-5 py-2 bg-red-600 text-white font-black text-xs rounded-xl shadow-md"
              >
                Confirm Failure Reason
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
