"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Globe2, Leaf, HeartHandshake, ShieldCheck, Factory, Award,
  TrendingUp, Package, Truck, CheckCircle2, Users, MapPin, PhoneCall, ChevronRight, Star,
  Facebook, Instagram, MessageCircle, Mail
} from "lucide-react";

/* ─── Animated Counter ─── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const stats = [
  { label: "Countries Served", value: 28, suffix: "+", icon: <Globe2 className="w-5 h-5" /> },
  { label: "Products Exported", value: 150, suffix: "+", icon: <Package className="w-5 h-5" /> },
  { label: "Years of Expertise", value: 10, suffix: "+", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Happy Buyers", value: 500, suffix: "+", icon: <Users className="w-5 h-5" /> },
];


const divisions = [
  {
    title: "Agro Division",
    sub: "Mag7 Agro Sourcing",
    desc: "India's premier exporter of Cavendish bananas, Nashik onions, table grapes, mangoes, spices, and grains. Integrated cold-chain reefer logistics to Gulf, EU, and Australia.",
    image: "/new ui/agri.png",
    href: "/agro",
    accent: "#10b981",
    badge: "Agro & Fresh Produce",
    features: ["30+ Fruits & Vegetables", "APEDA Certified", "Cold-Chain Logistics"],
  },
  {
    title: "Handicrafts Division",
    sub: "Mag7 Heritage Crafts",
    desc: "Exquisite hand-carved Sheesham wood boxes, hammered brassware, traditional Jaipur blue pottery, and bio-degradable handwoven jute rugs crafted by national award-winning artisans.",
    image: "/images/handicraft_division.png",
    href: "/handicrafts",
    accent: "#f59e0b",
    badge: "Artisanal Heritage",
    features: ["Award-Winning Artisans", "100% Handcrafted", "Custom OEM Orders"],
  },
  {
    title: "Industrial Division",
    sub: "Mag7 Industrial Equipments",
    desc: "High-efficiency centrifugal water pumps, API-600 gate valves, silent generators, IE3 three-phase induction motors, and CNC precision components for global manufacturing.",
    image: "/images/industrial_division.png",
    href: "/industrial-equipments",
    accent: "#0ea5e9",
    badge: "Machinery & Equipment",
    features: ["API 600 / CE Certified", "ISO OEM Partners", "25-Day Lead Time"],
  },
];

const testimonials = [
  {
    name: "Ahmad Al-Rashidi",
    role: "Procurement Director, Dubai",
    text: "Mag7 Global has been our trusted agro supplier for 4 years. Their cold-chain management for banana and onion shipments is impeccable.",
    rating: 5,
  },
  {
    name: "Sophie Müller",
    role: "Buyer, Frankfurt",
    text: "Exceptional quality handicrafts from Rajasthan. The blue pottery arrived in perfect condition with full export documentation.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Plant Manager, Lagos",
    text: "We've sourced industrial pumps and motors through Mag7. Competitive pricing, API certifications, and on-time delivery every order.",
    rating: 5,
  },
];

/* ─── Fade-in variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12 } }),
};

export default function GroupHomePage() {
  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      className="overflow-x-hidden"
    >
      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════
          HERO — reference style
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[86vh] flex flex-col justify-end overflow-hidden bg-[#060e1e]">
        {/* Full-bleed background port image */}
        <Image
          src="/new ui/cargo-ships-docked-port-night.jpg"
          alt="Mag7 Global — International Port"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlays: right side lighter so text pops on the right */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#060e1e]/60 via-[#060e1e]/30 to-[#060e1e]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060e1e]/95" />

        {/* ── Hero text — RIGHT aligned ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-32 pt-28">
          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[560px] space-y-6 text-right"
            >
              {/* Headline */}
              <h1 className="text-[clamp(1.9rem,4.5vw,3.8rem)] font-black leading-[1.1] text-white tracking-tight">
                The Smart Solution for<br />
                <span style={{
                  background: "linear-gradient(120deg,#06b6d4 0%,#34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Imports, Exports &amp; Trade
                </span>
              </h1>

              {/* Body */}
              <p className="text-slate-300/90 text-sm md:text-base font-medium leading-relaxed">
                MAG7 Global connects verified Indian producers with international buyers across agro produce, artisanal handicrafts, and industrial machinery — complete trade lifecycle under one roof.
              </p>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── Overlapping bottom strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-10 -mt-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-stretch">

          {/* LEFT — teal catalogue card */}
          <div className="relative bg-[#06b6d4] rounded-[24px] shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-cyan-500/20 group overflow-visible flex flex-col justify-center min-h-[140px] pl-6 pt-24 pb-6 lg:pl-[140px] lg:pt-6 lg:pb-6">
            
            {/* Mini catalogue booklet sticking out */}
            <div className="absolute top-[-36px] left-[24px] w-[90px] h-[120px] bg-white rounded-lg shadow-xl border border-slate-100 p-2 flex flex-col items-center justify-between rotate-[-8deg] transition-all group-hover:rotate-0 group-hover:-translate-y-1 duration-300 z-30">
              {/* Book cover content */}
              <div className="w-full flex items-center justify-center pt-2">
                <div className="relative w-8 h-8 bg-gradient-to-br from-[#06b6d4] to-[#0d1f3c] rounded flex items-center justify-center p-0.5">
                  <Image
                    src="/logo/image.png"
                    alt="Mag7"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="w-full text-center space-y-1">
                <div className="text-[7px] text-[#0d1f3c] font-black tracking-tight leading-none">MAG7 GLOBAL</div>
                <div className="w-8 h-[1px] bg-slate-200 mx-auto" />
                <div className="text-[5px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Catalogue</div>
              </div>
            </div>

            {/* Text and CTA */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="text-white font-black text-sm leading-snug">
                Explore our full product catalogue across all 3 divisions
              </div>
              <a
                href="#divisions"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-[#0d1f3c] font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:-translate-y-0.5 shadow-md mt-3 w-fit cursor-pointer"
              >
                View Catalogue <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT — white stat strip */}
          <div className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 p-6 lg:p-8 flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full divide-x divide-slate-100/80">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center px-4"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-[#06b6d4] mb-3">
                    {s.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-[#0d1f3c] leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>


      {/* ════════════════════════════════════════════════
          WHY CHOOSE MAG7 — airplane split section
      ════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Top split: text left, airplane right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-20">

            {/* LEFT — text content */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#06b6d4]">
                About MAG7 Global
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
                Why Choose{" "}
                <span className="text-[#06b6d4]">MAG7 Global?</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                MAG7 Global LLP is a diversified holding conglomerate headquartered in Indore, India. Founded with a singular focus on transparent, compliant, and high-volume international trade, we have built integrated sourcing networks across three distinct sectors.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                With offices coordinating supply chains across Maharashtra, Rajasthan, and Gujarat — and shipping partnerships at Mundra, JNPT, and Delhi Air Cargo — we deliver every shipment on schedule with full regulatory compliance. Over a decade of trade experience has earned us the trust of 500+ global buyers across 28 countries.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you need reefer containers for fresh produce, bubble-padded crates for fragile pottery, or heavy rigging for industrial machinery — our in-house logistics team handles every detail.
              </p>
              <a
                href="#divisions"
                className="inline-flex items-center gap-2.5 bg-[#06b6d4] hover:bg-[#0891b2] text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* RIGHT — airplane + floating card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={1}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              {/* Soft background circle */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06b6d4]/5 via-white to-[#e0f7fa]/40" />

              {/* Airplane image */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center py-6">
                <Image
                  src="/new ui/plane.png"
                  alt="MAG7 Global — International Air Freight"
                  width={720}
                  height={504}
                  className="object-contain w-full max-w-[624px] relative z-10"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="border-t border-slate-200 pt-12 pb-16"
          >
            <div className="text-center mb-10 space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#06b6d4]">
                Our Value Proposition
              </div>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black text-[#0d1f3c] tracking-tight">
                What We Offer
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: <Globe2 className="w-5 h-5 text-[#06b6d4]" />, title: "2+ Decades of Trade Experience", desc: "Proven track record across agro, crafts & machinery" },
                { icon: <Users className="w-5 h-5 text-[#06b6d4]" />, title: "Partnerships with Buyers & Exporters", desc: "Direct relations with verified importers worldwide" },
                { icon: <Package className="w-5 h-5 text-[#06b6d4]" />, title: "End-to-End Customs Handling", desc: "Full clearance at Mundra, JNPT & Delhi Air Cargo" },
                { icon: <TrendingUp className="w-5 h-5 text-[#06b6d4]" />, title: "Competitive Pricing Guarantee", desc: "No middlemen — direct OEM & farm-gate sourcing" },
                { icon: <ShieldCheck className="w-5 h-5 text-[#06b6d4]" />, title: "Professional Expert Team", desc: "APEDA, FSSAI, API 600 & CE certified specialists" },
                { icon: <Award className="w-5 h-5 text-[#06b6d4]" />, title: "Continuously Updated Knowledge", desc: "Aligned with latest phytosanitary & trade regulations" },
                { icon: <Truck className="w-5 h-5 text-[#06b6d4]" />, title: "Consulting & After-Sales Support", desc: "Post-delivery assistance and documentation backup" },
                { icon: <HeartHandshake className="w-5 h-5 text-[#06b6d4]" />, title: "Specialized & Expert Buyers", desc: "Connecting premium buyers with certified Indian suppliers" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 text-[#06b6d4]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-[#0d1f3c] text-xs leading-snug mb-1">{item.title}</div>
                    <div className="text-[10px] text-slate-500 font-semibold leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHO WE ARE — collage
      ════════════════════════════════════════════════ */}
      <section className="bg-white pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                Who We Are
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
                Mag7 Global – Your One-Stop Import-Export Partner
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Navigating global trade can be challenging with complex regulations, unreliable networks, and delayed shipments. Mag7 Global simplifies your journey with complete transparency, swift response times, and a strong global network.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                With our office in Indore, Madhya Pradesh, we provide seamless trade solutions for exporters, importers, local traders, wholesalers, and distributors. As an Integrated Service Provider, we handle everything from sourcing and documentation to logistics and compliance—ensuring a hassle-free, cost-effective, and efficient trade experience.
              </p>
            </motion.div>

            {/* Single handshake image with floating badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={1}
              viewport={{ once: true }}
              className="relative w-full max-w-[380px] aspect-[3/4] mx-auto z-10"
            >
              <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/95">
                <Image
                  src="/images/business_partners_handshake.png"
                  alt="Mag7 Global Partners"
                  fill
                  className="object-cover object-center"
                />
                
                {/* Floating Social Icons Bar at the Top */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/25 z-20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <Facebook className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Instagram className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <MessageCircle className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Mail className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                  <Globe2 className="w-3.5 h-3.5 text-white opacity-85 hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating Circular Trusted Partner Emblem */}
                <div className="absolute bottom-6 right-6 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 z-20 hover:scale-105 transition-transform duration-300">
                  <div className="text-center flex flex-col items-center justify-center leading-none">
                    <span className="text-[8px] font-black text-[#0d1f3c] tracking-widest uppercase">TRUSTED</span>
                    <span className="text-[9px] font-bold text-[#06b6d4] uppercase mt-0.5">PARTNER</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          DIVISIONS — alternating layout
      ════════════════════════════════════════════════ */}
      <section id="divisions" className="bg-white py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              Group Portfolios
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#0d1f3c] tracking-tight">
              Our Business <span className="text-[#06b6d4]">Divisions</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
              Each division operates with dedicated sourcing networks, compliance frameworks, and logistics pipelines.
            </p>
          </motion.div>

          <div className="space-y-28">
            {divisions.map((div, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={0.1}
                viewport={{ once: true, margin: "-80px" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-2xl group">
                  <Image src={div.image} alt={div.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/70 via-transparent to-transparent" />
                  {/* Bottom label */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-white font-black text-xl">{div.title}</div>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-6">
                  <div
                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: div.accent }}
                  >
                    {div.sub}
                  </div>
                  <h3 className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
                    {div.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {div.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {div.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${div.accent}25` }}>
                          <CheckCircle2 className="w-3 h-3" style={{ color: div.accent }} />
                        </div>
                        <span className="text-sm text-slate-700 font-semibold">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={div.href}
                    className="inline-flex items-center gap-2 text-white font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl group"
                    style={{ background: div.accent }}
                  >
                    Explore Division
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DARK CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="bg-[#06b6d4] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-white/70 text-xs font-bold uppercase tracking-widest">Ready to Start Sourcing?</div>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Let's Build Your Trade Pipeline
            </h3>
            <p className="text-white/75 text-sm font-medium">Submit an RFQ and get a quote within 24 hours.</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/agro/rfq" className="bg-white text-[#0891b2] font-black text-sm px-8 py-4 hover:-translate-y-0.5 transition-all shadow-xl hover:shadow-2xl">
              Submit RFQ
            </Link>
            <Link href="/about-us" className="border-2 border-white text-white font-bold text-sm px-8 py-4 hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>



      {/* ════════════════════════════════════════════════
          LEADERSHIP PREVIEW
      ════════════════════════════════════════════════ */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 text-[#0891b2] border border-[#06b6d4]/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                Our Leadership
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#0d1f3c] leading-tight tracking-tight">
                Driven by Visionary{" "}
                <span className="text-[#06b6d4]">Leadership.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our executive team brings combined decades of experience in international commodity trade, logistics, and quality compliance — steering MAG7 Global's multi-division growth strategy.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Founder & MD", name: "Priyansh Vyas" },
                  { label: "Co-Director", name: "Rajesh K. Sharma" },
                  { label: "Compliance Director", name: "Sunita Patil" },
                  { label: "Operations Head", name: "Global Sourcing" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-[#06b6d4]/30 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#06b6d4]/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-[#06b6d4]" />
                    </div>
                    <div>
                      <div className="font-black text-[#0d1f3c] text-xs">{m.name}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-[#0d1f3c] text-white font-bold text-sm px-7 py-4 hover:bg-[#06b6d4] transition-all duration-300 group"
              >
                Meet Our Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Decorative stats / trust block */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={1}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: <Globe2 className="w-7 h-7 text-[#06b6d4]" />, value: "28+", label: "Countries Served", bg: "bg-[#06b6d4]/6" },
                { icon: <MapPin className="w-7 h-7 text-amber-500" />, value: "3", label: "Active Divisions", bg: "bg-amber-500/6" },
                { icon: <TrendingUp className="w-7 h-7 text-emerald-500" />, value: "₹50Cr+", label: "Annual Trade Volume", bg: "bg-emerald-500/6" },
                { icon: <PhoneCall className="w-7 h-7 text-violet-500" />, value: "24h", label: "RFQ Response Time", bg: "bg-violet-500/6" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <div className="text-3xl font-black text-[#0d1f3c] leading-none mb-1">{item.value}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CUSTOMERS & TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] py-24 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#06b6d4]">
              Join Hundreds of Global Partners
            </div>
            <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-black text-[#0d1f3c] leading-tight tracking-tight max-w-2xl mx-auto">
              Partnering with you is our honor
            </h2>
          </div>

          {/* Brand Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-65 hover:opacity-85 transition-opacity duration-300 mb-20 max-w-5xl mx-auto">
            {[
              { name: "MAERSK", logo: <span className="font-extrabold tracking-tighter text-slate-400 text-lg">MAE*RSK</span> },
              { name: "Apex Logistics", logo: <span className="font-black text-slate-400 text-base">APEX <span className="text-[#06b6d4]">LOG</span></span> },
              { name: "EuroFresh Ltd", logo: <span className="font-bold text-slate-400 text-base">🍃 EuroFresh</span> },
              { name: "Heritage Imports", logo: <span className="font-extrabold text-slate-400 text-sm tracking-wider">HERITAGE</span> },
              { name: "Alpha Motors", logo: <span className="font-serif italic text-slate-400 text-xl font-bold">α-motors</span> },
              { name: "Prime Sourcing", logo: <span className="font-mono text-slate-400 text-sm font-bold">PRIME.src</span> },
              { name: "Jebel Ali Trade", logo: <span className="font-black text-slate-400 text-sm tracking-tight">JEBEL ALI</span> },
              { name: "CNC Tech", logo: <span className="font-black text-slate-400 text-base">⚙️ CNC-TECH</span> },
              { name: "Frankfurt Buy", logo: <span className="font-bold text-slate-400 text-sm">🇩🇪 F-BUY</span> },
              { name: "Gulf Agro", logo: <span className="font-extrabold text-slate-400 text-base text-emerald-600/60">GULF AGRO</span> },
              { name: "Oceanic FCL", logo: <span className="font-black text-slate-400 text-base">🌊 OCEANIC</span> },
              { name: "India Craft Co", logo: <span className="font-serif text-slate-400 text-sm font-bold">IND-CRAFT</span> },
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-center h-12 w-full p-2 border border-slate-100 bg-white rounded-xl shadow-sm hover:shadow hover:scale-105 transition-all">
                {b.logo}
              </div>
            ))}
          </div>

          {/* Testimonials 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Quote Body */}
                <div className="space-y-4">
                  <span className="text-4xl text-[#06b6d4]/30 font-serif leading-none block">“</span>
                  <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                    {t.text}
                  </p>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-[#06b6d4] font-black text-sm shrink-0 border border-cyan-100">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-[#0d1f3c] text-sm leading-none mb-1.5">{t.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
