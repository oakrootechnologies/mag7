export interface ProductSpecs {
  color?: string;
  maturity?: string;
  shelfLife?: string;
  weight?: string;
  temp?: string;
  packaging?: string;
  boxQuality?: string;
  incoTerms?: string;
  paymentTerms?: string;
  deliveryTime?: string;
  portOfLoading?: string;
  length?: string;
  origin?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "fruits" | "vegetables" | "commodities" | "spices" | "imports";
  image: string;
  description: string;
  bannerImage: string;
  specs: ProductSpecs;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "alphonso-mango",
    name: "Alphonso Mango",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80",
    description: "At Mag7 Global, we take pride in exporting top-quality Alphonso Mangoes, sourced from India’s finest orchards. Grown using natural and sustainable farming methods, our Alphonso mangoes are carefully handpicked to ensure rich aroma, smooth texture, and irresistibly sweet flavor.",
    specs: {
      color: "Bright Yellow",
      length: "8 cm - 10 cm",
      maturity: "90%",
      shelfLife: "3 - 5 Weeks",
      weight: "250 - 300 GM",
      temp: "13 C",
      packaging: "1 Dozen",
      boxQuality: "Cardboard Box",
      incoTerms: "FOB or CIF",
      paymentTerms: "50% Advance & 50% DP",
      deliveryTime: "7 Days from Date of Advance",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "2",
    slug: "kesar-mango",
    name: "Kesar Mango",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1200&q=80",
    description: "Famous for its vibrant orange pulp and intense sweetness, our Kesar Mangoes are sourced directly from Gujarat's Gir region. They are washed, graded, and packed under strict hygienic conditions for export.",
    specs: {
      color: "Greenish Yellow with Orange Pulp",
      maturity: "85% - 90%",
      shelfLife: "3 - 4 Weeks",
      weight: "200 - 250 GM",
      temp: "12 C",
      packaging: "3 Kg / 5 Kg Box",
      boxQuality: "Corrugated Cardboard",
      incoTerms: "FOB, CIF",
      paymentTerms: "L/C or Advance T/T",
      deliveryTime: "8 Days from Advance",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "3",
    slug: "grapes",
    name: "Grapes",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1200&q=80",
    description: "Exporting premium seedless green, black, and red grapes sourced from Nashik, the grape capital of India. Sized perfectly and packed in punnets to preserve freshness during long-transit shipping.",
    specs: {
      color: "Bright Green / Deep Black",
      maturity: "Fully Ripe (Seedless)",
      shelfLife: "6 - 8 Weeks (Cold chain)",
      weight: "16-18 mm size berry",
      temp: "0 - 1 C",
      packaging: "5 Kg Carry Bags / Punnets",
      boxQuality: "Thermocol / Paper box",
      incoTerms: "CIF, CFR",
      paymentTerms: "30% Advance + 70% against BL",
      deliveryTime: "10 Days from Order",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "4",
    slug: "pomegranate",
    name: "Pomegranate",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
    description: "Indian Bhagwa pomegranates are internationally renowned for their soft seeds, deep red arils, and thick skin, giving them an exceptionally long shelf life ideal for global shipment.",
    specs: {
      color: "Ruby Red",
      maturity: "95%",
      shelfLife: "8 - 10 Weeks",
      weight: "250 - 350 GM",
      temp: "5 - 7 C",
      packaging: "3.5 Kg / 4 Kg Cartons",
      boxQuality: "High-burst corrugated boxes",
      incoTerms: "FOB, CIF",
      paymentTerms: "DP, CAD, or T/T",
      deliveryTime: "7 Days",
      portOfLoading: "JNPT Mumbai"
    }
  },
  {
    id: "5",
    slug: "coconut",
    name: "Semi-Husked Coconut",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=1200&q=80",
    description: "Carefully husked premium coconuts sourced from Pollachi (Tamil Nadu) and Konkan coast. Rich in water content and thick kernel, packed in mesh bags to enable airflow.",
    specs: {
      color: "Light Brown",
      maturity: "Fully Matured",
      shelfLife: "12 Weeks",
      weight: "500 - 650 GM",
      temp: "Ambient (Dry container)",
      packaging: "25 Pcs in Mesh Bag",
      boxQuality: "N/A (Mesh bag)",
      incoTerms: "FOB, CIF",
      paymentTerms: "100% Irrevocable L/C",
      deliveryTime: "12 Days",
      portOfLoading: "Chennai / JNPT"
    }
  },
  {
    id: "6",
    slug: "banana",
    name: "Cavendish Banana",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80",
    description: "Premium G9 green bananas, systematically harvested, washed in alum water to prevent sap stains, and loaded in refrigerated containers to reach international destination markets perfectly green.",
    specs: {
      color: "Green (Ripens to Yellow)",
      maturity: "85% (11-12 weeks crop)",
      shelfLife: "35 - 40 Days (Reefer)",
      weight: "7 - 8.5 Inches length",
      temp: "13.5 C",
      packaging: "13.5 Kg Box",
      boxQuality: "Heavy export-grade telescopic box",
      incoTerms: "FOB, CIF",
      paymentTerms: "30% Advance + 70% against Scanned Docs",
      deliveryTime: "7 Days",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "7",
    slug: "elephant-foot-yam-suran",
    name: "Elephant Foot Yam / Suran",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=80",
    description: "Locally known as Suran, this high-demand root vegetable is sourced from farmers in Maharashtra. Cleaned, dried, and checked for cavities prior to export.",
    specs: {
      color: "Brownish exterior, Cream inside",
      maturity: "Fully developed tuber",
      shelfLife: "2 - 3 Months",
      weight: "1 Kg - 5 Kg per piece",
      temp: "12 - 15 C",
      packaging: "10 Kg / 20 Kg Gunny Bags",
      boxQuality: "Mesh/Gunny Bag",
      incoTerms: "FOB, CFR",
      paymentTerms: "Advance cash or L/C",
      deliveryTime: "10 Days",
      portOfLoading: "JNPT Mumbai"
    }
  },
  {
    id: "8",
    slug: "drumstick",
    name: "Drumstick",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?auto=format&fit=crop&w=1200&q=80",
    description: "Fresh green Moringa pods (drumsticks) packed with nutrients. Sourced fresh daily and packed in bundle sleeves for air cargo shipment.",
    specs: {
      color: "Bright Green",
      length: "45 cm - 60 cm",
      maturity: "Tender (not woody)",
      shelfLife: "7 - 10 Days",
      weight: "Lightweight pods",
      temp: "8 - 10 C",
      packaging: "5 Kg / 10 Kg Box bundles",
      boxQuality: "Corrugated boxes with air vents",
      incoTerms: "FOB, CIF (Air)",
      paymentTerms: "100% Advance (Air cargo)",
      deliveryTime: "3 Days",
      portOfLoading: "Mumbai Air Cargo"
    }
  },
  {
    id: "9",
    slug: "garlic",
    name: "Garlic",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-clove high pungency garlic bulbs. Sun-cured, roots trimmed, and skins cleaned to produce a clean, shiny white appearance.",
    specs: {
      color: "Pure White / Purple Striped",
      maturity: "Fully cured dried bulbs",
      shelfLife: "5 - 6 Months",
      weight: "40 mm + bulb size",
      temp: "Ambient dry ventilated",
      packaging: "10 Kg / 20 Kg Mesh Bags",
      boxQuality: "N/A (Mesh bag)",
      incoTerms: "FOB, CIF",
      paymentTerms: "30% Advance + 70% DP",
      deliveryTime: "7 Days",
      portOfLoading: "JNPT Mumbai / Pipavav"
    }
  },
  {
    id: "10",
    slug: "ginger-2",
    name: "Ginger",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80",
    description: "Exporting premium fresh washed ginger. Sorted for thick rhizomes, low fiber content, and clean outer skin, suitable for culinary use.",
    specs: {
      color: "Light Buff / Yellowish",
      maturity: "Fully matured rhizomes",
      shelfLife: "4 - 6 Weeks",
      weight: "100 GM + rhizome size",
      temp: "12 C",
      packaging: "10 Kg / 13.5 Kg Carton or Mesh bag",
      boxQuality: "Waxed corrugated cartons",
      incoTerms: "FOB, CIF",
      paymentTerms: "Advance and balance on BL",
      deliveryTime: "8 Days",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "11",
    slug: "lemon",
    name: "Lemon",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=1200&q=80",
    description: "Thin-skinned juicy seedless/semi-seedless green and yellow lemons (lime) sourced from Maharashtra and Andhra Pradesh farms.",
    specs: {
      color: "Bright Yellow / Vibrant Green",
      maturity: "Fully juicy",
      shelfLife: "4 - 6 Weeks",
      weight: "35 - 50 GM",
      temp: "8 C",
      packaging: "3 Kg / 6 Kg cartons",
      boxQuality: "Corrugated export-standard carton",
      incoTerms: "FOB, CIF",
      paymentTerms: "CAD or Advance T/T",
      deliveryTime: "5 Days",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "12",
    slug: "tomato",
    name: "Tomato",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1200&q=80",
    description: "Firm, glossy tomatoes harvested at the break-stage (slightly greenish-orange) to ensure they ripen perfectly by the time they reach destination ports.",
    specs: {
      color: "Orange-Red (Stage 3-4 ripening)",
      maturity: "Firm and mature",
      shelfLife: "2 - 3 Weeks (Chilled)",
      weight: "80 - 120 GM",
      temp: "10 C",
      packaging: "10 Kg plastic crates / cartons",
      boxQuality: "Corrugated box with separations",
      incoTerms: "FOB, CFR",
      paymentTerms: "T/T Advance",
      deliveryTime: "4 Days",
      portOfLoading: "JNPT Mumbai / Nhava Sheva"
    }
  },
  {
    id: "13",
    slug: "chilli",
    name: "Green Chilli",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1588252399650-db747a83d735?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1588252399650-db747a83d735?auto=format&fit=crop&w=1200&q=80",
    description: "Highly spicy green chillies (G4 and Teja varieties). Stems are kept intact to preserve shelf life and prevent moisture decay inside packages.",
    specs: {
      color: "Dark Green",
      length: "6 cm - 9 cm",
      maturity: "Fully grown fresh pods",
      shelfLife: "14 - 18 Days",
      temp: "7 C",
      packaging: "4 Kg / 5 Kg boxes",
      boxQuality: "Corrugated box with breathing holes",
      incoTerms: "FOB, CIF (Air/Sea)",
      paymentTerms: "Letter of Credit (L/C) or T/T",
      deliveryTime: "5 Days",
      portOfLoading: "JNPT Mumbai / Air Cargo"
    }
  },
  {
    id: "14",
    slug: "onion",
    name: "Indian Onion",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    description: "World-famous Nashik red onions. Excellent pungency, dry outer layers, cured perfectly under solar sheds to prevent rotting in shipping containers.",
    specs: {
      color: "Dark Red / Pink",
      maturity: "Well-cured dry skin",
      shelfLife: "2 - 3 Months",
      weight: "45 mm - 65 mm + size",
      temp: "Ambient (Dry container with active vents)",
      packaging: "25 Kg / 40 Kg Red Mesh Bags",
      boxQuality: "N/A (Mesh bag)",
      incoTerms: "FOB, CFR, CIF",
      paymentTerms: "DP, LC, or Advance",
      deliveryTime: "6 Days",
      portOfLoading: "JNPT Port Mumbai"
    }
  },
  {
    id: "15",
    slug: "chana-dal",
    name: "Chana Dal",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
    description: "Premium split baby chickpeas (Chana Dal). De-husked, polished cleanly, and packed securely under hygienic conditions to maintain purity.",
    specs: {
      color: "Golden Yellow",
      origin: "Madhya Pradesh, India",
      shelfLife: "12 Months",
      packaging: "25 Kg / 50 Kg PP Bags",
      boxQuality: "Woven PP Bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "100% LC at sight",
      deliveryTime: "12 Days",
      portOfLoading: "JNPT Mumbai / Mundra"
    }
  },
  {
    id: "16",
    slug: "chickpeas",
    name: "Chickpeas",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
    description: "Premium white chickpeas (Kabuli Chana) graded by count. Cleaned of stones and defective grains, exhibiting excellent size uniformity.",
    specs: {
      color: "Cream / White",
      origin: "India",
      shelfLife: "24 Months",
      weight: "75-80 count (12mm) / 42-44 count (14mm)",
      packaging: "25 Kg PP or Jute Bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "T/T Advance + CAD",
      deliveryTime: "10 Days",
      portOfLoading: "JNPT Mumbai"
    }
  },
  {
    id: "17",
    slug: "green-millet",
    name: "Green Millet",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=1200&q=80",
    description: "High-nutrient green millet (Bajra) suitable for both human consumption and animal feed. Machine-cleaned and sorted to ensure purity above 99%.",
    specs: {
      color: "Pale Greenish",
      origin: "Rajasthan / Gujarat, India",
      shelfLife: "12 Months",
      packaging: "50 Kg Woven Bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "LC or DP at sight",
      deliveryTime: "14 Days",
      portOfLoading: "Mundra Port / Kandla Port"
    }
  },
  {
    id: "18",
    slug: "maize",
    name: "Yellow Maize",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1551754625-702980ca753a?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1551754625-702980ca753a?auto=format&fit=crop&w=1200&q=80",
    description: "High-grade yellow corn/maize. Sourced from Karnataka and Maharashtra, checked for moisture limits (under 14%) and aflatoxin standards.",
    specs: {
      color: "Bright Yellow",
      origin: "India",
      shelfLife: "12 Months",
      packaging: "50 Kg PP Bags or Bulk Vessel",
      incoTerms: "FOB, CFR",
      paymentTerms: "Confirmed LC / Advance",
      deliveryTime: "15 Days",
      portOfLoading: "JNPT Mumbai / Mundra"
    }
  },
  {
    id: "19",
    slug: "rice-sona-masuri-non-basmati",
    name: "Sona Masuri Rice (Non-Basmati)",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
    description: "Premium lightweight aromatic medium-grain rice. Aged for 12+ months to ensure fluffiness and non-sticky cooking texture.",
    specs: {
      color: "White / Off-White",
      origin: "Andhra Pradesh / Karnataka, India",
      shelfLife: "24 Months",
      packaging: "10 Kg / 20 Kg / 25 Kg Non-Woven bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "T/T or L/C",
      deliveryTime: "12 Days",
      portOfLoading: "JNPT Mumbai / Chennai"
    }
  },
  {
    id: "20",
    slug: "rice-ir-64-non-basmati",
    name: "Rice IR 64 (Non-Basmati)",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
    description: "Highly exported long-grain white raw and parboiled rice (IR64). Highly demanded in African and Asian countries due to high quality and economic pricing.",
    specs: {
      color: "White (5% Broken limit standard)",
      origin: "India",
      shelfLife: "24 Months",
      packaging: "50 Kg PP Bags",
      incoTerms: "FOB, CFR, CIF",
      paymentTerms: "Confirmed Irrevocable L/C",
      deliveryTime: "14 Days",
      portOfLoading: "JNPT Port Mumbai / Kakinada"
    }
  },
  {
    id: "21",
    slug: "rice-1121-basmati",
    name: "Rice 1121 Basmati",
    category: "commodities",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
    description: "Queen of fragrance, 1121 Extra Long Grain Basmati Rice. Extends up to 20mm when cooked, representing the highest premium quality of rice.",
    specs: {
      color: "Creamy White / Golden Sella",
      origin: "Haryana / Punjab, India",
      shelfLife: "24 Months",
      length: "8.35 mm average grain length",
      packaging: "10 Kg / 20 Kg Premium Bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "30% Advance + 70% LC",
      deliveryTime: "10 Days",
      portOfLoading: "Mundra Port / JNPT Mumbai"
    }
  },
  {
    id: "22",
    slug: "corriander-seeds",
    name: "Coriander Seeds",
    category: "spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    description: "Premium green and golden coriander seeds (Dhania). Graded properly to eliminate dust, stalks, and hollow seeds, offering warm citrus aroma.",
    specs: {
      color: "Golden Greenish",
      origin: "Rajasthan / Madhya Pradesh",
      shelfLife: "18 Months",
      packaging: "25 Kg Gunny or Paper bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "T/T or CAD",
      deliveryTime: "8 Days",
      portOfLoading: "JNPT Mumbai / Mundra"
    }
  },
  {
    id: "23",
    slug: "cumin-seeds",
    name: "Cumin Seeds",
    category: "spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    description: "Highly aromatic cumin seeds (Jeera) sourced from Gujarat's Unjha market. 99% pure machine-cleaned, containing high volatile oil content.",
    specs: {
      color: "Brownish Grey",
      origin: "Gujarat / Rajasthan, India",
      shelfLife: "24 Months",
      packaging: "25 Kg / 50 Kg Jute bags",
      incoTerms: "FOB, CFR, CIF",
      paymentTerms: "Confirmed L/C",
      deliveryTime: "10 Days",
      portOfLoading: "Mundra Port / Pipavav"
    }
  },
  {
    id: "24",
    slug: "turmeric",
    name: "Turmeric",
    category: "spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    description: "Premium double-polished turmeric fingers (Selam & Rajapuri varieties) containing high curcumin content (above 3.5%), processed cleanly.",
    specs: {
      color: "Deep Orange Yellow",
      origin: "Sangli / Nizamabad, India",
      shelfLife: "24 Months",
      packaging: "25 Kg / 50 Kg bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "Advance T/T or L/C",
      deliveryTime: "8 Days",
      portOfLoading: "JNPT Mumbai / Chennai"
    }
  },
  {
    id: "25",
    slug: "red-chilli",
    name: "Red Chilli",
    category: "spices",
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=1200&q=80",
    description: "Stemless and with-stem dried red chillies (Guntur Sannam S17, Teja, Byadgi varieties). Bright red color and high hotness parameters.",
    specs: {
      color: "Dark Deep Red",
      origin: "Andhra Pradesh / Karnataka",
      shelfLife: "12 Months",
      packaging: "10 Kg / 20 Kg Gunny bags",
      incoTerms: "FOB, CIF",
      paymentTerms: "Irrevocable LC at sight",
      deliveryTime: "9 Days",
      portOfLoading: "Chennai / JNPT Mumbai"
    }
  },
  {
    id: "26",
    slug: "apple",
    name: "Apple",
    category: "imports",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80",
    description: "Importing crisp, fresh apples (Gala, Fuji, Red Delicious) from leading orchards in New Zealand, Chile, Washington, and Europe into India and Dubai.",
    specs: {
      color: "Blushed Red / Sweet Pink",
      origin: "New Zealand / USA / Europe",
      shelfLife: "8 - 12 Weeks (Cold storage)",
      weight: "100 - 150 count per box",
      temp: "1 C",
      packaging: "18 Kg / 20 Kg Telescopic Cartons",
      incoTerms: "CIF",
      paymentTerms: "Advance CAD / LC",
      deliveryTime: "18-25 Days transit",
      portOfLoading: "Port of Origin (Imported to JNPT / Dubai)"
    }
  },
  {
    id: "27",
    slug: "avocado",
    name: "Avocado",
    category: "imports",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1200&q=80",
    description: "Importing premium Hass avocados from Peru, Mexico, and Kenya. Cold-chain managed to arrive in perfect green condition ready for local distributors.",
    specs: {
      color: "Pebbled Dark Green",
      origin: "Peru / Kenya",
      shelfLife: "3 Weeks",
      weight: "160 - 220 GM (Size 16-22)",
      temp: "5 - 6 C",
      packaging: "4 Kg Cartons",
      incoTerms: "CIF",
      paymentTerms: "CAD / LC",
      deliveryTime: "Air freighted or fast reefer vessels",
      portOfLoading: "Callao / Mombasa"
    }
  },
  {
    id: "28",
    slug: "dates",
    name: "Dates",
    category: "imports",
    image: "https://images.unsplash.com/photo-1597839219216-a773cb2473e4?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1597839219216-a773cb2473e4?auto=format&fit=crop&w=1200&q=80",
    description: "Importing top-grade dates (Ajwa, Medjool, Mabroom, Safawi) from Saudi Arabia, Jordan, and UAE into Indian wholesale networks.",
    specs: {
      color: "Dark Brown / Black",
      origin: "Saudi Arabia / Jordan",
      shelfLife: "12 Months",
      packaging: "5 Kg / 10 Kg Cartons",
      incoTerms: "FOB, CIF",
      paymentTerms: "30% Advance + 70% against DP",
      deliveryTime: "12 Days transit",
      portOfLoading: "Jebel Ali / Jeddah"
    }
  },
  {
    id: "29",
    slug: "valencia-orange",
    name: "Valencia Orange",
    category: "imports",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=1200&q=80",
    description: "Importing fresh juicy Valencia oranges from Egypt and South Africa, highly desired for juice manufacture and fresh fruit sales.",
    specs: {
      color: "Sunkissed Orange",
      origin: "Egypt / South Africa",
      shelfLife: "6 - 8 Weeks",
      weight: "Size 48 / 56 / 64 / 72 / 80",
      temp: "4 C",
      packaging: "15 Kg telescopic carton",
      incoTerms: "CIF",
      paymentTerms: "CAD / DP",
      deliveryTime: "15 Days transit",
      portOfLoading: "Alexandria / Durban"
    }
  },
  {
    id: "30",
    slug: "dragon-fruit",
    name: "Dragon Fruit",
    category: "imports",
    image: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&w=1200&q=80",
    description: "Importing premium fresh dragon fruit (red skin with white/red flesh) from Vietnam orchards under quick delivery schedules.",
    specs: {
      color: "Vibrant Pink skin, white/red flesh",
      origin: "Vietnam",
      shelfLife: "3 - 4 Weeks",
      weight: "350 - 450 GM",
      temp: "5 C",
      packaging: "9 Kg / 10 Kg boxes",
      incoTerms: "CIF",
      paymentTerms: "Advance payment / L/C",
      deliveryTime: "14 Days",
      portOfLoading: "Ho Chi Minh Port"
    }
  },
  {
    id: "31",
    slug: "cashew-nuts",
    name: "Cashew Nuts",
    category: "imports",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=1200&q=80",
    description: "Importing raw cashew nuts in shells (RCN) from West Africa (Ivory Coast, Guinea-Bissau) for processing in Indian units.",
    specs: {
      color: "Greyish Brown shells",
      origin: "Ivory Coast / Benin",
      shelfLife: "18 Months (raw status)",
      weight: "Outturn: 48 - 52 lbs / bag",
      temp: "Ambient ventilated storage",
      packaging: "80 Kg jute bags",
      incoTerms: "CFR, CIF",
      paymentTerms: "LC / CAD",
      deliveryTime: "25 Days transit",
      portOfLoading: "Abidjan / Cotonou"
    }
  }
];
