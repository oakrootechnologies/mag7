export interface IndustrialSpecs {
  power?: string;
  pressure?: string;
  flowRate?: string;
  material?: string;
  voltage?: string;
  capacity?: string;
  certification?: string;
  moq?: string;
  leadTime?: string;
  portOfLoading?: string;
  sizing?: string;
}

export interface IndustrialProduct {
  id: string;
  slug: string;
  name: string;
  category: "pumps" | "valves" | "motors" | "generators" | "compressors" | "spares";
  image: string;
  description: string;
  bannerImage: string;
  specs: IndustrialSpecs;
}

export const industrialProducts: IndustrialProduct[] = [
  {
    id: "i1",
    slug: "centrifugal-water-pump",
    name: "Heavy Duty Centrifugal Water Pump",
    category: "pumps",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    description: "Industrial-grade single-stage end suction centrifugal pumps. Ideal for agricultural irrigation, high-rise water supply, industrial cooling systems, and mining operations. Cast iron casing with bronze impeller for high wear resistance.",
    specs: {
      power: "15 HP to 100 HP (11 kW to 75 kW)",
      pressure: "Up to 10 Bar (100 m Head)",
      flowRate: "50 m³/hr to 600 m³/hr",
      material: "Cast Iron body, Bronze Impeller, SS316 Shaft",
      voltage: "380V - 415V, 3-Phase, 50Hz / 60Hz",
      certification: "ISO 9001:2015, CE Certified",
      moq: "5 Units",
      leadTime: "30 Days",
      portOfLoading: "Nhava Sheva (JNPT) / Mundra"
    }
  },
  {
    id: "i2",
    slug: "cast-steel-gate-valve",
    name: "Industrial Cast Steel Flanged Gate Valve",
    category: "valves",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    description: "Bolted bonnet, rising stem flanged gate valves designed for petroleum, petrochemical, power generation, and water supply grids. Manufactured in compliance with API 600 and ASME B16.34 standards.",
    specs: {
      pressure: "Class 150 / 300 / 600 (PN16 to PN100)",
      material: "ASTM A216 WCB Cast Steel, SS304 Trim",
      sizing: "2\" to 24\" (DN50 to DN600)",
      certification: "API 600, API 598 (Testing), CE, Fire Safe",
      moq: "10 Units",
      leadTime: "25 Days",
      portOfLoading: "Nhava Sheva (JNPT)",
      voltage: "N/A (Manual handwheel / Actuator ready)"
    }
  },
  {
    id: "i3",
    slug: "three-phase-electric-motor",
    name: "High-Efficiency 3-Phase Induction Motor",
    category: "motors",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=1200&q=80",
    description: "Premium efficiency IE3 three-phase asynchronous motors. Designed with low vibration, low noise, high starting torque, and IP55 protection rating. Widely used for fans, pumps, conveyors, and general plant machinery.",
    specs: {
      power: "5.5 kW to 110 kW (7.5 HP to 150 HP)",
      voltage: "415V, 3-Phase, 50Hz (Custom windable)",
      material: "Cast Iron Frame (Frame size 132 to 315)",
      certification: "IE3 efficiency level, IEC 60034-30 standard, CE",
      moq: "5 Units",
      leadTime: "25-30 Days",
      portOfLoading: "Mundra Port / Nhava Sheva"
    }
  },
  {
    id: "i4",
    slug: "silent-diesel-generator",
    name: "Industrial Silent Diesel Generator Set",
    category: "generators",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    description: "Acoustic canopy enclosed silent diesel generator sets powered by Cummins or Kirloskar engines. Features smart auto-transfer switch (ATS), weather-proof enclosure, and digital controller panel for robust plant power backups.",
    specs: {
      capacity: "25 kVA to 500 kVA",
      voltage: "220V/415V, Three Phase, 50Hz / 60Hz",
      pressure: "Noise level <70 dBA at 7 meters",
      material: "Sound-proof powder coated steel canopy",
      certification: "ISO 8528, CPCB-IV emission norms compliant",
      moq: "1 Unit",
      leadTime: "45 Days",
      portOfLoading: "JNPT Port, Mumbai"
    }
  },
  {
    id: "i5",
    slug: "rotary-screw-air-compressor",
    name: "Direct Drive Rotary Screw Air Compressor",
    category: "compressors",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    description: "High-performance rotary screw air compressors engineered for continuous 24/7 industrial operations. Built with smart PLC touch controllers, air-cooling, and oil-injected screw airend, offering high energy efficiency.",
    specs: {
      power: "10 HP to 75 HP (7.5 kW to 55 kW)",
      pressure: "7 Bar to 13 Bar",
      flowRate: "35 CFM to 300 CFM",
      voltage: "415V, 3-Phase, 50Hz / 60Hz",
      certification: "ASME certified receiver tank, CE, ISO",
      moq: "2 Units",
      leadTime: "30 Days",
      portOfLoading: "Nhava Sheva (JNPT)"
    }
  }
];
