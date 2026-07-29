export interface Supplier {
  id: string;
  name: string;
  type: "FPC / Farmer Co-op" | "Packing House" | "OEM Factory" | "Artisan Collective";
  location: string;
  products: string;
  certifications: string[];
  riskScore: number; // 1-5
  fulfilledOrders: number;
  qualityRejectionRate: string; // e.g. "0.8%"
  contactPhone: string;
  status: "Verified Active" | "Under Audit" | "Inactive";
}

export interface FreightForwarder {
  id: string;
  companyName: string;
  route: string; // e.g. "JNPT / Mundra to Jebel Ali"
  mode: "Ocean FCL Reefer" | "Ocean FCL Dry" | "Air Freight";
  ratePer20ftUSD: number;
  ratePerKgAirUSD?: number;
  transitDays: number;
  rating: number;
  contact: string;
}

export interface MarketPriceTicker {
  id: string;
  commodity: string;
  mandiLocation: string; // e.g. "Navi Mumbai APMC"
  currentRateINRPerKg: number;
  weeklyTrendPercent: number;
  historicalExportRateUSDPerKg: number;
  lastUpdated: string;
}

export interface TradeBarrierRule {
  id: string;
  countryRegion: string; // e.g. "European Union (EU)"
  commodity: string;
  keyRequirement: string;
  mrlLimitPPM: string;
  requiredCertificates: string[];
  riskLevel: "High Strictness" | "Medium" | "Standard";
}

export interface MasterCustomerProfile {
  customerId: string; // MAG_CUST_1045
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  buyerPersona: "Importer / Wholesaler" | "Supermarket Chain" | "Commodity Broker" | "Food Processor" | "Distributor" | string;
  verificationStatus: "Verified" | "Pending" | "Unverified";
  riskStatus: "Clean / Trusted" | "Caution - Delayed Pay" | "Blacklisted - Do Not Deal";
  totalRFQs: number;
  ordersPlaced: number;
  clvUSD: number;
}

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "SUP-FPC-01",
    name: "MahaOnion Farmer Producer Co. (Nashik Hub)",
    type: "FPC / Farmer Co-op",
    location: "Nashik, Maharashtra",
    products: "Red Onion, Garwa Onion",
    certifications: ["APEDA Registered", "GlobalG.A.P.", "FSSAI"],
    riskScore: 4.9,
    fulfilledOrders: 42,
    qualityRejectionRate: "0.5%",
    contactPhone: "+91 98220 11223",
    status: "Verified Active",
  },
  {
    id: "SUP-FPC-02",
    name: "Sahyadri Agro Farmers Co-op",
    type: "FPC / Farmer Co-op",
    location: "Satara / Pune, Maharashtra",
    products: "Cavendish Banana, Table Grapes",
    certifications: ["APEDA Registered", "GlobalG.A.P.", "BRCGS"],
    riskScore: 4.8,
    fulfilledOrders: 65,
    qualityRejectionRate: "0.2%",
    contactPhone: "+91 94223 88120",
    status: "Verified Active",
  },
  {
    id: "SUP-COOP-03",
    name: "Pollachi Coconut Producer Federation",
    type: "Packing House",
    location: "Pollachi, Tamil Nadu",
    products: "Semi-Husked Coconut, Coir",
    certifications: ["Coconut Development Board", "FSSAI"],
    riskScore: 4.6,
    fulfilledOrders: 28,
    qualityRejectionRate: "1.1%",
    contactPhone: "+91 97880 44321",
    status: "Verified Active",
  },
  {
    id: "SUP-OEM-04",
    name: "Gujarat Industrial Pump Works Pvt Ltd",
    type: "OEM Factory",
    location: "Rajkot, Gujarat",
    products: "Centrifugal Water Pumps, Electric Motors",
    certifications: ["API 600", "CE Certified", "ISO 9001:2015"],
    riskScore: 4.7,
    fulfilledOrders: 19,
    qualityRejectionRate: "0.0%",
    contactPhone: "+91 98980 77112",
    status: "Verified Active",
  },
  {
    id: "SUP-ART-05",
    name: "Jaipur Artisans Cooperative Guild",
    type: "Artisan Collective",
    location: "Jaipur, Rajasthan",
    products: "Blue Pottery, Carved Sheesham Wood",
    certifications: ["Handicrafts Export Promotion Council (HEPC)"],
    riskScore: 4.5,
    fulfilledOrders: 15,
    qualityRejectionRate: "1.5%",
    contactPhone: "+91 94140 33990",
    status: "Verified Active",
  },
];

export const INITIAL_FREIGHT_RATES: FreightForwarder[] = [
  {
    id: "FF-01",
    companyName: "Maersk Line (India)",
    route: "JNPT / Mundra ➔ Jebel Ali (Dubai)",
    mode: "Ocean FCL Reefer",
    ratePer20ftUSD: 1450,
    transitDays: 4,
    rating: 4.9,
    contact: "logistics@maersk.com",
  },
  {
    id: "FF-02",
    companyName: "Hapag-Lloyd Ocean Freight",
    route: "Mundra ➔ Rotterdam (Netherlands)",
    mode: "Ocean FCL Reefer",
    ratePer20ftUSD: 3200,
    transitDays: 18,
    rating: 4.8,
    contact: "rfq@hapag-lloyd.com",
  },
  {
    id: "FF-03",
    companyName: "Emirates SkyCargo",
    route: "Mumbai (BOM) ➔ Frankfurt (FRA)",
    mode: "Air Freight",
    ratePer20ftUSD: 0,
    ratePerKgAirUSD: 2.85,
    transitDays: 1,
    rating: 4.9,
    contact: "cargo@emirates.com",
  },
  {
    id: "FF-04",
    companyName: "Apex Logistics India",
    route: "JNPT ➔ Port Klang (Malaysia)",
    mode: "Ocean FCL Dry",
    ratePer20ftUSD: 980,
    transitDays: 9,
    rating: 4.6,
    contact: "sales@apexlogistics.in",
  },
];

export const INITIAL_MARKET_TICKER: MarketPriceTicker[] = [
  {
    id: "TICK-01",
    commodity: "Red Onion (Export Grade)",
    mandiLocation: "Lasalgaon / Nashik APMC",
    currentRateINRPerKg: 24,
    weeklyTrendPercent: -3.5,
    historicalExportRateUSDPerKg: 0.42,
    lastUpdated: "Today 10:00 AM",
  },
  {
    id: "TICK-02",
    commodity: "Cavendish Banana (Grade A)",
    mandiLocation: "Jalgaon APMC",
    currentRateINRPerKg: 18,
    weeklyTrendPercent: +2.1,
    historicalExportRateUSDPerKg: 0.35,
    lastUpdated: "Today 11:30 AM",
  },
  {
    id: "TICK-03",
    commodity: "Table Grapes (Thomson Seedless)",
    mandiLocation: "Nashik Mandi",
    currentRateINRPerKg: 65,
    weeklyTrendPercent: +4.8,
    historicalExportRateUSDPerKg: 1.25,
    lastUpdated: "Today 09:15 AM",
  },
  {
    id: "TICK-04",
    commodity: "Semi-Husked Coconut",
    mandiLocation: "Pollachi APMC",
    currentRateINRPerKg: 32,
    weeklyTrendPercent: 0.0,
    historicalExportRateUSDPerKg: 0.55,
    lastUpdated: "Today 12:00 PM",
  },
  {
    id: "TICK-05",
    commodity: "Sona Masuri Rice (Non-Basmati)",
    mandiLocation: "Karnal Mandi",
    currentRateINRPerKg: 48,
    weeklyTrendPercent: -1.2,
    historicalExportRateUSDPerKg: 0.72,
    lastUpdated: "Today 08:45 AM",
  },
];

export const INITIAL_TRADE_BARRIERS: TradeBarrierRule[] = [
  {
    id: "TB-EU-01",
    countryRegion: "European Union (Rotterdam/Hamburg)",
    commodity: "Table Grapes & Fresh Fruits",
    keyRequirement: "MRL Pesticide Residue Testing & GlobalG.A.P Certificate",
    mrlLimitPPM: "< 0.01 mg/kg (Zero Tolerance for restricted pesticides)",
    requiredCertificates: ["Phytosanitary", "GlobalG.A.P.", "EU Test Report"],
    riskLevel: "High Strictness",
  },
  {
    id: "TB-UAE-02",
    countryRegion: "United Arab Emirates (Jebel Ali Port)",
    commodity: "Fresh Cavendish Banana & Vegetables",
    keyRequirement: "Halal / Food Safety Certificate & Cold Chain Temperature Log (13.5°C)",
    mrlLimitPPM: "GSO / GCC Food Standard Compliant",
    requiredCertificates: ["Phytosanitary", "FSSAI Export Certificate", "Certificate of Origin"],
    riskLevel: "Standard",
  },
  {
    id: "TB-USA-03",
    countryRegion: "USA (FDA / USDA Inspection)",
    commodity: "Spices & Processed Foods",
    keyRequirement: "FDA Prior Notice Filing & Aflatoxin Test Clearances",
    mrlLimitPPM: "< 5 ppb Aflatoxin Limit",
    requiredCertificates: ["FDA Registration", "Phytosanitary", "SGS Inspection"],
    riskLevel: "High Strictness",
  },
  {
    id: "TB-AUS-04",
    countryRegion: "Australia (BICON Quarantine)",
    commodity: "Wood Handicrafts & Mangoes",
    keyRequirement: "Methyl Bromide Fumigation Treatment & VHT (Vapour Heat Treatment)",
    mrlLimitPPM: "Biosecurity Zero Pest Tolerance",
    requiredCertificates: ["Fumigation Certificate", "Phytosanitary", "BICON Clearance"],
    riskLevel: "High Strictness",
  },
];

export const INITIAL_CUSTOMERS: MasterCustomerProfile[] = [
  {
    customerId: "MAG_CUST_1045",
    fullName: "Ahmad Al-Rashidi",
    companyName: "Al-Rashidi Import Co. LLC",
    email: "procurement@alrashidi.ae",
    phone: "+971 50 123 4567",
    buyerPersona: "Importer / Wholesaler",
    verificationStatus: "Verified",
    riskStatus: "Clean / Trusted",
    totalRFQs: 8,
    ordersPlaced: 5,
    clvUSD: 145000,
  },
  {
    customerId: "MAG_CUST_1088",
    fullName: "Sophie Müller",
    companyName: "EuroFresh Logistics GmbH",
    email: "sophie.m@eurofresh.de",
    phone: "+49 69 9876 5432",
    buyerPersona: "Supermarket Chain",
    verificationStatus: "Verified",
    riskStatus: "Clean / Trusted",
    totalRFQs: 4,
    ordersPlaced: 3,
    clvUSD: 98000,
  },
  {
    customerId: "MAG_CUST_1102",
    fullName: "James Okafor",
    companyName: "Apex Plant Equipment Ltd",
    email: "j.okafor@apexplant.ng",
    phone: "+234 803 112 2334",
    buyerPersona: "Distributor",
    verificationStatus: "Verified",
    riskStatus: "Clean / Trusted",
    totalRFQs: 3,
    ordersPlaced: 2,
    clvUSD: 62000,
  },
  {
    customerId: "MAG_CUST_1999",
    fullName: "Unverified Buyer",
    companyName: "Test Trader Co",
    email: "purchaser@company.com",
    phone: "+91 99999 00000",
    buyerPersona: "Commodity Broker",
    verificationStatus: "Unverified",
    riskStatus: "Caution - Delayed Pay",
    totalRFQs: 2,
    ordersPlaced: 0,
    clvUSD: 0,
  },
];
