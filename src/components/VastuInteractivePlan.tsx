import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, XCircle, Info } from "lucide-react";
import { interactiveVastuZones, layoutOrder } from "@/lib/interactive-vastu-data";
import { cn } from "@/lib/utils";

export function VastuInteractivePlan() {
  const [activeZone, setActiveZone] = useState<string>("c"); // Default to center

  const activeData = interactiveVastuZones[activeZone];

  return (
    <section className="bg-ivory py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="eyebrow mb-4">Design in Harmony</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl uppercase">
            Interactive Vaastu Guide
          </h2>
          <p className="mt-6 text-lg text-ink/70">
            Hover over or tap any room on the floor plan below to explore Vaastu principles, ruling elements, and ideal placements for better energy and positive living.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start mt-8">
          {/* Floor Plan Visualizer */}
          <div className="lg:col-span-7 relative max-w-2xl mx-auto w-full pt-8 lg:pt-0">
            {/* Compass Directions */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center text-blue-600 font-semibold tracking-wider text-sm opacity-90 z-20 bg-ivory px-2">
               NORTH (Wealth)
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center text-red-600 font-semibold tracking-wider text-sm opacity-90 z-20 bg-ivory px-2">
               SOUTH (Strength)
            </div>
            <div className="absolute top-1/2 -right-8 lg:-right-12 -translate-y-1/2 flex flex-col items-center justify-center text-orange-500 font-semibold tracking-wider text-sm opacity-90 rotate-90 lg:rotate-0 z-20 bg-ivory px-2">
               EAST
            </div>
            <div className="absolute top-1/2 -left-8 lg:-left-12 -translate-y-1/2 flex flex-col items-center justify-center text-indigo-500 font-semibold tracking-wider text-sm opacity-90 -rotate-90 lg:rotate-0 z-20 bg-ivory px-2">
               WEST
            </div>
            
            {/* The 3x3 Grid Floorplan */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 p-3 md:p-5 bg-ink/5 rounded-3xl border-8 border-ink/10 relative shadow-inner w-full aspect-square md:aspect-auto">
               <Compass className="absolute -top-4 -right-4 w-12 h-12 text-primary opacity-50 drop-shadow-md z-0" />
               
               {layoutOrder.map((zoneId) => {
                 const zone = interactiveVastuZones[zoneId];
                 const isActive = activeZone === zoneId;
                 return (
                     <div
                     key={zoneId}
                     onMouseEnter={() => setActiveZone(zoneId)}
                     onClick={() => setActiveZone(zoneId)}
                     className={cn(
                       "relative z-10 flex flex-col items-center justify-center text-center p-2 md:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer min-h-[100px] md:min-h-[160px] shadow-sm overflow-hidden group",
                       isActive ? `border-primary shadow-md scale-[1.03] ring-2 ring-primary/20 z-20` : "hover:border-primary/50 opacity-90 hover:opacity-100"
                     )}
                   >
                     {/* Background Image */}
                     <div 
                       className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                       style={{ backgroundImage: `url(${zone.image})` }}
                     />
                     
                     {/* Subtle bottom gradient and text label */}
                     <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 flex justify-center bg-gradient-to-t from-black/60 to-transparent">
                       <span className="text-[9px] md:text-xs font-semibold uppercase tracking-widest text-white drop-shadow-md backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded-full border border-white/20">
                         {zone.name.split(" ")[0]}
                       </span>
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-luxe border border-border/50 h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn("p-4 rounded-2xl bg-opacity-10", interactiveVastuZones[activeZone].bgClass.split(' ')[0], interactiveVastuZones[activeZone].color)}>
                    <Compass className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">{activeData.name}</h3>
                    <p className="text-primary font-medium tracking-wide uppercase text-sm mt-1">
                      Element: {activeData.rulingElement}
                    </p>
                  </div>
                </div>

                <div className="mb-8 bg-ivory/50 p-5 rounded-2xl border border-border/40">
                  <h4 className="font-semibold text-ink mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Why it matters
                  </h4>
                  <p className="text-ink/80 leading-relaxed text-base md:text-lg">
                    {activeData.advantages}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-auto pt-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2 border-b border-green-200 pb-2">
                      <CheckCircle2 className="w-4 h-4" /> Ideal For
                    </h4>
                    <ul className="space-y-3">
                      {activeData.idealFor.map((item, idx) => (
                        <li key={idx} className="text-ink/75 text-sm flex items-start gap-2 leading-tight">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-4 flex items-center gap-2 border-b border-red-200 pb-2">
                      <XCircle className="w-4 h-4" /> Avoid
                    </h4>
                    <ul className="space-y-3">
                      {activeData.avoid.map((item, idx) => (
                        <li key={idx} className="text-ink/75 text-sm flex items-start gap-2 leading-tight">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
