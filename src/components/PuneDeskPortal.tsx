import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Button } from "./ui/button";
import { ArrowDown, Award, Globe, BadgePercent, Landmark, ArrowRight, Building2, TrendingUp, Handshake } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AutoSlideshow } from "./AutoSlideshow";
import heroRealty from "@/assets/hero-realty.jpg";
import realty2 from "@/assets/realty-2.jpg";
import clientRelationship from "@/assets/client-relationship.jpg";
import realty4 from "@/assets/realty-4.jpg";
import projectRealty from "@/assets/project-realty-pride-world-city.jpg";

const whyInvestData = [
  {
    icon: Award,
    title: "Ranked among the Top IT & Education Hubs globally",
  },
  {
    icon: Globe,
    title: "High FDI & Global Corporate Presence",
  },
  {
    icon: BadgePercent,
    title: "6-8% Annual Rental Returns",
  },
  {
    icon: Landmark,
    title: "Resilient economy backed by strong infrastructure growth",
  },
];

const performanceData = [
  { value: "48,500+", label: "Property Transactions" },
  { value: "₹4.2L Cr", label: "Total Market Value" },
  { value: "14.2%", label: "Growth Rate" },
  { value: "85.5%", label: "Residential Market Share" },
];

const pieDataProperty = [
  { name: "Apartments (80.2%)", value: 80.2, color: "#6b8ead" },
  { name: "Plots (12.1%)", value: 12.1, color: "#a5b9cb" },
  { name: "Commercial (7.7%)", value: 7.7, color: "#4f6580" },
];

const pieDataOwnership = [
  { name: "Freehold (95.3%)", value: 95.3, color: "#4b5563" },
  { name: "Leasehold (4.7%)", value: 4.7, color: "#d1d5db" },
];

export function PuneDeskPortal() {
  const scrollToNext = () => {
    document.getElementById("why-invest")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-ink pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AutoSlideshow 
            images={[
              { src: heroRealty, alt: "Pune Real Estate Skyline" },
              { src: clientRelationship, alt: "Happy family getting their dream home" },
              { src: projectRealty, alt: "Premium Pune apartments" },
              { src: realty4, alt: "Luxury living in Pune" }
            ]} 
            interval={5000}
            rounded="rounded-none"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/90 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-ink/30 backdrop-blur-md mb-8">
              <span className="text-primary-glow font-semibold tracking-[0.2em] text-xs uppercase">Pune Desk by Tathastu Infra</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[5rem] font-medium text-white leading-[1.1] tracking-tight">
              Why just dream of Pune? <br />
              <span className="font-serif italic font-light text-primary-glow">Own it.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Exclusive insights, premium projects, and end-to-end guidance for investing in Pune's booming real estate market.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button asChild className="rounded-full bg-white text-ink hover:bg-ivory px-8 h-12 text-lg">
                <Link to="/" hash="contact">Consult Our Experts</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-ink px-8 h-12 text-lg">
                <a href="#market-performance">View Market Performance</a>
              </Button>
            </div>
          </Reveal>
        </div>
        <button 
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </button>
      </section>

      {/* Why Invest Section */}
      <section id="why-invest" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink">
                Why Invest in Pune?
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6" />
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-4xl mx-auto border-y border-border relative">
            {/* Corner Markers */}
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-muted-foreground/40" />
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-muted-foreground/40" />
            <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-muted-foreground/40" />
            <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-muted-foreground/40" />
            
            {whyInvestData.map((item, idx) => (
              <Reveal key={idx} delay={0.1 * idx}>
                <div className="bg-white p-8 lg:p-10 flex items-center gap-6 h-full">
                  <div className="shrink-0 p-3 rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="font-semibold text-lg text-ink/90 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market Performance Section */}
      <section id="market-performance" className="py-20 bg-[#eef3f7]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink">
                Pune’s Market Performance
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.map((data, idx) => (
              <Reveal key={idx} delay={0.1 * idx}>
                <div className="bg-ink p-8 text-ivory h-full flex flex-col justify-center rounded-2xl border border-border shadow-md">
                  <div className="font-display text-4xl lg:text-5xl font-bold mb-3">{data.value}</div>
                  <div className="text-sm lg:text-base text-white/80">{data.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Destination Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#3b5972]">
                A Global Destination for<br />Lifestyle, IT & Investment
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-square lg:aspect-auto lg:h-[500px]">
                <img src={realty2} alt="Pune Skyline Sketch" className="w-full h-full object-cover mix-blend-multiply opacity-90" style={{ filter: 'grayscale(30%) sepia(10%) contrast(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-primary font-semibold tracking-wider uppercase text-sm">Welcome to the Oxford of the East</p>
                <p>
                  Pune isn’t just a city — it’s one of India’s most robust and future-ready investment destinations. It began its journey as a cultural and educational capital, thriving today on IT infrastructure, manufacturing, and commerce. With high rental yields (up to 6-8%), and a transparent, RERA-regulated market, Pune continues to attract investors from across the globe.
                </p>
                <p>
                  It offers the perfect mix of stability, lifestyle, and capital appreciation, supported by an investor-friendly environment and government-backed infrastructure projects like the Metro and Ring Road. Whether you're looking to diversify your portfolio, earn passive rental income, or own a part of a rapidly growing skyline — Pune real estate makes strategic and financial sense.
                </p>

                <div className="grid grid-cols-3 gap-4 border-y border-border py-8 mt-10 relative">
                  <div className="absolute -left-1 -top-1 w-2 h-2 bg-muted-foreground/40" />
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-muted-foreground/40" />
                  <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-muted-foreground/40" />
                  <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-muted-foreground/40" />
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Population</div>
                    <div className="font-semibold text-ink">Over 7.5 million</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Language</div>
                    <div className="font-semibold text-ink">Marathi, English, Hindi</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Major Hubs</div>
                    <div className="font-semibold text-ink">IT & Auto</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Performance Data Component */}
      <section className="py-20 bg-[#eef3f7] pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="bg-white rounded-t-xl overflow-hidden shadow-sm border border-border">
              <div className="flex flex-wrap items-center bg-white border-b border-border">
                <button className="px-6 py-4 text-sm font-semibold text-ink border-b-2 border-primary flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Q1 2025 Performance
                </button>
                <button className="px-6 py-4 text-sm font-medium text-muted-foreground hover:text-ink transition-colors">Q2 2024 Performance</button>
                <button className="px-6 py-4 text-sm font-medium text-muted-foreground hover:text-ink transition-colors">Top Performing Locations</button>
              </div>

              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                  <div className="space-y-8">
                    <div>
                      <div className="text-5xl font-display font-semibold text-ink">22,488</div>
                      <div className="text-muted-foreground mt-2">Transactions</div>
                    </div>
                    <div>
                      <div className="text-5xl font-display font-semibold text-ink">₹2.58L Cr</div>
                      <div className="text-muted-foreground mt-2">Value</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-display text-lg mb-6 text-ink/80">Property Type Distribution</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieDataProperty} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                            {pieDataProperty.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#6b8ead]" /> Apartments</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#a5b9cb]" /> Plots</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#4f6580]" /> Commercial</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="font-display text-lg mb-6 text-ink/80">Ownership Type Distribution</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieDataOwnership} innerRadius={0} outerRadius={80} dataKey="value" stroke="none">
                            {pieDataOwnership.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#4b5563]" /> Freehold</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#d1d5db]" /> Leasehold</div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-ink bg-muted/50 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-semibold italic rounded-tl-lg border border-[#e2e8f0]">Property Segment</th>
                        <th className="px-6 py-4 font-semibold italic border border-[#e2e8f0]">Q1 Transactions</th>
                        <th className="px-6 py-4 font-semibold italic border border-[#e2e8f0]">Q2 Transactions</th>
                        <th className="px-6 py-4 font-semibold italic border border-[#e2e8f0]">Total Share</th>
                        <th className="px-6 py-4 font-semibold italic rounded-tr-lg border border-[#e2e8f0]">Growth Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-[#e2e8f0]">
                        <td className="px-6 py-4 font-medium text-ink border-l border-[#e2e8f0]">Freehold Properties</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">18,738</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">22,509</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">95.5%</td>
                        <td className="px-6 py-4 border-r border-[#e2e8f0]">+19.3%</td>
                      </tr>
                      <tr className="bg-white border-b border-[#e2e8f0]">
                        <td className="px-6 py-4 font-medium text-ink border-l border-[#e2e8f0]">Leasehold Properties</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">1,750</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">1,973</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">4.5%</td>
                        <td className="px-6 py-4 border-r border-[#e2e8f0]">+8.1%</td>
                      </tr>
                      <tr className="bg-white border-b border-[#e2e8f0]">
                        <td className="px-6 py-4 font-medium text-ink border-l border-[#e2e8f0]">Residential Properties</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">18,717</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">23,733</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">97.2%</td>
                        <td className="px-6 py-4 border-r border-[#e2e8f0]">+19.4%</td>
                      </tr>
                      <tr className="bg-white border-b border-[#e2e8f0]">
                        <td className="px-6 py-4 font-medium text-ink border-l border-[#e2e8f0] rounded-bl-lg">Commercial Properties</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">1,771</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">1,749</td>
                        <td className="px-6 py-4 border-[#e2e8f0]">2.8%</td>
                        <td className="px-6 py-4 border-r border-[#e2e8f0] rounded-br-lg">-1.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link to="/" hash="contact" className="group flex flex-col bg-ink border border-primary/30 p-3 px-5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-1">
          <span className="text-[10px] uppercase tracking-widest text-primary-glow font-bold mb-1">Invest in Pune</span>
          <span className="text-ivory font-display font-semibold flex items-center gap-1 group-hover:text-primary transition-colors">
            Talk to Us Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}
