import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Check, ChevronRight, X, ArrowLeft, Building2 } from "lucide-react";
import { vastuZones, roomTypes, getRoomScore } from "@/lib/vastu-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VastuCalculator() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  
  // State to store selected rooms for each zone: { "nw": ["Kitchen", "Balcony"], "n": ["Main Entrance"] }
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const handleZoneClick = (zoneId: string) => {
    setSelectedZoneId(zoneId);
  };

  const closePanel = () => {
    setSelectedZoneId(null);
  };

  const toggleRoom = (zoneId: string, room: string) => {
    setSelections((prev) => {
      const zoneRooms = prev[zoneId] || [];
      if (zoneRooms.includes(room)) {
        return { ...prev, [zoneId]: zoneRooms.filter((r) => r !== room) };
      } else {
        return { ...prev, [zoneId]: [...zoneRooms, room] };
      }
    });
  };

  const selectedZone = selectedZoneId ? vastuZones.find((z) => z.id === selectedZoneId) : null;

  // Calculate scores
  const results = useMemo(() => {
    let totalScore = 0;
    let count = 0;
    const details: { room: string; zoneName: string; rating: string; message: string; score: number }[] = [];

    Object.entries(selections).forEach(([zoneId, rooms]) => {
      const zone = vastuZones.find((z) => z.id === zoneId);
      if (!zone) return;

      rooms.forEach((room) => {
        const rule = getRoomScore(room, zoneId);
        totalScore += rule.score;
        count += 1;
        details.push({
          room,
          zoneName: zone.name,
          rating: rule.rating,
          message: rule.message,
          score: rule.score,
        });
      });
    });

    const averageScore = count === 0 ? 0 : totalScore / count;
    let overallStatus = "Improvement Required";
    if (averageScore >= 8) overallStatus = "Excellent";
    else if (averageScore >= 6) overallStatus = "Good";
    else if (averageScore >= 4) overallStatus = "Neutral";
    else if (count > 0) overallStatus = "Critical Issues";

    return {
      averageScore,
      overallStatus,
      details,
      hasSelections: count > 0,
    };
  }, [selections]);

  const gridRows = [0, 1, 2];
  const gridCols = [0, 1, 2];

  const getZoneAt = (row: number, col: number) => {
    return vastuZones.find((z) => z.gridPos.row === row && z.gridPos.col === col);
  };

  return (
    <section className="bg-gradient-ivory py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow mb-4">Unlock The Power Of Vaastu</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl uppercase">
            Your Personalized Vaastu Calculator
          </h2>
          {step === 1 && (
            <p className="mt-6 text-lg text-ink/70">
              Select rooms for each direction below to calculate your home's Vaastu score.
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-ink mb-6">Select Rooms</h3>
              
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                {gridRows.map((row) =>
                  gridCols.map((col) => {
                    const zone = getZoneAt(row, col);
                    if (!zone) return <div key={`empty-${row}-${col}`} />;
                    
                    const isSelected = selectedZoneId === zone.id;
                    const selectedCount = (selections[zone.id] || []).length;

                    return (
                      <button
                        key={zone.id}
                        onClick={() => handleZoneClick(zone.id)}
                        className={cn(
                          "relative text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 min-h-[120px] flex flex-col justify-between group",
                          isSelected
                            ? "bg-primary/5 border-primary shadow-sm"
                            : "bg-white border-border/80 hover:border-primary/50 hover:shadow-md"
                        )}
                      >
                        <div>
                          <span className="font-semibold text-ink/90 md:text-lg block mb-1">
                            {zone.name}
                          </span>
                          {selectedCount > 0 && (
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                              {selectedCount} selected
                            </span>
                          )}
                        </div>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className={cn(
                            "w-5 h-5 transition-colors",
                            isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                          )} />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex justify-start">
                <Button
                  size="lg"
                  disabled={!results.hasSelections}
                  onClick={() => setStep(2)}
                  className="bg-[#9c6a4e] hover:bg-[#865940] text-white px-12 rounded-xl text-lg h-14"
                >
                  Calculate
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-ink/60 hover:text-ink font-medium mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Calculator
              </button>

              <div className="bg-white rounded-3xl shadow-luxe border border-border/50 overflow-hidden mb-8">
                <div className="p-10 border-b border-border/50 text-center">
                  <h3 className="text-xl font-medium text-ink/70 mb-4">Overall Vaastu Score</h3>
                  <div className="text-6xl font-bold text-[#f26c24] mb-3">
                    {results.averageScore.toFixed(1)}<span className="text-4xl text-ink/40">/10</span>
                  </div>
                  <p className="text-lg font-medium text-ink/80">{results.overallStatus}</p>
                </div>

                <div className="p-6 md:p-10">
                  <h4 className="text-lg font-semibold text-ink mb-6">Room-wise breakup of score!</h4>
                  <div className="space-y-4">
                    {results.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-secondary/30">
                        <div>
                          <h5 className="font-semibold text-ink text-lg">{detail.room}</h5>
                          <p className="text-sm text-ink/60">{detail.zoneName}</p>
                          <p className="text-sm text-ink/80 mt-1">{detail.message}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <div className={cn(
                            "px-4 py-2 rounded-lg font-semibold text-sm self-start sm:self-auto uppercase tracking-wider inline-block",
                            detail.rating === "EXCELLENT" ? "bg-green-100 text-green-700" :
                            detail.rating === "NEUTRAL" ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {detail.rating}
                          </div>
                          <span className="text-sm font-semibold text-ink/70">
                            {detail.score}/10 points
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#f26c24] hover:bg-[#d95b1a] text-white px-8 rounded-xl"
                    >
                      <Link to="/" hash="contact">Request a Service</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide-over Panel for Room Selection */}
        <AnimatePresence>
          {selectedZone && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePanel}
                className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: "100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0.5 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-border/50"
              >
                <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-br from-white to-secondary/30">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">Select Rooms</h3>
                    <p className="text-sm text-ink/60 mt-1">for {selectedZone.name} direction</p>
                  </div>
                  <button
                    onClick={closePanel}
                    className="p-2 rounded-full hover:bg-muted text-ink/60 hover:text-ink transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
                  {roomTypes.map((room) => {
                    const isSelected = (selections[selectedZone.id] || []).includes(room);
                    return (
                      <label
                        key={room}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleRoom(selectedZone.id, room);
                        }}
                        className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-transparent hover:border-border/60 hover:bg-muted/30 cursor-pointer transition-colors"
                      >
                        <div className={cn(
                          "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                          isSelected ? "bg-primary border-primary text-white" : "border-ink/20 bg-white"
                        )}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className={cn(
                          "text-base",
                          isSelected ? "font-medium text-ink" : "text-ink/75"
                        )}>
                          {room}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="p-6 border-t border-border/50 bg-white">
                  <Button
                    size="lg"
                    className="w-full h-12 bg-primary/20 hover:bg-primary/30 text-ink rounded-xl font-semibold text-base"
                    onClick={closePanel}
                  >
                    Confirm Selection
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
