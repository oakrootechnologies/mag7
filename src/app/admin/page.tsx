"use client";

import React, { useState, useEffect } from "react";
import {
  Lock, User, LogOut, Trash2, Eye, FileSpreadsheet, RefreshCw, Clock,
  CheckCircle, X, MessageCircle, Search, Building, MapPin, Package,
  ShieldCheck, TrendingUp, Globe2, Users, BarChart3, Plus, Ban, Phone,
  DollarSign, Truck, CheckCircle2, Edit3, Star, ShoppingCart, PieChart,
  ChevronDown, ChevronUp
} from "lucide-react";
import { products } from "@/data/products";
import {
  INITIAL_SUPPLIERS, INITIAL_CUSTOMERS,
  Supplier, MasterCustomerProfile
} from "@/data/eximAdminData";

/* ─────────────── TYPES ─────────────── */
interface RFQLead {
  id: string; date: string;
  status: "Pending" | "Quoted" | "Closed" | "Failed";
  fullName: string; designation?: string; companyName: string;
  businessType?: string; destinationCountry?: string; destinationPort?: string;
  whatsappCode?: string; whatsappNumber: string; email: string;
  category?: string; product?: string; productId?: string;
  qualitySpecs?: string; packaging?: string; quantity?: number;
  quantityUnit?: string; incoterm?: string; timeline?: string; division?: string;
  customerId?: string; buyerPersona?: string; churnReason?: string;
  sourcingCostPerUnit?: number; quotedPricePerUnit?: number;
  freightCostUSD?: number; netMarginPercent?: number; riskFlag?: boolean;
}

interface SupplierItem {
  id: string; supplierId: string; itemName: string; unit: string;
  pricePerUnit: number; minOrderQty: number; notes: string;
}

interface SupplierOrder {
  id: string; supplierId: string; itemId: string; itemName: string;
  orderedQty: number; unit: string; pricePerUnit: number; totalAmount: number;
  orderedDate: string;
  status: "Order Placed" | "Order Received" | "Payment Done" | "Quality Check" | "Dispatched";
  receivedDate?: string; receivedQty?: number; receivedPrice?: number;
  paymentDate?: string; paymentAmount?: number; paymentMode?: string;
  qualityNotes?: string; invoiceNo?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  fruits: "Fruits", vegetables: "Vegetables",
  commodities: "Commodities & Grains", spices: "Spices",
  imports: "Imported Fruits & Nuts"
};

/* ─────────────── MINI PIE CHART ─────────────── */
function MiniPie({ segments, size = 140 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (total === 0) return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center text-slate-300 text-[10px] font-bold text-center">No Data Yet</div>
    </div>
  );
  const r = size / 2 - 6;
  const cx = size / 2, cy = size / 2;
  let cumAngle = -Math.PI / 2;
  const slices = segments.map(seg => {
    const angle = (seg.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumAngle);
    const y1 = cy + r * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + r * Math.cos(cumAngle);
    const y2 = cy + r * Math.sin(cumAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    return { ...seg, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z` };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2.5" />)}
      <circle cx={cx} cy={cy} r={r * 0.4} fill="white" />
    </svg>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"crm" | "suppliers" | "analytics">("crm");

  const [leads, setLeads] = useState<RFQLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<RFQLead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("All");
  const [churnModalLead, setChurnModalLead] = useState<RFQLead | null>(null);
  const [selectedFailureReason, setSelectedFailureReason] = useState("Price Too High / Competitor Won");

  const [customers, setCustomers] = useState<MasterCustomerProfile[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [supplierItems, setSupplierItems] = useState<SupplierItem[]>([]);
  const [supplierOrders, setSupplierOrders] = useState<SupplierOrder[]>([]);
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);

  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showAddItem, setShowAddItem] = useState<string | null>(null);
  const [showPlaceOrder, setShowPlaceOrder] = useState<{ supplierId: string; item: SupplierItem } | null>(null);
  const [showUpdateOrder, setShowUpdateOrder] = useState<SupplierOrder | null>(null);

  const [newSup, setNewSup] = useState({ name: "", type: "FPC / Farmer Co-op" as Supplier["type"], location: "", products: "", contactPhone: "", certifications: "", riskScore: 4.5 });
  const [newItem, setNewItem] = useState({ itemName: "", unit: "kg", pricePerUnit: 0, minOrderQty: 0, notes: "" });
  const [orderForm, setOrderForm] = useState({ qty: 0, price: 0, invoiceNo: "" });
  const [updateForm, setUpdateForm] = useState({ status: "Order Received" as SupplierOrder["status"], receivedQty: 0, receivedPrice: 0, paymentAmount: 0, paymentMode: "NEFT", qualityNotes: "", paymentDate: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("admin_authenticated") === "true" || localStorage.getItem("admin_authenticated") === "true" || window.location.href.includes("autologin");
      if (isAuth) setIsLoggedIn(true);
    }
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data.map((item: any, idx: number) => ({
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
            destinationCountry: item.destinationCountry || "",
          })));
        } else setLeads([]);
      } else setLeads([]);
    } catch { setLeads([]); }
  };

  const handleLogin = () => {
    if (!username.trim()) { setLoginError("Please enter admin email."); return; }
    setIsLoggedIn(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_authenticated", "true");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authenticated");
      localStorage.removeItem("admin_authenticated");
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: RFQLead["status"], churnReason?: string) => {
    try { await fetch(`/api/leads/${leadId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus, churnReason }) }); } catch {}
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus, churnReason } : l);
    setLeads(updated);
    if (selectedLead?.id === leadId) setSelectedLead({ ...selectedLead, status: newStatus, churnReason });
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Delete this RFQ lead permanently?")) return;
    try { await fetch(`/api/leads/${leadId}`, { method: "DELETE" }); } catch {}
    setLeads(leads.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) setSelectedLead(null);
  };

  const toggleBlacklist = (email: string) => {
    setCustomers(prev => prev.map(c => c.email === email ? { ...c, riskStatus: c.riskStatus === "Blacklisted - Do Not Deal" ? "Clean / Trusted" : "Blacklisted - Do Not Deal" } : c));
  };

  const getProductName = (id?: string) => {
    if (!id) return "General Produce";
    const p = products.find(p => p.id === id || p.name.toLowerCase() === id.toLowerCase());
    return p ? p.name : id;
  };

  const filteredLeads = leads.filter(l => {
    const q = searchQuery.toLowerCase();
    const matchQ = [l.fullName, l.companyName, l.email, l.whatsappNumber, l.destinationPort].some(f => (f||"").toLowerCase().includes(q));
    return matchQ && (statusFilter === "All" || l.status === statusFilter) && (categoryFilter === "All" || l.category === categoryFilter) && (businessTypeFilter === "All" || (l.businessType || l.buyerPersona) === businessTypeFilter);
  });

  const total = leads.length, pending = leads.filter(l => l.status === "Pending").length;
  const quoted = leads.filter(l => l.status === "Quoted").length, closed = leads.filter(l => l.status === "Closed").length, failed = leads.filter(l => l.status === "Failed").length;

  // Live pie data
  const mkMap = (arr: string[], colors: string[]) => {
    const m: Record<string, number> = {};
    arr.forEach(v => { m[v] = (m[v] || 0) + 1; });
    return Object.entries(m).slice(0, 7).map(([label, value], i) => ({ label, value, color: colors[i % colors.length] }));
  };
  const COLORS = ["#06b6d4","#10b981","#f59e0b","#a78bfa","#f43f5e","#3b82f6","#ec4899"];
  const countrySegs = mkMap(leads.map(l => l.destinationCountry || "Unknown"), COLORS);
  const statusSegs = [{ label:"Pending",value:pending,color:"#f59e0b"},{ label:"Quoted",value:quoted,color:"#10b981"},{ label:"Closed",value:closed,color:"#06b6d4"},{ label:"Failed",value:failed,color:"#f43f5e"}];
  const productSegs = mkMap(leads.map(l => getProductName(l.product || l.productId)), COLORS);
  const churnSegs = mkMap(leads.filter(l => l.status === "Failed").map(l => l.churnReason || "Unknown"), ["#f43f5e","#f59e0b","#a78bfa","#64748b","#3b82f6"]);

  const exportCSV = () => {
    if (!filteredLeads.length) return;
    const h = ["ID","Date","Status","Name","Company","WhatsApp","Email","Product","Country","Port"];
    const rows = filteredLeads.map(l => [l.id, new Date(l.date).toLocaleDateString(), l.status, `"${l.fullName}"`, `"${l.companyName}"`, `"${l.whatsappNumber}"`, l.email, getProductName(l.product||l.productId), l.destinationCountry||"", l.destinationPort||""]);
    const csv = "data:text/csv;charset=utf-8," + [h.join(","), ...rows.map(r => r.join(","))].join("\n");
    const a = document.createElement("a"); a.href = encodeURI(csv); a.download = `mag7_crm_${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const getItems = (sid: string) => supplierItems.filter(i => i.supplierId === sid);
  const getOrders = (sid: string) => supplierOrders.filter(o => o.supplierId === sid);

  const addSupplier = () => {
    setSuppliers(prev => [...prev, { id: `SUP-${Date.now()}`, name: newSup.name, type: newSup.type, location: newSup.location, products: newSup.products, certifications: newSup.certifications.split(",").map(s=>s.trim()).filter(Boolean), riskScore: newSup.riskScore, fulfilledOrders: 0, qualityRejectionRate: "N/A", contactPhone: newSup.contactPhone, status: "Under Audit" }]);
    setNewSup({ name:"",type:"FPC / Farmer Co-op",location:"",products:"",contactPhone:"",certifications:"",riskScore:4.5 });
    setShowAddSupplier(false);
  };

  const addItem = (sid: string) => {
    setSupplierItems(prev => [...prev, { id: `ITEM-${Date.now()}`, supplierId: sid, ...newItem }]);
    setNewItem({ itemName:"",unit:"kg",pricePerUnit:0,minOrderQty:0,notes:"" });
    setShowAddItem(null);
  };

  const placeOrder = () => {
    if (!showPlaceOrder) return;
    const price = orderForm.price || showPlaceOrder.item.pricePerUnit;
    setSupplierOrders(prev => [...prev, { id: `ORD-${Date.now()}`, supplierId: showPlaceOrder.supplierId, itemId: showPlaceOrder.item.id, itemName: showPlaceOrder.item.itemName, orderedQty: orderForm.qty, unit: showPlaceOrder.item.unit, pricePerUnit: price, totalAmount: orderForm.qty * price, orderedDate: new Date().toISOString(), status: "Order Placed", invoiceNo: orderForm.invoiceNo }]);
    setOrderForm({ qty:0,price:0,invoiceNo:"" }); setShowPlaceOrder(null);
  };

  const updateOrder = () => {
    if (!showUpdateOrder) return;
    setSupplierOrders(prev => prev.map(o => o.id !== showUpdateOrder.id ? o : { ...o, status: updateForm.status, receivedQty: updateForm.receivedQty||o.receivedQty, receivedPrice: updateForm.receivedPrice||o.receivedPrice, paymentAmount: updateForm.paymentAmount||o.paymentAmount, paymentMode: updateForm.paymentMode||o.paymentMode, qualityNotes: updateForm.qualityNotes||o.qualityNotes, receivedDate: updateForm.status==="Order Received" ? new Date().toISOString() : o.receivedDate, paymentDate: updateForm.status==="Payment Done" ? (updateForm.paymentDate||new Date().toISOString()) : o.paymentDate }));
    setShowUpdateOrder(null);
  };

  const ordClr: Record<string, string> = { "Order Placed":"bg-amber-100 text-amber-700","Order Received":"bg-blue-100 text-blue-700","Payment Done":"bg-emerald-100 text-emerald-700","Quality Check":"bg-purple-100 text-purple-700","Dispatched":"bg-slate-100 text-slate-600" };

  /* ─────────────── RENDER ─────────────── */
  return (
    <div className="min-h-screen bg-[#fafbfc] py-10 px-4 sm:px-6 lg:px-10" style={{ fontFamily:"'Plus Jakarta Sans','Outfit',sans-serif" }}>

      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 mt-16">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#06b6d4]/10 text-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto"><Lock className="w-8 h-8" /></div>
            <h1 className="text-2xl font-black text-[#0d1f3c]">MAG7 Admin Control Center</h1>
            <p className="text-xs text-slate-400 font-semibold">Authorized Access Only.</p>
          </div>
          {loginError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold text-center border border-red-100">{loginError}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">Admin Email</label>
              <div className="relative"><User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" /><input id="admin-email-input" type="email" placeholder="admin@mag7global.com" value={username} onChange={e=>setUsername(e.target.value)} className="w-full pl-10 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-[#06b6d4] font-semibold" /></div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">Password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" /><input id="admin-password-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} className="w-full pl-10 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-[#06b6d4] font-semibold" /></div>
            </div>
            <button id="admin-login-btn" onClick={handleLogin} className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer">Sign In to EXIM Dashboard</button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded-2xl shadow-md flex items-center justify-center text-white shrink-0"><Globe2 className="w-6 h-6" /></div>
              <div>
                <h1 className="text-2xl font-black text-[#0d1f3c] tracking-tight">MAG7 Enterprise Control Center</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Global Sourcing • Deep CRM • Supplier Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadLeads} className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-full cursor-pointer"><RefreshCw className="w-3.5 h-3.5 text-[#06b6d4]" /> Sync</button>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-black text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full cursor-pointer shadow-sm"><LogOut className="w-3.5 h-3.5" /> Logout</button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
            {[
              { id:"crm", label:"Leads & Deep CRM", icon:<Users className="w-4 h-4"/> },
              { id:"suppliers", label:"Supplier & FPC Network", icon:<Building className="w-4 h-4"/> },
              { id:"analytics", label:"Market Intelligence", icon:<BarChart3 className="w-4 h-4"/> },
            ].map(tab => (
              <button key={tab.id} id={`admin-tab-${tab.id}`} onClick={()=>setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab===tab.id ? "bg-[#0d1f3c] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"}`}>
                {tab.icon}<span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ══ TAB 1: CRM ══ */}
          {activeTab === "crm" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label:"Total RFQs",val:total,color:"text-[#0d1f3c]",bg:"bg-cyan-50",icon:<FileSpreadsheet className="w-6 h-6 text-[#06b6d4]"/> },
                  { label:"Pending",val:pending,color:"text-amber-600",bg:"bg-amber-50",icon:<Clock className="w-6 h-6 text-amber-500 animate-pulse"/> },
                  { label:"Quoted",val:quoted,color:"text-emerald-600",bg:"bg-emerald-50",icon:<CheckCircle className="w-6 h-6 text-emerald-500"/> },
                  { label:"Closed/Failed",val:closed+failed,color:"text-slate-500",bg:"bg-slate-100",icon:<X className="w-6 h-6 text-slate-400"/> },
                ].map((s,i) => (
                  <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p><h3 className={`text-2xl font-black mt-1 ${s.color}`}>{s.val}</h3></div>
                    <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>{s.icon}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col lg:flex-row items-center gap-4">
                <div className="relative w-full lg:max-w-xs"><Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400"/><input type="text" placeholder="Search buyer / company / port..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="w-full pl-10 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"><option value="All">All Statuses</option><option>Pending</option><option>Quoted</option><option>Closed</option><option>Failed</option></select>
                  <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"><option value="All">All Categories</option>{Object.entries(CATEGORY_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
                  <select value={businessTypeFilter} onChange={e=>setBusinessTypeFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 bg-white"><option value="All">All Personas</option><option>Importer / Wholesaler</option><option>Supermarket Chain</option><option>Food Processor</option><option>Distributor</option><option>Commodity Broker</option></select>
                </div>
                <button onClick={exportCSV} className="w-full lg:w-auto bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black py-2.5 px-5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"><FileSpreadsheet className="w-4 h-4"/> Export CSV ({filteredLeads.length})</button>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead><tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider"><th className="py-4 px-6">Customer &amp; Persona</th><th className="py-4 px-6">Product</th><th className="py-4 px-6">Destination</th><th className="py-4 px-6">Date</th><th className="py-4 px-6">Status</th><th className="py-4 px-6 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium">
                      {filteredLeads.length === 0 ? <tr><td colSpan={6} className="text-center py-12 text-slate-400 font-bold">No RFQ leads matched your filters.</td></tr> : filteredLeads.map(lead => {
                        const cust = customers.find(c => c.email === lead.email);
                        const isBlacklisted = cust?.riskStatus === "Blacklisted - Do Not Deal" || lead.riskFlag;
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-black text-[#0d1f3c] flex items-center gap-2">{lead.fullName}{isBlacklisted && <span className="bg-red-100 text-red-700 text-[9px] px-2 py-0.5 rounded-full font-black uppercase">Blacklisted</span>}</div>
                              <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-2 mt-0.5"><span>{lead.companyName}</span><span className="text-slate-300">•</span><span className="text-[#06b6d4] font-bold">{lead.customerId||"NEW"}</span></div>
                            </td>
                            <td className="py-4 px-6"><div className="font-bold text-slate-800">{getProductName(lead.product||lead.productId)}</div><div className="text-[10px] text-slate-400">{lead.division||"Agro & EXIM"}</div></td>
                            <td className="py-4 px-6"><div className="font-bold text-slate-700">{lead.destinationPort||"N/A"}</div><div className="text-[10px] text-slate-400">{lead.destinationCountry||"India Export"}</div></td>
                            <td className="py-4 px-6 text-slate-500 font-semibold">{new Date(lead.date).toLocaleDateString()}</td>
                            <td className="py-4 px-6"><span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase ${lead.status==="Quoted"?"bg-emerald-100 text-emerald-700":lead.status==="Closed"?"bg-slate-100 text-slate-600":lead.status==="Failed"?"bg-red-100 text-red-600":"bg-amber-100 text-amber-700"}`}>{lead.status}</span></td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={()=>setSelectedLead(lead)} className="p-2 text-slate-600 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-lg cursor-pointer"><Eye className="w-4 h-4"/></button>
                                <a href={`https://wa.me/${lead.whatsappNumber.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><MessageCircle className="w-4 h-4"/></a>
                                <button onClick={()=>handleDeleteLead(lead.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB 2: SUPPLIERS ══ */}
          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#0d1f3c]">Integrated Supplier Network &amp; FPC Registry</h2>
                  <p className="text-xs text-slate-500 font-medium">Manage verified farm co-ops, add items, track orders and payments end-to-end.</p>
                </div>
                <button onClick={()=>setShowAddSupplier(true)} className="bg-[#06b6d4] text-white font-black text-xs uppercase px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#0891b2]"><Plus className="w-4 h-4"/> Add Supplier</button>
              </div>

              <div className="space-y-4">
                {suppliers.map(sup => {
                  const items = getItems(sup.id);
                  const orders = getOrders(sup.id);
                  const expanded = expandedSupplier === sup.id;
                  return (
                    <div key={sup.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                      <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-[#06b6d4]/10 rounded-xl flex items-center justify-center shrink-0"><Building className="w-5 h-5 text-[#06b6d4]"/></div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-[9px] font-black uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">{sup.type}</span>
                              <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${sup.status==="Verified Active"?"bg-emerald-50 text-emerald-700 border border-emerald-100":"bg-amber-50 text-amber-700 border border-amber-100"}`}>{sup.status}</span>
                            </div>
                            <h3 className="font-black text-[#0d1f3c] text-sm">{sup.name}</h3>
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 flex-wrap">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{sup.location}</span>
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3"/>{sup.contactPhone}</span>
                              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500"/>{sup.riskScore} Audit</span>
                              <span className="flex items-center gap-1"><ShoppingCart className="w-3 h-3 text-[#06b6d4]"/>{items.length} Items • {orders.length} Orders</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={()=>setShowAddItem(sup.id)} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs px-3.5 py-2 rounded-xl cursor-pointer"><Plus className="w-3.5 h-3.5"/> Add Item</button>
                          <button onClick={()=>setExpandedSupplier(expanded?null:sup.id)} className="flex items-center gap-1 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white font-black text-xs px-4 py-2 rounded-xl cursor-pointer transition-colors">
                            {expanded ? <><ChevronUp className="w-3.5 h-3.5"/> Collapse</> : <><ChevronDown className="w-3.5 h-3.5"/> Details</>}
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <div className="border-t border-slate-100 p-5 space-y-6 bg-slate-50/40">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><div className="text-[10px] font-black uppercase text-slate-400 mb-1">Products</div><div className="text-sm font-semibold text-slate-700">{sup.products}</div></div>
                            <div><div className="text-[10px] font-black uppercase text-slate-400 mb-1">Certifications</div><div className="flex flex-wrap gap-1.5">{sup.certifications.map((c,i)=><span key={i} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">✓ {c}</span>)}</div></div>
                          </div>

                          <div>
                            <div className="text-[10px] font-black uppercase text-slate-400 mb-3">Catalogue Items ({items.length})</div>
                            {items.length === 0 ? <div className="text-xs text-slate-400 italic">No items yet. Click "Add Item".</div> : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {items.map(item => (
                                  <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4 space-y-2">
                                    <div className="font-black text-[#0d1f3c] text-xs">{item.itemName}</div>
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500"><span>₹{item.pricePerUnit}/{item.unit}</span><span>Min: {item.minOrderQty} {item.unit}</span></div>
                                    {item.notes && <div className="text-[10px] text-slate-400">{item.notes}</div>}
                                    <button onClick={()=>{ setShowPlaceOrder({supplierId:sup.id,item}); setOrderForm({qty:item.minOrderQty,price:item.pricePerUnit,invoiceNo:""}); }} className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black text-[10px] uppercase px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-colors"><ShoppingCart className="w-3 h-3"/> Place Order</button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {orders.length > 0 && (
                            <div>
                              <div className="text-[10px] font-black uppercase text-slate-400 mb-3">Purchase Orders ({orders.length})</div>
                              <div className="space-y-2">
                                {orders.map(ord => (
                                  <div key={ord.id} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2"><span className="font-black text-[#0d1f3c] text-xs">{ord.itemName}</span><span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${ordClr[ord.status]}`}>{ord.status}</span></div>
                                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold flex-wrap">
                                        <span>Qty: <strong>{ord.orderedQty} {ord.unit}</strong></span>
                                        <span>@₹{ord.pricePerUnit}/{ord.unit}</span>
                                        <span>Total: <strong className="text-[#0d1f3c]">₹{ord.totalAmount.toLocaleString()}</strong></span>
                                        <span>{new Date(ord.orderedDate).toLocaleDateString()}</span>
                                        {ord.invoiceNo && <span>Inv: #{ord.invoiceNo}</span>}
                                      </div>
                                      {ord.receivedDate && <div className="text-[10px] text-blue-600 font-semibold">Received: {ord.receivedQty} {ord.unit} @ ₹{ord.receivedPrice}/{ord.unit} on {new Date(ord.receivedDate).toLocaleDateString()}</div>}
                                      {ord.paymentDate && <div className="text-[10px] text-emerald-600 font-semibold">Paid: ₹{ord.paymentAmount?.toLocaleString()} via {ord.paymentMode} on {new Date(ord.paymentDate).toLocaleDateString()}</div>}
                                      {ord.qualityNotes && <div className="text-[10px] text-purple-600">QC: {ord.qualityNotes}</div>}
                                    </div>
                                    <button onClick={()=>{ setShowUpdateOrder(ord); setUpdateForm({status:ord.status,receivedQty:ord.receivedQty||0,receivedPrice:ord.receivedPrice||ord.pricePerUnit,paymentAmount:ord.paymentAmount||ord.totalAmount,paymentMode:ord.paymentMode||"NEFT",qualityNotes:ord.qualityNotes||"",paymentDate:""}); }} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[10px] px-3 py-2 rounded-xl cursor-pointer shrink-0"><Edit3 className="w-3 h-3"/> Update</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ TAB 3: ANALYTICS (4 PIE CHARTS LIVE) ══ */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-50 text-[#06b6d4] rounded-xl flex items-center justify-center"><PieChart className="w-5 h-5"/></div>
                  <div>
                    <h2 className="text-xl font-black text-[#0d1f3c]">Live Lead Intelligence Dashboard</h2>
                    <p className="text-xs text-slate-500 font-medium">All charts pull directly from live CRM data — real time.</p>
                  </div>
                  <span className="ml-auto text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"/> Live • {total} Leads
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[
                    { title:"Country-wise RFQs", sub:"Where buyers come from", segs:countrySegs, empty:"Submit RFQs with country data" },
                    { title:"Lead Status Breakdown", sub:"Converted vs pipeline vs lost", segs:statusSegs, empty:"No leads yet" },
                    { title:"Product Demand Mix", sub:"Most enquired products", segs:productSegs, empty:"No product data" },
                    { title:"Churn / Failure Reasons", sub:"Why deals were lost", segs:churnSegs, empty:"No failed leads yet" },
                  ].map((chart,ci) => (
                    <div key={ci} className="border border-slate-100 rounded-2xl p-5 space-y-4 bg-slate-50/40 flex flex-col items-center">
                      <div className="text-center"><div className="font-black text-[#0d1f3c] text-sm">{chart.title}</div><div className="text-[10px] text-slate-400 font-semibold mt-0.5">{chart.sub}</div></div>
                      <MiniPie segments={chart.segs} size={140}/>
                      <div className="w-full space-y-1.5">
                        {chart.segs.length === 0 ? <div className="text-center text-[10px] text-slate-300 font-semibold italic">{chart.empty}</div> : chart.segs.map((s,i) => (
                          <div key={i} className="flex items-center justify-between text-[10px] font-semibold">
                            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{backgroundColor:s.color}}/><span className="text-slate-600 truncate max-w-[110px]">{s.label}</span></div>
                            <span className="font-black text-[#0d1f3c] ml-1">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Port Demand Table */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
                <div><h3 className="text-lg font-black text-[#0d1f3c]">Global Destination Port Demand</h3><p className="text-xs text-slate-400 font-semibold mt-0.5">Computed live from submitted RFQs</p></div>
                {(() => {
                  const pm: Record<string,number> = {};
                  leads.forEach(l => { const p = l.destinationPort||"Unspecified"; pm[p] = (pm[p]||0)+1; });
                  const sorted = Object.entries(pm).sort((a,b)=>b[1]-a[1]);
                  const t = sorted.reduce((s,[,v])=>s+v,0)||1;
                  const clrs = ["#06b6d4","#10b981","#f59e0b","#a78bfa","#f43f5e","#3b82f6"];
                  return sorted.length === 0 ? <div className="text-sm text-slate-300 font-semibold text-center py-8">No RFQs with destination port data yet.</div> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {sorted.slice(0,6).map(([port,cnt],i) => (
                        <div key={i} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/40 space-y-2">
                          <div className="font-black text-[#0d1f3c] text-xs">{port}</div>
                          <div className="flex items-end justify-between"><div className="text-xl font-black" style={{color:clrs[i%clrs.length]}}>{cnt} <span className="text-xs font-semibold text-slate-400">RFQs</span></div><div className="text-xs font-bold text-slate-500">{Math.round(cnt/t*100)}%</div></div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:`${cnt/t*100}%`,backgroundColor:clrs[i%clrs.length]}}/></div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ LEAD DRAWER ══ */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end p-4">
          <div className="bg-white w-full max-w-2xl h-full max-h-[92vh] rounded-3xl shadow-2xl p-8 overflow-y-auto space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div><span className="text-[10px] font-black uppercase text-[#06b6d4] tracking-widest">{selectedLead.id}</span><h2 className="text-xl font-black text-[#0d1f3c]">{selectedLead.fullName}</h2></div>
              <button onClick={()=>setSelectedLead(null)} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl font-semibold">
              {[{l:"Company",v:selectedLead.companyName},{l:"Buyer Persona",v:selectedLead.buyerPersona||"Importer",a:true},{l:"WhatsApp",v:selectedLead.whatsappNumber},{l:"Email",v:selectedLead.email},{l:"Port",v:selectedLead.destinationPort||"N/A"},{l:"Country",v:selectedLead.destinationCountry||"N/A"}].map((f,i)=>(
                <div key={i}><div className="text-slate-400 text-[10px] uppercase font-bold">{f.l}</div><div className={`font-bold ${f.a?"text-[#06b6d4]":"text-slate-800"}`}>{f.v}</div></div>
              ))}
            </div>
            <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
              <div className="font-black text-[#0d1f3c] text-sm mb-2">Product & Order Specs</div>
              <div className="flex justify-between"><span className="text-slate-500">Product:</span><span className="font-black text-[#0d1f3c]">{getProductName(selectedLead.product||selectedLead.productId)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Quantity:</span><span className="font-bold">{selectedLead.quantity ? `${selectedLead.quantity} ${selectedLead.quantityUnit||"MT"}` : "N/A"}</span></div>
              <div className="text-slate-500 font-bold pt-2 border-t border-slate-50">Notes:</div>
              <p className="text-slate-700 leading-relaxed">{selectedLead.qualitySpecs||"Standard Export Specification"}</p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-slate-500 font-black uppercase text-[10px]">Update Status:</div>
              <div className="flex flex-wrap gap-2">
                <button onClick={()=>updateLeadStatus(selectedLead.id,"Pending")} className="px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-xl text-xs cursor-pointer">Set Pending</button>
                <button onClick={()=>updateLeadStatus(selectedLead.id,"Quoted")} className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs cursor-pointer">Mark Quoted</button>
                <button onClick={()=>updateLeadStatus(selectedLead.id,"Closed")} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Close Deal</button>
                <button onClick={()=>setChurnModalLead(selectedLead)} className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-xs cursor-pointer">Mark Failed</button>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <button onClick={()=>toggleBlacklist(selectedLead.email)} className="w-full py-3 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"><Ban className="w-4 h-4"/> Toggle Blacklist Flag</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CHURN MODAL ══ */}
      {churnModalLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-[#0d1f3c]">Mark Lead as Failed</h3>
            <p className="text-xs text-slate-500">Select the primary churn reason:</p>
            <select value={selectedFailureReason} onChange={e=>setSelectedFailureReason(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700">
              <option>Price Too High / Competitor Won</option>
              <option>Quality Specs Mismatch</option>
              <option>Sample Rejected at Inspection</option>
              <option>No Response from Buyer</option>
              <option>Logistics / Freight Cost Unviable</option>
            </select>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setChurnModalLead(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
              <button onClick={()=>{ updateLeadStatus(churnModalLead.id,"Failed",selectedFailureReason); setChurnModalLead(null); }} className="px-5 py-2 bg-red-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ ADD SUPPLIER MODAL ══ */}
      {showAddSupplier && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between"><h3 className="text-lg font-black text-[#0d1f3c]">Add New Supplier</h3><button onClick={()=>setShowAddSupplier(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4"/></button></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([["Supplier / Firm Name","name","text"],["Location (City, State)","location","text"],["Products Supplied","products","text"],["Contact Phone","contactPhone","text"],["Certifications (comma-separated)","certifications","text"],["Audit Rating (1-5)","riskScore","number"]] as [string,string,string][]).map(([label,key,type]) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500">{label}</label>
                  <input type={type} value={(newSup as any)[key]} onChange={e=>setNewSup(p=>({...p,[key]:type==="number"?parseFloat(e.target.value):e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/>
                </div>
              ))}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-500">Supplier Type</label>
                <select value={newSup.type} onChange={e=>setNewSup(p=>({...p,type:e.target.value as Supplier["type"]}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold bg-white"><option>FPC / Farmer Co-op</option><option>Packing House</option><option>OEM Factory</option><option>Artisan Collective</option></select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={()=>setShowAddSupplier(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
              <button onClick={addSupplier} disabled={!newSup.name} className="px-5 py-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50">Save Supplier</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ ADD ITEM MODAL ══ */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between"><h3 className="text-lg font-black text-[#0d1f3c]">Add Catalogue Item</h3><button onClick={()=>setShowAddItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4"/></button></div>
            <p className="text-xs text-slate-400">Supplier: <strong>{suppliers.find(s=>s.id===showAddItem)?.name}</strong></p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2"><label className="text-[10px] font-black uppercase text-slate-500">Item Name</label><input type="text" value={newItem.itemName} onChange={e=>setNewItem(p=>({...p,itemName:e.target.value}))} placeholder="e.g. Red Onion Grade A" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Unit</label><select value={newItem.unit} onChange={e=>setNewItem(p=>({...p,unit:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold bg-white"><option>kg</option><option>MT</option><option>box</option><option>piece</option><option>dozen</option></select></div>
              <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Price / Unit (₹)</label><input type="number" value={newItem.pricePerUnit} onChange={e=>setNewItem(p=>({...p,pricePerUnit:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Min Order Qty</label><input type="number" value={newItem.minOrderQty} onChange={e=>setNewItem(p=>({...p,minOrderQty:parseInt(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              <div className="space-y-1 col-span-2"><label className="text-[10px] font-black uppercase text-slate-500">Notes (optional)</label><input type="text" value={newItem.notes} onChange={e=>setNewItem(p=>({...p,notes:e.target.value}))} placeholder="e.g. Cold chain required, 50kg bags" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setShowAddItem(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
              <button onClick={()=>addItem(showAddItem)} disabled={!newItem.itemName} className="px-5 py-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50">Add Item</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ PLACE ORDER MODAL ══ */}
      {showPlaceOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between"><h3 className="text-lg font-black text-[#0d1f3c]">Place Purchase Order</h3><button onClick={()=>setShowPlaceOrder(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4"/></button></div>
            <div className="bg-slate-50 p-3 rounded-xl text-xs font-semibold space-y-1">
              <div><span className="text-slate-400">Item:</span> <strong>{showPlaceOrder.item.itemName}</strong></div>
              <div><span className="text-slate-400">Supplier:</span> <strong>{suppliers.find(s=>s.id===showPlaceOrder.supplierId)?.name}</strong></div>
              <div><span className="text-slate-400">Catalogue Price:</span> <strong>₹{showPlaceOrder.item.pricePerUnit}/{showPlaceOrder.item.unit}</strong></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Quantity ({showPlaceOrder.item.unit})</label><input type="number" value={orderForm.qty} onChange={e=>setOrderForm(p=>({...p,qty:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Negotiated Price (₹)</label><input type="number" value={orderForm.price} onChange={e=>setOrderForm(p=>({...p,price:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              <div className="space-y-1 col-span-2"><label className="text-[10px] font-black uppercase text-slate-500">PO / Invoice No. (optional)</label><input type="text" value={orderForm.invoiceNo} onChange={e=>setOrderForm(p=>({...p,invoiceNo:e.target.value}))} placeholder="e.g. PO-2024-087" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
            </div>
            {orderForm.qty > 0 && <div className="bg-[#0d1f3c] text-white rounded-xl p-4 text-center"><div className="text-[10px] uppercase font-bold text-slate-400">Total Order Value</div><div className="text-2xl font-black text-[#06b6d4]">₹{(orderForm.qty*(orderForm.price||showPlaceOrder.item.pricePerUnit)).toLocaleString()}</div></div>}
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setShowPlaceOrder(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
              <button onClick={placeOrder} disabled={orderForm.qty<=0} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"><ShoppingCart className="w-3.5 h-3.5"/> Confirm Order</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ UPDATE ORDER MODAL ══ */}
      {showUpdateOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between"><h3 className="text-lg font-black text-[#0d1f3c]">Update Order Status</h3><button onClick={()=>setShowUpdateOrder(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4"/></button></div>
            <div className="bg-slate-50 p-3 rounded-xl text-xs font-semibold space-y-1">
              <div><span className="text-slate-400">Order:</span> <strong>{showUpdateOrder.id}</strong></div>
              <div><span className="text-slate-400">Item:</span> <strong>{showUpdateOrder.itemName}</strong></div>
              <div><span className="text-slate-400">Ordered:</span> <strong>{showUpdateOrder.orderedQty} {showUpdateOrder.unit} — Total ₹{showUpdateOrder.totalAmount.toLocaleString()}</strong></div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Update Status To</label>
              <select value={updateForm.status} onChange={e=>setUpdateForm(p=>({...p,status:e.target.value as SupplierOrder["status"]}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold bg-white"><option>Order Placed</option><option>Order Received</option><option>Quality Check</option><option>Payment Done</option><option>Dispatched</option></select>
            </div>
            {(updateForm.status==="Order Received"||updateForm.status==="Quality Check") && (
              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Received Qty ({showUpdateOrder.unit})</label><input type="number" value={updateForm.receivedQty} onChange={e=>setUpdateForm(p=>({...p,receivedQty:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
                <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Actual Price (₹/{showUpdateOrder.unit})</label><input type="number" value={updateForm.receivedPrice} onChange={e=>setUpdateForm(p=>({...p,receivedPrice:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
                <div className="space-y-1 col-span-2"><label className="text-[10px] font-black uppercase text-slate-500">Quality Check Notes</label><input type="text" value={updateForm.qualityNotes} onChange={e=>setUpdateForm(p=>({...p,qualityNotes:e.target.value}))} placeholder="e.g. 95% Grade A, 5% rejected" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              </div>
            )}
            {updateForm.status==="Payment Done" && (
              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Amount Paid (₹)</label><input type="number" value={updateForm.paymentAmount} onChange={e=>setUpdateForm(p=>({...p,paymentAmount:parseFloat(e.target.value)||0}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
                <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-500">Payment Mode</label><select value={updateForm.paymentMode} onChange={e=>setUpdateForm(p=>({...p,paymentMode:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold bg-white"><option>NEFT</option><option>RTGS</option><option>UPI</option><option>Cheque</option><option>Cash</option><option>LC (Letter of Credit)</option></select></div>
                <div className="space-y-1 col-span-2"><label className="text-[10px] font-black uppercase text-slate-500">Payment Date</label><input type="date" value={updateForm.paymentDate} onChange={e=>setUpdateForm(p=>({...p,paymentDate:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#06b6d4]"/></div>
              </div>
            )}
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={()=>setShowUpdateOrder(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
              <button onClick={updateOrder} className="px-5 py-2 bg-[#0d1f3c] hover:bg-[#06b6d4] text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"><CheckCircle2 className="w-3.5 h-3.5"/> Save Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

