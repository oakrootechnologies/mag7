export interface HandicraftSpecs {
  material?: string;
  sizing?: string;
  technique?: string;
  moq?: string;
  packaging?: string;
  leadTime?: string;
  portOfLoading?: string;
  customization?: string;
}

export interface HandicraftProduct {
  id: string;
  slug: string;
  name: string;
  category: "wooden" | "brass" | "pottery" | "textiles" | "stone";
  image: string;
  description: string;
  bannerImage: string;
  specs: HandicraftSpecs;
}

export const handicraftsProducts: HandicraftProduct[] = [
  {
    id: "h1",
    slug: "sheesham-wood-carved-box",
    name: "Sheesham Wood Hand-Carved Jewelry Box",
    category: "wooden",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    description: "Handcrafted by national award-winning artisans from Saharanpur, India. Made from premium seasoned Sheesham wood (Indian Rosewood) featuring intricate floral lattice brass inlay work. Features velvet lining inside for protection of precious contents.",
    specs: {
      material: "Premium Sheesham Wood & Brass Inlay",
      sizing: "8\" x 5\" x 3\" / Custom sizes",
      technique: "Chisel hand-carving & wire inlaying",
      moq: "200 Pieces",
      packaging: "Individual bubble wrapped in 5-ply inner box, master carton",
      leadTime: "30-45 Days from order",
      portOfLoading: "Mundra / Nhava Sheva (JNPT)",
      customization: "Available for sizing, velvet color, engraving"
    }
  },
  {
    id: "h2",
    slug: "antique-brass-planter",
    name: "Antique Embossed Brass Planter",
    category: "brass",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    description: "Stunning solid brass planters with hand-embossed traditional patterns and antique golden finish. Perfect for indoor high-end decor, coated with rust-resistant clear lacquer for long durability.",
    specs: {
      material: "Pure Brass (60/40 Copper-Zinc alloy)",
      sizing: "10\" Diameter, 9\" Height / Custom",
      technique: "Sheet metal hammering, embossing, antiquing",
      moq: "150 Pieces",
      packaging: "Tissue paper, polybag, custom foam fit boxes",
      leadTime: "35 Days",
      portOfLoading: "Nhava Sheva (JNPT) / Mundra",
      customization: "Polish variations (Shiny gold, copper-rose, antique black)"
    }
  },
  {
    id: "h3",
    slug: "blue-pottery-ceramic-vase",
    name: "Jaipur Floral Blue Pottery Vase",
    category: "pottery",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    description: "Traditional Jaipur Blue Pottery crafted without clay. Made from quartz stone powder, raw glaze, sodium sulphate, and multani mitti. Hand-painted with cobalt blue dye and finished with fine glass glaze under wood firing.",
    specs: {
      material: "Quartz powder, glass, natural gum (No clay)",
      sizing: "12\" Height, 6\" belly diameter",
      technique: "Molding, hand-painting, glazing, wood kiln firing",
      moq: "100 Pieces",
      packaging: "Molded EPS styrofoam, corrugated inner carton",
      leadTime: "40 Days (Weather dependent)",
      portOfLoading: "Nhava Sheva (JNPT)",
      customization: "Motifs, color schemes (cobalt blue, turquoise, green, yellow)"
    }
  },
  {
    id: "h4",
    slug: "jute-handwoven-rug",
    name: "Natural Handwoven Jute Area Rug",
    category: "textiles",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
    description: "Eco-friendly bio-degradable area rugs handwoven in Bhadohi, India. Sourced from high-grade golden jute fiber, offering a rustic texture and extreme durability for heavy-traffic household zones.",
    specs: {
      material: "100% Organic Golden Jute Fiber",
      sizing: "5' x 8' / 6' x 9' / Custom",
      technique: "Hand-loom flat weaving, braided border stitched",
      moq: "50 Pieces",
      packaging: "Roll packed in heavy-duty HDPE bags",
      leadTime: "30 Days",
      portOfLoading: "Kolkata Port / Nhava Sheva",
      customization: "Size variations, dyed borders, patterns"
    }
  },
  {
    id: "h5",
    slug: "marble-inlay-coasters",
    name: "Taj Mahal White Marble Inlay Coasters",
    category: "stone",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80",
    description: "Set of 6 white Makrana marble coasters decorated with Pietra Dura semiprecious stone inlays (lapis lazuli, malachite, jasper). Hand-polished to a glass finish. Same stonecraft style used in the Taj Mahal.",
    specs: {
      material: "Makrana White Marble & Semiprecious Stones",
      sizing: "4\" x 4\" Octagonal / Round",
      technique: "Stone groove chiseling, hand shaping, stone inlaying",
      moq: "200 Sets",
      packaging: "Fitted wooden gift box, outer corrugated packaging",
      leadTime: "30 Days",
      portOfLoading: "Nhava Sheva (JNPT)",
      customization: "Stone colors, shape of coasters, custom wood box engraving"
    }
  }
];
