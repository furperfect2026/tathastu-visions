import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, CheckCircle2, Trees, Shield, Home } from "lucide-react";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import heroImg from "@/assets/pisoli-villas/villa-1.png";
import masterPlanImg from "@/assets/pisoli-villas/villa-2.png"; // Placeholder for actual master plan
import villa1 from "@/assets/pisoli-villas/villa-1.png";
import villa2 from "@/assets/pisoli-villas/villa-2.png";
import villa3 from "@/assets/pisoli-villas/villa-3.png";
import villa4 from "@/assets/pisoli-villas/villa-4.png";
import villa5 from "@/assets/pisoli-villas/villa-5.png";
import villa6 from "@/assets/pisoli-villas/villa-6.png";
import villa7 from "@/assets/pisoli-villas/villa-7.png";
import villa8 from "@/assets/pisoli-villas/villa-8.png";

const galleryImages = [villa1, villa2, villa3, villa4, villa5, villa6, villa7, villa8];

export const Route = createFileRoute("/pisoli-villas")({
  component: PisoliVillasPage,
});

function PisoliVillasPage() {
  const handleWhatsAppConversion = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18120801457/RasXCKLn4qIcELH51cBD',
        'value': 1.0,
        'currency': 'INR'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory font-sans text-ink">
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-ink pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury Villa Pisoli"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-sm font-medium tracking-widest text-primary backdrop-blur-sm">
              PREMIUM RESIDENTIAL VILLA COMMUNITY
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Luxury Bungalow <br />
              <span className="text-gradient-gold">Plotting Development</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/80 sm:text-xl">
              A refined contemporary residential community in Pisoli, Pune. 
              Focused on elegance, simplicity, nature integration, and premium living experiences.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <a
                href="https://wa.me/917820864384?text=Hi%20Tathastu%20Infra%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Pisoli%20Villas%20plotting%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppConversion}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:scale-105 hover:opacity-90 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Register Interest
              </a>
              <a
                href="#details"
                className="w-full rounded-full border-2 border-ivory/20 bg-ivory/5 px-8 py-3.5 text-sm font-bold text-ivory backdrop-blur-md transition-all hover:border-ivory/40 hover:bg-ivory/10 sm:w-auto"
              >
                Explore Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="details" className="bg-ivory py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl font-semibold sm:text-5xl">
                The <span className="text-primary">Vision</span>
              </h2>
              <p className="mt-6 text-lg text-ink/70">
                To create a premium luxury bungalow community with a uniform architectural identity, 
                spacious road planning, enhanced privacy, landscaped surroundings, and a high-quality living environment.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Premium township feel with 9M & 10M wide access roads",
                  "Uniform luxury bungalow aesthetics & architectural harmony",
                  "Spacious internal infrastructure and landscaped greens",
                  "High investment potential in Pisoli's growing corridor"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="font-medium text-ink/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { title: "1000 sq ft", desc: "Compact Luxury Villa Plot (1 Guntha)", icon: Home },
                { title: "1500 sq ft", desc: "Premium Standard Villa Plot", icon: Trees },
                { title: "2000 sq ft", desc: "Grand Estate Villa Plot", icon: Shield },
                { title: "81 Plots", desc: "Total Exclusive Community Lots", icon: MapPin },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                  <stat.icon className="mb-3 h-6 w-6 text-primary sm:mb-4 sm:h-8 sm:w-8" />
                  <h3 className="font-display text-lg font-bold sm:text-2xl">{stat.title}</h3>
                  <p className="mt-1 text-xs font-medium text-ink/60 sm:mt-2 sm:text-sm">{stat.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section className="bg-ink py-20 text-ivory lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Master <span className="text-primary-glow">Plan</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ivory/70">
              Designed to achieve maximum efficiency, premium aesthetics, and comfortable circulation 
              while maintaining a luxurious township character.
            </p>
          </div>

          <div className="mt-16 rounded-3xl bg-ivory/5 p-4 sm:p-8 backdrop-blur-md">
            <img 
              src={masterPlanImg} 
              alt="Master Plan Layout Placeholder" 
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-4">
              {[
                "Organized Plot Planning",
                "Wide Internal Roads (9M)",
                "Visitor Parking Zones",
                "Grand Entry Statement"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-ivory/5 p-4">
                  <div className="flex h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Theme & Gallery */}
      <section className="bg-ivory py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Modern <span className="text-primary">European</span> Style
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-ink/70">
              Contemporary residential community inspired by modern European streetscapes, combining architecture, 
              landscape, and walkable neighborhoods into a cohesive living environment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {galleryImages.map((imgSrc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`overflow-hidden rounded-2xl ${
                  idx === 0 || idx === 3 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img 
                  src={imgSrc} 
                  alt={`Pisoli Villa Render ${idx + 1}`} 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110 min-h-[150px] sm:min-h-[250px]"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-8">
              <h4 className="text-2xl font-display font-semibold">Design Language</h4>
              <p className="mt-4 text-ink/70">Contemporary luxury façade, premium materials palette, uniform elevation theme, and elegant landscape integration.</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-8">
              <h4 className="text-2xl font-display font-semibold">Amenities & Landscape</h4>
              <p className="mt-4 text-ink/70">Landscaped greens, dedicated seating zones, kids play areas, internal green pockets, and a strictly walking-friendly environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section id="contact" className="bg-ink py-20 text-ivory lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Ready to <span className="text-primary-glow">Secure Your Plot?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70">
            Get in touch with us directly on WhatsApp to receive the full brochure, layout plans, and pricing details.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://wa.me/917820864384?text=Hi%20Tathastu%20Infra%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Pisoli%20Villas%20plotting%20project."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppConversion}
              className="group flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20bd5a] hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
